// Configuración central de SixSaaS — Neuroactiva Labs + Neuro Gestión Empresarial
export const CONFIG = {
  VERSION: '0.5.2',

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

  // Cómo se paga una licencia: PayPal o Yappy, y el comprobante se envía por WhatsApp.
  // SixSaaS no procesa pagos: estos datos solo se muestran en la pantalla "Cómo pagar" (#/pagar).
  PAGO: {
    PAYPAL_URL: 'https://paypal.me/jesusbarrios06', // se le agrega el monto, p. ej. /4.99USD
    YAPPY: '67684866',          // no se muestra en pantalla: el botón lo copia para pegarlo en Yappy
    YAPPY_NOMBRE: 'Jesus Barrios',
    YAPPY_URL: '',              // si tienes enlace de cobro de Yappy, ponlo aquí y el botón lo abre
  },

  // Dirección donde se busca cada módulo automáticamente (nombre de proyecto en Cloudflare Pages).
  // Si lo publicas con otro nombre/dominio, se enlaza igual al abrir el módulo, o pégalo en Ajustes → Mis módulos.
  AUTO_URL: (id) => `https://neuro${id}.pages.dev/`,

  // WhatsApp de Neuro Gestión Empresarial (solo dígitos con código de país). Aquí llegan los comprobantes de pago.
  CONTACTO_WA: '50764387978',

  PRECIO_MODULO: 4.99,
  PRECIO_ACADEMIA: 4.99, // los 4 cursos completos, pago único

  // Versión gratis ≈ 1/3 del paquete Full
  FREE_TOP_ACTIONS: 5,
  FREE_TOOLS: ['descripcion', 'respuestas'],

  // Enlace para abrir Gemini (cada cliente usa su propia cuenta de Google)
  GEMINI_URL: 'https://gemini.google.com/',
};
