import { useState, useMemo } from "react";

const J = {
  blue:"#1E90FF", blueDeep:"#003A8C", yellow:"#FFE033",
  pink:"#FF6EC7", white:"#FFFFFF", bg:"#EEF5FF",
  border:"#D0E4FF", text:"#0A1628", muted:"#5B7BA0",
};

const CAT = {
  serie:        {label:"Series",             icon:"📺",color:"#7C3AED",bg:"#EDE9FE",tag:"SERIES"},
  pelicula:     {label:"Cine & Premios",     icon:"🎬",color:"#DC2626",bg:"#FEE2E2",tag:"CINE"},
  concierto:    {label:"Conciertos",         icon:"🎤",color:"#EA580C",bg:"#FFF7ED",tag:"CONCIERTOS"},
  festival:     {label:"Festivales",         icon:"🎪",color:"#D97706",bg:"#FEF3C7",tag:"FESTIVALES"},
  deporte:      {label:"Deportes",           icon:"⚽",color:"#059669",bg:"#D1FAE5",tag:"DEPORTE"},
  daykeeting:   {label:"Daykeeting",         icon:"📅",color:"#0284C7",bg:"#E0F2FE",tag:"DAYKEETING"},
  educacion:    {label:"Educación",          icon:"🎓",color:"#9D174D",bg:"#FCE7F3",tag:"EDUC."},
  festivo:      {label:"Festivos & Cultura", icon:"🇪🇸",color:"#B45309",bg:"#FEF9C3",tag:"FESTIVO"},
  granconsumo:  {label:"Gran Consumo",       icon:"🛒",color:"#16A34A",bg:"#DCFCE7",tag:"GR. CONSUMO"},
  farma:        {label:"Farma & Salud",      icon:"💊",color:"#7E22CE",bg:"#F3E8FF",tag:"FARMA"},
  fiscal:       {label:"Fiscal & Finanzas",  icon:"💶",color:"#374151",bg:"#F3F4F6",tag:"FISCAL"},
  internacional:{label:"Internacional TOP",  icon:"🌍",color:"#1D4ED8",bg:"#DBEAFE",tag:"INTER."},
  cosmetica:    {label:"Cosmética & Belleza",icon:"💄",color:"#DB2777",bg:"#FCE7F3",tag:"COSMÉTICA"},
  hogar:        {label:"Hogar & Motor",      icon:"🏠",color:"#0891B2",bg:"#CFFAFE",tag:"HOGAR"},
  tech:         {label:"Tech & Telecom",     icon:"📱",color:"#4F46E5",bg:"#E0E7FF",tag:"TECH"},
};

const MONTHS = [
  {id:4,name:"Abril"},{id:5,name:"Mayo"},{id:6,name:"Junio"},
  {id:7,name:"Julio"},{id:8,name:"Agosto"},{id:9,name:"Septiembre"},
  {id:10,name:"Octubre"},{id:11,name:"Noviembre"},{id:12,name:"Diciembre"},
];

const CLIENT_COLORS = {
  "Haribo":"#E11D48","Nutella":"#B45309","Granini":"#D97706","Freixenet":"#7C3AED",
  "Torres Brandy":"#374151","Torres Brandy USA":"#1D4ED8","Viña Sol":"#059669",
  "Gallina Blanca":"#EA580C","Hero":"#DC2626","Makro":"#0891B2",
  "Freshly Cosmetics":"#DB2777","Loewe":"#111827","Ekue":"#7C3AED","Flavia":"#BE185D",
  "Talquistina":"#0284C7","CaixaBank":"#B45309","Abanca":"#16A34A",
  "M2P":"#4F46E5","Pagofacil":"#0891B2","Pilexil":"#7C3AED","Fito":"#16A34A",
  "MBS":"#059669","Isogona":"#0284C7","Dormidina":"#4F46E5","Midnavi":"#6D28D9",
  "Rinocusi":"#B45309","Serelys":"#DB2777","Musc Intime":"#9D174D",
  "Hydrafizz":"#0891B2","AOC":"#374151","Tech":"#4F46E5","Parlem":"#1D4ED8",
  "Bluespace":"#0891B2","Digia":"#7C3AED","Castrol":"#DC2626","Frigicoll":"#0284C7",
  "Jotun":"#EA580C","Staedtler":"#DC2626","Erasco":"#D97706","CPC":"#374151",
};

