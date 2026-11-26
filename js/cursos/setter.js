// Curso "Setter": conversaciones que agendan. Contenido propiedad de Neuroactiva Labs.
// Principios: consentimiento previo (Ley 81 de 2019), mensajes honestos, sin spam ni presión.
export const SETTER = [
  {
    id: 1, min: 7, titulo: 'Qué hace un setter y por qué tu negocio lo necesita',
    objetivo: 'Entender el rol del setter: abrir conversaciones, calificar y dejar la cita o visita agendada.',
    bloques: [
      { p: 'Un **setter** es quien conversa primero con el interesado: responde, pregunta lo justo y agenda el siguiente paso (visita, llamada, demostración o cotización). No cierra la venta: **prepara el terreno** para que el cierre sea fácil.' },
      { p: 'En un negocio pequeño, el setter eres tú, tu empleado o tu equipo de mostrador. Lo importante es que **alguien tenga ese trabajo todos los días**.' },
      { lista: [
        '**Sin setter:** los mensajes se responden tarde, el cliente se enfría y la venta se va con quien contestó primero.',
        '**Con setter:** cada mensaje recibe respuesta rápida, una pregunta útil y un siguiente paso claro.',
        '**Embudo simple:** conversación → interesado calificado → cita o cotización → cierre → postventa.',
      ] },
      { p: '**Meta del setter:** no es "vender por chat". Es lograr que la persona correcta llegue a la siguiente etapa con la información completa.' },
    ],
    tarea: [
      'Escribe quién responde hoy los mensajes de tu negocio y en cuánto tiempo.',
      'Cuenta cuántas conversaciones nuevas tuviste la semana pasada y cuántas terminaron en cita o cotización.',
      'Anota esos dos números: son tu punto de partida.',
    ],
    guion: [
      'Mi punto de partida:',
      'Conversaciones nuevas por semana: ___',
      'Terminaron en cita/cotización: ___',
      'Tiempo promedio de primera respuesta: ___',
      'Responsable: ___',
    ],
    gemini: 'Tengo un negocio de [categoría] en [ciudad]. Hoy respondo mensajes de WhatsApp sin un proceso. Explícame en palabras simples qué hace un setter y diseña un proceso de 4 pasos que yo pueda aplicar en 15 minutos al día.',
    quiz: [
      { q: '¿Cuál es el trabajo principal del setter?', o: ['Cerrar la venta a cualquier costo', 'Abrir la conversación, calificar y agendar el siguiente paso', 'Enviar mensajes masivos'], c: 1, w: 'El setter prepara el cierre: conversa, califica y agenda.' },
      { q: '¿Qué pasa si respondes tarde?', o: ['Nada, el cliente espera', 'El cliente se enfría y suele irse con quien respondió primero', 'El cliente valora más tu marca'], c: 1, w: 'La rapidez de respuesta es la ventaja más barata que existe.' },
    ],
  },
  {
    id: 2, min: 8, titulo: 'Tu cliente ideal en una hoja',
    objetivo: 'Definir para quién trabajas, qué problema resuelves y a quién no conviene atender.',
    bloques: [
      { p: 'Si le hablas a todos, no le hablas a nadie. Una hoja con tu **cliente ideal** te dice qué preguntar, qué ofrecer y a quién no perseguir.' },
      { lista: [
        '**Quién es:** edad aproximada, zona, tipo de negocio o situación.',
        '**Qué problema tiene:** lo que lo hace escribirte (dolor) y lo que quiere lograr (deseo).',
        '**Cuándo compra:** urgencia, temporada, evento.',
        '**Qué lo frena:** precio, desconfianza, tiempo, no saber si le sirve.',
        '**A quién no atiendes:** zonas que no cubres, pedidos que no haces, clientes que no encajan.',
      ] },
      { p: '**Ejemplo (barbería):** hombres de 18–45, vive o trabaja en un radio de 3 km, quiere verse bien para el trabajo o un evento, le frena no tener tiempo. No atiendes: servicios a domicilio.' },
      { p: 'Tu cliente ideal no es una fantasía: míralo en tus **mejores 10 clientes reales**. ¿Qué tienen en común?' },
    ],
    tarea: [
      'Escribe los 10 mejores clientes que has tenido y qué tienen en común.',
      'Completa la hoja de cliente ideal con los 5 puntos.',
      'Define a quién NO vas a perseguir.',
    ],
    guion: [
      'Mi cliente ideal:',
      'Es: ___',
      'Su problema: ___',
      'Su deseo: ___',
      'Compra cuando: ___',
      'Lo frena: ___',
      'No atiendo: ___',
    ],
    gemini: 'Ayúdame a definir mi cliente ideal. Mi negocio: [categoría y ciudad]. Mis 5 mejores clientes: [describe]. Hazme preguntas una por una y al final entrégame una hoja de una página con perfil, problema, deseo, frenos y a quién no atender.',
    quiz: [
      { q: '¿Dónde encuentras la mejor pista de tu cliente ideal?', o: ['En una encuesta inventada', 'En tus 10 mejores clientes reales', 'En lo que hace tu competencia'], c: 1, w: 'Tus clientes reales te muestran el patrón que sí compra.' },
    ],
  },
  {
    id: 3, min: 9, titulo: 'El primer mensaje que sí se responde',
    objetivo: 'Escribir aperturas cortas, personales y con una pregunta fácil de contestar.',
    bloques: [
      { p: 'El primer mensaje decide si hay conversación. Los que funcionan son **cortos, humanos y terminan con una pregunta simple**.' },
      { lista: [
        '**1. Saludo con nombre:** "Hola, Ana".',
        '**2. Motivo claro:** por qué le escribes o a qué responde ("vi que preguntaste por…").',
        '**3. Valor en una línea:** qué puedes hacer por ella.',
        '**4. Una pregunta fácil:** que se conteste en una palabra o una frase.',
      ] },
      { p: '**Evita:** textos largos, audios de 2 minutos de entrada, "estimado cliente", emojis en exceso y pedir la venta en el primer mensaje.' },
      { p: '**Regla de permiso:** solo escribe primero a personas que te dieron su número para ese fin o que ya son tus clientes. Con datos personales se aplica la Ley 81 de 2019: consentimiento claro y respeto si piden que pares.' },
    ],
    tarea: [
      'Escribe 3 aperturas con la plantilla para tus 3 situaciones más comunes.',
      'Guárdalas como respuestas rápidas en WhatsApp Business.',
      'Pruébalas una semana y anota cuáles reciben respuesta.',
    ],
    guion: [
      'Hola, [nombre]. Soy [tu nombre] de [negocio].',
      'Vi que preguntaste por [producto o servicio].',
      'Puedo ayudarte con [beneficio concreto en una línea].',
      '¿Lo necesitas para [fecha o uso] o es para más adelante?',
    ],
    gemini: 'Escribe 5 versiones de un primer mensaje de WhatsApp para mi negocio de [categoría]. Situación: [alguien preguntó por X]. Deben ser de 3–4 líneas, con tono cercano y terminar con una pregunta fácil de responder. Sin presión ni exageraciones.',
    quiz: [
      { q: '¿Cómo debe terminar el primer mensaje?', o: ['Con una oferta de descuento', 'Con una pregunta fácil de responder', 'Con tres enlaces'], c: 1, w: 'Una pregunta simple invita a contestar.' },
      { q: '¿A quién puedes escribir primero?', o: ['A cualquier número que encuentres', 'A quien te dio su contacto para eso o ya es tu cliente', 'A todos los grupos de WhatsApp'], c: 1, w: 'El consentimiento previo es regla de la Ley 81 y buena práctica.' },
    ],
  },
  {
    id: 4, min: 8, titulo: 'Seguimiento sin ser pesado',
    objetivo: 'Dar seguimiento con una cadencia respetuosa que recupere conversaciones sin molestar.',
    bloques: [
      { p: 'La mayoría de las ventas no se pierden por un "no", sino por un **silencio sin seguimiento**. La gente se distrae, no se negó.' },
      { lista: [
        '**Toque 1 (24 horas):** recordatorio amable con una pregunta nueva.',
        '**Toque 2 (3 días):** aporta algo útil (una foto, una duda aclarada, una fecha disponible).',
        '**Toque 3 (7 días):** cierre cordial: "Si ya no lo necesitas, no hay problema; aquí estaré".',
      ] },
      { p: '**Después del tercer toque, para.** Insistir más vuelve molesta la marca y puede violar el pedido de la persona de no ser contactada.' },
      { p: 'Cada toque **suma algo**; nunca repite "¿viste mi mensaje?". Y si la persona pide que no le escribas más, lo registras y lo respetas.' },
    ],
    tarea: [
      'Escribe tus 3 toques de seguimiento para tu servicio principal.',
      'Revisa tus conversaciones sin respuesta de los últimos 7 días y envía el toque que corresponda.',
      'Marca como "no contactar" a quien lo haya pedido.',
    ],
    guion: [
      'Toque 1: Hola, [nombre]. ¿Pudiste ver lo que te envié? Si quieres, te aparto [fecha/hora].',
      'Toque 2: [nombre], te dejo [foto/dato útil]. Aún tengo disponible [opción].',
      'Toque 3: Último mensaje por ahora, [nombre]. Si más adelante lo necesitas, aquí estaré. ¡Gracias por escribirnos!',
    ],
    gemini: 'Diseña una cadencia de 3 mensajes de seguimiento por WhatsApp para mi negocio de [categoría] cuando un interesado deja de responder. Cada mensaje debe aportar algo nuevo, ser corto y respetuoso, y el tercero debe cerrar con cordialidad.',
    quiz: [
      { q: '¿Cuántos toques de seguimiento conviene dar?', o: ['Todos los días hasta que responda', 'Tres, con valor en cada uno', 'Ninguno'], c: 1, w: 'Tres toques respetuosos recuperan conversaciones sin molestar.' },
    ],
  },
  {
    id: 5, min: 9, titulo: 'Preguntas de calificación: ¿es el cliente correcto?',
    objetivo: 'Calificar rápido con 4 preguntas para dedicar tiempo a quien sí puede y quiere comprar.',
    bloques: [
      { p: 'Calificar no es interrogar: es **ayudar a la persona a decidir** y ahorrarte tiempo. Con 4 temas basta.' },
      { lista: [
        '**Necesidad:** ¿qué quiere lograr? ("¿Para qué lo necesitas?")',
        '**Urgencia:** ¿para cuándo? ("¿Lo necesitas esta semana o es para más adelante?")',
        '**Presupuesto:** ¿qué rango maneja? ("¿Tienes un presupuesto aproximado?")',
        '**Decisión:** ¿quién decide? ("¿Lo decides tú o lo consultas con alguien?")',
      ] },
      { p: '**Una pregunta por mensaje.** Cinco preguntas juntas parecen un formulario y nadie las contesta.' },
      { p: '**Clasifica:** caliente (necesita ya y puede pagar), tibio (le interesa, falta algo) y frío (curioso o sin presupuesto). Cada uno tiene su siguiente paso: cita ahora, seguimiento educativo o agradecimiento amable.' },
    ],
    tarea: [
      'Redacta tus 4 preguntas con tus palabras y tu rubro.',
      'Define qué respuesta convierte a alguien en caliente, tibio o frío.',
      'Califica a 5 conversaciones recientes con tu nuevo método.',
    ],
    guion: [
      '1) ¿Para qué lo necesitas? [necesidad]',
      '2) ¿Para cuándo lo ocupas? [urgencia]',
      '3) ¿Qué rango de inversión tienes en mente? [presupuesto]',
      '4) ¿Lo decides tú o lo ve alguien más? [decisión]',
      'Caliente = necesita ya + puede pagar. Tibio = interés con dudas. Frío = curioso.',
    ],
    gemini: 'Para mi negocio de [categoría], redacta 4 preguntas de calificación por WhatsApp (necesidad, urgencia, presupuesto y decisión), cada una amable y de una sola línea. Después define criterios para clasificar a un interesado como caliente, tibio o frío.',
    quiz: [
      { q: '¿Cuántas preguntas haces por mensaje?', o: ['Todas juntas', 'Una por mensaje', 'Ninguna'], c: 1, w: 'Una pregunta por mensaje se contesta; cinco no.' },
      { q: 'Un interesado tibio necesita…', o: ['Que lo ignores', 'Seguimiento con información útil', 'Un descuento inmediato'], c: 1, w: 'Si falta algo, ayúdalo con información y vuelve a avanzar.' },
    ],
  },
  {
    id: 6, min: 9, titulo: 'Leads que llegan solos: responde rápido y bien',
    objetivo: 'Atender mensajes entrantes en minutos, con respuestas guardadas y sin perder la calidez.',
    bloques: [
      { p: 'Quien te escribe primero ya mostró interés: es la oportunidad más barata que vas a tener. La regla es **responder en menos de 5 minutos en horario de atención**.' },
      { lista: [
        '**Mensaje de bienvenida automático** de WhatsApp Business para fuera de horario, con cuándo responderás.',
        '**Respuestas rápidas** para las 8 preguntas más comunes (precio, horario, ubicación, formas de pago…).',
        '**Etiquetas** para ordenar: nuevo, en conversación, cotizado, cliente.',
      ] },
      { p: '**La pregunta de precio.** Casi siempre es la primera. No esquives ni sueltes el número en frío: **da un rango y pregunta lo que necesitas para precisar**. Así respondes con honestidad y avanzas.' },
      { p: '**Ejemplo:** "Los cortes van desde $6 según el servicio. Para decirte el precio exacto, ¿buscas corte, barba o ambos?"' },
    ],
    tarea: [
      'Configura el mensaje de bienvenida y de ausencia en WhatsApp Business.',
      'Crea 8 respuestas rápidas con sus atajos.',
      'Mide durante 3 días cuánto tardas en responder.',
    ],
    guion: [
      'Bienvenida: Hola, gracias por escribir a [negocio]. Atendemos de [horario]. Cuéntame, ¿en qué te ayudamos?',
      'Precio: Los [servicio] van desde $[X]. Para darte el precio exacto, ¿[pregunta clave]?',
      'Ubicación: Estamos en [dirección]. Aquí el mapa: [enlace]. ¿Te aparto [hora]?',
    ],
    gemini: 'Crea 8 respuestas rápidas de WhatsApp Business para mi negocio de [categoría]: bienvenida, ausencia, precio (con rango y pregunta de precisión), horario, ubicación, formas de pago, entrega y agradecimiento. Cálidas y de máximo 3 líneas.',
    quiz: [
      { q: 'Preguntan "¿cuánto cuesta?". ¿Qué haces?', o: ['No contestas hasta que lo pidan dos veces', 'Das un rango y haces una pregunta para precisar', 'Pides que llamen'], c: 1, w: 'Un rango honesto más una pregunta mantiene la conversación viva.' },
    ],
  },
  {
    id: 7, min: 9, titulo: 'Prospección que no es spam',
    objetivo: 'Generar conversaciones nuevas con clientes dormidos, referidos y comunidades, siempre con permiso.',
    bloques: [
      { p: 'Prospectar no es enviar mil mensajes. Es **encontrar a las personas que más probablemente te necesitan** y hablarles con permiso y relevancia.' },
      { lista: [
        '**Clientes dormidos:** quienes ya te compraron y no vuelven. Es la lista más rentable y la más permitida.',
        '**Referidos:** pídeselos a tus mejores clientes ("¿conoces a alguien que lo necesite?").',
        '**Comunidades y grupos:** participa aportando valor; no pegues ofertas en cada grupo.',
        '**Interesados de ferias, eventos o formularios** que dejaron su dato para que los contactes.',
      ] },
      { p: '**Qué NO hacer:** comprar listas, escribir a números sin relación contigo, enviar el mismo texto a cientos de personas o agregar gente a grupos sin permiso. Además de molestar, arriesgas el bloqueo de tu número y problemas legales por tratamiento de datos.' },
      { p: '**Regla de oro:** si la persona no esperaría tu mensaje, no lo envíes. Si lo envías, que sea útil y fácil de rechazar ("si no te interesa, dímelo y no te escribo más").' },
    ],
    tarea: [
      'Haz una lista de 20 clientes dormidos de los últimos 6 meses.',
      'Escribe un mensaje personalizado para 5 de ellos y envíalos esta semana.',
      'Pide un referido a tus 3 mejores clientes.',
    ],
    guion: [
      'Hola, [nombre]. Hace un tiempo nos visitaste por [servicio] y quería saber cómo te fue.',
      'Tenemos [novedad útil]. Si te interesa, te cuento; si no, sin problema.',
      '¿Quieres que te dé más información?',
    ],
    gemini: 'Ayúdame a crear un plan de prospección ética para mi negocio de [categoría] en [ciudad]: 4 fuentes de contactos con permiso, un mensaje corto para cada una y cuántos mensajes por día debería enviar para no saturar. Incluye cómo registrar a quien pida no ser contactado.',
    quiz: [
      { q: '¿Cuál es la lista de prospección más rentable y permitida?', o: ['Una lista comprada', 'Tus clientes dormidos', 'Todos los números de un grupo'], c: 1, w: 'Ya te conocen y ya compraron; hay relación y permiso.' },
    ],
  },
  {
    id: 8, min: 9, titulo: 'Instagram y redes: del comentario a la conversación',
    objetivo: 'Convertir comentarios, mensajes y respuestas a historias en conversaciones de venta.',
    bloques: [
      { p: 'En redes la gente rara vez compra en la primera interacción: **comenta, reacciona o pregunta**. El setter convierte esa señal en una conversación privada.' },
      { lista: [
        '**Comentario público → respuesta pública corta** (con nombre) **+ invitación a mensaje**: "Hola Ana, te cuento por mensaje con gusto".',
        '**Respuesta a historia:** agradece, responde y haz una pregunta sobre su interés.',
        '**Mensaje directo nuevo:** misma estructura de apertura de la lección 3.',
      ] },
      { p: '**Pasa a WhatsApp con permiso:** "¿Prefieres que sigamos por WhatsApp? Es más cómodo para enviarte fotos y fechas." No obligues; ofrece.' },
      { p: '**Qué publicar para generar conversaciones:** preguntas a tu audiencia, antes y después, dudas frecuentes y novedades. Cada publicación debe invitar a escribir, no solo a mirar.' },
    ],
    tarea: [
      'Responde hoy todos los comentarios y mensajes pendientes con la fórmula.',
      'Publica una pieza con una pregunta o invitación a escribir.',
      'Anota cuántas conversaciones nuevas generó en 7 días.',
    ],
    guion: [
      'Comentario: ¡Gracias, [nombre]! Te escribo por mensaje con todos los detalles.',
      'DM: Hola, [nombre]. Vi tu comentario sobre [tema]. Cuéntame, ¿para cuándo lo necesitas?',
      'Pase a WhatsApp: Si prefieres, seguimos por WhatsApp para enviarte fotos y fechas. ¿Te parece?',
    ],
    gemini: 'Escribe 6 ideas de publicaciones para el Instagram de mi negocio de [categoría] que inviten a la gente a comentar o escribir por mensaje. Para cada una dame el texto, la pregunta final y una respuesta de seguimiento al comentario.',
    quiz: [
      { q: 'Alguien comenta en tu publicación. Lo ideal es…', o: ['Ignorarlo', 'Responder público con su nombre e invitar a mensaje', 'Borrar el comentario'], c: 1, w: 'Respuesta pública breve y paso a conversación privada.' },
    ],
  },
  {
    id: 9, min: 9, titulo: 'Proponer la cita o visita con dos opciones',
    objetivo: 'Agendar sin vueltas: proponer dos horarios, confirmar y reducir las ausencias.',
    bloques: [
      { p: 'Preguntar "¿cuándo puedes?" abre mil posibilidades y suele terminar en silencio. **Proponer dos opciones concretas** hace que decidir sea fácil.' },
      { lista: [
        '**Dos opciones:** "¿Te sirve el martes a las 10 o el jueves a las 4?"',
        '**Confirma por escrito:** día, hora, lugar, servicio y cualquier cosa que deba traer.',
        '**Recordatorio:** envía uno 2 horas antes y otro el día anterior si es una cita importante.',
        '**Si no puede:** ofrece reagendar, no cancelar.',
      ] },
      { p: '**Reduce las ausencias:** pide confirmación ("responde SÍ para confirmar"), explica que apartas ese espacio para él y, si el servicio lo amerita, pide un abono pequeño.' },
      { p: 'Si usas **Neuro Citador**, la agenda ya prepara la confirmación y el recordatorio listos para enviar.' },
    ],
    tarea: [
      'Redacta tu mensaje de dos opciones y tu mensaje de confirmación.',
      'Define cuándo envías recordatorios.',
      'Cuenta tus ausencias del último mes y fija una meta para bajarlas.',
    ],
    guion: [
      'Propuesta: Perfecto, [nombre]. Tengo disponible [día y hora 1] o [día y hora 2]. ¿Cuál te queda mejor?',
      'Confirmación: Listo, quedaste para el [día] a las [hora] en [lugar]. Servicio: [servicio]. Responde SÍ para confirmar.',
      'Recordatorio: Hola, [nombre]. Te recuerdo tu cita de hoy a las [hora]. ¡Te esperamos!',
    ],
    gemini: 'Redacta 3 mensajes de WhatsApp para mi negocio de [categoría]: propuesta de cita con dos horarios, confirmación con todos los datos y recordatorio 2 horas antes. Cortos, amables y con un botón de salida para reagendar.',
    quiz: [
      { q: '¿Qué hace más fácil que el cliente agende?', o: ['Preguntar "¿cuándo puedes?"', 'Proponer dos opciones concretas', 'Esperar a que él proponga'], c: 1, w: 'Dos opciones reducen el esfuerzo de decidir.' },
      { q: 'Para bajar las ausencias conviene…', o: ['Confirmar y enviar recordatorios', 'No hacer nada', 'Cobrar multas sorpresa'], c: 0, w: 'Confirmación y recordatorio bajan las ausencias sin fricción.' },
    ],
  },
  {
    id: 10, min: 10, titulo: 'Cuando dicen "lo pienso", "está caro" o desaparecen',
    objetivo: 'Responder a las dudas de la etapa inicial sin presionar y manteniendo la puerta abierta.',
    bloques: [
      { p: 'Una duda no es un rechazo: es información. El setter la recibe con calma, la entiende y **decide el siguiente paso**.' },
      { lista: [
        '**"Lo voy a pensar":** pregunta con respeto qué parte le genera duda ("¿es el precio, el tiempo o algo del servicio?") y ofrece resolverla.',
        '**"Está caro":** no bajes el precio de inmediato. Pregunta con qué lo compara y recuerda el valor. Si hay una opción más económica, ofrécela.',
        '**Desaparece:** aplica la cadencia de 3 toques y cierra con cordialidad.',
        '**"No me interesa":** agradece, registra el motivo y no insistas.',
      ] },
      { p: '**Aprende de cada duda:** si 5 personas dicen "está caro", quizás falta explicar el valor antes de dar el precio, o tu cliente ideal es otro.' },
      { p: 'Las objeciones de precio más profundas y el cierre las trabajaremos en el curso de Closer. Aquí el objetivo es **no perder la conversación**.' },
    ],
    tarea: [
      'Anota las 3 dudas que más recibes y cómo las contestas hoy.',
      'Redacta una respuesta nueva para cada una con la fórmula entender-preguntar-ofrecer.',
      'Registra el motivo de cada "no" durante 2 semanas.',
    ],
    guion: [
      'Lo pienso: Claro, [nombre]. Para ayudarte mejor, ¿qué parte te genera duda: el precio, el tiempo o algo del servicio?',
      'Está caro: Te entiendo. ¿Con qué lo estás comparando? Si te sirve, tengo una opción más sencilla desde $[X].',
      'Cierre cordial: Gracias por escribirnos, [nombre]. Si más adelante lo necesitas, aquí estaremos.',
    ],
    gemini: 'Estas son las 3 dudas más comunes de mis clientes antes de agendar: [escríbelas]. Redacta para cada una una respuesta de WhatsApp de 3 líneas que entienda la duda, haga una pregunta y ofrezca una alternativa, sin presionar ni bajar el precio de inmediato.',
    quiz: [
      { q: 'Dicen "está caro". Lo primero es…', o: ['Bajar el precio', 'Preguntar con qué lo comparan y recordar el valor', 'Dejar de contestar'], c: 1, w: 'Entender la comparación evita regalar margen y aclara el valor.' },
    ],
  },
  {
    id: 11, min: 9, titulo: 'Pasar el cliente al closer con la ficha completa',
    objetivo: 'Hacer un traspaso limpio para que el cierre no empiece de cero.',
    bloques: [
      { p: 'Cuando el interesado está calificado y agendado, el setter **entrega una ficha**: así quien cierra (tú u otra persona) sabe todo sin volver a preguntar.' },
      { lista: [
        '**Datos:** nombre, contacto, cómo llegó, fecha de la cita.',
        '**Necesidad:** qué busca y para cuándo.',
        '**Presupuesto y decisión:** rango y quién decide.',
        '**Dudas:** lo que preguntó o le preocupa.',
        '**Siguiente paso acordado:** qué se hará y cuándo.',
      ] },
      { p: 'Si trabajas solo, la ficha es para ti: no confíes en la memoria. Si usas **Neuro CRM**, registra la etapa y la nota del contacto y agenda el seguimiento.' },
      { p: '**Frase de traspaso al cliente:** "Te va a atender [nombre], ya sabe lo que necesitas y te ayudará a decidir". El cliente siente continuidad, no repetición.' },
    ],
    tarea: [
      'Crea tu ficha de traspaso con los 5 puntos.',
      'Llénala para tus 3 próximas citas.',
      'Registra a esos contactos en tu CRM o en una hoja.',
    ],
    guion: [
      'FICHA DE TRASPASO',
      'Nombre/contacto: ___ · Llegó por: ___',
      'Necesidad y fecha: ___',
      'Presupuesto y quién decide: ___',
      'Dudas: ___',
      'Siguiente paso acordado: ___',
    ],
    gemini: 'Diseña una ficha de traspaso de una página para que quien cierra ventas en mi negocio de [categoría] tenga todo lo necesario de cada interesado. Incluye campos, un ejemplo llenado y el mensaje corto al cliente anunciando quién lo atenderá.',
    quiz: [
      { q: '¿Para qué sirve la ficha de traspaso?', o: ['Para llenar formularios', 'Para que el cierre no empiece de cero', 'Para controlar al cliente'], c: 1, w: 'Evita repetir preguntas y da continuidad.' },
    ],
  },
  {
    id: 12, min: 10, titulo: 'Tu tablero de setter y plan de 30 días',
    objetivo: 'Medir 5 números semanales y mejorar con un plan simple de 30 días.',
    bloques: [
      { p: 'Lo que no se mide, no mejora. El setter necesita **5 números**, anotados cada viernes en una hoja:' },
      { lista: [
        '**Conversaciones nuevas** de la semana.',
        '**Tiempo de primera respuesta** (promedio).',
        '**Calificados:** cuántos pasaron a caliente o tibio.',
        '**Citas o cotizaciones agendadas.**',
        '**Asistencia:** cuántas citas se cumplieron.',
      ] },
      { p: '**Dos tasas clave:** conversaciones → citas, y citas → asistencia. Si la primera es baja, mejora aperturas y calificación; si la segunda es baja, mejora confirmaciones y recordatorios.' },
      { p: '**Plan de 30 días:**' },
      { lista: [
        '**Semana 1:** respuestas rápidas, bienvenida y tiempo de respuesta.',
        '**Semana 2:** aperturas y calificación.',
        '**Semana 3:** cadencia de seguimiento y clientes dormidos.',
        '**Semana 4:** agenda, recordatorios y ficha de traspaso; revisar números y decidir un ajuste.',
      ] },
    ],
    tarea: [
      'Crea tu hoja con los 5 números y regístralos el viernes.',
      'Calcula tus dos tasas actuales.',
      'Agenda 15 minutos cada viernes para revisar y elegir un solo ajuste.',
    ],
    guion: [
      'TABLERO SEMANAL',
      'Semana: ___',
      'Conversaciones nuevas: ___ · Respuesta (min): ___',
      'Calificados: ___ · Citas agendadas: ___ · Asistieron: ___',
      'Tasa conversaciones→citas: ___ % · Asistencia: ___ %',
      'Ajuste de la próxima semana: ___',
    ],
    gemini: 'Estos son mis números de la semana como setter: [pega el tablero]. Dime cuál es mi punto más débil, qué ajuste concreto probar la próxima semana y cómo medir si funcionó.',
    quiz: [
      { q: 'Muchas citas agendadas pero pocas asistencias. Mejoras…', o: ['El primer mensaje', 'Confirmaciones y recordatorios', 'El logo'], c: 1, w: 'La asistencia se mejora con confirmación y recordatorios.' },
      { q: '¿Cuántos ajustes haces por semana?', o: ['Diez a la vez', 'Uno, para saber qué funcionó', 'Ninguno'], c: 1, w: 'Un ajuste a la vez permite aprender.' },
    ],
  },
];
