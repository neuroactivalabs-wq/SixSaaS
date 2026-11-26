// Optimizador de perfil de Google (Business Profile) — motor por reglas, costo de IA = $0.
// Funciones puras (sin DOM) para poder probarlas en Node.

const n = (v) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : 0);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const norm = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const GRUPOS = [
  { id: 'base', nombre: 'Base del perfil', max: 35 },
  { id: 'contenido', nombre: 'Contenido', max: 30 },
  { id: 'reputacion', nombre: 'Reputación', max: 25 },
  { id: 'actividad', nombre: 'Actividad', max: 10 },
];

// Cada regla: evalúa 0..max y explica qué hacer. "pasos" es el detalle que solo ve la versión Full.
const REGLAS = [
  {
    id: 'verificado', grupo: 'base', max: 10, titulo: 'Verificar el perfil',
    eval: (p) => (p.verificado ? 10 : 0),
    accion: () => 'Verifica tu perfil: sin verificación casi no puedes gestionar ni posicionar tu negocio.',
    pasos: ['Entra a tu perfil en Google (busca tu negocio estando conectado con tu cuenta).', 'Pulsa "Verificar ahora" y elige el método disponible (tarjeta postal, llamada, correo o video).', 'Cuando llegue el código, ingrésalo y confirma que el perfil quedó verificado.'],
  },
  {
    id: 'horario', grupo: 'base', max: 6, titulo: 'Horario completo',
    eval: (p) => ({ completo: 6, parcial: 3 }[p.horario] ?? 0),
    accion: (p) => (p.horario === 'parcial' ? 'Completa tu horario: agrega todos los días y los feriados.' : 'Carga tu horario de atención.'),
    pasos: ['Abre "Editar perfil" → "Horario".', 'Completa todos los días; marca como cerrado los que no atiendes.', 'Agrega horarios especiales para feriados y fechas festivas antes de que lleguen.'],
  },
  {
    id: 'telefono', grupo: 'base', max: 3, titulo: 'Teléfono publicado',
    eval: (p) => (p.telefono ? 3 : 0),
    accion: () => 'Publica un teléfono que contestes (o tu WhatsApp) para que te contacten con un toque.',
    pasos: ['"Editar perfil" → "Teléfono".', 'Usa el mismo número que muestras en tu web y redes (consistencia).'],
  },
  {
    id: 'web', grupo: 'base', max: 3, titulo: 'Sitio web o enlace de acción',
    eval: (p) => (p.web ? 3 : 0),
    accion: () => 'Agrega un enlace: tu sitio, tu catálogo o una página de reservas/pedidos.',
    pasos: ['"Editar perfil" → "Sitio web".', 'Si no tienes web, usa un catálogo de WhatsApp Business, tu Instagram o una página simple.'],
  },
  {
    id: 'categorias', grupo: 'base', max: 4, titulo: 'Categorías secundarias relevantes',
    eval: (p) => { const c = n(p.categoriasSec); return c <= 0 ? 0 : c <= 4 ? 4 : 3; },
    accion: (p) => (n(p.categoriasSec) > 4 ? 'Revisa tus categorías secundarias: deja solo las que describen de verdad lo que haces.' : 'Agrega 1–4 categorías secundarias que describan servicios reales de tu negocio.'),
    pasos: ['"Editar perfil" → "Categoría" → "Agregar otra categoría".', 'Elige solo categorías que representen servicios que ya ofreces; no copies las de la competencia sin motivo.', 'La categoría principal debe ser la que mejor te define, no la más popular.'],
  },
  {
    id: 'atributos', grupo: 'base', max: 3, titulo: 'Atributos completos',
    eval: (p) => (p.atributos ? 3 : 0),
    accion: () => 'Completa los atributos: métodos de pago, accesibilidad, servicio a domicilio, idiomas, etc.',
    pasos: ['"Editar perfil" → "Información del negocio" → atributos.', 'Marca solo lo que es cierto: los clientes lo usan para decidir y filtrar.'],
  },
  {
    id: 'nap', grupo: 'base', max: 6, titulo: 'Nombre, dirección y teléfono consistentes',
    eval: (p) => (p.nap ? 6 : 0),
    accion: () => 'Unifica tu nombre, dirección y teléfono en tu web, redes y directorios: deben ser idénticos al de Google.',
    pasos: ['Escribe una sola versión oficial de nombre, dirección y teléfono.', 'Revisa Facebook, Instagram, tu web y directorios locales y corrígelos para que coincidan letra por letra.', 'Usa el nombre real del negocio en Google, sin agregar palabras clave ni ciudad (Google puede suspender perfiles que lo hagan).'],
  },
  {
    id: 'descripcion', grupo: 'contenido', max: 10, titulo: 'Descripción del negocio',
    eval: (p) => {
      const d = String(p.descripcion ?? '').trim();
      const L = d.length;
      const len = L === 0 ? 0 : L < 150 ? 3 : L < 250 ? 5 : L <= 750 ? 7 : 5;
      const t = norm(d);
      const ciudad = norm(p.ciudad).trim();
      const palabrasCat = norm(p.categoria).split(/\s+/).filter((w) => w.length > 3);
      const menciona = L > 0 && ((ciudad && t.includes(ciudad)) || palabrasCat.some((w) => t.includes(w)));
      return len + (menciona ? 3 : 0);
    },
    accion: (p) => {
      const L = String(p.descripcion ?? '').trim().length;
      if (!L) return 'Escribe tu descripción (250–750 caracteres) con lo que haces, dónde y qué te diferencia.';
      if (L > 750) return 'Tu descripción pasa de 750 caracteres: Google la corta. Reduce y deja lo esencial al inicio.';
      if (L < 250) return `Tu descripción tiene ${L} caracteres. Llévala a 250–750 y menciona tu ciudad y lo que ofreces.`;
      return 'Menciona de forma natural tu ciudad/zona y tu servicio principal en la descripción.';
    },
    pasos: ['Empieza con lo más importante: qué eres, qué ofreces y en qué zona.', 'Agrega 1–2 diferenciales reales (años de experiencia, garantía, atención, especialidad).', 'Termina con una invitación clara (llamar, escribir por WhatsApp o visitar).', 'No uses mayúsculas gritando, enlaces ni promociones con precio; usa el generador de más abajo.'],
  },
  {
    id: 'servicios', grupo: 'contenido', max: 8, titulo: 'Servicios o productos cargados',
    eval: (p) => { const s = n(p.servicios); return s <= 0 ? 0 : s < 5 ? 4 : s < 10 ? 6 : 8; },
    accion: (p) => `Tienes ${n(p.servicios)} servicios/productos cargados. Llega a 10 o más, cada uno con una breve descripción.`,
    pasos: ['"Editar servicios" o "Productos" en tu perfil.', 'Carga cada servicio con nombre claro, una línea de descripción y, si puedes, precio o "desde".', 'Usa los nombres con los que tus clientes los buscan.'],
  },
  {
    id: 'fotos', grupo: 'contenido', max: 8, titulo: 'Fotos reales y recientes',
    eval: (p) => { const f = n(p.fotos); return f <= 0 ? 0 : f < 5 ? 3 : f < 10 ? 5 : f < 25 ? 7 : 8; },
    accion: (p) => `Tienes ${n(p.fotos)} fotos. Sube al menos 10–25: fachada, interior, equipo, productos y trabajos reales.`,
    pasos: ['Toma fotos con buena luz, horizontales y nítidas (celular alcanza).', 'Cubre: fachada y entrada, interior, equipo de trabajo, productos/servicios, antes y después.', 'Sube 2–3 fotos nuevas cada mes para mantener el perfil vivo.'],
  },
  {
    id: 'logo', grupo: 'contenido', max: 4, titulo: 'Logo y foto de portada',
    eval: (p) => (p.logoPortada ? 4 : 0),
    accion: () => 'Sube tu logo y una foto de portada que represente bien tu negocio.',
    pasos: ['"Agregar foto" → tipo "Logotipo" y "Portada".', 'Logo cuadrado y legible; portada atractiva y sin texto excesivo.'],
  },
  {
    id: 'resenas', grupo: 'reputacion', max: 8, titulo: 'Cantidad de reseñas',
    eval: (p) => { const r = n(p.resenas); return r <= 0 ? 0 : r < 10 ? 2 : r < 25 ? 4 : r < 50 ? 6 : 8; },
    accion: (p) => `Tienes ${n(p.resenas)} reseñas. Pide una reseña a TODOS tus clientes, de forma constante, hasta pasar de 50.`,
    pasos: ['Crea tu enlace corto de reseñas (en tu perfil: "Pedir reseñas").', 'Envíalo a todos tus clientes, no solo a los que crees que están contentos.', 'No ofrezcas premios ni descuentos a cambio de reseñas: Google lo prohíbe.', 'Meta realista: 2–4 reseñas nuevas por semana.'],
  },
  {
    id: 'rating', grupo: 'reputacion', max: 5, titulo: 'Calificación promedio',
    eval: (p) => {
      if (n(p.resenas) <= 0) return 0;
      const r = n(p.rating);
      return r >= 4.5 ? 5 : r >= 4.0 ? 4 : r >= 3.5 ? 3 : r > 0 ? 1 : 0;
    },
    accion: (p) => (n(p.resenas) <= 0 ? 'Aún no hay calificación: consigue tus primeras reseñas.' : 'Mejora tu promedio resolviendo las causas de las quejas y sumando más reseñas reales; un 4.5–4.9 es muy creíble.'),
    pasos: ['Lee tus reseñas de 1–3 estrellas y busca el patrón que se repite.', 'Corrige la causa (tiempos, trato, producto) y cuéntalo en tu respuesta pública.', 'Sigue pidiendo reseñas a todos: el promedio sube con volumen honesto, no ocultando las malas.'],
  },
  {
    id: 'respuestas', grupo: 'reputacion', max: 7, titulo: 'Respuesta a reseñas',
    eval: (p) => {
      if (n(p.resenas) <= 0) return 0;
      const r = n(p.respondidas);
      return r >= 80 ? 7 : r >= 50 ? 5 : r >= 20 ? 3 : r > 0 ? 1 : 0;
    },
    accion: (p) => (n(p.resenas) <= 0 ? 'Cuando lleguen reseñas, respóndelas todas.' : `Respondes ${n(p.respondidas)}% de tus reseñas. Apunta a más de 80%, empezando por las más recientes.`),
    pasos: ['Responde en 48 horas, con nombre y de forma breve y humana.', 'Agradece las positivas y ofrece solución en las negativas, sin discutir ni exponer datos del cliente.', 'Usa las plantillas del generador de respuestas.'],
  },
  {
    id: 'recencia', grupo: 'reputacion', max: 5, titulo: 'Reseñas recientes',
    eval: (p) => (n(p.resenas) <= 0 ? 0 : ({ semana: 5, mes: 3 }[p.ultimaResena] ?? 0)),
    accion: () => 'Tu última reseña es antigua. Haz de pedir reseñas un hábito semanal para que siempre haya opiniones nuevas.',
    pasos: ['Define un momento fijo para pedirla: al entregar, al cobrar o al cerrar la cita.', 'Deja tu enlace listo en WhatsApp (mensaje guardado) y un QR visible en el local.'],
  },
  {
    id: 'posts', grupo: 'actividad', max: 6, titulo: 'Publicaciones recientes',
    eval: (p) => { const x = n(p.posts30); return x <= 0 ? 0 : x === 1 ? 2 : x < 4 ? 4 : 6; },
    accion: (p) => `Tienes ${n(p.posts30)} publicaciones en 30 días. Publica 1 por semana: novedades, consejos, ofertas, eventos.`,
    pasos: ['"Agregar actualización" desde tu perfil.', 'Alterna: novedad, consejo útil, servicio destacado, detrás de cámaras.', 'Usa el plan de 30 días y las ideas del generador de publicaciones.'],
  },
  {
    id: 'enlaceResenas', grupo: 'actividad', max: 4, titulo: 'Enlace de reseñas listo para compartir',
    eval: (p) => (p.enlaceResenas ? 4 : 0),
    accion: () => 'Crea tu enlace corto de reseñas y guárdalo en WhatsApp Business para enviarlo en un toque.',
    pasos: ['En tu perfil de Google pulsa "Pedir reseñas" y copia el enlace.', 'Guárdalo como respuesta rápida en WhatsApp Business y genera un QR para el mostrador.'],
  },
];

