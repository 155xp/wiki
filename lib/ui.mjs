import { esc, page } from './render.mjs';

// Owner-only UI. Everything here is emitted only for a signed-in owner (or on /owner), never on public pages.
const RING = 'outline:none;box-shadow:0 0 0 2px var(--page),0 0 0 4px var(--link)';
const MOTION = '@media (prefers-reduced-motion:reduce){.vis-btn,.owner-btn{transition:none}.vis-btn:active,.owner-btn:active{transform:none}}';

const TOGGLE_CSS = `.vis{float:right;margin-left:12px;color:var(--muted);font-size:13px}
.vis-btn{font:inherit;color:var(--text);background:var(--box);border:1px solid var(--border);border-radius:2px;padding:0 8px;margin-left:4px;line-height:20px;min-width:62px;cursor:pointer;transition:border-color .12s,transform .1s}
.vis-btn[aria-checked="false"]{color:var(--muted)}
@media (hover:hover){.vis-btn:hover:not(:disabled){border-color:var(--muted)}}
.vis-btn:active:not(:disabled){transform:scale(.97)}
.vis-btn:focus-visible{${RING}}
.vis-btn:disabled{cursor:progress;opacity:.7}
.vis-err{display:block;text-align:right;color:var(--missing);margin-top:2px}
.vis-err:empty{display:none}
${MOTION}`;

export function ownerToggle(slug, visibility) {
  const pub = visibility === 'public';
  return `<style>${TOGGLE_CSS}</style><span class="vis"><span id="vis-label">Visibility</span><button type="button" class="vis-btn" id="vis-btn" role="switch" aria-checked="${pub}" aria-labelledby="vis-label vis-btn" data-slug="${esc(slug)}" data-visibility="${pub ? 'public' : 'private'}">${pub ? 'Public' : 'Private'}</button><span class="vis-err" role="status" aria-live="polite"></span></span>`;
}

// For the owner's index: the small "Private" tag beside a row's title.
export const ownerIndexStyle = `<style>.index .vis-tag{grid-column:2;grid-row:2;justify-self:end;align-self:start;color:var(--muted);font-size:12px;line-height:18px;border:1px solid var(--border);border-radius:2px;padding:0 5px;margin-top:2px}
@media (max-width:720px){.index .vis-tag{grid-column:1;grid-row:auto;justify-self:start}}</style>`;

const OWNER_CSS = `<style>.owner-page p{max-width:560px}
.owner-actions{display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:20px}
.owner-btn{font:600 14px/1.4 var(--sans);color:var(--page);background:var(--link);border:1px solid var(--link);border-radius:2px;padding:6px 14px;cursor:pointer;transition:filter .12s,transform .1s}
.owner-btn.secondary{color:var(--text);background:var(--box);border-color:var(--border);font-weight:400}
@media (hover:hover){.owner-btn:hover:not(:disabled){filter:brightness(1.08)}.owner-btn.secondary:hover:not(:disabled){filter:none;border-color:var(--muted)}}
.owner-btn:active:not(:disabled){transform:scale(.97)}
.owner-btn:focus-visible{${RING}}
.owner-btn:disabled{cursor:progress;opacity:.7}
.owner-err{color:var(--missing);font-size:14px}
.owner-err:empty{display:none}
${MOTION}</style>`;

const button = (id, label, pending, cls = '') => `<button type="button" class="owner-btn${cls}" id="${id}" data-pending="${pending}">${label}</button>`;

export function ownerPage({ signedIn, canEnroll }) {
  const [text, actions] = canEnroll
    ? ['Register a passkey on this device to sign in as owner. Registration closes after the first passkey.', button('enroll', 'Register a passkey', 'Registering…')]
    : signedIn
      ? ['You are signed in. Private articles are listed on the index, and each article has a visibility control.', `<a href="/">All articles</a>${button('signout', 'Sign out', 'Signing out…', ' secondary')}`]
      : ['Sign in to see private articles and change visibility.', button('signin', 'Sign in with passkey', 'Signing in…')];
  const body = `<main class="owner-page">
<h1 class="title">Owner</h1>
<p>${text}</p>
<div class="owner-actions">${actions}</div>
<p class="owner-err" id="owner-err" role="status" aria-live="polite"></p>
</main>`;
  return page({ title: 'Owner · wiki', description: '', body, canonical: '/owner', robots: 'noindex, nofollow', extraHead: OWNER_CSS,
    extraBody: '\n<script src="/owner/webauthn.js" defer></script>\n<script src="/owner/owner.js" defer></script>' });
}
