// Interaction for study-page widgets. The server already rendered every widget as plain HTML;
// this adds dragging and sliders to plots, one-step-at-a-time reveals, and self-check questions.
import { parseSpec, renderPlot, initialValues, readouts, handlePos, nearestValue, makeScope, fmtNum } from './plot.mjs';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
const button = (cls, text) => { const b = el('button', `wbtn ${cls}`, text); b.type = 'button'; return b; };

// fade a newly shown element in; instant with reduced motion
function enter(node) {
  node.hidden = false;
  if (reduced.matches) return;
  node.classList.add('w-enter');
  node.getBoundingClientRect();
  requestAnimationFrame(() => node.classList.remove('w-enter'));
}

// ---------- plots ----------

function niceStep(span) {
  const raw = span / 100, mag = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / mag;
  return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * mag;
}

function setupPlot(fig) {
  let spec;
  try { spec = parseSpec(fig.dataset.src); } catch { return; }
  const svg = fig.querySelector('svg'), layer = svg.querySelector('.p-layer');
  const values = initialValues(spec);
  const drags = spec.items.filter((it) => it.kind === 'drag');
  const outs = [...fig.querySelectorAll('[data-readout]')];
  let view = null, frame = 0;

  function draw() {
    frame = 0;
    const r = renderPlot(spec, values, { id: fig.id });
    layer.innerHTML = r.layer;
    svg.setAttribute('viewBox', `0 0 ${r.W} ${r.H}`);
    view = r.view;
    const scope = makeScope(spec, values);
    for (const it of drags) {
      const h = svg.querySelector(`.p-handle[data-var="${it.name}"]`);
      const [x, y] = handlePos(spec, it, values[it.name], scope);
      const px = view.M + (x - view.x0) / (view.x1 - view.x0) * view.iw, py = view.M + (view.y1 - y) / (view.y1 - view.y0) * view.ih;
      h.setAttribute('transform', `translate(${px.toFixed(1)} ${(Number.isFinite(py) ? py : -100).toFixed(1)})`);
      h.setAttribute('aria-valuenow', String(Number(values[it.name].toFixed(3))));
      h.setAttribute('aria-valuetext', fmtNum(values[it.name], 2));
    }
    readouts(spec, values).forEach((v, i) => { if (outs[i]) outs[i].textContent = v; });
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };

  for (const input of fig.querySelectorAll('input[type="range"][data-var]')) {
    const out = input.parentElement.querySelector('output');
    input.addEventListener('input', () => {
      values[input.dataset.var] = Number(input.value);
      out.textContent = fmtNum(Number(input.value), 2);
      schedule();
    });
  }

  const scope0 = makeScope(spec, values);
  for (const it of drags) {
    const h = svg.querySelector(`.p-handle[data-var="${it.name}"]`);
    const lo = it.min(scope0), hi = it.max(scope0);
    const step = it.step ? it.step(scope0) : niceStep(hi - lo);
    const set = (v, snap) => {
      v = Math.min(Math.max(v, lo), hi);
      if (it.step) v = lo + Math.round((v - lo) / step) * step;
      else if (snap) {
        // a light pull toward whole numbers so exact values like x = 3 are easy to hit
        const r = Math.round(v);
        v = Math.abs(v - r) < (hi - lo) * 0.012 ? r : Math.round(v / step) * step;
      }
      values[it.name] = Math.min(Math.max(v, lo), hi);
      schedule();
    };
    const toData = (e) => {
      const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
      return [view.x0 + (pt.x - view.M) / view.iw * (view.x1 - view.x0), view.y1 - (pt.y - view.M) / view.ih * (view.y1 - view.y0)];
    };
    const move = (e) => { const [x, y] = toData(e); set(nearestValue(spec, it, values, x, y), true); };
    const start = (e) => {
      e.preventDefault();
      h.focus({ preventScroll: true });
      fig.classList.add('is-dragging');
      svg.setPointerCapture(e.pointerId);
      move(e);
      const up = () => { fig.classList.remove('is-dragging'); svg.removeEventListener('pointermove', move); svg.removeEventListener('pointerup', up); svg.removeEventListener('pointercancel', up); };
      svg.addEventListener('pointermove', move);
      svg.addEventListener('pointerup', up);
      svg.addEventListener('pointercancel', up);
    };
    h.addEventListener('pointerdown', start);
    // with a mouse, pressing anywhere on the plot moves the point there; on touch only the point itself
    // grabs, so the page still scrolls
    if (drags.length === 1) svg.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse' && !e.target.closest('.p-handle')) start(e); });
    h.addEventListener('keydown', (e) => {
      const k = e.key, big = e.shiftKey ? 10 : 1;
      let v = values[it.name];
      if (k === 'ArrowRight' || k === 'ArrowUp') v += step * big;
      else if (k === 'ArrowLeft' || k === 'ArrowDown') v -= step * big;
      else if (k === 'PageUp') v += step * 10;
      else if (k === 'PageDown') v -= step * 10;
      else if (k === 'Home') v = lo;
      else if (k === 'End') v = hi;
      else return;
      e.preventDefault();
      set(Number(v.toFixed(6)), false);
    });
  }
  fig.classList.add('is-ready');
  draw();
}

