import {
  COLORS, ERRORS, makeAnchor, resolveAnchor, wrapPlan, newId, loadNotes, saveNotes, COMMENT_MAX,
} from './notes-core.mjs';

const root = document.querySelector('main.article > .content');
if (root) {
  const slug = location.pathname.replace(/^\/+|\/+$/g, '');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const phone = matchMedia('screen and (max-width: 47.99rem)');
  const coarse = matchMedia('(pointer: coarse)');

  const SKIP = 'svg, script, style, textarea, input, .katex, .note-ui, pre.mermaid';
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  };

  function store() {
    try {
      const memory = globalThis.localStorage;
      const probe = '__wiki_notes_probe';
      memory.setItem(probe, '1');
      memory.removeItem(probe);
      return memory;
    } catch {
      return null;
    }
  }

  function skipNode(node) {
    const start = node.nodeType === 1 ? node : node.parentElement;
    return Boolean(start && start.closest(SKIP));
  }

  function textNodes() {
    const out = [];
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || skipNode(node)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walk.nextNode()) out.push(walk.currentNode);
    return out;
  }

  function articleText() {
    return textNodes().map((node) => node.nodeValue).join('');
  }

  function absOffset(container, offset) {
    const nodes = textNodes();
    if (container.nodeType === Node.TEXT_NODE) {
      let pos = 0;
      for (const node of nodes) {
        if (node === container) return pos + offset;
        pos += node.nodeValue.length;
      }
      return null;
    }
    const point = container.childNodes[offset] || container;
    if (point.nodeType === Node.TEXT_NODE) return absOffset(point, 0);
    let pos = 0;
    for (const node of nodes) {
      const before = node.compareDocumentPosition(point);
      if (before & Node.DOCUMENT_POSITION_FOLLOWING || node === point) return pos;
      pos += node.nodeValue.length;
    }
    return pos;
  }

  function rangeOffsets(range) {
    if (!root.contains(range.commonAncestorContainer) || skipNode(range.commonAncestorContainer)) return null;
    const start = absOffset(range.startContainer, range.startOffset);
    const end = absOffset(range.endContainer, range.endOffset);
    if (start == null || end == null || start >= end) return null;
    return start < end ? { start, end } : { start: end, end: start };
  }

  function unwrap() {
    for (const mark of [...root.querySelectorAll('mark.note')]) {
      const parent = mark.parentNode;
      if (!parent) continue;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    }
    for (const btn of [...root.querySelectorAll('.note-com')]) btn.remove();
  }

  function wrapNote(note, start, end) {
    const nodes = textNodes();
    const plan = wrapPlan(nodes.map((node) => node.nodeValue.length), start, end);
    let last = null;
    for (let i = plan.length - 1; i >= 0; i--) {
      const piece = plan[i];
      let node = nodes[piece.index];
      if (piece.to < node.nodeValue.length) node.splitText(piece.to);
      if (piece.from > 0) node = node.splitText(piece.from);
      if (!node.nodeValue.trim()) continue;
      const mark = el('mark', 'note');
      mark.dataset.noteId = note.id;
      mark.dataset.color = note.color;
      node.parentNode.insertBefore(mark, node);
      mark.appendChild(node);
      if (!last) last = mark;
    }
    if (last && note.comment) {
      const btn = el('button', 'note-com');
      btn.type = 'button';
      btn.dataset.noteId = note.id;
      btn.setAttribute('aria-label', 'Open comment');
      last.after(btn);
    }
  }

  const memory = store();
  let loadError = memory ? null : 'unavailable';
  const ui = el('div', 'note-ui');
  const live = el('p', 'note-status');
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  const backdrop = el('div', 'note-backdrop');
  backdrop.hidden = true;
  const pop = el('div', 'note-pop');
  pop.hidden = true;
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-modal', 'true');
  pop.setAttribute('aria-labelledby', 'note-pop-title');
  const grab = el('button', 'note-grab');
  grab.type = 'button';
  grab.setAttribute('aria-label', 'Close');
  const title = el('p', 'note-pop-title', 'Highlight');
  title.id = 'note-pop-title';
  const colors = el('div', 'note-colors');
  colors.setAttribute('role', 'radiogroup');
  colors.setAttribute('aria-label', 'Highlight color');
  const names = { butter: 'Butter', mint: 'Mint', blush: 'Blush', lilac: 'Lilac', sky: 'Sky' };
  for (const color of COLORS) {
    const swatch = el('button', 'note-swatch');
    swatch.type = 'button';
    swatch.dataset.color = color;
    swatch.setAttribute('role', 'radio');
    swatch.setAttribute('aria-label', names[color]);
    swatch.setAttribute('aria-checked', 'false');
    colors.append(swatch);
  }
  const label = el('label', 'note-comment-label', 'Comment');
  label.htmlFor = 'note-comment';
  const field = el('textarea', 'note-comment');
  field.id = 'note-comment';
  field.rows = 3;
  field.maxLength = COMMENT_MAX;
  const actions = el('div', 'note-actions');
  const saveBtn = el('button', 'wbtn wbtn-primary', 'Save');
  saveBtn.type = 'button';
  const removeBtn = el('button', 'wbtn', 'Remove');
  removeBtn.type = 'button';
  actions.append(saveBtn, removeBtn);
  pop.append(grab, title, colors, label, field, actions);
  ui.append(live, backdrop, pop);
  document.body.append(ui);

  let notes = [];
  let mode = null;
  let draftColor = COLORS[0];
  let draftRange = null;
  let activeId = null;
  let lastRect = null;

  function setStatus(text) {
    live.textContent = text || '';
  }

  function loaded() {
    const result = loadNotes(memory, slug);
    notes = result.notes;
    loadError = result.error || loadError;
  }

  function commit(next) {
    const prev = notes;
    notes = next;
    const result = saveNotes(memory, slug, notes);
    if (!result.ok) {
      notes = prev;
      setStatus(ERRORS[result.error] || ERRORS.unavailable);
      return false;
    }
    loadError = null;
    paint();
    return true;
  }

  function paint() {
    unwrap();
    const text = articleText();
    let orphans = 0;
    for (const note of notes) {
      const at = resolveAnchor(text, note);
      if (!at) { orphans += 1; continue; }
      wrapNote(note, at.start, at.end);
    }
    if (loadError === 'corrupt') setStatus(ERRORS.corrupt);
    else if (loadError === 'unavailable') setStatus(ERRORS.loadUnavailable);
    else if (orphans) setStatus(ERRORS.orphan(orphans));
    else setStatus('');
  }

  function setColor(color) {
    draftColor = color;
    for (const swatch of colors.children) {
      swatch.setAttribute('aria-checked', swatch.dataset.color === color ? 'true' : 'false');
    }
  }

  function place() {
    if (phone.matches) return;
    const rect = lastRect;
    if (!rect) return;
    const pad = 12;
    const width = pop.offsetWidth || 280;
    const height = pop.offsetHeight || 180;
    let left = Math.min(Math.max(pad, rect.left), innerWidth - width - pad);
    let top = rect.bottom + 8;
    if (top + height > innerHeight - pad) top = Math.max(pad, rect.top - height - 8);
    pop.style.left = `${Math.round(left)}px`;
    pop.style.top = `${Math.round(top)}px`;
  }

  function closePop() {
    pop.hidden = true;
    backdrop.hidden = true;
    pop.classList.remove('is-open');
    document.body.classList.remove('note-lock');
    mode = null;
    draftRange = null;
    activeId = null;
    pop.style.left = '';
    pop.style.top = '';
  }

  function openPop() {
    backdrop.hidden = !phone.matches;
    pop.hidden = false;
    document.body.classList.toggle('note-lock', phone.matches);
    if (reduced.matches) pop.classList.add('is-open');
    else {
      pop.classList.remove('is-open');
      pop.getBoundingClientRect();
      requestAnimationFrame(() => pop.classList.add('is-open'));
    }
    place();
    if (!coarse.matches) {
      const chosen = colors.querySelector('[aria-checked="true"]') || colors.firstElementChild;
      chosen.focus({ preventScroll: true });
    }
  }

  function openCreate(range, rect) {
    const offsets = rangeOffsets(range);
    if (!offsets) return;
    const text = articleText();
    const anchor = makeAnchor(text, offsets.start, offsets.end);
    if (!anchor) return;
    const inside = noteAt(range.commonAncestorContainer);
    if (inside) {
      openEdit(inside.dataset.noteId, rect);
      return;
    }
    mode = 'create';
    draftRange = offsets;
    activeId = null;
    lastRect = rect;
    setColor(COLORS[0]);
    field.value = '';
    removeBtn.hidden = true;
    saveBtn.textContent = 'Save';
    title.textContent = 'Highlight';
    openPop();
  }

  function openEdit(id, rect) {
    const note = notes.find((item) => item.id === id);
    if (!note) return;
    mode = 'edit';
    activeId = id;
    draftRange = null;
    lastRect = rect || lastMarkRect(id);
    setColor(note.color);
    field.value = note.comment;
    removeBtn.hidden = false;
    saveBtn.textContent = 'Save';
    title.textContent = 'Highlight';
    openPop();
  }

  function lastMarkRect(id) {
    const marks = [...root.querySelectorAll(`mark.note[data-note-id="${CSS.escape(id)}"]`)];
    const mark = marks[marks.length - 1];
    return mark ? mark.getBoundingClientRect() : null;
  }

  function noteAt(node) {
    const start = node.nodeType === 1 ? node : node.parentElement;
    const mark = start && start.closest('mark.note');
    return mark && root.contains(mark) ? mark : null;
  }

  function applyColor(color) {
    setColor(color);
    const now = Date.now();
    if (mode === 'create' && draftRange) {
      const text = articleText();
      const anchor = makeAnchor(text, draftRange.start, draftRange.end);
      if (!anchor) return;
      const note = { id: newId(), color, comment: field.value, createdAt: now, updatedAt: now, ...anchor };
      if (!commit([...notes, note])) return;
      mode = 'edit';
      activeId = note.id;
      draftRange = null;
      removeBtn.hidden = false;
      getSelection()?.removeAllRanges();
      return;
    }
    if (mode === 'edit' && activeId) {
      commit(notes.map((note) => note.id === activeId ? { ...note, color, updatedAt: now } : note));
    }
  }

  function saveComment() {
    const comment = field.value.slice(0, COMMENT_MAX);
    const now = Date.now();
    if (mode === 'create') {
      applyColor(draftColor);
      if (activeId) commit(notes.map((note) => note.id === activeId ? { ...note, comment, updatedAt: now } : note));
      closePop();
      return;
    }
    if (mode === 'edit' && activeId) {
      if (!commit(notes.map((note) => note.id === activeId ? { ...note, comment, updatedAt: now } : note))) return;
      closePop();
    }
  }

  function removeNote() {
    if (mode !== 'edit' || !activeId) return;
    if (!commit(notes.filter((note) => note.id !== activeId))) return;
    closePop();
  }

  colors.addEventListener('click', (event) => {
    const swatch = event.target.closest('.note-swatch');
    if (swatch) applyColor(swatch.dataset.color);
  });
  colors.addEventListener('keydown', (event) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = COLORS[(COLORS.indexOf(draftColor) + step + COLORS.length) % COLORS.length];
    setColor(next);
    colors.querySelector(`[data-color="${next}"]`).focus();
  });
  saveBtn.addEventListener('click', saveComment);
  removeBtn.addEventListener('click', removeNote);
  grab.addEventListener('click', closePop);
  backdrop.addEventListener('click', closePop);

  function selectedRange() {
    const sel = getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
    const range = sel.getRangeAt(0);
    if (!root.contains(range.commonAncestorContainer)) return null;
    if (range.commonAncestorContainer.nodeType === 1 && range.commonAncestorContainer.closest('.note-ui')) return null;
    return range;
  }

  function selectionRect(range) {
    const rects = [...range.getClientRects()].filter((rect) => rect.width && rect.height);
    return rects[rects.length - 1] || range.getBoundingClientRect();
  }

  function onSelect() {
    if (!pop.hidden && (mode === 'edit' || mode === 'create') && document.activeElement && pop.contains(document.activeElement)) return;
    const range = selectedRange();
    if (!range) return;
    openCreate(range, selectionRect(range));
  }

  document.addEventListener('mouseup', (event) => {
    if (ui.contains(event.target)) return;
    onSelect();
  });
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift' || event.key.startsWith('Arrow')) onSelect();
  });
  document.addEventListener('selectionchange', () => {
    if (!coarse.matches) return;
    if (ui.contains(document.activeElement)) return;
    clearTimeout(onSelect.wait);
    onSelect.wait = setTimeout(onSelect, 280);
  });

  root.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    const com = event.target.closest('.note-com');
    if (com) {
      openEdit(com.dataset.noteId, com.getBoundingClientRect());
      return;
    }
    const mark = event.target.closest('mark.note');
    if (mark && root.contains(mark) && !selectedRange()) {
      openEdit(mark.dataset.noteId, mark.getBoundingClientRect());
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (pop.hidden) return;
    if (pop.contains(event.target) || event.target.closest('mark.note, .note-com')) return;
    if (selectedRange()) return;
    closePop();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !pop.hidden) {
      event.preventDefault();
      closePop();
      return;
    }
    if (pop.hidden || event.key !== 'Tab') return;
    const focusable = [...pop.querySelectorAll('button, textarea')].filter((node) => !node.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  addEventListener('resize', () => { if (!pop.hidden) place(); });

  loaded();
  paint();
}
