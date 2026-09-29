/* Lecturas de ejemplo del prototipo original. Se cargan a Firestore desde el panel de admin
   (botón "Cargar lecturas de ejemplo"). Incluyen la respuesta correcta; al guardarse, la clave
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
 }
];
