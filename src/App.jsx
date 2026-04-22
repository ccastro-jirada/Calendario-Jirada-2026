import { useState, useMemo } from "react";

const J = {
  blue: "#1E90FF", blueDark: "#0066CC", blueDeep: "#003A8C",
  yellow: "#FFE033", pink: "#FF6EC7", green: "#00E5A0",
  white: "#FFFFFF", bg: "#EEF5FF", border: "#D0E4FF",
  text: "#0A1628", muted: "#5B7BA0",
};

const CAT = {
  serie:        { label: "Series",             icon: "📺", color: "#7C3AED", bg: "#EDE9FE", tag: "SERIES" },
  pelicula:     { label: "Cine & Premios",     icon: "🎬", color: "#DC2626", bg: "#FEE2E2", tag: "CINE" },
  concierto:    { label: "Conciertos",         icon: "🎤", color: "#EA580C", bg: "#FFF7ED", tag: "CONCIERTOS" },
  festival:     { label: "Festivales",         icon: "🎪", color: "#D97706", bg: "#FEF3C7", tag: "FESTIVALES" },
  deporte:      { label: "Deportes",           icon: "⚽", color: "#059669", bg: "#D1FAE5", tag: "DEPORTE" },
  daykeeting:   { label: "Daykeeting",         icon: "📅", color: "#0284C7", bg: "#E0F2FE", tag: "DAYKEETING" },
  educacion:    { label: "Educación",          icon: "🎓", color: "#9D174D", bg: "#FCE7F3", tag: "EDUC." },
  festivo:      { label: "Festivos & Cultura", icon: "🇪🇸", color: "#B45309", bg: "#FEF9C3", tag: "FESTIVO" },
  granconsumo:  { label: "Gran Consumo",       icon: "🛒", color: "#16A34A", bg: "#DCFCE7", tag: "GR. CONSUMO" },
  farma:        { label: "Farma & Salud",      icon: "💊", color: "#7E22CE", bg: "#F3E8FF", tag: "FARMA" },
  fiscal:       { label: "Fiscal & Finanzas",  icon: "💶", color: "#374151", bg: "#F3F4F6", tag: "FISCAL" },
  internacional:{ label: "Internacional TOP",  icon: "🌍", color: "#1D4ED8", bg: "#DBEAFE", tag: "INTER." },
  cosmetica:    { label: "Cosmética & Belleza",icon: "💄", color: "#DB2777", bg: "#FCE7F3", tag: "COSMÉTICA" },
  hogar:        { label: "Hogar & Motor",      icon: "🏠", color: "#0891B2", bg: "#CFFAFE", tag: "HOGAR" },
  tech:         { label: "Tech & Telecom",     icon: "📱", color: "#4F46E5", bg: "#E0E7FF", tag: "TECH" },
};

const MONTHS = [
  { id: 4, name: "Abril" }, { id: 5, name: "Mayo" }, { id: 6, name: "Junio" },
  { id: 7, name: "Julio" }, { id: 8, name: "Agosto" }, { id: 9, name: "Septiembre" },
  { id: 10, name: "Octubre" }, { id: 11, name: "Noviembre" }, { id: 12, name: "Diciembre" },
];

const CLIENT_COLORS = {
  "Haribo":"#E11D48","Nutella":"#B45309","Granini":"#D97706","Freixenet":"#7C3AED",
  "Torres Brandy":"#374151","Torres Brandy USA":"#1D4ED8","Viña Sol":"#059669",
  "Gallina Blanca":"#EA580C","Hero":"#DC2626","Makro":"#0891B2",
  "Freshly Cosmetics":"#DB2777","Loewe":"#111827","Ekué":"#7C3AED","Flavia":"#BE185D",
  "Talquistina":"#0284C7","CaixaBank":"#B45309","Abanca":"#16A34A",
  "M2P":"#4F46E5","Pagofacil":"#0891B2","Pilexil":"#7C3AED","Fito":"#16A34A",
  "MBS":"#059669","Isogona":"#0284C7","Dormidina":"#4F46E5","Midnavi":"#6D28D9",
  "Rinocusi":"#B45309","Serelys":"#DB2777","Musc Intime":"#9D174D",
  "Hydrafizz":"#0891B2","AOC":"#374151","Tech":"#4F46E5","Parlem":"#1D4ED8",
  "Bluespace":"#0891B2","Digia":"#7C3AED","Castrol":"#DC2626","Frigicoll":"#0284C7",
  "Jotun":"#EA580C","Staedtler":"#DC2626","Erasco":"#D97706","CPC":"#374151",
  "Pikaprod":"#16A34A","Somea":"#7C3AED","Kagura":"#4F46E5",
};