export function analizar(p = {}) {
  const items = REGLAS.map((r) => {
    const pts = clamp(Math.round(r.eval(p)), 0, r.max);
    return {
      id: r.id, grupo: r.grupo, titulo: r.titulo, max: r.max, pts,
      perdidos: r.max - pts,
      estado: pts === r.max ? 'ok' : pts === 0 ? 'falta' : 'mejorar',
      accion: pts === r.max ? '' : r.accion(p),
      pasos: pts === r.max ? [] : r.pasos,
    };
  });
  const total = items.reduce((s, i) => s + i.pts, 0);
  const grupos = GRUPOS.map((g) => ({
    ...g, pts: items.filter((i) => i.grupo === g.id).reduce((s, i) => s + i.pts, 0),
  }));
  const acciones = items
    .filter((i) => i.perdidos > 0)
    .sort((a, b) => b.perdidos - a.perdidos || a.max - b.max);
  const nivel = total >= 85 ? 'Excelente' : total >= 70 ? 'Bueno' : total >= 50 ? 'Mejorable' : 'Crítico';
  return { total, nivel, grupos, items, acciones };
}

// ---------- Generadores de texto (Full, salvo los marcados como gratis en config) ----------

const lista = (txt) => String(txt ?? '').split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
const orDefault = (v, d) => (String(v ?? '').trim() ? String(v).trim() : d);

