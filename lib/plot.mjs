// Function plots for ```plot blocks. Runs on the server (static SVG) and in the browser (/widgets/plot.mjs,
// for sliders and draggable points), so it has no imports and touches no DOM.
//
// A spec is one item per line:
//   x: -2 to 6              y: -1 to 5               caption: Figure 1. Text with $math$
//   f(x) = sqrt(25 - x^2) "label" [tags]            y = 2x + 1          x = 3
//   tangent f at 3          secant f from 1 to 4     shade f from 0 to 3   shade f and g from 0 to 3
//   point (3, 4) "(3, 4)"   segment (1, 1) to (3, 1) line through (3, 4) slope -3/4   label (1, 2) "text"
//   inverse f               implicit x^2 + x*y + y^2 = 7      parametric (cos(t), sin(t)) for t from 0 to pi
//   slider k from 0 to 3 = 1 step 0.1 "label"       drag a on f from -4 to 4 = 1
//   drag t on (5cos(t), 5sin(t)) from 0 to 2pi = 1  readout "label with $math$" f'(a)
// Tags: [outer] [inner] [muted] [good] [dashed] [thin] [hidden] [digits=3].

const BUILTIN = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, sec: (x) => 1 / Math.cos(x), csc: (x) => 1 / Math.sin(x), cot: (x) => 1 / Math.tan(x),
  asin: Math.asin, acos: Math.acos, atan: Math.atan, arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  sqrt: Math.sqrt, cbrt: Math.cbrt, ln: Math.log, log: Math.log10, exp: Math.exp, abs: Math.abs,
  floor: Math.floor, ceil: Math.ceil, round: Math.round, sign: Math.sign, min: Math.min, max: Math.max,
};
const CONST = { pi: Math.PI, e: Math.E };

// ---------- expressions ----------