const EVENTS = [
  // ══ ABRIL ══
  {month:4,date:"1 abr",name:"Super Mario Galaxy: La Película",cat:"pelicula",note:"Estreno global. Secuela más taquillera de 2023 (+750M$). Yoshi, Rosalina, Bowser Jr. Gaming + familias.",clients:["Haribo","Nutella","Granini","Hero"]},
  {month:4,date:"1 abr",name:"April Fools / Día de los Inocentes",cat:"daykeeting",note:"Humor y creatividad en redes. Branded content irreverente.",clients:["Haribo","Freshly Cosmetics","Parlem","Nutella","Granini"]},
  {month:4,date:"2 abr",name:"Día Mundial del Autismo",cat:"daykeeting",note:"Concienciación social. Contenido inclusivo y de impacto.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Hero"]},
  {month:4,date:"4 abr",name:"Día Mundial del Deporte para el Desarrollo",cat:"daykeeting",note:"Deporte + valores. Consumo masivo y bienestar.",clients:["CaixaBank","Abanca","Granini","Isogona","MBS"]},
  {month:4,date:"7 abr",name:"Día Mundial de la Salud (OMS) 🏥",cat:"farma",note:"El día más importante del año para farma, seguros y salud. Campaña obligada.",clients:["Pilexil","Fito","MBS","Isogona","Dormidina","Midnavi","Rinocusi","Talquistina","Serelys","Musc Intime","Hydrafizz","CaixaBank","Abanca"]},
  {month:4,date:"8 abr",name:"Inicio Campaña Renta IRPF 2025 📋",cat:"fiscal",note:"Campaña online hasta 30 junio. Alta intención de búsqueda.",clients:["CaixaBank","Abanca","M2P","Pagofacil"]},
  {month:4,date:"10 abr",name:"Semana Santa – Inicio vacaciones",cat:"festivo",note:"Pico de viajes y ocio familiar. Retail, turismo, alimentación.",clients:["Freixenet","Torres Brandy","Viña Sol","Granini","Haribo","Nutella","Gallina Blanca","Hero","Makro","CaixaBank","Abanca","Bluespace"]},
  {month:4,date:"11 abr",name:"Día Mundial del Parkinson",cat:"farma",note:"Visibilidad enfermedades neurodegenerativas.",clients:["Fito","MBS","Pilexil","CaixaBank"]},
  {month:4,date:"14 abr",name:"Día Mundial Enfermedad de Chagas",cat:"farma",note:"Salud tropical y global.",clients:["Fito","MBS"]},
  {month:4,date:"16 abr",name:"Día Mundial de la Voz",cat:"daykeeting",note:"Marcas de audio, podcasts y comunicación. Parlem directo.",clients:["Parlem","Bluespace","Tech"]},
  {month:4,date:"18 abr",name:"Día Mundial del Patrimonio",cat:"daykeeting",note:"Cultura, turismo y territorio.",clients:["Torres Brandy","Viña Sol","Freixenet","Makro"]},
  {month:4,date:"20 abr",name:"Premiere El Diablo Viste de Prada 2 (NYC)",cat:"pelicula",note:"Disney+ emite en directo 23:30h España. Moda + nostalgia. Trending semana completa.",clients:["Loewe","Ekué","Flavia","Freshly Cosmetics"]},
  {month:4,date:"22 abr",name:"Día de la Tierra 🌍",cat:"daykeeting",note:"Sostenibilidad obligada. Gran consumo, energía, moda. Alto alcance.",clients:["Freshly Cosmetics","Jotun","Freixenet","Viña Sol","Torres Brandy","Granini","Hero","Gallina Blanca","CaixaBank","Abanca","Parlem"]},
  {month:4,date:"23 abr",name:"Día del Libro / Sant Jordi 🌹",cat:"festivo",note:"Rosas y libros en Cataluña. Gran engagement cultural.",clients:["Staedtler","Erasco","CaixaBank","Abanca","Freixenet","Nutella","Haribo"]},
  {month:4,date:"24 abr",name:"MICHAEL – Biopic Michael Jackson",cat:"pelicula",note:"Jaafar Jackson como MJ. Antoine Fuqua. 200M$. Thriller, Bad, Off the Wall.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro"]},
  {month:4,date:"25 abr",name:"Día Mundial Libertad de Prensa",cat:"daykeeting",note:"Medios y comunicación. RSC.",clients:["CaixaBank","Abanca","Parlem","Tech"]},
  {month:4,date:"26 abr",name:"Día Mundial Propiedad Intelectual",cat:"daykeeting",note:"Creatividad, marcas, patentes.",clients:["Loewe","Staedtler","AOC","Tech"]},
  {month:4,date:"28 abr",name:"Feria Alimentaria Barcelona",cat:"granconsumo",note:"El mayor evento food de España. Lanzamientos y networking.",clients:["Gallina Blanca","Hero","Granini","Nutella","Haribo","Freixenet","Torres Brandy","Makro"]},
  {month:4,date:"29 abr",name:"Salón Gourmets Madrid",cat:"granconsumo",note:"Alimentación premium. Vinos, destilados, gourmet.",clients:["Torres Brandy","Viña Sol","Freixenet","Makro","Gallina Blanca","Hero"]},
  {month:4,date:"29 abr",name:"Día Internacional de la Danza",cat:"daykeeting",note:"Moda, música, lifestyle. Muy visual para RRSS.",clients:["Loewe","Ekué","Flavia","Freshly Cosmetics","Freixenet"]},
  {month:4,date:"30 abr",name:"El Diablo Viste de Prada 2 – Cines España",cat:"pelicula",note:"Streep + Hathaway + Blunt. 20º aniversario. Tráiler 222M vistas/día.",clients:["Loewe","Ekué","Flavia","Freshly Cosmetics","Freixenet"]},
  {month:4,date:"30 abr",name:"Día Nacional del Veterinario",cat:"farma",note:"Salud animal. Marcas de mascotas.",clients:["Fito","MBS","Hero"]},
  {month:4,date:"TBC abr",name:"Día del Diseño de Interiores",cat:"hogar",note:"Renovación hogar, pintura, interiorismo. Jotun directo.",clients:["Jotun"]},
  {month:4,date:"TBC abr",name:"Día del Bocadillo",cat:"granconsumo",note:"Muy viral. Alimentación, hostelería.",clients:["Gallina Blanca","Makro","Nutella","Hero"]},
  {month:4,date:"10–19 abr",name:"Coachella 2026 (celebrado)",cat:"internacional",note:"Sabrina Carpenter, Justin Bieber, Karol G. Conversación global moda y música.",clients:["Loewe","Ekué","Freshly Cosmetics","Freixenet","Torres Brandy"]},
  {month:4,date:"13–18 abr",name:"Rosalía – Barcelona (4 noches Palau Sant Jordi)",cat:"concierto",note:"Debut de su nueva gira en casa. Fenómeno global.",clients:["Freixenet","Torres Brandy","Loewe","Ekué","CaixaBank","Abanca"]},

  // ══ MAYO ══
  {month:5,date:"1 may",name:"Día del Trabajo – PUENTE largo 🎉",cat:"festivo",note:"Cae en viernes. Puente largo. Descanso, viajes y experiencias.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Viña Sol","Granini","Haribo","Makro"]},
  {month:5,date:"3 may",name:"Día Mundial Libertad de Prensa",cat:"daykeeting",note:"Comunicación y medios.",clients:["Parlem","Tech","CaixaBank","Abanca"]},
  {month:5,date:"4 may",name:"Star Wars Day (May the 4th)",cat:"daykeeting",note:"Trending global. Potenciado por estreno Mandalorian el 22 mayo.",clients:["Haribo","Nutella","Granini","Tech","AOC"]},
  {month:5,date:"5 may",name:"Día de la Madre 🌸",cat:"granconsumo",note:"El gran día del gran consumo: flores, perfumería, cosmética, alimentación premium, farmacia.",clients:["Loewe","Ekué","Flavia","Freshly Cosmetics","Talquistina","Hydrafizz","Nutella","Freixenet","Granini","Hero","CaixaBank","Abanca","Pilexil","Serelys"]},
  {month:5,date:"7 may",name:"Día Mundial del Asma",cat:"farma",note:"Respiratorio y salud pulmonar.",clients:["Rinocusi","MBS","Fito","Isogona"]},
  {month:5,date:"8 may",name:"Día Cruz Roja / Enfermería",cat:"farma",note:"Salud y cuidado. Contenido con propósito.",clients:["Pilexil","Fito","MBS","Rinocusi","Talquistina","CaixaBank","Abanca"]},
  {month:5,date:"9 may",name:"Día de Europa",cat:"daykeeting",note:"Europa, valores, mercado único.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy"]},
  {month:5,date:"10 may",name:"Día de la Salud Mental",cat:"farma",note:"Bienestar mental creciente en conversación social.",clients:["Dormidina","Midnavi","Fito","MBS","Isogona","CaixaBank","Abanca","Serelys"]},
  {month:5,date:"12 may",name:"Día Internacional de las Enfermeras",cat:"farma",note:"Reconocimiento sanitario.",clients:["Pilexil","Fito","MBS","Rinocusi","Talquistina"]},
  {month:5,date:"13 may",name:"Día del Cóctel 🍸",cat:"granconsumo",note:"Coctelería, destilados, hostelería.",clients:["Torres Brandy","Torres Brandy USA","Freixenet","Makro","Viña Sol"]},
  {month:5,date:"15 may",name:"San Isidro – Madrid",cat:"festivo",note:"Verbenas, chulapos, chotis. Gran oportunidad local en Madrid.",clients:["Freixenet","Viña Sol","Torres Brandy","Makro","Gallina Blanca","CaixaBank","Abanca"]},
  {month:5,date:"15 may",name:"Berlín y la Dama del Armiño T2 (Netflix)",cat:"serie",note:"Spin-off La Casa de Papel. Pedro Alonso en Sevilla. Álvaro Morte en cameo.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Makro"]},
  {month:5,date:"15–17 may",name:"GP MotoGP – Catalunya (Montmeló)",cat:"deporte",note:"Marc Márquez. Alta audiencia nacional.",clients:["Castrol","Frigicoll","AOC","Torres Brandy","Freixenet","CaixaBank"]},
  {month:5,date:"17 may",name:"Día Mundial contra la Homofobia (IDAHOBIT)",cat:"daykeeting",note:"Diversidad e inclusión. Marcas con valores. Alto engagement.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Loewe","Parlem","Freixenet"]},
  {month:5,date:"17 may",name:"Día Mundial de Internet",cat:"daykeeting",note:"Tecnología, conectividad. Marcas digitales.",clients:["Parlem","Bluespace","Tech","M2P","AOC","Digia","CaixaBank","Abanca"]},
  {month:5,date:"19 may",name:"Día Mundial de la Hepatitis",cat:"farma",note:"Farma hepatológica.",clients:["Fito","MBS","Pilexil"]},
  {month:5,date:"20 may",name:"Día Mundial de las Abejas 🐝",cat:"granconsumo",note:"Biodiversidad + alimentación. Miel, cosmética natural.",clients:["Hero","Granini","Freshly Cosmetics","Gallina Blanca","Nutella"]},
  {month:5,date:"21 may",name:"Día Mundial Diversidad Cultural",cat:"daykeeting",note:"Cultura y diversidad. Marcas globales.",clients:["Loewe","Torres Brandy","CaixaBank","Abanca","Makro"]},
  {month:5,date:"22 may",name:"Bad Bunny – Barcelona (Estadi Olímpic) 1ª noche",cat:"concierto",note:"DeBÍ TiRAR MáS FOToS World Tour. 600.000 entradas agotadas en España.",clients:["Freixenet","Torres Brandy","Haribo","Granini","CaixaBank","Abanca"]},
  {month:5,date:"22 may",name:"The Mandalorian & Grogu (cines)",cat:"pelicula",note:"Star Wars en cines. Baby Yoda + Mando. Audiencia masiva.",clients:["Haribo","Nutella","Granini","Hero","AOC"]},
  {month:5,date:"23 may",name:"Bad Bunny – Barcelona 2ª noche",cat:"concierto",note:"Segunda fecha Barcelona del DeBÍ TiRAR MáS FOToS Tour.",clients:["Freixenet","Torres Brandy","Haribo","Granini"]},
  {month:5,date:"25 may",name:"Roland Garros – Final (aprox.)",cat:"deporte",note:"Tenis. Carlos Alcaraz. Audiencia premium.",clients:["CaixaBank","Abanca","Castrol","Torres Brandy","Freixenet","AOC"]},
  {month:5,date:"28–31 may",name:"La Oreja de Van Gogh – Madrid (x3, AGOTADO)",cat:"concierto",note:"Regreso épico con Amaia Montero. Tres noches agotadas.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Makro"]},
  {month:5,date:"29 may",name:"Día Mundial del Vino 🍷",cat:"granconsumo",note:"Vino, maridaje, gastronomía. Trending hostelería.",clients:["Torres Brandy","Viña Sol","Freixenet","Makro","Gallina Blanca"]},
  {month:5,date:"30–31 may",name:"Bad Bunny – Madrid (Metropolitano) 1ª y 2ª noche",cat:"concierto",note:"Inicio de 10 fechas en Madrid. Hito histórico. 60.000 personas/noche.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Granini","Haribo"]},
  {month:5,date:"31 may",name:"Día Mundial sin Tabaco",cat:"farma",note:"Salud respiratoria.",clients:["Fito","MBS","Rinocusi","Isogona","CaixaBank","Abanca"]},
  {month:5,date:"TBC may",name:"Met Gala 🎩",cat:"internacional",note:"El mayor evento de moda del mundo. Trending masivo global.",clients:["Loewe","Ekué","Flavia","Freshly Cosmetics","Freixenet"]},
  {month:5,date:"TBC may",name:"Cannes Film Festival",cat:"internacional",note:"Cine, lujo, moda. Alfombra roja. Trending premium.",clients:["Loewe","Ekué","Freixenet","Torres Brandy","Viña Sol"]},
  {month:5,date:"4 may",name:"Eros Ramazzotti – Madrid (Movistar Arena)",cat:"concierto",note:"Una Historia Importante World Tour.",clients:["Freixenet","Torres Brandy","CaixaBank"]},
  {month:5,date:"7 may",name:"Eric Clapton – Madrid (Movistar Arena)",cat:"concierto",note:"Regreso a España tras 20 años. Leyenda del rock y blues.",clients:["Torres Brandy","Freixenet","Makro","CaixaBank","Abanca"]},
  {month:5,date:"8–9 may",name:"Fito & Fitipaldis – Madrid",cat:"concierto",note:"Dos noches del rock vasco más querido.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca"]},

  // ══ JUNIO ══
  {month:6,date:"1 jun",name:"Día Internacional de la Infancia 👶",cat:"daykeeting",note:"Gran consumo: juguetes, alimentación infantil, salud pediátrica.",clients:["Haribo","Nutella","Hero","Granini","Gallina Blanca","Talquistina","Isogona","MBS"]},
  {month:6,date:"1 jun",name:"Paga Extra de Verano 💰",cat:"fiscal",note:"Nóminas dobles. Pico de consumo. Banca, inversión, gran consumo.",clients:["CaixaBank","Abanca","M2P","Pagofacil","Freixenet","Makro","Haribo"]},
  {month:6,date:"2–4 jun",name:"SELECTIVIDAD PAU – Convocatoria Ordinaria 🎓",cat:"educacion",note:"Andalucía, Madrid, País Vasco, Galicia, Valencia… Enorme conversación jóvenes.",clients:["Staedtler","Erasco","CaixaBank","Abanca","Hero","Haribo","Nutella","Granini"]},
  {month:6,date:"3–7 jun",name:"Primavera Sound 2026 – Barcelona",cat:"festival",note:"El Coachella europeo. Indie, alternativo, pop.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca","Freshly Cosmetics"]},
  {month:6,date:"5 jun",name:"Día Mundial del Medio Ambiente 🌿",cat:"daykeeting",note:"Sostenibilidad obligada para gran consumo, energía, alimentación.",clients:["Freshly Cosmetics","Jotun","Freixenet","Viña Sol","Torres Brandy","Granini","Hero","Gallina Blanca","CaixaBank","Abanca","Parlem"]},
  {month:6,date:"7 jun",name:"Día Mundial Seguridad Alimentaria",cat:"granconsumo",note:"Alimentación, distribución, packaging.",clients:["Gallina Blanca","Hero","Granini","Nutella","Haribo","Makro"]},
  {month:6,date:"8 jun",name:"Día Mundial de los Océanos 🌊",cat:"daykeeting",note:"Medioambiente, turismo, alimentación sostenible.",clients:["Freshly Cosmetics","Granini","Hero","Freixenet","Viña Sol","CaixaBank","Abanca"]},
  {month:6,date:"9–11 jun",name:"SELECTIVIDAD PAU – Cataluña",cat:"educacion",note:"Cataluña tiene fechas propias.",clients:["Staedtler","Erasco","CaixaBank","Abanca"]},
  {month:6,date:"9 jun",name:"Mobland (SkyShowtime)",cat:"serie",note:"Guy Ritchie. Tom Hardy, Pierce Brosnan, Helen Mirren. Mafia. Bombazo del año.",clients:["Torres Brandy","Freixenet","Makro","CaixaBank"]},
  {month:6,date:"11 jun",name:"MUNDIAL FIFA 2026 – ARRANCA 🏆",cat:"deporte",note:"EE.UU., México, Canadá. 48 selecciones. El evento deportivo del año.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Nutella","Gallina Blanca","Makro","AOC","Castrol"]},
  {month:6,date:"12 jun",name:"Scary Movie 6",cat:"pelicula",note:"Regreso Wayans + Anna Faris + Regina Hall tras 13 años. Muy viral.",clients:["Haribo","Nutella","Granini","Freixenet"]},
  {month:6,date:"14 jun",name:"Día Mundial del Donante de Sangre",cat:"farma",note:"Salud y solidaridad. Cruz Roja.",clients:["Pilexil","MBS","Fito","CaixaBank","Abanca","Isogona"]},
  {month:6,date:"18–21 jun",name:"Sónar 2026 – Barcelona",cat:"festival",note:"Referente mundial de música electrónica y tecnología digital.",clients:["Freixenet","Torres Brandy","Granini","AOC","Tech","Parlem"]},
  {month:6,date:"19 jun",name:"Toy Story 5",cat:"pelicula",note:"Woody y Buzz regresan. El regreso Pixar más esperado.",clients:["Haribo","Nutella","Hero","Granini","Staedtler"]},
  {month:6,date:"19 jun",name:"Lume (HBO Max)",cat:"serie",note:"Serie española. Thriller sobre incendios en Galicia.",clients:["CaixaBank","Abanca","Jotun"]},
  {month:6,date:"21 jun",name:"Solsticio de Verano / Día de la Música ☀️",cat:"daykeeting",note:"Conciertos gratuitos, música en la calle. Tendencia en Europa.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Freshly Cosmetics","Makro"]},
  {month:6,date:"21 jun",name:"Día del Padre 👨",cat:"granconsumo",note:"Perfumería, tecnología, deporte, alimentación. Gran consumo.",clients:["Loewe","Ekué","Flavia","Torres Brandy","Freixenet","Granini","AOC","CaixaBank","Abanca","Castrol","Makro"]},
  {month:6,date:"23–24 jun",name:"Linkin Park – Madrid (Rivas Vaciamadrid)",cat:"concierto",note:"Regreso con nueva cantante Emily Armstrong. Sold out.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","AOC"]},
  {month:6,date:"24 jun",name:"San Juan 🔥",cat:"festivo",note:"Hogueras, playa, noche mágica en Galicia, Valencia, Cataluña.",clients:["Freixenet","Torres Brandy","Viña Sol","Granini","Haribo","Makro","CaixaBank","Abanca","Jotun"]},
  {month:6,date:"25–28 jun",name:"Resurrection Fest – Viveiro",cat:"festival",note:"Korn, Slipknot, Judas Priest. Metal.",clients:["Freixenet","Torres Brandy","Makro","CaixaBank"]},
  {month:6,date:"26 jun",name:"Supergirl: Woman of Tomorrow (DC)",cat:"pelicula",note:"DC Universe. Gran expectación fans superhéroes.",clients:["Haribo","Nutella","AOC","Granini"]},
  {month:6,date:"28 jun",name:"Día Internacional Orgullo LGTBIQ+ 🏳️‍🌈",cat:"daykeeting",note:"El día de mayor alcance para diversidad en redes.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Loewe","Freixenet","Granini","Parlem"]},
  {month:6,date:"30 jun",name:"FIN Campaña Declaración de la Renta",cat:"fiscal",note:"Último día IRPF 2025.",clients:["CaixaBank","Abanca","M2P","Pagofacil"]},
  {month:6,date:"TBC jun",name:"Champions League – Final ⚽",cat:"deporte",note:"Fútbol europeo máximo. El partido más visto del continente.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Castrol","AOC"]},

  // ══ JULIO ══
  {month:7,date:"1 jul",name:"Inicio Rebajas de Verano 🛍️",cat:"granconsumo",note:"Pico de consumo en retail, moda y gran consumo. Ecommerce.",clients:["Freshly Cosmetics","Loewe","Ekué","Flavia","CaixaBank","Abanca","Pagofacil","M2P","Haribo","Nutella"]},
  {month:7,date:"1 jul",name:"Minions 3 (Minions & Monsters)",cat:"pelicula",note:"7ª entrega Mi Villano Favorito. Trending meme garantizado.",clients:["Haribo","Nutella","Granini","Hero","Makro"]},
  {month:7,date:"4 jul",name:"Chayanne – Madrid (Metropolitano)",cat:"concierto",note:"Bailemos Otra Vez World Tour.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Granini"]},
  {month:7,date:"4 jul",name:"Independencia USA 🎇",cat:"daykeeting",note:"Barbacoas, verano, cultura americana.",clients:["Torres Brandy USA","Haribo","Granini","Nutella","Freixenet"]},
  {month:7,date:"6–14 jul",name:"San Fermín – Pamplona",cat:"festivo",note:"Encierros, chupinazo. Icono cultural español con proyección internacional.",clients:["Freixenet","Torres Brandy","Viña Sol","Granini","Haribo","Makro","CaixaBank","Abanca"]},
  {month:7,date:"7 jul",name:"Día Mundial del Chocolate 🍫",cat:"granconsumo",note:"Confitería, snacks. Altísimo engagement.",clients:["Haribo","Nutella","Hero","Makro","Gallina Blanca"]},
  {month:7,date:"7 jul",name:"Día Mundial del Osito Gominola 🐻",cat:"granconsumo",note:"Haribo directo. El día del año para la marca.",clients:["Haribo"]},
  {month:7,date:"8–11 jul",name:"Mad Cool 2026 – Madrid",cat:"festival",note:"Foo Fighters, Florence+Machine, Lorde, Twenty One Pilots, Kings of Leon, Nick Cave.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca","AOC","Freshly Cosmetics","Makro"]},
  {month:7,date:"9–11 jul",name:"Bilbao BBK Live 2026",cat:"festival",note:"Lily Allen, Robbie Williams, Alabama Shakes, Interpol, IDLES. Kobetamendi.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca"]},
  {month:7,date:"10 jul",name:"Vaiana – Live-Action Disney",cat:"pelicula",note:"Remake acción real de Moana. Dwayne Johnson como Maui. 10º aniversario.",clients:["Haribo","Nutella","Hero","Granini","Freshly Cosmetics"]},
  {month:7,date:"10 jul",name:"Día del Vino Rosado 🌸",cat:"granconsumo",note:"Rosé season. Verano, terrazas, lifestyle.",clients:["Torres Brandy","Viña Sol","Freixenet","Makro"]},
  {month:7,date:"11–12 jul",name:"Aitana – Madrid (Movistar Arena) 1ª y 2ª noche",cat:"concierto",note:"Cuarto Azul World Tour. Dos noches agotadas.",clients:["Freshly Cosmetics","Loewe","Ekué","Freixenet","Granini","CaixaBank","Abanca"]},
  {month:7,date:"16 jul",name:"Día Mundial del Emoji 🎉",cat:"daykeeting",note:"Trending lúdico. Muy viral y fácil de activar.",clients:["Haribo","Nutella","Freshly Cosmetics","Parlem","Granini","CaixaBank","Abanca"]},
  {month:7,date:"17 jul",name:"La Odisea (Christopher Nolan)",cat:"pelicula",note:"Homero en IMAX. El evento cinematográfico del verano.",clients:["AOC","CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:7,date:"17–19 jul",name:"FIB 2026 – Benicàssim",cat:"festival",note:"The Prodigy, The Kooks, Kaiser Chiefs, Biffy Clyro, Pendulum.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca","Freshly Cosmetics","Talquistina"]},
  {month:7,date:"19 jul",name:"MUNDIAL FIFA 2026 – FINAL 🏆",cat:"deporte",note:"La final del torneo más visto de la historia.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Nutella","Gallina Blanca","Makro","Castrol"]},
  {month:7,date:"22 jul",name:"Aitana – Madrid 3ª y 4ª noche",cat:"concierto",note:"Cuarto Azul World Tour. 4 noches en Madrid en total.",clients:["Freshly Cosmetics","Loewe","Ekué","Freixenet","Granini","CaixaBank","Abanca"]},
  {month:7,date:"25 jul",name:"Santiago Apóstol – Día de Galicia",cat:"festivo",note:"Festivo en Galicia. El Camino, peregrinación, cultura.",clients:["CaixaBank","Abanca","Freixenet","Viña Sol","Gallina Blanca","Granini"]},
  {month:7,date:"28 jul",name:"Día Mundial de la Hepatitis C",cat:"farma",note:"Hepatología y diagnóstico.",clients:["Fito","MBS","Pilexil"]},
  {month:7,date:"30 jul",name:"Día Mundial de la Amistad 💛",cat:"daykeeting",note:"Muy emocional. Gran consumo: bebidas, snacks, experiencias.",clients:["Haribo","Nutella","Freixenet","Granini","Hero","Torres Brandy","CaixaBank","Abanca"]},
  {month:7,date:"31 jul",name:"Spider-Man: Brand New Day",cat:"pelicula",note:"Tom Holland regresa. Con Hulk y Punisher. Conversación Marvel máxima.",clients:["Haribo","Nutella","AOC","Granini","Hero"]},

  // ══ AGOSTO ══
  {month:8,date:"1 ago",name:"Día Mundial de la Cerveza 🍺",cat:"granconsumo",note:"Bebidas, hostelería. Muy viral en verano.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca","Granini"]},
  {month:8,date:"1–2 ago",name:"Dreambeach – Vélez-Málaga",cat:"festival",note:"David Guetta, Eric Prydz. Electrónica + playa. +120.000 asistentes.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Freshly Cosmetics","Talquistina"]},
  {month:8,date:"7 ago",name:"Día Internacional de la Cerveza (1º viernes)",cat:"granconsumo",note:"Mayor conversación cervecera en RRSS.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca"]},
  {month:8,date:"8 ago",name:"Día Mundial del Ojo 👁️",cat:"farma",note:"Salud ocular. Rinocusi directo.",clients:["Rinocusi","MBS","Fito"]},
  {month:8,date:"12 ago",name:"Día Internacional de la Juventud",cat:"daykeeting",note:"Marcas de consumo joven, educación y cultura.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Haribo","Granini","Parlem","Staedtler"]},
  {month:8,date:"15 ago",name:"Asunción de la Virgen – FESTIVO NACIONAL 🎉",cat:"festivo",note:"Pico de vacaciones. Turismo, hostelería, distribución.",clients:["Freixenet","Torres Brandy","Viña Sol","Granini","Haribo","Makro","Talquistina","Freshly Cosmetics"]},
  {month:8,date:"19 ago",name:"Día Mundial de la Fotografía 📷",cat:"daykeeting",note:"Muy visual. Marcas creativas, fotógrafos, moda, lifestyle.",clients:["Loewe","Ekué","Freshly Cosmetics","AOC","Staedtler","Flavia"]},
  {month:8,date:"28–30 ago",name:"The Weeknd – Madrid (Metropolitano)",cat:"concierto",note:"After Hours Til Dawn Tour. 3 noches. R&B global de primer nivel.",clients:["Freixenet","Torres Brandy","Freshly Cosmetics","Loewe","CaixaBank","Granini"]},
  {month:8,date:"28–30 ago",name:"GP MotoGP – Aragón (MotorLand)",cat:"deporte",note:"Gran Premio de Aragón. Marc Márquez en casa.",clients:["Castrol","Frigicoll","AOC","CaixaBank","Abanca"]},
  {month:8,date:"TBC",name:"Arenal Sound – Burriana",cat:"festival",note:"Mayor festival de playa de España. Pop, indie, reggaetón.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca","Freshly Cosmetics","Talquistina"]},
  {month:8,date:"TBC",name:"Medusa Festival – Benicàssim",cat:"festival",note:"Electrónica masiva y playa. Muy viral.",clients:["Freixenet","Torres Brandy","Granini","AOC"]},
  {month:8,date:"TBC",name:"Sonorama Ribera – Aranda de Duero",cat:"festival",note:"Crystal Fighters, Leiva, Love of Lesbian, Guitarricadelafuente.",clients:["Torres Brandy","Viña Sol","Freixenet","CaixaBank","Abanca"]},
  {month:8,date:"TBC",name:"Festival de Venecia (Mostra) 🎬",cat:"internacional",note:"Cine internacional. Lujo, cultura, moda.",clients:["Loewe","Ekué","Freixenet","Torres Brandy"]},

  // ══ SEPTIEMBRE ══
  {month:9,date:"1 sep",name:"Vuelta al Cole 🎒",cat:"granconsumo",note:"El pico de compra escolar. Mochilas, material, alimentación, farma.",clients:["Staedtler","Erasco","CaixaBank","Abanca","Hero","Haribo","Nutella","Granini","Gallina Blanca","Isogona","MBS","Pilexil","Makro"]},
  {month:9,date:"1–6 sep",name:"Premier Pádel – Madrid (Movistar Arena)",cat:"deporte",note:"Lebron, Galán, Tapia. Las grandes estrellas del pádel mundial.",clients:["CaixaBank","Abanca","Castrol","AOC","Makro"]},
  {month:9,date:"2–4 sep",name:"Selectividad Extraordinaria – Cataluña",cat:"educacion",note:"Segunda convocatoria PAU en Cataluña.",clients:["Staedtler","Erasco","CaixaBank","Abanca"]},
  {month:9,date:"4–8 sep",name:"Aitana – Barcelona (Palau Sant Jordi, 4 noches)",cat:"concierto",note:"Cuarto Azul World Tour en casa. Fenómeno en Cataluña.",clients:["Freshly Cosmetics","Loewe","Ekué","Freixenet","Granini","CaixaBank","Abanca"]},
  {month:9,date:"8–9 sep",name:"Leiva – Madrid (Movistar Arena, 4 noches)",cat:"concierto",note:"El cantautor de referencia del indie español.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca"]},
  {month:9,date:"9 sep",name:"Día de la Belleza 💄",cat:"cosmetica",note:"El día más importante del año para cosmética, perfumería y belleza.",clients:["Freshly Cosmetics","Loewe","Ekué","Flavia","Talquistina","Hydrafizz","Musc Intime","Pilexil"]},
  {month:9,date:"10 sep",name:"Día Mundial Prevención del Suicidio",cat:"farma",note:"Salud mental. Muy sensible.",clients:["Dormidina","Midnavi","Fito","MBS","Serelys","CaixaBank","Abanca"]},
  {month:9,date:"11–15 sep",name:"Aitana – Madrid (Movistar Arena, 4 noches)",cat:"concierto",note:"Cuarto Azul World Tour en Madrid. 4 noches. Fenómeno histórico.",clients:["Freshly Cosmetics","Loewe","Ekué","Freixenet","Granini","CaixaBank","Abanca"]},
  {month:9,date:"11–13 sep",name:"Gran Premio de España F1 – Madrid (IFEMA)",cat:"deporte",note:"F1 vuelve a Madrid. Evento histórico. Trending global.",clients:["Castrol","Frigicoll","AOC","CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:9,date:"18–27 sep",name:"Shakira – Madrid (residencia, 6 noches)",cat:"concierto",note:"Estadio Shakira: 18, 19, 20, 25, 26 y 27 sept. El evento del otoño.",clients:["Freixenet","Torres Brandy","Freshly Cosmetics","Loewe","CaixaBank","Abanca","Granini","Nutella"]},
  {month:9,date:"TBC sep",name:"Semana de la Moda Madrid (MBFWM)",cat:"cosmetica",note:"Moda, lifestyle. Alta repercusión en RRSS.",clients:["Loewe","Ekué","Flavia","Freshly Cosmetics","Talquistina","Hydrafizz"]},
  {month:9,date:"TBC sep",name:"Festival de San Sebastián 🎬",cat:"pelicula",note:"El festival de cine más importante de España. Alfombra dorada.",clients:["Freixenet","Torres Brandy","Loewe","CaixaBank","Abanca"]},
  {month:9,date:"21 sep",name:"Día Internacional de la Paz ☮️",cat:"daykeeting",note:"Valores universales. Marcas con propósito.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Hero","Granini","Parlem"]},
  {month:9,date:"25 sep",name:"Día del Farmacéutico 💊",cat:"farma",note:"El día de la profesión farmacéutica. Todo el portfolio farma.",clients:["Pilexil","Fito","MBS","Isogona","Dormidina","Rinocusi","Talquistina","Serelys","Midnavi","Musc Intime"]},
  {month:9,date:"26 sep",name:"Estreno ROMI (Amazon Prime Video)",cat:"serie",note:"Serie española. Agente de policía sorda. Producción nacional.",clients:["CaixaBank","Abanca","Parlem","Digia"]},
  {month:9,date:"27 sep",name:"Día Mundial del Turismo",cat:"granconsumo",note:"Hostelería, destinos, agencias.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Makro","Gallina Blanca"]},
  {month:9,date:"29 sep",name:"Día Mundial del Corazón ❤️",cat:"farma",note:"El mayor día de farma cardiovascular del año.",clients:["Fito","MBS","Isogona","Serelys","CaixaBank","Abanca","Gallina Blanca","Hero"]},
  {month:9,date:"TBC sep",name:"Fruit Attraction Madrid",cat:"granconsumo",note:"Fruta y verdura, distribución alimentaria.",clients:["Gallina Blanca","Hero","Granini","Makro"]},

  // ══ OCTUBRE ══
  {month:10,date:"1 oct",name:"Día Internacional de las Personas Mayores",cat:"farma",note:"Salud sénior, suplementación.",clients:["Pilexil","Fito","MBS","Isogona","Dormidina","Serelys","CaixaBank","Abanca"]},
  {month:10,date:"1 oct",name:"Día Mundial del Café ☕",cat:"granconsumo",note:"Gran consumo: café, hostelería. Altísimo engagement.",clients:["Gallina Blanca","Makro","Nutella","Granini","Freixenet"]},
  {month:10,date:"1 oct",name:"Día del Automóvil 🚗",cat:"hogar",note:"Castrol directo. Motor, mantenimiento, tecnología.",clients:["Castrol","Frigicoll","AOC"]},
  {month:10,date:"2–11 oct",name:"Shakira – Madrid (cierre residencia, 5 noches)",cat:"concierto",note:"2, 3, 4, 10 y 11 oct. 11 noches totales en Madrid.",clients:["Freixenet","Torres Brandy","Freshly Cosmetics","Loewe","CaixaBank","Abanca"]},
  {month:10,date:"3 oct",name:"Estreno MONSTRUO: Ed Gein (Netflix)",cat:"serie",note:"Ryan Murphy. Nueva entrega de la saga. Expectación máxima.",clients:["AOC","Haribo","Freixenet","Torres Brandy"]},
  {month:10,date:"3 oct",name:"Estreno ZOOMERS (Amazon Prime)",cat:"serie",note:"Miniserie española de comedia universitaria. Audiencia joven.",clients:["CaixaBank","Abanca","Staedtler","Haribo","Granini"]},
  {month:10,date:"3 oct",name:"Estreno ANIMAL (Netflix)",cat:"serie",note:"Luis Zahera en la España rural. Drama de autor español.",clients:["CaixaBank","Abanca","Gallina Blanca","Torres Brandy"]},
  {month:10,date:"5 oct",name:"Día Mundial de los Docentes",cat:"educacion",note:"Educación y formación.",clients:["Staedtler","Erasco","CaixaBank","Abanca"]},
  {month:10,date:"8 oct",name:"Estreno LA SUERTE (Disney+)",cat:"serie",note:"Comedia de Paco Plaza. Producción española.",clients:["CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:10,date:"10 oct",name:"Día Mundial Salud Mental 🧠",cat:"farma",note:"El día más importante del año para salud mental.",clients:["Dormidina","Midnavi","Fito","MBS","Isogona","Serelys","CaixaBank","Abanca","Freshly Cosmetics"]},
  {month:10,date:"12 oct",name:"Día de la Hispanidad 🎉 PUENTE (LUNES)",cat:"festivo",note:"Cae en lunes. Puente de 3 días en toda España.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Viña Sol","Granini","Haribo","Makro"]},
  {month:10,date:"TBC oct",name:"Salon de l'Enseignement – Barcelona",cat:"educacion",note:"El mayor evento de educación y formación de España.",clients:["Staedtler","Erasco","CaixaBank","Abanca","Digia"]},
  {month:10,date:"16 oct",name:"Día Mundial de la Alimentación 🍎",cat:"granconsumo",note:"El mayor día del año para marcas de alimentación.",clients:["Gallina Blanca","Hero","Granini","Nutella","Haribo","Makro","Freixenet","Viña Sol","Torres Brandy","Freshly Cosmetics"]},
  {month:10,date:"16 oct",name:"Street Fighter: La Película",cat:"pelicula",note:"Remake del clásico videojuego. Gaming community muy activa.",clients:["AOC","Haribo","Granini","Tech"]},
  {month:10,date:"18 oct",name:"Día Mundial de la Menopausia",cat:"farma",note:"Salud femenina. Farma hormonal y bienestar femenino.",clients:["Serelys","MBS","Fito","Isogona","Freshly Cosmetics"]},
  {month:10,date:"20 oct",name:"Día Mundial de la Osteoporosis",cat:"farma",note:"Calcio, suplementación, farma ortopédica.",clients:["Fito","MBS","Isogona","Serelys","Hero"]},
  {month:10,date:"25 oct",name:"Día Contra el Cáncer de Mama 🎗️",cat:"farma",note:"El mayor día de visibilidad del año para oncología y farma.",clients:["Pilexil","Freshly Cosmetics","Fito","MBS","CaixaBank","Abanca","Serelys","Hydrafizz"]},
  {month:10,date:"25 oct",name:"Día de la Pasta 🍝",cat:"granconsumo",note:"Alimentación. Muy viral y fácil de activar.",clients:["Gallina Blanca","Makro","Nutella","Hero"]},
  {month:10,date:"TBC oct",name:"Premios Planeta 📚",cat:"pelicula",note:"El mayor premio literario de España. Alta repercusión mediática.",clients:["CaixaBank","Abanca","Torres Brandy","Freixenet","Staedtler"]},
  {month:10,date:"31 oct",name:"Halloween 🎃",cat:"festivo",note:"En crecimiento en España. Gran oportunidad branded content creativo.",clients:["Haribo","Nutella","Freixenet","Torres Brandy","Freshly Cosmetics","Makro","Granini","Hero"]},
  {month:10,date:"31 oct",name:"Día del Ahorro 💰",cat:"fiscal",note:"Banca, ahorro, inversión. CaixaBank y Abanca directo.",clients:["CaixaBank","Abanca","M2P","Pagofacil"]},
  {month:10,date:"31 oct",name:"Estreno DIME TU NOMBRE (Amazon Prime)",cat:"serie",note:"Serie de terror sobrenatural. Perfecta para la semana de Halloween.",clients:["AOC","Haribo","Freixenet"]},

  // ══ NOVIEMBRE ══
  {month:11,date:"1–2 nov",name:"Día de Todos los Santos 🎉 PUENTE",cat:"festivo",note:"Festivo lunes 2 nov en varias CC.AA. Puente de 4 días.",clients:["Freixenet","Torres Brandy","Viña Sol","Makro","Gallina Blanca","CaixaBank","Abanca"]},
  {month:11,date:"4 nov",name:"Estreno TODAS LAS DE LA LEY (Disney+)",cat:"serie",note:"Ryan Murphy. Kim Kardashian, Naomi Watts, Glenn Close. Drama legal.",clients:["CaixaBank","Abanca","AOC","Freixenet"]},
  {month:11,date:"4 nov",name:"Día del Caldo / Sopa 🍲",cat:"granconsumo",note:"Gallina Blanca directo. Alimentación otoño-invierno.",clients:["Gallina Blanca","Makro","Hero","Nutella"]},
  {month:11,date:"7 nov",name:"Estreno PLURIBUS (Apple TV+)",cat:"serie",note:"Serie sci-fi del creador de Breaking Bad. Uno de los eventos de la temporada.",clients:["AOC","Tech","Parlem","CaixaBank"]},
  {month:11,date:"10–12 nov",name:"Mobile World Congress – Barcelona 📱",cat:"tech",note:"Samsung, Huawei, Sony. Tecnología global. Trending tech.",clients:["Parlem","Bluespace","Tech","AOC","M2P","Digia","CaixaBank","Abanca"]},
  {month:11,date:"11 nov",name:"Single's Day / 11-11 🛒",cat:"granconsumo",note:"El mayor día de ecommerce del año.",clients:["Freshly Cosmetics","Loewe","Ekué","CaixaBank","Abanca","Pagofacil","M2P","Haribo","Nutella","Granini","Tech","AOC"]},
  {month:11,date:"14 nov",name:"Día Mundial de la Diabetes 💙",cat:"farma",note:"El mayor día de farma diabetológica del año.",clients:["Fito","MBS","Isogona","Serelys","Gallina Blanca","Hero","CaixaBank","Abanca"]},
  {month:11,date:"15 nov",name:"Día Mundial del Reciclaje ♻️",cat:"daykeeting",note:"Sostenibilidad. Gran consumo circular, packaging, medioambiente.",clients:["Freshly Cosmetics","Jotun","Hero","Granini","CaixaBank","Abanca","Parlem"]},
  {month:11,date:"15–16 nov",name:"Agorazein – Madrid (Movistar Arena, AGOTADO)",cat:"concierto",note:"Regreso icónico del rap en castellano. Dos noches agotadas.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini"]},
  {month:11,date:"16 nov",name:"Día del Emprendedor 💡",cat:"fiscal",note:"Emprendimiento y startups. Banca, fintech.",clients:["CaixaBank","Abanca","M2P","Parlem","Pagofacil","Digia","Tech"]},
  {month:11,date:"TBC nov",name:"Premios Latin Grammy 🏆",cat:"pelicula",note:"Música latina global. Muy relevante para marcas de entretenimiento.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Granini","Nutella"]},
  {month:11,date:"20 nov",name:"Los Juegos del Hambre: Amanecer en la Cosecha",cat:"pelicula",note:"Nueva precuela del universo Katniss. La franquicia dystópica YA más exitosa.",clients:["Haribo","Nutella","Hero","Granini","CaixaBank","Abanca"]},
  {month:11,date:"20–22 nov",name:"GP MotoGP Valencia – Cheste (FINAL TEMPORADA)",cat:"deporte",note:"Última carrera del Mundial de MotoGP 2026. Gran emotividad.",clients:["Castrol","Frigicoll","AOC","CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:11,date:"23 nov",name:"Tokio Hotel – Madrid (Palacio Vistalegre)",cat:"concierto",note:"Regreso icónico dosmilero. Nostalgia garantizada.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","AOC"]},
  {month:11,date:"25 nov",name:"Día Internacional Contra Violencia de Género 🟣",cat:"daykeeting",note:"Alta conversación social. Marcas con valores deben activar.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Serelys","Parlem"]},
  {month:11,date:"26 nov",name:"Las Crónicas de Narnia (Greta Gerwig)",cat:"pelicula",note:"Primera película de Gerwig tras Barbie (1.400M$). Netflix en cines primero.",clients:["Haribo","Nutella","Hero","Granini","CaixaBank","Abanca","AOC"]},
  {month:11,date:"TBC nov",name:"Black Friday 🛒",cat:"granconsumo",note:"El mayor pico de consumo del año. Gran consumo, retail, electrónica, moda.",clients:["Freshly Cosmetics","Loewe","Ekué","CaixaBank","Abanca","Pagofacil","M2P","Haribo","Nutella","Granini","Tech","AOC","Pilexil","Fito","MBS","Makro"]},
  {month:11,date:"TBC nov",name:"28 Años Después: El Templo de los Huesos",cat:"pelicula",note:"Secuela de 28 años después. Nia DaCosta. Terror zombi británico.",clients:["AOC","Haribo","Freixenet","Torres Brandy"]},

  // ══ DICIEMBRE ══
  {month:12,date:"1 dic",name:"Día Mundial del SIDA 🔴",cat:"farma",note:"El mayor día de farma VIH del año. Alta visibilidad social.",clients:["Fito","MBS","Isogona","CaixaBank","Abanca","Freshly Cosmetics","Musc Intime"]},
  {month:12,date:"3 dic",name:"Día Internacional Personas con Discapacidad",cat:"daykeeting",note:"Inclusión social. RSC y marcas con valores.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Hero","Parlem"]},
  {month:12,date:"3 dic",name:"Día del Médico 👨‍⚕️",cat:"farma",note:"La profesión médica. Todo el portfolio farma.",clients:["Pilexil","Fito","MBS","Isogona","Dormidina","Rinocusi","Talquistina","Serelys"]},
  {month:12,date:"5 dic",name:"Día del Voluntariado",cat:"daykeeting",note:"RSC y propósito de marca.",clients:["CaixaBank","Abanca","Hero","Granini","Parlem"]},
  {month:12,date:"6–8 dic",name:"Puente Constitución + Inmaculada 🎉 (4 días)",cat:"festivo",note:"Festivo 7 dic (lunes). Uno de los puentes más largos del año.",clients:["Freixenet","Torres Brandy","Viña Sol","Granini","Haribo","Nutella","Makro","CaixaBank","Abanca","Jotun","Talquistina","Freshly Cosmetics"]},
  {month:12,date:"11 dic",name:"Jumanji 3",cat:"pelicula",note:"Dwayne Johnson, Jack Black, Kevin Hart. Cine familiar navideño.",clients:["Haribo","Nutella","Hero","Granini","Freixenet","CaixaBank"]},
  {month:12,date:"11–12 dic",name:"Hombres G – Madrid (AGOTADO)",cat:"concierto",note:"Los mejores años de nuestra vida Tour. Nostalgia 80s/90s. Sold out.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Makro"]},
  {month:12,date:"18 dic",name:"DOBLE BOMBAZO: Avengers Doomsday + Dune 3",cat:"pelicula",note:"Avengers con RDJ + Dune Parte 3 (Chalamet, Zendaya) el mismo día.",clients:["Haribo","Nutella","AOC","Granini","Hero","Freixenet","CaixaBank"]},
  {month:12,date:"21 dic",name:"Solsticio de Invierno ❄️",cat:"daykeeting",note:"El día más corto del año. Contenido poético y estacional.",clients:["Freixenet","Freshly Cosmetics","Jotun","Torres Brandy","CaixaBank"]},
  {month:12,date:"22 dic",name:"El Gordo – Lotería de Navidad 🎲",cat:"fiscal",note:"El mayor evento de lotería de Europa. Trending masivo y muy emocional.",clients:["CaixaBank","Abanca","M2P","Pagofacil","Freixenet","Haribo","Nutella","Makro"]},
  {month:12,date:"22 dic",name:"Paga Extra de Navidad 💰",cat:"fiscal",note:"Nóminas dobles. Pico de consumo navideño.",clients:["CaixaBank","Abanca","M2P","Pagofacil","Freixenet","Torres Brandy","Makro","Haribo","Nutella"]},
  {month:12,date:"25 dic",name:"Navidad 🎄",cat:"festivo",note:"El período de mayor actividad de contenido del año.",clients:["Freixenet","Torres Brandy","Viña Sol","Nutella","Haribo","Granini","Hero","Gallina Blanca","Makro","CaixaBank","Abanca","Loewe","Ekué","Freshly Cosmetics","Jotun"]},
  {month:12,date:"25 dic",name:"HARRY POTTER T1 – ESTRENO HBO Max 🪄",cat:"serie",note:"Harry Potter y la Piedra Filosofal. 25 diciembre. 8 episodios. Tráiler con 277M vistas en 48h. FENÓMENO GLOBAL.",clients:["Haribo","Nutella","Hero","Granini","Staedtler","CaixaBank","Abanca","AOC","Freixenet"]},
  {month:12,date:"31 dic",name:"Nochevieja – Las 12 Uvas 🍇",cat:"festivo",note:"Puerta del Sol, 12 uvas, champán. El cierre del año más seguido de España.",clients:["Freixenet","Torres Brandy","Viña Sol","Granini","Haribo","Nutella","Makro","Gallina Blanca","CaixaBank","Abanca","Loewe","Freshly Cosmetics"]},
  {month:12,date:"Dic",name:"Mercadillos de Navidad 🎄",cat:"granconsumo",note:"Madrid, Barcelona, Sevilla, Granada. Lifestyle navideño.",clients:["Haribo","Nutella","Freixenet","Torres Brandy","Makro","Gallina Blanca","Hero","CaixaBank","Abanca","Jotun","Freshly Cosmetics","Loewe"]},
];

