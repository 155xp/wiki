// Owner-only visibility control on article pages.
(() => {
  const LABEL = { public: 'Public', private: 'Private' };
  for (const btn of document.querySelectorAll('.vis-btn')) {
    const err = btn.parentElement.querySelector('.vis-err');
    const show = (v) => {
      btn.dataset.visibility = v;
      btn.setAttribute('aria-checked', String(v === 'public'));
      btn.textContent = LABEL[v];
    };
    btn.addEventListener('click', async () => {
      const prev = btn.dataset.visibility === 'public' ? 'public' : 'private';
      const next = prev === 'public' ? 'private' : 'public';
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = 'Saving…';
      err.textContent = '';
      try {
        const res = await fetch('/api/visibility', {
          method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: btn.dataset.slug, visibility: next }),
        });
        if (!res.ok) throw res.status;
        show((await res.json()).visibility === 'public' ? 'public' : 'private');
      } catch (status) {
        show(prev);
        if (status === 401) {
          const link = Object.assign(document.createElement('a'), { href: '/owner', textContent: 'Sign in again' });
          err.append('Session expired. ', link, '.');
        } else {
          err.textContent = 'Couldn’t save. Try again.';
        }
      } finally {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        if (document.activeElement === document.body) btn.focus();
      }
    });
  }
})();
