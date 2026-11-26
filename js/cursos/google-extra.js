// Curso "Perfil de Google que atrae clientes": lecciones 9 a 12 (las 1 a 8 viven en academia.js).
// Contenido propiedad de Neuroactiva Labs.
export const GOOGLE_9_12 = [
  {
    id: 9, min: 9, titulo: 'Servicios, productos y precios que venden',
    objetivo: 'Cargar tu oferta completa en el perfil para que Google y el cliente entiendan qué vendes.',
    bloques: [
      { p: 'Un perfil con categoría correcta pero sin servicios ni productos deja dudas. El cliente quiere saber en segundos: **¿lo que busco lo tienen y cuánto cuesta aproximadamente?**' },
      { lista: [
        '**Servicios:** un renglón por servicio, con nombre claro (el que usaría el cliente, no el técnico) y una descripción de 1–2 frases.',
        '**Productos:** foto real, nombre, descripción corta y, si puedes, precio. Empieza por los 10 que más vendes.',
        '**Precios:** pon el precio exacto o un rango honesto ("desde $8"). Si cambia mucho, escribe de qué depende.',
        '**Orden:** primero lo que más se pide; Google y el cliente leen de arriba hacia abajo.',
      ] },
      { p: '**Ejemplo de servicio bien escrito:** "Corte de cabello caballero — 30 min. Incluye lavado y peinado. Desde $6." Corto, claro, sin palabras de relleno.' },
      { p: '**Cuidado:** no copies textos de otros negocios y no prometas lo que no puedes cumplir. Si un precio cambia, actualízalo: un precio viejo genera discusiones en caja.' },
    ],
    tarea: [
      'Lista tus 10 servicios o productos más pedidos con precio o rango.',
      'Cárgalos en tu perfil con una descripción de 1–2 frases cada uno.',
      'Sube una foto real a por lo menos 5 productos o trabajos.',
    ],
    guion: [
      'Plantilla de servicio:',
      '[Nombre que usa el cliente] — [duración o formato].',
      'Incluye [qué incluye]. [Para quién es o cuándo conviene].',
      'Desde $[precio].',
    ],
    gemini: 'Tengo un negocio de [categoría] en [ciudad]. Estos son mis servicios/productos con precio: [lista]. Redacta para cada uno un nombre claro y una descripción de máximo 2 frases para mi perfil de Google, sin palabras de relleno ni promesas exageradas. Pide confirmación antes de cambiar nada.',
    quiz: [
      { q: '¿Cómo conviene nombrar un servicio?', o: ['Con el término técnico más complejo', 'Con el nombre que usaría el cliente al buscarlo', 'Con una lista de palabras clave'], c: 1, w: 'El cliente busca con sus palabras; nómbralo igual.' },
      { q: 'Tu precio cambia según el caso. ¿Qué haces?', o: ['No pones precio', 'Pones "desde $X" y explicas de qué depende', 'Pones el precio más bajo posible'], c: 1, w: 'Un rango honesto evita sorpresas y filtra a quien no es tu cliente.' },
    ],
  },
  {
    id: 10, min: 10, titulo: 'Que Ask Maps y Gemini hablen bien de ti',
    objetivo: 'Entender cómo las respuestas con IA de Google Maps usan tu perfil y preparar la información que ellas leen.',
    bloques: [
      { p: 'La sección de preguntas y respuestas de los perfiles ya no existe: Google la retiró y la está reemplazando con respuestas generadas por IA dentro de Maps (**Ask Maps**, con Gemini). El cliente puede preguntar "¿tienen estacionamiento?" o "¿atienden sin cita?" y la IA contesta con lo que encuentra.' },
      { p: '**¿De dónde saca la respuesta?** De tu información del perfil, de tu sitio web y de lo que dicen las reseñas. No lo controlas, pero sí controlas lo que puede leer.' },
      { lista: [
        '**Atributos completos:** estacionamiento, accesibilidad, métodos de pago, wifi, atención a domicilio. Cada atributo marcado es una respuesta menos que la IA tiene que adivinar.',
        '**Descripción y servicios claros:** frases completas con datos concretos (horario, zona, qué incluyes).',
        '**Reseñas con detalle:** pide a tus clientes que cuenten qué compraron o qué servicio recibieron (sin ponerles palabras en la boca). Las reseñas con detalle alimentan mejores respuestas.',
        '**Una página de preguntas frecuentes** en tu web o en una publicación: horarios, formas de pago, cómo reservar, qué traer.',
      ] },
      { p: '**Aviso honesto:** esta función se está desplegando poco a poco y puede no estar en todas las categorías o países. La estrategia no cambia: información veraz, completa y actualizada sirve igual para clientes y para la IA.' },
    ],
    tarea: [
      'Revisa tus atributos y marca todos los que sean verdad.',
      'Escribe las 8 preguntas que más te hacen los clientes por WhatsApp o en mostrador.',
      'Verifica que la respuesta a cada una esté escrita en tu perfil, tu web o una publicación.',
    ],
    guion: [
      'Preguntas frecuentes (modelo para tu web o publicación):',
      '¿Cuál es el horario? [horario, incluye feriados]',
      '¿Cómo puedo pagar? [efectivo, tarjeta, Yappy, transferencia]',
      '¿Necesito cita? [sí/no, cómo reservar]',
      '¿Hacen entregas a domicilio? [zonas y costo]',
      '¿Dónde estacionar? [detalle]',
    ],
    gemini: 'Actúa como si fueras un cliente nuevo que pregunta por mi negocio de [categoría] en [ciudad]. Haz 15 preguntas reales que un cliente haría antes de visitarme y dime cuáles no podría responder hoy con mi perfil. Datos de mi perfil: [pega descripción y atributos].',
    quiz: [
      { q: '¿Qué pasó con la sección de preguntas y respuestas del perfil?', o: ['Sigue igual', 'Google la retiró y usa respuestas con IA en Maps', 'Ahora la responde Google por ti sin leer nada'], c: 1, w: 'Q&A se retiró; Ask Maps responde con IA usando tu perfil, web y reseñas.' },
      { q: '¿Qué te ayuda más a que la IA responda bien sobre tu negocio?', o: ['Atributos completos e información veraz y actualizada', 'Repetir palabras clave', 'Borrar tus reseñas'], c: 0, w: 'La IA solo es tan buena como la información que puede leer.' },
    ],
  },
  {
    id: 11, min: 9, titulo: 'Llamadas a la acción y medición',
    objetivo: 'Facilitar que el cliente actúe (llamar, ir, escribir, reservar) y medir qué funciona.',
    bloques: [
      { p: 'Un cliente interesado no debería pensar cómo contactarte. Tu perfil necesita **caminos cortos**: tocar y llamar, tocar y llegar, tocar y escribir.' },
      { lista: [
        '**Teléfono:** uno que contesten. Si es solo WhatsApp, dilo en la descripción.',
        '**Enlace web:** si no tienes sitio, usa un enlace de WhatsApp (wa.me/507XXXXXXXX), un catálogo o tu página de reservas o pedidos.',
        '**Reservas y pedidos:** si usas un enlace de reserva o pedido, ponlo en el campo correspondiente.',
        '**Horario especial:** feriados y cierres temporales siempre actualizados.',
      ] },
      { p: '**Medir:** en el panel del perfil puedes ver cuántas personas te vieron, llamaron, pidieron ruta o entraron a tu web. Anota estos números cada mes en una hoja simple.' },
      { lista: [
        '**Llamadas y rutas** = intención alta. Si suben, vas bien.',
        '**Vistas altas pero pocas acciones** = tu perfil se ve, pero no convence: revisa fotos, descripción y reseñas.',
        '**Cambia una cosa por mes** para saber qué causó la mejora.',
      ] },
      { p: 'Pregunta siempre en caja o por WhatsApp: **"¿cómo nos encontró?"** Es la medición más barata y más honesta.' },
    ],
    tarea: [
      'Verifica que tu teléfono, enlace web y horario especial estén correctos.',
      'Crea tu enlace de WhatsApp y pégalo en el campo de web.',
      'Anota las llamadas, rutas y visitas web de los últimos 30 días.',
    ],
    guion: [
      'Enlace de WhatsApp con mensaje inicial:',
      'https://wa.me/507XXXXXXXX?text=Hola%2C%20vi%20su%20perfil%20en%20Google%20y%20quiero%20informaci%C3%B3n',
      '(Cambia 507XXXXXXXX por tu número con código de país.)',
    ],
    gemini: 'Tengo un negocio de [categoría]. Estos son mis números de los últimos 30 días en mi perfil de Google: [vistas, llamadas, rutas, visitas web]. Interprétalos en palabras simples, dime qué es bueno o preocupante y propón 3 cambios para probar el próximo mes.',
    quiz: [
      { q: 'Muchas vistas pero pocas llamadas y rutas significa que…', o: ['Todo va perfecto', 'Te ven pero no convences: revisa fotos, descripción y reseñas', 'Debes cambiar el nombre del negocio'], c: 1, w: 'La atención llega, pero falta confianza o claridad para actuar.' },
      { q: '¿Cuál es la medición más barata y honesta?', o: ['Adivinar', 'Preguntar a cada cliente cómo te encontró', 'Mirar solo el número de reseñas'], c: 1, w: 'Preguntar a los clientes confirma lo que muestran los números.' },
    ],
  },
  {
    id: 12, min: 10, titulo: 'Estudia a tu competencia y plan de 90 días',
    objetivo: 'Comparar tu perfil con los 3 mejores de tu zona y armar un plan realista de 90 días.',
    bloques: [
      { p: 'Los 3 negocios que anotaste en la lección 1 son tu **referencia**, no tu enemigo. Mirar lo que hacen bien es legítimo; copiar textos o fotos no lo es.' },
      { lista: [
        '**Compara 6 puntos:** cantidad y nota de reseñas, fecha de la última reseña, cantidad de fotos, categorías, servicios cargados y publicaciones recientes.',
        '**Anota la brecha:** dónde están por encima de ti y cuánto falta (por ejemplo, 120 reseñas contra tus 30).',
        '**Elige tu ventaja real:** algo que ellos no ofrecen (horario, rapidez, trato, especialidad). Ponla en tu descripción y fotos, sin exagerar.',
      ] },
      { p: '**Plan de 90 días (ejemplo):**' },
      { lista: [
        '**Mes 1 — Base:** perfil verificado, categorías, atributos, descripción, servicios y fotos.',
        '**Mes 2 — Reputación:** sistema de reseñas funcionando y respuesta a todas las reseñas en 48 horas.',
        '**Mes 3 — Constancia:** publicaciones semanales, medición y un ajuste mensual.',
      ] },
      { p: 'Al final de los 90 días vuelve a analizar tu perfil en el Optimizador y compara el puntaje: ese es tu avance medible.' },
    ],
    tarea: [
      'Haz una tabla con tus 6 puntos contra los 3 competidores.',
      'Escribe tu ventaja real en una frase.',
      'Agenda en el calendario las 3 revisiones (día 30, 60 y 90).',
    ],
    guion: [
      'Tabla de comparación (cópiala a una hoja):',
      'Punto | Yo | Competidor 1 | Competidor 2 | Competidor 3',
      'Reseñas (cantidad y nota)',
      'Última reseña (fecha)',
      'Fotos (cantidad)',
      'Categorías secundarias',
      'Servicios cargados',
      'Publicaciones del último mes',
    ],
    gemini: 'Compara mi perfil de Google con estos 3 competidores usando estos datos: [pega tu tabla]. Dime en qué punto estoy más débil, cuál es la mejora que más impacto tendría y arma un plan de 90 días con tareas semanales cortas.',
    quiz: [
      { q: '¿Qué es válido hacer con el perfil de un competidor?', o: ['Copiar sus textos y fotos', 'Estudiar qué hace bien y diferenciarte con tu ventaja real', 'Dejarle reseñas falsas'], c: 1, w: 'Estudiar es válido; copiar o dañar no lo es.' },
      { q: '¿Cómo mides que tu plan funcionó?', o: ['Por intuición', 'Comparando tu puntaje y tus números al día 0 y al día 90', 'Esperando un año'], c: 1, w: 'Mide al inicio y al final con los mismos indicadores.' },
    ],
  },
];
