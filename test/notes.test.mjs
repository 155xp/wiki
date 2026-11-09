import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  COLORS, ERRORS, CONTEXT, COMMENT_MAX, storageKey, makeAnchor, resolveAnchor, wrapPlan,
  normalizeNote, parseRecord, serializeRecord, loadNotes, saveNotes, newId,
} from '../lib/notes.mjs';
import { parseArticle, renderArticle, renderIndex } from '../lib/render.mjs';

function store(map = {}) {
  return {
    data: map,
    getItem(key) { return Object.hasOwn(map, key) ? map[key] : null; },
    setItem(key, value) { map[key] = String(value); },
  };
}

function note(partial) {
  return normalizeNote({
    id: 'n1',
    color: 'mint',
    quote: 'inner derivative',
    prefix: 'the ',
    suffix: ' of',
    start: 4,
    length: 16,
    comment: '',
    ...partial,
  });
}

describe('article notes storage', () => {
  test('keys are per article slug', () => {
    assert.equal(storageKey('chain-rule'), 'wiki:notes:chain-rule');
    assert.equal(storageKey('other-article'), 'wiki:notes:other-article');
    assert.equal(storageKey('../escape'), null);
    assert.equal(storageKey(''), null);
  });

  test('notes saved on one article are not read on another', () => {
    const memory = store();
    const a = note({ id: 'a1', comment: 'only on alpha' });
    assert.equal(saveNotes(memory, 'alpha', [a]).ok, true);
    assert.deepEqual(loadNotes(memory, 'alpha').notes.map((n) => n.comment), ['only on alpha']);
    assert.deepEqual(loadNotes(memory, 'beta').notes, []);
    assert.equal(saveNotes(memory, 'beta', [note({ id: 'b1', comment: 'only on beta' })]).ok, true);
    assert.deepEqual(loadNotes(memory, 'alpha').notes.map((n) => n.comment), ['only on alpha']);
    assert.deepEqual(loadNotes(memory, 'beta').notes.map((n) => n.comment), ['only on beta']);
  });

  test('round-trip keeps color, comment text, and anchor fields', () => {
    const memory = store();
    const saved = note({
      id: 'keep-1',
      color: 'lilac',
      comment: 'Remember the chain. <em>not html</em>',
    });
    saveNotes(memory, 'sample-article', [saved]);
    const { notes, error } = loadNotes(memory, 'sample-article');
    assert.equal(error, null);
    assert.equal(notes.length, 1);
    assert.equal(notes[0].color, 'lilac');
    assert.equal(notes[0].comment, 'Remember the chain. <em>not html</em>');
    assert.equal(notes[0].quote, saved.quote);
    assert.equal(notes[0].prefix, saved.prefix);
    assert.equal(notes[0].suffix, saved.suffix);
    assert.equal(notes[0].start, saved.start);
  });

  test('corrupt storage is reported and does not throw', () => {
    const memory = store({ 'wiki:notes:sample-article': '{not-json' });
    const result = loadNotes(memory, 'sample-article');
    assert.deepEqual(result.notes, []);
    assert.equal(result.error, 'corrupt');
    assert.match(ERRORS.corrupt, /could not be read/);
  });

  test('quota and missing storage fail honestly without throwing', () => {
    const quotaErr = Object.assign(new Error('full'), { name: 'QuotaExceededError' });
    const quota = { getItem() { return null; }, setItem() { throw quotaErr; } };
    const full = saveNotes(quota, 'sample-article', [note({})]);
    assert.equal(full.ok, false);
    assert.equal(full.error, 'quota');
    const missing = saveNotes(null, 'sample-article', [note({})]);
    assert.equal(missing.ok, false);
    assert.equal(missing.error, 'unavailable');
    const blocked = loadNotes({ getItem() { throw new Error('denied'); } }, 'sample-article');
    assert.deepEqual(blocked.notes, []);
    assert.equal(blocked.error, 'unavailable');
  });

  test('invalid records are dropped; comment is always a string', () => {
    const raw = serializeRecord([
      { id: 'ok', color: 'sky', quote: 'term', prefix: '', suffix: '', start: 0, length: 4, comment: 12 },
      { id: 'bad-color', color: 'neon', quote: 'term', prefix: '', suffix: '', start: 0, length: 4 },
      { id: '', color: 'mint', quote: 'term' },
      null,
    ]);
    const { notes, error } = parseRecord(raw);
    assert.equal(error, null);
    assert.equal(notes.length, 1);
    assert.equal(notes[0].id, 'ok');
    assert.equal(notes[0].comment, '12');
    assert.ok(COLORS.includes(notes[0].color));
    assert.ok(notes[0].comment.length <= COMMENT_MAX);
  });
});

