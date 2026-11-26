// Academia SixSaaS — 4 cursos de 12 lecciones (el primer tercio de cada curso es gratis).
// Contenido propiedad de Neuroactiva Labs. Texto simple: **negrita** permitida.
// Basado en guías públicas de Google para Perfil de Negocio y en buenas prácticas de venta honesta:
// información veraz, sin incentivos ni filtrado de reseñas, consentimiento previo (Ley 81 de 2019).
import { GOOGLE_9_12 } from './cursos/google-extra.js';
import { SETTER } from './cursos/setter.js';
import { CLOSER } from './cursos/closer.js';
import { FIDELIZAR } from './cursos/fidelizar.js';

const GOOGLE_1_8 = [
  {
    id: 1, min: 6, titulo: 'Cómo decide Google a quién mostrar',
    objetivo: 'Entender los 3 factores de Google y saber cuáles puedes mover tú.',
    bloques: [
      { p: 'Cuando alguien busca "farmacia cerca de mí" o "barbería en David", Google ordena los resultados con tres factores que él mismo ha explicado: **relevancia**, **distancia** y **prominencia**.' },
      { lista: [
        '**Relevancia:** qué tan bien tu perfil coincide con lo que la persona busca. Depende de que tu información esté completa y sea precisa: categoría, servicios, descripción.',
        '**Distancia:** qué tan cerca estás de la persona o de la zona que busca. Esto **no lo controlas**.',
        '**Prominencia:** qué tan conocido y confiable pareces. Pesan tus reseñas (cantidad y calidad), tu presencia en la web y tu actividad.',
      ] },
      { p: 'La buena noticia: de los tres, dos dependen de ti. Todo el curso trabaja justamente en relevancia y prominencia.' },
      { p: '**Regla de oro:** todo lo que escribas debe ser verdad. Google puede suspender perfiles con datos engañosos, y los clientes lo notan.' },
    ],
    tarea: [
      'Busca en Google Maps, desde tu celular, 3 frases que usaría un cliente para encontrarte.',
      'Anota en qué posición apareces en cada una (o si no apareces).',
      'Anota los 3 negocios que salen primero: serán tu referencia durante el curso.',
    ],
    gemini: 'Soy dueño de un negocio de [tu categoría] en [tu ciudad]. Explícame en palabras simples cómo funcionan la relevancia, la distancia y la prominencia en Google Maps y dime 5 acciones concretas que yo pueda hacer esta semana.',
    quiz: [
      { q: '¿Cuál de los tres factores NO puedes controlar?', o: ['Relevancia', 'Distancia', 'Prominencia'], c: 1, w: 'La distancia depende de dónde está el cliente. Concéntrate en relevancia y prominencia.' },
    ],
  },
  {
    id: 2, min: 8, titulo: 'Reclama, verifica y deja la base impecable',
    objetivo: 'Tener un perfil verificado con nombre, contacto y horario correctos.',
    bloques: [
      { p: 'Sin verificación no puedes gestionar bien tu perfil. Es lo primero que revisa el optimizador y el que más puntos vale.' },
      { lista: [
        '**Verifica** el perfil con el método que Google te ofrezca (tarjeta, llamada, correo o video).',
        '**Nombre:** el real de tu negocio, tal como aparece en tu letrero y tus facturas. **No** agregues palabras clave, ciudad ni eslóganes.',
        '**Dirección o área de servicio:** la correcta. Si atiendes a domicilio sin local abierto al público, usa área de servicio.',
        '**Teléfono y enlace:** uno que contestes (tu WhatsApp sirve) y tu web, catálogo o Instagram.',
        '**Horario completo** y **horarios especiales** para feriados antes de que lleguen.',
      ] },
      { p: '**Ejemplo de nombre.** Correcto: "Farmacia Sol". Incorrecto: "Farmacia Sol - La mejor farmacia barata en David". Lo segundo puede costarte la suspensión del perfil.' },
      { p: '**Consistencia:** tu nombre, dirección y teléfono deben ser idénticos en Google, tu web y tus redes. Elige una versión oficial y úsala siempre.' },
    ],
    tarea: [
      'Confirma que tu perfil dice "Verificado" (o inicia la verificación hoy).',
      'Revisa nombre, dirección, teléfono y enlace: sin palabras clave añadidas.',
      'Carga el horario de los 7 días y agrega los feriados del próximo mes.',
      'Compara con tu Facebook e Instagram: que coincidan letra por letra.',
    ],
    gemini: 'Revisa mi perfil de Negocio de Google (@Google Business Profile) y dime qué información básica falta o está inconsistente: nombre, dirección, teléfono, sitio web y horarios. No hagas cambios todavía: muéstrame la lista y espera mi confirmación.',
    quiz: [
      { q: '¿Cuál es el nombre correcto para el perfil?', o: ['Barbería Don Lucho', 'Barbería Don Lucho - Cortes baratos David', 'Mejor Barbería David Don Lucho'], c: 0, w: 'Usa solo el nombre real. Agregar palabras clave puede provocar suspensiones.' },
    ],
  },
  {
    id: 3, min: 8, titulo: 'Categorías, servicios y atributos',
    objetivo: 'Decirle a Google exactamente qué haces para aparecer en las búsquedas correctas.',
    bloques: [
      { p: 'La **categoría principal** es la señal de relevancia más fuerte de tu perfil. Elige la que mejor te define, no la más popular.' },
      { lista: [
        '**Categorías secundarias:** agrega solo las que describen servicios que de verdad ofreces. Pocas y precisas ganan a muchas y dudosas.',
        '**Servicios o productos:** cárgalos uno por uno, con nombre claro y una línea de descripción. Usa las palabras que tus clientes dicen.',
        '**Atributos:** métodos de pago, accesibilidad, atención a domicilio, idiomas... Marca solo lo que es cierto: los clientes filtran por ellos.',
      ] },
      { p: '**Truco práctico:** mira las categorías de los 3 negocios que anotaste en la lección 1. No las copies a ciegas; úsalas para descubrir opciones que sí apliquen a ti.' },
    ],
    tarea: [
      'Confirma tu categoría principal: ¿es la que mejor te describe?',
      'Agrega entre 1 y 4 categorías secundarias reales.',
      'Carga al menos 5 servicios o productos con una línea de descripción.',
      'Completa los atributos que apliquen.',
    ],
    gemini: 'Con base en mi negocio de [tu categoría] en [tu ciudad], sugiéreme categorías secundarias de Google que sean realistas y una lista de 10 servicios con una descripción de una línea cada uno. No inventes servicios que no te haya dicho.',
    quiz: [
      { q: '¿Qué conviene más en categorías secundarias?', o: ['Agregar todas las que puedas', 'Solo las que describen servicios reales', 'Copiar las de la competencia'], c: 1, w: 'Precisión sobre cantidad: cada categoría debe corresponder a algo que realmente ofreces.' },
    ],
  },
  {
    id: 4, min: 9, titulo: 'Una descripción que convence (sin trucos)',
    objetivo: 'Escribir en 750 caracteres o menos un texto claro que haga que te elijan.',
    bloques: [
      { p: 'Tu descripción tiene hasta **750 caracteres**. Los primeros renglones son los que más se leen, así que pon lo importante al inicio.' },
      { lista: [
        '**1. Quién eres y dónde:** "Barbería Don Lucho es una barbería en David, Chiriquí."',
        '**2. Qué ofreces:** cortes clásicos, barba, afeitado con toalla caliente.',
        '**3. Qué te diferencia:** 12 años de experiencia, atención con cita, sin esperas.',
        '**4. Invitación:** "Escríbenos por WhatsApp al 6000-0000 o pasa por la barbería."',
      ] },
      { p: '**Evita:** mayúsculas excesivas, enlaces, listas de palabras clave sueltas y promociones con precios (las ofertas van en las publicaciones).' },
      { p: '**Antes:** "Barbería, cortes, barba, David, barato, mejor barbería". **Después:** una frase completa y humana con los 4 elementos. Google premia lo útil, no lo repetido.' },
    ],
    tarea: [
      'Entra a Optimizador → Herramientas → Descripción y genera las dos versiones.',
      'Elige una, personalízala con datos reales y pégala en tu perfil.',
      'Verifica que no pase de 750 caracteres y que mencione tu ciudad y tu servicio principal.',
    ],
    gemini: 'Escribe 2 versiones de la descripción de mi negocio para Google (máximo 750 caracteres) con esta estructura: quién soy y dónde, qué ofrezco, mi diferencial real y una invitación a contactarme. Tono cercano, sin mayúsculas excesivas, sin enlaces ni precios y sin repetir palabras clave. Datos: [escribe tus datos].',
    quiz: [
      { q: '¿Qué va primero en la descripción?', o: ['Una lista de palabras clave', 'Quién eres y dónde estás', 'Tus precios'], c: 1, w: 'Lo más importante al inicio: qué eres y en qué zona.' },
    ],
  },
  {
    id: 5, min: 8, titulo: 'Fotos que generan confianza',
    objetivo: 'Subir un set de fotos reales que muestre tu negocio como es.',
    bloques: [
      { p: 'Las fotos reales reducen la duda del cliente nuevo: ve cómo es tu local, tu equipo y tu trabajo antes de visitarte.' },
      { lista: [
        '**Cubre estos 6 tipos:** fachada y entrada, interior, equipo de trabajo, productos o servicios, trabajos terminados (antes y después) y logo + portada.',
        '**Técnica:** celular limpio, buena luz natural, fotos horizontales y nítidas.',
        '**Evita:** fotos de internet, textos o precios encima, filtros pesados y imágenes borrosas.',
        '**Hábito:** sube 2–3 fotos nuevas por mes. Un perfil con fotos recientes se ve vivo.',
      ] },
      { p: '**Con permiso:** si fotografías a clientes o sus trabajos, pídeles autorización primero.' },
    ],
    tarea: [
      'Toma esta semana al menos 10 fotos cubriendo los 6 tipos.',
      'Sube tu logo (cuadrado) y una portada atractiva.',
      'Agenda un recordatorio mensual para subir 2–3 fotos nuevas.',
    ],
    gemini: 'Dame una lista de 15 ideas de fotos para el perfil de Google de mi negocio de [tu categoría], organizadas por tipo (fachada, interior, equipo, productos/servicios, antes y después). Dime qué hacer para que se vean bien con un celular.',
    quiz: [
      { q: '¿Qué tipo de foto conviene evitar?', o: ['Fotos reales de tu local', 'Fotos de internet que no son tuyas', 'Fotos de tu equipo'], c: 1, w: 'Las fotos deben ser reales y tuyas; las de internet restan confianza.' },
    ],
  },
  {
    id: 6, min: 10, titulo: 'Reseñas: cómo conseguirlas bien',
    objetivo: 'Tener un sistema simple y permitido para recibir reseñas todas las semanas.',
    bloques: [
      { p: 'Las reseñas son la parte principal de la **prominencia**. Pero hay dos reglas que no puedes romper:' },
      { lista: [
        '**No ofrezcas incentivos** (descuentos, regalos, sorteos) a cambio de reseñas.',
        '**No filtres:** no pidas reseñas solo a quienes crees contentos, ni envíes a los molestos a un formulario privado. Google prohíbe discriminar a quién se le pide.',
      ] },
      { p: '**El sistema:**' },
      { lista: [
        '**Enlace corto:** en tu perfil, "Pedir reseñas" → copia el enlace.',
        '**Mensaje guardado** en WhatsApp Business, igual para todos los clientes. Ejemplo: "Gracias por elegirnos. Tu opinión, sea cual sea, nos ayuda a mejorar. Aquí puedes contarnos tu experiencia: [enlace]".',
        '**QR en el mostrador** con el mismo enlace.',
        '**Momento fijo:** al entregar, al cobrar o al cerrar la cita.',
        '**Meta realista:** 2–4 reseñas nuevas por semana.',
      ] },
    ],
    tarea: [
      'Copia tu enlace de reseñas de Google.',
      'Guarda el mensaje en WhatsApp Business como respuesta rápida (usa el generador "Pedir reseñas").',
      'Imprime o muestra un QR con el enlace en tu mostrador.',
      'Envía el mensaje a tus últimos 10 clientes, a todos.',
    ],
    gemini: 'Redacta 3 versiones de un mensaje corto de WhatsApp para pedir una reseña en Google a mis clientes. Debe ser el mismo para todos, sin ofrecer premios ni descuentos, y sin sugerir que solo opinen quienes quedaron satisfechos. Incluye el espacio [enlace].',
    quiz: [
      { q: '¿Está permitido pedir reseñas solo a tus clientes más satisfechos?', o: ['Sí, es lo más inteligente', 'No, hay que pedirla a todos por igual', 'Sí, si les das un descuento'], c: 1, w: 'Seleccionar a quién se le pide, o premiar la reseña, va contra las políticas de Google.' },
    ],
  },
  {
    id: 7, min: 9, titulo: 'Responder reseñas (incluidas las malas)',
    objetivo: 'Responder con una fórmula simple que convierte quejas en confianza.',
    bloques: [
      { p: 'Responder demuestra que hay alguien atento. Además, quien lee una mala reseña mira cómo reaccionas.' },
      { lista: [
        '**Agradece** con el nombre de la persona.',
        '**Personaliza:** menciona algo concreto de lo que dijo; evita respuestas idénticas para todos.',
        '**Resuelve o invita:** en las negativas ofrece un canal privado ("escríbenos al 6000-0000") sin discutir.',
        '**Plazo:** apunta a responder en 48 horas.',
      ] },
      { p: '**Nunca:** discutir, culpar al cliente, revelar datos personales o pedir que borre su reseña.' },
      { p: '**Reseñas falsas o inapropiadas:** si una reseña no es de una experiencia real, es ofensiva o es spam, puedes denunciarla desde tu perfil. Una crítica honesta, aunque duela, no se denuncia: se responde.' },
    ],
    tarea: [
      'Responde las 5 reseñas más recientes sin respuesta.',
      'Usa las plantillas de 5, 3 y 1–2 estrellas y personalízalas.',
      'Si hay una reseña claramente falsa o abusiva, denúnciala.',
    ],
    gemini: 'Muéstrame las reseñas recientes de mi perfil (@Google Business Profile) que aún no tienen respuesta y redacta un borrador para cada una en tono cercano y profesional, sin respuestas genéricas. No publiques nada: espera mi confirmación.',
    quiz: [
      { q: 'Recibes una reseña negativa honesta. ¿Qué haces?', o: ['La denuncio para que la quiten', 'Respondo con calma y ofrezco resolverlo en privado', 'No respondo para no llamar la atención'], c: 1, w: 'Una crítica real se responde: se ve profesional y puede recuperar al cliente.' },
    ],
  },
  {
    id: 8, min: 10, titulo: 'Publicaciones, rutina semanal y medición',
    objetivo: 'Mantener el perfil vivo con 30 minutos por semana y medir si funciona.',
    bloques: [
      { p: 'Las publicaciones (novedades, ofertas y eventos) muestran que tu negocio está activo. No necesitas más de **una por semana**.' },
      { lista: [
        '**Novedad:** un servicio nuevo, un producto llegado.',
        '**Oferta:** descuento o promoción con fechas claras.',
        '**Evento:** una jornada, taller o fecha especial.',
        '**Consejo útil:** algo que tu cliente agradece aprender.',
      ] },
      { p: '**Tu rutina de 30 minutos:**' },
      { lista: [
        '**Lunes (10 min):** responde reseñas nuevas.',
        '**Miércoles (10 min):** publica una actualización.',
        '**Viernes (10 min):** sube 1–2 fotos y pide reseñas a los clientes de la semana.',
      ] },
      { p: '**Medir:** una vez al mes revisa en tu perfil el rendimiento (llamadas, cómo llegar, visitas a tu web, búsquedas) y compáralo con el mes anterior. Si algo sube, repite lo que hiciste.' },
      { p: '**Gemini como ayudante:** si tu cuenta lo permite, conecta tu perfil a Gemini para que te resuma reseñas y rendimiento y te redacte borradores. Tú siempre revisas antes de publicar.' },
    ],
    tarea: [
      'Programa tu rutina de 30 minutos en el calendario del celular.',
      'Publica tu primera actualización esta semana.',
      'Anota hoy tus números (llamadas, rutas, visitas web) para compararlos el mes próximo.',
      'Vuelve al Optimizador y mide tu nuevo puntaje.',
    ],
    gemini: '¿Cómo le fue a mi negocio este mes en Google? (@Google Business Profile) Resume el rendimiento (búsquedas, llamadas, cómo llegar, visitas a la web), compáralo con el mes anterior y sugiéreme 3 acciones. Además propón 4 publicaciones para las próximas 4 semanas, sin publicar nada hasta que yo confirme.',
    quiz: [
      { q: '¿Cuántas publicaciones necesitas como mínimo para mantener el perfil activo?', o: ['Una por semana', 'Diez por día', 'Una al año'], c: 0, w: 'La constancia pesa más que la cantidad: una por semana es sostenible.' },
    ],
  },
];



