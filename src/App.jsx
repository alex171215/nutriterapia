import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';

// --- BASE DE DATOS DE MENSAJES (100 MENSAJES) ---
// (Mantenemos los mensajes diseñados para validación indirecta y amor divino)
const allMessages = [
  // 1-10: Validación de la invisibilidad y el entorno
  { text: "Hola... Soy Nutri. Noto que tus hombros están pesados hoy. ¿Te quedarías un ratito a rascarme la pancita?", verse: null },
  { text: "Sé que a veces tu entorno se siente muy frío, como si todo lo que haces fuera invisible. Pero tu luz brilla aunque otros cierren los ojos.", verse: null },
  { text: "No tienes que cargar con el peso de intentar agradar a quienes no están listos para valorar tu hermoso corazón.", verse: "«Jehová está cerca de los quebrantados de corazón; y salva a los contritos de espíritu.» (Salmo 34:18)" },
  { text: "El lugar donde estás ahora no define tu valor. Eres como una flor hermosa que a veces crece en suelo duro.", verse: null },
  { text: "Duele cuando las personas más cercanas no notan tu esfuerzo. Está bien sentir ese dolor, no tienes que esconderlo aquí.", verse: null },
  { text: "A veces, las personas que deberían darnos paz son las que más nos agotan. Respira, aquí estás a salvo.", verse: null },
  { text: "Tus esfuerzos silenciosos, esos que nadie aplaude en casa, no pasan desapercibidos para el Creador.", verse: "«Y tu Padre que ve en lo secreto te recompensará en público.» (Mateo 6:4)" },
  { text: "Si hoy sientes que no encajas donde deberías pertenecer, recuerda que tienes un hogar eterno que te espera con los brazos abiertos.", verse: null },
  { text: "Tus lágrimas a puerta cerrada tienen un inmenso valor. Hay Alguien que las recoge y las cuenta una por una.", verse: "«Tú cuentas los pasos de mi vida errante; pon mis lágrimas en tu redoma.» (Salmo 56:8)" },
  { text: "No dejes que la falta de reconocimiento apague tu ternura. Tu amabilidad es tu superpoder.", verse: null },

  // 11-20: Cansancio y necesidad de descanso
  { text: "Está bien si hoy ya no puedes ser la 'fuerte'. Puedes dejar caer tu armadura un ratito.", verse: null },
  { text: "Te exiges demasiado intentando que todo salga bien. Hoy, tu única tarea es respirar profundo.", verse: "«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.» (Mateo 11:28)" },
  { text: "Ríndete por un momento. No tienes que arreglar el mundo hoy, ni siquiera tu propio mundo.", verse: null },
  { text: "Cierra los ojos. Imagina que toda esa tensión se disuelve. Eres suficiente tal y como estás en este segundo.", verse: null },
  { text: "Tu mente ha estado corriendo a mil por hora. Vamos a bajar el ritmo. Rasca mi pancita despacito...", verse: null },
  { text: "El descanso no es un premio que debes ganarte trabajando hasta el agotamiento; es tu derecho fundamental.", verse: "«En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.» (Salmo 23:2)" },
  { text: "Permítete estar cansada sin sentir culpa. Has cargado mucho peso sola.", verse: null },
  { text: "No tienes que probarle a nadie que mereces tomar un respiro. Tómalo.", verse: null },
  { text: "Mañana será otro día. Hoy, la noche te envuelve para protegerte y darte paz.", verse: null },

  // 21-30: Amor Divino e incondicional
  { text: "Quiero recordarte una verdad inquebrantable: Tu valor fue sellado en el cielo, no en las opiniones terrenales.", verse: "Salmo 139:13-14 – «Porque tú formaste mis entrañas; tú me hiciste en el vientre de mi madre... Maravillosas son tus obras; estoy muy convencido de ello.» " },
  { text: "Incluso si quienes debían cuidarte fallan, hay un Amor Perfecto que jamás te soltará de su mano.", verse: "«Aunque mi padre y mi madre me dejaran, con todo, Jehová me recogerá.» (Salmo 27:10)" },
  { text: "Eres una obra de arte planeada con infinito cuidado. No eres un accidente ni una carga.", verse: "«Porque somos hechura suya, creados en Cristo Jesús para buenas obras...» (Efesios 2:10)" },
  { text: "Cuando sientas que a nadie le importas, recuerda que fuiste comprada a precio de sangre por puro amor.", verse: "Isaías 43:1: No temas, porque yo te redimí; te puse nombre, mío eres tú."  },
  { text: "Él conoce tu nombre, tus miedos y tus sueños rotos. Y te ama exactamente igual en tus días malos.", verse: "«Porque a mis ojos fuiste de gran estima, fuiste honorable, y yo te amé.» (Isaías 43:4)" },
  { text: "Nada de lo que hagas o dejes de hacer puede disminuir el amor que el Creador siente por ti.", verse: "«Con amor eterno te he amado; por tanto, te prolongué mi misericordia.» (Jeremías 31:3)" },
  { text: "No estás pidiendo demasiado amor; simplemente lo estás buscando en pozos vacíos. Hay una Fuente inagotable para ti.", verse: null },
  { text: "Tu Padre celestial se deleita en ti. Cuando te mira, sonríe.", verse: "«Jehová está en medio de ti... se gozará sobre ti con alegría, callará de amor, se regocijará sobre ti con cánticos.» (Sofonías 3:17)" },
  { text: "Si pudieras verte a través de los ojos de Dios, nunca volverías a dudar de ti misma.", verse: null },
  { text: "Eres Su niña pequeña, Su tesoro más preciado. No dejes que las voces del mundo te digan lo contrario.", verse: null },

  // 31-40: La fuerza de la sensibilidad y bondad
  { text: "Siento mucho que a veces sientas que tu sensibilidad es un defecto. En realidad, es un hermoso regalo.", verse: null },
  { text: "El mundo necesita más personas que sientan tan profundo como tú.", verse: null },
  { text: "Sé que duele tener un corazón blando en un entorno duro. No dejes que te lo endurezcan.", verse: "«Y les daré un corazón, y un espíritu nuevo pondré dentro de ellos... y les daré un corazón de carne.» (Ezequiel 11:19)" },
  { text: "La forma en que cuidas a otros, incluso cuando tú te sientes mal, habla de la grandeza de tu alma.", verse: null },
  { text: "Tus pequeños actos de bondad diarios son semillas que están creciendo, aunque hoy no veas el fruto.", verse: "«No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.» (Gálatas 6:9)" },
  { text: "A veces la mayor muestra de valentía es seguir siendo amable cuando te han tratado con indiferencia.", verse: null },
  { text: "No minimices tu luz solo porque deslumbra a quienes prefieren la oscuridad.", verse: null },
  { text: "Tu empatía es una brújula. Te hace diferente, y eso es exactamente lo que te hace especial.", verse: null },
  { text: "Sigue amando, sigue intentando, sigue siendo tú. Hay una recompensa silenciosa en tu fidelidad.", verse: null },

  // 41-50: Soltando el control y las preocupaciones
  { text: "No puedes controlar lo que otros piensan o hacen. Solo puedes abrazarte a ti misma y seguir adelante.", verse: null },
  { text: "Suelta por un momento la necesidad de entender por qué las cosas son tan difíciles. Solo déjate sostener.", verse: "«Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.» (Proverbios 3:5)" },
  { text: "Esa preocupación que te quita el sueño... entrégala. No fue diseñada para que la cargues tú.", verse: "«Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.» (1 Pedro 5:7)" },
  { text: "Está bien no tener las respuestas hoy. La claridad llega cuando el alma se calma.", verse: null },
  { text: "Imagina que pones todas tus preocupaciones en un barquito de papel y lo dejas ir por un río de paz.", verse: null },
  { text: "No dejes que el ruido exterior apague tu voz interior. Escucha el susurro de esperanza.", verse: "«Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios... y la paz de Dios guardará vuestros corazones.» (Filipenses 4:6-7)" },
  { text: "A veces la mejor acción es simplemente quedarse quieto y esperar a que pase la tormenta.", verse: "«Estad quietos, y conoced que yo soy Dios.» (Salmo 46:10)" },
  { text: "No te adelantes al dolor de mañana. Concéntrate en la suave respiración de hoy.", verse: "No desesperen preguntandose que van a comer o que van a bever solo quienes no confían en Dios se preocupan por ello Lucas 12:29" },
  { text: "Perdónate por las veces que sentiste que fallaste. Estabas haciendo lo mejor que podías.", verse: null },
  { text: "La paz no es la ausencia de problemas, es saber que estás a salvo en medio de ellos.", verse: null },

  // 51-60: Es válido estar triste y llorar
  { text: "Si tienes ganas de llorar, hazlo. Las lágrimas limpian los cristales del alma para ver mejor.", verse: null },
  { text: "No tienes que sonreír si no lo sientes. Tu tristeza también merece espacio y respeto.", verse: "«Bienaventurados los que lloran, porque ellos recibirán consolación.» (Mateo 5:4)" },
  { text: "A veces, romperse un poco es la única forma de que la luz entre por las grietas.", verse: null },
  { text: "No apresures tu proceso de sanación. Las heridas profundas toman tiempo, sé paciente contigo.", verse: null },
  { text: "Reconocer que duele es el primer paso para dejar que sane. Eres muy valiente por sentirlo.", verse: null },
  { text: "El consuelo divino abraza más fuerte cuando sentimos que ya no nos quedan fuerzas.", verse: "«Él sana a los quebrantados de corazón, y venda sus heridas.» (Salmo 147:3)" },
  { text: "Un día a la vez. Una respiración a la vez. No te exijas correr cuando apenas puedes caminar.", verse: null },
  { text: "Estar triste no significa que seas débil. Significa que tu corazón ha estado sintiendo demasiado.", verse: null },
  { text: "Tu vulnerabilidad es hermosa. No dejes que la frialdad de otros te haga pensar lo contrario.", verse: null },
  { text: "Aquí, conmigo y con Dios, no tienes que fingir que todo está bien. Él te acepta exactamente en este estado.", verse: null },

  // 61-70: Esperanza y un futuro mejor
  { text: "Aunque la noche parezca eterna, te prometo que el sol volverá a salir para ti.", verse: "«Por la noche durará el lloro, y a la mañana vendrá la alegría.» (Salmo 30:5)" },
  { text: "Tus circunstancias actuales no son tu destino final. Hay capítulos hermosos esperando ser escritos.", verse: "«Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová... para daros el fin que esperáis.» (Jeremías 29:11)" },
  { text: "Algún día mirarás atrás y te sorprenderá ver lo fuerte que fuiste cuando pensabas que te ibas a rendir.", verse: null },
  { text: "Las raíces del árbol crecen más fuertes bajo tierra en el invierno. Tu crecimiento interior ahora mismo es inmenso.", verse: null },
  { text: "Mantén viva esa pequeña chispa de esperanza. Es suficiente para encender un bosque entero de posibilidades.", verse: null },
  { text: "El amor que no has recibido será compensado de formas que ni siquiera imaginas.", verse: "«Cosas que ojo no vio, ni oído oyó, ni han subido en corazón de hombre, son las que Dios ha preparado para los que le aman.» (1 Corintios 2:9)" },
  { text: "Tu futuro está lleno de paz. Aferrate a esa promesa en los días grises.", verse: null },
  { text: "La vida tiene un ritmo misterioso. Esta pausa silenciosa y dolorosa te está preparando para tu mejor melodía.", verse: null },
  { text: "Nunca dejes de creer que hay cosas buenas de camino hacia tu vida. Las mereces.", verse: null },

  // 71-80: Valor personal independiente de los logros
  { text: "No vales por tus buenas calificaciones, por lo mucho que ayudas o por lo que logras. Vales simplemente porque existes.", verse: null },
  { text: "Deja de medir tu valor con las reglas rotas de personas que no saben medir lo verdaderamente valioso", verse: null },
  { text: "Eres invaluable. Ni todo el oro del mundo podría comprar la belleza de tu esencia.", verse: "«Porque habéis sido comprados por precio; glorificad, pues, a Dios en vuestro cuerpo y en vuestro espíritu.» (1 Corintios 6:20)" },
  { text: "El perfeccionismo es una trampa. No tienes que ser perfecta para ser digna de amor y respeto.", verse: null },
  { text: "Si nadie te lo ha dicho hoy: Hay alguien que esta muy orgulloso de la persona en la que te estás convirtiendo.", verse: null },
  { text: "Cada esfuerzo invisible es una medalla invisible que el cielo te otorga.", verse: null },
  { text: "No necesitas un escenario ni aplausos. Tu valor irradia desde adentro, aunque la habitación esté a oscuras.", verse: null },
  { text: "Tú no eres el reflejo de cómo te tratan. Tú eres el reflejo del Amor que te creó.", verse: "«Te alabaré; porque formidables, maravillosas son tus obras; estoy maravillado.» (Salmo 139:14)" },
  { text: "Eres suficiente. Hoy, ayer y siempre. Absolutamente suficiente.", verse: null },

  // 81-90: Sanación y respiración
  { text: "Siente tu respiración. Ese aire entrando y saliendo es una prueba de que aún hay propósito para ti aquí.", verse: null },
  { text: "Relaja la mandíbula. Baja los hombros. Quita la lengua del paladar. Suelta la tensión.", verse: null },
  { text: "Eres un espacio seguro para otros; permite que este instante sea un espacio seguro para ti.", verse: null },
  { text: "No tienes que estar a la defensiva aquí. Puedes bajar tus escudos de protección.", verse: "«Tú eres mi refugio; me guardarás de la angustia; con cánticos de liberación me rodearás.» (Salmo 32:7)" },
  { text: "Sanar no es un camino recto. Habrá días de retroceso y está bien. Es parte de curar.", verse: null },
  { text: "Acaricia tu propia alma con la misma suavidad con la que me estás acariciando.", verse: null },
  { text: "Este momento de paz te pertenece. Nadie te lo puede quitar.", verse: null },
  { text: "Imagina que cada respiración te llena de luz dorada y cada exhalación saca el polvo gris de la tristeza.", verse: null },
  { text: "El silencio a veces aterra, pero hoy que sea tu manta protectora.", verse: null },
  { text: "Quédate aquí un poquito más. Solo sintiendo la calma. No hay prisa.", verse: null },

  // 91-100: Afirmaciones finales y despedida amorosa
  { text: "Eres amada incondicionalmente. Sin peros, sin condiciones, sin exigencias.", verse: "«Por lo cual estoy seguro de que ni la muerte, ni la vida... ni ninguna otra cosa creada nos podrá separar del amor de Dios.» (Romanos 8:38-39)" },
  { text: "Si el mundo de afuera es un caos, que tu interior sea tu santuario.", verse: null },
  { text: "Gracias por existir. Gracias por ser tan dulce a pesar de las espinas del camino.", verse: null },
  { text: "Nunca dejes que la incomprensión de otros te convenza de que no eres valiosa.", verse: null },
  { text: "Tu corazón está sano y salvo en Sus manos. Nada puede romperte definitivamente.", verse: null },
  { text: "Eres un destello de luz en el universo. No hay nadie más como tú.", verse: null },
  { text: "Espero que este ratito juntas te haya recordado lo valiosa que eres.", verse: null },
  { text: "Lleva esta sensación de paz contigo cuando apagues la pantalla.", verse: "«La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.» (Juan 14:27)" },
  { text: "Siempre estaré aquí cuando necesites un descanso. Te quiero mucho, valiente soñadora.", verse: null }
];

