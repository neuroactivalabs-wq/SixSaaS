// Verificación de licencias SIN servidor: firma ECDSA P-256 generada por EMP.
// Formato: SXS1.<payload base64url>.<firma base64url>
import { CONFIG } from './config.js';
import { MODULE_IDS } from './modules.js';

const dec = (s) => {
  const b = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b.padEnd(Math.ceil(b.length / 4) * 4, '='));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

export async function verifyLicense(raw, now = new Date()) {
  try {
    const key = String(raw ?? '').trim().replace(/\s+/g, '');
    const [v, p, s] = key.split('.');
    if (v !== 'SXS1' || !p || !s) return { ok: false, error: 'formato' };
    const pub = await crypto.subtle.importKey(
      'jwk', CONFIG.PUBLIC_KEY_JWK, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify'],
    );
    const firmaOk = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' }, pub, dec(s), new TextEncoder().encode(`${v}.${p}`),
    );
    if (!firmaOk) return { ok: false, error: 'firma' };
    const data = JSON.parse(new TextDecoder().decode(dec(p)));
    if (!MODULE_IDS.includes(data.m)) return { ok: false, error: 'modulo' };
    if (data.e && new Date(`${data.e}T23:59:59`) < now) return { ok: false, error: 'vencida', data };
    return { ok: true, key, data };
  } catch {
    return { ok: false, error: 'formato' };
  }
}

export const ERRORES = {
  formato: 'Ese código no tiene el formato correcto. Cópialo completo, tal como te lo enviaron.',
  firma: 'Esa licencia no es válida. Revisa que esté completa o escríbenos para ayudarte.',
  modulo: 'Esa licencia es de un módulo que esta versión no reconoce.',
  vencida: 'Esa licencia está vencida.',
};