function cortar(texto, max) {
  if (texto.length <= max) return texto;
  const cut = texto.slice(0, max);
  const punto = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '));
  return (punto > max * 0.6 ? cut.slice(0, punto + 1) : cut.slice(0, cut.lastIndexOf(' '))).trim();
}

const ctaTexto = (p) => (p.contacto ? `Escríbenos o llámanos al ${p.contacto}.` : 'Escríbenos o visítanos, con gusto te atendemos.');

export function generarDescripcion(p, g = {}) {
  const nombre = orDefault(p.nombre, '[Nombre del negocio]');
  const cat = orDefault(p.categoria, '[tu categoría]');
  const ciudad = orDefault(p.ciudad, '[tu ciudad]');
  const srv = lista(g.serviciosTexto);
  const srvTxt = srv.length ? srv.slice(0, 5).join(', ') : '[tus principales servicios]';
  const dif = orDefault(g.diferencial, '[tu diferencial: años de experiencia, atención, garantía…]');
  const cta = ctaTexto({ contacto: g.contacto });
  const a = `${nombre} es ${cat.toLowerCase().startsWith('[') ? cat : `un negocio de ${cat.toLowerCase()}`} en ${ciudad}. Ofrecemos ${srvTxt}. ${dif.replace(/\.*$/, '')}. ${cta}`;
  const b = `En ${nombre}, en ${ciudad}, nos dedicamos a ${srvTxt}. Nos distingue ${dif.replace(/\.*$/, '').replace(/^./, (c) => c.toLowerCase())}. Te atendemos con trato cercano y claridad. ${cta}`;
  return [
    { etiqueta: 'Directa', texto: cortar(a, 750) },
    { etiqueta: 'Cercana', texto: cortar(b, 750) },
  ];
}

