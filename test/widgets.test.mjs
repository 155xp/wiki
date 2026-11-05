import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { compile, parseSpec, renderPlot, initialValues, readouts, nearestValue } from '../lib/plot.mjs';
import { parseArticle, renderArticle } from '../lib/render.mjs';

const ev = (src, vars = {}) => compile(src, { vars: new Set(['x', 'y', 'a']), fns: new Set() })({ vars });
const render = (body) => {
  const warnings = [];
  const html = renderArticle(parseArticle(`---\ntitle: T\nvisibility: public\n---\n\n${body}`, 't.md'), { slugs: new Set(), warnings });
  return { html, warnings };
};

describe('plot expressions', () => {
  test('precedence, implicit multiplication and functions', () => {
    assert.equal(ev('2x+1', { x: 3 }), 7);
    assert.equal(ev('-x^2', { x: 3 }), -9);
    assert.equal(ev('3(x+1)(x-1)', { x: 2 }), 9);
    assert.equal(ev('xy', { x: 2, y: 5 }), 10);
    assert.equal(ev('2^3^2'), 512);
    assert.ok(Math.abs(ev('sin^2(x) + cos^2(x)', { x: 1.2 }) - 1) < 1e-12);
    assert.ok(Math.abs(ev("sin'(0)") - 1) < 1e-6);
  });
  test('unknown names fail at build time', () => {
    assert.throws(() => ev('foo(x)'), /unknown name "foo"/);
    assert.throws(() => parseSpec('tangent g at 1'), /line 1: no function named "g"/);
  });
});

describe('plot specs', () => {
  const spec = parseSpec('x: -1 to 6\ny: -1 to 6\nf(x) = sqrt(25 - x^2)\ndrag a on f from 0 to 4.8 = 3\ntangent f at a\nreadout "slope" f\'(a)');
  test('readouts use the numeric derivative of user functions', () => {
    const v = initialValues(spec);
    assert.deepEqual(v, { a: 3 });
    assert.deepEqual(readouts(spec, v), ['−0.75']);
    assert.deepEqual(readouts(spec, { a: 4 }), ['−1.33']);
  });
  test('a drag on a function follows x, clamped to its range', () => {
    const drag = spec.items.find((it) => it.kind === 'drag');
    assert.equal(nearestValue(spec, drag, { a: 3 }, 2.5, 99), 2.5);
    assert.equal(nearestValue(spec, drag, { a: 3 }, 9, 0), 4.8);
  });
  test('a drag on a parametric curve finds the nearest parameter', () => {
    const s = parseSpec('drag t on (5cos(t), 5sin(t)) from 0 to 2pi = 1');
    const v = nearestValue(s, s.items[0], { t: 1 }, 0, 5);
    assert.ok(Math.abs(v - Math.PI / 2) < 0.01);
  });
  test('square roots are drawn all the way to the edge of their domain', () => {
    const { layer, view } = renderPlot(parseSpec('x: -1 to 6\ny: -1 to 6\nf(x) = sqrt(25 - x^2)'), {});
    const d = /class="p-curve" d="([^"]+)"/.exec(layer)[1];
    const last = d.split('L').pop().split(' ').map(Number);
    const yAxis = view.M + 6 / 7 * view.ih;
    assert.ok(Math.abs(last[1] - yAxis) < 0.2, `ends at ${last[1]}, axis at ${yAxis}`);
  });
});

describe('widgets in articles', () => {
  test('a static plot is an inline SVG and loads no script', () => {
    const { html, warnings } = render('```plot\nf(x) = x^2\ncaption: Figure 1. A parabola.\n```');
    assert.deepEqual(warnings, []);
    assert.match(html, /<figure class="plot" id="plot1"[^>]*><svg viewBox/);
    assert.match(html, /<figcaption>Figure 1\. A parabola\.<\/figcaption>/);
    assert.doesNotMatch(html, /widgets\.js/);
  });
  test('an interactive plot carries its source and initial readouts', () => {
    const { html } = render('```plot\nf(x) = x^2\ndrag a on f from -2 to 2 = 1\nreadout "slope" f\'(a)\n```');
    assert.match(html, /class="plot plot-live"[^>]*data-src="f\(x\) = x\^2/);
    assert.match(html, /<output data-readout="0">2<\/output>/);
    assert.match(html, /class="p-handle" data-var="a"[^>]*role="slider"/);
    assert.match(html, /<script type="module" src="\/widgets\/widgets\.js">/);
  });
  test('a broken plot is reported, not silently dropped', () => {
    const { html, warnings } = render('```plot\nwiggle f\n```');
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /plot 1: line 1: not a plot item/);
    assert.match(html, /class="plot-error"/);
  });
  test('mermaid blocks become a diagram figure and load the diagram script only then', () => {
    const { html } = render('```mermaid\nflowchart LR\n  a --> b\n%% caption: Figure 2. Flow.\n```');
    assert.match(html, /<pre class="mermaid">flowchart LR\n  a --&gt; b/);
    assert.match(html, /<figcaption>Figure 2\. Flow\.<\/figcaption>/);
    assert.match(html, /diagrams\.js/);
    assert.doesNotMatch(render('plain').html, /diagrams\.js|widgets\.js/);
  });
  test('steps keep their list so the page reads without JavaScript', () => {
    const { html } = render('::: steps Example 1: $x^2$\nFind it.\n\n1. one\n2. two\n:::');
    assert.match(html, /<div class="steps"><div class="steps-title">Example 1: <span class="katex">/);
    assert.match(html, /<ol>\n<li>one<\/li>\n<li>two<\/li>\n<\/ol>/);
  });
  test('check choices hide which one is right and keep hints and the explanation', () => {
    const { html } = render('::: check Pick one\n- [ ] wrong\n  Because.\n- [x] right\n\nWhy it is right.\n:::');
    assert.match(html, /<ul class="check-choices">/);
    assert.match(html, /<li class="choice">wrong<div class="choice-hint">Because\.<\/div><\/li>/);
    assert.match(html, /<li class="choice" data-correct="">right<\/li>/);
    assert.doesNotMatch(html, /\[x\]|\[ \]/);
    assert.match(html, /<details class="check-answer"><summary>Show answer<\/summary><div class="details-body">\n<p>Why it is right\.<\/p>/);
  });
  test('a check with no choices is a question with a hidden answer', () => {
    const { html } = render('::: check Why?\nBecause.\n:::');
    assert.match(html, /<div class="check-q">Why\?<\/div>\n<details class="check-answer"><summary>Show answer<\/summary>/);
  });
});