const EVENTS = [
  // ABRIL
  {month:4,date:"1 abr",name:"Super Mario Galaxy: La Pelicula",cat:"pelicula",note:"Estreno global. Secuela mas taquillera de 2023 (+750M$). Yoshi, Rosalina, Bowser Jr.",clients:["Haribo","Nutella","Granini","Hero"]},
  {month:4,date:"1 abr",name:"April Fools / Dia de los Inocentes",cat:"daykeeting",note:"Humor y creatividad en redes. Branded content irreverente.",clients:["Haribo","Freshly Cosmetics","Parlem","Nutella","Granini"]},
  {month:4,date:"2 abr",name:"Dia Mundial del Autismo",cat:"daykeeting",note:"Concienciacion social. Contenido inclusivo y de impacto.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Hero"]},
  {month:4,date:"2 abr",name:"Dia Mundial de la Gelatina",cat:"daykeeting",note:"Muy viral y ludico. Perfecto para marcas de alimentacion.",clients:["Haribo","Nutella","Hero","Granini"]},
  {month:4,date:"3 abr",name:"Dia Mundial del Arcoiris",cat:"daykeeting",note:"Diversidad, color, creatividad. Muy visual para RRSS.",clients:["Freshly Cosmetics","Loewe","Haribo","Granini"]},
  {month:4,date:"6 abr",name:"Dia Mundial de la Actividad Fisica",cat:"daykeeting",note:"Salud y bienestar activo.",clients:["Isogona","MBS","Fito","CaixaBank","Granini"]},
  {month:4,date:"7 abr",name:"Dia Mundial de la Salud (OMS)",cat:"farma",note:"El dia mas importante del anio para farma, seguros y salud. Campania obligada.",clients:["Pilexil","Fito","MBS","Isogona","Dormidina","Midnavi","Rinocusi","Talquistina","Serelys","Musc Intime","Hydrafizz","CaixaBank","Abanca"]},
  {month:4,date:"8 abr",name:"Inicio Campania Renta IRPF 2025",cat:"fiscal",note:"Campania online hasta 30 junio. Alta intencion de busqueda.",clients:["CaixaBank","Abanca","M2P","Pagofacil"]},
  {month:4,date:"10 abr",name:"Semana Santa - Inicio vacaciones",cat:"festivo",note:"Pico de viajes y ocio familiar. Retail, turismo, alimentacion.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Nutella","Gallina Blanca","Hero","Makro","CaixaBank","Abanca","Bluespace"]},
  {month:4,date:"11 abr",name:"Dia Mundial del Parkinson",cat:"farma",note:"Visibilidad enfermedades neurodegenerativas.",clients:["Fito","MBS","Pilexil","CaixaBank"]},
  {month:4,date:"13 abr",name:"Dia Internacional del Beso",cat:"daykeeting",note:"Romance, amor, parejas. Muy emocional y viral.",clients:["Freshly Cosmetics","Loewe","Freixenet","Granini","Nutella"]},
  {month:4,date:"15 abr",name:"Dia Mundial del Arte",cat:"daykeeting",note:"Cultura visual. Marcas creativas, moda, diseno.",clients:["Loewe","Ekue","Staedtler","Freshly Cosmetics","Jotun"]},
  {month:4,date:"16 abr",name:"Dia Mundial del Emprendimiento",cat:"daykeeting",note:"Startups, pymes, emprendedores. Banca y tech.",clients:["CaixaBank","Abanca","Parlem","Tech","M2P","Digia"]},
  {month:4,date:"19 abr",name:"Dia Mundial de los Simpson",cat:"daykeeting",note:"Pop culture masiva. Muy viral en todas las RRSS.",clients:["Haribo","Nutella","Granini","Freixenet"]},
  {month:4,date:"20 abr",name:"Premiere El Diablo Viste de Prada 2 (NYC)",cat:"pelicula",note:"Disney+ emite en directo 23:30h Espana. Moda + nostalgia. Trending semana completa.",clients:["Loewe","Ekue","Flavia","Freshly Cosmetics"]},
  {month:4,date:"21 abr",name:"Dia Mundial de la Creatividad e Innovacion",cat:"daykeeting",note:"Creatividad, ideas, innovacion. Muy apto para agencias y marcas digitales.",clients:["Staedtler","Erasco","Digia","Tech","AOC","Parlem","Freshly Cosmetics"]},
  {month:4,date:"22 abr",name:"Dia de la Tierra",cat:"daykeeting",note:"Sostenibilidad obligada. Gran consumo, energia, moda.",clients:["Freshly Cosmetics","Jotun","Freixenet","Granini","Hero","Gallina Blanca","CaixaBank","Abanca","Parlem"]},
  {month:4,date:"23 abr",name:"Dia del Libro / Sant Jordi",cat:"festivo",note:"Rosas y libros en Cataluna. Gran engagement cultural.",clients:["Staedtler","Erasco","CaixaBank","Abanca","Freixenet","Nutella","Haribo"]},
  {month:4,date:"24 abr",name:"MICHAEL - Biopic Michael Jackson",cat:"pelicula",note:"Jaafar Jackson como MJ. Antoine Fuqua. 200M$. Thriller, Bad, Off the Wall.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro"]},
  {month:4,date:"27 abr",name:"Dia Mundial del Diseno Grafico",cat:"daykeeting",note:"Creatividad visual. Marcas de diseno, agencias, software.",clients:["Staedtler","AOC","Loewe","Freshly Cosmetics","Digia"]},
  {month:4,date:"28 abr",name:"Feria Alimentaria Barcelona",cat:"granconsumo",note:"El mayor evento food de Espana. Lanzamientos y networking.",clients:["Gallina Blanca","Hero","Granini","Nutella","Haribo","Freixenet","Torres Brandy","Makro"]},
  {month:4,date:"29 abr",name:"Dia Internacional de la Danza",cat:"daykeeting",note:"Moda, musica, lifestyle. Muy visual para RRSS.",clients:["Loewe","Ekue","Flavia","Freshly Cosmetics","Freixenet"]},
  {month:4,date:"29 abr",name:"Salon Gourmets Madrid",cat:"granconsumo",note:"Alimentacion premium. Vinos, destilados, gourmet.",clients:["Torres Brandy","Freixenet","Makro","Gallina Blanca","Hero"]},
  {month:4,date:"30 abr",name:"El Diablo Viste de Prada 2 - Cines Espana",cat:"pelicula",note:"Streep + Hathaway + Blunt. 20 aniversario. Trailer 222M vistas/dia.",clients:["Loewe","Ekue","Flavia","Freshly Cosmetics","Freixenet"]},
  {month:4,date:"30 abr",name:"Dia Internacional del Jazz",cat:"daykeeting",note:"Cultura musical. Marcas lifestyle y premium.",clients:["Torres Brandy","Freixenet","Makro","Loewe"]},
  {month:4,date:"10-19 abr",name:"Coachella 2026",cat:"internacional",note:"Sabrina Carpenter, Justin Bieber, Karol G. Conversacion global moda y musica.",clients:["Loewe","Ekue","Freshly Cosmetics","Freixenet","Torres Brandy"]},
  {month:4,date:"13-18 abr",name:"Rosalia - Barcelona (4 noches Palau Sant Jordi)",cat:"concierto",note:"Debut de su nueva gira en casa. Fenomeno global.",clients:["Freixenet","Torres Brandy","Loewe","Ekue","CaixaBank","Abanca"]},
  // MAYO
  {month:5,date:"1 may",name:"Dia del Trabajo - PUENTE largo",cat:"festivo",note:"Cae en viernes. Puente largo. Descanso, viajes y experiencias.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Makro"]},
  {month:5,date:"2 may",name:"Dia Internacional contra el Acoso Escolar",cat:"daykeeting",note:"Inclusion y valores. Educacion y marcas con proposito.",clients:["CaixaBank","Abanca","Staedtler","Erasco","Hero"]},
  {month:5,date:"3 may",name:"Dia Mundial de la Risa",cat:"daykeeting",note:"Humor y entretenimiento. Muy viral. Ideal para marcas con tono desenfadado.",clients:["Haribo","Nutella","Granini","Freshly Cosmetics","Parlem"]},
  {month:5,date:"4 may",name:"Star Wars Day (May the 4th)",cat:"daykeeting",note:"Trending global. Potenciado por estreno Mandalorian el 22 mayo.",clients:["Haribo","Nutella","Granini","Tech","AOC"]},
  {month:5,date:"5 may",name:"Aniversario de LinkedIn",cat:"daykeeting",note:"Redes profesionales. B2B, empleo, marca empleadora.",clients:["CaixaBank","Abanca","Parlem","Tech","M2P","Digia"]},
  {month:5,date:"5 may",name:"Dia de la Madre",cat:"granconsumo",note:"El gran dia del gran consumo: flores, perfumeria, cosmetica, alimentacion premium, farmacia.",clients:["Loewe","Ekue","Flavia","Freshly Cosmetics","Talquistina","Hydrafizz","Nutella","Freixenet","Granini","Hero","CaixaBank","Abanca","Pilexil","Serelys"]},
  {month:5,date:"7 may",name:"Dia Mundial del Asma",cat:"farma",note:"Respiratorio y salud pulmonar.",clients:["Rinocusi","MBS","Fito","Isogona"]},
  {month:5,date:"8 may",name:"Dia Cruz Roja / Enfermeria",cat:"farma",note:"Salud y cuidado. Contenido con proposito.",clients:["Pilexil","Fito","MBS","Rinocusi","Talquistina","CaixaBank","Abanca"]},
  {month:5,date:"9 may",name:"Dia de Europa",cat:"daykeeting",note:"Europa, valores, mercado unico.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy"]},
  {month:5,date:"10 may",name:"Dia de la Salud Mental",cat:"farma",note:"Bienestar mental creciente en conversacion social.",clients:["Dormidina","Midnavi","Fito","MBS","Isogona","CaixaBank","Abanca","Serelys"]},
  {month:5,date:"13 may",name:"Dia Internacional del Hummus",cat:"daykeeting",note:"Alimentacion saludable. Muy viral y ludico.",clients:["Gallina Blanca","Makro","Hero","Granini"]},
  {month:5,date:"13 may",name:"Dia del Coctel",cat:"granconsumo",note:"Cocteleria, destilados, hosteleria.",clients:["Torres Brandy","Torres Brandy USA","Freixenet","Makro"]},
  {month:5,date:"15 may",name:"San Isidro - Madrid",cat:"festivo",note:"Verbenas, chulapos, chotis. Gran oportunidad local en Madrid.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca","CaixaBank","Abanca"]},
  {month:5,date:"15 may",name:"Berlin y la Dama del Arminno T2 (Netflix)",cat:"serie",note:"Spin-off La Casa de Papel. Pedro Alonso en Sevilla.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Makro"]},
  {month:5,date:"15-17 may",name:"GP MotoGP - Catalunya (Montmelo)",cat:"deporte",note:"Marc Marquez. Alta audiencia nacional.",clients:["Castrol","Frigicoll","AOC","Torres Brandy","Freixenet","CaixaBank"]},
  {month:5,date:"16 may",name:"Eurovicion 2026",cat:"internacional",note:"El mayor evento de musica europea. Trending masivo en RRSS durante toda la semana.",clients:["Freixenet","Granini","Haribo","Nutella","CaixaBank","AOC"]},
  {month:5,date:"16 may",name:"Dia Mundial del Heavy Metal",cat:"daykeeting",note:"Cultura rock y metal. Muy de nicho pero altisimo engagement.",clients:["Torres Brandy","Freixenet","AOC"]},
  {month:5,date:"17 may",name:"Dia Mundial contra la Homofobia (IDAHOBIT)",cat:"daykeeting",note:"Diversidad e inclusion. Marcas con valores.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Loewe","Parlem","Freixenet"]},
  {month:5,date:"17 may",name:"Dia Mundial de Internet",cat:"daykeeting",note:"Tecnologia, conectividad. Marcas digitales.",clients:["Parlem","Bluespace","Tech","M2P","AOC","Digia","CaixaBank","Abanca"]},
  {month:5,date:"17 may",name:"Dia Mundial de la Reposteria",cat:"granconsumo",note:"Muy viral. Alimentacion, hosteleria, home baking.",clients:["Nutella","Haribo","Hero","Gallina Blanca","Makro"]},
  {month:5,date:"18 may",name:"Dia Internacional de los Museos",cat:"daykeeting",note:"Cultura y arte. Marcas con identidad cultural.",clients:["Loewe","Torres Brandy","Freixenet","Staedtler"]},
  {month:5,date:"20 may",name:"Dia Mundial de las Abejas",cat:"granconsumo",note:"Biodiversidad + alimentacion. Miel, cosmetica natural.",clients:["Hero","Granini","Freshly Cosmetics","Gallina Blanca","Nutella"]},
  {month:5,date:"21 may",name:"Dia Mundial del Te",cat:"granconsumo",note:"Infusiones, bienestar, lifestyle.",clients:["Fito","Hero","Gallina Blanca","Makro"]},
  {month:5,date:"22 may",name:"Dia Mundial del Pac-Man",cat:"daykeeting",note:"Gaming y cultura retro. Muy viral.",clients:["Haribo","Nutella","AOC","Tech","Granini"]},
  {month:5,date:"22 may",name:"Bad Bunny - Barcelona (Estadi Olimpic) 1a noche",cat:"concierto",note:"DeBi TiRAR MaS FOToS World Tour. 600.000 entradas agotadas en Espana.",clients:["Freixenet","Torres Brandy","Haribo","Granini","CaixaBank","Abanca"]},
  {month:5,date:"22 may",name:"The Mandalorian and Grogu (cines)",cat:"pelicula",note:"Star Wars en cines. Baby Yoda + Mando. Audiencia masiva.",clients:["Haribo","Nutella","Granini","Hero","AOC"]},
  {month:5,date:"25 may",name:"Dia del Orgullo Friki",cat:"daykeeting",note:"Gaming, comics, series. Comunidad muy activa en RRSS.",clients:["AOC","Haribo","Nutella","Tech","Granini"]},
  {month:5,date:"28 may",name:"Dia Mundial de la Hamburguesa",cat:"granconsumo",note:"Hosteleria y alimentacion. Muy viral en RRSS.",clients:["Gallina Blanca","Makro","Nutella","Hero","Haribo"]},
  {month:5,date:"29 may",name:"Dia Mundial del Vino",cat:"granconsumo",note:"Vino, maridaje, gastronomia.",clients:["Torres Brandy","Freixenet","Makro","Gallina Blanca"]},
  {month:5,date:"30-31 may",name:"Bad Bunny - Madrid (Metropolitano) 1a y 2a noche",cat:"concierto",note:"Inicio de 10 fechas en Madrid. Hito historico. 60.000 personas/noche.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Granini","Haribo"]},
  {month:5,date:"31 may",name:"Dia Mundial sin Tabaco",cat:"farma",note:"Salud respiratoria.",clients:["Fito","MBS","Rinocusi","Isogona","CaixaBank","Abanca"]},
  {month:5,date:"28-31 may",name:"La Oreja de Van Gogh - Madrid (x3 AGOTADO)",cat:"concierto",note:"Regreso epico con Amaia Montero. Tres noches agotadas.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Makro"]},
  {month:5,date:"TBC may",name:"Met Gala",cat:"internacional",note:"El mayor evento de moda del mundo. Trending masivo global.",clients:["Loewe","Ekue","Flavia","Freshly Cosmetics","Freixenet"]},
  {month:5,date:"TBC may",name:"Cannes Film Festival",cat:"internacional",note:"Cine, lujo, moda. Alfombra roja. Trending premium.",clients:["Loewe","Ekue","Freixenet","Torres Brandy"]},
  {month:5,date:"7 may",name:"Eric Clapton - Madrid (Movistar Arena)",cat:"concierto",note:"Regreso a Espana tras 20 anios. Leyenda del rock y blues.",clients:["Torres Brandy","Freixenet","Makro","CaixaBank","Abanca"]},
  // JUNIO
  {month:6,date:"1 jun",name:"Dia Internacional de la Infancia",cat:"daykeeting",note:"Gran consumo: juguetes, alimentacion infantil, salud pediatrica.",clients:["Haribo","Nutella","Hero","Granini","Gallina Blanca","Talquistina","Isogona","MBS"]},
  {month:6,date:"1 jun",name:"Paga Extra de Verano",cat:"fiscal",note:"Nominas dobles. Pico de consumo. Banca, inversion, gran consumo.",clients:["CaixaBank","Abanca","M2P","Pagofacil","Freixenet","Makro","Haribo"]},
  {month:6,date:"2-4 jun",name:"SELECTIVIDAD PAU - Convocatoria Ordinaria",cat:"educacion",note:"Andalucia, Madrid, Pais Vasco, Galicia, Valencia. Enorme conversacion jovenes.",clients:["Staedtler","Erasco","CaixaBank","Abanca","Hero","Haribo","Nutella","Granini"]},
  {month:6,date:"3 jun",name:"Dia Mundial de la Bicicleta",cat:"daykeeting",note:"Movilidad sostenible, deporte, lifestyle.",clients:["CaixaBank","Abanca","Isogona","MBS","Freshly Cosmetics"]},
  {month:6,date:"3 jun",name:"Dia Mundial del Running",cat:"daykeeting",note:"Deporte popular. Nutricion, calzado, bienestar.",clients:["Isogona","MBS","Fito","Granini","Hero"]},
  {month:6,date:"3-7 jun",name:"Primavera Sound 2026 - Barcelona",cat:"festival",note:"El Coachella europeo. Indie, alternativo, pop.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca","Freshly Cosmetics"]},
  {month:6,date:"5 jun",name:"Dia Mundial del Medio Ambiente",cat:"daykeeting",note:"Sostenibilidad obligada para gran consumo, energia, alimentacion.",clients:["Freshly Cosmetics","Jotun","Freixenet","Granini","Hero","Gallina Blanca","CaixaBank","Abanca","Parlem"]},
  {month:6,date:"8 jun",name:"Dia Mundial de los Oceanos",cat:"daykeeting",note:"Medioambiente, turismo, alimentacion sostenible.",clients:["Freshly Cosmetics","Granini","Hero","Freixenet","CaixaBank","Abanca"]},
  {month:6,date:"9-11 jun",name:"SELECTIVIDAD PAU - Cataluna",cat:"educacion",note:"Cataluna tiene fechas propias.",clients:["Staedtler","Erasco","CaixaBank","Abanca"]},
  {month:6,date:"9 jun",name:"Mobland (SkyShowtime)",cat:"serie",note:"Guy Ritchie. Tom Hardy, Pierce Brosnan, Helen Mirren. Mafia. Bombazo del anio.",clients:["Torres Brandy","Freixenet","Makro","CaixaBank"]},
  {month:6,date:"11 jun",name:"Dia Internacional del Juego",cat:"daykeeting",note:"Gaming, board games, entretenimiento familiar.",clients:["Haribo","Nutella","AOC","Granini","Staedtler"]},
  {month:6,date:"11 jun",name:"MUNDIAL FIFA 2026 - ARRANCA",cat:"deporte",note:"EE.UU., Mexico, Canada. 48 selecciones. El evento deportivo del anio.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Nutella","Gallina Blanca","Makro","AOC","Castrol"]},
  {month:6,date:"12 jun",name:"Scary Movie 6",cat:"pelicula",note:"Regreso Wayans + Anna Faris + Regina Hall tras 13 anios. Muy viral.",clients:["Haribo","Nutella","Granini","Freixenet"]},
  {month:6,date:"14 jun",name:"Dia Mundial del Donante de Sangre",cat:"farma",note:"Salud y solidaridad. Cruz Roja.",clients:["Pilexil","MBS","Fito","CaixaBank","Abanca","Isogona"]},
  {month:6,date:"18 jun",name:"Dia Internacional del Sushi",cat:"daykeeting",note:"Gastronomia viral. Hosteleria y alimentacion.",clients:["Gallina Blanca","Makro","Granini","Hero"]},
  {month:6,date:"18-21 jun",name:"Sonar 2026 - Barcelona",cat:"festival",note:"Referente mundial de musica electronica y tecnologia digital.",clients:["Freixenet","Torres Brandy","Granini","AOC","Tech","Parlem"]},
  {month:6,date:"19 jun",name:"Toy Story 5",cat:"pelicula",note:"Woody y Buzz regresan. El regreso Pixar mas esperado.",clients:["Haribo","Nutella","Hero","Granini","Staedtler"]},
  {month:6,date:"19 jun",name:"Lume (HBO Max)",cat:"serie",note:"Serie espanola. Thriller sobre incendios en Galicia.",clients:["CaixaBank","Abanca","Jotun"]},
  {month:6,date:"20 jun",name:"Yellow Day - el dia mas feliz del anio",cat:"daykeeting",note:"Positividad, alegria, bienestar. Muy compartible.",clients:["Haribo","Nutella","Granini","Freshly Cosmetics","Freixenet"]},
  {month:6,date:"20-21 jun",name:"Kalorama - Madrid (Caja Magica)",cat:"festival",note:"Pet Shop Boys, Jorja Smith, Scissor Sisters. Festival pop-indie en Madrid.",clients:["Freixenet","Torres Brandy","Granini","AOC"]},
  {month:6,date:"21 jun",name:"Solsticio de Verano / Dia de la Musica",cat:"daykeeting",note:"Conciertos gratuitos, musica en la calle. Tendencia en Europa.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Freshly Cosmetics","Makro"]},
  {month:6,date:"21 jun",name:"Dia Internacional del Yoga",cat:"daykeeting",note:"Bienestar, mindfulness, salud. Muy popular en RRSS.",clients:["Isogona","MBS","Fito","Freshly Cosmetics","Granini","Serelys"]},
  {month:6,date:"21 jun",name:"Dia Mundial del Selfie",cat:"daykeeting",note:"Muy viral en RRSS. Contenido UGC, marcas de cosmetica y lifestyle.",clients:["Freshly Cosmetics","Loewe","Ekue","AOC","Haribo","Granini"]},
  {month:6,date:"21 jun",name:"Dia del Padre",cat:"granconsumo",note:"Perfumeria, tecnologia, deporte, alimentacion.",clients:["Loewe","Ekue","Flavia","Torres Brandy","Freixenet","Granini","AOC","CaixaBank","Abanca","Castrol","Makro"]},
  {month:6,date:"23-24 jun",name:"Linkin Park - Madrid (Rivas Vaciamadrid)",cat:"concierto",note:"Regreso con nueva cantante Emily Armstrong. Sold out.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","AOC"]},
  {month:6,date:"24 jun",name:"San Juan",cat:"festivo",note:"Hogueras, playa, noche magica en Galicia, Valencia, Cataluna.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro","CaixaBank","Abanca","Jotun"]},
  {month:6,date:"25-28 jun",name:"Resurrection Fest - Viveiro",cat:"festival",note:"Korn, Slipknot, Judas Priest. Metal.",clients:["Freixenet","Torres Brandy","Makro","CaixaBank"]},
  {month:6,date:"26 jun",name:"Supergirl: Woman of Tomorrow (DC)",cat:"pelicula",note:"DC Universe. Gran expectacion fans superheroes.",clients:["Haribo","Nutella","AOC","Granini"]},
  {month:6,date:"28 jun",name:"Dia Internacional Orgullo LGTBIQ+",cat:"daykeeting",note:"El dia de mayor alcance para diversidad en redes.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Loewe","Freixenet","Granini","Parlem"]},
  {month:6,date:"30 jun",name:"Dia de las Redes Sociales",cat:"daykeeting",note:"El dia de las RRSS. Perfecto para todas las marcas activas en social media.",clients:["CaixaBank","Abanca","Parlem","Tech","AOC","Digia","Freshly Cosmetics","Haribo","Granini","Nutella"]},
  {month:6,date:"30 jun",name:"FIN Campania Declaracion de la Renta",cat:"fiscal",note:"Ultimo dia IRPF 2025.",clients:["CaixaBank","Abanca","M2P","Pagofacil"]},
  {month:6,date:"TBC jun",name:"Champions League - Final",cat:"deporte",note:"Futbol europeo maximo. El partido mas visto del continente.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Castrol","AOC"]},
  // JULIO
  {month:7,date:"1 jul",name:"Inicio Rebajas de Verano",cat:"granconsumo",note:"Pico de consumo en retail, moda y gran consumo. Ecommerce.",clients:["Freshly Cosmetics","Loewe","Ekue","Flavia","CaixaBank","Abanca","Pagofacil","M2P","Haribo","Nutella"]},
  {month:7,date:"1 jul",name:"Dia Internacional del Chiste",cat:"daykeeting",note:"Humor, entretenimiento. Muy viral y facil de activar.",clients:["Haribo","Nutella","Granini","Freixenet"]},
  {month:7,date:"1 jul",name:"Minions 3 (Minions and Monsters)",cat:"pelicula",note:"7a entrega Mi Villano Favorito. Trending meme garantizado.",clients:["Haribo","Nutella","Granini","Hero","Makro"]},
  {month:7,date:"2 jul",name:"Dia Internacional del OVNI",cat:"daykeeting",note:"Humor y misterio. Muy viral y creativo.",clients:["Haribo","Nutella","AOC","Granini"]},
  {month:7,date:"4 jul",name:"Independencia USA",cat:"daykeeting",note:"Barbacoas, verano, cultura americana.",clients:["Torres Brandy USA","Haribo","Granini","Nutella","Freixenet"]},
  {month:7,date:"5 jul",name:"Dia Mundial del Bikini",cat:"cosmetica",note:"Verano, playa, cuerpo. Cosmetica solar, moda.",clients:["Freshly Cosmetics","Talquistina","Hydrafizz","Loewe","Ekue"]},
  {month:7,date:"6-14 jul",name:"San Fermin - Pamplona",cat:"festivo",note:"Encierros, chupinazo. Icono cultural espaniol con proyeccion internacional.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro","CaixaBank","Abanca"]},
  {month:7,date:"7 jul",name:"Dia Mundial del Chocolate",cat:"granconsumo",note:"Confiteria, snacks. Altisimo engagement.",clients:["Haribo","Nutella","Hero","Makro","Gallina Blanca"]},
  {month:7,date:"7 jul",name:"Dia Mundial del Osito Gominola",cat:"granconsumo",note:"Haribo directo. El dia del anio para la marca.",clients:["Haribo"]},
  {month:7,date:"8 jul",name:"Dia Mundial de la Alergia",cat:"farma",note:"Rinocusi directo. Temporada post-primavera.",clients:["Rinocusi","MBS","Fito","Isogona"]},
  {month:7,date:"8-11 jul",name:"Mad Cool 2026 - Madrid",cat:"festival",note:"Foo Fighters, Florence+Machine, Lorde, Twenty One Pilots, Kings of Leon, Nick Cave.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca","AOC","Freshly Cosmetics","Makro"]},
  {month:7,date:"9-11 jul",name:"Bilbao BBK Live 2026",cat:"festival",note:"Lily Allen, Robbie Williams, Alabama Shakes, Interpol, IDLES. Kobetamendi.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca"]},
  {month:7,date:"10 jul",name:"Vaiana - Live-Action Disney",cat:"pelicula",note:"Remake accion real de Moana. Dwayne Johnson como Maui. 10 aniversario.",clients:["Haribo","Nutella","Hero","Granini","Freshly Cosmetics"]},
  {month:7,date:"10 jul",name:"Dia del Vino Rosado",cat:"granconsumo",note:"Rose season. Verano, terrazas, lifestyle.",clients:["Torres Brandy","Freixenet","Makro"]},
  {month:7,date:"11-12 jul",name:"Aitana - Madrid (Movistar Arena) 1a y 2a noche",cat:"concierto",note:"Cuarto Azul World Tour. Dos noches agotadas.",clients:["Freshly Cosmetics","Loewe","Ekue","Freixenet","Granini","CaixaBank","Abanca"]},
  {month:7,date:"13 jul",name:"Dia Mundial del Rock",cat:"daykeeting",note:"Musica rock. Muy de nicho pero gran engagement.",clients:["Torres Brandy","Freixenet","AOC","Makro"]},
  {month:7,date:"16 jul",name:"Dia Mundial del Emoji",cat:"daykeeting",note:"Trending ludico. Muy viral y facil de activar.",clients:["Haribo","Nutella","Freshly Cosmetics","Parlem","Granini","CaixaBank","Abanca"]},
  {month:7,date:"17 jul",name:"La Odisea (Christopher Nolan)",cat:"pelicula",note:"Homero en IMAX. El evento cinematografico del verano.",clients:["AOC","CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:7,date:"17-19 jul",name:"FIB 2026 - Benicassim",cat:"festival",note:"The Prodigy, The Kooks, Kaiser Chiefs, Biffy Clyro, Pendulum.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca","Freshly Cosmetics","Talquistina"]},
  {month:7,date:"18 jul",name:"Dia Internacional de Nelson Mandela",cat:"daykeeting",note:"Justicia, igualdad, valores. RSC.",clients:["CaixaBank","Abanca","Hero","Freshly Cosmetics"]},
  {month:7,date:"19 jul",name:"MUNDIAL FIFA 2026 - FINAL",cat:"deporte",note:"La final del torneo mas visto de la historia.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Nutella","Gallina Blanca","Makro","Castrol"]},
  {month:7,date:"21 jul",name:"Dia Mundial del Perro",cat:"daykeeting",note:"Las mascotas son trending garantizado en RRSS.",clients:["Hero","Fito","MBS","Freshly Cosmetics","Granini"]},
  {month:7,date:"21 jul",name:"Dia Internacional del Gazpacho",cat:"daykeeting",note:"Gastronomia espanola en verano. Muy viral y local.",clients:["Gallina Blanca","Makro","Granini","Hero"]},
  {month:7,date:"22 jul",name:"Aitana - Madrid 3a y 4a noche",cat:"concierto",note:"Cuarto Azul World Tour. 4 noches en Madrid en total.",clients:["Freshly Cosmetics","Loewe","Ekue","Freixenet","Granini","CaixaBank","Abanca"]},
  {month:7,date:"25 jul",name:"Santiago Apostol - Dia de Galicia",cat:"festivo",note:"Festivo en Galicia. El Camino, peregrinacion, cultura.",clients:["CaixaBank","Abanca","Freixenet","Gallina Blanca","Granini"]},
  {month:7,date:"26 jul",name:"Dia de los Abuelos",cat:"granconsumo",note:"Familia multigeneracional. Gran consumo y farma senior.",clients:["Hero","Gallina Blanca","Serelys","Fito","MBS","Isogona","CaixaBank","Abanca"]},
  {month:7,date:"29 jul",name:"Dia Mundial de la Lasania",cat:"daykeeting",note:"Gastronomia viral. Hosteleria y alimentacion.",clients:["Gallina Blanca","Makro","Nutella","Hero"]},
  {month:7,date:"30 jul",name:"Dia Mundial de la Amistad",cat:"daykeeting",note:"Muy emocional. Gran consumo: bebidas, snacks, experiencias.",clients:["Haribo","Nutella","Freixenet","Granini","Hero","Torres Brandy","CaixaBank","Abanca"]},
  {month:7,date:"31 jul",name:"Dia Internacional del Aguacate",cat:"daykeeting",note:"Alimentacion saludable y trendy. Muy viral.",clients:["Gallina Blanca","Makro","Freshly Cosmetics","Hero","Granini"]},
  {month:7,date:"31 jul",name:"Spider-Man: Brand New Day",cat:"pelicula",note:"Tom Holland regresa. Con Hulk y Punisher. Conversacion Marvel maxima.",clients:["Haribo","Nutella","AOC","Granini","Hero"]},
  // AGOSTO
  {month:8,date:"1 ago",name:"Dia Mundial de la Cerveza",cat:"granconsumo",note:"Bebidas, hosteleria. Muy viral en verano.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca","Granini"]},
  {month:8,date:"1-2 ago",name:"Dreambeach - Velez-Malaga",cat:"festival",note:"David Guetta, Eric Prydz. Electronica + playa. +120.000 asistentes.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Freshly Cosmetics","Talquistina"]},
  {month:8,date:"7 ago",name:"Dia Internacional de la Cerveza (1er viernes)",cat:"granconsumo",note:"Mayor conversacion cervecera en RRSS.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca"]},
  {month:8,date:"8 ago",name:"Dia Internacional del Gato",cat:"daykeeting",note:"Trending garantizado. Las mascotas arrasan en RRSS.",clients:["Hero","Fito","MBS","Freshly Cosmetics","Granini"]},
  {month:8,date:"8 ago",name:"Dia Mundial del Ojo",cat:"farma",note:"Salud ocular. Rinocusi directo.",clients:["Rinocusi","MBS","Fito"]},
  {month:8,date:"9 ago",name:"Dia Internacional del Coworking",cat:"tech",note:"Trabajo colaborativo y espacios flexibles. Bluespace directo.",clients:["Bluespace","Parlem","Tech","CaixaBank","Abanca","Digia"]},
  {month:8,date:"12 ago",name:"Dia Internacional del Disco de Vinilo",cat:"daykeeting",note:"Musica analogica, nostalgia, cultura pop.",clients:["Torres Brandy","Freixenet","AOC"]},
  {month:8,date:"12 ago",name:"Dia Internacional de la Juventud",cat:"daykeeting",note:"Marcas de consumo joven, educacion y cultura.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Haribo","Granini","Parlem","Staedtler"]},
  {month:8,date:"13 ago",name:"Dia Internacional de los Zurdos",cat:"daykeeting",note:"Curiosidad viral. Humor y creatividad.",clients:["Staedtler","AOC","Haribo","Nutella"]},
  {month:8,date:"15 ago",name:"Asuncion de la Virgen - FESTIVO NACIONAL",cat:"festivo",note:"Pico de vacaciones. Turismo, hosteleria, distribucion.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro","Talquistina","Freshly Cosmetics"]},
  {month:8,date:"19 ago",name:"Dia Mundial de la Fotografia",cat:"daykeeting",note:"Muy visual. Marcas creativas, fotografos, moda, lifestyle.",clients:["Loewe","Ekue","Freshly Cosmetics","AOC","Staedtler","Flavia"]},
  {month:8,date:"22 ago",name:"Dia Mundial del Folklore",cat:"daykeeting",note:"Cultura y tradicion.",clients:["Torres Brandy","Freixenet","Gallina Blanca","Makro"]},
  {month:8,date:"23 ago",name:"Dia Mundial del Hashtag",cat:"daykeeting",note:"El dia de los hashtags. Perfecto para hablar de RRSS y estrategia digital.",clients:["Parlem","Tech","AOC","Digia","CaixaBank","Abanca"]},
  {month:8,date:"23 ago",name:"Dia del Internauta",cat:"daykeeting",note:"Internet y conectividad. Marcas digitales.",clients:["Parlem","Tech","AOC","M2P","CaixaBank","Abanca"]},
  {month:8,date:"28-30 ago",name:"The Weeknd - Madrid (Metropolitano)",cat:"concierto",note:"After Hours Til Dawn Tour. 3 noches. R&B global de primer nivel.",clients:["Freixenet","Torres Brandy","Freshly Cosmetics","Loewe","CaixaBank","Granini"]},
  {month:8,date:"28-30 ago",name:"GP MotoGP - Aragon (MotorLand)",cat:"deporte",note:"Gran Premio de Aragon. Marc Marquez en casa.",clients:["Castrol","Frigicoll","AOC","CaixaBank","Abanca"]},
  {month:8,date:"29 ago",name:"Dia Mundial del Gamer",cat:"daykeeting",note:"Gaming. Comunidad muy activa en RRSS.",clients:["AOC","Tech","Haribo","Nutella","Granini"]},
  {month:8,date:"TBC",name:"Arenal Sound - Burriana",cat:"festival",note:"Mayor festival de playa de Espana. Pop, indie, reggaeton.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank","Abanca","Freshly Cosmetics","Talquistina"]},
  {month:8,date:"TBC",name:"Medusa Festival - Benicassim",cat:"festival",note:"Electronica masiva y playa. Muy viral.",clients:["Freixenet","Torres Brandy","Granini","AOC"]},
  {month:8,date:"TBC",name:"Sonorama Ribera - Aranda de Duero",cat:"festival",note:"Crystal Fighters, Leiva, Love of Lesbian, Guitarricadelafuente.",clients:["Torres Brandy","Freixenet","CaixaBank","Abanca"]},
  // SEPTIEMBRE
  {month:9,date:"1 sep",name:"Vuelta al Cole",cat:"granconsumo",note:"El pico de compra escolar. Mochilas, material, alimentacion, farma.",clients:["Staedtler","Erasco","CaixaBank","Abanca","Hero","Haribo","Nutella","Granini","Gallina Blanca","Isogona","MBS","Pilexil","Makro"]},
  {month:9,date:"1-6 sep",name:"Premier Padel - Madrid (Movistar Arena)",cat:"deporte",note:"Lebron, Galan, Tapia. Las grandes estrellas del padel mundial.",clients:["CaixaBank","Abanca","Castrol","AOC","Makro"]},
  {month:9,date:"2-4 sep",name:"Selectividad Extraordinaria - Cataluna",cat:"educacion",note:"Segunda convocatoria PAU en Cataluna.",clients:["Staedtler","Erasco","CaixaBank","Abanca"]},
  {month:9,date:"4-8 sep",name:"Aitana - Barcelona (Palau Sant Jordi, 4 noches)",cat:"concierto",note:"Cuarto Azul World Tour en casa. Fenomeno en Cataluna.",clients:["Freshly Cosmetics","Loewe","Ekue","Freixenet","Granini","CaixaBank","Abanca"]},
  {month:9,date:"5 sep",name:"Dia Mundial del Hermano",cat:"daykeeting",note:"Familia y afecto. Gran consumo y emocional.",clients:["Haribo","Nutella","Hero","Granini","CaixaBank"]},
  {month:9,date:"8-9 sep",name:"Leiva - Madrid (Movistar Arena, 4 noches)",cat:"concierto",note:"El cantautor de referencia del indie espaniol.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca"]},
  {month:9,date:"9 sep",name:"Dia de la Belleza",cat:"cosmetica",note:"El dia mas importante del anio para cosmetica, perfumeria y belleza.",clients:["Freshly Cosmetics","Loewe","Ekue","Flavia","Talquistina","Hydrafizz","Musc Intime","Pilexil"]},
  {month:9,date:"10 sep",name:"Dia Mundial Prevencion del Suicidio",cat:"farma",note:"Salud mental. Muy sensible.",clients:["Dormidina","Midnavi","Fito","MBS","Serelys","CaixaBank","Abanca"]},
  {month:9,date:"11-15 sep",name:"Aitana - Madrid (Movistar Arena, 4 noches)",cat:"concierto",note:"Cuarto Azul World Tour en Madrid. 4 noches. Fenomeno historico.",clients:["Freshly Cosmetics","Loewe","Ekue","Freixenet","Granini","CaixaBank","Abanca"]},
  {month:9,date:"11-13 sep",name:"Gran Premio de Espana F1 - Madrid (IFEMA)",cat:"deporte",note:"F1 vuelve a Madrid. Evento historico. Trending global.",clients:["Castrol","Frigicoll","AOC","CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:9,date:"13 sep",name:"Dia Internacional del Chocolate",cat:"granconsumo",note:"Chocolates, postres, snacks. Altisimo engagement.",clients:["Haribo","Nutella","Hero","Makro","Gallina Blanca"]},
  {month:9,date:"18-27 sep",name:"Shakira - Madrid (residencia, 6 noches)",cat:"concierto",note:"Estadio Shakira: 18, 19, 20, 25, 26 y 27 sept. El evento del otonio.",clients:["Freixenet","Torres Brandy","Freshly Cosmetics","Loewe","CaixaBank","Abanca","Granini","Nutella"]},
  {month:9,date:"TBC sep",name:"Semana de la Moda Madrid (MBFWM)",cat:"cosmetica",note:"Moda, lifestyle. Alta repercusion en RRSS.",clients:["Loewe","Ekue","Flavia","Freshly Cosmetics","Talquistina","Hydrafizz"]},
  {month:9,date:"TBC sep",name:"Festival de San Sebastian",cat:"pelicula",note:"El festival de cine mas importante de Espana.",clients:["Freixenet","Torres Brandy","Loewe","CaixaBank","Abanca"]},
  {month:9,date:"21 sep",name:"Dia Mundial del Alzheimer",cat:"farma",note:"Enfermedades neurodegenerativas. Farma y bienestar senior.",clients:["Fito","MBS","Serelys","Isogona","CaixaBank","Abanca"]},
  {month:9,date:"21 sep",name:"Dia Internacional de la Paz",cat:"daykeeting",note:"Valores universales. Marcas con proposito.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Hero","Granini","Parlem"]},
  {month:9,date:"22 sep",name:"Equinoccio de Otonio",cat:"daykeeting",note:"Cambio de estacion. Contenido estacional de otonio.",clients:["Jotun","Freshly Cosmetics","Gallina Blanca","Hero","Torres Brandy"]},
  {month:9,date:"22 sep",name:"Dia Mundial Sin Coche",cat:"daykeeting",note:"Movilidad sostenible. Marcas con valores medioambientales.",clients:["CaixaBank","Abanca","Parlem","Jotun","Freshly Cosmetics"]},
  {month:9,date:"25 sep",name:"Dia del Farmaceutico",cat:"farma",note:"El dia de la profesion farmaceutica. Todo el portfolio farma.",clients:["Pilexil","Fito","MBS","Isogona","Dormidina","Rinocusi","Talquistina","Serelys","Midnavi","Musc Intime"]},
  {month:9,date:"26 sep",name:"Estreno ROMI (Amazon Prime Video)",cat:"serie",note:"Serie espanola. Agente de policia sorda.",clients:["CaixaBank","Abanca","Parlem","Digia"]},
  {month:9,date:"27 sep",name:"Aniversario de Google",cat:"daykeeting",note:"Marketing digital, SEO, tecnologia.",clients:["Parlem","Tech","AOC","Digia","CaixaBank","M2P"]},
  {month:9,date:"27 sep",name:"Dia Mundial del Turismo",cat:"granconsumo",note:"Hosteleria, destinos, agencias.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Makro","Gallina Blanca"]},
  {month:9,date:"29 sep",name:"Dia Mundial del Corazon",cat:"farma",note:"El mayor dia de farma cardiovascular del anio.",clients:["Fito","MBS","Isogona","Serelys","CaixaBank","Abanca","Gallina Blanca","Hero"]},
  {month:9,date:"30 sep",name:"Dia Internacional del Podcast",cat:"daykeeting",note:"Audio digital. Marcas con contenido y comunicacion.",clients:["Parlem","Tech","CaixaBank","Abanca","Digia","AOC"]},
  // OCTUBRE
  {month:10,date:"1 oct",name:"Dia Internacional de las Personas Mayores",cat:"farma",note:"Salud senior, suplementacion.",clients:["Pilexil","Fito","MBS","Isogona","Dormidina","Serelys","CaixaBank","Abanca"]},
  {month:10,date:"1 oct",name:"Dia Mundial del Cafe",cat:"granconsumo",note:"Gran consumo: cafe, hosteleria. Altisimo engagement.",clients:["Gallina Blanca","Makro","Nutella","Granini","Freixenet"]},
  {month:10,date:"1 oct",name:"Dia del Automovil",cat:"hogar",note:"Castrol directo. Motor, mantenimiento, tecnologia.",clients:["Castrol","Frigicoll","AOC"]},
  {month:10,date:"2 oct",name:"Dia Mundial de la Sonrisa",cat:"daykeeting",note:"Positividad y bienestar. Muy emocional y viral.",clients:["Haribo","Nutella","Granini","Freshly Cosmetics","CaixaBank"]},
  {month:10,date:"2-11 oct",name:"Shakira - Madrid (cierre residencia, 5 noches)",cat:"concierto",note:"2, 3, 4, 10 y 11 oct. 11 noches totales en Madrid.",clients:["Freixenet","Torres Brandy","Freshly Cosmetics","Loewe","CaixaBank","Abanca"]},
  {month:10,date:"3 oct",name:"Estreno MONSTRUO: Ed Gein (Netflix)",cat:"serie",note:"Ryan Murphy. Nueva entrega de la saga. Expectacion maxima.",clients:["AOC","Haribo","Freixenet","Torres Brandy"]},
  {month:10,date:"3 oct",name:"Estreno ZOOMERS (Amazon Prime)",cat:"serie",note:"Miniserie espanola de comedia universitaria. Audiencia joven.",clients:["CaixaBank","Abanca","Staedtler","Haribo","Granini"]},
  {month:10,date:"4 oct",name:"Dia Mundial de los Animales",cat:"daykeeting",note:"Mascotas y bienestar animal. Muy viral.",clients:["Hero","Fito","MBS","Freshly Cosmetics","Granini"]},
  {month:10,date:"5 oct",name:"Dia Mundial de los Docentes",cat:"educacion",note:"Educacion y formacion.",clients:["Staedtler","Erasco","CaixaBank","Abanca"]},
  {month:10,date:"6 oct",name:"Aniversario de Instagram",cat:"daykeeting",note:"El cumpleanios de la red mas visual. Perfecto para marcas activas en Instagram.",clients:["Freshly Cosmetics","Loewe","Ekue","AOC","Haribo","Granini","CaixaBank","Parlem"]},
  {month:10,date:"8 oct",name:"Estreno LA SUERTE (Disney+)",cat:"serie",note:"Comedia de Paco Plaza. Produccion espanola.",clients:["CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:10,date:"9 oct",name:"Dia Mundial del Huevo",cat:"granconsumo",note:"Alimentacion basica. Muy viral y facil de activar.",clients:["Gallina Blanca","Makro","Hero","Nutella"]},
  {month:10,date:"10 oct",name:"Dia Mundial Salud Mental",cat:"farma",note:"El dia mas importante del anio para salud mental.",clients:["Dormidina","Midnavi","Fito","MBS","Isogona","Serelys","CaixaBank","Abanca","Freshly Cosmetics"]},
  {month:10,date:"11 oct",name:"Dia Internacional de la Niña",cat:"daykeeting",note:"Igualdad y derechos. Marcas con valores.",clients:["CaixaBank","Abanca","Hero","Freshly Cosmetics","Staedtler"]},
  {month:10,date:"12 oct",name:"Dia de la Hispanidad - PUENTE (LUNES)",cat:"festivo",note:"Cae en lunes. Puente de 3 dias en toda Espana.",clients:["CaixaBank","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Makro"]},
  {month:10,date:"16 oct",name:"Dia Mundial de la Alimentacion",cat:"granconsumo",note:"El mayor dia del anio para marcas de alimentacion.",clients:["Gallina Blanca","Hero","Granini","Nutella","Haribo","Makro","Freixenet","Torres Brandy"]},
  {month:10,date:"17 oct",name:"Dia Internacional Erradicacion de la Pobreza",cat:"daykeeting",note:"RSC y contenido de impacto social.",clients:["CaixaBank","Abanca","Hero","Granini"]},
  {month:10,date:"18 oct",name:"Dia Mundial de la Menopausia",cat:"farma",note:"Salud femenina. Farma hormonal y bienestar femenino.",clients:["Serelys","MBS","Fito","Isogona","Freshly Cosmetics"]},
  {month:10,date:"19 oct",name:"Dia Mundial Lucha contra el Cancer de Mama",cat:"farma",note:"El mayor dia de visibilidad del anio para oncologia.",clients:["Pilexil","Freshly Cosmetics","Fito","MBS","CaixaBank","Abanca","Serelys","Hydrafizz"]},
  {month:10,date:"20 oct",name:"Dia Internacional del Chef",cat:"granconsumo",note:"Gastronomia premium. Hosteleria y alimentacion.",clients:["Gallina Blanca","Makro","Freixenet","Torres Brandy","Hero"]},
  {month:10,date:"24 oct",name:"Dia Internacional contra el Cambio Climatico",cat:"daykeeting",note:"Medioambiente y sostenibilidad.",clients:["Freshly Cosmetics","Jotun","CaixaBank","Abanca","Parlem","Granini"]},
  {month:10,date:"25 oct",name:"Dia de la Pasta",cat:"granconsumo",note:"Alimentacion. Muy viral y facil de activar.",clients:["Gallina Blanca","Makro","Nutella","Hero"]},
  {month:10,date:"28 oct",name:"Dia Mundial de la Animacion",cat:"daykeeting",note:"Animacion y creatividad visual. Marcas creativas.",clients:["Haribo","Nutella","AOC","Staedtler","Digia"]},
  {month:10,date:"31 oct",name:"Halloween",cat:"festivo",note:"En crecimiento en Espana. Gran oportunidad branded content creativo.",clients:["Haribo","Nutella","Freixenet","Torres Brandy","Freshly Cosmetics","Makro","Granini","Hero"]},
  {month:10,date:"31 oct",name:"Dia del Ahorro",cat:"fiscal",note:"Banca, ahorro, inversion. CaixaBank y Abanca directo.",clients:["CaixaBank","Abanca","M2P","Pagofacil"]},
  {month:10,date:"31 oct",name:"Estreno DIME TU NOMBRE (Amazon Prime)",cat:"serie",note:"Serie de terror sobrenatural. Perfecta para la semana de Halloween.",clients:["AOC","Haribo","Freixenet"]},
  {month:10,date:"TBC oct",name:"Premios Planeta",cat:"pelicula",note:"El mayor premio literario de Espana.",clients:["CaixaBank","Abanca","Torres Brandy","Freixenet","Staedtler"]},
  // NOVIEMBRE
  {month:11,date:"1 nov",name:"Dia Mundial del Veganismo",cat:"granconsumo",note:"Alimentacion plant-based en auge.",clients:["Hero","Gallina Blanca","Freshly Cosmetics","Fito","MBS","Granini"]},
  {month:11,date:"1-2 nov",name:"Dia de Todos los Santos - PUENTE",cat:"festivo",note:"Festivo lunes 2 nov en varias CC.AA. Puente de 4 dias.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca","CaixaBank","Abanca"]},
  {month:11,date:"3 nov",name:"Dia Mundial del Sandwich",cat:"daykeeting",note:"Alimentacion casual. Muy viral y ludico.",clients:["Gallina Blanca","Makro","Nutella","Hero"]},
  {month:11,date:"4 nov",name:"Dia Internacional del Marketing",cat:"daykeeting",note:"Marketing, creatividad, estrategia. Perfecto para agencias.",clients:["Parlem","Tech","AOC","Digia","CaixaBank","Abanca"]},
  {month:11,date:"4 nov",name:"Dia del Caldo / Sopa",cat:"granconsumo",note:"Gallina Blanca directo. Alimentacion otonio-invierno.",clients:["Gallina Blanca","Makro","Hero","Nutella"]},
  {month:11,date:"4 nov",name:"Estreno TODAS LAS DE LA LEY (Disney+)",cat:"serie",note:"Ryan Murphy. Kim Kardashian, Naomi Watts, Glenn Close.",clients:["CaixaBank","Abanca","AOC","Freixenet"]},
  {month:11,date:"7 nov",name:"Estreno PLURIBUS (Apple TV+)",cat:"serie",note:"Serie sci-fi del creador de Breaking Bad.",clients:["AOC","Tech","Parlem","CaixaBank"]},
  {month:11,date:"8 nov",name:"Dia Mundial sin WiFi",cat:"tech",note:"Desconexion digital. Humor y reflexion. Muy viral.",clients:["Parlem","Tech","AOC","CaixaBank","Abanca"]},
  {month:11,date:"10-12 nov",name:"Mobile World Congress - Barcelona",cat:"tech",note:"Samsung, Huawei, Sony. Tecnologia global. Trending tech.",clients:["Parlem","Bluespace","Tech","AOC","M2P","Digia","CaixaBank","Abanca"]},
  {month:11,date:"11 nov",name:"Single's Day / 11-11",cat:"granconsumo",note:"El mayor dia de ecommerce del anio.",clients:["Freshly Cosmetics","Loewe","Ekue","CaixaBank","Abanca","Pagofacil","M2P","Haribo","Nutella","Granini","Tech","AOC"]},
  {month:11,date:"13 nov",name:"Dia Mundial de la Bondad",cat:"daykeeting",note:"Valores positivos. Marcas con proposito.",clients:["CaixaBank","Abanca","Hero","Freshly Cosmetics","Granini"]},
  {month:11,date:"14 nov",name:"Dia Mundial de la Diabetes",cat:"farma",note:"El mayor dia de farma diabetologica del anio.",clients:["Fito","MBS","Isogona","Serelys","Gallina Blanca","Hero","CaixaBank","Abanca"]},
  {month:11,date:"15 nov",name:"Dia Mundial sin Alcohol",cat:"farma",note:"Salud y bienestar.",clients:["Granini","Hero","Fito","MBS","CaixaBank"]},
  {month:11,date:"16 nov",name:"Dia Internacional del Flamenco",cat:"daykeeting",note:"Cultura espanola iconica. Muy visual y emocional.",clients:["Torres Brandy","Freixenet","Loewe","Makro","CaixaBank","Abanca"]},
  {month:11,date:"16 nov",name:"Dia del Emprendedor",cat:"fiscal",note:"Emprendimiento y startups. Banca, fintech.",clients:["CaixaBank","Abanca","M2P","Parlem","Pagofacil","Digia","Tech"]},
  {month:11,date:"17 nov",name:"Dia del Estudiante",cat:"educacion",note:"Educacion y juventud. Marcas jovenes.",clients:["Staedtler","Erasco","CaixaBank","Abanca","Haribo","Granini"]},
  {month:11,date:"19 nov",name:"Dia Internacional de la Mujer Emprendedora",cat:"daykeeting",note:"Emprendimiento femenino. RSC y genero.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Serelys","Loewe"]},
  {month:11,date:"20 nov",name:"Los Juegos del Hambre: Amanecer en la Cosecha",cat:"pelicula",note:"Nueva precuela del universo Katniss.",clients:["Haribo","Nutella","Hero","Granini","CaixaBank","Abanca"]},
  {month:11,date:"20-22 nov",name:"GP MotoGP Valencia - Cheste (FINAL TEMPORADA)",cat:"deporte",note:"Ultima carrera del Mundial de MotoGP 2026.",clients:["Castrol","Frigicoll","AOC","CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:11,date:"21 nov",name:"Dia Mundial de la Television",cat:"daykeeting",note:"Medios y entretenimiento. Series, plataformas, OTT.",clients:["AOC","Tech","Parlem","CaixaBank","Abanca"]},
  {month:11,date:"23 nov",name:"Tokio Hotel - Madrid (Palacio Vistalegre)",cat:"concierto",note:"Regreso iconico dosmilero. Nostalgia garantizada.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","AOC"]},
  {month:11,date:"25 nov",name:"Dia Internacional Contra Violencia de Genero",cat:"daykeeting",note:"Alta conversacion social. Marcas con valores deben activar.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Serelys","Parlem"]},
  {month:11,date:"26 nov",name:"Las Cronicas de Narnia (Greta Gerwig)",cat:"pelicula",note:"Primera pelicula de Gerwig tras Barbie. Netflix en cines primero.",clients:["Haribo","Nutella","Hero","Granini","CaixaBank","Abanca","AOC"]},
  {month:11,date:"27 nov",name:"Black Friday",cat:"granconsumo",note:"El mayor pico de consumo del anio.",clients:["Freshly Cosmetics","Loewe","Ekue","CaixaBank","Abanca","Pagofacil","M2P","Haribo","Nutella","Granini","Tech","AOC","Pilexil","Fito","MBS","Makro"]},
  {month:11,date:"27 nov",name:"Dia del Maestro",cat:"educacion",note:"Reconocimiento a los docentes.",clients:["Staedtler","Erasco","CaixaBank"]},
  {month:11,date:"30 nov",name:"Dia del Influencer",cat:"daykeeting",note:"Influencer marketing, creators, RRSS. Muy relevante para agencias.",clients:["Freshly Cosmetics","Loewe","Parlem","Tech","AOC","CaixaBank","Haribo","Granini"]},
  {month:11,date:"30 nov",name:"Cyber Monday",cat:"granconsumo",note:"Remate del Black Friday. Ecommerce y tecnologia.",clients:["Freshly Cosmetics","CaixaBank","Abanca","Pagofacil","M2P","Tech","AOC","Haribo","Nutella"]},
  {month:11,date:"TBC nov",name:"28 Anios Despues: El Templo de los Huesos",cat:"pelicula",note:"Secuela de 28 anios despues (2025). Terror zombi britanico.",clients:["AOC","Haribo","Freixenet","Torres Brandy"]},
  {month:11,date:"TBC nov",name:"Premios Latin Grammy",cat:"pelicula",note:"Musica latina global.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Granini","Nutella"]},
  // DICIEMBRE
  {month:12,date:"1 dic",name:"Dia Mundial del SIDA",cat:"farma",note:"El mayor dia de farma VIH del anio.",clients:["Fito","MBS","Isogona","CaixaBank","Abanca","Freshly Cosmetics","Musc Intime"]},
  {month:12,date:"3 dic",name:"Dia Internacional Personas con Discapacidad",cat:"daykeeting",note:"Inclusion social. RSC y marcas con valores.",clients:["CaixaBank","Abanca","Freshly Cosmetics","Hero","Parlem"]},
  {month:12,date:"3 dic",name:"Dia del Medico",cat:"farma",note:"La profesion medica. Todo el portfolio farma.",clients:["Pilexil","Fito","MBS","Isogona","Dormidina","Rinocusi","Talquistina","Serelys"]},
  {month:12,date:"5 dic",name:"Dia del Voluntariado",cat:"daykeeting",note:"RSC y proposito de marca.",clients:["CaixaBank","Abanca","Hero","Granini","Parlem"]},
  {month:12,date:"5 dic",name:"Dia Internacional del Ninja",cat:"daykeeting",note:"Humor y cultura pop. Muy viral.",clients:["Haribo","Nutella","AOC","Granini"]},
  {month:12,date:"6 dic",name:"Dia de la Constitucion Espaniola",cat:"festivo",note:"Festivo nacional. Valores democraticos.",clients:["CaixaBank","Abanca","Torres Brandy","Freixenet"]},
  {month:12,date:"6-8 dic",name:"Puente Constitucion + Inmaculada (4 dias)",cat:"festivo",note:"Festivo 7 dic (lunes). Uno de los puentes mas largos del anio.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Nutella","Makro","CaixaBank","Abanca","Jotun","Talquistina","Freshly Cosmetics"]},
  {month:12,date:"7 dic",name:"Dia Mundial del Algodon de Azucar",cat:"daykeeting",note:"Muy ludico y viral.",clients:["Haribo","Nutella","Granini","Hero"]},
  {month:12,date:"9 dic",name:"Dia Mundial de la Informatica",cat:"tech",note:"Tecnologia y programacion.",clients:["AOC","Tech","Parlem","Digia","M2P","CaixaBank"]},
  {month:12,date:"10 dic",name:"Dia de los Derechos Humanos",cat:"daykeeting",note:"Valores universales. RSC.",clients:["CaixaBank","Abanca","Hero","Freshly Cosmetics","Parlem"]},
  {month:12,date:"11 dic",name:"Jumanji 3",cat:"pelicula",note:"Dwayne Johnson, Jack Black, Kevin Hart. Cine familiar navideño.",clients:["Haribo","Nutella","Hero","Granini","Freixenet","CaixaBank"]},
  {month:12,date:"11-12 dic",name:"Hombres G - Madrid (AGOTADO)",cat:"concierto",note:"Los mejores anios de nuestra vida Tour. Nostalgia 80s/90s.",clients:["Freixenet","Torres Brandy","CaixaBank","Abanca","Makro"]},
  {month:12,date:"18 dic",name:"DOBLE BOMBAZO: Avengers Doomsday + Dune 3",cat:"pelicula",note:"Avengers con RDJ + Dune Parte 3 (Chalamet, Zendaya) el mismo dia.",clients:["Haribo","Nutella","AOC","Granini","Hero","Freixenet","CaixaBank"]},
  {month:12,date:"20 dic",name:"Dia Internacional de la Solidaridad Humana",cat:"daykeeting",note:"Valores y RSC. Cierre de anio con proposito.",clients:["CaixaBank","Abanca","Hero","Granini","Freshly Cosmetics"]},
  {month:12,date:"21 dic",name:"Solsticio de Invierno",cat:"daykeeting",note:"El dia mas corto del anio. Contenido poetico y estacional.",clients:["Freixenet","Freshly Cosmetics","Jotun","Torres Brandy","CaixaBank"]},
  {month:12,date:"22 dic",name:"El Gordo - Loteria de Navidad",cat:"fiscal",note:"El mayor evento de loteria de Europa. Trending masivo y muy emocional.",clients:["CaixaBank","Abanca","M2P","Pagofacil","Freixenet","Haribo","Nutella","Makro"]},
  {month:12,date:"22 dic",name:"Paga Extra de Navidad",cat:"fiscal",note:"Nominas dobles. Pico de consumo navideño.",clients:["CaixaBank","Abanca","M2P","Pagofacil","Freixenet","Torres Brandy","Makro","Haribo","Nutella"]},
  {month:12,date:"25 dic",name:"HARRY POTTER T1 - ESTRENO HBO Max",cat:"serie",note:"Harry Potter y la Piedra Filosofal. 25 diciembre. 8 episodios. Trailer con 277M vistas en 48h. FENOMENO GLOBAL.",clients:["Haribo","Nutella","Hero","Granini","Staedtler","CaixaBank","Abanca","AOC","Freixenet"]},
  {month:12,date:"25 dic",name:"Navidad",cat:"festivo",note:"El periodo de mayor actividad de contenido del anio.",clients:["Freixenet","Torres Brandy","Nutella","Haribo","Granini","Hero","Gallina Blanca","Makro","CaixaBank","Abanca","Loewe","Ekue","Freshly Cosmetics","Jotun"]},
  {month:12,date:"28 dic",name:"Dia de los Inocentes",cat:"daykeeting",note:"Bromas y humor. Branded content irreverente.",clients:["Haribo","Nutella","Granini","Freshly Cosmetics","Parlem"]},
  {month:12,date:"31 dic",name:"Nochevieja - Las 12 Uvas",cat:"festivo",note:"Puerta del Sol, 12 uvas, champan. El cierre del anio mas seguido de Espana.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Nutella","Makro","Gallina Blanca","CaixaBank","Abanca","Loewe","Freshly Cosmetics"]},
  {month:12,date:"Dic",name:"Mercadillos de Navidad",cat:"granconsumo",note:"Madrid, Barcelona, Sevilla, Granada. Lifestyle navideno.",clients:["Haribo","Nutella","Freixenet","Torres Brandy","Makro","Gallina Blanca","Hero","CaixaBank","Abanca","Jotun","Freshly Cosmetics","Loewe"]},
];