export function generarPosts(p, g = {}) {
  const nombre = orDefault(p.nombre, '[Nombre del negocio]');
  const ciudad = orDefault(p.ciudad, '[tu ciudad]');
  const srv = lista(g.serviciosTexto);
  const s1 = srv[0] || '[servicio principal]';
  const s2 = srv[1] || srv[0] || '[otro servicio]';
  const cta = ctaTexto({ contacto: g.contacto });
  return [
    { sem: 1, tipo: 'Novedad', texto: `📣 Novedad en ${nombre}: ya puedes contar con ${s1} en ${ciudad}. Cuéntanos qué necesitas y te orientamos. ${cta}` },
    { sem: 1, tipo: 'Consejo útil', texto: `💡 Un consejo rápido sobre ${s1}: [escribe aquí un tip real de tu experiencia en 2–3 líneas]. En ${nombre} te ayudamos a aplicarlo. ${cta}` },
    { sem: 2, tipo: 'Servicio destacado', texto: `⭐ Servicio destacado: ${s2}. Qué incluye: [lista corta]. Para quién es ideal: [tipo de cliente]. ${cta}` },
    { sem: 2, tipo: 'Detrás de cámaras', texto: `👋 Conoce a quienes hacen posible ${nombre}. Cada día trabajamos para atenderte mejor en ${ciudad}. [Nombre y rol del equipo]. ¡Gracias por confiar en nosotros!` },
    { sem: 3, tipo: 'Antes y después', texto: `✅ Resultado reciente: [describe el trabajo, con permiso del cliente]. Si buscas algo parecido en ${ciudad}, ${cta.toLowerCase()}` },
    { sem: 3, tipo: 'Pregunta frecuente', texto: `❓ Pregunta frecuente: "[pregunta que más te hacen sobre ${s1}]". Respuesta: [respuesta clara y corta]. ¿Otra duda? ${cta}` },
    { sem: 4, tipo: 'Horario y atención', texto: `🕘 Recuerda nuestro horario de atención y los cambios por feriados: [horario]. Te esperamos en ${ciudad}.` },
    { sem: 4, tipo: 'Gracias por sus opiniones', texto: `🙌 Gracias a todos los que nos cuentan su experiencia. Cada opinión, buena o por mejorar, nos ayuda a servirte mejor. ¿Ya nos contaste la tuya?` },
  ];
}