function tokenize(src) {
  const out = [];
  const s = src.replace(/π/g, 'pi').replace(/−/g, '-').replace(/·|×/g, '*');
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    const num = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(s.slice(i));
    if (num) { out.push({ t: 'num', v: Number(num[0]) }); i += num[0].length; continue; }
    const id = /^[A-Za-z_][A-Za-z0-9_]*('*)/.exec(s.slice(i));
    if (id) { out.push({ t: 'id', v: id[0].replace(/'+$/, ''), primes: id[1].length }); i += id[0].length; continue; }
    if ('+-*/^(),'.includes(c)) { out.push({ t: c }); i++; continue; }
    throw new Error(`unexpected "${c}" in "${src}"`);
  }
  return out;
}

// Compiles an expression to (scope) => number. `names` lists the variables and functions the spec defines,
// so "xy" can be read as x*y and unknown names fail at build time rather than in the reader's browser.
export function compile(src, names = {}) {
  const toks = tokenize(String(src));
  let p = 0;
  const peek = () => toks[p], next = () => toks[p++];
  const expect = (t) => { if (peek()?.t !== t) throw new Error(`expected "${t}" in "${src}"`); p++; };
  const isVar = (n) => n in CONST || names.vars?.has(n);
  const isFn = (n) => n in BUILTIN || names.fns?.has(n);

  function add() {
    let a = mul();
    while (peek()?.t === '+' || peek()?.t === '-') {
      const op = next().t, b = mul(), l = a;
      a = op === '+' ? (s) => l(s) + b(s) : (s) => l(s) - b(s);
    }
    return a;
  }
  function mul() {
    let a = unary();
    for (;;) {
      const t = peek();
      if (t?.t === '*' || t?.t === '/') {
        next();
        const b = unary(), l = a;
        a = t.t === '*' ? (s) => l(s) * b(s) : (s) => l(s) / b(s);
      } else if (t && (t.t === 'num' || t.t === 'id' || t.t === '(')) {
        const b = pow(), l = a; // implicit multiplication: 2x, 3sin(x), (x+1)(x-1)
        a = (s) => l(s) * b(s);
      } else return a;
    }
  }
  function unary() {
    if (peek()?.t === '-') { next(); const a = unary(); return (s) => -a(s); }
    if (peek()?.t === '+') { next(); return unary(); }
    return pow();
  }
  function pow() {
    const base = primary();
    if (peek()?.t === '^') { next(); const ex = unary(); return (s) => Math.pow(base(s), ex(s)); }
    return base;
  }
  function args() {
    expect('(');
    const list = [add()];
    while (peek()?.t === ',') { next(); list.push(add()); }
    expect(')');
    return list;
  }
  function call(name, primes, power) {
    const list = args();
    let fn;
    if (name in BUILTIN) {
      const f = BUILTIN[name];
      fn = primes ? (s) => numDeriv(f, list[0](s), primes)
        : list.length === 1 ? (s) => f(list[0](s)) : (s) => f(...list.map((a) => a(s)));
    } else {
      fn = (s) => s.call(name, list[0](s), primes);
    }
    if (!power) return fn;
    return (s) => Math.pow(fn(s), power(s));
  }
  function primary() {
    const t = next();
    if (!t) throw new Error(`unexpected end of "${src}"`);
    if (t.t === 'num') return () => t.v;
    if (t.t === '(') { const a = add(); expect(')'); return a; }
    if (t.t !== 'id') throw new Error(`unexpected "${t.t}" in "${src}"`);
    const name = t.v;
    if (isFn(name)) {
      // sin^2(x) means (sin x)^2
      let power = null;
      if (peek()?.t === '^' && toks[p + 1]?.t === 'num' && toks[p + 2]?.t === '(') { next(); const v = next().v; power = () => v; }
      if (peek()?.t === '(') return call(name, t.primes, power);
      throw new Error(`${name} needs parentheses in "${src}"`);
    }
    if (isVar(name)) return name in CONST ? () => CONST[name] : (s) => s.vars[name];
    // xy, ab: a run of single-letter variables
    if ([...name].every((ch) => isVar(ch))) {
      const parts = [...name];
      return (s) => parts.reduce((acc, ch) => acc * (ch in CONST ? CONST[ch] : s.vars[ch]), 1);
    }
    throw new Error(`unknown name "${name}" in "${src}"`);
  }
  const result = add();
  if (p < toks.length) throw new Error(`unexpected "${toks[p].v ?? toks[p].t}" in "${src}"`);
  return result;
}

function numDeriv(f, a, order = 1) {
  const h = 1e-4 * Math.max(1, Math.abs(a));
  if (order === 1) return (f(a + h) - f(a - h)) / (2 * h);
  if (order === 2) return (f(a + h) - 2 * f(a) + f(a - h)) / (h * h);
  return NaN;
}

// ---------- spec ----------

const RE = {
  range: /^([xy])\s*:\s*(.+?)\s*(?:to|,)\s*(.+)$/,
  key: /^(caption|title|grid|height|aspect)\s*:\s*(.*)$/,
  fn: /^([A-Za-z]\w*)\s*\(\s*([a-z])\s*\)\s*=\s*(.+)$/,
  y: /^y\s*=\s*(.+)$/,
  x: /^x\s*=\s*(.+)$/,
  tangent: /^tangent\s+(\w+)\s+at\s+(.+)$/,
  secant: /^secant\s+(\w+)\s+from\s+(.+?)\s+to\s+(.+)$/,
  shade: /^shade\s+(\w+)(?:\s+and\s+(\w+))?\s+from\s+(.+?)\s+to\s+(.+)$/,
  point: /^point\s+\((.+)\)$/,
  label: /^label\s+\((.+)\)$/,
  segment: /^segment\s+\((.+?)\)\s+to\s+\((.+)\)$/,
  through: /^line\s+through\s+\((.+?)\)\s+slope\s+(.+)$/,
  inverse: /^inverse\s+(\w+)$/,
  implicit: /^implicit\s+(.+?)\s*=\s*(.+)$/,
  param: /^parametric\s+\((.+)\)\s+for\s+t\s+from\s+(.+?)\s+to\s+(.+)$/,
  slider: /^slider\s+([A-Za-z]\w*)\s+from\s+(.+?)\s+to\s+(.+?)\s*=\s*(.+?)(?:\s+step\s+(.+))?$/,
  drag: /^drag\s+([A-Za-z]\w*)(?:\s+on\s+(\w+|\(.+\)))?\s+from\s+(.+?)\s+to\s+(.+?)\s*=\s*(.+?)(?:\s+step\s+(.+))?$/,
  readout: /^readout\s+(.+)$/,
};

// split "a, b" at the top-level comma
function pair(s) {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') depth++;
    else if (s[i] === ')') depth--;
    else if (s[i] === ',' && depth === 0) return [s.slice(0, i).trim(), s.slice(i + 1).trim()];
  }
  throw new Error(`expected "x, y" in "(${s})"`);
}

export function parseSpec(source) {
  const items = [], opts = { x: null, y: null, caption: '', grid: true, aspect: 'auto' };
  const vars = new Set(['x', 'y', 't']), fns = new Set();
  const lines = [];
  String(source).split('\n').forEach((raw, n) => {
    let line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) return;
    // trailing [tags] and one "quoted label"
    const tags = {};
    let m;
    while ((m = /\s*\[([^\]]*)\]\s*$/.exec(line))) {
      for (const tag of m[1].split(/[\s,]+/).filter(Boolean)) { const [k, v] = tag.split('='); tags[k] = v ?? true; }
      line = line.slice(0, m.index).trim();
    }
    let label = '';
    if ((m = /\s*"([^"]*)"\s*$/.exec(line)) && !/^(caption|title)\s*:/.test(line)) { label = m[1]; line = line.slice(0, m.index).trim(); }
    if ((m = /^readout\s+(.+)$/.exec(line)) && !label) {
      const q = /^"([^"]*)"\s+(.+)$/.exec(m[1]);
      if (q) { label = q[1]; line = `readout ${q[2]}`; }
    }
    lines.push({ line, tags, label, n: n + 1 });
    if ((m = RE.fn.exec(line))) fns.add(m[1]);
    if ((m = RE.slider.exec(line)) || (m = RE.drag.exec(line))) vars.add(m[1]);
  });
  const names = { vars, fns };
  const ex = (s) => compile(s, names);
  const fnNames = { vars: new Set([...vars]), fns };
  for (const { line, tags, label, n } of lines) {
    let m;
    const at = (msg) => new Error(`line ${n}: ${msg}`);
    try {
      if ((m = RE.range.exec(line))) opts[m[1]] = [ex(m[2]), ex(m[3])];
      else if ((m = RE.key.exec(line))) {
        if (m[1] === 'caption' || m[1] === 'title') opts.caption = m[2];
        else if (m[1] === 'grid') opts.grid = !/^(off|no|false)$/i.test(m[2]);
        else if (m[1] === 'aspect') opts.aspect = m[2].trim();
        else if (m[1] === 'height') opts.height = Number(m[2]);
      }
      else if ((m = RE.tangent.exec(line))) items.push({ kind: 'tangent', f: need(m[1]), at: ex(m[2]), tags, label });
      else if ((m = RE.secant.exec(line))) items.push({ kind: 'secant', f: need(m[1]), a: ex(m[2]), b: ex(m[3]), tags, label });
      else if ((m = RE.shade.exec(line))) items.push({ kind: 'shade', f: need(m[1]), g: m[2] ? need(m[2]) : null, a: ex(m[3]), b: ex(m[4]), tags, label });
      else if ((m = RE.segment.exec(line))) items.push({ kind: 'segment', p: pair(m[1]).map(ex), q: pair(m[2]).map(ex), tags, label });
      else if ((m = RE.through.exec(line))) items.push({ kind: 'through', p: pair(m[1]).map(ex), slope: ex(m[2]), tags, label });
      else if ((m = RE.point.exec(line))) items.push({ kind: 'point', p: pair(m[1]).map(ex), tags, label });
      else if ((m = RE.label.exec(line))) items.push({ kind: 'text', p: pair(m[1]).map(ex), tags, label });
      else if ((m = RE.inverse.exec(line))) items.push({ kind: 'inverse', f: need(m[1]), tags, label });
      else if ((m = RE.implicit.exec(line))) { const l = ex(m[1]), r = ex(m[2]); items.push({ kind: 'implicit', F: (s) => l(s) - r(s), tags, label }); }
      else if ((m = RE.param.exec(line))) items.push({ kind: 'param', p: pair(m[1]).map(ex), a: ex(m[2]), b: ex(m[3]), tags, label });
      else if ((m = RE.slider.exec(line))) items.push({ kind: 'slider', name: m[1], min: ex(m[2]), max: ex(m[3]), value: ex(m[4]), step: m[5] ? ex(m[5]) : null, tags, label: label || m[1] });
      else if ((m = RE.drag.exec(line))) {
        const on = m[2];
        const item = { kind: 'drag', name: m[1], min: ex(m[3]), max: ex(m[4]), value: ex(m[5]), step: m[6] ? ex(m[6]) : null, tags, label };
        if (!on) item.on = 'axis';
        else if (on.startsWith('(')) { item.on = 'param'; item.p = pair(on.slice(1, -1)).map(ex); }
        else { item.on = 'fn'; item.f = need(on); }
        items.push(item);
      }
      else if ((m = RE.readout.exec(line))) items.push({ kind: 'readout', expr: ex(m[1]), src: m[1], tags, label: label || m[1] });
      else if ((m = RE.fn.exec(line))) items.push({ kind: 'fn', name: m[1], param: m[2], body: compile(m[3], { vars: new Set([...fnNames.vars, m[2]]), fns }), tags, label });
      else if ((m = RE.y.exec(line))) items.push({ kind: 'fn', name: null, param: 'x', body: ex(m[1]), tags, label });
      else if ((m = RE.x.exec(line))) items.push({ kind: 'vline', at: ex(m[1]), tags, label });
      else throw new Error(`not a plot item: "${line}"`);
    } catch (err) { throw at(err.message.replace(/^line \d+: /, '')); }
  }
  function need(name) { if (!fns.has(name)) throw new Error(`no function named "${name}"`); return name; }
  return { items, opts };
}

