import{useState,useMemo}from"react";
const J={blue:"#1E90FF",blueDeep:"#003A8C",yellow:"#FFE033",pink:"#FF6EC7",white:"#FFFFFF",bg:"#EEF5FF",border:"#D0E4FF",text:"#0A1628",muted:"#5B7BA0"};
const CAT={
  serie:{label:"Series",icon:"📺",color:"#7C3AED",bg:"#EDE9FE",tag:"SERIES"},
  pelicula:{label:"Cine & Premios",icon:"🎬",color:"#DC2626",bg:"#FEE2E2",tag:"CINE"},
  concierto:{label:"Conciertos",icon:"🎤",color:"#EA580C",bg:"#FFF7ED",tag:"CONCIERTOS"},
  festival:{label:"Festivales",icon:"🎪",color:"#D97706",bg:"#FEF3C7",tag:"FESTIVALES"},
  deporte:{label:"Deportes",icon:"⚽",color:"#059669",bg:"#D1FAE5",tag:"DEPORTE"},
  daykeeting:{label:"Daykeeting",icon:"📅",color:"#0284C7",bg:"#E0F2FE",tag:"DAYKEETING"},
  educacion:{label:"Educacion",icon:"🎓",color:"#9D174D",bg:"#FCE7F3",tag:"EDUC."},
  festivo:{label:"Festivos & Cultura",icon:"🇪🇸",color:"#B45309",bg:"#FEF9C3",tag:"FESTIVO"},
  granconsumo:{label:"Gran Consumo",icon:"🛒",color:"#16A34A",bg:"#DCFCE7",tag:"GR. CONSUMO"},
  farma:{label:"Farma & Salud",icon:"💊",color:"#7E22CE",bg:"#F3E8FF",tag:"FARMA"},
  fiscal:{label:"Fiscal & Finanzas",icon:"💶",color:"#374151",bg:"#F3F4F6",tag:"FISCAL"},
  internacional:{label:"Internacional TOP",icon:"🌍",color:"#1D4ED8",bg:"#DBEAFE",tag:"INTER."},
  cosmetica:{label:"Cosmetica & Belleza",icon:"💄",color:"#DB2777",bg:"#FCE7F3",tag:"COSMETICA"},
  hogar:{label:"Hogar & Motor",icon:"🏠",color:"#0891B2",bg:"#CFFAFE",tag:"HOGAR"},
  tech:{label:"Tech & Telecom",icon:"📱",color:"#4F46E5",bg:"#E0E7FF",tag:"TECH"},
  agro:{label:"Agro & Sostenibilidad",icon:"🌱",color:"#15803D",bg:"#D9F7DE",tag:"AGRO"},
};
const MONTHS=[{id:4,name:"Abril"},{id:5,name:"Mayo"},{id:6,name:"Junio"},{id:7,name:"Julio"},{id:8,name:"Agosto"},{id:9,name:"Septiembre"},{id:10,name:"Octubre"},{id:11,name:"Noviembre"},{id:12,name:"Diciembre"}];
const CC={"Pilexil":"#9333EA","Haribo":"#E11D48","CaixaBank Tech":"#2563EB","Staedtler":"#DC2626","Erasco":"#D97706","CaixaBank Payments and Consumer":"#1D4ED8","Semillas Fitó":"#16A34A","Master Builders Solutions":"#78350F","Freixenet":"#7C3AED","Microbank":"#0D9488","Lekué":"#DB2777","Flavia":"#BE185D","Talquistina":"#0284C7","Isogona":"#6D28D9","Dormidina":"#4338CA","Viña Sol":"#059669","M2P":"#4F46E5","Jotun":"#EA580C","Hydrafizz":"#0891B2","Rinocusi":"#B45309","Frigicoll":"#0369A1","Kagura":"#EF4444","Bluespace":"#0E7490","Granini":"#F59E0B","Pago":"#6366F1","Abanca":"#15803D","Nutella":"#92400E","Sérélys":"#9D174D","Torres Brandy":"#374151","Makro":"#155E75","Gallina Blanca":"#C2410C","Castrol":"#B91C1C","Frit Ravich":"#CA8A04","Primaprix":"#14B8A6","Pepephone":"#F97316"};
const EVENTS=[
// ABRIL
{month:4,date:"1 abr",name:"Super Mario Galaxy: La Pelicula",cat:"pelicula",note:"Estreno global. Secuela mas taquillera de 2023 (+750M$). Yoshi, Rosalina, Bowser Jr.",clients:["Haribo","Nutella","Granini"]},
{month:4,date:"1 abr",name:"April Fools / Dia de los Inocentes 🤡",cat:"daykeeting",note:"Humor y creatividad en redes. Branded content irreverente.",clients:["Haribo","Nutella","Granini","Pepephone"]},
{month:4,date:"2 abr",name:"Dia Mundial del Autismo 🧩",cat:"daykeeting",note:"Concienciacion social. Contenido inclusivo y de impacto.",clients:["CaixaBank Payments and Consumer","Abanca"]},
{month:4,date:"2 abr",name:"Dia Mundial de la Gelatina 🍮",cat:"daykeeting",note:"Muy viral y ludico. Perfecto para marcas de alimentacion.",clients:["Haribo","Nutella","Granini"]},
{month:4,date:"3 abr",name:"Dia Mundial del Arcoiris 🌈",cat:"daykeeting",note:"Diversidad, color, creatividad. Muy visual para RRSS.",clients:["Haribo","Granini","Lekué"]},
{month:4,date:"4 abr",name:"Hanami - Temporada de los Cerezos en Japón 🌸",cat:"internacional",note:"Tendencia cultural global de primavera. Gastronomia y estetica japonesa en auge en RRSS: oportunidad para restauracion asiatica.",clients:["Kagura"],isNew:true},
{month:4,date:"6 abr",name:"Dia Mundial de la Actividad Fisica 🏃",cat:"daykeeting",note:"Salud y bienestar activo.",clients:["Isogona","Granini","CaixaBank Payments and Consumer"]},
{month:4,date:"7 abr",name:"Dia Mundial de la Salud (OMS)",cat:"farma",note:"El dia mas importante del anio para farma, seguros y salud. Campania obligada.",clients:["Pilexil","Isogona","Dormidina","Rinocusi","Talquistina","Sérélys","Flavia","Hydrafizz","CaixaBank Payments and Consumer","Abanca"]},
{month:4,date:"8 abr",name:"Inicio Campania Renta IRPF 2025",cat:"fiscal",note:"Campania online hasta 30 junio. Alta intencion de busqueda.",clients:["CaixaBank Payments and Consumer","Abanca","M2P","Pago"]},
{month:4,date:"10 abr",name:"Semana Santa - Inicio vacaciones",cat:"festivo",note:"Pico de viajes y ocio familiar. Retail, turismo, alimentacion.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Nutella","Gallina Blanca","Makro","CaixaBank Payments and Consumer","Abanca","Bluespace"]},
{month:4,date:"11 abr",name:"Dia Mundial del Parkinson",cat:"farma",note:"Visibilidad enfermedades neurodegenerativas.",clients:["Pilexil","CaixaBank Payments and Consumer"]},
{month:4,date:"13 abr",name:"Dia Internacional del Beso 💋",cat:"daykeeting",note:"Romance, amor, parejas. Muy emocional y viral.",clients:["Freixenet","Granini","Nutella"]},
{month:4,date:"15 abr",name:"Dia Mundial del Arte 🎨",cat:"daykeeting",note:"Cultura visual. Marcas creativas, moda, diseno.",clients:["Lekué","Staedtler","Jotun"]},
{month:4,date:"16 abr",name:"Dia Mundial del Emprendimiento 💡",cat:"daykeeting",note:"Startups, pymes, emprendedores. Banca y fintech.",clients:["Microbank","Abanca","M2P","Pepephone"]},
{month:4,date:"19 abr",name:"Dia Mundial de los Simpson 🍩",cat:"daykeeting",note:"Pop culture masiva. Muy viral en todas las RRSS.",clients:["Haribo","Nutella","Granini","Freixenet"]},
{month:4,date:"20 abr",name:"Premiere El Diablo Viste de Prada 2 (NYC)",cat:"pelicula",note:"Disney+ emite en directo 23:30h Espana. Moda + nostalgia. Trending semana completa.",clients:["Lekué","Flavia"]},
{month:4,date:"21 abr",name:"Dia Mundial de la Creatividad e Innovacion ✨",cat:"daykeeting",note:"Creatividad, ideas, innovacion. Muy apto para agencias y marcas digitales.",clients:["Staedtler","Erasco","Pepephone"]},
{month:4,date:"22 abr",name:"Dia de la Tierra 🌍",cat:"daykeeting",note:"Sostenibilidad obligada. Gran consumo, agro, construccion.",clients:["Jotun","Freixenet","Granini","Gallina Blanca","CaixaBank Payments and Consumer","Abanca","Semillas Fitó","Master Builders Solutions"]},
{month:4,date:"23 abr",name:"Dia del Libro / Sant Jordi 🌹",cat:"festivo",note:"Rosas y libros en Cataluna. Gran engagement cultural.",clients:["Staedtler","Erasco","CaixaBank Payments and Consumer","Abanca","Freixenet","Nutella","Haribo"]},
{month:4,date:"24 abr",name:"MICHAEL - Biopic Michael Jackson",cat:"pelicula",note:"Jaafar Jackson como MJ. Antoine Fuqua. 200M$. Thriller, Bad, Off the Wall.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro"]},
{month:4,date:"27 abr",name:"Dia Mundial del Diseno Grafico 🖌️",cat:"daykeeting",note:"Creatividad visual. Marcas de diseno, agencias, software.",clients:["Staedtler"]},
{month:4,date:"28 abr",name:"Feria Alimentaria Barcelona",cat:"granconsumo",note:"El mayor evento food de Espana. Lanzamientos y networking.",clients:["Gallina Blanca","Granini","Nutella","Haribo","Freixenet","Torres Brandy","Makro","Frit Ravich","Semillas Fitó"]},
{month:4,date:"29 abr",name:"Dia Internacional de la Danza 💃",cat:"daykeeting",note:"Moda, musica, lifestyle. Muy visual para RRSS.",clients:["Lekué","Flavia","Freixenet"]},
{month:4,date:"29 abr",name:"Salon Gourmets Madrid",cat:"granconsumo",note:"Alimentacion premium. Vinos, destilados, gourmet, snacks.",clients:["Torres Brandy","Freixenet","Makro","Gallina Blanca","Frit Ravich"]},
{month:4,date:"30 abr",name:"El Diablo Viste de Prada 2 - Cines Espana",cat:"pelicula",note:"Streep + Hathaway + Blunt. 20 aniversario. Trailer 222M vistas/dia.",clients:["Lekué","Flavia","Freixenet"]},
{month:4,date:"30 abr",name:"Dia Internacional del Jazz 🎷",cat:"daykeeting",note:"Cultura musical. Marcas lifestyle y premium.",clients:["Torres Brandy","Freixenet","Makro"]},
{month:4,date:"10-19 abr",name:"Coachella 2026",cat:"internacional",note:"Sabrina Carpenter, Justin Bieber, Karol G. Conversacion global moda y musica.",clients:["Lekué","Freixenet","Torres Brandy"]},
{month:4,date:"13-18 abr",name:"Rosalia - Barcelona (4 noches Palau Sant Jordi)",cat:"concierto",note:"Debut de su nueva gira en casa. Fenomeno global.",clients:["Freixenet","Torres Brandy","Lekué","CaixaBank Payments and Consumer","Abanca"]},
// MAYO
{month:5,date:"1 may",name:"Dia del Trabajo - PUENTE largo",cat:"festivo",note:"Cae en viernes. Puente largo. Descanso, viajes y experiencias.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Makro"]},
{month:5,date:"2 may",name:"Dia Internacional contra el Acoso Escolar 🤝",cat:"daykeeting",note:"Inclusion y valores. Educacion y marcas con proposito.",clients:["CaixaBank Payments and Consumer","Abanca","Staedtler","Erasco"]},
{month:5,date:"3 may",name:"Dia Mundial de la Risa 😂",cat:"daykeeting",note:"Humor y entretenimiento. Muy viral. Ideal para marcas con tono desenfadado.",clients:["Haribo","Nutella","Granini","Pepephone"]},
{month:5,date:"4 may",name:"Star Wars Day (May the 4th) ⭐",cat:"daykeeting",note:"Trending global. Potenciado por estreno Mandalorian el 22 mayo.",clients:["Haribo","Nutella","Granini","Pepephone"]},
{month:5,date:"5 may",name:"Cinco de Mayo 🇲🇽🇺🇸",cat:"internacional",note:"Gran celebracion en EE.UU. y Mexico. Oportunidad premium para bebidas y espirituosos en el mercado americano.",clients:["Torres Brandy"],country:["🇺🇸 Estados Unidos","🇲🇽 México"],isNew:true},
{month:5,date:"5 may",name:"Dia de la Madre 🌸",cat:"granconsumo",note:"El gran dia del gran consumo: menaje, perfumeria, cosmetica, alimentacion premium, farmacia.",clients:["Lekué","Flavia","Talquistina","Hydrafizz","Nutella","Freixenet","Granini","CaixaBank Payments and Consumer","Abanca","Pilexil","Sérélys"]},
{month:5,date:"5 may",name:"Aniversario de LinkedIn 💼",cat:"daykeeting",note:"Redes profesionales. B2B, empleo, marca empleadora.",clients:["CaixaBank Tech","Abanca","M2P","Pepephone"]},
{month:5,date:"7 may",name:"Dia Mundial del Asma",cat:"farma",note:"Respiratorio y salud pulmonar.",clients:["Rinocusi","Isogona"]},
{month:5,date:"8 may",name:"Dia Cruz Roja / Enfermeria",cat:"farma",note:"Salud y cuidado. Contenido con proposito.",clients:["Pilexil","Rinocusi","Talquistina","CaixaBank Payments and Consumer","Abanca"]},
{month:5,date:"9 may",name:"Dia de Europa 🇪🇺",cat:"daykeeting",note:"Europa, valores, mercado unico.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Torres Brandy"]},
{month:5,date:"10 may",name:"Dia de la Salud Mental",cat:"farma",note:"Bienestar mental creciente en conversacion social.",clients:["Dormidina","Isogona","CaixaBank Payments and Consumer","Abanca","Sérélys","Flavia"]},
{month:5,date:"13 may",name:"Dia Internacional del Hummus 🫘",cat:"daykeeting",note:"Alimentacion saludable. Muy viral y ludico.",clients:["Gallina Blanca","Makro","Granini"]},
{month:5,date:"13 may",name:"Dia del Coctel 🍸",cat:"granconsumo",note:"Cocteleria, destilados, hosteleria.",clients:["Torres Brandy","Freixenet","Makro"]},
{month:5,date:"15 may",name:"San Isidro - Madrid",cat:"festivo",note:"Verbenas, chulapos, chotis. Gran oportunidad local en Madrid.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca","CaixaBank Payments and Consumer","Abanca"]},
{month:5,date:"15 may",name:"Berlin y la Dama del Arminno T2 (Netflix)",cat:"serie",note:"Spin-off La Casa de Papel. Pedro Alonso en Sevilla. Robo de un Da Vinci.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca","Makro"]},
{month:5,date:"15-17 may",name:"GP MotoGP - Catalunya (Montmelo)",cat:"deporte",note:"Marc Marquez. Alta audiencia nacional.",clients:["Castrol","Frigicoll","Torres Brandy","Freixenet","CaixaBank Payments and Consumer"]},
{month:5,date:"16 may",name:"Eurovicion 2026",cat:"internacional",note:"El mayor evento de musica europea. Trending masivo en RRSS durante toda la semana.",clients:["Freixenet","Granini","Haribo","Nutella","CaixaBank Payments and Consumer"]},
{month:5,date:"17 may",name:"Dia Mundial contra la Homofobia (IDAHOBIT) 🏳️‍🌈",cat:"daykeeting",note:"Diversidad e inclusion. Marcas con valores.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet"]},
{month:5,date:"17 may",name:"Dia Mundial de Internet 🌐",cat:"daykeeting",note:"Tecnologia, conectividad. Marcas digitales.",clients:["Bluespace","M2P","CaixaBank Tech","Abanca","Pepephone"]},
{month:5,date:"17 may",name:"Dia Mundial de la Reposteria 🧁",cat:"granconsumo",note:"Muy viral. Alimentacion, hosteleria, home baking, menaje.",clients:["Nutella","Haribo","Gallina Blanca","Makro","Lekué","Isogona"]},
{month:5,date:"18 may",name:"Dia Internacional de los Museos 🏛️",cat:"daykeeting",note:"Cultura y arte. Marcas con identidad cultural.",clients:["Torres Brandy","Freixenet","Staedtler"]},
{month:5,date:"20 may",name:"Dia Mundial de las Abejas 🐝",cat:"granconsumo",note:"Biodiversidad + agricultura + alimentacion. Miel, semillas, cosmetica natural.",clients:["Granini","Gallina Blanca","Nutella","Semillas Fitó"]},
{month:5,date:"21 may",name:"Dia Mundial del Te 🍵",cat:"granconsumo",note:"Infusiones, bienestar, lifestyle.",clients:["Gallina Blanca","Makro"]},
{month:5,date:"22 may",name:"Dia Mundial del Pac-Man 👾",cat:"daykeeting",note:"Gaming y cultura retro. Muy viral.",clients:["Haribo","Nutella","Granini","Pepephone"]},
{month:5,date:"22 may",name:"Bad Bunny - Barcelona (Estadi Olimpic) 1a noche",cat:"concierto",note:"DeBi TiRAR MaS FOToS World Tour. 600.000 entradas agotadas en Espana.",clients:["Freixenet","Torres Brandy","Haribo","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:5,date:"22 may",name:"The Mandalorian and Grogu (cines)",cat:"pelicula",note:"Star Wars en cines. Baby Yoda + Mando. Audiencia masiva.",clients:["Haribo","Nutella","Granini"]},
{month:5,date:"25 may",name:"Dia del Orgullo Friki 🤓",cat:"daykeeting",note:"Gaming, comics, series. Comunidad muy activa en RRSS.",clients:["Haribo","Nutella","Granini","Pepephone"]},
{month:5,date:"28 may",name:"Dia Mundial de la Hamburguesa 🍔",cat:"granconsumo",note:"Hosteleria y alimentacion. Muy viral en RRSS.",clients:["Gallina Blanca","Makro","Nutella","Haribo"]},
{month:5,date:"29 may",name:"Dia Mundial del Vino 🍷",cat:"granconsumo",note:"Vino, maridaje, gastronomia.",clients:["Torres Brandy","Freixenet","Makro","Gallina Blanca","Viña Sol"]},
{month:5,date:"23 may",name:"Bad Bunny - Barcelona 2a noche",cat:"concierto",note:"Segunda fecha Barcelona del DeBi TiRAR MaS FOToS Tour.",clients:["Freixenet","Torres Brandy","Haribo","Granini"]},
{month:5,date:"28-31 may",name:"La Oreja de Van Gogh - Madrid (x3, AGOTADO)",cat:"concierto",note:"Regreso epico con Amaia Montero. Tres noches agotadas.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca","Makro"]},
{month:5,date:"30-31 may",name:"Bad Bunny - Madrid (Metropolitano) 1a y 2a noche",cat:"concierto",note:"Inicio de 10 fechas en Madrid. Hito historico. 60.000 personas/noche.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca","Granini","Haribo"]},
{month:5,date:"31 may",name:"Dia Mundial sin Tabaco 🚭",cat:"farma",note:"Salud respiratoria.",clients:["Rinocusi","Isogona","CaixaBank Payments and Consumer","Abanca"]},
{month:5,date:"TBC may",name:"Met Gala",cat:"internacional",note:"El mayor evento de moda del mundo. Trending masivo global.",clients:["Lekué","Flavia","Freixenet"]},
{month:5,date:"TBC may",name:"Cannes Film Festival",cat:"internacional",note:"Cine, lujo, moda. Alfombra roja. Trending premium.",clients:["Lekué","Freixenet","Torres Brandy"]},
{month:5,date:"7 may",name:"Eric Clapton - Madrid (Movistar Arena)",cat:"concierto",note:"Regreso a Espana tras 20 anios. Leyenda del rock y blues.",clients:["Torres Brandy","Freixenet","Makro","CaixaBank Payments and Consumer","Abanca"]},
// JUNIO
{month:6,date:"1 jun",name:"Dia Internacional de la Infancia 👶",cat:"daykeeting",note:"Gran consumo: juguetes, alimentacion infantil, salud pediatrica.",clients:["Haribo","Nutella","Granini","Gallina Blanca","Talquistina","Isogona"]},
{month:6,date:"1 jun",name:"Paga Extra de Verano",cat:"fiscal",note:"Nominas dobles. Pico de consumo. Banca, pagos, gran consumo.",clients:["CaixaBank Payments and Consumer","Abanca","M2P","Pago","Freixenet","Makro","Haribo"]},
{month:6,date:"2-4 jun",name:"SELECTIVIDAD PAU - Convocatoria Ordinaria",cat:"educacion",note:"Andalucia, Madrid, Pais Vasco, Galicia, Valencia. Enorme conversacion jovenes.",clients:["Staedtler","Erasco","CaixaBank Payments and Consumer","Abanca","Haribo","Nutella","Granini"]},
{month:6,date:"3 jun",name:"Dia Mundial de la Bicicleta 🚴",cat:"daykeeting",note:"Movilidad sostenible, deporte, lifestyle.",clients:["CaixaBank Payments and Consumer","Abanca","Isogona"]},
{month:6,date:"3-7 jun",name:"Primavera Sound 2026 - Barcelona",cat:"festival",note:"El Coachella europeo. Indie, alternativo, pop.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:6,date:"5 jun",name:"Dia Mundial del Medio Ambiente 🌿",cat:"daykeeting",note:"Sostenibilidad obligada para gran consumo, agro y construccion.",clients:["Jotun","Freixenet","Granini","Gallina Blanca","CaixaBank Payments and Consumer","Abanca","Semillas Fitó","Master Builders Solutions"]},
{month:6,date:"8 jun",name:"Dia Mundial de los Oceanos 🌊",cat:"daykeeting",note:"Medioambiente, turismo, alimentacion sostenible.",clients:["Granini","Freixenet","CaixaBank Payments and Consumer","Abanca"]},
{month:6,date:"9-11 jun",name:"SELECTIVIDAD PAU - Cataluna",cat:"educacion",note:"Cataluna tiene fechas propias.",clients:["Staedtler","Erasco","CaixaBank Payments and Consumer","Abanca"]},
{month:6,date:"9 jun",name:"Mobland (SkyShowtime)",cat:"serie",note:"Guy Ritchie. Tom Hardy, Pierce Brosnan, Helen Mirren. Mafia. Bombazo del anio.",clients:["Torres Brandy","Freixenet","Makro","CaixaBank Payments and Consumer"]},
{month:6,date:"11 jun",name:"Dia Internacional del Juego 🎮",cat:"daykeeting",note:"Gaming, board games, entretenimiento familiar.",clients:["Haribo","Nutella","Granini","Staedtler","Pepephone"]},
{month:6,date:"11 jun",name:"MUNDIAL FIFA 2026 - ARRANCA",cat:"deporte",note:"EE.UU., Mexico, Canada. 48 selecciones. El evento deportivo del anio. Espana participa. Las 16 sedes operan 100% cashless.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Nutella","Gallina Blanca","Makro","Castrol","Pago","Pepephone"]},
{month:6,date:"12 jun",name:"Scary Movie 6",cat:"pelicula",note:"Regreso Wayans + Anna Faris + Regina Hall tras 13 anios. Muy viral.",clients:["Haribo","Nutella","Granini","Freixenet"]},
{month:6,date:"14 jun",name:"Dia Mundial del Donante de Sangre 🩸",cat:"farma",note:"Salud y solidaridad. Cruz Roja.",clients:["Pilexil","CaixaBank Payments and Consumer","Abanca","Isogona"]},
{month:6,date:"18 jun",name:"Dia Internacional del Sushi 🍣",cat:"daykeeting",note:"Gastronomia viral. Hosteleria y alimentacion.",clients:["Gallina Blanca","Makro","Granini","Kagura"]},
{month:6,date:"18-21 jun",name:"Sonar 2026 - Barcelona",cat:"festival",note:"Referente mundial de musica electronica y tecnologia digital.",clients:["Freixenet","Torres Brandy","Granini","Pepephone"]},
{month:6,date:"19-20 jun",name:"Midsommar - Suecia 🇸🇪",cat:"internacional",note:"La fiesta mas importante del verano sueco. Noche mas larga del año, gran consumo de bebidas y alimentacion local.",clients:["Granini"],country:["🇸🇪 Suecia"],isNew:true},
{month:6,date:"19 jun",name:"Toy Story 5",cat:"pelicula",note:"Woody y Buzz regresan. El regreso Pixar mas esperado.",clients:["Haribo","Nutella","Granini","Staedtler"]},
{month:6,date:"19 jun",name:"Lume (HBO Max)",cat:"serie",note:"Serie espanola. Thriller sobre incendios en Galicia.",clients:["CaixaBank Payments and Consumer","Abanca","Jotun"]},
{month:6,date:"20 jun",name:"Yellow Day - el dia mas feliz del anio ☀️",cat:"daykeeting",note:"Positividad, alegria, bienestar. Muy compartible.",clients:["Haribo","Nutella","Granini","Freixenet"]},
{month:6,date:"20-21 jun",name:"Kalorama - Madrid (Caja Magica)",cat:"festival",note:"Pet Shop Boys, Jorja Smith, Scissor Sisters. Festival pop-indie en Madrid.",clients:["Freixenet","Torres Brandy","Granini"]},
{month:6,date:"21 jun",name:"Solsticio de Verano / Dia de la Musica 🎵",cat:"daykeeting",note:"Conciertos gratuitos, musica en la calle. Tendencia en Europa.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro"]},
{month:6,date:"21 jun",name:"Dia Internacional del Yoga 🧘",cat:"daykeeting",note:"Bienestar, mindfulness, salud. Muy popular en RRSS.",clients:["Isogona","Granini","Sérélys","Flavia"]},
{month:6,date:"21 jun",name:"Dia Mundial del Selfie 🤳",cat:"daykeeting",note:"Muy viral en RRSS. Contenido UGC, marcas de tecnologia y lifestyle.",clients:["Haribo","Granini","Pepephone"]},
{month:6,date:"21 jun",name:"Dia del Padre 👨",cat:"granconsumo",note:"Perfumeria, menaje, tecnologia, deporte, alimentacion.",clients:["Lekué","Flavia","Torres Brandy","Freixenet","Granini","CaixaBank Payments and Consumer","Abanca","Castrol","Makro"]},
{month:6,date:"23-24 jun",name:"Linkin Park - Madrid (Rivas Vaciamadrid)",cat:"concierto",note:"Regreso con nueva cantante Emily Armstrong. Sold out.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca"]},
{month:6,date:"23-26 jun",name:"Amazon Prime Day 🛒",cat:"granconsumo",note:"Adelantado a junio en 2026. Pico de ecommerce en Espana, Alemania, Francia, Reino Unido y Portugal.",clients:["Staedtler","Lekué","Isogona","Primaprix","Pago","Pepephone"],isNew:true},
{month:6,date:"24 jun",name:"San Juan",cat:"festivo",note:"Hogueras, playa, noche magica en Galicia, Valencia, Cataluna.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro","CaixaBank Payments and Consumer","Abanca","Jotun"]},
{month:6,date:"25-28 jun",name:"Resurrection Fest 2026 - Viveiro",cat:"festival",note:"Iron Maiden (Run For Your Lives Tour), Limp Bizkit (unico concierto en Espana), Marilyn Manson. Del 1 al 4 de julio.",clients:["Freixenet","Torres Brandy","Makro","CaixaBank Payments and Consumer"]},
{month:6,date:"26 jun",name:"Supergirl: Woman of Tomorrow (DC)",cat:"pelicula",note:"DC Universe. Gran expectacion fans superheroes.",clients:["Haribo","Nutella","Granini"]},
{month:6,date:"28 jun",name:"Dia Internacional Orgullo LGTBIQ+ 🏳️‍🌈",cat:"daykeeting",note:"El dia de mayor alcance para diversidad en redes.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Granini"]},
{month:6,date:"30 jun",name:"Dia de las Redes Sociales 📲",cat:"daykeeting",note:"El dia de las RRSS. Perfecto para todas las marcas activas en social media.",clients:["CaixaBank Tech","Abanca","Pepephone","Haribo","Granini","Nutella"]},
{month:6,date:"30 jun",name:"FIN Campania Declaracion de la Renta",cat:"fiscal",note:"Ultimo dia IRPF 2025.",clients:["CaixaBank Payments and Consumer","Abanca","M2P","Pago"]},
{month:6,date:"TBC jun",name:"Champions League - Final",cat:"deporte",note:"Futbol europeo maximo. El partido mas visto del continente.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Castrol"]},
// JULIO
{month:7,date:"1 jul",name:"Inicio Rebajas de Verano 🛍️",cat:"granconsumo",note:"Pico de consumo en retail, moda y gran consumo. Ecommerce.",clients:["Lekué","Flavia","CaixaBank Payments and Consumer","Abanca","Pago","M2P","Haribo","Nutella","Primaprix"]},
{month:7,date:"1 jul",name:"Dia Internacional del Chiste 😄",cat:"daykeeting",note:"Humor, entretenimiento. Muy viral y facil de activar.",clients:["Haribo","Nutella","Granini","Freixenet"]},
{month:7,date:"1-4 jul",name:"Resurrection Fest - Viveiro (Lugo)",cat:"festival",note:"Iron Maiden, Limp Bizkit, Marilyn Manson, Trivium, P.O.D., The Rasmus. El mayor festival de metal de Espana.",clients:["Freixenet","Torres Brandy","Makro","CaixaBank Payments and Consumer"]},
{month:7,date:"1 jul",name:"Minions 3 (Minions and Monsters)",cat:"pelicula",note:"7a entrega Mi Villano Favorito. Trending meme garantizado.",clients:["Haribo","Nutella","Granini","Makro"]},
{month:7,date:"2 jul",name:"Dia Internacional del OVNI 🛸",cat:"daykeeting",note:"Humor y misterio. Muy viral y creativo.",clients:["Haribo","Nutella","Granini"]},
{month:7,date:"6 jul",name:"Día de la Restauración del Estado de Lituania 🇱🇹",cat:"internacional",note:"Fiesta nacional lituana (Dia de Mindaugas). Oportunidad de contenido local para marcas de bebidas.",clients:["Granini"],country:["🇱🇹 Lituania"],isNew:true},
{month:7,date:"10 jul",name:"Resultados PAU y Admision Universitaria",cat:"educacion",note:"Listas de admision y matricula universitaria. Alta conversacion entre familias y estudiantes.",clients:["Staedtler"],isNew:true},
{month:7,date:"4 jul",name:"Independencia USA 🎇",cat:"daykeeting",note:"Barbacoas, verano, cultura americana. Gran oportunidad para marcas con presencia en EE.UU.",clients:["Torres Brandy","Haribo","Granini","Nutella","Freixenet","Frit Ravich"]},
{month:7,date:"5 jul",name:"Dia Mundial del Bikini",cat:"cosmetica",note:"Verano, playa, cuerpo. Cosmetica solar.",clients:["Talquistina","Hydrafizz","Lekué"]},
{month:7,date:"6-14 jul",name:"San Fermin - Pamplona",cat:"festivo",note:"Encierros, chupinazo. Icono cultural espaniol con proyeccion internacional.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro","CaixaBank Payments and Consumer","Abanca"]},
{month:7,date:"6-9 jul",name:"Garbage - gira Espana (Coruna, Valencia, Barcelona)",cat:"concierto",note:"6 jul A Coruna, 8 jul Valencia, 9 jul Barcelona. Alternativo 90s de vuelta.",clients:["Freixenet","Torres Brandy"]},
{month:7,date:"7 jul",name:"Dia Mundial del Chocolate 🍫",cat:"granconsumo",note:"Confiteria, snacks. Altisimo engagement.",clients:["Haribo","Nutella","Makro","Gallina Blanca"]},
{month:7,date:"7 jul",name:"Dia Mundial del Osito Gominola 🐻",cat:"granconsumo",note:"Haribo directo. El dia del anio para la marca.",clients:["Haribo"]},
{month:7,date:"8 jul",name:"Dia Mundial de la Alergia",cat:"farma",note:"Rinocusi directo. Temporada post-primavera.",clients:["Rinocusi","Isogona"]},
{month:7,date:"8-11 jul",name:"Mad Cool 2026 - Madrid",cat:"festival",note:"Foo Fighters, Florence+Machine, Lorde, Twenty One Pilots, Kings of Leon, Nick Cave, Halsey, Pixies, Charlie Puth.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer","Abanca","Makro"]},
{month:7,date:"9-11 jul",name:"Bilbao BBK Live 2026",cat:"festival",note:"Lily Allen, Robbie Williams, Alabama Shakes, Interpol, IDLES. Kobetamendi.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:7,date:"9-10 jul",name:"Sting - gira Espana (Canarias, Cadiz, Malaga, Granada, Sevilla)",cat:"concierto",note:"Sting abre gira en Canarias (9 y 10 jul) y recorre Andalucia. Pop/rock clasico.",clients:["Torres Brandy","Freixenet","CaixaBank Payments and Consumer","Abanca"]},
{month:7,date:"8 jul",name:"Vaiana - Live-Action Disney (cines Espana)",cat:"pelicula",note:"Remake accion real de Moana. Dwayne Johnson como Maui. 10 aniversario.",clients:["Haribo","Nutella","Granini"]},
{month:7,date:"10 jul",name:"Dia del Vino Rosado",cat:"granconsumo",note:"Rose season. Verano, terrazas, lifestyle.",clients:["Torres Brandy","Freixenet","Makro","Viña Sol"]},
{month:7,date:"11-12 jul",name:"Aitana - Madrid (Movistar Arena) 1a y 2a noche",cat:"concierto",note:"Cuarto Azul World Tour. Dos noches agotadas.",clients:["Lekué","Freixenet","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:7,date:"13 jul",name:"Dia Mundial del Rock 🎸",cat:"daykeeting",note:"Musica rock. Gran engagement en comunidad musical.",clients:["Torres Brandy","Freixenet","Makro"]},
{month:7,date:"14-15 jul",name:"Aitana - Madrid (Movistar Arena) 3a y 4a noche",cat:"concierto",note:"4 noches en Madrid en total. Fenomeno historico.",clients:["Lekué","Freixenet","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:7,date:"16 jul",name:"Dia Mundial del Emoji 😊",cat:"daykeeting",note:"Trending ludico. Muy viral y facil de activar.",clients:["Haribo","Nutella","Granini","CaixaBank Tech","Abanca","Pepephone"]},
{month:7,date:"17 jul",name:"La Odisea (Christopher Nolan)",cat:"pelicula",note:"Homero en IMAX. El evento cinematografico del verano. Expectacion maxima.",clients:["CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet"]},
{month:7,date:"17-19 jul",name:"FIB 2026 - Benicassim",cat:"festival",note:"The Prodigy, The Kooks, Kaiser Chiefs, Biffy Clyro, Pendulum.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer","Abanca","Talquistina"]},
{month:7,date:"18 jul",name:"Dia Internacional de Nelson Mandela 🕊️",cat:"daykeeting",note:"Justicia, igualdad, valores. RSC.",clients:["Microbank","Abanca"]},
{month:7,date:"19 jul",name:"MUNDIAL FIFA 2026 - FINAL",cat:"deporte",note:"La final del torneo mas visto de la historia. Pago sin contacto en todos los estadios.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Nutella","Gallina Blanca","Makro","Castrol","Pago","Pepephone"]},
{month:7,date:"21 jul",name:"Dia Mundial del Perro 🐶",cat:"daykeeting",note:"Las mascotas son trending garantizado en RRSS.",clients:["Granini"]},
{month:7,date:"21 jul",name:"Dia Internacional del Gazpacho 🍅",cat:"daykeeting",note:"Gastronomia espanola en verano. Muy viral y local.",clients:["Gallina Blanca","Makro","Granini"]},
{month:7,date:"24 jul",name:"Stuart Fails to Save the Universe (HBO Max)",cat:"serie",note:"Spin-off de The Big Bang Theory. Stuart Bloom salva el universo de una realidad alternativa. Estreno muy esperado por fans de la franquicia.",clients:["Haribo","Nutella","Granini","CaixaBank Payments and Consumer"]},
{month:7,date:"25 jul",name:"Santiago Apostol - Dia de Galicia 🎉",cat:"festivo",note:"Festivo en Galicia. El Camino, peregrinacion, cultura.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Gallina Blanca","Granini"]},
{month:7,date:"26 jul",name:"Dia de los Abuelos 👴",cat:"granconsumo",note:"Familia multigeneracional. Gran consumo y farma senior.",clients:["Gallina Blanca","Sérélys","Isogona","CaixaBank Payments and Consumer","Abanca","Flavia"]},
{month:7,date:"30 jul",name:"Bruno Mars - Madrid (Estadio Metropolitano)",cat:"concierto",note:"Unico concierto en Espana de Bruno Mars. Pop/soul masivo. Entradas agotadas.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca","Granini"]},
{month:7,date:"24 jul",name:"Hoppers (Pixar / Disney+)",cat:"pelicula",note:"Pixar original. Mabel transfiere su mente a un castor robot para salvar su habitat de una empresa. Pixar de autor. Ya disponible en Disney+.",clients:["Haribo","Nutella","Granini","CaixaBank Payments and Consumer"],isNew:true},
{month:7,date:"30 jul",name:"Dia Mundial de la Amistad 💛",cat:"daykeeting",note:"Muy emocional. Gran consumo: bebidas, snacks, experiencias.",clients:["Haribo","Nutella","Freixenet","Granini","Torres Brandy","CaixaBank Payments and Consumer","Abanca"]},
{month:7,date:"31 jul",name:"Dia Internacional del Aguacate 🥑",cat:"daykeeting",note:"Alimentacion saludable y trendy. Muy viral.",clients:["Gallina Blanca","Makro","Granini"]},
{month:7,date:"31 jul",name:"Spider-Man: Brand New Day",cat:"pelicula",note:"Tom Holland regresa. Con Hulk (Ruffalo) y Punisher (Bernthal). Conversacion Marvel maxima.",clients:["Haribo","Nutella","Granini"]},
{month:7,date:"31 jul-2 ago",name:"Low Festival - Benidorm",cat:"festival",note:"Kasabian, The Hives, Editors, Dani Fernandez, Fangoria, Love of Lesbian, La Casa Azul, Natalia Lacunza. Festival indie junto al mar.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer"]},
// AGOSTO
{month:8,date:"1 ago",name:"Dia Mundial de la Cerveza 🍺",cat:"granconsumo",note:"Bebidas, hosteleria. Muy viral en verano.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca","Granini"]},
{month:8,date:"1 ago",name:"Fiesta Nacional de Suiza 🇨🇭",cat:"internacional",note:"Dia nacional suizo. Barbacoas, fuegos artificiales y celebracion en todo el pais.",clients:["Granini"],country:["🇨🇭 Suiza"],isNew:true},
{month:8,date:"1 ago",name:"Dia Internacional de la Alopecia",cat:"farma",note:"Concienciacion sobre la caida del cabello. Pilexil directo.",clients:["Pilexil"],isNew:true},
{month:8,date:"10-20 ago",name:"Ola de Calor - Pico de Verano 🌡️",cat:"daykeeting",note:"Semanas de mayor temperatura del año. Hidratacion y cuidado de la piel muy relevantes.",clients:["Hydrafizz"],isNew:true},
{month:8,date:"5 ago",name:"Ted Lasso T4 (Apple TV+)",cat:"serie",note:"Regreso del entrenador mas querido del streaming. Expectacion masima tras 3 anios de espera. Serie fenomeno cultural.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet"]},
{month:8,date:"7 ago",name:"Dia Internacional de la Cerveza (1er viernes)",cat:"granconsumo",note:"Mayor conversacion cervecera en RRSS.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca"]},
{month:8,date:"8 ago",name:"Dia Internacional del Gato 🐱",cat:"daykeeting",note:"Trending garantizado. Las mascotas arrasan en RRSS.",clients:["Granini"]},
{month:8,date:"8 ago",name:"Dia Mundial del Ojo",cat:"farma",note:"Salud ocular. Rinocusi directo.",clients:["Rinocusi"]},
{month:8,date:"9 ago",name:"Dia Internacional del Coworking 💻",cat:"tech",note:"Trabajo colaborativo y espacios flexibles. Bluespace directo.",clients:["Bluespace","Pepephone","CaixaBank Tech","Abanca"]},
{month:8,date:"12 ago",name:"Dia Internacional de la Juventud 🌟",cat:"daykeeting",note:"Marcas de consumo joven, educacion y cultura.",clients:["CaixaBank Payments and Consumer","Abanca","Haribo","Granini","Staedtler","Pepephone"]},
{month:8,date:"12 ago",name:"Dia Internacional del Disco de Vinilo 🎶",cat:"daykeeting",note:"Musica analogica, nostalgia, cultura pop.",clients:["Torres Brandy","Freixenet"]},
{month:8,date:"14 ago",name:"Aitana - Madrid (Movistar Arena) - septiembre",cat:"concierto",note:"Ver fechas de septiembre para las noches de Madrid (11, 12, 14 y 15 sep).",clients:["Lekué","Freixenet","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:8,date:"13 ago",name:"Camp Rock 3 (Disney Channel / Disney+)",cat:"pelicula",note:"18 anios despues de la primera! Jonas Brothers regresan como Connect 3. Demi Lovato como productora. Nostalgia generacional maxima. Disney Channel el 13 ago y Disney+ el 14 ago.",clients:["Haribo","Nutella","Granini","CaixaBank Payments and Consumer","Abanca","Freixenet"],isNew:true},
{month:8,date:"15 ago",name:"Asuncion de la Virgen - FESTIVO NACIONAL",cat:"festivo",note:"Pico de vacaciones. Turismo, hosteleria, distribucion.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Makro","Talquistina","Hydrafizz"]},
{month:8,date:"15 ago",name:"Ferragosto - Italia 🇮🇹",cat:"internacional",note:"Festivo nacional italiano de pleno verano. Gran parada de actividad comercial; relevante para operativa en el mercado italiano.",clients:["Bluespace"],country:["🇮🇹 Italia"],isNew:true},
{month:8,date:"17 ago",name:"Lanterns / Linternas (HBO Max)",cat:"serie",note:"Hal Jordan y John Stewart, los Green Lanterns, investigan un asesinato en la nueva serie DC. La mas esperada del universo DC en 2026.",clients:["CaixaBank Payments and Consumer","Abanca","Haribo","Nutella","Granini"]},
{month:8,date:"19 ago",name:"Dia Mundial de la Fotografia 📷",cat:"daykeeting",note:"Muy visual. Marcas creativas, fotografos, moda, lifestyle.",clients:["Lekué","Staedtler","Flavia"]},
{month:8,date:"22 ago",name:"Dia Mundial del Folklore 🎭",cat:"daykeeting",note:"Cultura y tradicion.",clients:["Torres Brandy","Freixenet","Gallina Blanca","Makro"]},
{month:8,date:"23 ago",name:"Dia Mundial del Hashtag #️⃣",cat:"daykeeting",note:"El dia de los hashtags. Perfecto para hablar de RRSS y estrategia digital.",clients:["Pepephone","CaixaBank Tech","Abanca"]},
{month:8,date:"25 ago",name:"Dia Internacional del Ramen 🍜",cat:"daykeeting",note:"Nissin lanzo el primer ramen instantaneo un 25 de agosto de 1958. Gastronomia japonesa en auge global, muy viral en RRSS.",clients:["Kagura"],isNew:true},
{month:8,date:"26 ago",name:"Tadeo Jones 3 - Estreno cines",cat:"pelicula",note:"El aventurero espaniol favorito regresa. Animacion espanola de primer nivel. Audiencia familiar y muy alta expectacion.",clients:["Haribo","Nutella","Granini","Staedtler","CaixaBank Payments and Consumer"]},
{month:8,date:"28 ago",name:"La Muerte de Robin Hood (cines)",cat:"pelicula",note:"Hugh Jackman como Robin Hood en sus ultimos dias. Jodie Comer, Bill Skarsgard. Drama de accion historico.",clients:["CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet"]},
{month:8,date:"28 ago",name:"Javier Bardem - pelicula espanola (cines)",cat:"pelicula",note:"Regreso del Oscar espaniol mas internacional al cine nacional.",clients:["CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet"]},
{month:8,date:"28-30 ago",name:"The Weeknd - Madrid (Estadio Metropolitano)",cat:"concierto",note:"After Hours Til Dawn Tour. 3 noches en el Metropolitano. R&B global de primer nivel. Con Playboi Carti.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Granini"]},
{month:8,date:"28-30 ago",name:"GP MotoGP - Aragon (MotorLand)",cat:"deporte",note:"Gran Premio de Aragon. Marc Marquez en casa.",clients:["Castrol","Frigicoll","CaixaBank Payments and Consumer","Abanca"]},
{month:8,date:"28 ago",name:"Dark Matter T2 (Apple TV+)",cat:"serie",note:"Regreso del thriller cuantico de ciencia ficcion. Joel Edgerton. Una de las series mas vistas de Apple TV+ en 2025.",clients:["CaixaBank Tech","Abanca"]},
{month:8,date:"29 ago",name:"Dia Mundial del Gamer 🎮",cat:"daykeeting",note:"Gaming. Comunidad muy activa en RRSS.",clients:["Haribo","Nutella","Granini","Pepephone"]},
{month:8,date:"TBC",name:"Arenal Sound - Burriana",cat:"festival",note:"Mayor festival de playa de Espana. Pop, indie, reggaeton.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer","Abanca","Talquistina"]},
{month:8,date:"TBC",name:"Medusa Festival - Benicassim",cat:"festival",note:"Electronica masiva y playa. Muy viral.",clients:["Freixenet","Torres Brandy","Granini"]},
{month:8,date:"TBC",name:"Sonorama Ribera - Aranda de Duero",cat:"festival",note:"Crystal Fighters, Leiva, Love of Lesbian, Guitarricadelafuente.",clients:["Torres Brandy","Freixenet","CaixaBank Payments and Consumer","Abanca"]},
// SEPTIEMBRE
{month:9,date:"1 sep",name:"Vuelta al Cole",cat:"granconsumo",note:"El pico de compra escolar. Mochilas, material, alimentacion, farma, ahorro familiar.",clients:["Staedtler","Erasco","CaixaBank Payments and Consumer","Abanca","Haribo","Nutella","Granini","Gallina Blanca","Isogona","Pilexil","Makro","Primaprix","Pago","Frit Ravich","Pepephone","Dormidina"]},
{month:9,date:"1 sep",name:"Sindrome Postvacacional",cat:"daykeeting",note:"Vuelta a la rutina. Sueño, adaptacion de horarios y bienestar.",clients:["Dormidina"],isNew:true},
{month:9,date:"1 sep",name:"Caida Estacional del Cabello - Otoño",cat:"farma",note:"Fenomeno estacional muy buscado cada septiembre. Pilexil directo.",clients:["Pilexil"],isNew:true},
{month:9,date:"1 sep",name:"La Rentrée - Francia 🇫🇷",cat:"internacional",note:"Vuelta a la actividad laboral y escolar en Francia tras agosto. Repunte de demanda de espacios de trabajo flexible.",clients:["Bluespace"],country:["🇫🇷 Francia"],isNew:true},
{month:9,date:"1-7 sep",name:"The Great British Bake Off - regreso 🇬🇧",cat:"internacional",note:"Vuelta del concurso de reposteria mas visto de Reino Unido. Gran oportunidad para menaje y utensilios de cocina.",clients:["Lekué"],country:["🇬🇧 Reino Unido"],isNew:true},
{month:9,date:"15 sep - 15 oct",name:"Hispanic Heritage Month - USA 🇺🇸",cat:"internacional",note:"Mes de la Herencia Hispana en Estados Unidos. Gran visibilidad para marcas espaniolas en el mercado americano.",clients:["Torres Brandy"],country:["🇺🇸 Estados Unidos"],isNew:true},
{month:9,date:"16-22 sep",name:"Semana Europea de la Movilidad 🚆",cat:"hogar",note:"Movilidad e infraestructuras sostenibles. Comunicacion B2B para ingenieria civil, construccion y ferrocarril.",clients:["Master Builders Solutions","Bluespace"],isNew:true},
{month:9,date:"26 sep",name:"Dia Mundial de la Anticoncepcion",cat:"farma",note:"Salud sexual y reproductiva femenina.",clients:["Flavia","Sérélys"],isNew:true},
{month:9,date:"1-6 sep",name:"Premier Padel - Madrid (Movistar Arena)",cat:"deporte",note:"Lebron, Galan, Tapia. Las grandes estrellas del padel mundial.",clients:["CaixaBank Payments and Consumer","Abanca","Castrol","Makro"]},
{month:9,date:"2-4 sep",name:"Selectividad Extraordinaria - Cataluna",cat:"educacion",note:"Segunda convocatoria PAU en Cataluna.",clients:["Staedtler","Erasco","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"3-6 sep",name:"Ebrovision - Miranda de Ebro (Burgos)",cat:"festival",note:"Carlos Ares, Getdown Services, Hoonine, Los Chivatos, Mujeres. Festival indie alternativo.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"4-5 sep",name:"Vive Latino 2026 - Zaragoza (Espacio Expo)",cat:"festival",note:"Amaia, Guitarricadelafuente, Julieta Venegas, La M.O.D.A., Rigoberta Bandini, La Plazuela, Loquillo. Musica iberoamericana.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"4-8 sep",name:"Aitana - Barcelona (Palau Sant Jordi, 4 noches)",cat:"concierto",note:"Cuarto Azul World Tour en casa. Fenomeno en Cataluna.",clients:["Lekué","Freixenet","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"5 sep",name:"Dia Mundial del Hermano 🤝",cat:"daykeeting",note:"Familia y afecto. Gran consumo y emocional.",clients:["Haribo","Nutella","Granini","CaixaBank Payments and Consumer"]},
{month:9,date:"8-9 sep",name:"Leiva - Madrid (Movistar Arena, 4 noches)",cat:"concierto",note:"El cantautor de referencia del indie espaniol.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"9 sep",name:"Dia de la Belleza 💄",cat:"cosmetica",note:"El dia mas importante del anio para cosmetica, perfumeria y belleza.",clients:["Lekué","Flavia","Talquistina","Hydrafizz","Pilexil"]},
{month:9,date:"10 sep",name:"Dia Mundial Prevencion del Suicidio 💙",cat:"farma",note:"Salud mental. Muy sensible.",clients:["Dormidina","Sérélys","CaixaBank Payments and Consumer","Abanca","Flavia"]},
{month:9,date:"11-12 sep",name:"Billy Corgan (Smashing Pumpkins) - Madrid (Vistalegre)",cat:"concierto",note:"Revisita el disco Mellon Collie and the Infinite Sadness con orquesta y coro. Evento unico.",clients:["Torres Brandy","Freixenet","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"11-12 sep",name:"Granada Sound 2026 - Granada (Cortijo del Conde)",cat:"festival",note:"Fangoria, La La Love You, Belen Aguilera, Pignoise, Carlos Sadness, Marlena, La Sonrisa De Julia.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"11-13 sep",name:"Gran Premio de Espana F1 - Madrid (IFEMA)",cat:"deporte",note:"F1 vuelve a Madrid. Evento historico. Trending global.",clients:["Castrol","Frigicoll","CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet"]},
{month:9,date:"11-15 sep",name:"Aitana - Madrid (Movistar Arena, 4 noches)",cat:"concierto",note:"Cuarto Azul World Tour en Madrid. 11, 12, 14 y 15 septiembre. Fenomeno historico.",clients:["Lekué","Freixenet","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"13 sep",name:"Dia Internacional del Chocolate",cat:"granconsumo",note:"Chocolates, postres, snacks. Altisimo engagement.",clients:["Haribo","Nutella","Makro","Gallina Blanca"]},
{month:9,date:"16 sep",name:"Día de la Independencia de México 🇲🇽",cat:"internacional",note:"Gran oportunidad de contenido para marcas con presencia en Mexico y Latam: bebidas y agroalimentacion.",clients:["Torres Brandy","Freixenet","Semillas Fitó"],isNew:true},
{month:9,date:"16 sep",name:"Neagley (Prime Video)",cat:"serie",note:"Spin-off de Reacher. Frances Neagley como detective privada en Chicago. Accion y thriller.",clients:["CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"18-19 sep",name:"Brava Festival 2026 - Madrid (Caja Magica)",cat:"festival",note:"Sugababes, Natalie Imbruglia, Fangoria, Inna, Vengaboys, Leire Martinez, Maria Pelae, Soraya. Festival pop y nostalgia.",clients:["Freixenet","Torres Brandy","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"19 sep - 4 oct",name:"Oktoberfest - Múnich 🍺",cat:"internacional",note:"La mayor fiesta de la cerveza del mundo. Enorme repercusion en Europa; gancho directo para marcas de origen aleman y bebidas.",clients:["Erasco","Freixenet","Granini"],isNew:true},
{month:9,date:"18-27 sep",name:"Shakira - Madrid (residencia, 6 noches)",cat:"concierto",note:"Estadio Shakira: 18, 19, 20, 25, 26 y 27 sept. El evento del otonio. 12 noches en Madrid en total.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca","Granini","Nutella"]},
{month:9,date:"TBC sep",name:"Semana de la Moda Madrid (MBFWM)",cat:"cosmetica",note:"Moda, lifestyle. Alta repercusion en RRSS.",clients:["Lekué","Flavia","Talquistina","Hydrafizz"]},
{month:9,date:"TBC sep",name:"Festival de San Sebastian",cat:"pelicula",note:"El festival de cine mas importante de Espana. Alfombra dorada.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca","Frit Ravich"]},
{month:9,date:"TBC sep",name:"The Black Keys - Madrid",cat:"concierto",note:"El duo de blues rock de Ohio regresa a Espana.",clients:["Torres Brandy","Freixenet","CaixaBank Payments and Consumer"]},
{month:9,date:"TBC sep",name:"The Neighbourhood - Madrid",cat:"concierto",note:"Indie pop oscuro. Wiped Out! y Sweater Weather.",clients:["Freixenet","CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"21 sep",name:"Dia Mundial del Alzheimer 🧠",cat:"farma",note:"Enfermedades neurodegenerativas. Farma y bienestar senior.",clients:["Sérélys","Isogona","CaixaBank Payments and Consumer","Abanca","Flavia"]},
{month:9,date:"21 sep",name:"Dia Internacional de la Paz ☮️",cat:"daykeeting",note:"Valores universales. Marcas con proposito.",clients:["CaixaBank Payments and Consumer","Abanca","Granini"]},
{month:9,date:"22 sep",name:"Equinoccio de Otonio 🍂",cat:"daykeeting",note:"Cambio de estacion. Contenido estacional de otonio.",clients:["Jotun","Gallina Blanca","Torres Brandy"]},
{month:9,date:"22 sep",name:"Dia Mundial Sin Coche 🚗🚫",cat:"daykeeting",note:"Movilidad sostenible. Marcas con valores medioambientales.",clients:["CaixaBank Payments and Consumer","Abanca","Jotun"]},
{month:9,date:"25 sep",name:"Dia del Farmaceutico 💊",cat:"farma",note:"El dia de la profesion farmaceutica. Todo el portfolio farma.",clients:["Pilexil","Isogona","Dormidina","Rinocusi","Talquistina","Sérélys","Flavia"]},
{month:9,date:"25 sep",name:"Verity: La Sombra de un Engano (cines)",cat:"pelicula",note:"Adaptacion del thriller de Colleen Hoover. Nicole Kidman y Edgar Ramirez. Muy esperado por fans de novela romantica-thriller.",clients:["CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"26 sep",name:"Estreno ROMI (Amazon Prime Video)",cat:"serie",note:"Serie espanola. Agente de policia sorda.",clients:["CaixaBank Payments and Consumer","Abanca"]},
{month:9,date:"27 sep",name:"Aniversario de Google 🔍",cat:"daykeeting",note:"Marketing digital, SEO, tecnologia.",clients:["Pepephone","CaixaBank Tech","M2P"]},
{month:9,date:"27 sep",name:"Dia Mundial del Turismo ✈️",cat:"granconsumo",note:"Hosteleria, destinos, agencias.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Torres Brandy","Makro","Gallina Blanca"]},
{month:9,date:"29 sep",name:"Dia Mundial del Corazon ❤️",cat:"farma",note:"El mayor dia de farma cardiovascular del anio.",clients:["Isogona","Sérélys","CaixaBank Payments and Consumer","Abanca","Gallina Blanca","Flavia"]},
{month:9,date:"30 sep",name:"Dia Internacional del Podcast 🎙️",cat:"daykeeting",note:"Audio digital. Marcas con contenido y comunicacion.",clients:["Pepephone","CaixaBank Tech","Abanca"]},
// OCTUBRE
{month:10,date:"3 oct",name:"Tag der Deutschen Einheit - Dia de la Unidad Alemana 🇩🇪",cat:"internacional",note:"Fiesta nacional alemana. Gran cita para marcas de alimentacion y bebidas en Alemania.",clients:["Erasco","Granini","Lekué"],country:["🇩🇪 Alemania"],isNew:true},
{month:10,date:"4 oct",name:"Erntedankfest - Fiesta de la Cosecha (Alemania) 🇩🇪",cat:"internacional",note:"Tradicional fiesta alemana de la cosecha. Sopas, alimentacion de otoño y bebidas.",clients:["Erasco","Granini","Lekué"],country:["🇩🇪 Alemania"],isNew:true},
{month:10,date:"8-18 oct",name:"Festival de Sitges 2026",cat:"pelicula",note:"El festival de cine fantastico mas importante de Europa. Gran oportunidad de contenido cultural catalan para Frit Ravich.",clients:["Frit Ravich","Freixenet"],isNew:true},
{month:10,date:"12-18 oct",name:"Semaine du Goût - Francia 🇫🇷",cat:"internacional",note:"Semana del Gusto francesa. Gastronomia, menaje y bebidas en el mercado frances.",clients:["Lekué","Granini","Torres Brandy"],country:["🇫🇷 Francia"],isNew:true},
{month:10,date:"13 oct",name:"Dia Internacional para la Reduccion del Riesgo de Desastres",cat:"hogar",note:"Infraestructuras resilientes. Comunicacion B2B para construccion, ingenieria y sector ferroviario.",clients:["Master Builders Solutions"],isNew:true},
{month:10,date:"20 oct",name:"Dia Mundial de la Osteoporosis",cat:"farma",note:"Salud osea, muy vinculada a la menopausia.",clients:["Flavia","Sérélys"],isNew:true},
{month:10,date:"1 oct",name:"Dia Internacional de las Personas Mayores 👴",cat:"farma",note:"Salud senior, suplementacion.",clients:["Pilexil","Isogona","Dormidina","Sérélys","CaixaBank Payments and Consumer","Abanca","Flavia"]},
{month:10,date:"1 oct",name:"Dia Mundial del Cafe ☕",cat:"granconsumo",note:"Gran consumo: cafe, hosteleria. Altisimo engagement.",clients:["Gallina Blanca","Makro","Nutella","Granini","Freixenet"]},
{month:10,date:"1 oct",name:"Dia del Automovil 🚗",cat:"hogar",note:"Castrol directo. Motor, mantenimiento, tecnologia.",clients:["Castrol","Frigicoll"]},
{month:10,date:"2 oct",name:"Dia Mundial de la Sonrisa 😊",cat:"daykeeting",note:"Positividad y bienestar. Muy emocional y viral.",clients:["Haribo","Nutella","Granini","CaixaBank Payments and Consumer"]},
{month:10,date:"2-11 oct",name:"Shakira - Madrid (cierre residencia, 5 noches)",cat:"concierto",note:"2, 3, 4, 10 y 11 oct. 11 noches totales en Madrid. Fenomeno historico.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca"]},
{month:10,date:"3 oct",name:"Estreno MONSTRUO: Ed Gein (Netflix)",cat:"serie",note:"Ryan Murphy. Nueva entrega de la saga (Dahmer, Hermanos Mendez). Expectacion maxima.",clients:["Haribo","Freixenet","Torres Brandy"]},
{month:10,date:"3 oct",name:"Estreno ZOOMERS (Amazon Prime)",cat:"serie",note:"Miniserie espanola de comedia universitaria. Audiencia joven.",clients:["CaixaBank Payments and Consumer","Abanca","Staedtler","Haribo","Granini"]},
{month:10,date:"3 oct",name:"Estreno ANIMAL (Netflix)",cat:"serie",note:"Luis Zahera en la Espana rural. Drama de autor espaniol.",clients:["CaixaBank Payments and Consumer","Abanca","Gallina Blanca","Torres Brandy"]},
{month:10,date:"4 oct",name:"Dia Mundial de los Animales 🐾",cat:"daykeeting",note:"Mascotas y bienestar animal. Muy viral.",clients:["Granini"]},
{month:10,date:"5 oct",name:"Día Mundial del Hábitat (World Habitat Day) 🏗️",cat:"hogar",note:"ONU-Habitat. Vivienda digna y construccion sostenible: cita clave para el sector de materiales y quimica de construccion.",clients:["Master Builders Solutions","Jotun"],isNew:true},
{month:10,date:"5 oct",name:"Dia Mundial de los Docentes 📚",cat:"educacion",note:"Educacion y formacion.",clients:["Staedtler","Erasco","CaixaBank Payments and Consumer","Abanca"]},
{month:10,date:"6-8 oct",name:"Fruit Attraction Madrid (IFEMA) 🍇",cat:"agro",note:"Mayor feria mundial de fruta y hortalizas: +100 paises y fuerte presencia Latam. Cita ineludible para el sector agro y gran consumo.",clients:["Semillas Fitó","Makro","Gallina Blanca"],isNew:true},
{month:10,date:"6 oct",name:"Aniversario de Instagram 📸",cat:"daykeeting",note:"El cumpleanios de la red mas visual. Perfecto para marcas activas en Instagram.",clients:["Lekué","Haribo","Granini","CaixaBank Tech","Pepephone"]},
{month:10,date:"8 oct",name:"Estreno LA SUERTE (Disney+)",cat:"serie",note:"Comedia de Paco Plaza con taxista y torero. Produccion espanola.",clients:["CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet"]},
{month:10,date:"TBC oct",name:"The Strokes - Barcelona",cat:"concierto",note:"El quinteto de rock de New York regresa a Barcelona. Uno de los conciertos mas esperados del otonio.",clients:["Torres Brandy","Freixenet","CaixaBank Payments and Consumer"]},
{month:10,date:"9 oct",name:"Dia Mundial del Huevo 🥚",cat:"granconsumo",note:"Alimentacion basica. Muy viral y facil de activar.",clients:["Gallina Blanca","Makro","Nutella","Isogona"]},
{month:10,date:"10 oct",name:"Dia Mundial Salud Mental 🧠",cat:"farma",note:"El dia mas importante del anio para salud mental.",clients:["Dormidina","Isogona","Sérélys","CaixaBank Payments and Consumer","Abanca","Flavia"]},
{month:10,date:"11 oct",name:"Dia Internacional de la Nina 👧",cat:"daykeeting",note:"Igualdad y derechos. Marcas con valores.",clients:["Microbank","Abanca","Staedtler"]},
{month:10,date:"12 oct",name:"Dia de la Hispanidad - PUENTE (LUNES)",cat:"festivo",note:"Cae en lunes. Puente de 3 dias en toda Espana.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet","Torres Brandy","Granini","Haribo","Makro"]},
{month:10,date:"15 oct",name:"VisionQuest (Disney+)",cat:"serie",note:"Nueva serie de ciencia ficcion de Disney+. Muy esperada por los fans de la plataforma.",clients:["CaixaBank Payments and Consumer","Abanca","Haribo","Nutella"]},
{month:10,date:"16 oct",name:"Dia Mundial de la Alimentacion 🍎",cat:"granconsumo",note:"El mayor dia del anio para marcas de alimentacion y agro.",clients:["Gallina Blanca","Granini","Nutella","Haribo","Makro","Freixenet","Torres Brandy","Semillas Fitó","Frit Ravich"]},
{month:10,date:"17 oct",name:"Dia Internacional Erradicacion de la Pobreza 🌍",cat:"daykeeting",note:"RSC y contenido de impacto social. Microcreditos y financiacion inclusiva.",clients:["Microbank","Abanca","Granini"]},
{month:10,date:"18 oct",name:"Dia Mundial de la Menopausia 🌸",cat:"farma",note:"Salud femenina. Farma hormonal y bienestar femenino.",clients:["Sérélys","Isogona","Flavia"]},
{month:10,date:"19 oct",name:"Dia Mundial Lucha contra el Cancer de Mama",cat:"farma",note:"El mayor dia de visibilidad del anio para oncologia.",clients:["Pilexil","CaixaBank Payments and Consumer","Abanca","Sérélys","Hydrafizz","Flavia"]},
{month:10,date:"20 oct",name:"Dia Internacional del Chef 🧑‍🍳",cat:"granconsumo",note:"Gastronomia premium. Hosteleria y alimentacion.",clients:["Gallina Blanca","Makro","Freixenet","Torres Brandy","Frit Ravich","Kagura","Isogona","Lekué"]},
{month:10,date:"21 oct",name:"Terminal List T2 (Prime Video)",cat:"serie",note:"Regreso de Chris Pratt en el thriller militar mas visto de Amazon. Muy esperado.",clients:["CaixaBank Payments and Consumer","Abanca"]},
{month:10,date:"24 oct",name:"Dia Internacional contra el Cambio Climatico 🌡️",cat:"daykeeting",note:"Medioambiente y sostenibilidad.",clients:["Jotun","CaixaBank Payments and Consumer","Abanca","Granini","Semillas Fitó"]},
{month:10,date:"25 oct",name:"Dia de la Pasta 🍝",cat:"granconsumo",note:"Alimentacion. Muy viral y facil de activar.",clients:["Gallina Blanca","Makro","Nutella","Isogona"]},
{month:10,date:"28 oct",name:"Dia Mundial de la Animacion 🎬",cat:"daykeeting",note:"Animacion y creatividad visual. Marcas creativas.",clients:["Haribo","Nutella","Staedtler"]},
{month:10,date:"TBC oct",name:"Anastaica - gira Espana (Donostia, Gijon, Pamplona)",cat:"concierto",note:"La diva del pop europeo con grandes exitos en Espana.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca"]},
{month:10,date:"TBC oct",name:"Band of Horses - Madrid y Barcelona",cat:"concierto",note:"El grupo de indie americano regresa a Espana. Muy esperado por fans del genero.",clients:["Torres Brandy","Freixenet","CaixaBank Payments and Consumer"]},
{month:10,date:"31 oct",name:"Halloween",cat:"festivo",note:"En crecimiento en Espana. Gran oportunidad branded content creativo.",clients:["Haribo","Nutella","Freixenet","Torres Brandy","Makro","Granini","Frit Ravich"]},
{month:10,date:"31 oct",name:"Dia del Ahorro 💰",cat:"fiscal",note:"Banca, ahorro, pagos y discount retail. CaixaBank y Abanca directo.",clients:["CaixaBank Payments and Consumer","Abanca","M2P","Pago","Primaprix"]},
{month:10,date:"31 oct",name:"Estreno DIME TU NOMBRE (Amazon Prime)",cat:"serie",note:"Serie de terror sobrenatural. Perfecta para la semana de Halloween.",clients:["Haribo","Freixenet"]},
{month:10,date:"2 oct",name:"Digger - Tom Cruise + G. Inarritu (cines)",cat:"pelicula",note:"Inarritu dirige a Tom Cruise como el hombre mas poderoso del mundo que provoca un apocalipsis. Comedia epica y catastrofica. Favorita para los Oscar 2027. Con Jesse Plemons, Sandra Huller, Riz Ahmed y John Goodman.",clients:["CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet"],isNew:true},
{month:10,date:"TBC oct",name:"Premios Planeta",cat:"pelicula",note:"El mayor premio literario de Espana.",clients:["CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet","Staedtler"]},
// NOVIEMBRE
{month:11,date:"1 nov",name:"Dia Mundial del Veganismo 🌱",cat:"granconsumo",note:"Alimentacion plant-based en auge.",clients:["Gallina Blanca","Granini","Semillas Fitó"]},
{month:11,date:"1-2 nov",name:"Día de Muertos - México 💀",cat:"internacional",note:"Icono cultural mexicano de proyeccion global, tendencia creciente tambien fuera de Mexico. Oportunidad creativa para marcas con presencia en Latam.",clients:["Torres Brandy","Freixenet","Semillas Fitó"],isNew:true},
{month:11,date:"1-2 nov",name:"Dia de Todos los Santos - PUENTE",cat:"festivo",note:"Festivo lunes 2 nov en varias CC.AA. Puente de 4 dias.",clients:["Freixenet","Torres Brandy","Makro","Gallina Blanca","CaixaBank Payments and Consumer","Abanca"]},
{month:11,date:"9-12 nov",name:"Web Summit Lisboa 🇵🇹",cat:"internacional",note:"La mayor conferencia tech de Europa. Cita clave para el ecosistema de innovacion en Portugal.",clients:["Bluespace","CaixaBank Tech"],country:["🇵🇹 Portugal"],isNew:true},
{month:11,date:"4 nov",name:"Premios Gaudí 2027 - Presentacion de candidaturas",cat:"pelicula",note:"Arranca la carrera hacia los Gaudí, la gran noche del cine catalan. Oportunidad cultural para Frit Ravich.",clients:["Frit Ravich"],isNew:true},
{month:11,date:"3 nov",name:"Dia Mundial del Sandwich 🥪",cat:"daykeeting",note:"Alimentacion casual. Muy viral y ludico.",clients:["Gallina Blanca","Makro","Nutella"]},
{month:11,date:"4 nov",name:"Dia Internacional del Marketing 📊",cat:"daykeeting",note:"Marketing, creatividad, estrategia. Perfecto para agencias.",clients:["Pepephone","CaixaBank Tech","Abanca"]},
{month:11,date:"4 nov",name:"Dia del Caldo / Sopa 🍲",cat:"granconsumo",note:"Gallina Blanca y Erasco directo. Alimentacion otonio-invierno.",clients:["Gallina Blanca","Makro","Nutella","Erasco"]},
{month:11,date:"4 nov",name:"Estreno TODAS LAS DE LA LEY (Disney+)",cat:"serie",note:"Ryan Murphy. Kim Kardashian, Naomi Watts, Glenn Close. Drama legal.",clients:["CaixaBank Payments and Consumer","Abanca","Freixenet"]},
{month:11,date:"7 nov",name:"Estreno PLURIBUS (Apple TV+)",cat:"serie",note:"Serie sci-fi del creador de Breaking Bad.",clients:["CaixaBank Tech","Pepephone"]},
{month:11,date:"8 nov",name:"Dia Mundial sin WiFi",cat:"tech",note:"Desconexion digital. Humor y reflexion. Muy viral.",clients:["CaixaBank Tech","Abanca","Pepephone"]},
{month:11,date:"10-12 nov",name:"Mobile World Congress - Barcelona",cat:"tech",note:"Samsung, Huawei, Sony. Tecnologia global. Trending tech.",clients:["Bluespace","M2P","CaixaBank Tech","Abanca","Pepephone"]},
{month:11,date:"11 nov",name:"The Rings of Power T3 (Prime Video)",cat:"serie",note:"La epica serie del Senor de los Anillos de Amazon regresa. Una de las mas caras de la historia de la television.",clients:["CaixaBank Payments and Consumer","Abanca","Haribo","Nutella","Granini"]},
{month:11,date:"11 nov",name:"Single's Day / 11-11 🛒",cat:"granconsumo",note:"El mayor dia de ecommerce del anio.",clients:["Lekué","CaixaBank Payments and Consumer","Abanca","Pago","M2P","Haribo","Nutella","Granini","Primaprix","Pepephone"]},
{month:11,date:"13 nov",name:"Dia Mundial de la Bondad 💙",cat:"daykeeting",note:"Valores positivos. Marcas con proposito.",clients:["CaixaBank Payments and Consumer","Abanca","Granini"]},
{month:11,date:"14 nov",name:"Dia Mundial de la Diabetes 💙",cat:"farma",note:"El mayor dia de farma diabetologica del anio.",clients:["Isogona","Sérélys","Gallina Blanca","CaixaBank Payments and Consumer","Abanca","Flavia"]},
{month:11,date:"15 nov",name:"Dia Mundial sin Alcohol 🚫",cat:"farma",note:"Salud y bienestar.",clients:["Granini","CaixaBank Payments and Consumer"]},
{month:11,date:"16 nov",name:"Dia Internacional del Flamenco 💃",cat:"daykeeting",note:"Cultura espanola iconica. Muy visual y emocional.",clients:["Torres Brandy","Freixenet","Makro","CaixaBank Payments and Consumer","Abanca"]},
{month:11,date:"16 nov",name:"Dia del Emprendedor 💡",cat:"fiscal",note:"Emprendimiento y startups. Banca social, fintech.",clients:["Microbank","Abanca","M2P","Pago","Pepephone"]},
{month:11,date:"17 nov",name:"Dia del Estudiante 🎓",cat:"educacion",note:"Educacion y juventud. Marcas jovenes.",clients:["Staedtler","Erasco","CaixaBank Payments and Consumer","Abanca","Haribo","Granini"]},
{month:11,date:"19 nov",name:"Dia Internacional de la Mujer Emprendedora 💼",cat:"daykeeting",note:"Emprendimiento femenino. RSC, genero y microfinanciacion.",clients:["Microbank","Abanca","Sérélys"]},
{month:11,date:"20 nov",name:"Los Juegos del Hambre: Amanecer en la Cosecha",cat:"pelicula",note:"Nueva precuela del universo Katniss. Francis Lawrence.",clients:["Haribo","Nutella","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:11,date:"20-22 nov",name:"GP MotoGP Valencia - Cheste (FINAL TEMPORADA)",cat:"deporte",note:"Ultima carrera del Mundial de MotoGP 2026. Gran emotividad.",clients:["Castrol","Frigicoll","CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet"]},
{month:11,date:"21 nov",name:"Dia Mundial de la Television 📺",cat:"daykeeting",note:"Medios y entretenimiento. Series, plataformas, OTT.",clients:["CaixaBank Tech","Pepephone","Abanca"]},
{month:11,date:"23 nov",name:"Tokio Hotel - Madrid (Palacio Vistalegre)",cat:"concierto",note:"Regreso iconico dosmilero. Nostalgia garantizada.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca"]},
{month:11,date:"25 nov",name:"Dia Internacional Contra Violencia de Genero 🟣",cat:"daykeeting",note:"Alta conversacion social. Marcas con valores deben activar.",clients:["CaixaBank Payments and Consumer","Abanca","Sérélys","Flavia"]},
{month:11,date:"26 nov",name:"Thanksgiving - USA 🦃",cat:"internacional",note:"El gran dia de consumo familiar en Estados Unidos. Alimentacion, bebidas, snacks y regalos.",clients:["Torres Brandy","Nutella","Haribo","Granini","Frit Ravich"],isNew:true},
{month:11,date:"26 nov",name:"Las Cronicas de Narnia (Greta Gerwig)",cat:"pelicula",note:"Primera pelicula de Gerwig tras Barbie. Netflix en cines primero.",clients:["Haribo","Nutella","Granini","CaixaBank Payments and Consumer","Abanca"]},
{month:11,date:"27 nov",name:"Black Friday",cat:"granconsumo",note:"El mayor pico de consumo del anio.",clients:["Lekué","CaixaBank Payments and Consumer","Abanca","Pago","M2P","Haribo","Nutella","Granini","Pepephone","Pilexil","Makro","Primaprix","Frit Ravich"]},
{month:11,date:"27 nov",name:"Dia del Maestro",cat:"educacion",note:"Reconocimiento a los docentes.",clients:["Staedtler","Erasco","CaixaBank Payments and Consumer"]},
{month:11,date:"30 nov",name:"Dia del Influencer 📱",cat:"daykeeting",note:"Influencer marketing, creators, RRSS. Muy relevante para agencias.",clients:["CaixaBank Tech","Pepephone","Haribo","Granini"]},
{month:11,date:"30 nov",name:"Cyber Monday",cat:"granconsumo",note:"Remate del Black Friday. Ecommerce y tecnologia.",clients:["CaixaBank Payments and Consumer","Abanca","Pago","M2P","Pepephone","Haribo","Nutella","Primaprix"]},
{month:11,date:"TBC nov",name:"28 Anios Despues: El Templo de los Huesos",cat:"pelicula",note:"Secuela de 28 anios despues (2025). Nia DaCosta. Terror zombi britanico.",clients:["Haribo","Freixenet","Torres Brandy"]},
{month:11,date:"TBC nov",name:"Premios Latin Grammy",cat:"pelicula",note:"Musica latina global.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca","Granini","Nutella"]},
// DICIEMBRE
{month:12,date:"16 dic",name:"Premios Gaudí 2027 - Nominados",cat:"pelicula",note:"Lectura publica de nominados en La Pedrera. Cine catalan en el foco mediatico.",clients:["Frit Ravich"],isNew:true},
{month:12,date:"1 dic",name:"Dia Mundial del SIDA 🔴",cat:"farma",note:"El mayor dia de farma VIH del anio.",clients:["Isogona","CaixaBank Payments and Consumer","Abanca"]},
{month:12,date:"3 dic",name:"Dia Internacional Personas con Discapacidad ♿",cat:"daykeeting",note:"Inclusion social. RSC y marcas con valores.",clients:["Microbank","Abanca"]},
{month:12,date:"3 dic",name:"Dia del Medico 👨‍⚕️",cat:"farma",note:"La profesion medica. Todo el portfolio farma.",clients:["Pilexil","Isogona","Dormidina","Rinocusi","Talquistina","Sérélys","Flavia"]},
{month:12,date:"5 dic",name:"Dia del Voluntariado 🤝",cat:"daykeeting",note:"RSC y proposito de marca.",clients:["Microbank","Abanca","Granini"]},
{month:12,date:"5 dic",name:"Dia Internacional del Ninja 🥷",cat:"daykeeting",note:"Humor y cultura pop. Muy viral.",clients:["Haribo","Nutella","Granini"]},
{month:12,date:"6 dic",name:"Dia de la Constitucion Espanola",cat:"festivo",note:"Festivo nacional. Valores democraticos.",clients:["CaixaBank Payments and Consumer","Abanca","Torres Brandy","Freixenet"]},
{month:12,date:"6-8 dic",name:"Puente Constitucion + Inmaculada (4 dias)",cat:"festivo",note:"Festivo 7 dic (lunes). Uno de los puentes mas largos del anio.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Nutella","Makro","CaixaBank Payments and Consumer","Abanca","Jotun","Talquistina"]},
{month:12,date:"7 dic",name:"Dia Mundial del Algodon de Azucar 🩷",cat:"daykeeting",note:"Muy ludico y viral.",clients:["Haribo","Nutella","Granini"]},
{month:12,date:"9 dic",name:"Dia Mundial de la Informatica 💻",cat:"tech",note:"Tecnologia y programacion.",clients:["CaixaBank Tech","Pepephone","M2P"]},
{month:12,date:"10 dic",name:"Dia de los Derechos Humanos 🌍",cat:"daykeeting",note:"Valores universales. RSC.",clients:["Microbank","Abanca"]},
{month:12,date:"11 dic",name:"Jumanji 3",cat:"pelicula",note:"Dwayne Johnson, Jack Black, Kevin Hart. Cine familiar navideno.",clients:["Haribo","Nutella","Granini","Freixenet","CaixaBank Payments and Consumer"]},
{month:12,date:"11-12 dic",name:"Hombres G - Madrid (AGOTADO)",cat:"concierto",note:"Los mejores anios de nuestra vida Tour. Nostalgia 80s/90s.",clients:["Freixenet","Torres Brandy","CaixaBank Payments and Consumer","Abanca","Makro"]},
{month:12,date:"18 dic",name:"DOBLE BOMBAZO: Avengers Doomsday + Dune 3",cat:"pelicula",note:"Avengers con RDJ + Dune Parte 3 (Chalamet, Zendaya) el mismo dia. Fin de anio sin precedentes.",clients:["Haribo","Nutella","Granini","Freixenet","CaixaBank Payments and Consumer"]},
{month:12,date:"20 dic",name:"Dia Internacional de la Solidaridad Humana 🤝",cat:"daykeeting",note:"Valores y RSC. Cierre de anio con proposito.",clients:["Microbank","Abanca","Granini"]},
{month:12,date:"21 dic",name:"Solsticio de Invierno ❄️",cat:"daykeeting",note:"El dia mas corto del anio. Contenido poetico y estacional.",clients:["Freixenet","Jotun","Torres Brandy","CaixaBank Payments and Consumer"]},
{month:12,date:"22 dic",name:"El Gordo - Loteria de Navidad",cat:"fiscal",note:"El mayor evento de loteria de Europa. Trending masivo y muy emocional.",clients:["CaixaBank Payments and Consumer","Abanca","M2P","Pago","Freixenet","Haribo","Nutella","Makro"]},
{month:12,date:"22 dic",name:"Paga Extra de Navidad",cat:"fiscal",note:"Nominas dobles. Pico de consumo navideno.",clients:["CaixaBank Payments and Consumer","Abanca","M2P","Pago","Freixenet","Torres Brandy","Makro","Haribo","Nutella"]},
{month:12,date:"25 dic",name:"HARRY POTTER T1 - ESTRENO HBO Max",cat:"serie",note:"Harry Potter y la Piedra Filosofal. 25 diciembre. 8 episodios. Trailer con 277M vistas en 48h. FENOMENO GLOBAL.",clients:["Haribo","Nutella","Granini","Staedtler","CaixaBank Payments and Consumer","Abanca","Freixenet"]},
{month:12,date:"25 dic",name:"Navidad",cat:"festivo",note:"El periodo de mayor actividad de contenido del anio.",clients:["Freixenet","Torres Brandy","Nutella","Haribo","Granini","Gallina Blanca","Makro","CaixaBank Payments and Consumer","Abanca","Lekué","Jotun","Frit Ravich","Primaprix"]},
{month:12,date:"28 dic",name:"Dia de los Inocentes 🤡",cat:"daykeeting",note:"Bromas y humor. Branded content irreverente.",clients:["Haribo","Nutella","Granini","Pepephone"]},
{month:12,date:"31 dic",name:"Nochevieja - Las 12 Uvas",cat:"festivo",note:"Puerta del Sol, 12 uvas, champan. El cierre del anio mas seguido de Espana.",clients:["Freixenet","Torres Brandy","Granini","Haribo","Nutella","Makro","Gallina Blanca","CaixaBank Payments and Consumer","Abanca","Frit Ravich"]},
{month:12,date:"Dic",name:"Mercadillos de Navidad",cat:"granconsumo",note:"Madrid, Barcelona, Sevilla, Granada. Lifestyle navideno.",clients:["Haribo","Nutella","Freixenet","Torres Brandy","Makro","Gallina Blanca","CaixaBank Payments and Consumer","Abanca","Jotun","Lekué"]},
];
const ALL_CATS=Object.keys(CAT);
const UNIQUE_CLIENTS=[...new Set(EVENTS.flatMap(e=>e.clients||[]))].sort();
function ClientBadge({name}){const bg=CC[name]||"#6B7280";return <span style={{background:bg,color:"#fff",padding:"0.1rem 0.45rem",borderRadius:5,fontSize:"0.58rem",fontWeight:700,whiteSpace:"nowrap"}}>{name}</span>;}
function EventCard({ev,showClients=true}){
  const[hov,setHov]=useState(false);
  const cat=CAT[ev.cat];
  if(!cat)return null;
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?cat.bg:J.white,border:`1.5px solid ${hov?cat.color:J.border}`,borderLeft:`4px solid ${cat.color}`,borderRadius:10,padding:"0.85rem 1rem",transition:"all 0.15s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"0.4rem",marginBottom:"0.3rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.3rem",flexWrap:"wrap"}}>
          <span style={{background:cat.color,color:J.white,padding:"0.12rem 0.5rem",borderRadius:6,fontSize:"0.62rem",fontWeight:800,letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{cat.icon} {cat.tag}</span>
          {ev.isNew&&<span title="Añadido en la última actualización del calendario" style={{background:J.yellow,color:J.blueDeep,padding:"0.12rem 0.45rem",borderRadius:6,fontSize:"0.6rem",fontWeight:800,letterSpacing:"0.04em",whiteSpace:"nowrap"}}>🆕 NEW</span>}
          {ev.country?.map(c=><span key={c} style={{background:J.white,color:J.blueDeep,border:`1px solid ${J.border}`,padding:"0.1rem 0.42rem",borderRadius:6,fontSize:"0.58rem",fontWeight:700,whiteSpace:"nowrap"}}>{c}</span>)}
        </div>
        <span style={{fontSize:"0.68rem",color:J.muted,fontWeight:600,textAlign:"right",flexShrink:0}}>{ev.date}</span>
      </div>
      <div style={{fontWeight:800,fontSize:"0.88rem",lineHeight:1.3,marginBottom:"0.3rem",color:J.text}}>{ev.name}</div>
      {ev.note&&<div style={{fontSize:"0.72rem",color:J.muted,lineHeight:1.5,marginBottom:showClients&&ev.clients?.length?"0.4rem":0}}>{ev.note}</div>}
      {showClients&&ev.clients?.length>0&&(
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.25rem",borderTop:`1px solid ${J.border}`,paddingTop:"0.4rem"}}>
          {ev.clients.map(c=><ClientBadge key={c} name={c}/>)}
        </div>
      )}
    </div>
  );
}
export default function App(){
  const[view,setView]=useState("month");
  const[activeMonth,setActiveMonth]=useState(7);
  const[activeCat,setActiveCat]=useState("todos");
  const[globalCat,setGlobalCat]=useState("serie");
  const[activeClient,setActiveClient]=useState("todos");
  const[search,setSearch]=useState("");
  const filtered=useMemo(()=>{
    const q=search.toLowerCase().trim();
    const ok=e=>!q||
      e.name.toLowerCase().includes(q)||
      (e.note||"").toLowerCase().includes(q)||
      (e.date||"").toLowerCase().includes(q)||
      (e.clients||[]).some(cl=>cl.toLowerCase().includes(q));
    if(view==="month")return EVENTS.filter(e=>
      e.month===activeMonth&&
      (activeCat==="todos"||e.cat===activeCat)&&
      (activeClient==="todos"||(e.clients||[]).includes(activeClient))&&
      ok(e));
    if(view==="global")return EVENTS.filter(e=>e.cat===globalCat&&ok(e));
    // client view
    return EVENTS.filter(e=>
      (activeClient==="todos"||(e.clients||[]).includes(activeClient))&&
      ok(e));
  },[view,activeMonth,activeCat,globalCat,activeClient,search]);
  const grid=(evs)=><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:"0.8rem"}}>{evs.map((ev,i)=><EventCard key={i} ev={ev} showClients={false}/>)}</div>;
  const byMonth=(evs)=>MONTHS.map(m=>{const me=evs.filter(e=>e.month===m.id);if(!me.length)return null;return <div key={m.id} style={{marginBottom:"1.8rem"}}><div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.7rem"}}><span style={{background:J.blue,color:J.white,fontWeight:800,padding:"0.2rem 0.8rem",borderRadius:6,fontSize:"0.8rem"}}>{m.name.toUpperCase()}</span><div style={{height:2,flex:1,background:J.border,borderRadius:2}}/><span style={{fontSize:"0.75rem",color:J.muted,fontWeight:600}}>{me.length} eventos</span></div>{grid(me)}</div>;});
  const sw=v=>{setView(v);setActiveCat("todos");setActiveClient("todos");};
  const catFilters=<div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"1rem"}}>{["todos",...ALL_CATS].map(f=>{const isA=f===activeCat;const cat=CAT[f];return <button key={f} onClick={()=>setActiveCat(f)} style={{padding:"0.28rem 0.65rem",borderRadius:20,background:isA?(cat?cat.color:J.blue):"transparent",border:`1.5px solid ${cat?cat.color:J.blue}`,color:isA?J.white:(cat?cat.color:J.blue),fontSize:"0.68rem",fontWeight:700,transition:"all 0.15s",whiteSpace:"nowrap"}}>{cat?`${cat.icon} ${cat.label}`:"Todos"}</button>;})}</div>;
  return(
    <div style={{fontFamily:"'Rethink Sans',sans-serif",background:J.bg,minHeight:"100vh",color:J.text}}>
      <div style={{background:J.blue,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:180,height:180,background:J.yellow,borderRadius:"50%",opacity:0.2}}/>
        <div style={{position:"absolute",bottom:-20,left:200,width:100,height:100,background:J.pink,borderRadius:"50%",opacity:0.18}}/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"1.5rem 2rem 1.2rem",position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"1.2rem",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.8rem"}}>
              <div style={{background:J.white,borderRadius:14,padding:"6px 14px"}}><span style={{color:J.blue,fontWeight:800,fontSize:"1.3rem",letterSpacing:"-0.03em"}}>Jirada</span></div>
              <div style={{width:1,height:36,background:"rgba(255,255,255,0.3)"}}/>
              <div><div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.7)",letterSpacing:"0.2em",textTransform:"uppercase"}}>Social Creative Agency</div><div style={{fontSize:"1.1rem",fontWeight:800,color:J.white}}>Calendario de Oportunidades 2026</div></div>
            </div>
            <div style={{marginLeft:"auto",display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
              <span style={{background:J.yellow,color:J.blueDeep,fontWeight:800,padding:"0.3rem 1rem",borderRadius:20,fontSize:"0.85rem"}}>ABR — DIC 2026</span>
              <span style={{background:"rgba(255,255,255,0.15)",color:J.white,fontWeight:600,padding:"0.3rem 0.8rem",borderRadius:20,fontSize:"0.8rem"}}>{EVENTS.length} eventos</span>
            </div>
          </div>
          <div style={{marginTop:"1rem",display:"flex",gap:"0.6rem",flexWrap:"wrap",alignItems:"center"}}>
          <input type="text" placeholder="🔍 Buscar evento, serie, artista, cliente..." value={search} onChange={ev=>setSearch(ev.target.value)}
            style={{flex:"1",minWidth:260,maxWidth:500,padding:"0.6rem 1rem",background:"rgba(255,255,255,0.18)",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:8,color:J.white,fontSize:"0.85rem",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:6,color:J.white,padding:"0.5rem 0.8rem",cursor:"pointer",fontSize:"0.8rem",fontWeight:700}}>✕ Borrar</button>}
          <select value={activeClient} onChange={ev=>{setActiveClient(ev.target.value);}}
            style={{padding:"0.55rem 0.8rem",background:"rgba(255,255,255,0.18)",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:8,color:J.white,fontSize:"0.82rem",outline:"none",cursor:"pointer",fontFamily:"inherit",maxWidth:200}}>
            <option value="todos" style={{color:"#000"}}>👥 Todos los clientes</option>
            {UNIQUE_CLIENTS.map(cl=><option key={cl} value={cl} style={{color:"#000"}}>{cl}</option>)}
          </select>
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
        {view!=="global"&&catFilters}
        {view==="month"&&<>
          <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",marginBottom:"1rem"}}>
            {MONTHS.map(m=>{const isA=m.id===activeMonth;const cnt=EVENTS.filter(e=>e.month===m.id).length;return <button key={m.id} onClick={()=>setActiveMonth(m.id)} style={{padding:"0.4rem 0.9rem",borderRadius:8,background:isA?J.blue:J.white,border:`2px solid ${isA?J.blue:J.border}`,color:isA?J.white:J.muted,fontWeight:700,fontSize:"0.8rem",transition:"all 0.15s"}}>{m.name} <span style={{opacity:0.65,fontSize:"0.7rem"}}>({cnt})</span></button>;})}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.2rem"}}>
            <h2 style={{margin:0,fontSize:"2rem",fontWeight:800,color:J.blue,letterSpacing:"-0.03em"}}>{MONTHS.find(m=>m.id===activeMonth)?.name}</h2>
            <div style={{height:3,flex:1,background:`linear-gradient(90deg,${J.blue},transparent)`,borderRadius:2}}/>
            <span style={{background:J.yellow,color:J.blueDeep,fontWeight:800,padding:"0.2rem 0.7rem",borderRadius:12,fontSize:"0.8rem"}}>{filtered.length} eventos</span>
          </div>
          {grid(filtered)}
        </>}
        {view==="global"&&<>
          <div style={{marginBottom:"1.2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"0.6rem"}}>
              <div style={{fontSize:"0.72rem",color:J.muted,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>Vista anio completo — shareable con clientes</div>
              <span style={{background:"#DCFCE7",color:"#16A34A",fontWeight:700,fontSize:"0.65rem",padding:"0.15rem 0.6rem",borderRadius:10}}>SIN INFO INTERNA</span>
            </div>
            <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
              {ALL_CATS.map(c=>{const cat=CAT[c];const isA=c===globalCat;const cnt=EVENTS.filter(e=>e.cat===c).length;return <button key={c} onClick={()=>setGlobalCat(c)} style={{padding:"0.4rem 0.9rem",borderRadius:8,background:isA?cat.color:J.white,border:`2px solid ${cat.color}`,color:isA?J.white:cat.color,fontWeight:700,fontSize:"0.78rem",transition:"all 0.15s",whiteSpace:"nowrap"}}>{cat.icon} {cat.label} <span style={{opacity:0.65,fontSize:"0.7rem"}}>({cnt})</span></button>;})}
            </div>
          </div>
          {(()=>{const cat=CAT[globalCat];return<><div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.5rem"}}><span style={{fontSize:"2rem"}}>{cat.icon}</span><h2 style={{margin:0,fontSize:"1.8rem",fontWeight:800,color:cat.color}}>{cat.label} — Vista anual</h2><span style={{background:cat.color,color:J.white,fontWeight:800,padding:"0.2rem 0.8rem",borderRadius:12,fontSize:"0.8rem",marginLeft:"auto"}}>{filtered.length} entradas</span></div>{byMonth(filtered)}</>})()}
        </>}
        {view==="client"&&<>
          <div style={{marginBottom:"1.2rem"}}>
            <div style={{fontSize:"0.72rem",color:J.muted,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.6rem"}}>Selecciona cliente — todas sus oportunidades del anio</div>
            <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
              <button onClick={()=>setActiveClient("todos")} style={{padding:"0.35rem 0.8rem",borderRadius:20,background:activeClient==="todos"?J.blue:J.white,border:`2px solid ${J.blue}`,color:activeClient==="todos"?J.white:J.blue,fontWeight:700,fontSize:"0.75rem",transition:"all 0.15s"}}>Todos</button>
              {UNIQUE_CLIENTS.map(c=><button key={c} onClick={()=>setActiveClient(c)} style={{padding:"0.35rem 0.8rem",borderRadius:20,background:activeClient===c?(CC[c]||J.blueDeep):J.white,border:`2px solid ${CC[c]||J.border}`,color:activeClient===c?J.white:J.text,fontWeight:activeClient===c?700:500,fontSize:"0.72rem",transition:"all 0.15s"}}>{c}</button>)}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.5rem"}}>
            <h2 style={{margin:0,fontSize:"1.6rem",fontWeight:800,color:activeClient==="todos"?J.blue:(CC[activeClient]||J.blueDeep)}}>{activeClient==="todos"?"Todos los eventos":activeClient+" — Oportunidades 2026"}</h2>
            <span style={{background:J.yellow,color:J.blueDeep,fontWeight:800,padding:"0.2rem 0.8rem",borderRadius:12,fontSize:"0.8rem",marginLeft:"auto"}}>{filtered.length} activaciones</span>
          </div>
          {byMonth(filtered)}
        </>}
        <div style={{marginTop:"2.5rem",padding:"1.2rem 1.5rem",background:J.white,border:`1.5px solid ${J.border}`,borderRadius:12}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.6rem",marginBottom:"0.8rem"}}>{ALL_CATS.map(c=>{const cat=CAT[c];return <div key={c} style={{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.7rem",color:J.muted,fontWeight:600}}><span style={{width:9,height:9,borderRadius:2,background:cat.color,display:"inline-block",flexShrink:0}}/>{cat.icon} {cat.label}</div>;})}</div>
          <div style={{fontSize:"0.68rem",color:"#aaa",lineHeight:1.6}}>🆕 <b>NEW</b> = evento incorporado en la ultima actualizacion del calendario.<br/>Fuentes: Metricool · Seriemaniac · FilmAffinity · Espinof · CNN Espanol · esmadrid.com · educaweb · FIFA 2026 · AEAT · SantandersMusic · Songkick · wakeandlisten.com · IFEMA (Fruit Attraction) · UN-Habitat · Nissin (Dia del Ramen)<br/>Actualizado julio 2026 — Jirada Social Creative Agency</div>
        </div>
      </div>
    </div>
  );
}