describe('article note anchors', () => {
  const text = 'Use the inner derivative of the inner function, then the inner derivative again.';

  test('an unchanged span resolves at the original offset', () => {
    const anchor = makeAnchor(text, 8, 24);
    assert.equal(anchor.quote, 'inner derivative');
    assert.equal(anchor.prefix.length, 8);
    assert.ok(anchor.prefix.length <= CONTEXT);
    assert.deepEqual(resolveAnchor(text, anchor), { start: 8, end: 24 });
  });

  test('a unique matching context can follow the span if earlier text shifts', () => {
    const anchor = makeAnchor(text, 8, 24);
    const shifted = 'Note. ' + text;
    const at = resolveAnchor(shifted, anchor);
    assert.deepEqual(at, { start: 14, end: 30 });
    assert.equal(shifted.slice(at.start, at.end), 'inner derivative');
  });

  test('duplicate quotes use prefix and suffix; a unique context wins', () => {
    const body = 'red apple, green apple, red apple pie';
    const firstAt = body.indexOf('apple');
    const pieAt = body.lastIndexOf('apple');
    const first = makeAnchor(body, firstAt, firstAt + 5);
    const pie = makeAnchor(body, pieAt, pieAt + 5);
    assert.equal(first.quote, pie.quote);
    assert.notEqual(first.suffix, pie.suffix);
    assert.deepEqual(resolveAnchor(body, first), { start: firstAt, end: firstAt + 5 });
    assert.deepEqual(resolveAnchor(body, pie), { start: pieAt, end: pieAt + 5 });
  });

  test('a quote that now appears only in a different context is not attached', () => {
    const original = 'Keep the chain rule. Ignore other mentions of chain rule here.';
    const anchor = makeAnchor(original, 9, 19);
    assert.equal(anchor.quote, 'chain rule');
    const changed = 'A different chain rule sits in a new sentence.';
    assert.equal(changed.includes('chain rule'), true);
    assert.equal(resolveAnchor(changed, anchor), null);
  });

  test('identical copies are not guessed when the original offset no longer matches', () => {
    const original = 'The cat sat. xxx The cat sat.';
    const start = original.lastIndexOf('cat');
    const anchor = makeAnchor(original, start, start + 3);
    assert.equal(anchor.quote, 'cat');
    const edited = 'The cat sat. The cat sat.';
    assert.equal(resolveAnchor(edited, anchor), null);
  });

  test('missing text does not attach', () => {
    const anchor = makeAnchor('alpha beta gamma', 6, 10);
    assert.equal(resolveAnchor('alpha delta gamma', anchor), null);
    assert.equal(resolveAnchor('', anchor), null);
    assert.equal(resolveAnchor('alpha beta gamma', null), null);
  });

  test('wrap plan splits a span across adjacent inline segments', () => {
    const segments = ['Use the ', 'inner', ' derivative'];
    const text = segments.join('');
    const start = text.indexOf('the inner der');
    const end = start + 'the inner der'.length;
    assert.deepEqual(wrapPlan(segments.map((s) => s.length), start, end), [
      { index: 0, from: 4, to: 8 },
      { index: 1, from: 0, to: 5 },
      { index: 2, from: 0, to: 4 },
    ]);
  });

  test('wrap plan is empty for inverted or empty ranges', () => {
    assert.deepEqual(wrapPlan([3, 4], 4, 4), []);
    assert.deepEqual(wrapPlan([3, 4], 5, 2), []);
  });
});

describe('article pages load notes locally', () => {
  const article = parseArticle('---\ntitle: Sample\nvisibility: public\n---\n\nA **short** article.\n', 'sample.md');

  test('article pages include the notes script; the index does not', () => {
    const page = renderArticle(article, { slugs: new Set(['sample']) });
    assert.match(page, /<script type="module" src="\/notes\/notes.js">/);
    const index = renderIndex([article]);
    assert.doesNotMatch(index, /notes\.js/);
  });

  test('new ids are unique enough for local notes', () => {
    const ids = new Set(Array.from({ length: 20 }, () => newId()));
    assert.equal(ids.size, 20);
  });
});