// ---------- step-by-step reveal ----------

function setupSteps(box) {
  const list = [...box.children].find((n) => n.tagName === 'OL');
  if (!list) return;
  const items = [...list.children];
  if (items.length < 2) return;
  const after = [];
  for (let n = list.nextElementSibling; n; n = n.nextElementSibling) after.push(n);
  const bar = el('div', 'steps-bar');
  const next = button('wbtn-primary', 'Show step 1');
  const all = button('wbtn-ghost', 'Show all');
  bar.append(next, all);
  list.after(bar);
  list.setAttribute('aria-live', 'polite');
  let shown = 0;
  const label = () => { next.textContent = shown === 0 ? 'Show step 1' : `Next step`; };
  function reset() {
    shown = 0;
    items.forEach((li) => { li.hidden = true; });
    after.forEach((n) => { n.hidden = true; });
    next.hidden = false; all.textContent = 'Show all';
    box.classList.remove('is-done');
    label();
  }
  function finish() {
    after.forEach(enter);
    next.hidden = true;
    all.textContent = 'Start over';
    box.classList.add('is-done');
  }
  next.addEventListener('click', () => {
    enter(items[shown++]);
    if (shown === items.length) { finish(); all.focus(); } else label();
  });
  all.addEventListener('click', () => {
    if (box.classList.contains('is-done')) { reset(); next.focus(); return; }
    items.slice(shown).forEach(enter);
    shown = items.length;
    finish();
  });
  reset();
}

// ---------- self-check questions ----------

function setupCheck(box) {
  const list = box.querySelector(':scope > ul.check-choices');
  const answer = box.querySelector(':scope > details.check-answer');
  if (!list) return;
  const status = el('div', 'check-status');
  status.setAttribute('aria-live', 'polite');
  list.after(status);
  const choices = [...list.children];
  for (const li of choices) {
    const b = button('choice-btn', '');
    for (const n of [...li.childNodes]) { if (n.nodeType === 1 && n.classList.contains('choice-hint')) break; b.append(n); }
    li.prepend(b);
    b.addEventListener('click', () => {
      li.classList.add('is-picked');
      const hint = li.querySelector('.choice-hint');
      if (hint) enter(hint);
      if (li.hasAttribute('data-correct')) {
        li.classList.add('is-right');
        status.className = 'check-status is-right';
        status.textContent = 'Right.';
        choices.forEach((c) => { c.querySelector('.choice-btn').disabled = true; });
        if (answer) answer.open = true;
        box.classList.add('is-solved');
      } else {
        li.classList.add('is-wrong');
        b.disabled = true;
        status.className = 'check-status is-wrong';
        status.textContent = 'Not quite. Try another one.';
      }
    });
  }
  box.classList.add('is-ready');
}

document.querySelectorAll('figure.plot-live').forEach(setupPlot);
document.querySelectorAll('.steps').forEach(setupSteps);
document.querySelectorAll('.check').forEach(setupCheck);
