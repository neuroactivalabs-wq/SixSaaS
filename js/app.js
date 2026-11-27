import { CONFIG } from './config.js';
import { MODULES } from './modules.js';
import { verifyLicense, ERRORES } from './license.js';
import * as store from './store.js';
import * as opt from './optimizer.js';
import { CURSOS, TOTAL_LECCIONES, GRATIS_LECCIONES, GRATIS_POR_CURSO, cursoDe, leccionDe, ACCION_LECCION } from './academia.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const app = $('#app');

const state = {
  licencias: [],
  perfil: {},
  gen: {},        // datos de los generadores
  resultado: null,
  progreso: {},
  tool: 'descripcion',
  installEvt: null,
};

/* ---------- Estado derivado ---------- */
const fmt = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
// SixSaaS Full se abre solo con la licencia 'sixsaas'. La Academia solo abre los cursos y los módulos Neuro no abren nada aquí.
const isFull = () => state.licencias.some((l) => l.m !== 'academia' && (CONFIG.ANY_KEY_UNLOCKS_FULL || l.m === 'sixsaas'));
const tieneAcademia = () => state.licencias.some((l) => l.m === 'academia');
const tiene = (id) => state.licencias.some((l) => l.m === id);

function toast(msg, err = false) {
  const t = $('#toast');
  t.textContent = msg; t.className = `toast${err ? ' err' : ''}`; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 3200);
}

/* ---------- Enlace con los módulos (no depende de ningún servidor) ---------- */
const UK = 'sxs-urls';
const urlsGet = () => { try { return JSON.parse(localStorage.getItem(UK) || '{}'); } catch { return {}; } };
const urlsSet = (o) => { try { localStorage.setItem(UK, JSON.stringify(o)); } catch { /* sin almacenamiento */ } };
const limpiaUrl = (u) => { try { const x = new URL(String(u).trim()); if (x.protocol !== 'https:' && x.hostname !== 'localhost') return ''; return `${x.origin}${x.pathname.endsWith('/') ? x.pathname : `${x.pathname}/`}`; } catch { return ''; } };
const urlDe = (id) => urlsGet()[id] || '';
const b64 = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const selfUrl = () => `${location.origin}${location.pathname.replace(/[^/]*$/, '')}`;
const abrirMod = (id) => { const u = urlDe(id); return u ? `${u}#/enlazar?hub=${encodeURIComponent(selfUrl())}&sibs=${b64(urlsGet())}` : ''; };
function sondear(id) {
  return new Promise((res) => { const url = CONFIG.AUTO_URL(id); const im = new Image(); const t = setTimeout(() => { im.src = ''; res(false); }, 6000); im.onload = () => { clearTimeout(t); res(url); }; im.onerror = () => { clearTimeout(t); res(false); }; im.src = `${url}img/logo.webp?c=${Date.now() % 1e5}`; });
}
async function detectar() {
  if (!navigator.onLine) return;
  const u = urlsGet(); let cambio = false;
  await Promise.all(MODULES.filter((m) => !u[m.id]).map(async (m) => { const r = await sondear(m.id); if (r) { u[m.id] = r; cambio = true; } }));
  if (cambio) { urlsSet(u); render(true); }
}
function contactoLink(tema) {
  const t = `Hola Neuro Gestión Empresarial 👋 Escribo desde SixSaaS v${CONFIG.VERSION}.\nTema: ${tema}.\n`;
  return CONFIG.CONTACTO_WA ? `https://wa.me/${String(CONFIG.CONTACTO_WA).replace(/\D/g, '')}?text=${encodeURIComponent(t)}` : '#/pagar';
}

async function copiar(texto) {
  try { await navigator.clipboard.writeText(texto); toast('Copiado ✓'); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = texto; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Copiado ✓'); } catch { toast('No se pudo copiar', true); }
    ta.remove();
  }
}

function persistir() {
  store.set('licencias', state.licencias);
  store.set('perfil', state.perfil);
  store.set('gen', state.gen);
  store.set('progreso', state.progreso);
}

async function cargar() {
  state.perfil = store.get('perfil', {});
  state.gen = store.get('gen', {});
  state.progreso = store.get('progreso', {});
  for (const k of Object.keys(state.progreso)) { if (/^\d+$/.test(k)) { state.progreso[`google:${k}`] ||= state.progreso[k]; delete state.progreso[k]; } }
  const guardadas = store.get('licencias', []);
  const validas = [];
  for (const l of guardadas) {
    const r = await verifyLicense(l.key);
    if (r.ok) validas.push({ key: r.key, ...r.data });
  }
  state.licencias = validas;
}

async function activar(raw) {
  const r = await verifyLicense(raw);
  if (!r.ok) { toast(ERRORES[r.error] || 'Licencia no válida', true); return false; }
  if (!state.licencias.some((l) => l.key === r.key)) state.licencias.push({ key: r.key, ...r.data });
  persistir();
  toast('Licencia activada ✓');
  return true;
}

/* ---------- Modo incógnito / guardar ---------- */
function pedirModo() {
  const m = document.createElement('div');
  m.className = 'modal';
  m.innerHTML = `<div class="card glow" role="dialog" aria-modal="true" aria-labelledby="mt">
    <h2 id="mt">¿Cómo quieres usar SixSaaS?</h2>
    <p>Tú decides qué pasa con tus datos. Nada de lo que escribes sale de tu dispositivo.</p>
    <button class="btn opt" data-modo="guardar">Guardar en este dispositivo<br><small>Recuerdo tus datos y licencias para la próxima vez.</small></button>
    <button class="btn ghost opt" data-modo="incognito">Modo incógnito<br><small>No guardo nada: al cerrar la pestaña, todo se borra.</small></button>
  </div>`;
  document.body.appendChild(m);
  return new Promise((res) => {
    m.addEventListener('click', (e) => {
      const b = e.target.closest('[data-modo]');
      if (!b) return;
      store.setMode(b.dataset.modo);
      m.remove(); res(b.dataset.modo);
    });
    $('[data-modo]', m).focus();
  });
}

/* ---------- Vistas ---------- */
function modCard(m, compact = false) {
  const activo = tiene(m.id);
  const url = urlDe(m.id);
  const buy = `#/pagar/${m.id}`;
  const logo = m.logo
    ? `<img class="logo" src="${m.logo}" alt="Logo ${esc(m.nombre)}" width="84" height="84" loading="lazy">`
    : `<div class="ph" aria-hidden="true">${esc(m.sigla)}</div>`;
  const accion = url
    ? `<a class="btn small" href="${esc(abrirMod(m.id))}">Abrir</a>${activo ? '' : `<a class="btn small ghost" href="${esc(buy)}">Comprar</a>`}`
    : `<a class="btn small" href="${esc(buy)}">Obtener</a>${activo ? '<a class="btn small ghost" href="#/ajustes">Enlazar</a>' : ''}`;
  if (compact) {
    const lg = m.logo ? `<img class="logo" src="${m.logo}" alt="Logo ${esc(m.nombre)}" width="48" height="48" loading="lazy">` : `<div class="ph" aria-hidden="true">${esc(m.sigla)}</div>`;
    return `<article class="card mod compact" title="${esc(m.desc)}"><div class="head">${lg}<div><h3>${esc(m.nombre)}</h3><span class="price">$${CONFIG.PRECIO_MODULO.toFixed(2)}</span></div></div><div class="meta">${accion}${activo ? '<span class="tag ok">Activo ✓</span>' : ''}</div></article>`;
  }
  return `<article class="card mod">
    <div class="head">${logo}<div><h3>${esc(m.nombre)}</h3><span class="price">$${CONFIG.PRECIO_MODULO.toFixed(2)} <small style="color:var(--mut);font-weight:600">pago único</small></span></div></div>
    <p>${esc(m.desc)}</p>
    <div class="meta">${accion}${activo ? '<span class="tag ok">Activo ✓</span>' : '<span class="tag">7 usos gratis</span>'}</div>
  </article>`;
}

