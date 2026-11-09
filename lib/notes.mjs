export const COLORS = ['butter', 'mint', 'blush', 'lilac', 'sky'];
export const CONTEXT = 32;
export const VERSION = 1;
export const KEY_PREFIX = 'wiki:notes:';
export const COMMENT_MAX = 8000;

export const ERRORS = {
  unavailable: 'Notes could not be saved on this device.',
  quota: 'Notes could not be saved because storage is full.',
  corrupt: 'Saved notes on this page could not be read, so they were not loaded. Saving a new note will replace them.',
  loadUnavailable: 'Notes could not be read on this device.',
  orphan(n) {
    return n === 1
      ? '1 saved highlight could not be placed because the article text changed.'
      : `${n} saved highlights could not be placed because the article text changed.`;
  },
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isSlug(value) {
  return typeof value === 'string' && SLUG.test(value);
}

export function storageKey(slug) {
  return isSlug(slug) ? KEY_PREFIX + slug : null;
}

export function newId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export function makeAnchor(text, start, end) {
  if (typeof text !== 'string' || !Number.isInteger(start) || !Number.isInteger(end)) return null;
  if (start < 0 || end > text.length || start >= end) return null;
  const quote = text.slice(start, end);
  if (!quote.trim()) return null;
  return {
    quote,
    prefix: text.slice(Math.max(0, start - CONTEXT), start),
    suffix: text.slice(end, end + CONTEXT),
    start,
    length: quote.length,
  };
}

function contextAt(text, index, quote, prefix, suffix) {
  if (index < 0 || index + quote.length > text.length) return false;
  if (text.slice(index, index + quote.length) !== quote) return false;
  const pre = text.slice(Math.max(0, index - prefix.length), index);
  const suf = text.slice(index + quote.length, index + quote.length + suffix.length);
  return pre === prefix && suf === suffix;
}

export function resolveAnchor(text, anchor) {
  if (typeof text !== 'string' || !anchor || typeof anchor !== 'object') return null;
  const quote = typeof anchor.quote === 'string' ? anchor.quote : '';
  if (!quote) return null;
  const prefix = typeof anchor.prefix === 'string' ? anchor.prefix : '';
  const suffix = typeof anchor.suffix === 'string' ? anchor.suffix : '';
  const start = Number.isInteger(anchor.start) ? anchor.start : -1;

  if (contextAt(text, start, quote, prefix, suffix)) {
    return { start, end: start + quote.length };
  }

  const hits = [];
  for (let from = 0; from <= text.length - quote.length; ) {
    const index = text.indexOf(quote, from);
    if (index < 0) break;
    if (contextAt(text, index, quote, prefix, suffix)) hits.push(index);
    from = index + 1;
  }
  if (hits.length === 1) return { start: hits[0], end: hits[0] + quote.length };
  return null;
}

export function wrapPlan(lengths, start, end) {
  if (!Number.isInteger(start) || !Number.isInteger(end) || start >= end) return [];
  const out = [];
  let pos = 0;
  for (let i = 0; i < lengths.length; i++) {
    const size = lengths[i];
    const from = pos;
    const to = pos + size;
    const a = Math.max(start, from);
    const b = Math.min(end, to);
    if (a < b) out.push({ index: i, from: a - from, to: b - from });
    pos = to;
  }
  return out;
}

function asString(value, max) {
  const text = typeof value === 'string' ? value : value == null ? '' : String(value);
  return text.length > max ? text.slice(0, max) : text;
}

export function normalizeNote(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const id = typeof raw.id === 'string' && raw.id.trim() ? raw.id.trim() : null;
  const color = COLORS.includes(raw.color) ? raw.color : null;
  const quote = typeof raw.quote === 'string' ? raw.quote : '';
  if (!id || !color || !quote) return null;
  const prefix = typeof raw.prefix === 'string' ? raw.prefix : '';
  const suffix = typeof raw.suffix === 'string' ? raw.suffix : '';
  const start = Number.isInteger(raw.start) && raw.start >= 0 ? raw.start : 0;
  const length = Number.isInteger(raw.length) && raw.length > 0 ? raw.length : quote.length;
  const comment = asString(raw.comment, COMMENT_MAX);
  const createdAt = Number.isFinite(raw.createdAt) ? raw.createdAt : 0;
  const updatedAt = Number.isFinite(raw.updatedAt) ? raw.updatedAt : createdAt;
  return { id, color, quote, prefix, suffix, start, length, comment, createdAt, updatedAt };
}

export function parseRecord(raw) {
  if (raw == null || raw === '') return { notes: [], error: null };
  if (typeof raw !== 'string') return { notes: [], error: 'corrupt' };
  let data;
  try { data = JSON.parse(raw); }
  catch { return { notes: [], error: 'corrupt' }; }
  if (!data || typeof data !== 'object' || Array.isArray(data) || !Array.isArray(data.notes)) {
    return { notes: [], error: 'corrupt' };
  }
  const notes = [];
  const seen = new Set();
  for (const item of data.notes) {
    const note = normalizeNote(item);
    if (!note || seen.has(note.id)) continue;
    seen.add(note.id);
    notes.push(note);
  }
  return { notes, error: null };
}

export function serializeRecord(notes) {
  const list = [];
  const seen = new Set();
  for (const item of notes) {
    const note = normalizeNote(item);
    if (!note || seen.has(note.id)) continue;
    seen.add(note.id);
    list.push(note);
  }
  return JSON.stringify({ v: VERSION, notes: list });
}

function errorName(err) {
  const name = err && typeof err === 'object' ? err.name : '';
  const code = err && typeof err === 'object' ? err.code : undefined;
  if (name === 'QuotaExceededError' || name === 'NS_ERROR_DOM_QUOTA_REACHED' || code === 22 || code === 1014) {
    return 'quota';
  }
  return 'unavailable';
}

export function loadNotes(store, slug) {
  const key = storageKey(slug);
  if (!key) return { notes: [], error: null };
  if (!store || typeof store.getItem !== 'function') return { notes: [], error: 'unavailable' };
  let raw;
  try { raw = store.getItem(key); }
  catch { return { notes: [], error: 'unavailable' }; }
  return parseRecord(raw);
}

export function saveNotes(store, slug, notes) {
  const key = storageKey(slug);
  if (!key) return { ok: false, error: 'unavailable' };
  if (!store || typeof store.setItem !== 'function') return { ok: false, error: 'unavailable' };
  try {
    store.setItem(key, serializeRecord(notes));
    return { ok: true, error: null };
  } catch (err) {
    return { ok: false, error: errorName(err) };
  }
}