// ---------- evaluation ----------

export function initialValues(spec) {
  const scope = makeScope(spec, {});
  const values = {};
  for (const it of spec.items) if (it.kind === 'slider' || it.kind === 'drag') values[it.name] = it.value(scope);
  return values;
}

function makeScope(spec, values) {
  const defs = Object.fromEntries(spec.items.filter((it) => it.kind === 'fn' && it.name).map((it) => [it.name, it]));
  const scope = {
    vars: { ...values },
    call(name, arg, primes = 0) {
      const d = defs[name];
      if (!d) return NaN;
      const at = (x) => d.body({ ...scope, vars: { ...scope.vars, [d.param]: x } });
      return primes ? numDeriv(at, arg, primes) : at(arg);
    },
  };
  return scope;
}

// evaluate with x (or another name) bound
const withVar = (scope, name, v) => ({ ...scope, vars: { ...scope.vars, [name]: v } });

const fmtNum = (v, digits = 2) => {
  if (!Number.isFinite(v)) return 'undefined';
  const r = Number(v.toFixed(digits));
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−');
};
export { fmtNum };

function niceStep(span, target) {
  const raw = span / target, mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / mag;
  return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * mag;
}

const ESC = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Renders the drawing layer and handle positions for the given slider/drag values.
export function renderPlot(spec, values, { id = 'p' } = {}) {
  const scope = makeScope(spec, values);
  const W = 600, M = 10;
  const fnItem = (name) => spec.items.find((it) => it.kind === 'fn' && it.name === name);
  const f = (name) => (x) => scope.call(name, x);
  const df = (name) => (x) => scope.call(name, x, 1);

  const [x0, x1] = spec.opts.x ? spec.opts.x.map((e) => e(scope)) : [-5, 5];
  let y0, y1;
  if (spec.opts.y) [y0, y1] = spec.opts.y.map((e) => e(scope));
  else {
    let lo = Infinity, hi = -Infinity;
    for (const it of spec.items) if (it.kind === 'fn' && !it.tags.hidden) {
      for (let i = 0; i <= 200; i++) {
        const x = x0 + (x1 - x0) * i / 200, v = it.body(withVar(scope, it.param, x));
        if (Number.isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
      }
    }
    if (!Number.isFinite(lo)) { lo = -5; hi = 5; }
    lo = Math.min(lo, 0); hi = Math.max(hi, 0);
    const pad = (hi - lo || 2) * 0.1; y0 = lo - pad; y1 = hi + pad;
  }
  const iw = W - 2 * M;
  let H = spec.opts.height || (spec.opts.aspect === 'equal' ? iw * (y1 - y0) / (x1 - x0) + 2 * M
    : Math.min(Math.max(iw * (y1 - y0) / (x1 - x0), W * 0.42), W * 0.72) + 2 * M);
  H = Math.round(H);
  const ih = H - 2 * M;
  const X = (x) => M + (x - x0) / (x1 - x0) * iw;
  const Y = (y) => M + (y1 - y) / (y1 - y0) * ih;
  const r1 = (n) => Math.round(n * 10) / 10;
  const big = (y1 - y0) * 20;
  const inY = (y) => Number.isFinite(y) && y > y0 - big && y < y1 + big;
  const cls = (tags, base) => [base, ...['outer', 'inner', 'muted', 'good', 'dashed', 'thin', 'bold'].filter((t) => tags[t]).map((t) => `p-${t}`)].join(' ');

  // polyline through sampled points, broken at gaps and asymptotes
  function path(points) {
    let d = '', pen = false, prev = null;
    for (const pt of points) {
      if (!pt || !inY(pt[1]) || !Number.isFinite(pt[0])) { pen = false; prev = null; continue; }
      if (prev && Math.abs(pt[1] - prev[1]) > (y1 - y0) * 2 && Math.sign(pt[1] - (y0 + y1) / 2) !== Math.sign(prev[1] - (y0 + y1) / 2)) pen = false;
      d += `${pen ? 'L' : 'M'}${r1(X(pt[0]))} ${r1(Y(pt[1]))}`;
      pen = true; prev = pt;
    }
    return d;
  }
  // samples g on [a, b]; where g starts or stops being defined (the end of a square root), bisect to the edge
  const sample = (g, a = x0, b = x1, n = 480) => {
    const out = [];
    let prev = null;
    for (let i = 0; i <= n; i++) {
      const x = a + (b - a) * i / n, pt = [x, g(x)];
      if (prev && Number.isFinite(prev[1]) !== Number.isFinite(pt[1])) {
        let lo = prev[0], hi = x;
        const okLo = Number.isFinite(prev[1]);
        for (let k = 0; k < 40; k++) { const mid = (lo + hi) / 2; if (Number.isFinite(g(mid)) === okLo) lo = mid; else hi = mid; }
        const edge = okLo ? lo : hi;
        if (okLo) out.push([edge, g(edge)]); else out.push(null, [edge, g(edge)]);
      }
      out.push(pt);
      prev = pt;
    }
    return out;
  };
  const lineAcross = (px, py, m) => Number.isFinite(m) ? `M${r1(X(x0))} ${r1(Y(py + m * (x0 - px)))}L${r1(X(x1))} ${r1(Y(py + m * (x1 - px)))}` : `M${r1(X(px))} ${r1(Y(y0))}L${r1(X(px))} ${r1(Y(y1))}`;
  const dot = (x, y, tags = {}, r = 4) => Number.isFinite(x) && Number.isFinite(y) ? `<circle class="${cls(tags, 'p-dot')}" cx="${r1(X(x))}" cy="${r1(Y(y))}" r="${r}"/>` : '';
  const text = (x, y, s, tags = {}, anchor = 'start', dx = 6, dy = -8) => s && Number.isFinite(x) && Number.isFinite(y)
    ? `<text class="${cls(tags, 'p-label')}" x="${r1(Math.min(Math.max(X(x) + dx, 4), W - 4))}" y="${r1(Math.min(Math.max(Y(y) + dy, 14), H - 6))}" text-anchor="${X(x) + dx > W - 80 && anchor === 'start' ? 'end' : anchor}">${ESC(s)}</text>` : '';

  const back = [], mid = [], front = [];
  // grid and axes
  const sx = niceStep(x1 - x0, 8), sy = niceStep(y1 - y0, Math.max(4, 8 * ih / iw));
  let grid = '', ticks = '';
  const ax = Math.min(Math.max(0, y0), y1), ay = Math.min(Math.max(0, x0), x1);
  for (let v = Math.ceil(x0 / sx) * sx; v <= x1 + 1e-9; v += sx) {
    const gx = r1(X(v));
    if (spec.opts.grid) grid += `M${gx} ${M}V${H - M}`;
    if (Math.abs(v) > 1e-9) ticks += `<text x="${gx}" y="${r1(Math.min(Y(ax) + 15, H - 3))}" text-anchor="middle">${fmtNum(v, 3)}</text>`;
  }
  for (let v = Math.ceil(y0 / sy) * sy; v <= y1 + 1e-9; v += sy) {
    const gy = r1(Y(v));
    if (spec.opts.grid) grid += `M${M} ${gy}H${W - M}`;
    if (Math.abs(v) > 1e-9) ticks += `<text x="${r1(Math.max(X(ay) - 5, 22))}" y="${r1(gy + 4)}" text-anchor="end">${fmtNum(v, 3)}</text>`;
  }
  if (x0 < 0 && x1 > 0 && y0 < 0 && y1 > 0) ticks += `<text x="${r1(X(0) - 5)}" y="${r1(Y(0) + 15)}" text-anchor="end">0</text>`;
  back.push(`<path class="p-grid" d="${grid}"/>`);
  back.push(`<path class="p-axis" d="M${M} ${r1(Y(ax))}H${W - M}M${r1(X(ay))} ${M}V${H - M}"/>`);

  for (const it of spec.items) {
    const t = it.tags;
    if (t.hidden) continue;
    switch (it.kind) {
      case 'fn': {
        const g = (x) => it.body(withVar(scope, it.param, x));
        mid.push(`<path class="${cls(t, 'p-curve')}" d="${path(sample(g))}"/>`);
        if (it.label) {
          // label near the right end of the visible part
          let lx = null;
          for (let i = 100; i >= 0; i--) { const x = x0 + (x1 - x0) * (0.06 + 0.88 * i / 100), v = g(x); if (Number.isFinite(v) && v > y0 && v < y1) { lx = x; break; } }
          if (lx !== null) front.push(text(lx, g(lx), it.label, t, 'end', -4, -10));
        }
        break;
      }
      case 'inverse': {
        const g = f(it.f), span = Math.max(x1 - x0, y1 - y0);
        mid.push(`<path class="${cls(t, 'p-curve')}" d="${path(sample((u) => u, Math.min(x0, y0) - span, Math.max(x1, y1) + span, 900).map(([u]) => [g(u), u]).filter(([x]) => x >= x0 && x <= x1))}"/>`);
        if (it.label) {
          const pts = sample((u) => u, y0, y1, 200).map(([u]) => [g(u), u]).filter(([x, y]) => x > x0 && x < x1 && y > y0 && y < y1);
          const pt = pts[Math.floor(pts.length * 0.85)];
          if (pt) front.push(text(pt[0], pt[1], it.label, t, 'start', 8, 4));
        }
        break;
      }
      case 'param': {
        const a = it.a(scope), b = it.b(scope);
        mid.push(`<path class="${cls(t, 'p-curve')}" d="${path(sample((u) => u, a, b, 600).map(([u]) => { const s = withVar(scope, 't', u); return [it.p[0](s), it.p[1](s)]; }))}"/>`);
        break;
      }
      case 'implicit': {
        // marching squares over a grid of the view
        const nx = 160, ny = Math.round(160 * ih / iw), F = (x, y) => it.F({ ...scope, vars: { ...scope.vars, x, y } });
        const gx = (i) => x0 + (x1 - x0) * i / nx, gy = (j) => y0 + (y1 - y0) * j / ny;
        const vals = [];
        for (let j = 0; j <= ny; j++) { vals[j] = []; for (let i = 0; i <= nx; i++) vals[j][i] = F(gx(i), gy(j)); }
        let d = '';
        const lerp = (a, b, va, vb) => a + (b - a) * (va / (va - vb));
        for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
          const v = [vals[j][i], vals[j][i + 1], vals[j + 1][i + 1], vals[j + 1][i]];
          if (v.some((q) => !Number.isFinite(q))) continue;
          const xa = gx(i), xb = gx(i + 1), ya = gy(j), yb = gy(j + 1);
          const e = [];
          if ((v[0] > 0) !== (v[1] > 0)) e.push([lerp(xa, xb, v[0], v[1]), ya]);
          if ((v[1] > 0) !== (v[2] > 0)) e.push([xb, lerp(ya, yb, v[1], v[2])]);
          if ((v[2] > 0) !== (v[3] > 0)) e.push([lerp(xb, xa, v[2], v[3]), yb]);
          if ((v[3] > 0) !== (v[0] > 0)) e.push([xa, lerp(yb, ya, v[3], v[0])]);
          for (let k = 0; k + 1 < e.length; k += 2) d += `M${r1(X(e[k][0]))} ${r1(Y(e[k][1]))}L${r1(X(e[k + 1][0]))} ${r1(Y(e[k + 1][1]))}`;
        }
        mid.push(`<path class="${cls(t, 'p-curve')}" d="${d}"/>`);
        break;
      }
      case 'vline': {
        const a = it.at(scope);
        mid.push(`<path class="${cls(t, 'p-line')}" d="M${r1(X(a))} ${M}V${H - M}"/>`);
        if (it.label) front.push(text(a, y1, it.label, t, 'start', 6, 18));
        break;
      }
      case 'tangent': {
        const a = it.at(scope), y = f(it.f)(a), m = df(it.f)(a);
        mid.push(`<path class="${cls({ outer: !t.inner && !t.muted && !t.good, ...t }, 'p-line')}" d="${lineAcross(a, y, m)}"/>`);
        front.push(dot(a, y, { outer: !t.inner && !t.muted && !t.good, ...t }));
        if (it.label) front.push(text(a, y, it.label, { outer: !t.inner && !t.muted && !t.good, ...t }));
        break;
      }
      case 'secant': {
        const a = it.a(scope), b = it.b(scope), g = f(it.f), ya = g(a), yb = g(b);
        const tt = { inner: !t.outer && !t.muted && !t.good, ...t };
        if (Math.abs(b - a) > 1e-9) mid.push(`<path class="${cls(tt, 'p-line')}" d="${lineAcross(a, ya, (yb - ya) / (b - a))}"/>`);
        front.push(dot(a, ya, tt), dot(b, yb, tt));
        if (it.label) front.push(text(b, yb, it.label, tt));
        break;
      }
      case 'shade': {
        const a = it.a(scope), b = it.b(scope), g = f(it.f), h = it.g ? f(it.g) : () => 0;
        const top = sample(g, a, b, 200), bot = sample(h, a, b, 200).reverse();
        const ok = (p) => Number.isFinite(p[1]);
        const pts = [...top.filter(ok), ...bot.filter(ok)].map(([x, y]) => `${r1(X(x))} ${r1(Y(Math.max(Math.min(y, y1 + big), y0 - big)))}`);
        back.push(`<path class="${cls({ inner: !t.outer && !t.muted && !t.good, ...t }, 'p-area')}" d="M${pts.join('L')}Z"/>`);
        if (it.label) front.push(text((a + b) / 2, (g((a + b) / 2) + h((a + b) / 2)) / 2, it.label, t, 'middle', 0, 4));
        break;
      }
      case 'segment': {
        const [px, py] = it.p.map((e) => e(scope)), [qx, qy] = it.q.map((e) => e(scope));
        mid.push(`<path class="${cls(t, 'p-line')}" d="M${r1(X(px))} ${r1(Y(py))}L${r1(X(qx))} ${r1(Y(qy))}"/>`);
        if (it.label) front.push(text((px + qx) / 2, (py + qy) / 2, it.label, t, 'middle', py === qy ? 0 : 8, py === qy ? 16 : 4));
        break;
      }
      case 'through': {
        const [px, py] = it.p.map((e) => e(scope)), m = it.slope(scope);
        mid.push(`<path class="${cls({ outer: !t.inner && !t.muted && !t.good, ...t }, 'p-line')}" d="${lineAcross(px, py, m)}"/>`);
        break;
      }
      case 'point': {
        const [px, py] = it.p.map((e) => e(scope));
        front.push(dot(px, py, t), text(px, py, it.label, t));
        break;
      }
      case 'text': {
        const [px, py] = it.p.map((e) => e(scope));
        front.push(text(px, py, it.label, t, t.anchor || 'middle', 0, 0));
        break;
      }
    }
  }

  // draggable handles: position only; the browser adds behaviour
  const handles = [];
  for (const it of spec.items) {
    if (it.kind !== 'drag') continue;
    const pos = handlePos(spec, it, values[it.name], scope);
    const label = it.label || it.name;
    handles.push(`<g class="p-handle" data-var="${ESC(it.name)}" transform="translate(${r1(X(pos[0]))} ${r1(Y(pos[1]))})" tabindex="0" role="slider" aria-label="${ESC(label)}" aria-valuemin="${it.min(scope)}" aria-valuemax="${it.max(scope)}" aria-valuenow="${fmtNum(values[it.name], 3).replace('−', '-')}"><circle class="p-hit" r="22"/><circle class="p-focus" r="13"/><circle class="p-knob" r="8"/></g>`);
  }

  const layer = `<clipPath id="${id}-clip"><rect x="${M}" y="${M}" width="${iw}" height="${ih}"/></clipPath>`
    + `<g clip-path="url(#${id}-clip)">${back.join('')}${mid.join('')}</g><g class="p-ticks">${ticks}</g>${front.join('')}`;
  return { W, H, layer, handles: handles.join(''), view: { x0, x1, y0, y1, M, iw, ih } };
}

export function handlePos(spec, it, v, scope = makeScope(spec, {})) {
  if (it.on === 'fn') return [v, scope.call(it.f, v)];
  if (it.on === 'param') { const s = withVar(scope, 't', v); return [it.p[0](s), it.p[1](s)]; }
  return [v, 0];
}

// Value of a drag variable nearest to a point in data coordinates.
export function nearestValue(spec, it, values, px, py) {
  const scope = makeScope(spec, values);
  const lo = it.min(scope), hi = it.max(scope);
  if (it.on !== 'param') return Math.min(Math.max(px, lo), hi);
  let best = lo, bestD = Infinity;
  for (let i = 0; i <= 720; i++) {
    const v = lo + (hi - lo) * i / 720, [x, y] = handlePos(spec, it, v, scope), d = (x - px) ** 2 + (y - py) ** 2;
    if (d < bestD) { bestD = d; best = v; }
  }
  return best;
}

export function readouts(spec, values) {
  const scope = makeScope(spec, values);
  return spec.items.filter((it) => it.kind === 'readout').map((it) => fmtNum(it.expr(scope), Number(it.tags.digits) || 2));
}

export const isInteractive = (spec) => spec.items.some((it) => it.kind === 'slider' || it.kind === 'drag');
export { makeScope };