function vistaInicio() {
  return `
  <section class="hero sm">
    <img src="img/sixsaas.webp" alt="SixSaaS" width="110" height="110">
    <h1>Consigue clientes y haz que <span style="color:var(--cyan)">vuelvan</span></h1>
    <p>Una academia con ${CURSOS.length} cursos prácticos, un optimizador gratis para tu perfil de Google y herramientas Neuro para ponerlo en práctica.</p>
  </section>
  <section class="card glow acad">
    <div class="acadhead"><img src="img/academia.webp" alt="Academia SixSaaS" width="132" height="132"><div>
      <span class="tag ok">NUEVO · ${TOTAL_LECCIONES} lecciones</span>
      <h2 style="margin-top:8px">Academia SixSaaS</h2>
      <p class="mt">${CURSOS.length} cursos paso a paso. Cada lección trae tarea, plantilla lista para copiar, mensaje para Gemini y quiz.</p></div></div>
    <ol class="embudo mt" aria-label="Recorrido de la academia">${CURSOS.map((c) => `<li><a href="#/academia/${c.id}"><span>${c.icono}</span><b>${esc(c.etapa)}</b></a></li>`).join('')}</ol>
    <div class="grid mt">${CURSOS.map(cursoCard).join('')}</div>
    <p class="mt"><b>Un tercio de cada curso es gratis</b> (${GRATIS_LECCIONES} lecciones). ${tieneAcademia() ? 'Tienes la Academia completa ✓' : `Los ${CURSOS.length} cursos completos, por <b>$${CONFIG.PRECIO_ACADEMIA.toFixed(2)}</b> pago único.`}</p>
    <div class="row mt"><a class="btn" href="#/academia">${tieneAcademia() ? 'Continuar aprendiendo' : 'Empezar gratis'}</a>${tieneAcademia() ? '' : `<a class="btn ghost" href="${esc(buyAcademia())}">Obtener la Academia · $${CONFIG.PRECIO_ACADEMIA.toFixed(2)}</a>`}</div>
  </section>
  <section class="card"><div class="row sp"><div><h3>📊 Optimizador de tu perfil de Google</h3><p class="mt">Tu puntaje de 0 a 100 y las acciones que más suman. Gratis, en 3 minutos.</p></div><a class="btn small" href="#/optimizador">Analizar mi perfil</a></div></section>
  <section class="mods-sec">
    <h2 class="sub">Herramientas Neuro para ponerlo en práctica</h2>
    <p class="help" style="margin:4px 0 12px">Módulos independientes de $${CONFIG.PRECIO_MODULO.toFixed(2)} (pago único), con 7 usos gratis cada uno.</p>
    <div class="grid compact">${MODULES.map((m) => modCard(m, true)).join('')}</div>
    <div class="row mt"><a class="btn ghost small" href="#/comparar">Comparar Gratis vs Full</a><a class="btn ghost small" href="#/licencias">Tengo una licencia</a></div>
  </section>
  <section class="card"><div class="row sp"><div><h3>💬 ¿Necesitas ayuda?</h3><p class="mt">Guías, productos nuevos o ayuda con tu compra: habla con Neuro Gestión Empresarial.</p></div><a class="btn small" href="#/ayuda">Ayuda</a></div></section>
  <section class="card"><h3>Sin letra chica</h3>
    <p class="mt">SixSaaS no cobra ni procesa pagos dentro de la app. Tus datos viven en tu dispositivo y tú eliges si se guardan o se usa en modo incógnito.</p></section>`;
}

const CAMPOS = [
  { sec: 'Tu negocio', items: [
    { k: 'nombre', t: 'text', l: 'Nombre del negocio', ph: 'Ej. Farmacia Sol' },
    { k: 'categoria', t: 'text', l: 'Categoría principal en Google', ph: 'Ej. Farmacia' },
    { k: 'ciudad', t: 'text', l: 'Ciudad o barrio', ph: 'Ej. David, Chiriquí' },
  ] },
  { sec: 'Base del perfil', items: [
    { k: 'verificado', t: 'bool', l: 'Mi perfil está verificado por Google' },
    { k: 'horario', t: 'sel', l: 'Horario de atención', opts: [['no', 'No lo tengo cargado'], ['parcial', 'Parcial'], ['completo', 'Completo (incluye feriados)']] },
    { k: 'telefono', t: 'bool', l: 'Tengo un teléfono publicado' },
    { k: 'web', t: 'bool', l: 'Tengo sitio web o enlace de reservas/pedidos' },
    { k: 'categoriasSec', t: 'num', l: 'Categorías secundarias (0–9)', min: 0, max: 9 },
    { k: 'atributos', t: 'bool', l: 'Completé los atributos (pagos, accesibilidad, etc.)' },
    { k: 'nap', t: 'bool', l: 'Mi nombre, dirección y teléfono son idénticos en mis redes y directorios' },
  ] },
  { sec: 'Contenido', items: [
    { k: 'descripcion', t: 'area', l: 'Descripción actual (pégala; máx. 750 caracteres)', wide: true },
    { k: 'servicios', t: 'num', l: 'Servicios o productos cargados', min: 0 },
    { k: 'fotos', t: 'num', l: 'Cantidad de fotos', min: 0 },
    { k: 'logoPortada', t: 'bool', l: 'Ya subí mi logo y foto de portada' },
  ] },
  { sec: 'Reputación', items: [
    { k: 'resenas', t: 'num', l: 'Cantidad de reseñas', min: 0 },
    { k: 'rating', t: 'num', l: 'Calificación promedio (0–5)', min: 0, max: 5, step: '0.1' },
    { k: 'respondidas', t: 'num', l: '% de reseñas que has respondido', min: 0, max: 100 },
    { k: 'ultimaResena', t: 'sel', l: 'Última reseña recibida', opts: [['mas', 'Hace más de un mes'], ['mes', 'En el último mes'], ['semana', 'En la última semana']] },
  ] },
  { sec: 'Actividad', items: [
    { k: 'posts30', t: 'num', l: 'Publicaciones en los últimos 30 días', min: 0 },
    { k: 'enlaceResenas', t: 'bool', l: 'Ya tengo mi enlace corto para pedir reseñas' },
  ] },
];

function campoHTML(c) {
  const v = state.perfil[c.k];
  if (c.t === 'bool') return `<label class="chk"><input type="checkbox" data-k="${c.k}" ${v ? 'checked' : ''}><span>${esc(c.l)}</span></label>`;
  if (c.t === 'sel') return `<label class="f">${esc(c.l)}<select data-k="${c.k}">${c.opts.map(([val, lab]) => `<option value="${val}" ${v === val ? 'selected' : ''}>${esc(lab)}</option>`).join('')}</select></label>`;
  if (c.t === 'area') return `<label class="f" style="grid-column:1/-1">${esc(c.l)}<textarea data-k="${c.k}" maxlength="3000">${esc(v ?? '')}</textarea><span class="help">${String(v ?? '').length} caracteres</span></label>`;
  if (c.t === 'num') return `<label class="f">${esc(c.l)}<input type="number" inputmode="decimal" data-k="${c.k}" value="${esc(v ?? '')}" ${c.min != null ? `min="${c.min}"` : ''} ${c.max != null ? `max="${c.max}"` : ''} ${c.step ? `step="${c.step}"` : ''}></label>`;
  return `<label class="f">${esc(c.l)}<input type="text" data-k="${c.k}" value="${esc(v ?? '')}" placeholder="${esc(c.ph ?? '')}" autocomplete="off"></label>`;
}