// Segunda pregunta para las 8 lecciones originales del curso de Google.
const EXTRA_QUIZ = {
  1: { q: '¿Cómo debe ser todo lo que escribes en tu perfil?', o: ['Lo más llamativo posible', 'Verdadero y preciso', 'Lleno de palabras clave'], c: 1, w: 'Google puede suspender perfiles con datos engañosos y los clientes lo notan.' },
  2: { q: '¿Qué datos deben ser idénticos en tu perfil, tu web y tus redes?', o: ['Nombre, dirección y teléfono', 'Solo el logo', 'Los precios'], c: 0, w: 'La consistencia de nombre, dirección y teléfono genera confianza en Google y en los clientes.' },
  3: { q: '¿Cuál debe ser tu categoría principal?', o: ['La que mejor describe tu actividad principal', 'La más popular, aunque no sea lo tuyo', 'Una distinta cada mes'], c: 0, w: 'La categoría principal le dice a Google qué eres; las secundarias completan el resto.' },
  4: { q: '¿Cuál es el límite de caracteres de la descripción?', o: ['750', '150', '2000'], c: 0, w: 'Tienes hasta 750 caracteres; usa los mejores al inicio.' },
  5: { q: '¿Cuántas fotos nuevas conviene subir al mes?', o: ['2–3, reales y recientes', 'Ninguna', '100 de golpe una vez al año'], c: 0, w: 'La constancia hace que tu perfil se vea vivo.' },
  6: { q: '¿Puedes ofrecer un descuento a cambio de una reseña?', o: ['Sí, es lo más rápido', 'No, los incentivos están prohibidos', 'Solo si es pequeño'], c: 1, w: 'Google prohíbe incentivar reseñas; pide a todos por igual y sin premios.' },
  7: { q: '¿Cómo respondes a una reseña negativa?', o: ['Con calma, agradeciendo y ofreciendo resolverlo', 'Discutiendo para defender tu negocio', 'No respondes nunca'], c: 0, w: 'Tu respuesta la leen todos los futuros clientes: muestra profesionalismo.' },
  8: { q: '¿Cada cuánto conviene dedicarle tiempo al perfil?', o: ['Cada semana, con una rutina corta', 'Una vez al año', 'Solo cuando hay una queja'], c: 0, w: 'Una rutina semanal corta mantiene el perfil activo y mide qué funciona.' },
};
GOOGLE_1_8.forEach((l) => { if (EXTRA_QUIZ[l.id]) l.quiz.push(EXTRA_QUIZ[l.id]); });