const ALL_CATS = Object.keys(CAT);
const UNIQUE_CLIENTS = [...new Set(EVENTS.flatMap(e => e.clients||[]))].sort();

function ClientBadge({name}) {
  const bg = CLIENT_COLORS[name]||"#6B7280";
  return <span style={{background:bg,color:"#fff",padding:"0.1rem 0.45rem",borderRadius:5,fontSize:"0.58rem",fontWeight:700,whiteSpace:"nowrap"}}>{name}</span>;
}

function EventCard({ev, showClients=true}) {
  const [hov,setHov] = useState(false);
  const cat = CAT[ev.cat];
  if (!cat) return null;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?cat.bg:J.white,border:`1.5px solid ${hov?cat.color:J.border}`,borderLeft:`4px solid ${cat.color}`,borderRadius:10,padding:"0.85rem 1rem",transition:"all 0.15s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"0.4rem",marginBottom:"0.3rem"}}>
        <span style={{background:cat.color,color:J.white,padding:"0.12rem 0.5rem",borderRadius:6,fontSize:"0.62rem",fontWeight:800,letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{cat.icon} {cat.tag}</span>
        <span style={{fontSize:"0.68rem",color:J.muted,fontWeight:600,textAlign:"right",flexShrink:0}}>{ev.date}</span>
      </div>
      <div style={{fontWeight:800,fontSize:"0.88rem",lineHeight:1.3,marginBottom:"0.3rem",color:J.text}}>{ev.name}</div>
      {ev.note && <div style={{fontSize:"0.72rem",color:J.muted,lineHeight:1.5,marginBottom:showClients&&ev.clients?.length?"0.4rem":0}}>{ev.note}</div>}
      {showClients && ev.clients?.length>0 && (
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.25rem",borderTop:`1px solid ${J.border}`,paddingTop:"0.4rem"}}>
          {ev.clients.map(c=><ClientBadge key={c} name={c}/>)}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [view,setView] = useState("month");
  const [activeMonth,setActiveMonth] = useState(5);
  const [activeCat,setActiveCat] = useState("todos");
  const [globalCat,setGlobalCat] = useState("daykeeting");
  const [activeClient,setActiveClient] = useState("todos");
  const [search,setSearch] = useState("");

  const filtered = useMemo(()=>{
    const q = search.toLowerCase();
    const ok = e => !q || e.name.toLowerCase().includes(q) || (e.note||"").toLowerCase().includes(q) || (e.clients||[]).some(c=>c.toLowerCase().includes(q));
    if (view==="month") return EVENTS.filter(e=>e.month===activeMonth && (activeCat==="todos"||e.cat===activeCat) && (activeClient==="todos"||(e.clients||[]).includes(activeClient)) && ok(e));
    if (view==="global") return EVENTS.filter(e=>e.cat===globalCat && ok(e));
    return EVENTS.filter(e=>(activeClient==="todos"||(e.clients||[]).includes(activeClient)) && (activeCat==="todos"||e.cat===activeCat) && ok(e));
  },[view,activeMonth,activeCat,globalCat,activeClient,search]);

  const grid = (evs, sc=true) => <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:"0.8rem"}}>{evs.map((ev,i)=><EventCard key={i} ev={ev} showClients={sc}/>)}</div>;

  const byMonth = (evs, sc=true) => MONTHS.map(m=>{
    const me = evs.filter(e=>e.month===m.id);
    if (!me.length) return null;
    return <div key={m.id} style={{marginBottom:"1.8rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.7rem"}}>
        <span style={{background:J.blue,color:J.white,fontWeight:800,padding:"0.2rem 0.8rem",borderRadius:6,fontSize:"0.8rem"}}>{m.name.toUpperCase()}</span>
        <div style={{height:2,flex:1,background:J.border,borderRadius:2}}/>
        <span style={{fontSize:"0.75rem",color:J.muted,fontWeight:600}}>{me.length} eventos</span>
      </div>
      {grid(me,sc)}
    </div>;
  });

  const sw = v => { setView(v); setActiveCat("todos"); setActiveClient("todos"); };

  return (
    <div style={{fontFamily:"'Rethink Sans',sans-serif",background:J.bg,minHeight:"100vh",color:J.text}}>
      <div style={{background:J.blue,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:180,height:180,background:J.yellow,borderRadius:"50%",opacity:0.2}}/>
        <div style={{position:"absolute",bottom:-20,left:200,width:100,height:100,background:J.pink,borderRadius:"50%",opacity:0.18}}/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"1.5rem 2rem 1.2rem",position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"1.2rem",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.8rem"}}>
              <div style={{background:J.white,borderRadius:14,padding:"6px 14px"}}><span style={{color:J.blue,fontWeight:800,fontSize:"1.3rem",letterSpacing:"-0.03em"}}>Jirada</span></div>
              <div style={{width:1,height:36,background:"rgba(255,255,255,0.3)"}}/>
              <div>
                <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.7)",letterSpacing:"0.2em",textTransform:"uppercase"}}>Social Creative Agency</div>
                <div style={{fontSize:"1.1rem",fontWeight:800,color:J.white}}>Calendario de Oportunidades 2026</div>
              </div>
            </div>
            <div style={{marginLeft:"auto",display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
              <span style={{background:J.yellow,color:J.blueDeep,fontWeight:800,padding:"0.3rem 1rem",borderRadius:20,fontSize:"0.85rem"}}>ABR — DIC 2026</span>
              <span style={{background:"rgba(255,255,255,0.15)",color:J.white,fontWeight:600,padding:"0.3rem 0.8rem",borderRadius:20,fontSize:"0.8rem"}}>{EVENTS.length} eventos</span>
            </div>
          </div>
          <div style={{marginTop:"1rem"}}>
            <input type="text" placeholder="Buscar evento, artista, cliente, serie..." value={search} onChange={ev=>setSearch(ev.target.value)}
              style={{width:"100%",maxWidth:460,padding:"0.55rem 1rem",background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:8,color:J.white,fontSize:"0.85rem",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{marginTop:"0.9rem",display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
            {[{id:"month",label:"Por Mes"},{id:"global",label:"Por Categoria"},{id:"client",label:"Por Cliente"}].map(v=>(
              <button key={v.id} onClick={()=>sw(v.id)} style={{padding:"0.4rem 1rem",borderRadius:20,border:"1.5px solid rgba(255,255,255,0.4)",background:view===v.id?J.yellow:"rgba(255,255,255,0.1)",color:view===v.id?J.blueDeep:J.white,fontWeight:700,fontSize:"0.8rem",transition:"all 0.15s"}}>
                {v.id==="month"?"📅 ":v.id==="global"?"🗂️ ":"🏷️ "}{v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"1.5rem 2rem"}}>
        {view!=="global" && (
          <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"1rem"}}>
            {["todos",...ALL_CATS].map(f=>{
              const isA=f===activeCat; const cat=CAT[f];
              return <button key={f} onClick={()=>setActiveCat(f)} style={{padding:"0.28rem 0.65rem",borderRadius:20,background:isA?(cat?cat.color:J.blue):"transparent",border:`1.5px solid ${cat?cat.color:J.blue}`,color:isA?J.white:(cat?cat.color:J.blue),fontSize:"0.68rem",fontWeight:700,transition:"all 0.15s",whiteSpace:"nowrap"}}>
                {cat?`${cat.icon} ${cat.label}`:"Todos"}
              </button>;
            })}
          </div>
        )}

        {view==="month" && <>
          <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",marginBottom:"1rem"}}>
            {MONTHS.map(m=>{
              const isA=m.id===activeMonth; const cnt=EVENTS.filter(e=>e.month===m.id).length;
              return <button key={m.id} onClick={()=>setActiveMonth(m.id)} style={{padding:"0.4rem 0.9rem",borderRadius:8,background:isA?J.blue:J.white,border:`2px solid ${isA?J.blue:J.border}`,color:isA?J.white:J.muted,fontWeight:700,fontSize:"0.8rem",transition:"all 0.15s"}}>
                {m.name} <span style={{opacity:0.65,fontSize:"0.7rem"}}>({cnt})</span>
              </button>;
            })}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.2rem"}}>
            <h2 style={{margin:0,fontSize:"2rem",fontWeight:800,color:J.blue,letterSpacing:"-0.03em"}}>{MONTHS.find(m=>m.id===activeMonth)?.name}</h2>
            <div style={{height:3,flex:1,background:`linear-gradient(90deg,${J.blue},transparent)`,borderRadius:2}}/>
            <span style={{background:J.yellow,color:J.blueDeep,fontWeight:800,padding:"0.2rem 0.7rem",borderRadius:12,fontSize:"0.8rem"}}>{filtered.length} eventos</span>
          </div>
          {grid(filtered,true)}
        </>}

        {view==="global" && <>
          <div style={{marginBottom:"1.2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"0.6rem"}}>
              <div style={{fontSize:"0.72rem",color:J.muted,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>Vista anio completo — shareable con clientes</div>
              <span style={{background:"#DCFCE7",color:"#16A34A",fontWeight:700,fontSize:"0.65rem",padding:"0.15rem 0.6rem",borderRadius:10}}>SIN INFO INTERNA</span>
            </div>
            <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
              {ALL_CATS.map(c=>{
                const cat=CAT[c]; const isA=c===globalCat; const cnt=EVENTS.filter(e=>e.cat===c).length;
                return <button key={c} onClick={()=>setGlobalCat(c)} style={{padding:"0.4rem 0.9rem",borderRadius:8,background:isA?cat.color:J.white,border:`2px solid ${cat.color}`,color:isA?J.white:cat.color,fontWeight:700,fontSize:"0.78rem",transition:"all 0.15s",whiteSpace:"nowrap"}}>
                  {cat.icon} {cat.label} <span style={{opacity:0.65,fontSize:"0.7rem"}}>({cnt})</span>
                </button>;
              })}
            </div>
          </div>
          {(()=>{
            const cat=CAT[globalCat];
            return <>
              <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.5rem"}}>
                <span style={{fontSize:"2rem"}}>{cat.icon}</span>
                <h2 style={{margin:0,fontSize:"1.8rem",fontWeight:800,color:cat.color}}>{cat.label} — Vista anual</h2>
                <span style={{background:cat.color,color:J.white,fontWeight:800,padding:"0.2rem 0.8rem",borderRadius:12,fontSize:"0.8rem",marginLeft:"auto"}}>{filtered.length} entradas</span>
              </div>
              {byMonth(filtered, false)}
            </>;
          })()}
        </>}

        {view==="client" && <>
          <div style={{marginBottom:"1.2rem"}}>
            <div style={{fontSize:"0.72rem",color:J.muted,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.6rem"}}>Selecciona cliente — todas sus oportunidades del anio</div>
            <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
              <button onClick={()=>setActiveClient("todos")} style={{padding:"0.35rem 0.8rem",borderRadius:20,background:activeClient==="todos"?J.blue:J.white,border:`2px solid ${J.blue}`,color:activeClient==="todos"?J.white:J.blue,fontWeight:700,fontSize:"0.75rem",transition:"all 0.15s"}}>Todos</button>
              {UNIQUE_CLIENTS.map(c=>(
                <button key={c} onClick={()=>setActiveClient(c)} style={{padding:"0.35rem 0.8rem",borderRadius:20,background:activeClient===c?(CLIENT_COLORS[c]||J.blueDeep):J.white,border:`2px solid ${CLIENT_COLORS[c]||J.border}`,color:activeClient===c?J.white:J.text,fontWeight:activeClient===c?700:500,fontSize:"0.72rem",transition:"all 0.15s"}}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.5rem"}}>
            <h2 style={{margin:0,fontSize:"1.6rem",fontWeight:800,color:activeClient==="todos"?J.blue:(CLIENT_COLORS[activeClient]||J.blueDeep)}}>
              {activeClient==="todos"?"Todos los eventos":activeClient+" — Oportunidades 2026"}
            </h2>
            <span style={{background:J.yellow,color:J.blueDeep,fontWeight:800,padding:"0.2rem 0.8rem",borderRadius:12,fontSize:"0.8rem",marginLeft:"auto"}}>{filtered.length} activaciones</span>
          </div>
          {byMonth(filtered,true)}
        </>}

        <div style={{marginTop:"2.5rem",padding:"1.2rem 1.5rem",background:J.white,border:`1.5px solid ${J.border}`,borderRadius:12}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.6rem",marginBottom:"0.8rem"}}>
            {ALL_CATS.map(c=>{const cat=CAT[c];return <div key={c} style={{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.7rem",color:J.muted,fontWeight:600}}><span style={{width:9,height:9,borderRadius:2,background:cat.color,display:"inline-block",flexShrink:0}}/>{cat.icon} {cat.label}</div>;})}
          </div>
          <div style={{fontSize:"0.68rem",color:"#aaa",lineHeight:1.6}}>
            Fuentes: Metricool · Seriemaniac · FilmAffinity · Espinof · Infobae ES · Spain.info · esmadrid.com · educaweb · FIFA 2026 · AEAT · SantandersMusic · Songkick<br/>
            Compilado por Jirada Social Creative Agency — Mayo 2026
          </div>
        </div>
      </div>
    </div>
  );
}
