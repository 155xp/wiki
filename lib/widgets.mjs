// Diagrams and widgets for study pages: ```plot and ```mermaid fences, ::: steps and ::: check blocks.
// Everything renders to plain HTML first; /widgets/widgets.js adds the interaction on pages that use it.
import container from 'markdown-it-container';
import { parseSpec, renderPlot, initialValues, readouts, isInteractive } from './plot.mjs';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function plotFigure(md, src, env, n) {
  let spec;
  try { spec = parseSpec(src); } catch (err) {
    (env.warnings ||= []).push(`plot ${n}: ${err.message}`);
    return `<pre class="plot-error">plot ${n}: ${esc(err.message)}</pre>\n`;
  }
  const values = initialValues(spec);
  const id = `plot${n}`;
  const { W, H, layer, handles } = renderPlot(spec, values, { id });
  const live = isInteractive(spec);
  if (live) env.widgets = true;
  const caption = spec.opts.caption ? `<figcaption>${md.renderInline(spec.opts.caption)}</figcaption>` : '';
  let controls = '';
  if (live) {
    const shown = readouts(spec, values);
    const sliders = spec.items.filter((it) => it.kind === 'slider').map((it) => {
      const s = { vars: values, call: () => NaN };
      const min = it.min(s), max = it.max(s), step = it.step ? it.step(s) : (max - min) / 100;
      return `<label class="plot-slider"><span class="plot-k">${md.renderInline(it.label)}</span><input type="range" data-var="${esc(it.name)}" min="${min}" max="${max}" step="${step}" value="${values[it.name]}"><output>${values[it.name]}</output></label>`;
    }).join('');
    const outs = spec.items.filter((it) => it.kind === 'readout').map((it, i) =>
      `<div class="plot-readout"><span class="plot-k">${md.renderInline(it.label)}</span><output data-readout="${i}">${shown[i]}</output></div>`).join('');
    const hint = spec.items.some((it) => it.kind === 'drag') ? '<div class="plot-hint">Drag the point, or focus it and use the arrow keys.</div>' : '';
    controls = `<div class="plot-panel">${sliders}${outs ? `<div class="plot-readouts" aria-live="polite">${outs}</div>` : ''}${hint}</div>`;
  }
  const aria = spec.opts.caption ? ` aria-label="${esc(spec.opts.caption.replace(/\$/g, ''))}"` : '';
  // tall plots get narrower so a square one doesn't fill the screen; slopes still read true
  const width = H > W * 0.75 ? ` style="max-width:${Math.round(460 * W / H) + (live ? 24 : 0)}px"` : '';
  return `<figure class="plot${live ? ' plot-live' : ''}" id="${id}"${width}${live ? ` data-src="${esc(src)}"` : ''}>`
    + `<svg viewBox="0 0 ${W} ${H}" role="img"${aria}><g class="p-layer">${layer}</g>${handles}</svg>${controls}${caption}</figure>\n`;
}