export function generarRespuestas(p, g = {}) {
  const nombre = orDefault(p.nombre, '[Nombre del negocio]');
  const contacto = orDefault(g.contacto, '[tu WhatsApp o teléfono]');
  return [
    { etiqueta: '5 estrellas', texto: `¡Muchas gracias, [nombre del cliente], por tu reseña y por confiar en ${nombre}! Nos alegra saber que tu experiencia fue buena. Aquí te esperamos cuando nos necesites.` },
    { etiqueta: '3 estrellas', texto: `Gracias por contarnos tu experiencia, [nombre del cliente]. Queremos que la próxima vez sea mejor: ¿nos cuentas qué podríamos mejorar? Puedes escribirnos al ${contacto}. — Equipo ${nombre}` },
    { etiqueta: '1–2 estrellas', texto: `Lamentamos lo ocurrido, [nombre del cliente], y gracias por avisarnos. Queremos entender y resolverlo: escríbenos al ${contacto} con tu nombre y la fecha de tu visita. — ${nombre}` },
  ];
}

export function generarPedirResena(p, g = {}) {
  const nombre = orDefault(p.nombre, '[Nombre del negocio]');
  const enlace = orDefault(g.enlaceResenas, '[tu enlace de reseñas de Google]');
  return [
    { etiqueta: 'WhatsApp', texto: `Hola [nombre] 👋 Gracias por elegir ${nombre}. Tu opinión, sea cual sea, nos ayuda a mejorar y a que más personas nos encuentren. Si quieres contarnos cómo fue tu experiencia, aquí está el enlace: ${enlace} ¡Gracias!` },
    { etiqueta: 'Mostrador / QR', texto: `¿Cómo fue tu experiencia en ${nombre}? Escanea y cuéntanos en Google. Leemos todas las opiniones.` },
  ];
}