function vistaFormulario() {
  return `
  <section>
    <h1 style="font-size:1.6rem">Optimizador de perfil de Google</h1>
    <p class="mt">Responde lo que sepas. No necesitas conectar tu cuenta de Google: todo se calcula aquí, en tu dispositivo.</p>
    <p class="note mt">Esta herramienta sigue las guías de Google: nada de palabras clave en el nombre, ni incentivos por reseñas.</p>
  </section>
  <form id="form" class="mt2" novalidate>
    ${CAMPOS.map((g) => `<fieldset><legend>${esc(g.sec)}</legend><div class="fields">${g.items.map(campoHTML).join('')}</div></fieldset>`).join('')}
    <div class="row mt2"><button class="btn" type="submit">Analizar mi perfil</button><button class="btn ghost" type="button" data-act="limpiar">Borrar respuestas</button></div>
  </form>`;
}

function colorPuntaje(t) { return t >= 85 ? 'var(--ok)' : t >= 70 ? 'var(--cyan)' : t >= 50 ? 'var(--warn)' : 'var(--bad)'; }

function actHTML(a, detalle) {
  return `<div class="act ${a.estado}"><span class="pts">−${a.perdidos} pts</span><h3>${esc(a.titulo)}</h3><p>${esc(a.accion)}</p>
    ${ACCION_LECCION[a.id] ? `<p class="help"><a href="#/academia/google/${ACCION_LECCION[a.id]}">📘 Aprende a hacerlo: Lección ${ACCION_LECCION[a.id]} del curso de Google</a></p>` : ''}
    ${detalle ? `<details><summary>Cómo hacerlo, paso a paso</summary><ol>${a.pasos.map((p) => `<li>${esc(p)}</li>`).join('')}</ol></details>` : ''}</div>`;
}

const HERRAMIENTAS = [
  { id: 'descripcion', n: 'Descripción' },
  { id: 'respuestas', n: 'Respuestas a reseñas' },
  { id: 'posts', n: 'Publicaciones' },
  { id: 'pedir', n: 'Pedir reseñas' },
  { id: 'plan', n: 'Plan 30 días' },
  { id: 'ia', n: 'Prompts Gemini / IA' },
];

function outHTML(items) {
  return items.map((i, idx) => `<div class="out"><span class="et">${esc(i.etiqueta ?? `${i.tipo ? `Semana ${i.sem} · ${i.tipo}` : ''}`)}</span>${esc(i.texto)}<div class="cp"><button class="btn small ghost" data-copy="${idx}">Copiar</button></div></div>`).join('');
}

function herramientaHTML(r, full) {
  const t = state.tool;
  const permitido = full || CONFIG.FREE_TOOLS.includes(t);
  if (!permitido) {
    return `<div class="lock mt"><h3>Disponible en SixSaaS Full</h3><p class="mt">Con la licencia de SixSaaS Full ($${CONFIG.PRECIO_MODULO.toFixed(2)}, pago único) desbloqueas todas las herramientas y los pasos detallados.</p><div class="row mt"><a class="btn" href="#/pagar/sixsaas">Cómo pagar</a><a class="btn ghost" href="#/licencias">Activar licencia</a></div></div>`;
  }
  const g = state.gen;
  const inputs = `<div class="fields mt">
    <label class="f">Tus servicios principales (separados por coma)<input type="text" data-g="serviciosTexto" value="${esc(g.serviciosTexto ?? '')}" placeholder="cortes, barba, tintes"></label>
    <label class="f">Tu diferencial<input type="text" data-g="diferencial" value="${esc(g.diferencial ?? '')}" placeholder="Atención sin filas y con cita"></label>
    <label class="f">Tu WhatsApp o teléfono<input type="text" data-g="contacto" value="${esc(g.contacto ?? '')}" placeholder="6000-0000"></label>
    <label class="f">Tu enlace de reseñas de Google<input type="text" data-g="enlaceResenas" value="${esc(g.enlaceResenas ?? '')}" placeholder="https://g.page/r/…"></label></div>`;
  let items = []; let extra = '';
  if (t === 'descripcion') items = opt.generarDescripcion(state.perfil, g);
  if (t === 'respuestas') items = opt.generarRespuestas(state.perfil, g);
  if (t === 'posts') items = opt.generarPosts(state.perfil, g);
  if (t === 'pedir') { items = opt.generarPedirResena(state.perfil, g); extra = '<p class="note mt">Envía el mismo mensaje a todos tus clientes, no solo a los que crees satisfechos, y no ofrezcas premios a cambio: Google lo prohíbe.</p>'; }
  if (t === 'plan') {
    return `<div class="mt">${opt.generarPlan(r).map((s) => `<div class="act"><h3>Semana ${s.sem} · ${esc(s.foco)}</h3><p>${s.tareas.map((x) => `• ${esc(x)}`).join('<br>')}</p></div>`).join('')}</div>`;
  }
  if (t === 'ia') {
    state.promptsIA = [opt.generarPromptGemini(state.perfil, r), opt.generarPromptIA(state.perfil, r)];
    return `<p class="mt">Tú decides si usas una IA. Copia el mensaje y pégalo donde prefieras (puedes usar su modo incógnito).</p>
      <div class="out"><span class="et">Para Gemini (conectado a tu perfil)</span>${esc(state.promptsIA[0])}<div class="cp"><button class="btn small ghost" data-copy-ia="0">Copiar</button> <a class="btn small" href="${esc(CONFIG.GEMINI_URL)}" target="_blank" rel="noopener">Abrir Gemini</a></div></div>
      <div class="out"><span class="et">Para cualquier otra IA</span>${esc(state.promptsIA[1])}<div class="cp"><button class="btn small ghost" data-copy-ia="1">Copiar</button></div></div>`;
  }
  state.items = items;
  return `${inputs}${extra}${outHTML(items)}`;
}


function geminiCard() {
  state.promptGem = opt.promptGeminiBasico();
  return `<section class="card glow"><h3>Siguiente paso: pídeselo a Gemini</h3>
    <p class="mt">Google ya permite conectar tu Perfil de Negocio a Gemini para que resuma tus reseñas, analice tu rendimiento y te redacte borradores. SixSaaS te dice <b>qué</b> mejorar; Gemini te ayuda a <b>hacerlo</b>.</p>
    <ol class="steps"><li>Entra a Gemini con la <b>misma cuenta de Google</b> de tu perfil.</li><li>Conecta tu perfil (o escribe <b>@Google Business Profile</b>).</li><li>Pega este mensaje y revisa todo antes de aceptar cambios.</li></ol>
    <div class="out">${esc(state.promptGem)}<div class="cp"><button class="btn small ghost" data-gem>Copiar</button> <a class="btn small" href="${esc(CONFIG.GEMINI_URL)}" target="_blank" rel="noopener">Abrir Gemini</a></div></div>
    <p class="help mt">Google lo está liberando de forma gradual y, por ahora, solo para cuentas con un único perfil verificado: puede que aún no te aparezca. ${isFull() ? 'Tu mensaje personalizado está en Herramientas → Prompts Gemini / IA.' : ''}</p></section>`;
}

