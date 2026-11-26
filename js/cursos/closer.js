// Curso "Closer": cierra con confianza y sin presión. Contenido propiedad de Neuroactiva Labs.
// Principios: ayudar a decidir, precio claro, urgencia solo si es real, nada de engaños.
export const CLOSER = [
  {
    id: 1, min: 7, titulo: 'Qué hace un closer: ayudar a decidir',
    objetivo: 'Adoptar la mentalidad correcta: vender es ayudar a una persona a tomar una buena decisión.',
    bloques: [
      { p: 'Un **closer** convierte un interés real en una compra. No es el que presiona más, sino el que **ayuda a decidir mejor**: aclara dudas, muestra el valor y propone el siguiente paso.' },
      { lista: [
        '**Escucha más de lo que habla:** el cliente te da la información para venderle bien.',
        '**Cree en lo que vende:** si no resuelve el problema del cliente, no lo vendas.',
        '**Dirige sin empujar:** propones el paso siguiente con claridad.',
        '**Acepta el "no":** un no honesto hoy puede ser un sí mañana; un sí forzado es un reclamo.',
      ] },
      { p: '**Vender con honestidad también es más rentable:** el cliente satisfecho vuelve, te recomienda y deja buenas reseñas. El engaño te cuesta reputación.' },
      { p: 'Este curso empieza donde termina el de Setter: el cliente ya está calificado y quiere decidir. Tu trabajo es acompañarlo hasta ahí.' },
    ],
    tarea: [
      'Recuerda una compra importante que hiciste y qué hizo la otra persona para que te sintieras seguro.',
      'Anota 3 cosas de tu negocio que de verdad ayudan al cliente.',
      'Escribe tu tasa de cierre actual (ventas ÷ cotizaciones) aunque sea aproximada.',
    ],
    guion: [
      'Mi tasa de cierre actual: cotizaciones ___ · ventas ___ · tasa ___ %',
      'Lo que de verdad resuelvo: 1) ___ 2) ___ 3) ___',
    ],
    gemini: 'Soy dueño de un negocio de [categoría]. Explícame en palabras simples la diferencia entre presionar y ayudar a decidir, y dame 5 hábitos concretos de un closer honesto que yo pueda aplicar esta semana.',
    quiz: [
      { q: '¿Qué distingue a un buen closer?', o: ['Habla más que el cliente', 'Escucha, aclara dudas y propone el siguiente paso', 'Insiste hasta que compre'], c: 1, w: 'Ayuda a decidir con claridad, sin presión.' },
    ],
  },
  {
    id: 2, min: 8, titulo: 'Prepara la conversación antes de empezar',
    objetivo: 'Llegar a cada llamada, visita o chat con ficha, objetivo y resultado mínimo definidos.',
    bloques: [
      { p: 'Los mejores cierres se ganan **antes** de hablar. Cinco minutos de preparación cambian el resultado.' },
      { lista: [
        '**Repasa la ficha del lead:** qué necesita, para cuándo, qué dudas mencionó.',
        '**Define tu objetivo:** qué quieres lograr (venta, abono, cotización aceptada).',
        '**Define el mínimo aceptable:** si hoy no cierra, qué avance sí te sirve (fecha de decisión, visita, muestra).',
        '**Prepara pruebas:** reseñas, fotos antes y después, ejemplos y precios claros.',
        '**Elimina distracciones:** atención completa, notas a la mano.',
      ] },
      { p: 'Si la conversación es por chat, la preparación es igual: **tener a mano la cotización, las fotos y los medios de pago** evita pausas que enfrían.' },
    ],
    tarea: [
      'Crea tu lista de preparación de 5 puntos.',
      'Úsala en tus próximas 3 conversaciones de cierre.',
      'Anota después qué te faltó tener a mano.',
    ],
    guion: [
      'PREPARACIÓN (5 min)',
      'Cliente: ___ Necesita: ___ Para cuándo: ___',
      'Mi objetivo: ___',
      'Mínimo aceptable: ___',
      'Pruebas a mostrar: ___',
      'Precio y medios de pago listos: sí / no',
    ],
    gemini: 'Crea una lista de preparación de 5 minutos para antes de hablar con un cliente que ya pidió cotización en mi negocio de [categoría]. Incluye qué revisar, qué objetivo fijar, qué prueba mostrar y cómo definir un resultado mínimo si no cierra hoy.',
    quiz: [
      { q: '¿Qué es el "resultado mínimo aceptable"?', o: ['Lo menos que cobras', 'El avance que te sirve si hoy no cierra', 'El descuento máximo'], c: 1, w: 'Evita salir con las manos vacías: una fecha, una visita o una muestra.' },
    ],
  },
  {
    id: 3, min: 9, titulo: 'Diagnóstico: descubre el problema real',
    objetivo: 'Hacer preguntas que revelen la situación, el problema, el impacto y lo que el cliente quiere lograr.',
    bloques: [
      { p: 'El cliente casi nunca compra "un producto": compra **la solución a un problema**. Un buen diagnóstico te lo muestra y le muestra a él por qué le conviene actuar.' },
      { lista: [
        '**Situación:** "¿Cómo lo están manejando hoy?"',
        '**Problema:** "¿Qué es lo que más te molesta o te cuesta?"',
        '**Impacto:** "¿Qué te ha pasado por eso? ¿Qué te cuesta (tiempo, dinero, clientes)?"',
        '**Resultado deseado:** "Si esto se resolviera, ¿cómo se vería para ti?"',
      ] },
      { p: '**Técnica del eco:** repite con tus palabras lo que entendiste: "Si te entiendo bien, lo que más te preocupa es…". El cliente se siente escuchado y corrige si hace falta.' },
      { p: '**Evita** presentar tu solución antes de terminar el diagnóstico: sin entender el problema, hablarás de lo que no le importa.' },
    ],
    tarea: [
      'Redacta tus 4 preguntas de diagnóstico para tu servicio principal.',
      'Practícalas con 2 clientes y anota qué descubriste que no sabías.',
      'Escribe tu frase de eco para resumir.',
    ],
    guion: [
      'Situación: ¿Cómo lo manejas hoy?',
      'Problema: ¿Qué es lo que más te cuesta o te molesta de eso?',
      'Impacto: ¿Qué te ha pasado por esa causa? ¿Cuánto te cuesta en tiempo o dinero?',
      'Deseo: Si se resolviera, ¿cómo se vería para ti?',
      'Eco: Si te entiendo bien, lo más importante para ti es ___. ¿Es así?',
    ],
    gemini: 'Diseña 4 preguntas de diagnóstico (situación, problema, impacto y resultado deseado) para un cliente potencial de mi negocio de [categoría]. Dame variantes para chat y para conversación en persona, y un ejemplo de resumen con la técnica del eco.',
    quiz: [
      { q: '¿Para qué sirve preguntar por el impacto?', o: ['Para asustar al cliente', 'Para que vea lo que le cuesta no resolver el problema', 'Para subir el precio'], c: 1, w: 'El impacto aclara la importancia real de resolverlo.' },
      { q: 'Presentas tu solución…', o: ['Antes de preguntar nada', 'Después de entender el problema', 'Nunca'], c: 1, w: 'Primero entiendes, después propones.' },
    ],
  },
  {
    id: 4, min: 9, titulo: 'Presenta la solución en 3 pasos con pruebas',
    objetivo: 'Explicar tu propuesta de forma simple: problema, solución y resultado, apoyada en pruebas reales.',
    bloques: [
      { p: 'Con el diagnóstico hecho, presenta en **3 pasos cortos**:' },
      { lista: [
        '**1. Problema:** "Me dijiste que [problema] te cuesta [impacto]".',
        '**2. Solución:** "Lo que hacemos es [lo esencial], de esta manera".',
        '**3. Resultado:** "Con eso podrás [resultado deseado], y empezamos en [tiempo]".',
      ] },
      { p: '**Pruebas que funcionan:** reseñas reales, fotos antes y después, casos de clientes parecidos (con su permiso), garantías honestas y ejemplos de trabajos.' },
      { p: '**Habla de beneficios, no de características.** "Tiene 3 funciones" es característica; "te ahorra una hora al día" es beneficio. Traduce cada característica a lo que el cliente gana.' },
      { p: 'No prometas lo que no puedes cumplir. Una promesa exagerada se paga con reclamos y reseñas negativas.' },
    ],
    tarea: [
      'Escribe tu presentación de 3 pasos para tu servicio principal.',
      'Prepara 3 pruebas (reseñas, fotos o casos) y guárdalas en un lugar de fácil acceso.',
      'Traduce 3 características a beneficios.',
    ],
    guion: [
      'Me dijiste que [problema] te cuesta [impacto].',
      'Lo que hacemos es [solución en una frase], de esta forma: [cómo].',
      'Con eso podrás [resultado] y empezamos [cuándo].',
      'Por ejemplo, [prueba breve: caso o reseña].',
    ],
    gemini: 'Con este diagnóstico del cliente: [pega]. Redacta mi presentación de 3 pasos (problema, solución, resultado) en un mensaje de WhatsApp de máximo 8 líneas, con una prueba real de ejemplo y un tono cercano. Sin exageraciones.',
    quiz: [
      { q: '¿Qué es mejor decir?', o: ['"Tiene 3 funciones"', '"Te ahorra una hora al día"', '"Es el mejor del mercado"'], c: 1, w: 'El beneficio concreto convence más que la característica o el elogio vacío.' },
    ],
  },
  {
    id: 5, min: 9, titulo: 'Una cotización que se entiende y se acepta',
    objetivo: 'Armar propuestas claras, con opciones y un siguiente paso explícito.',
    bloques: [
      { p: 'Una cotización confusa se posterga; una clara se aprueba. Debe responder en 30 segundos: **qué recibo, cuánto cuesta, cuánto tarda y qué hago ahora**.' },
      { lista: [
        '**Qué incluye** (y qué no incluye) en lenguaje simple.',
        '**Precio total** con ITBMS si aplica y condiciones de pago.',
        '**Plazo de entrega o ejecución.**',
        '**Validez** de la propuesta (fecha real).',
        '**Siguiente paso claro:** "Para empezar, confirma respondiendo SÍ y envía el abono".',
      ] },
      { p: '**Tres opciones** ayudan a decidir: una básica, una recomendada y una completa. La del medio, bien explicada, suele elegirse. No es manipulación: es dar elección.' },
      { p: 'Con **Neuro Cotizaciones** armas el documento con tu logo, tu catálogo y condiciones, y lo envías por WhatsApp en minutos.' },
    ],
    tarea: [
      'Arma una cotización de 3 opciones para tu servicio estrella.',
      'Revisa que cada una diga qué incluye, precio, plazo, validez y siguiente paso.',
      'Pídele a alguien ajeno que la lea y te diga qué entendió.',
    ],
    guion: [
      'Opción A (básica): [qué incluye] — $[precio] — [plazo]',
      'Opción B (recomendada): [qué incluye] — $[precio] — [plazo]',
      'Opción C (completa): [qué incluye] — $[precio] — [plazo]',
      'Válida hasta: [fecha]. Para empezar: [paso] y [abono].',
    ],
    gemini: 'Convierte esta lista de servicios en una cotización de 3 opciones (básica, recomendada y completa) para mi negocio de [categoría], con qué incluye, precio, plazo, validez y el siguiente paso. Lenguaje simple y sin términos técnicos: [pega servicios y precios].',
    quiz: [
      { q: '¿Qué debe tener toda cotización?', o: ['Solo el precio total', 'Qué incluye, precio, plazo, validez y siguiente paso', 'Muchas páginas'], c: 1, w: 'Cuanto más clara, más rápido se decide.' },
    ],
  },
  {
    id: 6, min: 9, titulo: 'Hablar de precio sin miedo',
    objetivo: 'Presentar el precio con seguridad, anclado al valor y con opciones, sin disculparte.',
    bloques: [
      { p: 'Quien se disculpa por el precio le enseña al cliente a dudar de él. Presenta el precio con **calma y después de mostrar el valor**.' },
      { lista: [
        '**Valor primero, precio después:** el cliente ya sabe qué obtiene cuando ve el número.',
        '**Di el número y calla:** el silencio que sigue es normal; no lo llenes bajando el precio.',
        '**Ofrece opciones, no descuentos:** si el presupuesto no alcanza, ajusta el alcance en lugar de regalar margen.',
        '**Si das un descuento,** que sea con condición (pago anticipado, volumen, fecha) y con un límite claro.',
      ] },
      { p: '**Ancla de valor:** compara con el costo de no resolver el problema o con lo que el cliente gastaría de otra forma. Siempre con datos reales de su situación.' },
      { p: '**Tu margen es tu salud:** vender barato no es vender más, es trabajar más para ganar menos.' },
    ],
    tarea: [
      'Calcula tu margen mínimo por servicio y fija tu piso de precio.',
      'Escribe tu frase de presentación de precio con valor antes.',
      'Define 2 condiciones por las que sí darías descuento.',
    ],
    guion: [
      'Con lo que me contaste, la mejor opción es [opción]. Incluye [valor 1, valor 2].',
      'La inversión es $[precio], con [condición de pago].',
      '¿Te parece bien que avancemos con esta opción?',
      'Si el presupuesto es menor: Puedo ajustar el alcance a [opción] por $[precio].',
    ],
    gemini: 'Ayúdame a presentar el precio de mi servicio [servicio] de $[precio] con valor primero. Escribe un mensaje de WhatsApp, una respuesta para "está fuera de mi presupuesto" que ajuste el alcance y 2 condiciones honestas para otorgar descuento sin perder margen.',
    quiz: [
      { q: 'El cliente dice que no alcanza el presupuesto. Mejor opción:', o: ['Bajar el precio al instante', 'Ajustar el alcance a una opción menor', 'Cambiar de tema'], c: 1, w: 'Ajustar alcance protege tu margen y respeta su presupuesto.' },
    ],
  },
  {
    id: 7, min: 9, titulo: 'Objeciones I: "está caro" y "lo voy a pensar"',
    objetivo: 'Aplicar un método simple para atender las dos objeciones más comunes sin discutir.',
    bloques: [
      { p: 'Una objeción es una **pregunta disfrazada**. El método tiene 4 pasos: **escuchar, validar, preguntar, responder**.' },
      { lista: [
        '**Escuchar:** deja que termine sin interrumpir.',
        '**Validar:** "Tiene sentido que lo pienses".',
        '**Preguntar:** "¿Qué es lo que más te hace dudar?"',
        '**Responder:** solo a la duda real, con un dato, una prueba o una opción.',
      ] },
      { p: '**"Está caro":** pregunta "¿comparado con qué?". A veces compara con algo distinto. Muestra el valor, ofrece una opción menor o un plan de pago si lo manejas.' },
      { p: '**"Lo voy a pensar":** casi siempre hay una duda sin decir. Pregunta con tranquilidad: "¿Qué te gustaría tener más claro para decidir?". Si no hay duda, acuerda una **fecha de respuesta**: "¿Te escribo el jueves?".' },
    ],
    tarea: [
      'Escribe tus respuestas a "está caro" y "lo voy a pensar" con el método de 4 pasos.',
      'Practica con alguien cercano en voz alta.',
      'Lleva un registro de objeciones recibidas y su resultado.',
    ],
    guion: [
      'Está caro: Te entiendo. Para ayudarte, ¿con qué lo estás comparando? Si quieres, vemos una opción que se ajuste mejor.',
      'Lo pienso: Claro, es una decisión importante. ¿Qué te gustaría tener más claro para decidir? Si prefieres, te escribo el [día] para ver cómo vas.',
    ],
    gemini: 'Para mi negocio de [categoría], escribe respuestas a "está caro" y "lo voy a pensar" siguiendo escuchar, validar, preguntar y responder. Dos versiones cada una: una para WhatsApp y otra para conversación en persona.',
    quiz: [
      { q: '¿Qué sigue después de validar la objeción?', o: ['Discutir', 'Preguntar qué es lo que más hace dudar', 'Terminar la conversación'], c: 1, w: 'Preguntar aclara la duda real antes de responder.' },
    ],
  },
  {
    id: 8, min: 9, titulo: 'Objeciones II: confianza, competencia y momento',
    objetivo: 'Atender "no confío", "encontré más barato", "no es el momento" y "debo consultarlo".',
    bloques: [
      { p: 'Cada objeción esconde algo distinto. Identifícalo antes de responder.' },
      { lista: [
        '**"No confío / no te conozco":** muestra pruebas reales: reseñas, fotos, tiempo en el mercado, garantía y formas de pago seguras. Ofrece empezar con algo pequeño.',
        '**"Encontré más barato":** no ataques al otro. Pregunta qué incluye su oferta y destaca tu diferencia real (servicio, garantía, rapidez, trato). A veces conviene dejarlo ir.',
        '**"No es el momento":** pregunta cuándo sería y deja una fecha de contacto. Si hay un costo real de esperar, dilo con honestidad.',
        '**"Debo consultarlo":** ofrece incluir a la otra persona en una llamada breve o enviar un resumen claro que pueda compartir.',
      ] },
      { p: '**Regla:** nunca hables mal de la competencia ni inventes diferencias. Gana la que se explica mejor, no la que critica.' },
      { p: 'Cuando la objeción es real y tu oferta no es para esa persona, **déjala ir con respeto**. Cuidas tu tiempo y tu reputación.' },
    ],
    tarea: [
      'Prepara pruebas de confianza: 3 reseñas, 3 fotos y tu garantía.',
      'Escribe tu respuesta a "encontré más barato" sin criticar a nadie.',
      'Crea un resumen de una página que el cliente pueda reenviar.',
    ],
    guion: [
      'Confianza: Es válido que quieras estar seguro. Mira lo que dicen nuestros clientes: [reseña]. Si quieres, empezamos con [opción pequeña].',
      'Más barato: Gracias por contármelo. ¿Qué incluye esa oferta? Nosotros incluimos [diferencia real], por eso el valor es distinto.',
      'Consultarlo: Claro. Te envío un resumen para que lo compartan y, si quieren, hacemos una llamada breve con las dudas.',
    ],
    gemini: 'Tengo estas objeciones en mi negocio de [categoría]: no confío, encontré más barato, no es el momento, debo consultarlo. Para cada una redacta una respuesta honesta de WhatsApp, sin hablar mal de la competencia, con una pregunta y un siguiente paso.',
    quiz: [
      { q: '"Encontré más barato". Tu mejor respuesta:', o: ['Criticar a la competencia', 'Preguntar qué incluye y explicar tu diferencia real', 'Bajar el precio sin preguntar'], c: 1, w: 'Compara con claridad y sin atacar.' },
      { q: 'Si tu oferta no es para esa persona…', o: ['La presionas igual', 'La dejas ir con respeto', 'Le mientes'], c: 1, w: 'Proteges tu tiempo y tu reputación.' },
    ],
  },
  {
    id: 9, min: 9, titulo: 'El cierre honesto: pedir la decisión',
    objetivo: 'Pedir la compra con claridad usando cierres simples y confirmar el pago o el abono.',
    bloques: [
      { p: 'Muchas ventas no se cierran por no **pedir la decisión**. Cerrar es proponer el siguiente paso con naturalidad.' },
      { lista: [
        '**Cierre por resumen:** "Entonces: [lo que necesita], en [plazo], por $[precio]. ¿Avanzamos?"',
        '**Cierre por opciones:** "¿Prefieres la opción B con entrega el viernes o la C con instalación?"',
        '**Cierre por siguiente paso:** "Para reservarte el espacio solo falta el abono de $[X]. ¿Te envío los datos?"',
      ] },
      { p: '**Tras el sí:** confirma por escrito qué compró, cuánto pagó, qué falta y cuándo recibirá. El cliente se siente seguro y evitas malentendidos.' },
      { p: '**Cobro:** ten tus medios de pago claros (Yappy, transferencia, enlace). Con **Neuro Pedidos** registras abonos con comprobante y emites el recibo.' },
      { p: 'Si dice "no", pregunta con respeto el motivo y deja la puerta abierta. Un "no" explicado es una lección.' },
    ],
    tarea: [
      'Redacta tus tres cierres con tus palabras.',
      'Prepara tu mensaje de confirmación de venta.',
      'Pide la decisión en cada conversación de esta semana y anota qué responden.',
    ],
    guion: [
      'Resumen: Entonces, necesitas [necesidad], para [fecha], por $[precio]. ¿Avanzamos?',
      'Opciones: ¿Prefieres [opción 1] o [opción 2]?',
      'Siguiente paso: Para reservarte, falta el abono de $[X]. Te envío los datos de pago.',
      'Confirmación: ¡Listo, [nombre]! Compraste [qué], pagaste $[X], falta $[Y]. Entrega: [fecha].',
    ],
    gemini: 'Para mi negocio de [categoría], escribe 3 cierres (resumen, opciones y siguiente paso) en mensajes de WhatsApp y un mensaje de confirmación de venta con qué compró, cuánto pagó, qué falta y la fecha. Tono amable y seguro.',
    quiz: [
      { q: 'Después de que el cliente dice que sí, lo primero es…', o: ['Desaparecer', 'Confirmar por escrito qué compró, cuánto pagó y qué sigue', 'Subir el precio'], c: 1, w: 'La confirmación da tranquilidad y evita malentendidos.' },
    ],
  },
  {
    id: 10, min: 9, titulo: 'Urgencia real, nunca falsa',
    objetivo: 'Motivar la decisión con razones verdaderas sin manipular.',
    bloques: [
      { p: 'La **urgencia real** ayuda a decidir; la **falsa** destruye la confianza. La regla es simple: solo menciona lo que sea verdad y comprobable.' },
      { lista: [
        '**Real:** cupos limitados de agenda, fecha de un evento, vigencia de un precio o promoción con fecha de fin, inventario que de verdad es escaso.',
        '**Falsa:** "solo quedan 2" cuando hay 50, descuentos "de hoy" que se repiten siempre, cronómetros inventados.',
      ] },
      { p: '**Cómo comunicarla:** explica la razón, no la presión: "Mi agenda de la próxima semana ya tiene 2 cupos; si te sirve, te aparto uno".' },
      { p: '**El costo de esperar:** si de verdad hay un costo (el problema empeora, el precio sube en una fecha), puedes decirlo con tacto y datos.' },
      { p: 'Las prácticas engañosas pueden dañar tu reputación y, según el caso, incumplir normas de protección al consumidor.' },
    ],
    tarea: [
      'Lista las razones reales de urgencia que sí existen en tu negocio.',
      'Elimina de tus mensajes cualquier presión que no sea verdad.',
      'Escribe tu frase de urgencia honesta.',
    ],
    guion: [
      'Cupos: Para la próxima semana tengo [N] espacios disponibles. Si te sirve, te aparto uno.',
      'Vigencia: Este precio es válido hasta el [fecha real]. Después aplica la tarifa normal de $[X].',
      'Costo de esperar: Si lo dejamos para más adelante, [consecuencia real]. Tú decides cuándo avanzar.',
    ],
    gemini: 'Escribe 3 mensajes de WhatsApp para mi negocio de [categoría] que expresen urgencia real (cupos, fecha, vigencia) sin presión ni exageración, y revisa esta lista de frases mías para marcar las que podrían ser engañosas: [pega frases].',
    quiz: [
      { q: '¿Cuál es urgencia real?', o: ['"Solo quedan 2" cuando hay 50', 'Agenda con 2 cupos disponibles de verdad', 'Un cronómetro inventado'], c: 1, w: 'La urgencia real es verificable.' },
    ],
  },
  {
    id: 11, min: 9, titulo: 'Seguimiento de propuestas y cotizaciones frías',
    objetivo: 'Recuperar cotizaciones sin respuesta con una cadencia útil y respetuosa.',
    bloques: [
      { p: 'Mucha plata se queda en **cotizaciones enviadas sin respuesta**. Un seguimiento bien hecho recupera una parte importante sin molestar.' },
      { lista: [
        '**A las 24 horas:** "¿Pudiste revisarla? ¿Alguna duda?".',
        '**A los 3 días:** aporta algo (una prueba, una aclaración, una alternativa).',
        '**A los 7 días:** próxima fecha disponible o vigencia que se acerca (si es real).',
        '**A los 15 días:** cierre cordial: "Si cambias de planes, aquí estoy".',
      ] },
      { p: '**Anota cada cotización** con fecha, monto y estado (enviada, en revisión, aceptada, perdida). Con **Neuro Cotizaciones** ya queda registrado y sabes cuáles toca seguir.' },
      { p: 'Revisa cada mes las **perdidas** y su motivo: te dirán si el problema es precio, claridad o tiempo.' },
    ],
    tarea: [
      'Haz una lista de cotizaciones de los últimos 30 días sin respuesta.',
      'Envía el seguimiento que corresponda a cada una.',
      'Anota los motivos de las perdidas.',
    ],
    guion: [
      '24 h: Hola, [nombre]. ¿Pudiste revisar la cotización? Si tienes dudas, con gusto las resolvemos.',
      '3 días: [nombre], te comparto [prueba o aclaración] por si te ayuda a decidir.',
      '7 días: Mi próxima fecha disponible es [fecha]. Si te interesa, te la aparto.',
      '15 días: Gracias por considerarnos, [nombre]. Si cambias de planes, aquí estaremos.',
    ],
    gemini: 'Escribe una cadencia de 4 mensajes de seguimiento (24 horas, 3 días, 7 días y 15 días) para cotizaciones sin respuesta en mi negocio de [categoría], cada uno corto, útil y sin presión.',
    quiz: [
      { q: 'En el seguimiento de los 3 días, lo mejor es…', o: ['Repetir el mismo mensaje', 'Aportar algo nuevo: una prueba o aclaración', 'Bajar el precio sin preguntar'], c: 1, w: 'Cada toque debe sumar valor.' },
    ],
  },
  {
    id: 12, min: 10, titulo: 'Postventa inmediata, métricas y plan de 30 días',
    objetivo: 'Cerrar bien la venta, pedir referidos y medir tu tasa de cierre para mejorar.',
    bloques: [
      { p: 'La venta no termina al cobrar. Un buen cierre incluye **expectativas claras** y el inicio de la relación.' },
      { lista: [
        '**Mismo día:** agradece y confirma los próximos pasos.',
        '**Entrega:** cumple lo prometido; avisa si hay cambios antes de que pregunten.',
        '**Una semana después:** pregunta cómo le fue y si necesita algo.',
        '**Referido:** cuando esté satisfecho, pide: "¿Conoces a alguien que también lo necesite?".',
      ] },
      { p: '**Tus 5 números de closer:** cotizaciones enviadas, ventas cerradas, **tasa de cierre** (ventas ÷ cotizaciones), ticket promedio y días promedio entre cotización y cierre.' },
      { p: '**Plan de 30 días:** semana 1 preparación y diagnóstico; semana 2 cotización y precio; semana 3 objeciones y cierre; semana 4 seguimiento y medición. Mejora **un punto a la vez**.' },
    ],
    tarea: [
      'Calcula tu tasa de cierre y tu ticket promedio de los últimos 30 días.',
      'Elige una sola mejora para la próxima semana.',
      'Pide un referido a un cliente satisfecho.',
    ],
    guion: [
      'Postventa: ¡Gracias por tu compra, [nombre]! Esto sigue: [pasos]. Cualquier cosa, aquí estoy.',
      'A los 7 días: Hola, [nombre]. ¿Cómo te fue con [producto o servicio]? ¿Necesitas algo más?',
      'Referido: Me alegra que te haya servido. ¿Conoces a alguien que también lo necesite? Con gusto lo atiendo igual de bien.',
    ],
    gemini: 'Estos son mis números como closer en los últimos 30 días: cotizaciones [N], ventas [N], ticket promedio $[X], días de cierre [N]. Calcula mi tasa de cierre, dime mi punto más débil y propón un plan de mejora para 30 días con una acción por semana.',
    quiz: [
      { q: '¿Cómo se calcula la tasa de cierre?', o: ['Ventas ÷ cotizaciones', 'Cotizaciones ÷ ventas', 'Ventas × precio'], c: 0, w: 'Es el porcentaje de cotizaciones que terminan en venta.' },
      { q: '¿Cuándo pides un referido?', o: ['Antes de vender', 'Cuando el cliente está satisfecho', 'Nunca'], c: 1, w: 'El momento ideal es después de una buena experiencia.' },
    ],
  },
];