const ALL_CATS = Object.keys(CAT);
const UNIQUE_CLIENTS = [...new Set(EVENTS.flatMap(e => e.clients || []))].sort();

function ClientBadge({ name }) {
  const bg = CLIENT_COLORS[name] || "#6B7280";
  return (
    <span style={{ background: bg, color: "#fff", padding: "0.1rem 0.45rem", borderRadius: 5, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {name}
    </span>
  );
}

function EventCard({ ev }) {
  const [hovered, setHovered] = useState(false);
  const cat = CAT[ev.cat];
  if (!cat) return null;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? cat.bg : J.white,
        border: `1.5px solid ${hovered ? cat.color : J.border}`,
        borderLeft: `4px solid ${cat.color}`,
        borderRadius: 10, padding: "0.85rem 1rem",
        transition: "all 0.15s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.4rem", marginBottom: "0.3rem" }}>
        <span style={{ background: cat.color, color: J.white, padding: "0.12rem 0.5rem", borderRadius: 6, fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
          {cat.icon} {cat.tag}
        </span>
        <span style={{ fontSize: "0.68rem", color: J.muted, fontWeight: 600, textAlign: "right", flexShrink: 0 }}>{ev.date}</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: "0.88rem", lineHeight: 1.3, marginBottom: "0.3rem", color: J.text }}>{ev.name}</div>
      {ev.note && <div style={{ fontSize: "0.72rem", color: J.muted, lineHeight: 1.5, marginBottom: "0.4rem" }}>{ev.note}</div>}
      {ev.clients && ev.clients.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", borderTop: `1px solid ${J.border}`, paddingTop: "0.4rem" }}>
          {ev.clients.map(c => <ClientBadge key={c} name={c} />)}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("month");
  const [activeMonth, setActiveMonth] = useState(5);
  const [activeCat, setActiveCat] = useState("todos");
  const [globalCat, setGlobalCat] = useState("serie");
  const [activeClient, setActiveClient] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const matchesSearch = (e) => !q ||
      e.name.toLowerCase().includes(q) ||
      (e.note || "").toLowerCase().includes(q) ||
      (e.clients || []).some(c => c.toLowerCase().includes(q));

    if (view === "month") {
      return EVENTS.filter(e =>
        e.month === activeMonth &&
        (activeCat === "todos" || e.cat === activeCat) &&
        (activeClient === "todos" || (e.clients || []).includes(activeClient)) &&
        matchesSearch(e)
      );
    }
    if (view === "global") {
      return EVENTS.filter(e =>
        e.cat === globalCat &&
        matchesSearch(e)
      );
    }
    // view === "client"
    return EVENTS.filter(e =>
      (activeClient === "todos" || (e.clients || []).includes(activeClient)) &&
      (activeCat === "todos" || e.cat === activeCat) &&
      matchesSearch(e)
    );
  }, [view, activeMonth, activeCat, globalCat, activeClient, search]);

  const renderMonthGrid = (events) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "0.8rem" }}>
      {events.map((ev, i) => <EventCard key={i} ev={ev} />)}
    </div>
  );

  const renderByMonth = (events) => MONTHS.map(m => {
    const mevs = events.filter(e => e.month === m.id);
    if (!mevs.length) return null;
    return (
      <div key={m.id} style={{ marginBottom: "1.8rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem" }}>
          <span style={{ background: J.blue, color: J.white, fontWeight: 800, padding: "0.2rem 0.8rem", borderRadius: 6, fontSize: "0.8rem" }}>{m.name.toUpperCase()}</span>
          <div style={{ height: 2, flex: 1, background: J.border, borderRadius: 2 }} />
          <span style={{ fontSize: "0.75rem", color: J.muted, fontWeight: 600 }}>{mevs.length} eventos</span>
        </div>
        {renderMonthGrid(mevs)}
      </div>
    );
  });

  return (
    <div style={{ fontFamily: "'Rethink Sans', sans-serif", background: J.bg, minHeight: "100vh", color: J.text }}>
      {/* HEADER */}
      <div style={{ background: J.blue, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, background: J.yellow, borderRadius: "50%", opacity: 0.2 }} />
        <div style={{ position: "absolute", bottom: -20, left: 200, width: 100, height: 100, background: J.pink, borderRadius: "50%", opacity: 0.18 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1.5rem 2rem 1.2rem", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div style={{ background: J.white, borderRadius: 14, padding: "6px 14px" }}>
                <span style={{ color: J.blue, fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em" }}>Jirada</span>
              </div>
              <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.3)" }} />
              <div>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Social Creative Agency</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: J.white }}>Calendario de Oportunidades 2026</div>
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ background: J.yellow, color: J.blueDeep, fontWeight: 800, padding: "0.3rem 1rem", borderRadius: 20, fontSize: "0.85rem" }}>ABR — DIC 2026</span>
              <span style={{ background: "rgba(255,255,255,0.15)", color: J.white, fontWeight: 600, padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.8rem" }}>{EVENTS.length} eventos</span>
            </div>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <input type="text" placeholder="🔍  Buscar evento, artista, cliente, serie..."
              value={search} onChange={ev => setSearch(ev.target.value)}
              style={{ width: "100%", maxWidth: 460, padding: "0.55rem 1rem", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, color: J.white, fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginTop: "0.9rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[{id:"month",label:"📅 Por Mes"},{id:"global",label:"🗂️ Por Categoría"},{id:"client",label:"🏷️ Por Cliente"}].map(v => (
              <button key={v.id} onClick={() => { setView(v.id); setActiveCat("todos"); setActiveClient("todos"); }} style={{ padding: "0.4rem 1rem", borderRadius: 20, border: "1.5px solid rgba(255,255,255,0.4)", background: view === v.id ? J.yellow : "rgba(255,255,255,0.1)", color: view === v.id ? J.blueDeep : J.white, fontWeight: 700, fontSize: "0.8rem", transition: "all 0.15s" }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1.5rem 2rem" }}>

        {/* Cat filter – always visible except global view */}
        {view !== "global" && (
          <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {["todos", ...ALL_CATS].map(f => {
              const isActive = f === activeCat;
              const cat = CAT[f];
              return (
                <button key={f} onClick={() => setActiveCat(f)} style={{ padding: "0.28rem 0.65rem", borderRadius: 20, background: isActive ? (cat ? cat.color : J.blue) : "transparent", border: `1.5px solid ${cat ? cat.color : J.blue}`, color: isActive ? J.white : (cat ? cat.color : J.blue), fontSize: "0.68rem", fontWeight: 700, transition: "all 0.15s", whiteSpace: "nowrap" }}>
                  {cat ? `${cat.icon} ${cat.label}` : "🗓 Todos"}
                </button>
              );
            })}
          </div>
        )}

        {/* VISTA MENSUAL */}
        {view === "month" && (
          <>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {MONTHS.map(m => {
                const isActive = m.id === activeMonth;
                const count = EVENTS.filter(e => e.month === m.id).length;
                return (
                  <button key={m.id} onClick={() => setActiveMonth(m.id)} style={{ padding: "0.4rem 0.9rem", borderRadius: 8, background: isActive ? J.blue : J.white, border: `2px solid ${isActive ? J.blue : J.border}`, color: isActive ? J.white : J.muted, fontWeight: 700, fontSize: "0.8rem", transition: "all 0.15s" }}>
                    {m.name} <span style={{ opacity: 0.65, fontSize: "0.7rem" }}>({count})</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
              <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 800, color: J.blue, letterSpacing: "-0.03em" }}>{MONTHS.find(m => m.id === activeMonth)?.name}</h2>
              <div style={{ height: 3, flex: 1, background: `linear-gradient(90deg, ${J.blue}, transparent)`, borderRadius: 2 }} />
              <span style={{ background: J.yellow, color: J.blueDeep, fontWeight: 800, padding: "0.2rem 0.7rem", borderRadius: 12, fontSize: "0.8rem" }}>{filtered.length} eventos</span>
            </div>
            {renderMonthGrid(filtered)}
          </>
        )}

        {/* VISTA GLOBAL POR CATEGORÍA */}
        {view === "global" && (
          <>
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontSize: "0.72rem", color: J.muted, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Selecciona categoría — vista año completo</div>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {ALL_CATS.map(c => {
                  const cat = CAT[c];
                  const isActive = c === globalCat;
                  const count = EVENTS.filter(e => e.cat === c).length;
                  return (
                    <button key={c} onClick={() => setGlobalCat(c)} style={{ padding: "0.4rem 0.9rem", borderRadius: 8, background: isActive ? cat.color : J.white, border: `2px solid ${cat.color}`, color: isActive ? J.white : cat.color, fontWeight: 700, fontSize: "0.78rem", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                      {cat.icon} {cat.label} <span style={{ opacity: 0.65, fontSize: "0.7rem" }}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {(() => {
              const cat = CAT[globalCat];
              return (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "2rem" }}>{cat.icon}</span>
                    <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: 800, color: cat.color }}>{cat.label} — Vista anual</h2>
                    <span style={{ background: cat.color, color: J.white, fontWeight: 800, padding: "0.2rem 0.8rem", borderRadius: 12, fontSize: "0.8rem", marginLeft: "auto" }}>{filtered.length} entradas</span>
                  </div>
                  {renderByMonth(filtered)}
                </>
              );
            })()}
          </>
        )}

        {/* VISTA POR CLIENTE */}
        {view === "client" && (
          <>
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontSize: "0.72rem", color: J.muted, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Selecciona cliente — todas sus oportunidades del año</div>
              <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                <button onClick={() => setActiveClient("todos")} style={{ padding: "0.35rem 0.8rem", borderRadius: 20, background: activeClient === "todos" ? J.blue : J.white, border: `2px solid ${J.blue}`, color: activeClient === "todos" ? J.white : J.blue, fontWeight: 700, fontSize: "0.75rem", transition: "all 0.15s" }}>
                  🏷️ Todos
                </button>
                {UNIQUE_CLIENTS.map(c => (
                  <button key={c} onClick={() => setActiveClient(c)} style={{ padding: "0.35rem 0.8rem", borderRadius: 20, background: activeClient === c ? (CLIENT_COLORS[c] || J.blueDeep) : J.white, border: `2px solid ${CLIENT_COLORS[c] || J.border}`, color: activeClient === c ? J.white : J.text, fontWeight: activeClient === c ? 700 : 500, fontSize: "0.72rem", transition: "all 0.15s" }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: activeClient === "todos" ? J.blue : (CLIENT_COLORS[activeClient] || J.blueDeep) }}>
                {activeClient === "todos" ? "Todos los eventos con propuesta de cliente" : `${activeClient} — Oportunidades 2026`}
              </h2>
              <span style={{ background: J.yellow, color: J.blueDeep, fontWeight: 800, padding: "0.2rem 0.8rem", borderRadius: 12, fontSize: "0.8rem", marginLeft: "auto" }}>{filtered.length} activaciones</span>
            </div>
            {renderByMonth(filtered)}
          </>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: "2.5rem", padding: "1.2rem 1.5rem", background: J.white, border: `1.5px solid ${J.border}`, borderRadius: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.8rem" }}>
            {ALL_CATS.map(c => {
              const cat = CAT[c];
              return (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.7rem", color: J.muted, fontWeight: 600 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: cat.color, display: "inline-block", flexShrink: 0 }} />
                  {cat.icon} {cat.label}
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#aaa", lineHeight: 1.6 }}>
            Fuentes: Seriemaniac · FilmAffinity · Espinof · Infobae ES · Spain.info · esmadrid.com · educaweb · FIFA 2026 · AEAT · SantandersMusic · Songkick · press.max.com<br/>
            ⚡ Compilado por Jirada Social Creative Agency — Abril 2026
          </div>
        </div>
      </div>
    </div>
  );
}
