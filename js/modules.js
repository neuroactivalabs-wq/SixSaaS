// Catálogo del ecosistema SixSaaS: 6 módulos Neuro, cada uno con 7 usos gratis y uso ilimitado con licencia.
export const MODULES = [
  {
    id: 'resenas', nombre: 'Neuro Reseñas', sigla: 'NR', logo: 'img/resenas.webp',
    desc: 'Opiniones reales y orgánicas: capturas de clientes con su permiso, sugerencias privadas y el mismo enlace de Google para todos.',
  },
  {
    id: 'cotizaciones', nombre: 'Neuro Cotizaciones', sigla: 'NC', logo: 'img/cotizaciones.webp',
    desc: 'Cotizaciones con tu logo, 7 diseños, catálogo ilimitado y modelos que repites con un toque.',
  },
  {
    id: 'recompras', nombre: 'Neuro Recompras', sigla: 'NR·COMP', logo: 'img/recompras.webp',
    desc: 'Te dice a quién escribir hoy: reposición, posventa y reactivación, con segmentos VIP, sellos de fidelidad y panel.',
  },
  {
    id: 'citador', nombre: 'Neuro Citador', sigla: 'NCI', logo: 'img/citador.webp',
    desc: 'Agenda con confirmación y recordatorio por WhatsApp, e invitaciones tipo anuncio para atraer clientes.',
  },
  {
    id: 'pedidos', nombre: 'Neuro Pedidos', sigla: 'NP', logo: 'img/pedidos.webp',
    desc: 'Pedidos con pagos, abonos y comprobantes; contra entrega, "por pagar" y clientes de confianza.',
  },
  {
    id: 'crm', nombre: 'Neuro CRM', sigla: 'CRM', logo: 'img/crm.webp',
    desc: 'Seguimiento sin perder ventas: pipeline, racha diaria, mensajes listos y panel de impacto.',
  },
];

// 'academia' = licencia de la Academia (4 cursos); 'sixsaas' = licencia directa de SixSaaS Full.
export const MODULE_IDS = ['sixsaas', 'academia', ...MODULES.map((m) => m.id)];