export function widgets(md) {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const tok = tokens[idx], lang = tok.info.trim().split(/\s+/)[0];
    if (lang === 'plot') {
      env.plots = (env.plots || 0) + 1;
      return plotFigure(md, tok.content, env, env.plots);
    }
    if (lang === 'mermaid') {
      env.mermaid = true;
      // "%% caption: ..." is a mermaid comment, so Obsidian ignores it while the site shows it as a caption
      const cap = /^\s*%%\s*caption:\s*(.+)$/m.exec(tok.content);
      return `<figure class="diagram flow"><pre class="mermaid">${esc(tok.content)}</pre>${cap ? `<figcaption>${md.renderInline(cap[1])}</figcaption>` : ''}</figure>\n`;
    }
    return fence(tokens, idx, options, env, slf);
  };

  // ::: steps Title  (an ordered list inside is revealed one item at a time)
  md.use(container, 'steps', {
    render: (tokens, idx, _o, env) => {
      if (tokens[idx].nesting !== 1) return '</div>\n';
      env.widgets = true;
      const title = tokens[idx].info.trim().slice('steps'.length).trim();
      return `<div class="steps">${title ? `<div class="steps-title">${md.renderInline(title)}</div>` : ''}\n`;
    },
  });

  // ::: check Question  (task-list choices - [ ] / - [x], then the explanation)
  md.use(container, 'check', {
    render: (tokens, idx, _o, env) => {
      if (tokens[idx].nesting !== 1) return '</div>\n';
      env.widgets = true;
      const q = tokens[idx].info.trim().slice('check'.length).trim();
      return `<div class="check">${q ? `<div class="check-q">${md.renderInline(q)}</div>` : ''}\n`;
    },
  });
  md.core.ruler.push('check_choices', (state) => {
    const toks = state.tokens, html = (content) => Object.assign(new state.Token('html_block', '', 0), { content });
    for (let i = 0; i < toks.length; i++) {
      if (toks[i].type !== 'container_check_open') continue;
      let depth = 0, close = i + 1;
      for (; close < toks.length; close++) {
        if (toks[close].type === 'container_check_open') depth++;
        if (toks[close].type === 'container_check_close') { if (!depth) break; depth--; }
      }
      // the first bullet list directly inside holds the choices
      let list = -1;
      for (let j = i + 1; j < close; j++) if (toks[j].type === 'bullet_list_open' && toks[j].level === toks[i].level + 1) { list = j; break; }
      let listClose = -1;
      if (list >= 0) {
        let d = 0;
        for (let j = list; j < close; j++) {
          if (toks[j].type === 'bullet_list_open') d++;
          if (toks[j].type === 'bullet_list_close' && --d === 0) { listClose = j; break; }
        }
        const items = [];
        for (let j = list + 1; j < listClose; j++) if (toks[j].type === 'list_item_open' && toks[j].level === toks[list].level + 1) items.push(j);
        const marked = items.map((j) => {
          const inline = toks.slice(j, listClose).find((t) => t.type === 'inline');
          const m = inline && /^\[( |x|X)\]\s+/.exec(inline.content);
          return m ? { j, inline, correct: m[1] !== ' ', cut: m[0].length } : null;
        });
        if (!marked.length || marked.some((x) => !x)) list = -1;
        else {
          toks[list].attrJoin('class', 'check-choices');
          for (const m of marked) {
            const { j, inline, correct, cut } = m;
            // "- [ ] choice" then an indented line under it: the line is that choice's hint
            const [choice, ...rest] = inline.content.slice(cut).split('\n');
            inline.content = choice;
            inline.children = [];
            state.md.inline.parse(choice, state.md, state.env, inline.children);
            if (rest.length) {
              const hint = new state.Token('inline', '', 0);
              hint.content = rest.join('\n');
              hint.children = [];
              state.md.inline.parse(hint.content, state.md, state.env, hint.children);
              m.hint = hint;
            }
            toks[j].attrJoin('class', 'choice');
            if (correct) toks[j].attrSet('data-correct', '');
          }
          // text after a choice's first paragraph is its hint, shown when that choice is picked
          for (let k = marked.length - 1; k >= 0; k--) {
            const j = marked[k].j, end = k + 1 < marked.length ? marked[k + 1].j - 1 : listClose - 1;
            const firstClose = toks.findIndex((t, n) => n > j && t.type === 'paragraph_close');
            if (marked[k].hint) {
              toks.splice(firstClose + 1, 0, html('<div class="choice-hint">'), marked[k].hint, html('</div>'));
              listClose += 3; close += 3;
            } else if (firstClose > 0 && firstClose + 1 < end) {
              toks.splice(end, 0, html('</div>'));
              toks.splice(firstClose + 1, 0, html('<div class="choice-hint">'));
              listClose += 2; close += 2;
            }
          }
        }
      }
      // the rest is the answer, collapsed so it also works without JavaScript
      const start = list >= 0 ? listClose + 1 : i + 1;
      if (start < close) {
        toks.splice(close, 0, html('</div></details>\n'));
        toks.splice(start, 0, html(`<details class="check-answer"><summary>Show answer</summary><div class="details-body">\n`));
      }
    }
  });
}
