// Mermaid flow and concept diagrams, loaded only on pages that have one. Colours follow the page theme.
import mermaid from './mermaid/mermaid.esm.min.mjs';

const dark = matchMedia('(prefers-color-scheme: dark)');
const blocks = [...document.querySelectorAll('pre.mermaid')];
blocks.forEach((b) => { b.dataset.src = b.textContent; });

function theme() {
  const css = getComputedStyle(document.documentElement), v = (n) => css.getPropertyValue(n).trim();
  return {
    darkMode: dark.matches,
    background: v('--page'),
    primaryColor: v('--raised'),
    primaryBorderColor: v('--line-strong'),
    primaryTextColor: v('--text'),
    secondaryColor: v('--inner-bg'),
    tertiaryColor: v('--box'),
    lineColor: v('--muted'),
    textColor: v('--text'),
    edgeLabelBackground: v('--page'),
    clusterBkg: v('--box'),
    clusterBorder: v('--border'),
    fontFamily: v('--sans'),
    fontSize: '15px',
  };
}

async function draw() {
  mermaid.initialize({ startOnLoad: false, theme: 'base', themeVariables: theme(), flowchart: { curve: 'basis', padding: 12, htmlLabels: true }, securityLevel: 'strict' });
  for (const b of blocks) { b.removeAttribute('data-processed'); b.textContent = b.dataset.src; }
  await mermaid.run({ nodes: blocks, suppressErrors: true });
}
draw();
dark.addEventListener('change', draw);
