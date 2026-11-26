// Almacenamiento con dos modos: "guardar" (en este dispositivo) o "incognito" (solo memoria).
const MODE_KEY = 'sxs:mode';
const mem = new Map();

function ls() {
  try { return window.localStorage; } catch { return null; }
}

export function getMode() {
  const s = ls();
  try { return s?.getItem(MODE_KEY) || null; } catch { return null; }
}

export function setMode(mode) {
  const s = ls();
  try { s?.setItem(MODE_KEY, mode); } catch { /* sin almacenamiento */ }
  if (mode === 'incognito') clearPersisted();
}

export function get(key, fallback = null) {
  if (getMode() === 'guardar') {
    try {
      const v = ls()?.getItem(`sxs:${key}`);
      return v == null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  }
  return mem.has(key) ? mem.get(key) : fallback;
}

export function set(key, value) {
  mem.set(key, value);
  if (getMode() === 'guardar') {
    try { ls()?.setItem(`sxs:${key}`, JSON.stringify(value)); } catch { /* cuota llena */ }
  }
}

export function clearPersisted() {
  const s = ls();
  if (!s) return;
  try {
    Object.keys(s).filter((k) => k.startsWith('sxs:') && k !== MODE_KEY).forEach((k) => s.removeItem(k));
  } catch { /* nada */ }
}

export function wipeAll() {
  mem.clear();
  clearPersisted();
}