function vistaResultado() {
  const r = state.resultado; const full = isFull();
  const visibles = full ? r.acciones : r.acciones.slice(0, CONFIG.FREE_TOP_ACTIONS);
  const ocultas = r.acciones.length - visibles.length;
  return `
  <section class="card glow"><div class="score">
    <div class="ring" style="--v:${r.total};--c:${colorPuntaje(r.total)}"><div><span><strong>${r.total}</strong><small>de 100 · ${esc(r.nivel)}</small></span></div></div>
    <div class="bars">${r.grupos.map((g) => `<div class="bar"><div class="lab"><span>${esc(g.nombre)}</span><span>${g.pts}/${g.max}</span></div><div class="track"><div class="fill" style="width:${(g.pts / g.max) * 100}%"></div></div></div>`).join('')}</div>
  </div><div class="row mt"><button class="btn ghost small" data-act="editar">Editar respuestas</button></div></section>
  <section><h2>${full ? 'Todas tus acciones' : `Tus ${visibles.length} prioridades`}</h2>
    ${visibles.length ? visibles.map((a) => actHTML(a, full)).join('') : '<p>¡Tu perfil está en excelente forma! Mantén el hábito de publicar y responder.</p>'}
    ${ocultas > 0 ? `<div class="lock mt"><h3>${ocultas} acciones más y pasos detallados</h3><p class="mt">En SixSaaS Full ves cada acción con su guía paso a paso y todas las herramientas.</p><div class="row mt"><a class="btn" href="#/licencias">Activar licencia</a><a class="btn ghost" href="#/comparar">Comparar Gratis vs Full</a></div></div>` : ''}
  </section>
  <section>${geminiCard()}</section>
  <section><h2>Herramientas</h2>
    <div class="tabsbar" role="tablist">${HERRAMIENTAS.map((h) => `<button class="pill" role="tab" aria-selected="${state.tool === h.id}" data-tool="${h.id}">${h.n}${!full && !CONFIG.FREE_TOOLS.includes(h.id) ? '<span class="l">🔒</span>' : ''}</button>`).join('')}</div>
    <div id="tool">${herramientaHTML(r, full)}</div></section>`;
}

function vistaOptimizador() { return state.resultado ? vistaResultado() : vistaFormulario(); }

function vistaLicencias() {
  const lista = state.licencias.length
    ? state.licencias.map((l) => { return `<div class="act"><h3>${esc(nombreLic(l.m))}</h3><p>Activa${l.e ? ` hasta ${esc(l.e)}` : ' de por vida'}.</p></div>`; }).join('')
    : '<p>Aún no tienes licencias activas.</p>';
  return `
  <section><h1 style="font-size:1.6rem">Licencias</h1>
    <p class="mt">Pagas tu módulo o la Academia por PayPal o Yappy, envías el comprobante por WhatsApp y recibes un código. Pégalo aquí para activarlo. Funciona sin conexión.</p>
    <form id="lic" class="mt"><label class="f">Tu código de licencia<textarea data-lic placeholder="SXS1.…" rows="3" spellcheck="false" autocomplete="off"></textarea></label>
    <div class="row mt"><button class="btn" type="submit">Activar</button><a class="btn ghost" href="#/comparar">Comparar Gratis vs Full</a></div></form></section>
  <section><h2>Mis licencias</h2>${lista}
    ${isFull() ? '<p class="note mt">SixSaaS Full (Optimizador completo) está desbloqueado en este dispositivo.</p>' : ''}
    ${tieneAcademia() ? '<p class="note mt">La Academia completa está desbloqueada en este dispositivo.</p>' : ''}</section>
  ${tieneAcademia() ? '' : `<section>${bannerAcademia()}</section>`}
  <section><h2>Módulos</h2><div class="grid">${MODULES.map(modCard).join('')}</div></section>`;
}

function vistaAjustes() {
  const modo = store.getMode();
  return `
  <section><h1 style="font-size:1.6rem">Ajustes</h1></section>
  <section class="card"><h3>Privacidad</h3>
    <p class="mt">Modo actual: <b>${modo === 'guardar' ? 'guardar en este dispositivo' : 'incógnito'}</b>. Tus datos nunca se envían a un servidor.</p>
    <div class="row mt"><button class="btn small ghost" data-act="modo-guardar">Guardar en este dispositivo</button><button class="btn small ghost" data-act="modo-incognito">Modo incógnito</button><button class="btn small ghost" data-act="borrar">Borrar mis datos</button></div></section>
  <section class="card"><h3>Mis módulos</h3><p class="mt">SixSaaS los enlaza solo cuando los abres o cuando están publicados con el nombre estándar. Si usas otra dirección, pégala aquí.</p>
    <form id="urls" class="mt">${MODULES.map((m) => `<label class="f mt">${esc(m.nombre)}<input type="url" name="${m.id}" value="${esc(urlDe(m.id))}" placeholder="${esc(CONFIG.AUTO_URL(m.id))}" autocomplete="off" inputmode="url"></label>`).join('')}
    <div class="row mt"><button class="btn small" type="submit">Guardar enlaces</button><button type="button" class="btn small ghost" data-act="buscar-mod">Buscar módulos</button></div></form></section>
  <section class="card"><h3>Ayuda y actualizaciones</h3><div class="row mt"><a class="btn small" href="#/ayuda">Ayuda</a><a class="btn small ghost" href="#/pagar/sixsaas">Actualizaciones y módulos: cómo pagar</a></div></section>
  <section class="card"><h3>Instalar SixSaaS</h3><p class="mt">Úsala como app en tu celular, incluso sin internet.</p>
    <div class="row mt"><button class="btn small" data-act="instalar" ${state.installEvt ? '' : 'disabled'}>Instalar app</button></div>
    ${state.installEvt ? '' : '<p class="help mt">Si no ves el botón: en iPhone usa Compartir → "Agregar a inicio"; en Android/PC usa el menú del navegador → "Instalar".</p>'}</section>
  <section class="center"><p class="help">SixSaaS v${CONFIG.VERSION} · © Neuroactiva Labs y Neuro Gestión Empresarial</p></section>`;
}


