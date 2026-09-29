/* Banco de lecturas (prototipo + Word de las profesoras). Se cargan a Firestore desde el panel de admin
   (botón "Cargar banco de lecturas"; solo agrega las que no existen). Incluyen la respuesta correcta; al guardarse, la clave
   se separa en la colección "claves", que los alumnos no pueden leer antes de enviar. */
export const LECTURAS_EJEMPLO = [
 {
  "id": "vacation-every-day",
  "titulo": "Vacation Every Day",
  "seccion": "Reading Comprehension — Nivel A2",
  "academia": "Academia de Inglés",
  "fuente": "Reading1.docx",
  "minutos": 12,
  "numerar": false,
  "parrafos": [
   "Mary Larson was 43 when she got divorced. It was a fresh start for her, and she began considering what was really important. She was working 60 hours a week as a banker to pay for her big house, expensive furniture, a new car, and all the other \"important\" things in life. But she had no time for what she really enjoyed: going out on her old houseboat.",
   "One day, she realized she could live on the boat and forget about the mortgage payments. She sold her house and all her furniture. For the last six years, she and her dog Buddy have lived on the boat, which is only a fraction of the size of her old house. Her \"home\" is in a marina on the river, and the rent is a lot cheaper and includes water and electricity.",
   "The boat has one room which measures about five by four meters. It's divided into two parts by a curtain. One part is Mary's bedroom; the other is the living room and kitchen.",
   "There's also a small bathroom with a shower. \"I used to spend every weekend cleaning and maintaining my house. Now it takes me two or three hours a month,\" Mary says.",
   "\"My friends think I'm crazy,\" she says. \"But I wake up in the morning and hear the calls of ducks and birds. I can go fishing from my living room.\" Now she works only part time. She uses all the extra hours for writing stories, cycling, volunteering, and visiting friends. On the weekends, she goes along the river on her boat, exploring new places.",
   "\"Would I go back to my old life? Never!\" she says. \"It's so peaceful here. It's like being on vacation every day.\""
  ],
  "orden": 1,
  "preguntas": [
   {
    "enunciado": "How old was Mary when she got divorced?",
    "opciones": [
     "43",
     "40",
     "46"
    ],
    "habilidad": "Specific information",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "What was Mary's job before she changed her lifestyle?",
    "opciones": [
     "Teacher",
     "Banker",
     "Writer"
    ],
    "habilidad": "Specific information",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Why did Mary decide to sell her house?",
    "opciones": [
     "She wanted to buy a bigger boat.",
     "She could no longer afford to maintain it.",
     "She realized she could live on her boat instead."
    ],
    "habilidad": "Cause / effect",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "Where does Mary's boat serve as her home?",
    "opciones": [
     "On a lake",
     "In a marina on a river",
     "Near the ocean"
    ],
    "habilidad": "Specific information",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "How is the main room of the boat organized?",
    "opciones": [
     "It has two separate bedrooms and a kitchen.",
     "It is divided into two parts by a curtain.",
     "It has a bedroom, a bathroom, and a large living room."
    ],
    "habilidad": "Supporting detail",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "What does Mary mean when she says that the boat is only a \"fraction\" of the size of her old house?",
    "opciones": [
     "The boat is much smaller than her previous house.",
     "The boat is almost the same size as her previous house.",
     "The boat is larger than her previous house."
    ],
    "habilidad": "Vocabulary in context",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "What is one important difference between Mary's old life and her current life?",
    "opciones": [
     "She now spends more time working and less time relaxing.",
     "She has less free time because she has to maintain the boat.",
     "She works part time and has more time for activities she enjoys."
    ],
    "habilidad": "Inference",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "What does Mary do with some of the extra time she has now?",
    "opciones": [
     "She writes stories, cycles, volunteers, and visits friends.",
     "She works extra hours and travels to different countries.",
     "She spends most of her time cleaning and maintaining her boat."
    ],
    "habilidad": "Specific information",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "Why do Mary's friends think she is \"crazy\"?",
    "opciones": [
     "Because she works too many hours and never takes vacations.",
     "Because she gave up a large house and a more traditional lifestyle to live on a small boat.",
     "Because she spends every weekend traveling far away from her home."
    ],
    "habilidad": "Inference",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Which statement best describes the main idea of the reading?",
    "opciones": [
     "Mary discovers that having a smaller home can give her more free time and a more enjoyable life.",
     "Mary decides to live on a boat because she wants to become a professional fisherman and travel around the world.",
     "Mary sells her house because she cannot pay her mortgage and eventually regrets leaving her old lifestyle."
    ],
    "habilidad": "Main idea",
    "correcta": 0,
    "justificacion": ""
   }
  ],
  "instrucciones": ""
 },
 {
  "id": "ocean-acidic",
  "titulo": "When the Ocean Becomes More Acidic",
  "seccion": "DOMINA — Práctica de Reading Comprehension",
  "academia": "Academia de Inglés",
  "fuente": "Adaptado de NOAA, Lesson 3: Ocean Acidification (NEMO Curriculum, 2010). Dominio público.",
  "minutos": 20,
  "numerar": false,
  "parrafos": [
   "The ocean covers more than two-thirds of Earth's surface and plays an important role in regulating the planet's climate. It also absorbs a large amount of carbon dioxide (CO₂) from the atmosphere. This natural process helps reduce the amount of CO₂ in the air, but it also produces an important change in seawater: the ocean becomes more acidic.",
   "Ocean acidification is a gradual change in the chemistry of seawater. It happens when increasing amounts of carbon dioxide enter the ocean. When CO₂ dissolves in seawater, it reacts with water and produces carbonic acid. This chemical reaction reduces the pH of the water. The change may seem small, but even a small change in pH can affect marine organisms.",
   "Human activities have increased the amount of carbon dioxide in the atmosphere. The burning of coal, oil, and natural gas releases CO₂ into the air. Some of this carbon dioxide remains in the atmosphere, while a significant amount is absorbed by the ocean. In this way, the ocean acts as a kind of carbon sink, taking carbon dioxide from the atmosphere and storing it in seawater.",
   "However, there is a cost to this process. As more CO₂ enters the ocean, the chemistry of seawater changes. One important consequence is a reduction in the availability of carbonate ions. These ions are essential for many marine organisms because they use them, together with calcium, to build shells and other hard structures.",
   "Animals such as oysters, clams, mussels, and some types of plankton depend on calcium carbonate to build and maintain their shells. Corals also use calcium carbonate to create the structures that form coral reefs. When there are fewer carbonate ions available, these organisms may have greater difficulty building their shells or skeletons.",
   "This does not mean that every marine organism will immediately disappear as ocean acidification increases. Marine ecosystems are complex, and different species respond to changes in their environment in different ways. Some organisms may be more sensitive than others. Scientists therefore study ocean chemistry and marine life to understand which species are most vulnerable and how ecosystems may change over time.",
   "Ocean acidification can also affect people. Many coastal communities depend on fishing and shellfish farming for food and income. If changes in ocean chemistry make it more difficult for certain shellfish to grow or survive, the effects can reach beyond the animals themselves. Fishermen, farmers, businesses, and communities may also be affected.",
   "Scientists are continuing to study these changes and possible ways to respond to them. One important approach is to reduce the amount of carbon dioxide released into the atmosphere. Better understanding of ocean chemistry can also help communities prepare for changes that are already occurring.",
   "The ocean has always been part of the Earth's carbon cycle, but human activities have changed the amount of carbon entering this system. Understanding ocean acidification helps us see how changes in one part of the planet can affect many others. The chemistry of the ocean may seem distant from everyday life, but it is closely connected to marine ecosystems, human communities, and the global environment."
  ],
  "orden": 2,
  "preguntas": [
   {
    "enunciado": "What is the main idea of the passage?",
    "opciones": [
     "Oceans are becoming warmer because marine animals produce carbon dioxide.",
     "Ocean acidification is a chemical change caused by increasing CO₂ that can affect marine ecosystems and people.",
     "Marine organisms are responsible for most of the carbon dioxide found in the atmosphere.",
     "Scientists have discovered that all marine species are equally affected by changes in ocean chemistry."
    ],
    "habilidad": "Main idea",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "According to the passage, what happens when carbon dioxide dissolves in seawater?",
    "opciones": [
     "It increases the amount of oxygen in the water.",
     "It removes calcium from marine organisms.",
     "It reacts with water and produces carbonic acid.",
     "It prevents the ocean from absorbing additional carbon dioxide."
    ],
    "habilidad": "Specific information",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "What does the expression \"carbon sink\" mean in paragraph 3?",
    "opciones": [
     "A place where carbon dioxide is produced",
     "A system that absorbs and stores carbon",
     "A chemical substance that destroys carbon",
     "A process that changes carbon into oxygen"
    ],
    "habilidad": "Vocabulary in context",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Why are carbonate ions important to many marine organisms?",
    "opciones": [
     "They help organisms produce oxygen.",
     "They protect organisms from changes in temperature.",
     "They are necessary for building shells and other hard structures.",
     "They prevent carbon dioxide from entering the ocean."
    ],
    "habilidad": "Specific information",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "Which of the following organisms is mentioned as depending on calcium carbonate?",
    "opciones": [
     "Dolphins",
     "Sea turtles",
     "Oysters",
     "Seabirds"
    ],
    "habilidad": "Supporting detail",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "What can be inferred from paragraph 6?",
    "opciones": [
     "All marine species will respond to ocean acidification in exactly the same way.",
     "Scientists need to study individual species because their responses to environmental changes may differ.",
     "Marine ecosystems are too simple to be affected by changes in ocean chemistry.",
     "Ocean acidification only affects animals that live near the surface."
    ],
    "habilidad": "Inference",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "In the sentence \"This does not mean that every marine organism will immediately disappear…\", what does \"This\" refer to?",
    "opciones": [
     "The complexity of marine ecosystems",
     "The fact that carbonate ions are essential",
     "The possibility that some organisms may be affected by ocean acidification",
     "The study of ocean chemistry"
    ],
    "habilidad": "Reference",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "According to the passage, why can ocean acidification affect coastal communities?",
    "opciones": [
     "Coastal communities produce most of the world's carbon dioxide.",
     "Many coastal communities depend on fishing and shellfish farming.",
     "Ocean acidification causes all coastal areas to become uninhabitable.",
     "Scientists have stopped studying marine ecosystems."
    ],
    "habilidad": "Cause / effect",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Which statement is NOT supported by the passage?",
    "opciones": [
     "Human activities have increased atmospheric CO₂.",
     "The ocean absorbs part of the CO₂ in the atmosphere.",
     "Some marine organisms may have difficulty building shells when carbonate ions become less available.",
     "Scientists have determined that ocean acidification affects every marine species in the same way."
    ],
    "habilidad": "Evaluation of information",
    "correcta": 3,
    "justificacion": ""
   },
   {
    "enunciado": "What is the author's main purpose in writing the passage?",
    "opciones": [
     "To persuade readers to stop eating seafood",
     "To describe the causes and possible consequences of ocean acidification",
     "To compare different types of marine animals",
     "To explain how fishermen can increase shellfish production"
    ],
    "habilidad": "Author's purpose",
    "correcta": 1,
    "justificacion": ""
   }
  ],
  "instrucciones": ""
 },
 {
  "id": "renewable-energy",
  "titulo": "The Shift Toward Renewable Energy: A High School Student Perspective",
  "seccion": "DOMINABACH — Reading Exercise",
  "academia": "Academia de Inglés · Bachillerato",
  "fuente": "Dominabach_Reading_Exercise.docx",
  "minutos": 20,
  "numerar": true,
  "parrafos": [
   "In recent years, climate change has transformed from an abstract concept into a daily reality for youth around the globe. High school students, in particular, are showing unprecedented interest in environmental science and sustainable technology. As global temperatures rise and extreme weather events become more frequent, young people are advocating for rapid transitions to clean, renewable energy sources such as solar, wind, and geothermal power.",
   "Solar power has emerged as one of the most accessible green technologies. Modern photovoltaic solar panels convert sunlight directly into electricity without generating greenhouse gases. Schools in several urban regions have begun installing solar arrays on their rooftops. This initiative not only reduces operational electricity costs for educational institutions but also serves as an interactive, real-time laboratory for physics and environmental science classes.",
   "However, the transition to 100% renewable energy presents technical and economic challenges. Intermittency remains the primary obstacle: solar panels cannot produce energy at night, and wind turbines rely on unpredictable weather conditions. To address this issue, engineers are developing advanced battery storage systems, such as lithium-ion and flow batteries, which store excess electricity generated during peak production hours for later use.",
   "Furthermore, economic factors play a crucial role. Although the cost of manufacturing solar panels has decreased by over 80% in the last decade, the initial installation of renewable infrastructure still requires significant capital investment. Opponents often argue that fossil fuels remain more reliable and cheaper in the short term. Nonetheless, environmental economists emphasize that long-term savings and ecological protection far outweigh initial expenses.",
   "Ultimately, achieving a sustainable future requires both technological innovation and active civic engagement. Teenagers today are not merely passive observers of environmental degradation; they are organizing school green clubs, participating in community recycling projects, and encouraging local government leaders to invest in green infrastructure. Education empowers young citizens to drive meaningful ecological progress."
  ],
  "orden": 3,
  "preguntas": [
   {
    "enunciado": "What is the main topic of the text?",
    "opciones": [
     "The historical development of traditional fossil fuels",
     "The adoption of renewable energy and youth engagement",
     "The financial advantages of installing school solar panels"
    ],
    "habilidad": "Comprensión global / Idea principal",
    "correcta": 1,
    "justificacion": "El texto aborda tanto la adopción de energías renovables como el papel activo e interés de los estudiantes de bachillerato ante el cambio climático (Párrafos 1 y 5)."
   },
   {
    "enunciado": "According to Paragraph 1, why are young people advocating for clean energy sources?",
    "opciones": [
     "Because extreme weather events and global temperatures are increasing",
     "Because high school science textbooks strictly require clean energy projects",
     "Because traditional energy sources have become completely unavailable"
    ],
    "habilidad": "Comprensión específica / Detalle",
    "correcta": 0,
    "justificacion": "El Párrafo 1 lo menciona explícitamente: conforme suben las temperaturas y los eventos climáticos extremos son más frecuentes, los jóvenes abogan por energías limpias."
   },
   {
    "enunciado": "According to Paragraph 2, how do rooftop solar panels benefit schools?",
    "opciones": [
     "They completely eliminate the need for electricity bills and teachers",
     "They reduce electricity expenses and provide a practical educational tool",
     "They produce greenhouse gases that can be analyzed in chemistry classes"
    ],
    "habilidad": "Comprensión específica / Detalle",
    "correcta": 1,
    "justificacion": "El Párrafo 2 destaca dos beneficios: reduce los costos operativos de electricidad y sirve como un laboratorio interactivo en tiempo real."
   },
   {
    "enunciado": "The word \"intermittency\" in Paragraph 3 refers to the fact that clean energy:",
    "opciones": [
     "is available constantly throughout every hour of the day",
     "is not generated continuously due to weather or night hours",
     "requires very low maintenance and zero financial costs"
    ],
    "habilidad": "Vocabulario en contexto",
    "correcta": 1,
    "justificacion": "El término se explica en el Párrafo 3 al mencionar que los paneles no producen energía de noche y las turbinas dependen del clima imprevisto."
   },
   {
    "enunciado": "What solution do engineers propose in Paragraph 3 to solve energy storage issues?",
    "opciones": [
     "Building additional fossil fuel power plants near urban schools",
     "Utilizing advanced battery systems to store excess electricity",
     "Stopping electricity usage completely during nighttime hours"
    ],
    "habilidad": "Comprensión específica / Solución",
    "correcta": 1,
    "justificacion": "El Párrafo 3 afirma que los ingenieros desarrollan sistemas avanzados de baterías para almacenar el exceso de energía."
   },
   {
    "enunciado": "According to Paragraph 4, by how much has the manufacturing cost of solar panels decreased in the past decade?",
    "opciones": [
     "Over 80%",
     "Exactly 50%",
     "Less than 20%"
    ],
    "habilidad": "Localización de información explícita",
    "correcta": 0,
    "justificacion": "El Párrafo 4 señala que el costo de fabricación de paneles solares ha bajado más de 80% en la última década."
   },
   {
    "enunciado": "What argument do opponents of renewable energy present in Paragraph 4?",
    "opciones": [
     "Renewable energy infrastructure is completely impossible to build",
     "Fossil fuels are cheaper and more reliable in the short term",
     "Solar energy causes more environmental damage than coal"
    ],
    "habilidad": "Comprensión específica / Argumento",
    "correcta": 1,
    "justificacion": "El Párrafo 4 indica que los opositores argumentan que los combustibles fósiles son más confiables y baratos a corto plazo."
   },
   {
    "enunciado": "The word \"empowers\" in Paragraph 5 is closest in meaning to:",
    "opciones": [
     "restricts",
     "enables",
     "ignores"
    ],
    "habilidad": "Vocabulario en contexto / Sinónimos",
    "correcta": 1,
    "justificacion": "'Empowers' significa dar poder o capacitar a alguien. En el contexto de la frase, el sinónimo más adecuado es 'enables' (permite/capacita)."
   },
   {
    "enunciado": "What is the author's tone regarding the role of teenagers in environmental protection?",
    "opciones": [
     "Skeptical and critical",
     "Positive and encouraging",
     "Neutral and indifferent"
    ],
    "habilidad": "Inferencia / Actitud y tono",
    "correcta": 1,
    "justificacion": "El autor resalta el liderazgo, la participación activa y el impacto positivo de los jóvenes, manteniendo un tono optimista y alentador."
   },
   {
    "enunciado": "Which of the following can be inferred from the passage?",
    "opciones": [
     "High school students are taking an active role in pushing for sustainable solutions",
     "Fossil fuels will be completely replaced by solar energy within the next year",
     "Solar panels work with maximum efficiency during heavy storms and at night"
    ],
    "habilidad": "Inferencia global",
    "correcta": 0,
    "justificacion": "A lo largo del texto, especialmente en los Párrafos 1 y 5, se infiere que los estudiantes de nivel medio superior están asumiendo un rol proactivo frente a los retos ambientales."
   }
  ],
  "instrucciones": ""
 },
 {
  "id": "vaccines",
  "titulo": "Vaccines, Shots That Protect You",
  "seccion": "Reactivos de Comprensión Lectora",
  "academia": "Academia de Inglés · Preparación CENEVAL",
  "fuente": "Neunez M, Goldman M, Goldman S y Lambert P-H (2019). Front. Young Minds 7:31.",
  "minutos": 8,
  "numerar": true,
  "parrafos": [
   "Tomorrow, your mother will take you to the doctor to receive your vaccines. Why do you need these shots since you are healthy and have already received some shots when you were just a baby? In this article, you will discover the reasons why booster vaccines are crucial, to protect you, your brothers and sisters but also your classmates and your friends.",
   "While medicines are usually given to a person who is sick, vaccines are injected to healthy children or adults to keep them from getting diseases that are transmitted by tiny living organisms named microbes. Vaccination is the best way to date to prevent diseases that are called infectious diseases.",
   "When your grandparents were your age, many children suffered from measles, a disease caused by a virus. Most often, they would heal from it, but sometimes, the disease caused serious complications, involving the lungs or the brain, that could be deadly. Thanks to vaccination, measles nearly disappeared completely. This is also the case for several other childhood illnesses, such as poliomyelitis that caused paralysis of the legs. To date, we count more than 10 infectious diseases that are prevented thanks to vaccines. Unfortunately, not all children have the chance to be vaccinated: either because they live in areas of the world where vaccines are not available or difficult to access, or because their parents are against vaccination.",
   "When you are vaccinated, not only are you protected against the microbe, but you also decrease the risk of transmitting that disease to your friends and family. This is called herd protection. If the majority of the population is vaccinated, microbes will not succeed in propagating. It is believed that when 9 individuals out of 10 are vaccinated, the entire population is protected so that the disease becomes \"invisible\". However, the disease can resurface at any point if the proportion of vaccinated individuals decreases. Sadly, this is what is happening today with measles and other infectious diseases: within the first 6 months of the year 2018, more than 40,000 Europeans contracted measles while some thought that it had disappeared for good.",
   "As each microbe is different from the other, multiple vaccines have to be used. Do not worry, it is now common to give multiple vaccines in a single shot. You probably ask yourself: why do I have to receive several times the same vaccine in the course of my life? The answer is simple. As you know, our memory has its limitations and we have the tendency to forget things. This is also true for our immune system. It is therefore necessary to boost its memory by repeating vaccination. Boosters are indeed crucial to maintain effective protection against infectious diseases."
  ],
  "orden": 4,
  "preguntas": [
   {
    "enunciado": "What is the main communicative purpose of the text?",
    "opciones": [
     "To inform readers about how vaccines work and explain the necessity of booster shots",
     "To persuade governments to make vaccinations mandatory for all school students",
     "To describe the historical medical discoveries that eradicated childhood infections"
    ],
    "habilidad": "Propósito comunicativo",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "According to paragraph [II], how do vaccines differ from conventional medicines?",
    "opciones": [
     "Vaccines are exclusively applied to treat people suffering from acute bacterial infections",
     "Vaccines are administered to healthy people to prevent diseases caused by microbes",
     "Vaccines are designed to heal severe brain complications after a patient gets sick"
    ],
    "habilidad": "Comprensión específica",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Based on paragraph [IV], herd protection is achieved when...",
    "opciones": [
     "at least 9 out of 10 people in a community receive the vaccination",
     "more than 40,000 infected patients are quarantined at the same time",
     "every single person in a nation becomes immune without needing booster shots"
    ],
    "habilidad": "Localización de información",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "According to paragraph [V], why do individuals require booster shots throughout their lives?",
    "opciones": [
     "Because vaccines expire inside the body after exactly six months of administration",
     "Because the immune system's memory fades over time and needs to be reinforced",
     "Because one single dose can only carry protection against one type of virus"
    ],
    "habilidad": "Comprensión específica / Causa",
    "correcta": 1,
    "justificacion": ""
   }
  ],
  "instrucciones": ""
 },
 {
  "id": "decisions",
  "titulo": "The Science of Making Good Decisions",
  "seccion": "Reactivos de Comprensión Lectora",
  "academia": "Academia de Inglés · Preparación CENEVAL",
  "fuente": "Dayan P y Raphael O (2026). Front. Young Minds 14:1699853.",
  "minutos": 8,
  "numerar": true,
  "parrafos": [
   "What made you start reading this article? Was it a desire to learn about how people make decisions, or was it just a feeling that you could not put into words? And how did you choose what to wear this morning for school? In the study of decision making, we try to understand and model the brain mechanisms that are involved. In this article, we will explain how your brain makes decisions and share some tricks on how you can become a better decision maker in your daily life.",
   "Decision making is one of the most critical things that people do. On a basic level, people must make good decisions to survive. Good decisions also help people to live prosperous, satisfying lives. The great importance of decision making is also reflected in the brain, where much of this organ is devoted to the process. Many systems and brain regions participate in decision making, including those associated with memory, planning, emotions, and action control. Due to the great complexity of decision making, scientists have not yet found a complete \"circuit\" in the brain that allows them to explain exactly how a particular decision was made.",
   "Most of the decisions people make are not fully conscious. Even some of the choices you believe you make deliberately often have unconscious roots. Take buying a car: there are many factors to consider, such as looks, speed, safety, fuel efficiency, environmental impact, and comfort. In reality, people usually focus on just one or at most a couple of factors at a time—like speed and comfort—and base their choice on those, without integrating them fully. This probably reflects an unconscious bias, meaning a preference that the person is not even aware of.",
   "Despite the complexity of the decision-making process, the brain has what is, at least at first sight, a surprisingly simple and straightforward mechanism that influences decision making. You can think of this mechanism sort of like the \"carrot and stick\" strategy of the brain, which makes people repeat decisions that have beneficial outcomes and reduce decisions with undesired outcomes. This mechanism involves a substance called dopamine.",
   "Dopamine is a chemical messenger used as a signal that teaches us how to make better choices. To manage in the world, your brain must constantly make predictions about the consequences of your actions. So, for every action you do, your brain \"guesses\" what the action's outcome will be. Many times, there is a difference between what the brain predicted would happen and what really happened. This gap is called a prediction error. When things turn out better than you expected—which is called a positive prediction error—you experience a burst of dopamine (the \"carrot\"). This makes you repeat the same action again. If, on the other hand, things turn out worse than expected and you experience a negative prediction error (the \"stick\"), you will feel discouraged and lower your expectations."
  ],
  "orden": 5,
  "preguntas": [
   {
    "enunciado": "What is the main purpose of the text?",
    "opciones": [
     "To explain how the brain processes choices and the role dopamine plays in learning from outcomes",
     "To describe how marketing strategies exploit human brain circuits when selling vehicles",
     "To prove that human beings are incapable of making logical decisions without professional guidance"
    ],
    "habilidad": "Propósito comunicativo",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "According to paragraph [II], why haven't scientists fully identified an exact neural circuit for individual choices?",
    "opciones": [
     "Because decision making involves an immense complexity spanning multiple brain regions and systems",
     "Because the brain stops producing chemical signals when facing complex choices",
     "Because decisions are entirely random and fail to leave any measurable biological traces"
    ],
    "habilidad": "Comprensión específica / Causa",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "The car-buying example in paragraph [III] demonstrates that...",
    "opciones": [
     "consumers invariably compare every single vehicle specification before deciding",
     "choices often depend on unconscious biases that prioritize only a few isolated features",
     "safety is consistently chosen by buyers as the single most critical factor"
    ],
    "habilidad": "Inferencia",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "According to paragraph [V], a \"positive prediction error\" occurs when...",
    "opciones": [
     "a person chooses not to anticipate the consequences of a hazardous situation",
     "the actual outcome of an action turns out to be superior to what the brain expected",
     "dopamine release drops substantially after an unexpected failure in an exam"
    ],
    "habilidad": "Vocabulario en contexto",
    "correcta": 1,
    "justificacion": ""
   }
  ],
  "instrucciones": ""
 },
 {
  "id": "bacteria",
  "titulo": "Bacteria: The Unexpected Fans of Greenhouse Gases",
  "seccion": "Reactivos de Comprensión Lectora",
  "academia": "Academia de Inglés · Preparación CENEVAL",
  "fuente": "Núñez-Valenzuela P, Ovis-Sánchez JO y Razo-Flores E (2026). Front. Young Minds 14:1653389.",
  "minutos": 8,
  "numerar": true,
  "parrafos": [
   "Greenhouse gases such as carbon dioxide (CO₂) help keep the Earth warm enough for us to live. But when there is too much CO₂ in the air, the Earth can be too hot, causing problems for all living organisms. Plants can take in some of the CO₂, but there is not enough vegetation to use up all the excess greenhouse gases. Fortunately, scientists have found a surprising solution: homoacetogenic bacteria. These incredible organisms live in places with no oxygen, like in soil, wetlands, or even in animal stomachs. Homoacetogenic bacteria are tiny heroes that can help clean up CO₂ by using it in combination with hydrogen (H₂) to grow and make fuel-like substances such as acetate and ethanol. By learning more about these bacteria and their abilities, scientists hope to find ways to use them to fight climate change and create sustainable energy sources.",
   "Our planet is surrounded by gases that act like car windows, letting sunlight in while keeping some of the heat inside. These are the greenhouse gases, and they keep our planet warm by holding some of the Sun's heat. Without them, our planet would be freezing, and it would be too cold for people, animals, and plants to survive. However, while greenhouse gases are fine in moderation, they are harmful in excess. When there are too many of them, they trap in too much heat and make Earth warmer than it should be. This process is known as the greenhouse effect, and it can have serious consequences for our planet. Even a couple of degrees increase from normal temperature can cause problems such as droughts, melting ice in the Arctic, rising sea levels, and longer heat waves.",
   "The main greenhouse gases are carbon dioxide (CO₂), methane (CH₄), and nitrous oxide (N₂O). CO₂ is the most famous because it comes from burning things like coal, oil, and gas to make electricity, run cars, and power factories. Earth has a natural solution: plants transform CO₂ into oxygen via photosynthesis. However, plants cannot remove enough CO₂ from the air because humans have reduced the amount of vegetation. Fortunately, scientists have found tiny organisms besides plants that can help reduce CO₂ levels and lighten the greenhouse effect.",
   "Some bacteria are so unique that they can survive without oxygen! Instead, to get energy, they replace oxygen with other environmental chemicals. Among the many types of bacteria that can live without oxygen, there is a special group called homoacetogenic bacteria. These tiny organisms turn out to be unexpected fans of greenhouse gases because they can use CO₂ and hydrogen (H₂) to grow and produce other chemicals. When scientists locate a possible source of homoacetogenic bacteria, they go on a bacteria treasure hunt. Instead of searching lake bottoms or other places that are difficult to access, they look in simple locations like livestock poop and wastewater treatment plants.",
   "These bacteria need more than CO₂ to survive. They also need a special energy source to power up, making H₂ a perfect match. Think of it like this: CO₂ is their meal, but H₂ is the fuel that helps them turn CO₂ into something useful. An easy way to get a mix of CO₂ and H₂ gases is by using a waste gas called syngas. Syngas is made by heating plant residues without burning them, in a controlled industrial process. When homoacetogenic bacteria are supplied with syngas, they transform CO₂ and H₂ into useful substances such as acetate and ethanol in a process called syngas fermentation. Acetate gives vinegar its sour taste, but it is also used to make fuel and other materials in factories. Ethanol is a type of alcohol that helps power cars and other machines."
  ],
  "orden": 6,
  "preguntas": [
   {
    "enunciado": "What is the main purpose of the text?",
    "opciones": [
     "To explain how homoacetogenic bacteria convert greenhouse gases into useful biofuels and chemical products",
     "To describe the engineering steps needed to build wastewater treatment facilities in rural areas",
     "To prove that natural photosynthesis by plants is completely ineffective at capturing carbon dioxide"
    ],
    "habilidad": "Propósito comunicativo",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "According to paragraph [III], why is natural plant photosynthesis insufficient to handle current carbon dioxide levels?",
    "opciones": [
     "Because agricultural crops have completely lost their capacity to release clean oxygen",
     "Because human activity has significantly diminished the global amount of vegetation",
     "Because carbon dioxide has been entirely replaced in the atmosphere by methane and nitrous oxide"
    ],
    "habilidad": "Comprensión específica / Causa",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "According to paragraph [IV], why do scientists prefer sampling livestock manure and wastewater over lake bottoms?",
    "opciones": [
     "Because these are practical and accessible environments that naturally lack oxygen",
     "Because the bacteria found in deep lakes are unable to consume hydrogen gas",
     "Because syngas is naturally generated inside wastewater treatment filters"
    ],
    "habilidad": "Comprensión específica",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "Based on paragraph [V], what role does hydrogen (H₂) play in syngas fermentation?",
    "opciones": [
     "It acts as an oxygen supplier to prevent bacterial cells from dying",
     "It serves as a disinfectant that purifies vinegar and removes excess ethanol",
     "It provides the essential energy that enables bacteria to process carbon dioxide"
    ],
    "habilidad": "Comprensión específica / Función",
    "correcta": 2,
    "justificacion": ""
   }
  ],
  "instrucciones": ""
 },
 {
  "id": "value-of-disconnecting",
  "titulo": "The Value of Disconnecting",
  "seccion": "DOMINABACH — Reading Exercise",
  "academia": "Academia de Inglés",
  "fuente": "DOMINABACH_REVIEW.docx",
  "minutos": 20,
  "numerar": true,
  "instrucciones": "Read the following text carefully and choose the correct answer for each question.",
  "parrafos": [
   "Over the past few years, smartphones have become an important part of everyday life. People use them to communicate, study, work, find information, and have fun. However, having constant access to these devices can sometimes make it difficult to concentrate on one activity at a time.",
   "Some people check their messages while they are studying, eating, or even talking to other people. Although these actions may seem insignificant, constantly interrupting an activity can make it take longer to finish. In addition, receiving notifications throughout the day can create the habit of checking the phone even when there is no important message.",
   "For this reason, some experts recommend having periods of the day without electronic devices. This does not necessarily mean giving up technology. Instead, it means learning to use it more consciously. For example, a person could turn off notifications for an hour while studying or leave their phone outside the bedroom before going to sleep.",
   "Disconnecting for short periods can also encourage activities that require more attention, such as reading, having a conversation, walking, or simply resting. Technology offers many advantages, but taking advantage of these benefits does not mean that we have to be available all the time."
  ],
  "orden": 11,
  "preguntas": [
   {
    "enunciado": "What is the main idea of the text?",
    "opciones": [
     "Smartphones should no longer be used.",
     "Technology has advantages, but it is important to have periods of time without it.",
     "People mainly use smartphones for entertainment.",
     "Notifications are necessary for good communication."
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "According to the text, what can happen when a person constantly interrupts an activity?",
    "opciones": [
     "They can finish it faster.",
     "They can improve their concentration.",
     "They may need more time to complete it.",
     "They may learn to use technology better."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "Which of the following is mentioned as an example of using technology more consciously?",
    "opciones": [
     "Buying a phone with more applications.",
     "Checking messages during meals.",
     "Keeping all notifications turned on.",
     "Turning off notifications while studying."
    ],
    "habilidad": "",
    "correcta": 3,
    "justificacion": ""
   },
   {
    "enunciado": "In the second paragraph, what does “these actions” refer to?",
    "opciones": [
     "Studying and working.",
     "Communicating and having fun.",
     "Checking messages while doing other activities.",
     "Finding information online."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "What is the author's main purpose?",
    "opciones": [
     "To explain some effects of constant phone use and suggest using technology more consciously.",
     "To prove that smartphones are harmful to everyone.",
     "To convince readers to buy a smartphone.",
     "To describe the different functions of modern smartphones."
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "What can be inferred from the text?",
    "opciones": [
     "Using technology always decreases productivity.",
     "People do not need smartphones.",
     "Setting limits can help people use technology more effectively.",
     "Notifications always contain important information."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "In the context of the text, the word “encourage” is closest in meaning to:",
    "opciones": [
     "prevent",
     "promote",
     "replace",
     "change"
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Which statement is supported by the text?",
    "opciones": [
     "Technology only has negative effects.",
     "Everyone checks their phone while eating.",
     "Disconnecting occasionally can help people focus on activities that require attention.",
     "Turning off your phone all day is the best solution."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "How is the information in the text mainly organized?",
    "opciones": [
     "A problem is presented, some consequences are explained, and an alternative is suggested.",
     "Instructions for using a smartphone are presented.",
     "Events are described in chronological order.",
     "Two different types of smartphones are compared."
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "Which would be the best alternative title for the text?",
    "opciones": [
     "The History of Smartphones",
     "How to Buy a New Phone",
     "Technology: Learning to Set Limits",
     "The Most Popular Smartphone Applications"
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   }
  ]
 },
 {
  "id": "repair-cafes",
  "titulo": "The Places Where Broken Things Get a Second Chance",
  "seccion": "DOMINABACH — Reading Exercise",
  "academia": "Academia de Inglés",
  "fuente": "Reading_DOMINA_BACH_Carla_A.docx",
  "minutos": 20,
  "numerar": true,
  "instrucciones": "Read the following text and choose the correct answer for each question.",
  "parrafos": [
   "In many cities, people throw away objects that could still be useful. A lamp stops working, a bicycle gets a flat tire, or a small electronic device suddenly refuses to turn on. For many people, the easiest solution is to buy a new one. However, a different idea is becoming popular in communities around the world: repair cafés.",
   "A repair café is a place where people bring broken objects and try to fix them with the help of volunteers. These volunteers may know how to repair bicycles, clothes, furniture, electronic devices, or household objects. Visitors usually do not simply leave their things and wait for someone else to repair them. Instead, they work together with the volunteer and learn how to do the repair themselves.",
   "The first repair café was created in Amsterdam in 2009 by Martine Postma. She wanted to create a place where people could learn practical skills and meet others in their community. The idea quickly attracted attention, and similar places began appearing in other countries.",
   "Repair cafés have several benefits. First, they can help reduce waste. When people repair an object instead of throwing it away, that object can continue to be used. This means fewer things end up in landfills. It can also reduce the number of new products that need to be manufactured.",
   "Second, repair cafés can help people save money. Buying a new product is sometimes more expensive than repairing an old one. A person who learns to repair a bicycle, for example, may be able to fix it several times instead of paying for a new bicycle every few years.",
   "There is also a social benefit. People who attend repair cafés often meet neighbors they did not know before. An older person with years of experience repairing machines may teach a younger person how to use a tool. In another case, someone who knows how to sew may help a neighbor repair a jacket. In this way, knowledge is shared between generations.",
   "However, repair cafés cannot fix everything. Some objects require special equipment or professional knowledge. Electronic devices, for example, can sometimes be dangerous to open. For this reason, volunteers may recommend taking certain objects to a professional repair service.",
   "Even with these limitations, the idea continues to grow. Repair cafés are not only about fixing broken objects. They also encourage people to think differently about the things they own. Instead of asking, “How can I replace this?”, people may begin to ask, “Can I repair it, learn something, and give it another chance?”"
  ],
  "orden": 12,
  "preguntas": [
   {
    "enunciado": "What is the main purpose of the text?",
    "opciones": [
     "To explain why people should stop buying electronic devices.",
     "To describe what repair cafés are and explain some of their benefits.",
     "To compare different types of cafés in cities around the world.",
     "To explain how to become a professional repair technician."
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "According to the text, what do people usually do at a repair café?",
    "opciones": [
     "Leave their broken objects with professionals.",
     "Buy inexpensive replacement products.",
     "Work with volunteers to repair their objects and learn new skills.",
     "Exchange old objects for new ones."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "Why did Martine Postma create the first repair café?",
    "opciones": [
     "She wanted to sell recycled products.",
     "She wanted to create a place for learning and community interaction.",
     "She wanted to open a business for professional mechanics.",
     "She wanted to teach people how to build electronic devices."
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "What does the word “This” refer to in the following sentence?\n“When people repair an object instead of throwing it away, that object can continue to be used. This means fewer things end up in landfills.”",
    "opciones": [
     "Buying a new product",
     "Repairing an object",
     "Manufacturing products",
     "Visiting a repair café"
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "What can be inferred about repair cafés from the text?",
    "opciones": [
     "They are useful only for people who already know how to repair things.",
     "Their main purpose is to provide free professional services.",
     "They can help people develop practical skills while interacting with others.",
     "They are replacing professional repair services in most cities."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "According to the text, how can repair cafés help people financially?",
    "opciones": [
     "They teach people how to manufacture products.",
     "They allow people to sell their broken objects.",
     "They can help people avoid buying new products unnecessarily.",
     "They provide money to people who volunteer."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "What does the example about the older person and the younger person illustrate?",
    "opciones": [
     "The difficulty of learning to use tools.",
     "The importance of professional training.",
     "How knowledge can be shared between generations.",
     "Why young people prefer electronic devices."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "Why might a volunteer recommend taking an object to a professional?",
    "opciones": [
     "The object may be too expensive to repair.",
     "The object may require special equipment or knowledge.",
     "The visitor may not want to learn how to repair it.",
     "Professional services are always faster."
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "What is the author's attitude toward repair cafés?",
    "opciones": [
     "Mostly positive, while recognizing some limitations.",
     "Completely negative because they cannot repair everything.",
     "Neutral because there is not enough information about them.",
     "Negative because they encourage people to keep old objects."
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "Which statement best expresses the message of the last paragraph?",
    "opciones": [
     "People should never replace broken objects.",
     "Repairing objects can change the way people think about consumption.",
     "People need to learn professional repair skills before buying anything.",
     "Repair cafés are mainly designed to reduce the cost of products."
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   }
  ]
 },
 {
  "id": "millennial-burnout",
  "titulo": "Millennial Burnout",
  "seccion": "DOMINA — Práctica de Reading Comprehension",
  "academia": "Academia de Inglés",
  "fuente": "Reading_practiced_domina.docx",
  "minutos": 20,
  "numerar": true,
  "instrucciones": "Read the next article and choose the correct answers below.",
  "parrafos": [
   "Do you ever find yourself working 24/7? Do you find it hard to relax? Many young people today admit they don’t know how to relax. Their mind is constantly occupied with endless to-do lists due to constant pressures. Moreover, they are often invaded by feelings of guilt when they are not using their time productively. In the worst cases, these feelings can lead to anxiety, depression, and sleep problems. Collectively, these symptoms point towards something called burnout. Although not currently a recognized medical condition, burnout is extreme stress suffered over a prolonged length of time that can cause physical and emotional exhaustion. Worryingly, it is much more common among millennials than you might have realized.",
   "Today the term millennial burnout has been coined to refer to the kind of burnout experienced by younger generations. It has been suggested that it stems from the habit of being connected around the clock. Many young people now have no down time. They take their laptop home at night. They constantly check their messages. They are always available. Although this may be good for employers, it means the line between work and life becomes blurred, which isn’t healthy.",
   "While the WHO defines burnout as an occupational phenomenon, psychotherapists and psychologists have proposed other causes for the kind experienced by millennials. They claim it can be brought about by over expectations from people around you. Whereas previous generations only had to contend with measuring themselves against their parents or siblings, now, because of social media, people feel under constant pressure to project a perfect life. Many feel like they have failed if they do any less than that. Yet, being that person who works out by 5 a.m., who makes their own organic smoothies, who looks impeccable in fashionable clothes, and who makes it all look effortless is… exhausting! Is it any wonder so many people are reaching burnout when society puts them under this much pressure?",
   "So, is it possible to escape burnout? The answer is yes, perhaps if you take time off work and make it all stop. But for most people, even after a break, it doesn’t go away completely. Work, chores, and personal life all come calling at some point. The important thing is to find healthy ways to deal with it. Maybe find a therapist or make time to see your friends. Talking to people who are going through a similar thing can help. Millennials may have different problems from those of previous generations, but it doesn’t make them any less valid. Ask too much of anyone at any time in history and they’ll reach a breaking point. We all have our limits, know yours."
  ],
  "orden": 21,
  "preguntas": [
   {
    "enunciado": "What is the main purpose of the text?",
    "opciones": [
     "To explain why millennials work more hours than previous generations.",
     "To describe the causes, effects, and possible ways of dealing with burnout among millennials.",
     "To compare the professional achievements of millennials and older generations.",
     "To explain why social media is the main cause of depression among young people."
    ],
    "habilidad": "Main idea",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "According to the first paragraph, which situation can be a sign of burnout?",
    "opciones": [
     "Feeling motivated to complete daily tasks.",
     "Spending time relaxing after work.",
     "Experiencing anxiety, depression, and sleep problems.",
     "Having a productive daily routine."
    ],
    "habilidad": "Explicit information",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "What does the expression “no down time” mean in the second paragraph?",
    "opciones": [
     "Having no free time to relax.",
     "Having no interest in working.",
     "Having difficulty finding a job.",
     "Having limited access to technology."
    ],
    "habilidad": "Vocabulary in context",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "Why does the text mention that young people constantly check their messages?",
    "opciones": [
     "To show that millennials are more interested in technology than work.",
     "To illustrate how being constantly connected can contribute to burnout.",
     "To explain why millennials communicate better than previous generations.",
     "To demonstrate that social media is necessary in the workplace."
    ],
    "habilidad": "Interpretation",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "What does the phrase “the line between work and life becomes blurred” imply?",
    "opciones": [
     "People are unable to distinguish between their professional and personal lives.",
     "People are spending less time working and more time relaxing.",
     "Employers are becoming less interested in their employees' personal lives.",
     "People are choosing to leave their jobs because of excessive pressure."
    ],
    "habilidad": "Meaning/inference",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "According to the third paragraph, what is one important cause of millennial burnout?",
    "opciones": [
     "A lack of communication with parents and siblings.",
     "The difficulty of finding employment.",
     "The pressure to meet unrealistic expectations and project a perfect life.",
     "The need to work fewer hours than previous generations."
    ],
    "habilidad": "Explicit information",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "What can be inferred about the role of social media in millennial burnout?",
    "opciones": [
     "It allows people to avoid comparing themselves with others.",
     "It can increase pressure because people feel they must present a perfect life.",
     "It has eliminated the differences between millennials and previous generations.",
     "It encourages people to spend more time relaxing and less time working."
    ],
    "habilidad": "Inference",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "In the context of the text, what does “breaking point” most likely mean?",
    "opciones": [
     "A moment when a person decides to change careers.",
     "A situation in which a person reaches the limit of the stress they can tolerate.",
     "A period when people stop using social media.",
     "A moment when employers reduce their employees' responsibilities."
    ],
    "habilidad": "Vocabulary in context",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Which action does the author suggest as a healthy way to deal with burnout?",
    "opciones": [
     "Working harder to finish all responsibilities.",
     "Avoiding friends and spending more time alone.",
     "Talking to a therapist or spending time with friends.",
     "Staying connected to work throughout the day."
    ],
    "habilidad": "Explicit information",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "Which statement best expresses the author's conclusion?",
    "opciones": [
     "Millennials should stop using technology to prevent burnout.",
     "Burnout is a problem that only affects younger generations.",
     "People should recognize their own limits and find healthy ways to manage stress.",
     "Taking a short break from work is enough to completely eliminate burnout."
    ],
    "habilidad": "Conclusion / author's message",
    "correcta": 2,
    "justificacion": ""
   }
  ]
 },
 {
  "id": "urban-gardens",
  "titulo": "The Secret Life of Urban Gardens",
  "seccion": "Redacción indirecta (Indirect Writing) — B1",
  "academia": "Academia de Inglés",
  "fuente": "Redacción_Indirecta_Domina.docx",
  "minutos": 10,
  "numerar": false,
  "instrucciones": "Read the following text. Choose the option that correctly completes each numbered space.",
  "parrafos": [
   "In many cities around the world, people are finding creative ways to grow food. One interesting example is the urban garden. These gardens can be found on rooftops, in small parks, or even in empty spaces between buildings. They allow people to grow vegetables and herbs even when they (1) ______ enough space for a traditional garden.",
   "Urban gardens have become popular for several reasons. First, they can provide fresh food for local communities. In some neighborhoods, people work together to grow tomatoes, lettuce, peppers, and other vegetables. This is especially useful in areas (2) ______ fresh food is difficult to find.",
   "Urban gardens can also bring people together. Neighbors who did not know each other before may meet while planting or taking care of the garden. Children can participate too, and they can learn where food comes from. Some schools have created gardens (3) ______ students can learn about plants, nutrition, and the environment.",
   "Another advantage is that urban gardens can help the environment. Plants absorb carbon dioxide and can make cities feel cooler. Gardens can also provide a home for insects such as bees and butterflies. However, creating an urban garden is not always easy. People need to find a suitable place, get the necessary materials, and take care of the plants regularly.",
   "Despite these challenges, urban gardens continue to grow. Some communities have even turned unused areas into productive green spaces. These projects show that a small piece of land (4) ______ make a difference when people work together.",
   "Perhaps the most important lesson is that growing food is not only about producing vegetables. It is also about creating stronger communities and helping people connect with nature. If more people (5) ______ access to urban gardens, cities could become greener and more connected places."
  ],
  "orden": 31,
  "preguntas": [
   {
    "enunciado": "They allow people to grow vegetables and herbs even when they (1) ______ enough space for a traditional garden.",
    "opciones": [
     "don't have",
     "haven't had",
     "aren't having",
     "didn't have"
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "This is especially useful in areas (2) ______ fresh food is difficult to find.",
    "opciones": [
     "which",
     "where",
     "that",
     "what"
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Some schools have created gardens (3) ______ students can learn about plants, nutrition, and the environment.",
    "opciones": [
     "because",
     "although",
     "so that",
     "while"
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "These projects show that a small piece of land (4) ______ make a difference when people work together.",
    "opciones": [
     "can",
     "must",
     "should",
     "would"
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "If more people (5) ______ access to urban gardens, cities could become greener and more connected places.",
    "opciones": [
     "have",
     "had",
     "will have",
     "would have"
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": ""
   }
  ]
 },
 {
  "id": "mock-indirect-writing",
  "titulo": "Mock Test — Indirect Writing in English",
  "seccion": "Redacción indirecta (Indirect Writing) — B1",
  "academia": "Academia de Inglés",
  "fuente": "Indirect writing exercises - Mock test.pdf (simulación de aula, no es examen oficial CENEVAL)",
  "minutos": 25,
  "numerar": false,
  "instrucciones": "Read each question carefully. Choose the option that best completes or improves the text according to meaning, organization, grammar, vocabulary, and communicative purpose.",
  "parrafos": [],
  "orden": 32,
  "preguntas": [
   {
    "enunciado": "Many students find it easier to complete group projects in the classroom because they can ask questions immediately; ________, they can solve problems together.",
    "opciones": [
     "however",
     "therefore",
     "for example"
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": "“Therefore” shows the result of being able to ask questions immediately."
   },
   {
    "enunciado": "The students explained that they ________ more comfortable speaking English after practicing in pairs.",
    "opciones": [
     "felt",
     "feel",
     "have feel"
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": "The reporting verb “explained” is in the past, so “felt” fits the reported statement."
   },
   {
    "enunciado": "The school installed energy-saving lights last year. ________, electricity consumption has decreased.",
    "opciones": [
     "In contrast",
     "Nevertheless",
     "As a result"
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": "“As a result” introduces the consequence of installing energy-saving lights."
   },
   {
    "enunciado": "Before handing in an essay, students should ________ it carefully for grammar, spelling, and punctuation errors.",
    "opciones": [
     "review",
     "replace",
     "invent"
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": "“Review” means to examine something carefully before submitting it."
   },
   {
    "enunciado": "Online learning gives students access to many resources and allows them to study from different locations. However, students still need to organize their time effectively. ________",
    "opciones": [
     "For this reason, online learning should be avoided completely.",
     "For this reason, good time management can make online learning more effective.",
     "For this reason, students no longer need teachers."
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": "The sentence logically connects the benefits of online learning with the need for time management."
   },
   {
    "enunciado": "By the time the teacher arrived, the students ________ the activity instructions.",
    "opciones": [
     "had read",
     "read",
     "have reading"
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": "The reading happened before another past event, so past perfect is appropriate."
   },
   {
    "enunciado": "The school cafeteria added healthier meals after students completed a survey about their eating preferences.",
    "opciones": [
     "The cafeteria removed healthy food after students completed the survey.",
     "Students stopped using the cafeteria because they disliked the survey.",
     "Students' survey responses led the cafeteria to add healthier meals."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": "This option accurately summarizes the cause-and-result relationship in the original statement."
   },
   {
    "enunciado": "Sofia wanted to participate in the English debate. She was nervous about speaking in front of the class.",
    "opciones": [
     "Although she was nervous about speaking in public, she decided to participate.",
     "Because she was nervous, she decided to participate but never wanted to speak.",
     "She refused to participate because she enjoyed speaking in front of the class."
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": "“Although” correctly expresses the contrast between her nervousness and her decision to participate."
   },
   {
    "enunciado": "The study examined whether background music influences students' ability to concentrate. ________",
    "opciones": [
     "The results were totally amazing and proved everything without any limitations.",
     "The results were kind of strange, so the study did not really show anything.",
     "The results indicate that the effect of music may vary according to the task and type of music."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": "This is the most formal and appropriately cautious way to report research findings."
   },
   {
    "enunciado": "The final projects ________ by the teacher at the end of the semester.",
    "opciones": [
     "will evaluate",
     "will be evaluated",
     "are evaluating"
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": "The projects receive the action, so the future passive “will be evaluated” is required."
   },
   {
    "enunciado": "Learning vocabulary requires regular exposure. Students are more likely to remember new words when they use them frequently. ________, daily review can be useful.",
    "opciones": [
     "Meanwhile",
     "For instance",
     "Therefore"
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": "“Therefore” introduces the conclusion that follows from the preceding ideas."
   },
   {
    "enunciado": "Some students prefer working individually because they can organize their time independently. Others prefer teamwork because they can exchange ideas. ________",
    "opciones": [
     "Therefore, the best approach may depend on the students' needs and the purpose of the activity.",
     "However, teamwork means that students never work independently.",
     "For example, all students have exactly the same learning preferences."
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": "The sentence appropriately brings together the two contrasting viewpoints without changing their meaning."
   },
   {
    "enunciado": "The school launched its environmental campaign in 2023, and it ________ an important part of school activities ever since.",
    "opciones": [
     "remained",
     "has remained",
     "is remain"
    ],
    "habilidad": "",
    "correcta": 1,
    "justificacion": "“Ever since” indicates a situation that began in the past and continues to the present, requiring present perfect."
   },
   {
    "enunciado": "A survey showed that 21 of 30 students preferred digital materials, while 9 preferred printed materials.",
    "opciones": [
     "Printed materials were preferred by most students.",
     "Exactly 9 students preferred digital materials.",
     "Most students preferred digital materials to printed materials."
    ],
    "habilidad": "",
    "correcta": 2,
    "justificacion": "21 out of 30 is the majority, so the statement correctly summarizes the survey."
   },
   {
    "enunciado": "Recycling can reduce the amount of waste sent to landfills. It can also help conserve natural resources. For these reasons, ________",
    "opciones": [
     "recycling can contribute to more sustainable communities.",
     "recycling should be avoided whenever possible.",
     "landfills are always the best solution for waste management."
    ],
    "habilidad": "",
    "correcta": 0,
    "justificacion": "The conclusion follows logically from the two environmental benefits mentioned."
   }
  ]
 },
 {
  "id": "gift-of-the-magi",
  "titulo": "The Gift of the Magi (Indirect Speech)",
  "seccion": "Indirect Speech (Reported Speech)",
  "academia": "Academia de Inglés",
  "fuente": "Henry, O. (2005). The gift of the magi. Project Gutenberg. https://www.gutenberg.org/ebooks/7256 (Original work published 1905)",
  "minutos": 10,
  "numerar": false,
  "instrucciones": "Read the excerpt and choose the best answer for each question.",
  "parrafos": [
   "Context: Della has sold her long hair to buy her husband, Jim, a Christmas present. When Jim comes home, he stares at her without saying a word.",
   "\"Jim, darling,\" she cried, \"don't look at me that way. I had my hair cut off and sold because I couldn't have lived through Christmas without giving you a present. It'll grow out again—you won't mind, will you? . . .\"",
   "\"You've cut off your hair?\" asked Jim . . .",
   "\"Cut it off and sold it,\" said Della.",
   "Jim looked about the room curiously.",
   "\"You say your hair is gone?\" he said . . .",
   "\". . . It's sold, I tell you—sold and gone, too.\""
  ],
  "orden": 41,
  "preguntas": [
   {
    "enunciado": "Which sentence best reports Della's words, \"Don't look at me that way\"?",
    "opciones": [
     "Della cried to Jim that he didn't look at her that way.",
     "Della begged Jim not to look at her that way.",
     "Della asked Jim if he didn't look at her that way.",
     "Della begged Jim that he doesn't look at me that way."
    ],
    "habilidad": "Reported speech",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "Which sentence correctly reports Della's explanation, \"I had my hair cut off and sold because I couldn't have lived through Christmas without giving you a present\"?",
    "opciones": [
     "Della explained that she has had her hair cut off and sold because she couldn't have lived through Christmas without giving him a present.",
     "Della explained that I had had my hair cut off and sold because I couldn't have lived through Christmas without giving him a present.",
     "Della explained that she had had her hair cut off and sold because she couldn't have lived through Christmas without giving him a present.",
     "Della explained that she had her hair cut off and sold because she can't live through Christmas without giving you a present."
    ],
    "habilidad": "Reported speech",
    "correcta": 2,
    "justificacion": ""
   },
   {
    "enunciado": "Which sentence correctly reports Jim's question, \"You've cut off your hair?\"",
    "opciones": [
     "Jim asked Della if had she cut off her hair.",
     "Jim asked Della to cut off her hair.",
     "Jim asked Della if you had cut off your hair.",
     "Jim asked Della if she had cut off her hair."
    ],
    "habilidad": "Reported speech",
    "correcta": 3,
    "justificacion": ""
   },
   {
    "enunciado": "Which sentence correctly reports Jim's question, \"You say your hair is gone?\"",
    "opciones": [
     "Jim asked Della whether she was saying that her hair was gone.",
     "Jim asked Della that she says her hair was gone.",
     "Jim asked Della was she saying her hair was gone.",
     "Jim asked Della if I said my hair is gone."
    ],
    "habilidad": "Reported speech",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "Which sentence best reports Della's words, \"It's sold, I tell you—sold and gone, too\"?",
    "opciones": [
     "Della asked whether it had been sold and was gone, too.",
     "Della insisted that it would be sold and gone, too.",
     "Della insisted that it had been sold and was gone, too.",
     "Della insisted that I had sold it and it was gone, too."
    ],
    "habilidad": "Reported speech",
    "correcta": 2,
    "justificacion": ""
   }
  ]
 },
 {
  "id": "happy-prince",
  "titulo": "The Happy Prince (Indirect Speech)",
  "seccion": "Indirect Speech (Reported Speech)",
  "academia": "Academia de Inglés",
  "fuente": "Wilde, Oscar. The Happy Prince and Other Tales (1888). Obra de dominio público. Texto electrónico disponible en Project Gutenberg, eBook No. 902. Disponible en https://www.gutenberg.org/cache/epub/902/pg902-images.html#chap01",
  "minutos": 25,
  "numerar": false,
  "instrucciones": "Read the following situation and choose the option that correctly reports the information in indirect speech.",
  "parrafos": [
   "High above the city, on a tall column, stood the statue of the Happy Prince. He was gilded all over with thin leaves of fine gold, for eyes he had two bright sapphires, and a large red ruby glowed on his sword-hilt.",
   "He was very much admired indeed. “He is as beautiful as a weathercock,” remarked one of the Town Councillors who wished to gain a reputation for having artistic tastes; “only not quite so useful,” he added, fearing lest people should think him unpractical, which he really was not.",
   "“Why can’t you be like the Happy Prince?” asked a sensible mother of her little boy who was crying for the moon. “The Happy Prince never dreams of crying for anything.”",
   "“I am glad there is some one in the world who is quite happy,” muttered a disappointed man as he gazed at the wonderful statue.",
   "“He looks just like an angel,” said the Charity Children as they came out of the cathedral in their bright scarlet cloaks and their clean white pinafores.",
   "“How do you know?” said the Mathematical Master, “you have never seen one.”",
   "“Ah! but we have, in our dreams,” answered the children; and the Mathematical Master frowned and looked very severe, for he did not approve of children dreaming.",
   "One night there flew over the city a little Swallow. His friends had gone away to Egypt six weeks before, but he had stayed behind, for he was in love with the most beautiful Reed. He had met her early in the spring as he was flying down the river after a big yellow moth, and had been so attracted by her slender waist that he had stopped to talk to her.",
   "“Shall I love you?” said the Swallow, who liked to come to the point at once, and the Reed made him a low bow. So he flew round and round her, touching the water with his wings, and making silver ripples. This was his courtship, and it lasted all through the summer.",
   "“It is a ridiculous attachment,” twittered the other Swallows; “she has no money, and far too many relations”; and indeed the river was quite full of Reeds. Then, when the autumn came they all flew away.",
   "After they had gone he felt lonely, and began to tire of his lady-love. “She has no conversation,” he said, “and I am afraid that she is a coquette, for she is always flirting with the wind.” And certainly, whenever the wind blew, the Reed made the most graceful curtseys. “I admit that she is domestic,” he continued, “but I love travelling, and my wife, consequently, should love travelling also.”",
   "“Will you come away with me?” he said finally to her; but the Reed shook her head, she was so attached to her home.",
   "“You have been trifling with me,” he cried. “I am off to the Pyramids. Good-bye!” and he flew away.",
   "All day long he flew, and at night-time he arrived at the city. “Where shall I put up?” he said; “I hope the town has made preparations.”",
   "Then he saw the statue on the tall column.",
   "“I will put up there,” he cried; “it is a fine position, with plenty of fresh air.” So he alighted just between the feet of the Happy Prince.",
   "“I have a golden bedroom,” he said softly to himself as he looked round, and he prepared to go to sleep; but just as he was putting his head under his wing a large drop of water fell on him. “What a curious thing!” he cried; “there is not a single cloud in the sky, the stars are quite clear and bright, and yet it is raining. The climate in the north of Europe is really dreadful. The Reed used to like the rain, but that was merely her selfishness.”",
   "Then another drop fell.",
   "“What is the use of a statue if it cannot keep the rain off?” he said; “I must look for a good chimney-pot,” and he determined to fly away.",
   "But before he had opened his wings, a third drop fell, and he looked up, and saw—Ah! what did he see?",
   "The eyes of the Happy Prince were filled with tears, and tears were running down his golden cheeks. His face was so beautiful in the moonlight that the little Swallow was filled with pity.",
   "“Who are you?” he said.",
   "“I am the Happy Prince.”",
   "“Why are you weeping then?” asked the Swallow; “you have quite drenched me.”",
   "“When I was alive and had a human heart,” answered the statue, “I did not know what tears were, for I lived in the Palace of Sans-Souci, where sorrow is not allowed to enter. In the daytime I played with my companions in the garden, and in the evening I led the dance in the Great Hall. Round the garden ran a very lofty wall, but I never cared to ask what lay beyond it, everything about me was so beautiful. My courtiers called me the Happy Prince, and happy indeed I was, if pleasure be happiness. So I lived, and so I died. And now that I am dead they have set me up here so high that I can see all the ugliness and all the misery of my city, and though my heart is made of lead yet I cannot chose but weep.”",
   "“What! is he not solid gold?” said the Swallow to himself. He was too polite to make any personal remarks out loud.",
   "“Far away,” continued the statue in a low musical voice, “far away in a little street there is a poor house. One of the windows is open, and through it I can see a woman seated at a table. Her face is thin and worn, and she has coarse, red hands, all pricked by the needle, for she is a seamstress. She is embroidering passion-flowers on a satin gown for the loveliest of the Queen’s maids-of-honour to wear at the next Court-ball. In a bed in the corner of the room her little boy is lying ill. He has a fever, and is asking for oranges. His mother has nothing to give him but river water, so he is crying. Swallow, Swallow, little Swallow, will you not bring her the ruby out of my sword-hilt? My feet are fastened to this pedestal and I cannot move.”",
   "“I am waited for in Egypt,” said the Swallow. “My friends are flying up and down the Nile, and talking to the large lotus-flowers. Soon they will go to sleep in the tomb of the great King. The King is there himself in his painted coffin. He is wrapped in yellow linen, and embalmed with spices. Round his neck is a chain of pale green jade, and his hands are like withered leaves.”",
   "“Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me for one night, and be my messenger? The boy is so thirsty, and the mother so sad.”",
   "“I don’t think I like boys,” answered the Swallow. “Last summer, when I was staying on the river, there were two rude boys, the miller’s sons, who were always throwing stones at me. They never hit me, of course; we swallows fly far too well for that, and besides, I come of a family famous for its agility; but still, it was a mark of disrespect.”",
   "But the Happy Prince looked so sad that the little Swallow was sorry. “It is very cold here,” he said; “but I will stay with you for one night, and be your messenger.”",
   "“Thank you, little Swallow,” said the Prince.",
   "So the Swallow picked out the great ruby from the Prince’s sword, and flew away with it in his beak over the roofs of the town.",
   "He passed by the cathedral tower, where the white marble angels were sculptured. He passed by the palace and heard the sound of dancing. A beautiful girl came out on the balcony with her lover. “How wonderful the stars are,” he said to her, “and how wonderful is the power of love!”",
   "“I hope my dress will be ready in time for the State-ball,” she answered; “I have ordered passion-flowers to be embroidered on it; but the seamstresses are so lazy.”",
   "He passed over the river, and saw the lanterns hanging to the masts of the ships. He passed over the Ghetto, and saw the old Jews bargaining with each other, and weighing out money in copper scales. At last he came to the poor house and looked in. The boy was tossing feverishly on his bed, and the mother had fallen asleep, she was so tired. In he hopped, and laid the great ruby on the table beside the woman’s thimble. Then he flew gently round the bed, fanning the boy’s forehead with his wings. “How cool I feel,” said the boy, “I must be getting better”; and he sank into a delicious slumber.",
   "Then the Swallow flew back to the Happy Prince, and told him what he had done. “It is curious,” he remarked, “but I feel quite warm now, although it is so cold.”",
   "“That is because you have done a good action,” said the Prince. And the little Swallow began to think, and then he fell asleep. Thinking always made him sleepy.",
   "When day broke he flew down to the river and had a bath. “What a remarkable phenomenon,” said the Professor of Ornithology as he was passing over the bridge. “A swallow in winter!” And he wrote a long letter about it to the local newspaper. Every one quoted it, it was full of so many words that they could not understand.",
   "“To-night I go to Egypt,” said the Swallow, and he was in high spirits at the prospect. He visited all the public monuments, and sat a long time on top of the church steeple. Wherever he went the Sparrows chirruped, and said to each other, “What a distinguished stranger!” so he enjoyed himself very much.",
   "When the moon rose he flew back to the Happy Prince. “Have you any commissions for Egypt?” he cried; “I am just starting.”",
   "“Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me one night longer?”",
   "“I am waited for in Egypt,” answered the Swallow. “To-morrow my friends will fly up to the Second Cataract. The river-horse couches there among the bulrushes, and on a great granite throne sits the God Memnon. All night long he watches the stars, and when the morning star shines he utters one cry of joy, and then he is silent. At noon the yellow lions come down to the water’s edge to drink. They have eyes like green beryls, and their roar is louder than the roar of the cataract.”",
   "“Swallow, Swallow, little Swallow,” said the Prince, “far away across the city I see a young man in a garret. He is leaning over a desk covered with papers, and in a tumbler by his side there is a bunch of withered violets. His hair is brown and crisp, and his lips are red as a pomegranate, and he has large and dreamy eyes. He is trying to finish a play for the Director of the Theatre, but he is too cold to write any more. There is no fire in the grate, and hunger has made him faint.”",
   "“I will wait with you one night longer,” said the Swallow, who really had a good heart. “Shall I take him another ruby?”",
   "“Alas! I have no ruby now,” said the Prince; “my eyes are all that I have left. They are made of rare sapphires, which were brought out of India a thousand years ago. Pluck out one of them and take it to him. He will sell it to the jeweller, and buy food and firewood, and finish his play.”",
   "“Dear Prince,” said the Swallow, “I cannot do that”; and he began to weep.",
   "“Swallow, Swallow, little Swallow,” said the Prince, “do as I command you.”",
   "So the Swallow plucked out the Prince’s eye, and flew away to the student’s garret. It was easy enough to get in, as there was a hole in the roof. Through this he darted, and came into the room. The young man had his head buried in his hands, so he did not hear the flutter of the bird’s wings, and when he looked up he found the beautiful sapphire lying on the withered violets.",
   "“I am beginning to be appreciated,” he cried; “this is from some great admirer. Now I can finish my play,” and he looked quite happy.",
   "The next day the Swallow flew down to the harbour. He sat on the mast of a large vessel and watched the sailors hauling big chests out of the hold with ropes. “Heave a-hoy!” they shouted as each chest came up. “I am going to Egypt”! cried the Swallow, but nobody minded, and when the moon rose he flew back to the Happy Prince.",
   "“I am come to bid you good-bye,” he cried.",
   "“Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me one night longer?”",
   "“It is winter,” answered the Swallow, “and the chill snow will soon be here. In Egypt the sun is warm on the green palm-trees, and the crocodiles lie in the mud and look lazily about them. My companions are building a nest in the Temple of Baalbec, and the pink and white doves are watching them, and cooing to each other. Dear Prince, I must leave you, but I will never forget you, and next spring I will bring you back two beautiful jewels in place of those you have given away. The ruby shall be redder than a red rose, and the sapphire shall be as blue as the great sea.”",
   "“In the square below,” said the Happy Prince, “there stands a little match-girl. She has let her matches fall in the gutter, and they are all spoiled. Her father will beat her if she does not bring home some money, and she is crying. She has no shoes or stockings, and her little head is bare. Pluck out my other eye, and give it to her, and her father will not beat her.”",
   "“I will stay with you one night longer,” said the Swallow, “but I cannot pluck out your eye. You would be quite blind then.”",
   "“Swallow, Swallow, little Swallow,” said the Prince, “do as I command you.”",
   "So he plucked out the Prince’s other eye, and darted down with it. He swooped past the match-girl, and slipped the jewel into the palm of her hand. “What a lovely bit of glass,” cried the little girl; and she ran home, laughing.",
   "Then the Swallow came back to the Prince. “You are blind now,” he said, “so I will stay with you always.”",
   "“No, little Swallow,” said the poor Prince, “you must go away to Egypt.”",
   "“I will stay with you always,” said the Swallow, and he slept at the Prince’s feet.",
   "All the next day he sat on the Prince’s shoulder, and told him stories of what he had seen in strange lands. He told him of the red ibises, who stand in long rows on the banks of the Nile, and catch gold-fish in their beaks; of the Sphinx, who is as old as the world itself, and lives in the desert, and knows everything; of the merchants, who walk slowly by the side of their camels, and carry amber beads in their hands; of the King of the Mountains of the Moon, who is as black as ebony, and worships a large crystal; of the great green snake that sleeps in a palm-tree, and has twenty priests to feed it with honey-cakes; and of the pygmies who sail over a big lake on large flat leaves, and are always at war with the butterflies.",
   "“Dear little Swallow,” said the Prince, “you tell me of marvellous things, but more marvellous than anything is the suffering of men and of women. There is no Mystery so great as Misery. Fly over my city, little Swallow, and tell me what you see there.”",
   "So the Swallow flew over the great city, and saw the rich making merry in their beautiful houses, while the beggars were sitting at the gates. He flew into dark lanes, and saw the white faces of starving children looking out listlessly at the black streets. Under the archway of a bridge two little boys were lying in one another’s arms to try and keep themselves warm. “How hungry we are!” they said. “You must not lie here,” shouted the Watchman, and they wandered out into the rain.",
   "Then he flew back and told the Prince what he had seen.",
   "“I am covered with fine gold,” said the Prince, “you must take it off, leaf by leaf, and give it to my poor; the living always think that gold can make them happy.”",
   "Leaf after leaf of the fine gold the Swallow picked off, till the Happy Prince looked quite dull and grey. Leaf after leaf of the fine gold he brought to the poor, and the children’s faces grew rosier, and they laughed and played games in the street. “We have bread now!” they cried.",
   "Then the snow came, and after the snow came the frost. The streets looked as if they were made of silver, they were so bright and glistening; long icicles like crystal daggers hung down from the eaves of the houses, everybody went about in furs, and the little boys wore scarlet caps and skated on the ice.",
   "The poor little Swallow grew colder and colder, but he would not leave the Prince, he loved him too well. He picked up crumbs outside the baker’s door when the baker was not looking and tried to keep himself warm by flapping his wings.",
   "But at last he knew that he was going to die. He had just strength to fly up to the Prince’s shoulder once more. “Good-bye, dear Prince!” he murmured, “will you let me kiss your hand?”",
   "“I am glad that you are going to Egypt at last, little Swallow,” said the Prince, “you have stayed too long here; but you must kiss me on the lips, for I love you.”",
   "“It is not to Egypt that I am going,” said the Swallow. “I am going to the House of Death. Death is the brother of Sleep, is he not?”",
   "And he kissed the Happy Prince on the lips, and fell down dead at his feet.",
   "At that moment a curious crack sounded inside the statue, as if something had broken. The fact is that the leaden heart had snapped right in two. It certainly was a dreadfully hard frost.",
   "Early the next morning the Mayor was walking in the square below in company with the Town Councillors. As they passed the column he looked up at the statue: “Dear me! how shabby the Happy Prince looks!” he said.",
   "“How shabby indeed!” cried the Town Councillors, who always agreed with the Mayor; and they went up to look at it.",
   "“The ruby has fallen out of his sword, his eyes are gone, and he is golden no longer,” said the Mayor in fact, “he is little better than a beggar!”",
   "“Little better than a beggar,” said the Town Councillors.",
   "“And here is actually a dead bird at his feet!” continued the Mayor. “We must really issue a proclamation that birds are not to be allowed to die here.” And the Town Clerk made a note of the suggestion.",
   "So they pulled down the statue of the Happy Prince. “As he is no longer beautiful he is no longer useful,” said the Art Professor at the University.",
   "Then they melted the statue in a furnace, and the Mayor held a meeting of the Corporation to decide what was to be done with the metal. “We must have another statue, of course,” he said, “and it shall be a statue of myself.”",
   "“Of myself,” said each of the Town Councillors, and they quarrelled. When I last heard of them they were quarrelling still.",
   "“What a strange thing!” said the overseer of the workmen at the foundry. “This broken lead heart will not melt in the furnace. We must throw it away.” So they threw it on a dust-heap where the dead Swallow was also lying.",
   "“Bring me the two most precious things in the city,” said God to one of His Angels; and the Angel brought Him the leaden heart and the dead bird.",
   "“You have rightly chosen,” said God, “for in my garden of Paradise this little bird shall sing for evermore, and in my city of gold the Happy Prince shall praise me.”"
  ],
  "orden": 42,
  "preguntas": [
   {
    "enunciado": "The Happy Prince says:\n“I lived in a beautiful palace.”\nWhich option correctly reports his statement?",
    "opciones": [
     "The Happy Prince said that he lives in a beautiful palace.",
     "The Happy Prince said that he had lived in a beautiful palace.",
     "The Happy Prince said that he has lived in a beautiful palace.",
     "The Happy Prince said that he would live in a beautiful palace."
    ],
    "habilidad": "Reported speech",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "The Swallow asks:\n“Why are you weeping?”\nWhich option correctly reports the Swallow's question?",
    "opciones": [
     "The Swallow asked the Prince why he was weeping.",
     "The Swallow asked the Prince why was he weeping.",
     "The Swallow asked the Prince why he is weeping.",
     "The Swallow asked the Prince why did he weep."
    ],
    "habilidad": "Reported speech",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "The Happy Prince tells the Swallow:\n“I cannot stop weeping.”\nWhich option correctly reports the statement?",
    "opciones": [
     "The Happy Prince told the Swallow that he could not stop weeping.",
     "The Happy Prince told the Swallow that he cannot stopped weeping.",
     "The Happy Prince told the Swallow that he couldn't stopped weeping.",
     "The Happy Prince told the Swallow that he can not stopping weeping."
    ],
    "habilidad": "Reported speech",
    "correcta": 0,
    "justificacion": ""
   },
   {
    "enunciado": "The Happy Prince says:\n“I can see all the misery of my city.”\nWhich option correctly reports his statement?",
    "opciones": [
     "The Happy Prince said that he can see all the misery of his city.",
     "The Happy Prince said that he could see all the misery of his city.",
     "The Happy Prince said that he could saw all the misery of his city.",
     "The Happy Prince said that he can saw all the misery of his city."
    ],
    "habilidad": "Reported speech",
    "correcta": 1,
    "justificacion": ""
   },
   {
    "enunciado": "The Prince tells the Swallow:\n“You must help the poor people.”\nWhich option correctly reports the Prince's statement?",
    "opciones": [
     "The Prince told the Swallow that he must helped the poor people.",
     "The Prince told the Swallow that he had to help the poor people.",
     "The Prince told the Swallow that he has to helped the poor people.",
     "The Prince told the Swallow that he must helping the poor people."
    ],
    "habilidad": "Reported speech",
    "correcta": 1,
    "justificacion": ""
   }
  ]
 }
];