export default function App() {
  const [scratchProgress, setScratchProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHappy, setIsHappy] = useState(false);
  const [particles, setParticles] = useState([]);
  const [fadeMsg, setFadeMsg] = useState(true);
  const [sessionMessages, setSessionMessages] = useState([]);
  
  const interactionTimer = useRef(null);
  const bellyRef = useRef(null);
  let lastMoveTime = useRef(0);

  // Clave de LocalStorage para guardar los índices de los mensajes ya vistos
  const STORAGE_KEY = 'nutriMensajesVistos';

  // --- LÓGICA DE LOCALSTORAGE (PARA EVITAR REPETICIONES ENTRE SESIONES) ---
  useEffect(() => {
    if (sessionMessages.length > 0) return; // Si ya se inicializó la sesión, no hacer nada

    // Cargar los índices de mensajes ya vistos de LocalStorage
    const vistos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // Crear una lista de mensajes *disponibles* (excluyendo el índice 0 que es el saludo fijo, y los ya vistos)
    let disponibles = allMessages.map((_, index) => index).filter(index => index !== 0 && !vistos.includes(index));
    
    // Comprobar si hay suficientes mensajes disponibles (necesitamos 4 aleatorios para completar los 5 de la sesión)
    if (disponibles.length < 4) {
      // Si quedan menos de 4, reiniciamos el contador de vistos para empezar un nuevo ciclo
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      // Reiniciamos los disponibles excluyendo solo el índice 0
      disponibles = allMessages.map((_, index) => index).filter(index => index !== 0);
    }
    
    // Mezclamos la lista de mensajes disponibles
    const shuffledDisponibles = disponibles.sort(() => 0.5 - Math.random());
    // Tomamos 4 para la sesión actual
    const sesionIndices = shuffledDisponibles.slice(0, 4);
    const sesionMsgs = sesionIndices.map(index => allMessages[index]);
    
    // Actualizar la lista de vistos en LocalStorage con los nuevos mensajes seleccionados
    const nuevosVistos = [...vistos, ...sesionIndices];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosVistos));
    
    // La sesión SIEMPRE empieza con el mensaje 0 (el saludo de Nutri), seguido de los 4 aleatorios
    setSessionMessages([allMessages[0], ...sesionMsgs]);
  }, [STORAGE_KEY, sessionMessages.length]);

  // Efecto para sincronizar el progreso de forma segura (mismo de la iteración anterior)
  useEffect(() => {
    if (sessionMessages.length === 0) return;
    
    // Cada mensaje requiere 15 puntos de "rascado"
    const expectedIndex = Math.floor(scratchProgress / 15);
    const targetIndex = Math.min(expectedIndex, sessionMessages.length - 1);
    
    if (targetIndex > messageIndex) {
      setFadeMsg(false);
      const timer = setTimeout(() => {
        setMessageIndex(targetIndex);
        setFadeMsg(true);
      }, 500); // Tiempo de fade out
      return () => clearTimeout(timer);
    }
  }, [scratchProgress, messageIndex, sessionMessages.length]);

  // Lógica para manejar el "rascado" (mismo de la iteración anterior)
  const handleInteraction = useCallback((clientX, clientY) => {
    if (sessionMessages.length === 0) return;
    
    const now = Date.now();
    // Limitar la tasa de eventos para no sobrecargar el navegador
    if (now - lastMoveTime.current < 40) return;
    lastMoveTime.current = now;

    // Aumentar progreso (el límite de la sesión es 5 mensajes * 15 puntos)
    setScratchProgress(prev => Math.min(prev + 0.3, (sessionMessages.length - 1) * 15));

    // Poner a la nutria feliz
    setIsHappy(true);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setIsHappy(false), 800);

    // Generar partículas (corazones)
    if (Math.random() > 0.6) {
      const bellyRect = bellyRef.current?.getBoundingClientRect();
      if (bellyRect) {
        const x = clientX - bellyRect.left + (Math.random() * 40 - 20);
        const y = clientY - bellyRect.top + (Math.random() * 40 - 20);
        
        const newParticle = {
          id: Date.now() + Math.random(),
          x,
          y,
        };
        
        setParticles(prev => [...prev.slice(-15), newParticle]); // Mantener max 15 partículas
        
        // Limpiar partícula
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1500);
      }
    }
  }, [sessionMessages.length]);

  const onMouseMove = (e) => handleInteraction(e.clientX, e.clientY);
  const onTouchMove = (e) => {
    // Prevenir el scroll solo cuando se toca la pancita
    if(e.cancelable) e.preventDefault(); 
    handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
  };

  // Fallback de carga
  const currentMessage = sessionMessages[messageIndex] || { text: "Preparando mimos..." };
  
  // --- CÁLCULO DE LA BARRA DE PROGRESO INDIVIDUAL ---
  // Ahora la barra muestra cuánto falta para el SIGUIENTE mensaje
  const pointsPerMessage = 15;
  let progressPercentage = 0;
  let isLastMessage = false;

  if (sessionMessages.length > 0) {
    if (messageIndex < sessionMessages.length - 1) {
      // Progreso solo de la fase actual (ej. de 15 a 30)
      const currentPhaseProgress = scratchProgress - (messageIndex * pointsPerMessage);
      progressPercentage = Math.max(0, Math.min((currentPhaseProgress / pointsPerMessage) * 100, 100));
    } else {
      // Si ya está en el último mensaje de la sesión
      progressPercentage = 100;
      isLastMessage = true;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-100 flex flex-col items-center justify-center p-4 font-sans text-gray-800 overflow-hidden relative">
      
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-30 z-0">
        <div className="w-[800px] h-[800px] bg-rose-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="w-[600px] h-[600px] bg-amber-200 rounded-full blur-3xl opacity-50 absolute mix-blend-multiply animation-delay-2000"></div>
      </div>

      <main className="z-10 w-full max-w-2xl flex flex-col items-center gap-8">
        
        {/* Título y Medidor de Progreso */}
        <div className="w-full text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif text-amber-900 opacity-80 flex items-center justify-center gap-2">
            <Sparkles className="text-amber-500 w-6 h-6" />
            Un momento de paz
            <Sparkles className="text-amber-500 w-6 h-6" />
          </h1>
          <p className="text-amber-800/60 text-sm md:text-base">
            Desliza tu ratón o tu dedo suavemente para acariciar a Nutri.
          </p>
          
          <div className="w-full max-w-md mx-auto space-y-2">
            <div className="bg-white/50 rounded-full h-3 shadow-inner overflow-hidden backdrop-blur-sm border border-white/60 relative">
              <div 
                className="h-full bg-gradient-to-r from-rose-300 to-amber-400 transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            {/* Indicador de progreso textual */}
            <p className="text-xs text-amber-700/60 font-medium h-4">
              {isLastMessage 
                ? "Sesión completada ❤️ Vuelve mañana o recarga la página para nuevos mensajes." 
                : `Sigue acariando a Nutri para el siguiente mensaje... (${messageIndex + 1}/5)`}
            </p>
          </div>
        </div>

        {/* Tarjeta de Mensaje (con animación de transición) */}
        <div 
          className={`w-full bg-white/70 backdrop-blur-md border border-white/80 p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-700 transform ${
            fadeMsg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ minHeight: '180px' }}
        >
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
              "{currentMessage.text}"
            </p>
            {currentMessage.verse && (
              <p className="text-sm md:text-base text-rose-600 font-serif italic bg-rose-50 px-4 py-2 rounded-lg border border-rose-100">
                {currentMessage.verse}
              </p>
            )}
          </div>
        </div>

        {/* Zona Interactiva de la Nutria (DISEÑO IDÉNTICO A LA IMAGEN) */}
        <div className="relative mt-12 mb-4 select-none">
          
          <div className="relative w-72 h-72 md:w-80 md:h-80 overflow-visible">
            
            {/* Flores decorativas flotantes idénticas a la imagen */}
            <FlowerSVG color="#f6c478" size={50} className="absolute -top-4 -left-6 -rotate-12 z-0 animate-pulse" /> {/* Amarilla superior */}
            <FlowerSVG color="#90c0ea" size={45} className="absolute top-24 -left-12 rotate-12 z-0" /> {/* Azul */}
            <FlowerSVG color="#f7b9c9" size={55} className="absolute top-36 -right-10 rotate-45 z-0" /> {/* Rosa */}
            <FlowerSVG color="#f6c478" size={40} className="absolute bottom-8 -right-4 rotate-90 z-0" /> {/* Amarilla inferior */}

            {/* El SVG de la Nutria Kawaii de pie */}
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible z-10 relative">
              
              {/* Sombra rosa en el suelo */}
              <ellipse cx="100" cy="185" rx="55" ry="8" fill="#e09d9b" />

              {/* Cola */}
              <path 
                d="M 65 165 Q 30 150 40 110 Q 55 125 65 140 Z" 
                fill="#ab7b66" stroke="#462c21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" 
              />

              {/* Orejas */}
              <path d="M 65 55 C 50 45, 65 25, 80 40" fill="#ab7b66" stroke="#462c21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 135 55 C 150 45, 135 25, 120 40" fill="#ab7b66" stroke="#462c21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Patas Traseras / Base */}
              <path d="M 65 175 C 40 185, 45 195, 75 186" fill="#ab7b66" stroke="#462c21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 135 175 C 160 185, 155 195, 125 186" fill="#ab7b66" stroke="#462c21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Cuerpo y Cabeza (Silueta unificada marrón) */}
              <path 
                d="M 80 40 
                   C 110 35, 130 45, 140 65 
                   C 150 90, 145 110, 145 130 
                   C 145 160, 150 180, 120 180 
                   C 100 180, 100 180, 80 180 
                   C 50 180, 55 160, 55 130 
                   C 55 110, 50 90, 60 65 
                   C 70 45, 70 40, 80 40 Z" 
                fill="#ab7b66" stroke="#462c21" strokeWidth="5" strokeLinejoin="round" 
              />

              {/* Zona Crema (Cara y Pancita continuas) */}
              <path 
                d="M 62 85 
                   C 75 75, 125 75, 138 85 
                   C 142 100, 138 115, 130 120 
                   C 140 145, 135 175, 115 175 
                   C 100 175, 85 175, 65 175 
                   C 60 160, 60 145, 70 120 
                   C 62 115, 58 100, 62 85 Z" 
                fill="#fdf1e5" 
              />
              
              {/* Sombra sutil crema oscuro debajo del mentón para dar volumen */}
              <path d="M 75 115 Q 100 135 125 115 Q 100 125 75 115 Z" fill="#f0dcd0" />

              {/* Bigotes largos oscuros */}
              <g stroke="#462c21" strokeWidth="3" strokeLinecap="round">
                {/* Izquierda */}
                <line x1="28" y1="88" x2="60" y2="92" />
                <line x1="22" y1="98" x2="58" y2="98" />
                <line x1="28" y1="108" x2="60" y2="104" />
                {/* Derecha */}
                <line x1="172" y1="88" x2="140" y2="92" />
                <line x1="178" y1="98" x2="142" y2="98" />
                <line x1="172" y1="108" x2="140" y2="104" />
              </g>

              {/* Mejillas Melocotón */}
              <ellipse cx="68" cy="92" rx="12" ry="7" fill="#faa88f" transform="rotate(-10 68 92)" />
              <ellipse cx="132" cy="92" rx="12" ry="7" fill="#faa88f" transform="rotate(10 132 92)" />

              {/* Ojos */}
              {isHappy ? (
                <>
                  <path d="M 73 85 Q 78 78 83 85" fill="none" stroke="#1a110d" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 117 85 Q 122 78 127 85" fill="none" stroke="#1a110d" strokeWidth="4" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <ellipse cx="78" cy="83" rx="5.5" ry="8" fill="#1a110d" transform="rotate(-5 78 83)" />
                  <ellipse cx="122" cy="83" rx="5.5" ry="8" fill="#1a110d" transform="rotate(5 122 83)" />
                </>
              )}

              {/* Hocico y Lengua */}
              <g className="relative z-10">
                {/* Lengua debajo de la boca */}
                <path d="M 94 88 C 94 100, 106 100, 106 88 Z" fill="#f48fb1" stroke="#462c21" strokeWidth="2.5" />
                {/* Línea de la boca tipo ':3' */}
                <path d="M 90 85 Q 95 92 100 85 Q 105 92 110 85" fill="none" stroke="#462c21" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Nariz */}
                <ellipse cx="100" cy="81" rx="5" ry="3" fill="#462c21" />
              </g>

              {/* Patitas Delanteras (Levantadas hacia las mejillas) */}
              <g className={`transition-transform duration-300 origin-center ${isHappy ? '-translate-y-2 translate-x-1 rotate-12' : ''}`}>
                <path d="M 75 140 C 60 135, 50 110, 60 95 C 68 85, 80 90, 75 105 C 70 115, 75 125, 80 130 Z" fill="#ab7b66" stroke="#462c21" strokeWidth="4.5" strokeLinejoin="round" />
              </g>
              <g className={`transition-transform duration-300 origin-center ${isHappy ? '-translate-y-2 -translate-x-1 -rotate-12' : ''}`}>
                <path d="M 125 140 C 140 135, 150 110, 140 95 C 132 85, 120 90, 125 105 C 130 115, 125 125, 120 130 Z" fill="#ab7b66" stroke="#462c21" strokeWidth="4.5" strokeLinejoin="round" />
              </g>
              
            </svg>

            {/* ZONA DE INTERACCIÓN INVISIBLE (Superpuesta sobre la pancita ahora más central y vertical) */}
            <div 
              ref={bellyRef}
              className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-40 rounded-[50%] cursor-pointer z-20"
              style={{ touchAction: 'none' }} // Crucial para móviles
              onMouseMove={onMouseMove}
              onTouchMove={onTouchMove}
            >
              {/* Partículas flotantes */}
              {particles.map(p => (
                <div 
                  key={p.id}
                  className="absolute pointer-events-none animate-float-up opacity-0"
                  style={{ left: p.x, top: p.y }}
                >
                  <Heart className="text-rose-400 fill-rose-300 w-6 h-6 drop-shadow-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer amoroso */}
        <div className="text-center mt-8 text-amber-900/40 text-sm z-10 relative">
          <p>Tómate todo el tiempo que necesites. Este es un espacio seguro.</p>
        </div>

      </main>

      {/* Estilos para las animaciones CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) scale(1.2) rotate(20deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}} />
    </div>
  );
}

// Componente helper para las flores flotantes (Rediseñado para lucir como la imagen: bordes muy gruesos cruzados)
const FlowerSVG = ({ color, size, className }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`drop-shadow-sm opacity-90 ${className}`}>
    <g stroke={color} strokeWidth="28" strokeLinecap="round">
      <line x1="50" y1="20" x2="50" y2="80" />
      <line x1="24" y1="35" x2="76" y2="65" />
      <line x1="24" y1="65" x2="76" y2="35" />
    </g>
    <circle cx="50" cy="50" r="7" fill="white" opacity="0.8" />
  </svg>
)