const prep = (arr) => arr.map((l) => ({ ...l, guion: Array.isArray(l.guion) ? l.guion.join('\n') : l.guion }));
const N_GRATIS = 4; // 1/3 de 12 lecciones

const defs = [
  { id: 'google', icono: '🔎', corto: 'Google', titulo: 'Perfil de Google que atrae clientes',
    subtitulo: 'Haz que te encuentren, confíen y te escriban: perfil, reseñas, fotos, Ask Maps y medición.',
    para: 'Negocios con ubicación o zona de servicio que quieren aparecer en Google Maps.',
    resultado: 'Un perfil completo, con reseñas en marcha y un plan de 90 días.',
    etapa: 'Atraer', lecciones: [...GOOGLE_1_8, ...GOOGLE_9_12] },
  { id: 'setter', icono: '💬', corto: 'Setter', titulo: 'Setter: conversaciones que agendan',
    subtitulo: 'Responde rápido, califica y agenda por WhatsApp e Instagram, sin ser pesado.',
    para: 'Quien atiende los mensajes del negocio y quiere convertir curiosos en citas y cotizaciones.',
    resultado: 'Un proceso diario de conversación, calificación y agenda con su tablero semanal.',
    etapa: 'Conversar', lecciones: SETTER },
  { id: 'closer', icono: '🤝', corto: 'Closer', titulo: 'Closer: cierra con confianza',
    subtitulo: 'Diagnóstico, propuesta clara, precio sin miedo, objeciones y cierre honesto.',
    para: 'Quien presenta la cotización y necesita pasar de "me interesa" a "lo compro".',
    resultado: 'Una forma simple de diagnosticar, cotizar, manejar objeciones y cerrar sin presión.',
    etapa: 'Cerrar', lecciones: CLOSER },
  { id: 'fidelizar', icono: '🔁', corto: 'Clientes que vuelven', titulo: 'Clientes que vuelven',
    subtitulo: 'Postventa, reseñas, recompra, fidelidad y referidos para vender más al cliente que ya tienes.',
    para: 'Negocios que quieren más ventas repetidas y recomendaciones sin gastar en publicidad.',
    resultado: 'Un sistema de postventa, recompra, segmentos y referidos con tablero mensual.',
    etapa: 'Fidelizar', lecciones: FIDELIZAR },
];

export const CURSOS = defs.map((c) => ({
  ...c,
  lecciones: prep(c.lecciones).map((l) => ({ ...l, gratis: l.id <= N_GRATIS })),
}));
CURSOS.forEach((c) => { c.total = c.lecciones.length; c.gratis = c.lecciones.filter((l) => l.gratis).length; });

export const GRATIS_POR_CURSO = N_GRATIS;
export const TOTAL_LECCIONES = CURSOS.reduce((a, c) => a + c.total, 0);
export const GRATIS_LECCIONES = CURSOS.reduce((a, c) => a + c.gratis, 0);
export const cursoDe = (id) => CURSOS.find((c) => c.id === id);
export const leccionDe = (cid, n) => cursoDe(cid)?.lecciones.find((l) => l.id === n);

// Acciones del optimizador → lección del curso de Google que las enseña
export const ACCION_LECCION = {
  verificado: 2, horario: 2, telefono: 2, web: 11, nap: 2,
  categorias: 3, atributos: 10,
  descripcion: 4, servicios: 9,
  fotos: 5, logo: 5,
  resenas: 6, enlaceResenas: 6, recencia: 6,
  rating: 7, respuestas: 7,
  posts: 8,
};
