// Configuración central de SixSaaS — Neuroactiva Labs + Neuro Gestión Empresarial
export const CONFIG = {
  VERSION: '0.5.0',

  // Clave PÚBLICA para verificar licencias (la privada vive solo en el kit de EMP).
  PUBLIC_KEY_JWK: {
    key_ops: ['verify'],
    ext: true,
    kty: 'EC',
    x: 'L58SCsJZhUeCDLz1ZhYOe79DoHNDObKSF4KftJ38Mbw',
    y: 'jZYVUqlgVp59nI0Pnm46tO0Jkffe7qLsYO1bq6JRVKg',
    crv: 'P-256',
  },

  // Cualquier licencia de un módulo Neuro desbloquea el Optimizador Full. La licencia 'academia' solo abre los cursos.
  ANY_KEY_UNLOCKS_FULL: true,

  // Tienda de EMP (los cobros los maneja EMP, SixSaaS no procesa pagos).
  EMP_URL: 'https://emp-neuroactiva.pages.dev/',

  // Enlace de compra por módulo. Por ahora todos apuntan a la tienda EMP;
  // cuando cada módulo tenga su propia página de compra, reemplaza el valor aquí.
  BUY_URLS: {
    academia: 'https://emp-neuroactiva.pages.dev/',
    sixsaas: 'https://emp-neuroactiva.pages.dev/',
    resenas: 'https://emp-neuroactiva.pages.dev/',
    cotizaciones: 'https://emp-neuroactiva.pages.dev/',
    recompras: 'https://emp-neuroactiva.pages.dev/',
    citador: 'https://emp-neuroactiva.pages.dev/',
    pedidos: 'https://emp-neuroactiva.pages.dev/',
    crm: 'https://emp-neuroactiva.pages.dev/',
  },

  // Dirección donde se busca cada módulo automáticamente (nombre de proyecto en Cloudflare Pages).
  // Si lo publicas con otro nombre/dominio, se enlaza igual al abrir el módulo, o pégalo en Ajustes → Mis módulos.
  AUTO_URL: (id) => `https://neuro${id}.pages.dev/`,

  // WhatsApp de Neuro Gestión Empresarial (solo dígitos con código de país, p. ej. 50760000000). '' = se usa EMP.
  CONTACTO_WA: '',

  PRECIO_MODULO: 4.99,
  PRECIO_ACADEMIA: 4.99, // los 4 cursos completos, pago único

  // Versión gratis ≈ 1/3 del paquete Full
  FREE_TOP_ACTIONS: 5,
  FREE_TOOLS: ['descripcion', 'respuestas'],

  // Enlace para abrir Gemini (cada cliente usa su propia cuenta de Google)
  GEMINI_URL: 'https://gemini.google.com/',
};
