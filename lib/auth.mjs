import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_MS = 30 * 24 * 60 * 60 * 1000;
const CHALLENGE_MS = 5 * 60 * 1000;

export function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const hash = (s) => createHash('sha256').update(s).digest();
  return timingSafeEqual(hash(a), hash(b));
}

function sign(secret, payload) {
  if (!secret) throw new Error('Session secret is not configured');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${createHmac('sha256', secret).update(body).digest('base64url')}`;
}

function verify(secret, token, now) {
  if (!secret || typeof token !== 'string' || !/^[\w-]+\.[\w-]+$/.test(token)) return null;
  const [body, signature] = token.split('.');
  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  if (!constantTimeEqual(signature, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    return Number.isFinite(payload?.exp) && payload.exp > now ? payload : null;
  } catch { return null; }
}

export const signSession = (secret, { now = Date.now(), ttlMs = SESSION_MS } = {}) => sign(secret, { sub: 'owner', exp: now + ttlMs });
export const verifySession = (secret, token, now = Date.now()) => verify(secret, token, now)?.sub === 'owner';
export const signChallenge = (secret, challenge, now = Date.now()) => sign(secret, { challenge, exp: now + CHALLENGE_MS });
export const verifyChallenge = (secret, token, now = Date.now()) => {
  const challenge = verify(secret, token, now)?.challenge;
  return typeof challenge === 'string' && challenge ? challenge : null;
};

export function parseCookies(header = '') {
  const cookies = Object.create(null);
  for (const part of (header || '').split(';')) {
    const i = part.indexOf('=');
    if (i < 1) continue;
    try { cookies[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim()); } catch { /* Ignore malformed cookies. */ }
  }
  return cookies;
}

export const sessionCookie = (token) => `wiki_owner=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`;
export const clearSessionCookie = () => sessionCookie('').replace('Max-Age=2592000', 'Max-Age=0');
export const challengeCookie = (token) => `wiki_chal=${token}; Path=/api/owner; HttpOnly; Secure; SameSite=Strict; Max-Age=300`;
export const clearChallengeCookie = () => challengeCookie('').replace('Max-Age=300', 'Max-Age=0');