export function generarPlan(resultado) {
  const por = (grupo) => resultado.acciones.filter((a) => a.grupo === grupo).slice(0, 3).map((a) => a.titulo);
  const sem = [
    { sem: 1, foco: 'Base del perfil', tareas: por('base') },
    { sem: 2, foco: 'Contenido', tareas: por('contenido') },
    { sem: 3, foco: 'Reputación', tareas: por('reputacion') },
    { sem: 4, foco: 'Actividad y hábito', tareas: por('actividad') },
  ];
  const fijas = ['Responder reseñas nuevas (2 veces por semana).', 'Publicar 1 actualización.', 'Pedir reseña a todos los clientes atendidos.'];
  return sem.map((s) => ({ ...s, tareas: [...(s.tareas.length ? s.tareas : ['Revisar y mantener lo que ya está bien.']), ...fijas] }));
}

export function generarPromptIA(p, resultado) {
  const faltantes = resultado.acciones.slice(0, 8).map((a) => `- ${a.titulo}: ${a.accion}`).join('\n');
  return `Actúa como especialista en SEO local para Google Business Profile en Latinoamérica. Respeta estrictamente las políticas de Google: no uses palabras clave en el nombre del negocio, no ofrezcas incentivos por reseñas, no pidas reseñas solo a clientes satisfechos y no inventes datos.

Negocio: ${orDefault(p.nombre, '(sin nombre)')}
Categoría principal: ${orDefault(p.categoria, '(sin dato)')}
Ciudad/zona: ${orDefault(p.ciudad, '(sin dato)')}
Puntaje actual de mi perfil: ${resultado.total}/100
Descripción actual: ${orDefault(p.descripcion, '(vacía)')}

Puntos a mejorar detectados:
${faltantes || '- (ninguno crítico)'}

Con esa información:
1) Reescribe mi descripción (máx. 750 caracteres) en tono cercano.
2) Dame 8 ideas de publicaciones para 30 días.
3) Sugiere respuestas modelo para reseñas de 5, 3 y 1 estrella.
4) Arma un plan semanal de 30 días priorizado.
Escribe todo en español neutro y con tuteo.`;
}

// ---------- Prompts para Gemini (conectado a Perfil de Negocio) ----------

export function promptGeminiBasico() {
  return '@Google Business Profile Revisa mi perfil y dime en qué estado está: qué información falta, cómo me fue este mes y qué reseñas no he respondido. No cambies nada todavía: muéstrame primero la lista y espera mi confirmación.';
}

export function generarPromptGemini(p, resultado) {
  const faltantes = resultado.acciones.slice(0, 6).map((a) => `- ${a.titulo}`).join('\n');
  return `@Google Business Profile Soy dueño de ${orDefault(p.nombre, 'mi negocio')} (${orDefault(p.categoria, 'categoría')}) en ${orDefault(p.ciudad, 'mi ciudad')}. Un diagnóstico externo dio a mi perfil ${resultado.total}/100 y detectó estos puntos a mejorar:
${faltantes || '- (ninguno crítico)'}

Haz esto, en orden:
1) Confirma con los datos reales de mi perfil cuáles de esos puntos son ciertos.
2) Resume mis reseñas recientes y dime los temas que se repiten.
3) Redacta borradores de respuesta para las reseñas sin responder, en tono cercano y sin respuestas genéricas.
4) Propón 4 publicaciones para las próximas 4 semanas.
Reglas: no pidas ni sugieras incentivos por reseñas, no filtres a quién se le pide reseña, no inventes datos, y NO cambies ni publiques nada hasta que yo confirme cada cambio.`;
}