/* ---------- Ayuda ---------- */
const AYUDA_KB = [
  { k: ['licencia', 'activar', 'codigo', 'clave'], r: 'Paga SixSaaS Full o la Academia por PayPal o Yappy, envía el comprobante por WhatsApp, copia el código que te enviamos (empieza con SXS1.) y pégalo en **Licencias**. SixSaaS Full se vende aparte: las apps Neuro no lo desbloquean. Los cursos de la Academia se abren con la licencia de la **Academia**.' },
  { k: ['academia', 'curso', 'cursos', 'leccion', 'lecciones', 'setter', 'closer'], r: `La **Academia** tiene ${CURSOS.length} cursos de 12 lecciones. Las primeras ${GRATIS_POR_CURSO} de cada curso son gratis; con la licencia de la Academia ($${CONFIG.PRECIO_ACADEMIA.toFixed(2)}, pago único) se abren todas. Los módulos Neuro no incluyen la Academia.` },
  { k: ['precio', 'cuesta', 'costo', 'pagar', 'comprar'], r: `SixSaaS Full cuesta **$${CONFIG.PRECIO_MODULO.toFixed(2)} en pago único** y la Academia **$${CONFIG.PRECIO_ACADEMIA.toFixed(2)}**. El pago es por **PayPal o Yappy** y envías el comprobante por **WhatsApp** (mira **Cómo pagar**).` },
  { k: ['gratis', 'prueba', 'limite', 'siete', 'full', 'diferencia'], r: 'Cada app Neuro gratis incluye **7 usos** (clientes, citas, pedidos…) y con su licencia es ilimitada. Las apps Neuro y SixSaaS Full se compran por separado: ninguna desbloquea a la otra.' },
  { k: ['modulo', 'modulos', 'enlazar', 'abrir', 'enlace'], r: 'Los módulos aparecen con **Abrir** cuando están publicados. Si no lo detecta, pega su dirección en **Ajustes → Mis módulos**.' },
  { k: ['datos', 'perder', 'privacidad', 'incognito'], r: 'Tus datos viven solo en tu dispositivo. Puedes usar modo incógnito o guardar en este teléfono (Ajustes).' },
  { k: ['actualizacion', 'actualizar', 'mejora', 'funcion', 'nuevo'], r: 'Las actualizaciones y módulos nuevos se pagan por **PayPal o Yappy** (mira **Cómo pagar** en Licencias) y envías el comprobante por **WhatsApp** al 6438-7978.' },
  { k: ['optimizador', 'google', 'perfil', 'gemini'], r: 'El **Optimizador** analiza tu perfil de Google y te da acciones por impacto. La **Academia** te enseña a ejecutarlas y a conversar, cerrar y fidelizar clientes.' },
];
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
function vistaAyuda() {
  const chat = state.chat || (state.chat = []);
  const temas = [['Quiero una guía o capacitación', 'Guía / capacitación'], ['Quiero ver productos nuevos', 'Productos nuevos'], ['Necesito ayuda con mi compra', 'Ayuda con mi compra'], ['Quiero pedir una actualización', 'Pedir actualización']];
  return `<section><p class="help"><a href="#/">← Inicio</a></p><h1 style="font-size:1.6rem" class="mt">Ayuda y contacto</h1><p class="mt">Pregúntale al asistente. Responde al instante y nada sale de tu dispositivo.</p></section>
  <section class="card glow"><div id="chat" aria-live="polite">${chat.length ? chat.map((x) => `<div class="msgb ${x.r}">${fmt(x.t)}</div>`).join('') : '<p class="help">Escribe tu pregunta o toca una sugerencia.</p>'}</div>
    <div class="tabsbar mt">${['¿Cómo activo mi licencia?', '¿Qué incluye la versión gratis?', '¿Cuánto cuesta?', '¿Cómo enlazo mis módulos?'].map((s) => `<button type="button" class="pill" data-act="asis-sug" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div>
    <form id="asis" class="mt"><div class="row"><input type="text" name="q" placeholder="Escribe tu pregunta…" autocomplete="off" style="flex:1;min-width:0"><button class="btn" type="submit">Preguntar</button></div></form></section>
  <section class="card"><h3>Habla con Neuro Gestión Empresarial</h3><p class="mt">¿Prefieres una persona? Escríbenos por WhatsApp.</p><div class="stack mt">${temas.map(([t, n]) => `<a class="btn ghost" href="${esc(contactoLink(n))}" target="_blank" rel="noopener">${esc(t)}</a>`).join('')}</div></section>
  <section class="card"><h3>Pedir actualizaciones</h3><p class="mt">Las actualizaciones y los módulos nuevos se pagan por PayPal o Yappy, y envías el comprobante por WhatsApp.</p><div class="row mt"><a class="btn" href="#/pagar/sixsaas">Cómo pagar</a></div></section>`;
}
function preguntar(q) {
  const t = new Set(norm(q).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)); const nq = norm(q);
  let best = null; let sc = 0; AYUDA_KB.forEach((e) => { let s = 0; e.k.forEach((w) => { if (t.has(w) || (w.length > 4 && nq.includes(w))) s += 1; }); if (s > sc) { sc = s; best = e; } });
  (state.chat ||= []).push({ r: 'u', t: q }, { r: 'b', t: best ? best.r : 'No encontré eso en mi guía. Usa los botones de abajo y una persona te ayuda.' });
  render(true);
}

/* ---------- Academia ---------- */
const pk = (c, n) => `${c}:${n}`;
const lecHecha = (c, n) => !!state.progreso[pk(c, n)]?.hecho;
const lecBloqueada = (l) => !l.gratis && !tieneAcademia();
const cursoHechas = (c) => c.lecciones.filter((l) => lecHecha(c.id, l.id)).length;
const buyAcademia = () => '#/pagar/academia';
const nombreLic = (m) => (m === 'academia' ? 'Academia SixSaaS (4 cursos)' : (MODULES.find((x) => x.id === m)?.nombre || 'SixSaaS Full'));

function bannerAcademia() {
  if (tieneAcademia()) return `<div class="card glow"><h3>🎓 Academia completa activa ✓</h3><p class="mt">Tienes acceso a los ${CURSOS.length} cursos y a las ${TOTAL_LECCIONES} lecciones.</p></div>`;
  return `<div class="card glow"><h3>🎓 Desbloquea los ${CURSOS.length} cursos por $${CONFIG.PRECIO_ACADEMIA.toFixed(2)}</h3>
    <p class="mt">Pago único, sin suscripción. Hoy tienes gratis ${GRATIS_LECCIONES} de ${TOTAL_LECCIONES} lecciones (un tercio de cada curso). La licencia de la Academia abre las ${TOTAL_LECCIONES - GRATIS_LECCIONES} restantes. Los módulos Neuro no la incluyen.</p>
    <div class="row mt"><a class="btn" href="${esc(buyAcademia())}">Obtener la Academia</a><a class="btn ghost" href="#/licencias">Ya tengo mi código</a></div></div>`;
}

function cursoCard(c) {
  const h = cursoHechas(c);
  return `<a class="card curso" href="#/academia/${c.id}"><div class="row sp"><span class="ico" aria-hidden="true">${c.icono}</span><span class="tag">${esc(c.etapa)}</span></div>
    <h3 class="mt">${esc(c.titulo)}</h3><p class="mt">${esc(c.subtitulo)}</p>
    <div class="bar mt"><div class="lab"><span>${c.total} lecciones · ${c.gratis} gratis</span><span>${h}/${c.total}</span></div><div class="track"><div class="fill" style="width:${(h / c.total) * 100}%"></div></div></div></a>`;
}

function vistaAcademia(a, b) {
  if (a && b) return vistaLeccion(a, +b);
  if (a && /^\d+$/.test(a)) return vistaLeccion('google', +a); // enlaces de versiones anteriores
  if (a) return vistaCurso(a);
  const hechas = CURSOS.reduce((t, c) => t + cursoHechas(c), 0);
  return `
  <section class="acadhead big"><img src="img/academia.webp" alt="Academia SixSaaS" width="150" height="150">
    <div><h1 style="font-size:1.7rem">Academia SixSaaS</h1>
    <p class="mt">Aprende a atraer, conversar, cerrar y fidelizar clientes. Cada lección: objetivo, explicación corta, tarea, plantilla para copiar, mensaje para Gemini y quiz.</p></div></section>
  <section>${bannerAcademia()}</section>
  <section><div class="card"><div class="bar"><div class="lab"><span>Tu avance total</span><span>${hechas}/${TOTAL_LECCIONES} lecciones</span></div><div class="track"><div class="fill" style="width:${(hechas / TOTAL_LECCIONES) * 100}%"></div></div></div></div></section>
  <section><div class="grid">${CURSOS.map(cursoCard).join('')}</div></section>
  <section class="card"><h3>El recorrido completo</h3><p class="mt">${CURSOS.map((c) => `${c.icono} <b>${esc(c.etapa)}</b>`).join(' → ')}</p><p class="help mt">Google te trae clientes, el setter los conversa y agenda, el closer los cierra y la fidelización hace que vuelvan y te recomienden.</p></section>`;
}

function vistaCurso(id) {
  const c = cursoDe(id);
  if (!c) return vistaAcademia();
  const h = cursoHechas(c);
  return `
  <section><p class="help"><a href="#/academia">← Academia</a></p>
    <h1 style="font-size:1.6rem" class="mt">${c.icono} ${esc(c.titulo)}</h1>
    <p class="mt">${esc(c.subtitulo)}</p>
    <div class="card mt"><p><b>Para quién:</b> ${esc(c.para)}</p><p class="mt"><b>Lograrás:</b> ${esc(c.resultado)}</p>
    <div class="bar mt"><div class="lab"><span>Tu avance</span><span>${h}/${c.total} lecciones</span></div><div class="track"><div class="fill" style="width:${(h / c.total) * 100}%"></div></div></div>
    <p class="help mt">Las primeras ${c.gratis} lecciones son gratis. ${tieneAcademia() ? 'Tienes la Academia completa ✓' : `Las otras ${c.total - c.gratis} se abren con la licencia de la Academia ($${CONFIG.PRECIO_ACADEMIA.toFixed(2)}, incluye los ${CURSOS.length} cursos).`}</p></div></section>
  ${tieneAcademia() ? '' : `<section>${bannerAcademia()}</section>`}
  <section>${c.lecciones.map((l) => `<a class="lec card" href="#/academia/${c.id}/${l.id}">
      <span class="num${lecHecha(c.id, l.id) ? ' done' : ''}">${lecHecha(c.id, l.id) ? '✓' : l.id}</span>
      <span class="grow"><h3>${esc(l.titulo)}</h3><p class="help">${l.min} min · ${esc(l.objetivo)}</p></span>
      <span class="tag ${l.gratis ? 'ok' : lecBloqueada(l) ? 'soon' : 'ok'}">${l.gratis ? 'Gratis' : lecBloqueada(l) ? '🔒 Academia' : 'Academia ✓'}</span></a>`).join('')}</section>`;
}

function vistaLeccion(cid, n) {
  const c = cursoDe(cid); const l = c && leccionDe(cid, n);
  if (!l) return vistaAcademia();
  const prev = leccionDe(cid, n - 1); const next = leccionDe(cid, n + 1);
  const sigCurso = CURSOS[CURSOS.findIndex((x) => x.id === cid) + 1];
  const nav = `<div class="row sp mt2">${prev ? `<a class="btn ghost small" href="#/academia/${cid}/${prev.id}">← ${esc(prev.titulo)}</a>` : '<span></span>'}${next ? `<a class="btn ghost small" href="#/academia/${cid}/${next.id}">Siguiente →</a>` : sigCurso ? `<a class="btn ghost small" href="#/academia/${sigCurso.id}">Siguiente curso: ${esc(sigCurso.corto)} →</a>` : '<a class="btn ghost small" href="#/academia">Ver todos los cursos</a>'}</div>`;
  const cab = `<p class="help"><a href="#/academia">Academia</a> · <a href="#/academia/${cid}">${esc(c.corto)}</a> · Lección ${l.id} de ${c.total} · ${l.min} min</p><h1 style="font-size:1.5rem" class="mt">${esc(l.titulo)}</h1><p class="mt"><b>Objetivo:</b> ${esc(l.objetivo)}</p>`;
  if (lecBloqueada(l)) {
    return `<section>${cab}<div class="lock mt2"><h3>Esta lección es parte de la Academia</h3><p class="mt">Con la licencia de la Academia ($${CONFIG.PRECIO_ACADEMIA.toFixed(2)}, pago único) desbloqueas las ${TOTAL_LECCIONES - GRATIS_LECCIONES} lecciones restantes de los ${CURSOS.length} cursos.</p><div class="row mt"><a class="btn" href="${esc(buyAcademia())}">Obtener la Academia</a><a class="btn ghost" href="#/licencias">Ya tengo mi código</a></div></div>${nav}</section>`;
  }
  const key = pk(cid, l.id); const pr = state.progreso[key] || {};
  const bloques = l.bloques.map((b) => (b.p ? `<p class="mt body">${fmt(b.p)}</p>` : `<ul class="lista">${b.lista.map((i) => `<li>${fmt(i)}</li>`).join('')}</ul>`)).join('');
  const tareas = l.tarea.map((t, i) => `<label class="chk"><input type="checkbox" data-tarea="${i}" data-pk="${key}" ${pr.tareas?.[i] ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('');
  const quiz = l.quiz.map((q, qi) => {
    const sel = pr.quiz?.[qi];
    return `<div class="card mt"><h3>${esc(q.q)}</h3>${q.o.map((o, oi) => {
      const cls = sel == null ? '' : oi === q.c ? ' ok' : oi === sel ? ' bad' : '';
      return `<button class="qopt${cls}" data-quiz="${qi}" data-opt="${oi}" data-pk="${key}">${esc(o)}</button>`;
    }).join('')}${sel != null ? `<p class="mt body">${sel === q.c ? '✅ ¡Correcto! ' : '❌ No exactamente. '}${esc(q.w)}</p>` : ''}</div>`;
  }).join('');
  const guion = l.guion ? `<div class="card mt"><h3>📋 Plantilla lista para copiar</h3><p class="help mt">Cambia lo que está entre [corchetes] por tus datos.</p><div class="out">${esc(l.guion)}<div class="cp"><button class="btn small ghost" data-copy-lec="${key}:guion">Copiar</button></div></div></div>` : '';
  return `<section>${cab}${bloques}
    <div class="card glow mt2"><h3>✅ Tu tarea de hoy</h3><div class="mt">${tareas}</div></div>
    ${guion}
    <div class="card mt"><h3>🤖 Pídeselo a Gemini</h3><p class="help mt">Copia y pega en Gemini (revisa todo antes de aceptar cambios).</p><div class="out">${esc(l.gemini)}<div class="cp"><button class="btn small ghost" data-copy-lec="${key}:gemini">Copiar</button></div></div></div>
    <h2 class="mt2">Compruébalo</h2>${quiz}
    <div class="row mt2"><button class="btn${pr.hecho ? ' ghost' : ''}" data-hecho="${key}">${pr.hecho ? '✓ Completada (desmarcar)' : 'Marcar lección como completada'}</button></div>${nav}</section>`;
}


/* ---------- Comparación Gratis vs Full ---------- */
const SI = '✓'; const NO = '—';
const COMPARACION = [
  { g: 'Diagnóstico de tu perfil', f: [
    ['Puntaje de 0 a 100 con 17 criterios en 4 grupos', SI, SI],
    ['Nivel y barras de avance por grupo (Base, Contenido, Reputación, Actividad)', SI, SI],
    ['Acciones recomendadas, ordenadas por impacto', `Top ${CONFIG.FREE_TOP_ACTIONS}`, 'Todas (hasta 17)'],
    ['Guía "cómo hacerlo, paso a paso" en cada acción', NO, SI],
    ['Enlace de cada acción a su lección del curso de Google', SI, SI],
  ] },
  { g: 'Herramientas de texto listas para copiar', f: [
    ['Descripción del negocio (hasta 750 caracteres)', SI, SI],
    ['Respuestas a reseñas (positivas y negativas)', SI, SI],
    ['Publicaciones para tu perfil', NO, SI],
    ['Mensajes para pedir reseñas (mismo enlace para todos, sin incentivos)', NO, SI],
    ['Plan de 30 días con tareas semanales', NO, SI],
    ['Prompts personalizados para Gemini / IA', NO, SI],
  ] },
  { g: 'Gemini', f: [
    ['Tarjeta "Pídeselo a Gemini" con 3 pasos y mensaje base', SI, SI],
    ['Mensaje personalizado con tu puntaje y tus puntos débiles', NO, SI],
  ] },
  { g: 'Módulos Neuro (por cada módulo)', f: [
    ['Usos (clientes, citas, pedidos, cotizaciones…)', '7 gratis', 'Ilimitados'],
    ['Catálogo y marca compartidos entre los 6 módulos (importar / exportar)', SI, SI],
    ['Tu logo, tus datos y 7 plantillas de diseño editables', SI, SI],
    ['Mostrar solo tu marca (sin la marca Neuro)', NO, SI],
    ['Asistente de ayuda y contacto con Neuro Gestión Empresarial', SI, SI],
  ] },
  { g: 'Privacidad y uso', f: [
    ['Modo incógnito o guardar en tu dispositivo (tú eliges)', SI, SI],
    ['Instalable como app y con uso sin conexión', SI, SI],
    ['Sin servidor: tus datos no salen de tu dispositivo', SI, SI],
  ] },
  { g: 'Precio', f: [
    ['Costo', '$0', `Desde $${CONFIG.PRECIO_MODULO.toFixed(2)}`],
    ['Cómo se desbloquea', 'No necesita licencia', 'Licencia de SixSaaS Full (las apps Neuro y la Academia son aparte)'],
    ['Cobro', 'Nada que pagar', 'Pago único, sin suscripción'],
  ] },
];

const COMP_ACADEMIA = [
  { g: `Academia SixSaaS: ${CURSOS.length} cursos, ${TOTAL_LECCIONES} lecciones`, f: [
    ...CURSOS.map((c) => [`${c.icono} ${c.titulo}`, `Lecciones 1–${c.gratis}`, `Las ${c.total} lecciones`]),
    ['Tarea, plantilla para copiar, mensaje para Gemini y quiz', 'En las lecciones gratis', 'En todas'],
    ['Avance guardado en tu dispositivo', SI, SI],
  ] },
  { g: 'Precio', f: [
    ['Costo', '$0', `$${CONFIG.PRECIO_ACADEMIA.toFixed(2)}`],
    ['Cómo se desbloquea', 'No necesita licencia', 'Licencia de la Academia (los módulos Neuro no la incluyen)'],
    ['Cobro', 'Nada que pagar', 'Pago único, sin suscripción'],
  ] },
];

const BENEFICIOS = [
  ['📊', 'Optimizador completo', 'Todas las acciones con guía paso a paso.'],
  ['🧰', '6 herramientas', 'Publicaciones, pedir reseñas, plan de 30 días y más.'],
  ['🤖', 'Prompts para Gemini', 'Personalizados con el puntaje de tu perfil.'],
  ['🔓', 'Sin suscripción', 'Pagas una vez y es tuyo.'],
  ['📴', 'Funciona sin conexión', 'Instálala y úsala donde estés.'],
];

function tablaCmp(secs, c1, c2, vacia = false) {
  const celda = (v) => (v === SI ? '<span class="yes" aria-label="Incluido">✓</span>' : v === NO ? '<span class="no" aria-label="No incluido">—</span>' : esc(v));
  const filas = secs.map((sec) => `
    <tr class="grp"><th colspan="3" scope="colgroup">${esc(sec.g)}</th></tr>
    ${sec.f.map(([t, a, b]) => `<tr><th scope="row">${esc(t)}</th><td>${celda(a)}</td><td class="fullc">${celda(b)}</td></tr>`).join('')}`).join('');
  return `<div class="tablewrap mt"><table class="cmpt"><thead><tr><th scope="col">Qué incluye</th><th scope="col">${c1}</th><th scope="col" class="fullc">${c2}</th></tr></thead><tbody>${filas}</tbody></table></div>`;
}

function vistaComparar() {
  const full = isFull();
  return `
  <section class="cmp">
    <p class="help"><a href="#/">← Inicio</a></p>
    <h1 style="font-size:1.6rem" class="mt">SixSaaS Gratis vs Full</h1>
    <p class="mt">Empieza gratis. Con la licencia de <b>SixSaaS Full</b> ($${CONFIG.PRECIO_MODULO.toFixed(2)}, pago único) desbloqueas el Optimizador completo. Las apps Neuro se venden aparte y no lo incluyen. La <b>Academia</b> se desbloquea aparte, por $${CONFIG.PRECIO_ACADEMIA.toFixed(2)}.</p>
    ${full ? '<p class="note mt">Ya tienes SixSaaS Full activo en este dispositivo.</p>' : ''}
    ${tablaCmp(COMPARACION, 'Gratis', 'Full')}
    <h2 class="mt2">Academia: Gratis vs completa</h2>
    ${tablaCmp(COMP_ACADEMIA, 'Gratis', 'Academia')}
  </section>
  <section><h2>Lo que recibes con SixSaaS Full</h2>
    <div class="grid mt">${BENEFICIOS.map(([i, t, d]) => `<article class="card"><h3>${i} ${esc(t)}</h3><p class="mt">${esc(d)}</p></article>`).join('')}</div></section>
  <section class="card glow"><h3>Activa SixSaaS Full</h3>
    <div class="mods mt">${MODULES.map((m) => `<img src="${m.logo}" alt="${esc(m.nombre)}" width="56" height="56" loading="lazy">`).join('')}</div>
    <p class="mt">SixSaaS Full cuesta $${CONFIG.PRECIO_MODULO.toFixed(2)}, pago único, y desbloquea todo lo de la columna Full. Pagas por PayPal o Yappy y envías el comprobante por WhatsApp. Las apps Neuro de arriba se venden por separado y no incluyen SixSaaS Full.</p>
    <div class="row mt"><a class="btn" href="#/pagar/sixsaas">Cómo pagar</a><a class="btn ghost" href="#/licencias">Ya tengo mi código</a><button class="btn ghost" data-act="imprimir">Imprimir / guardar PDF</button></div>
    <p class="help mt">SixSaaS no está afiliado a Google. Gemini y Google Business Profile son marcas de Google LLC.</p></section>`;
}


/* ---------- Cómo pagar (PayPal / Yappy + comprobante por WhatsApp) ---------- */
function productoPago(id) {
  if (id === 'academia') return { nombre: 'Academia SixSaaS (4 cursos)', precio: CONFIG.PRECIO_ACADEMIA };
  const m = MODULES.find((x) => x.id === id);
  if (m) return { nombre: m.nombre, precio: CONFIG.PRECIO_MODULO };
  return { nombre: 'SixSaaS Full (Optimizador completo)', precio: CONFIG.PRECIO_MODULO };
}
function vistaPagar(id) {
  const p = productoPago(id);
  const monto = p.precio.toFixed(2);
  const P = CONFIG.PAGO;
  const paypal = `${P.PAYPAL_URL}/${monto}USD`;
  const msg = `Hola Neuro Gestión Empresarial 👋 Quiero la licencia de ${p.nombre} ($${monto}, pago único) de SixSaaS.\nYa pagué por: (PayPal / Yappy)\nTe envío el comprobante 👇`;
  const wa = `https://wa.me/${String(CONFIG.CONTACTO_WA).replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
  const otros = ['academia', 'sixsaas', ...MODULES.map((m) => m.id)].filter((x) => x !== id);
  return `
  <section><a class="back" href="#/licencias">← Licencias</a><h1 style="font-size:1.6rem">Cómo pagar</h1>
    <p class="mt">${esc(p.nombre)} · <b>$${monto}</b> pago único, sin suscripción.</p></section>
  <section class="card glow"><h3>1. Paga por PayPal o Yappy</h3>
    <div class="stack mt"><a class="btn" href="${esc(paypal)}" target="_blank" rel="noopener">Pagar $${monto} con PayPal</a></div>
    <p class="mt"><b>Yappy</b> a nombre de ${esc(P.YAPPY_NOMBRE)}</p>
    <div class="row mt">${P.YAPPY_URL ? `<a class="btn small ghost" href="${esc(P.YAPPY_URL)}" target="_blank" rel="noopener">Pagar $${monto} con Yappy</a>` : `<button class="btn small ghost" data-act="copiar-yappy">Pagar $${monto} con Yappy</button>`}</div>
    <p class="help mt">${P.YAPPY_URL ? 'Se abre Yappy para pagar.' : 'Al tocarlo se copia el Yappy de ' + esc(P.YAPPY_NOMBRE) + ': abre tu app Yappy, toca Enviar y pégalo.'}</p></section>
  <section class="card"><h3>2. Envía tu comprobante por WhatsApp</h3>
    <p class="mt">Manda la captura del pago. Te respondemos con tu código de licencia.</p>
    <div class="stack mt"><a class="btn" href="${esc(wa)}" target="_blank" rel="noopener">Enviar comprobante por WhatsApp</a></div></section>
  <section class="card"><h3>3. Activa tu código</h3><p class="mt">Pega el código que te enviamos en Licencias. Funciona sin conexión.</p>
    <div class="row mt"><a class="btn ghost" href="#/licencias">Ya tengo mi código</a></div></section>
  <section><p class="help">¿Quieres otro? ${otros.map((x) => `<a href="#/pagar/${x}">${esc(productoPago(x).nombre)}</a>`).join(' · ')}</p></section>`;
}

/* ---------- Router ---------- */
const RUTAS = { '': ['inicio', vistaInicio], academia: ['academia', vistaAcademia], optimizador: ['optimizador', vistaOptimizador], licencias: ['licencias', vistaLicencias], comparar: ['comparar', vistaComparar], ayuda: ['ayuda', vistaAyuda], ajustes: ['ajustes', vistaAjustes], pagar: ['licencias', vistaPagar] };

function registrar() {
  const q = new URLSearchParams(location.hash.split('?')[1] || ''); const id = q.get('m'); const u = limpiaUrl(q.get('u') || '');
  if (id && u && MODULES.some((x) => x.id === id)) { const o = urlsGet(); o[id] = u; urlsSet(o); toast(`${MODULES.find((x) => x.id === id).nombre} enlazado ✓`); }
  history.replaceState(null, '', '#/');
}
function render(keep = false) {
  if (/^#\/registrar/.test(location.hash)) registrar();
  const ruta = (location.hash.replace(/^#\/?/, '').split('?')[0]) || '';
  const [base, arg, arg2] = ruta.split('/');
  const [tab, vista] = RUTAS[base] || RUTAS[''];
  app.innerHTML = vista(arg, arg2);
  document.querySelectorAll('.tabs a').forEach((a) => (a.dataset.tab === tab ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
  const b = $('#badge');
  b.hidden = false; b.textContent = isFull() ? 'FULL' : tieneAcademia() ? 'ACADEMIA' : 'GRATIS'; b.className = `badge${isFull() ? ' full' : ''}`;
  document.title = `${tab === 'inicio' ? 'SixSaaS' : `${tab[0].toUpperCase()}${tab.slice(1)} · SixSaaS`} · Neuroactiva Labs`;
  if (!keep) window.scrollTo({ top: 0 });
}

/* ---------- Eventos (delegación) ---------- */
function leerForm() {
  const p = {};
  document.querySelectorAll('#form [data-k]').forEach((el) => {
    p[el.dataset.k] = el.type === 'checkbox' ? el.checked : el.value;
  });
  return p;
}

app.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (e.target.id === 'form') {
    state.perfil = leerForm(); persistir();
    state.resultado = opt.analizar(state.perfil);
    render();
  }
  if (e.target.id === 'urls') {
    const o = {}; new FormData(e.target).forEach((v, k) => { const u = limpiaUrl(v); if (u) o[k] = u; });
    urlsSet(o); toast('Enlaces guardados ✓'); render(true); return;
  }
  if (e.target.id === 'asis') { const q = new FormData(e.target).get('q').trim(); if (q) preguntar(q); return; }
  if (e.target.id === 'lic') {
    const ok = await activar($('[data-lic]').value);
    if (ok) { render(); }
  }
});

app.addEventListener('change', (e) => {
  const t = e.target;
  if (t.dataset.tarea != null) {
    const pr = (state.progreso[t.dataset.pk] ||= {}); (pr.tareas ||= [])[+t.dataset.tarea] = t.checked;
    persistir(); render(true);
  }
});

app.addEventListener('input', (e) => {
  const t = e.target;
  if (t.dataset.k === 'descripcion') { const h = t.parentElement.querySelector('.help'); if (h) h.textContent = `${t.value.length} caracteres`; }
  if (t.dataset.g) {
    state.gen[t.dataset.g] = t.value; persistir();
    clearTimeout(input.t);
    input.t = setTimeout(() => { const pos = t.selectionStart; $('#tool').innerHTML = herramientaHTML(state.resultado, isFull()); const n = $(`[data-g="${t.dataset.g}"]`); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }, 350);
  }
});
const input = {};

app.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-act],[data-tool],[data-copy],[data-copy-ia],[data-gem],[data-quiz],[data-hecho],[data-copy-lec]');
  if (!el) return;
  if (el.dataset.tool) {
    state.tool = el.dataset.tool;
    document.querySelectorAll('[data-tool]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tool === state.tool)));
    $('#tool').innerHTML = herramientaHTML(state.resultado, isFull());
    return;
  }
  if (el.dataset.copy != null) { copiar(state.items[+el.dataset.copy].texto); return; }
  if (el.dataset.copyIa != null) { copiar(state.promptsIA[+el.dataset.copyIa]); return; }
  if ('gem' in el.dataset) { copiar(state.promptGem); return; }
  if (el.dataset.copyLec != null) { const [cid, n, campo] = el.dataset.copyLec.split(':'); copiar(leccionDe(cid, +n)[campo]); return; }
  if (el.dataset.quiz != null) {
    const pr = (state.progreso[el.dataset.pk] ||= {}); (pr.quiz ||= {})[el.dataset.quiz] = +el.dataset.opt;
    persistir(); render(true); return;
  }
  if (el.dataset.hecho != null) {
    const pr = (state.progreso[el.dataset.hecho] ||= {}); pr.hecho = !pr.hecho;
    persistir(); render(true); toast(pr.hecho ? '¡Lección completada! ✓' : 'Lección desmarcada'); return;
  }
  const a = el.dataset.act;
  if (a === 'asis-sug') { preguntar(el.dataset.q); return; }
  if (a === 'buscar-mod') { toast('Buscando…'); await detectar(); toast('Listo'); return; }
  if (a === 'imprimir') { window.print(); return; }
  if (a === 'copiar-yappy') { try { await navigator.clipboard.writeText(CONFIG.PAGO.YAPPY.replace(/\D/g, '')); toast(`Yappy de ${CONFIG.PAGO.YAPPY_NOMBRE} copiado: pégalo en tu app Yappy`); } catch { toast('No se pudo copiar. Escríbenos por WhatsApp.', true); } return; }
  if (a === 'editar') { state.resultado = null; render(); }
  if (a === 'limpiar') { state.perfil = {}; persistir(); render(); toast('Respuestas borradas'); }
  if (a === 'modo-guardar') { store.setMode('guardar'); persistir(); toast('Se guardará en este dispositivo'); render(); }
  if (a === 'modo-incognito') { store.setMode('incognito'); toast('Modo incógnito activado'); render(); }
  if (a === 'borrar') { store.wipeAll(); state.licencias = []; state.perfil = {}; state.gen = {}; state.resultado = null; toast('Datos borrados'); render(); }
  if (a === 'instalar' && state.installEvt) { state.installEvt.prompt(); await state.installEvt.userChoice; state.installEvt = null; render(); }
});

window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); state.installEvt = e; });
window.addEventListener('hashchange', render);

/* ---------- Arranque ---------- */
(async function init() {
  if (!store.getMode()) { render(); await pedirModo(); }
  await cargar();
  // Activación por enlace: #/licencias?key=SXS1....
  const q = new URLSearchParams(location.hash.split('?')[1] || '');
  if (q.get('key')) { await activar(q.get('key')); history.replaceState(null, '', '#/licencias'); }
  render();
  detectar();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    // Si llega una versión nueva, recarga una sola vez para no quedarse con botones viejos en caché.
    const habiaSW = !!navigator.serviceWorker.controller; let recargado = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (habiaSW && !recargado) { recargado = true; location.reload(); } });
    navigator.serviceWorker.register('sw.js').then((r) => r.update()).catch(() => {});
  }
})();
