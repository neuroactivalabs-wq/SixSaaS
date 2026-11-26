// Curso "Clientes que vuelven": postventa, reseñas, recompra y referidos. Contenido propiedad de Neuroactiva Labs.
// Principios: consentimiento (Ley 81 de 2019), reseñas sin incentivos ni filtros, mensajes que aportan.
export const FIDELIZAR = [
  {
    id: 1, min: 7, titulo: 'Vender al cliente que ya tienes cuesta menos',
    objetivo: 'Entender el valor de un cliente en el tiempo y medir tu tasa de recompra.',
    bloques: [
      { p: 'Conseguir un cliente nuevo cuesta tiempo, publicidad y esfuerzo. Que uno existente vuelva **cuesta mucho menos** y suele comprar con más confianza.' },
      { lista: [
        '**Valor de vida del cliente (simple):** cuánto compra al año × cuántos años te compra.',
        '**Tasa de recompra:** de cada 10 clientes, cuántos vuelven en 90 días.',
        '**Efecto:** subir la recompra de 2 a 4 de cada 10 duplica una parte importante de tus ingresos sin gastar en publicidad.',
      ] },
      { p: '**Ejemplo:** si un cliente gasta $15 cada vez y viene 6 veces al año, vale **$90 al año**, no $15. Perder uno por descuido es perder $90, no $15.' },
      { p: 'Este curso completa el embudo: Google te trae clientes, el setter los conversa, el closer los cierra y **aquí hacemos que vuelvan y te recomienden**.' },
    ],
    tarea: [
      'Calcula cuánto gasta al año un cliente promedio tuyo.',
      'Estima de cada 10 clientes cuántos vuelven en 90 días.',
      'Fija una meta realista de mejora para los próximos 3 meses.',
    ],
    guion: [
      'MI PUNTO DE PARTIDA',
      'Gasto promedio por visita: $___',
      'Visitas por año: ___',
      'Valor anual de un cliente: $___',
      'Recompra a 90 días: ___ de cada 10',
      'Meta a 3 meses: ___ de cada 10',
    ],
    gemini: 'Mi negocio de [categoría] vende en promedio $[X] por visita y mis clientes vienen [N] veces al año. Calcula el valor anual de un cliente, cuánto ganaría si subo la recompra un 20 % y dame 5 ideas simples para lograrlo sin descuentos permanentes.',
    quiz: [
      { q: '¿Qué vale más para tu negocio?', o: ['Solo la primera venta', 'Lo que un cliente compra durante todo el tiempo que te elige', 'El número de seguidores'], c: 1, w: 'El valor está en la relación, no en la primera compra.' },
    ],
  },
  {
    id: 2, min: 8, titulo: 'El mapa de la experiencia: antes, durante y después',
    objetivo: 'Identificar los momentos clave en los que el cliente decide volver o no.',
    bloques: [
      { p: 'El cliente decide volver por **cómo se sintió** en todo el camino, no solo por el producto. Dibuja ese camino en tres etapas.' },
      { lista: [
        '**Antes:** cómo te encuentra, cómo le contestas, qué espera.',
        '**Durante:** recibimiento, tiempos de espera, trato, claridad de precio y pago.',
        '**Después:** agradecimiento, seguimiento, ayuda si algo falla, recordatorio cuando toca volver.',
      ] },
      { p: '**Momentos de verdad:** puntos pequeños que marcan mucho: el saludo, el tiempo de espera, cómo manejas un error, cómo te despides. Mejorar 3 de ellos cambia la percepción de todo.' },
      { p: 'La etapa más descuidada casi siempre es **el después**. Ahí está la oportunidad más grande para que el cliente vuelva.' },
    ],
    tarea: [
      'Dibuja las 3 etapas y anota qué hace tu negocio en cada una.',
      'Elige los 3 momentos de verdad más débiles.',
      'Define una mejora pequeña para cada uno.',
    ],
    guion: [
      'ANTES: ___',
      'DURANTE: ___',
      'DESPUÉS: ___',
      'Momentos de verdad débiles: 1) ___ 2) ___ 3) ___',
      'Mejora para cada uno: ___',
    ],
    gemini: 'Ayúdame a mapear la experiencia de un cliente de mi negocio de [categoría] en 3 etapas (antes, durante, después). Hazme preguntas y luego dame 10 mejoras pequeñas y baratas que aumenten las ganas de volver.',
    quiz: [
      { q: '¿Qué etapa se descuida más?', o: ['Antes', 'Durante', 'Después de la venta'], c: 2, w: 'El seguimiento posterior es donde más se pierden oportunidades.' },
    ],
  },
  {
    id: 3, min: 9, titulo: 'Registra lo justo y con permiso',
    objetivo: 'Guardar los datos mínimos del cliente, con su consentimiento y para usos claros.',
    bloques: [
      { p: 'Sin datos no hay seguimiento, pero **más datos no es mejor**: guarda solo lo que usarás.' },
      { lista: [
        '**Mínimo útil:** nombre, WhatsApp, qué compró, cuándo, cada cuánto suele volver y si autorizó que lo contactes.',
        '**Útil si aplica:** cumpleaños (día y mes), preferencias y notas del trato.',
        '**Evita:** datos sensibles que no necesitas (salud, finanzas, ideología) y copiar contactos sin permiso.',
      ] },
      { p: '**Consentimiento:** en Panamá la Ley 81 de 2019 exige consentimiento previo, informado y para finalidades claras. Pregunta con una frase simple y registra la respuesta: "¿Te escribo por WhatsApp cuando toque tu próxima compra o haya algo útil para ti?".' },
      { p: '**Respeta el "no":** si alguien pide no ser contactado, márcalo y no insistas. Facilita también que pueda corregir o pedir que borres sus datos.' },
      { p: '**Neuro Recompras** y **Neuro CRM** guardan estos datos en tu teléfono y marcan quién autorizó.' },
    ],
    tarea: [
      'Define tus 6 campos mínimos.',
      'Prepara tu frase de consentimiento y úsala con los próximos 10 clientes.',
      'Ordena tu lista actual: quién autorizó, quién no y quién no sabes.',
    ],
    guion: [
      'Pedir permiso: ¿Te escribo por WhatsApp cuando toque tu próxima compra o tengamos algo útil para ti? Puedes decirme que no en cualquier momento.',
      'Campos: nombre · WhatsApp · qué compró · fecha · cada cuánto vuelve · autoriza (sí/no)',
    ],
    gemini: 'Ayúdame a diseñar un registro mínimo de clientes para mi negocio de [categoría] en Panamá: qué campos guardar, qué evitar, y una frase breve y amable para pedir consentimiento de contacto por WhatsApp conforme a la Ley 81 de 2019. No des asesoría legal, solo buenas prácticas.',
    quiz: [
      { q: 'Antes de contactar a un cliente por WhatsApp con ofertas o recordatorios, necesitas…', o: ['Nada', 'Su consentimiento claro', 'Comprar una base de datos'], c: 1, w: 'El consentimiento previo es regla y buena práctica.' },
    ],
  },
  {
    id: 4, min: 8, titulo: 'La primera postventa: el mensaje que marca la diferencia',
    objetivo: 'Enviar un mensaje de agradecimiento y cuidado en los primeros días después de la compra.',
    bloques: [
      { p: 'Pocos negocios escriben después de vender. Por eso un buen mensaje de postventa **destaca solo**.' },
      { lista: [
        '**Mismo día:** agradecimiento corto y personal.',
        '**Día 3–7 según producto:** "¿cómo te fue?" + una duda que podrías resolver (uso, cuidado, resultados).',
        '**Si algo falló:** respuesta inmediata y solución; es tu mejor oportunidad de ganar lealtad.',
      ] },
      { p: '**Qué evitar:** mensajes automáticos fríos, pedir otra compra enseguida y enviar el mismo texto a todos sin cambiar nada.' },
      { p: 'Con **Neuro Recompras** la app te dice a quién escribir hoy y deja el mensaje listo con el nombre y el producto; tú lo envías con tu estilo.' },
    ],
    tarea: [
      'Escribe tu mensaje de agradecimiento y tu mensaje de día 7.',
      'Envíalos a los últimos 10 clientes autorizados.',
      'Anota qué respuestas obtuviste y qué dudas aparecieron.',
    ],
    guion: [
      'Día 0: ¡Gracias por tu compra, [nombre]! Cualquier cosa que necesites, escríbeme directo.',
      'Día 7: Hola, [nombre]. ¿Cómo te fue con [producto/servicio]? Si tienes alguna duda, te ayudo.',
    ],
    gemini: 'Redacta 2 mensajes de postventa por WhatsApp para mi negocio de [categoría]: uno de agradecimiento el mismo día y otro a los 7 días preguntando cómo le fue. Cortos, cálidos, sin intentar vender nada y con espacio para que el cliente responda.',
    quiz: [
      { q: 'En el primer mensaje de postventa conviene…', o: ['Ofrecer otra compra', 'Agradecer y dejar un canal abierto', 'No escribir'], c: 1, w: 'Primero relación, después venta.' },
    ],
  },
  {
    id: 5, min: 10, titulo: 'Pedir reseñas bien (y permitido)',
    objetivo: 'Tener un sistema fijo para recibir reseñas reales sin romper las reglas de Google.',
    bloques: [
      { p: 'Las reseñas son prueba social: nuevos clientes confían en lo que dicen otros. Y la IA de Maps también las lee para responder preguntas sobre tu negocio.' },
      { lista: [
        '**Sin incentivos:** no ofrezcas descuentos, regalos ni sorteos por reseñar.',
        '**Sin filtros:** pide a todos por igual; no envíes a los insatisfechos a un canal privado en lugar de Google.',
        '**Sin reseñas falsas ni propias:** ni de familiares sin experiencia real.',
      ] },
      { p: '**El sistema:** enlace corto de reseña en tu perfil, mensaje igual para todos, QR en el mostrador y un momento fijo para pedirla (al entregar, al cobrar o al terminar el servicio).' },
      { p: '**Pide que cuenten su experiencia** ("¿qué fue lo que más te sirvió?") sin dictarles qué escribir. Las reseñas con detalle ayudan más.' },
      { p: 'Con **Neuro Reseñas** guardas las opiniones recibidas, con permiso para mostrarlas, y el enlace de Google visible para todos.' },
    ],
    tarea: [
      'Copia tu enlace de reseñas y crea tu QR.',
      'Guarda tu mensaje de petición como respuesta rápida.',
      'Fija una meta semanal de reseñas (por ejemplo, 3) y pídela a todos los clientes atendidos.',
    ],
    guion: [
      'Gracias por elegirnos, [nombre]. Tu opinión, sea cual sea, nos ayuda a mejorar y a que otros nos conozcan. Aquí puedes contarnos tu experiencia: [enlace de Google]',
    ],
    gemini: 'Redacta un mensaje de WhatsApp para pedir una reseña en Google a los clientes de mi negocio de [categoría], igual para todos, sin incentivos ni filtros, que invite a contar su experiencia con sus palabras. Dame 3 versiones y un texto corto para el letrero con el QR.',
    quiz: [
      { q: '¿Qué está prohibido al pedir reseñas?', o: ['Dar un enlace directo', 'Ofrecer un regalo a cambio o pedir solo a los contentos', 'Agradecer'], c: 1, w: 'No incentivos ni filtros: se pide a todos por igual.' },
      { q: '¿Qué reseñas ayudan más?', o: ['Las que cuentan detalles reales de la experiencia', 'Las de una palabra', 'Las que escribes tú'], c: 0, w: 'El detalle real aporta confianza y alimenta mejores respuestas.' },
    ],
  },
  {
    id: 6, min: 10, titulo: 'Convertir quejas en lealtad',
    objetivo: 'Responder a un reclamo con un protocolo de 5 pasos que recupere al cliente.',
    bloques: [
      { p: 'Un cliente que se queja **todavía te da una oportunidad**. El que se va callado no. Bien atendido, un reclamo puede convertirse en un cliente más leal que antes.' },
      { lista: [
        '**1. Escucha completo** sin interrumpir ni defenderte.',
        '**2. Reconoce:** "Entiendo lo que pasó y lamento la molestia".',
        '**3. Pregunta** lo necesario para entender el caso.',
        '**4. Soluciona o propone:** reparar, reponer, devolver o compensar con criterio.',
        '**5. Cierra y verifica:** confirma que quedó resuelto y agradece el aviso.',
      ] },
      { p: '**Si el reclamo es una reseña pública:** responde con calma, agradece, pide disculpas si corresponde, ofrece resolverlo por privado y **no discutas ni expongas datos del cliente**.' },
      { p: '**Registra cada queja y su causa:** si se repite, no es mala suerte: es un proceso que arreglar.' },
    ],
    tarea: [
      'Escribe tu protocolo de 5 pasos con tus palabras.',
      'Define qué puedes ofrecer (reponer, devolver, descuento) y hasta qué monto sin consultar.',
      'Revisa las quejas del último mes y busca el patrón.',
    ],
    guion: [
      'Respuesta inicial: Hola, [nombre]. Gracias por avisarnos y lamento lo ocurrido. Cuéntame qué pasó para resolverlo hoy mismo.',
      'Solución: Entiendo. Para solucionarlo puedo [opción 1] o [opción 2]. ¿Cuál te sirve más?',
      'Cierre: Gracias por darnos la oportunidad de corregirlo. ¿Quedó todo resuelto?',
    ],
    gemini: 'Ayúdame a crear un protocolo de 5 pasos para atender reclamos en mi negocio de [categoría], con mensajes de WhatsApp para cada paso y un ejemplo de respuesta pública a una reseña negativa, con calma, sin discutir y sin revelar datos del cliente.',
    quiz: [
      { q: 'Reseña negativa pública. Lo mejor es…', o: ['Discutir con el cliente', 'Responder con calma y ofrecer resolverlo por privado', 'Borrarla a la fuerza'], c: 1, w: 'Muestras profesionalismo a quien lee y buscas resolver.' },
    ],
  },
  {
    id: 7, min: 9, titulo: 'El ciclo de recompra: cuándo toca volver',
    objetivo: 'Calcular cada cuánto vuelve un cliente para escribirle justo a tiempo.',
    bloques: [
      { p: 'Cada producto o servicio tiene un **ciclo natural**: un medicamento crónico se repone cada 30 días, un corte de cabello cada 3–4 semanas, un servicio de limpieza cada 6 meses.' },
      { lista: [
        '**Averigua el ciclo:** pregunta al cliente o míralo en su historial.',
        '**Calcula la fecha:** fecha de compra + ciclo = fecha de contacto.',
        '**Escribe unos días antes:** el recordatorio ayuda cuando todavía no se le acaba.',
      ] },
      { p: '**Mensaje útil, no insistente:** "Según tu última compra, tu [producto] debería ir terminando. ¿Te lo preparo?". Menciona un dato real; no inventes necesidad.' },
      { p: 'Si el cliente tiene un ciclo irregular, usa el **promedio** de sus últimas compras.' },
      { p: '**Neuro Recompras** calcula esta fecha y te muestra a quién escribir hoy, quién toca en 7 días y quién está esperando respuesta.' },
    ],
    tarea: [
      'Define el ciclo de tus 5 productos o servicios principales.',
      'Calcula la próxima fecha de contacto de tus 10 mejores clientes.',
      'Redacta tu mensaje de recompra.',
    ],
    guion: [
      'Hola, [nombre]. Según tu última compra de [producto] el [fecha], ya debería estar por terminarse. ¿Te lo dejo preparado?',
      'Fórmula: fecha de última compra + ciclo en días = fecha de contacto',
    ],
    gemini: 'En mi negocio de [categoría] estos son los ciclos aproximados de recompra de mis productos: [lista]. Ayúdame a calcular la fecha de contacto y redacta un mensaje de WhatsApp corto y útil de recordatorio de recompra, sin presionar.',
    quiz: [
      { q: '¿Cómo calculas cuándo contactar a un cliente?', o: ['Al azar', 'Fecha de última compra más el ciclo del producto', 'Cada día'], c: 1, w: 'El ciclo define el mejor momento para recordar.' },
    ],
  },
  {
    id: 8, min: 9, titulo: 'Segmenta: VIP, fieles, nuevos, en riesgo y dormidos',
    objetivo: 'Agrupar a tus clientes para darle a cada uno el mensaje y el trato que necesita.',
    bloques: [
      { p: 'No todos tus clientes necesitan lo mismo. Con 5 grupos sencillos, cada mensaje se vuelve más relevante.' },
      { lista: [
        '**VIP:** compran más y más seguido. Trato especial, primicias y agradecimiento sincero.',
        '**Fieles:** vuelven con regularidad. Reconocimiento y recordatorios útiles.',
        '**Nuevos:** compraron hace poco. Postventa y bienvenida para que haya una segunda compra.',
        '**En riesgo:** su frecuencia bajó. Pregunta cómo les ha ido, ofrece ayuda.',
        '**Dormidos:** llevan mucho sin comprar. Mensaje de reactivación honesto.',
      ] },
      { p: '**Cómo clasificar:** usa dos datos: cuántas veces compró y hace cuánto fue la última compra.' },
      { p: '**Qué mensaje a quién:** a los VIP no les envíes lo mismo que a los dormidos. Personalizar con su nombre, su producto y su historia demuestra atención real.' },
    ],
    tarea: [
      'Clasifica a tus 30 clientes más recientes en los 5 grupos.',
      'Escribe un mensaje distinto para cada grupo.',
      'Identifica a tus 5 VIP y piensa cómo agradecerles.',
    ],
    guion: [
      'VIP: [nombre], gracias por ser parte de lo que somos. Antes de anunciarlo, quería avisarte primero de [novedad].',
      'En riesgo: Hola, [nombre]. Hace tiempo que no te vemos y quería saber cómo estás y si necesitas algo.',
      'Nuevo: ¡Bienvenido, [nombre]! Fue un gusto atenderte. Si necesitas algo, escríbeme directo.',
    ],
    gemini: 'Tengo estos clientes de mi negocio de [categoría]: [pega lista simple con veces que compró y fecha de última compra]. Clasifícalos en VIP, fieles, nuevos, en riesgo y dormidos con criterios claros y redacta un mensaje de WhatsApp para cada grupo.',
    quiz: [
      { q: 'Un cliente que compraba cada mes y lleva 4 sin venir está…', o: ['VIP', 'En riesgo o dormido', 'Nuevo'], c: 1, w: 'Su frecuencia cayó: requiere atención.' },
    ],
  },
  {
    id: 9, min: 9, titulo: 'Reactivar clientes dormidos sin ser pesado',
    objetivo: 'Recuperar clientes inactivos con un mensaje honesto y saber cuándo dejar de insistir.',
    bloques: [
      { p: 'Los dormidos son **dinero que ya conoce tu negocio**. Un buen mensaje de reactivación recupera a una parte sin gastar en publicidad.' },
      { lista: [
        '**Empieza con interés genuino,** no con una oferta: "¿Cómo estás? Hace tiempo que no te vemos".',
        '**Aporta algo nuevo:** una mejora, un producto nuevo o un recordatorio útil.',
        '**Una invitación sencilla:** "Si quieres, te aparto un espacio esta semana".',
        '**Oferta honesta (opcional):** un beneficio real con fecha, no un descuento permanente que enseñe a esperar.',
      ] },
      { p: '**Cadencia:** un mensaje y, si no hay respuesta, un segundo a las 2 semanas. Después, **descansa** a esa persona unos meses.' },
      { p: '**Si responde que no volverá,** pregunta con respeto el motivo (es oro para mejorar) y agradece. Respeta siempre el pedido de no ser contactado.' },
    ],
    tarea: [
      'Lista los clientes dormidos autorizados (más de 90 días sin comprar).',
      'Envía tu mensaje de reactivación a 10 de ellos.',
      'Registra respuestas, motivos y cuántos regresaron.',
    ],
    guion: [
      'Hola, [nombre]. ¿Cómo estás? Hace un tiempo que no te vemos por [negocio] y quería saludarte.',
      'Tenemos [novedad útil]. Si quieres, te aparto un espacio esta semana. Y si no es el momento, sin problema.',
    ],
    gemini: 'Redacta 2 mensajes de reactivación por WhatsApp para clientes que llevan más de 90 días sin comprar en mi negocio de [categoría]: uno solo con interés genuino y otro con una novedad útil. Máximo 4 líneas, tono cálido, sin presión.',
    quiz: [
      { q: 'Un buen mensaje de reactivación empieza con…', o: ['Un descuento enorme', 'Interés genuino por el cliente', 'Una crítica por no volver'], c: 1, w: 'La relación primero, la oferta después.' },
    ],
  },
  {
    id: 10, min: 9, titulo: 'Un programa de fidelidad simple que no te cuesta margen',
    objetivo: 'Diseñar un programa de sellos o beneficios sencillo, rentable y fácil de explicar.',
    bloques: [
      { p: 'Un programa de fidelidad no necesita tecnología compleja. Necesita **reglas claras, una recompensa deseable y un costo que tu margen soporte**.' },
      { lista: [
        '**Sellos:** cada compra suma un sello; al completar N, hay un beneficio (servicio extra, producto de cortesía).',
        '**Niveles:** reconocimiento a quienes más compran (VIP) con ventajas como prioridad en agenda.',
        '**Beneficios sin costo alto:** primicias, atención preferente, regalo de cumpleaños, ajustes gratis.',
      ] },
      { p: '**Haz las cuentas:** calcula cuánto te cuesta la recompensa y cuántas compras extra necesitas para que se pague sola.' },
      { p: '**Que sea fácil:** si tarda más de 10 segundos explicarlo, es demasiado complicado. Escríbelo en una tarjeta o letrero.' },
      { p: 'Con **Neuro Recompras** llevas los sellos de cada cliente en el teléfono y sabes quién está cerca de su beneficio.' },
    ],
    tarea: [
      'Define la regla de tu programa en una frase.',
      'Calcula el costo de la recompensa y cuántas compras extra la pagan.',
      'Prepara el texto del letrero o tarjeta.',
    ],
    guion: [
      'Regla: Cada [compra/visita] suma 1 sello. Con [N] sellos, [recompensa].',
      'Costo: recompensa $[X] ÷ margen por compra $[Y] = [Z] compras para pagarla.',
      'Letrero: ¡Acumula sellos y gana [recompensa]! Pregunta cómo en caja.',
    ],
    gemini: 'Diseña un programa de fidelidad por sellos para mi negocio de [categoría] con margen aproximado de [X] % y ticket promedio de $[Y]. Define cuántos sellos, qué recompensa, cuánto me costaría y cuántas compras extra necesito para que sea rentable. Incluye el texto del letrero.',
    quiz: [
      { q: 'Antes de lanzar tu programa de fidelidad debes…', o: ['Regalar lo que sea', 'Calcular el costo de la recompensa frente a tu margen', 'Esperar un año'], c: 1, w: 'Una recompensa que te cuesta más de lo que genera no es sostenible.' },
    ],
  },
  {
    id: 11, min: 9, titulo: 'Referidos: la forma más barata de crecer',
    objetivo: 'Pedir y agradecer recomendaciones de manera natural y sistemática.',
    bloques: [
      { p: 'Las recomendaciones de alguien de confianza son la venta más fácil: el nuevo cliente ya **llega convencido**.' },
      { lista: [
        '**Cuándo pedir:** justo después de un buen resultado o de un elogio, nunca antes.',
        '**Cómo pedir:** simple y específico: "¿Conoces a alguien que también necesite [servicio]? Con gusto lo atiendo igual de bien".',
        '**Facilítalo:** una tarjeta o un mensaje que el cliente pueda reenviar.',
        '**Agradece siempre,** aunque el referido no compre.',
      ] },
      { p: '**Incentivos en referidos:** a diferencia de las reseñas, puedes agradecer a quien te recomienda con un beneficio (un descuento, un servicio extra), siempre claro y honesto. **Nunca** lo hagas a cambio de reseñas en Google.' },
      { p: '**Registra de dónde viene cada cliente nuevo** para reconocer a quien te recomienda y saber qué canal funciona mejor.' },
    ],
    tarea: [
      'Elige a tus 10 clientes más satisfechos.',
      'Pídeles un referido con tu frase específica.',
      'Prepara la tarjeta o mensaje reenviable y el agradecimiento.',
    ],
    guion: [
      'Pedir: Me alegra que te haya gustado, [nombre]. ¿Conoces a alguien que también necesite [servicio]? Con gusto lo atiendo igual de bien.',
      'Reenviable: Hola, [amigo/a], te recomiendo a [negocio]. Escríbeles al [WhatsApp] y di que vas de parte de [nombre].',
      'Agradecer: ¡Gracias por recomendarnos, [nombre]! Como agradecimiento, [beneficio].',
    ],
    gemini: 'Diseña un sistema simple de referidos para mi negocio de [categoría]: la frase para pedirlo, el mensaje que el cliente puede reenviar, el agradecimiento y un beneficio razonable para quien recomienda. Recuérdame separar esto de las reseñas de Google.',
    quiz: [
      { q: '¿Puedes dar un beneficio por un referido?', o: ['Sí, de forma clara y honesta; pero no a cambio de reseñas en Google', 'Nunca', 'Sí, incluso a cambio de reseñas falsas'], c: 0, w: 'Los incentivos en referidos son válidos; los de reseñas están prohibidos.' },
    ],
  },
  {
    id: 12, min: 10, titulo: 'Tu tablero mensual y plan de 90 días',
    objetivo: 'Medir 6 números de retención y armar una rutina semanal de 30 minutos.',
    bloques: [
      { p: 'Lo que no se mide no mejora. Revisa **6 números** una vez al mes:' },
      { lista: [
        '**Clientes nuevos** del mes.',
        '**Clientes que repitieron** (compraron 2 o más veces).',
        '**Tasa de recompra a 90 días.**',
        '**Clientes dormidos reactivados.**',
        '**Reseñas nuevas** y nota promedio.',
        '**Referidos recibidos.**',
      ] },
      { p: '**Rutina semanal de 30 minutos:** (1) revisar a quién toca escribir; (2) enviar postventas y recordatorios; (3) responder reseñas; (4) agradecer a un VIP; (5) anotar los números.' },
      { p: '**Plan de 90 días:** mes 1 datos, consentimiento y postventa; mes 2 reseñas, ciclo de recompra y segmentos; mes 3 reactivación, fidelidad y referidos. Compara tu punto de partida de la lección 1 con tus números del día 90.' },
    ],
    tarea: [
      'Crea tu hoja con los 6 números y registra los del último mes.',
      'Agenda tu rutina semanal de 30 minutos en el calendario.',
      'Compara con la meta de la lección 1 al cumplirse los 90 días.',
    ],
    guion: [
      'TABLERO MENSUAL',
      'Nuevos: ___ · Repitieron: ___ · Recompra 90 d: ___ %',
      'Dormidos reactivados: ___ · Reseñas nuevas: ___ (nota ___) · Referidos: ___',
      'Rutina semanal (30 min): a quién toca · postventas · reseñas · agradecer a un VIP · anotar números',
    ],
    gemini: 'Estos son mis números del mes: [pega tablero]. Dime en qué punto fallo más, qué hacer primero y arma una rutina semanal de 30 minutos y un plan de 90 días para mejorar la retención de mi negocio de [categoría].',
    quiz: [
      { q: '¿Cada cuánto revisas tu tablero de retención?', o: ['Una vez al año', 'Cada mes, con una rutina semanal de 30 minutos', 'Nunca'], c: 1, w: 'La constancia pequeña pesa más que los esfuerzos aislados.' },
      { q: 'Tu punto de partida y tu día 90 se comparan para…', o: ['Ver tu avance real', 'Cambiar tu logo', 'Cerrar el negocio'], c: 0, w: 'Medir antes y después muestra qué funcionó.' },
    ],
  },
];
