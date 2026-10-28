// Wires the /owner page: passkey registration, sign-in and sign-out.
(() => {
  const params = new URLSearchParams(location.search);
  const token = params.get('enroll');
  if (token !== null) {
    params.delete('enroll');
    const q = params.toString();
    history.replaceState(null, '', location.pathname + (q ? `?${q}` : '') + location.hash);
  }
  const err = document.getElementById('owner-err');
  const wa = window.SimpleWebAuthnBrowser;

  const post = async (path, body = {}) => {
    const res = await fetch(path, {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status });
    return res.json();
  };

  const flows = {
    enroll: {
      run: async () => {
        const optionsJSON = await post('/api/owner/register/options', { token });
        const response = await wa.startRegistration({ optionsJSON });
        await post('/api/owner/register/verify', { token, response });
      },
      message: (e) => e.status === 403 ? 'This registration link is no longer valid.' : 'Couldn’t register the passkey. Try again.',
    },
    signin: {
      run: async () => {
        const optionsJSON = await post('/api/owner/login/options');
        const response = await wa.startAuthentication({ optionsJSON });
        await post('/api/owner/login/verify', { response });
      },
      message: (e) => e.status === 404 ? 'No passkey is registered.' : 'Couldn’t sign in. Try again.',
    },
    signout: { run: () => post('/api/owner/logout'), message: () => 'Couldn’t sign out. Try again.' },
  };

  for (const [id, flow] of Object.entries(flows)) {
    const btn = document.getElementById(id);
    if (!btn) continue;
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = btn.dataset.pending;
      err.textContent = '';
      try {
        await flow.run();
        location.assign('/');
      } catch (e) {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        btn.textContent = label;
        err.textContent = flow.message(e);
      }
    });
  }
})();
