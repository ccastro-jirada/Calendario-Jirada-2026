import { useState, useMemo } from "react";

const J = {
  blue: "#1E90FF", blueDark: "#0066CC", blueDeep: "#003A8C",
  yellow: "#FFE033", pink: "#FF6EC7", green: "#00E5A0",
  white: "#FFFFFF", bg: "#EEF5FF", border: "#D0E4FF",
  text: "#0A1628", muted: "#5B7BA0",
};

const CAT = {
  serie:        { label: "Series",             icon: "📺", color: "#7C3AED", bg: "#EDE9FE", tag: "SERIES" },
  pelicula:     { label: "Cine",               icon: "🎬", color: "#DC2626", bg: "#FEE2E2", tag: "CINE" },
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
};

const MONTHS = [
  { id: 4, name: "Abril" }, { id: 5, name: "Mayo" }, { id: 6, name: "Junio" },
  { id: 7, name: "Julio" }, { id: 8, name: "Agosto" }, { id: 9, name: "Septiembre" },
  { id: 10, name: "Octubre" }, { id: 11, name: "Noviembre" }, { id: 12, name: "Diciembre" },
];

const EVENTS = [
  // ══ ABRIL ══
  { month: 4, date: "1 abr", name: "Super Mario Galaxy: La Película", cat: "pelicula", note: "Estreno global. Secuela más taquillera de 2023 (+750M$). Yoshi, Rosalina, Bowser Jr." },
  { month: 4, date: "1 abr", name: "Día de los Inocentes (April Fools)", cat: "daykeeting", note: "Humor y creatividad en redes. Branded content irreverente." },
  { month: 4, date: "2 abr", name: "Día Mundial del Autismo", cat: "daykeeting", note: "Concienciación social. Contenido inclusivo y de impacto." },
  { month: 4, date: "4 abr", name: "Día Mundial del Deporte para el Desarrollo", cat: "daykeeting", note: "Deporte + valores. Apto para marcas de consumo masivo y bienestar." },
  { month: 4, date: "7 abr", name: "Día Mundial de la Salud (OMS)", cat: "farma", note: "El día más importante del año para farma, seguros y salud. Campaña obligada." },
  { month: 4, date: "8 abr", name: "Inicio Campaña Declaración de la Renta IRPF 2025", cat: "fiscal", note: "Campaña online hasta el 30 junio. Alta intención de búsqueda. Banca, asesorías." },
  { month: 4, date: "10 abr", name: "Semana Santa – Inicio vacaciones", cat: "festivo", note: "Pico de viajes y ocio familiar. Retail, turismo, alimentación." },
  { month: 4, date: "11 abr", name: "Día Mundial del Parkinson", cat: "farma", note: "Visibilidad enfermedades neurodegenerativas." },
  { month: 4, date: "14 abr", name: "Día Mundial Enfermedad de Chagas", cat: "farma", note: "Salud tropical y global. ONG y farmacéuticas." },
  { month: 4, date: "16 abr", name: "Día Mundial de la Voz", cat: "daykeeting", note: "Marcas de audio, podcasts y comunicación." },
  { month: 4, date: "18 abr", name: "Día Mundial del Patrimonio", cat: "daykeeting", note: "Cultura, turismo y territorio." },
  { month: 4, date: "20 abr", name: "Premiere El Diablo Viste de Prada 2 (NYC)", cat: "pelicula", note: "Disney+ emite en directo 23:30h España. Moda + nostalgia. Trending semana completa." },
  { month: 4, date: "22 abr", name: "Día de la Tierra 🌍", cat: "daykeeting", note: "Sostenibilidad obligada. Gran consumo, energía, moda. Alto alcance." },
  { month: 4, date: "23 abr", name: "Día del Libro / Sant Jordi", cat: "festivo", note: "Rosas y libros en Cataluña. Gran engagement." },
  { month: 4, date: "24 abr", name: "MICHAEL – Biopic Michael Jackson", cat: "pelicula", note: "Jaafar Jackson como MJ. Antoine Fuqua. 200M$. Thriller, Bad, Off the Wall." },
  { month: 4, date: "25 abr", name: "Día Mundial de la Libertad de Prensa", cat: "daykeeting", note: "Medios y comunicación." },
  { month: 4, date: "26 abr", name: "Día Mundial de la Propiedad Intelectual", cat: "daykeeting", note: "Creatividad, marcas, patentes." },
  { month: 4, date: "29 abr", name: "Día Internacional de la Danza", cat: "daykeeting", note: "Moda, música, lifestyle. Muy visual para RRSS." },
  { month: 4, date: "30 abr", name: "El Diablo Viste de Prada 2 – Cines España", cat: "pelicula", note: "Streep + Hathaway + Blunt. 20º aniversario. Tráiler con 222M vistas/día." },
  { month: 4, date: "30 abr", name: "Día Nacional del Veterinario", cat: "farma", note: "Salud animal. Marcas de mascotas y nutri-farma veterinaria." },
  { month: 4, date: "10–19 abr", name: "Coachella 2026 (celebrado)", cat: "internacional", note: "Sabrina Carpenter, Justin Bieber, Karol G. Conversación global de moda y música." },
  { month: 4, date: "11–14 abr", name: "Bad Gyal – Madrid (3 noches)", cat: "concierto", note: "Da Me, Última Noche (feat. Ozuna). Reggaetón + dancehall." },
  { month: 4, date: "13–18 abr", name: "Rosalía – Barcelona (4 noches Palau Sant Jordi)", cat: "concierto", note: "Debut de su nueva gira en casa. Fenómeno global." },
  { month: 4, date: "30 abr", name: "5 Seconds of Summer – Madrid (Vistalegre)", cat: "concierto", note: "Everyone's A Star Tour. Pop rock australiano." },
  // ══ MAYO ══
  { month: 5, date: "1 may", name: "Día del Trabajo – PUENTE largo 🎉", cat: "festivo", note: "Cae en viernes. Puente largo. Contenido de descanso, viajes y experiencias." },
  { month: 5, date: "2 may", name: "Fiesta Comunidad de Madrid", cat: "festivo", note: "Festivo en Madrid. Verbenas, cultura popular." },
  { month: 5, date: "3 may", name: "Día Mundial Libertad de Prensa", cat: "daykeeting", note: "Comunicación y medios." },
  { month: 5, date: "4 may", name: "Star Wars Day (May the 4th)", cat: "daykeeting", note: "Trending global garantizado. Potenciado por estreno Mandalorian el 22." },
  { month: 5, date: "5 may", name: "Día de la Madre 🌸", cat: "granconsumo", note: "El gran día del gran consumo: flores, perfumería, cosmética, alimentación premium, farmacia." },
  { month: 5, date: "7 may", name: "Día Mundial del Asma", cat: "farma", note: "Respiratorio y salud pulmonar. Farma respiratoria." },
  { month: 5, date: "8 may", name: "Día de la Cruz Roja / Enfermería", cat: "farma", note: "Salud y cuidado. Contenido con propósito." },
  { month: 5, date: "10 may", name: "Día de la Salud Mental", cat: "farma", note: "Bienestar mental. Farma, seguros, apps de salud." },
  { month: 5, date: "12 may", name: "Día Internacional de las Enfermeras", cat: "farma", note: "Reconocimiento sanitario. Farma + hospitales." },
  { month: 5, date: "15 may", name: "San Isidro – Madrid", cat: "festivo", note: "Verbenas, chulapos, chotis. Gran oportunidad local." },
  { month: 5, date: "15 may", name: "Berlín y la Dama del Armiño T2 (Netflix)", cat: "serie", note: "Estreno 15 mayo. Spin-off La Casa de Papel. Pedro Alonso en Sevilla. Álvaro Morte en cameo." },
  { month: 5, date: "15–17 may", name: "GP MotoGP – Catalunya (Montmeló)", cat: "deporte", note: "Marc Márquez. Alta audiencia nacional." },
  { month: 5, date: "17 may", name: "Día Mundial contra la Homofobia (IDAHOBIT)", cat: "daykeeting", note: "Diversidad e inclusión. Marcas con valores. Alto engagement." },
  { month: 5, date: "17 may", name: "Día Mundial de Internet", cat: "daykeeting", note: "Tecnología, conectividad. Apto para marcas digitales." },
  { month: 5, date: "19 may", name: "Día Mundial de la Hepatitis", cat: "farma", note: "Farma hepatológica, analíticas, diagnóstico." },
  { month: 5, date: "20 may", name: "Día Mundial de las Abejas", cat: "granconsumo", note: "Biodiversidad + alimentación. Gran consumo, miel, cosmética natural." },
  { month: 5, date: "21 may", name: "Día Mundial de la Diversidad Cultural", cat: "daykeeting", note: "Cultura y diversidad. Marcas globales." },
  { month: 5, date: "22 may", name: "Bad Bunny – Barcelona (Estadi Olímpic) 1ª noche", cat: "concierto", note: "DeBÍ TiRAR MáS FOToS World Tour. 600.000 entradas agotadas en España." },
  { month: 5, date: "22 may", name: "The Mandalorian & Grogu (cines)", cat: "pelicula", note: "Star Wars en cines. Baby Yoda + Mando. Audiencia masiva fans Disney+." },
  { month: 5, date: "23 may", name: "Bad Bunny – Barcelona 2ª noche", cat: "concierto", note: "Segunda fecha Barcelona del DeBÍ TiRAR MáS FOToS Tour." },
  { month: 5, date: "21–22 may", name: "Pablo Alborán – Madrid (Movistar Arena)", cat: "concierto", note: "Gira Global KM0. 2 noches en Madrid." },
  { month: 5, date: "25 may", name: "Día de África", cat: "daykeeting", note: "Diversidad y cultura." },
  { month: 5, date: "28–31 may", name: "La Oreja de Van Gogh – Madrid (x3, AGOTADO)", cat: "concierto", note: "Regreso épico con Amaia Montero. Tres noches agotadas. Nostalgia máxima." },
  { month: 5, date: "30–31 may", name: "Bad Bunny – Madrid (Metropolitano) 1ª y 2ª noche", cat: "concierto", note: "Inicio de 10 fechas en Madrid. Hito histórico. 60.000 personas/noche." },
  { month: 5, date: "31 may", name: "Día Mundial sin Tabaco", cat: "farma", note: "Salud respiratoria. Farma, seguros, bienestar." },
  { month: 5, date: "4 may", name: "Eros Ramazzotti – Madrid (Movistar Arena)", cat: "concierto", note: "Una Historia Importante World Tour." },
  { month: 5, date: "7 may", name: "Eric Clapton – Madrid (Movistar Arena)", cat: "concierto", note: "Regreso a España tras 20 años. Leyenda del rock y blues." },
  { month: 5, date: "8–9 may", name: "Fito & Fitipaldis – Madrid (Movistar Arena)", cat: "concierto", note: "Dos noches del rock vasco más querido." },
  // ══ JUNIO ══
  { month: 6, date: "1 jun", name: "Día Internacional de la Infancia", cat: "daykeeting", note: "Gran consumo: juguetes, alimentación infantil, salud pediátrica, moda infantil." },
  { month: 6, date: "1 jun", name: "Renta 2025: Inicio atención presencial Hacienda", cat: "fiscal", note: "Última fase de la campaña. Banca, seguros, asesorías." },
  { month: 6, date: "2–4 jun", name: "SELECTIVIDAD PAU – Convocatoria Ordinaria", cat: "educacion", note: "Andalucía, Madrid, País Vasco, Galicia, Valencia… Enorme conversación entre jóvenes y familias." },
  { month: 6, date: "2–15 jun", name: "Bad Bunny – Madrid (10 noches Metropolitano)", cat: "concierto", note: "2, 3, 6, 7, 10, 11, 14 y 15 junio. Residencia histórica. 600.000 personas en total." },
  { month: 6, date: "3–7 jun", name: "Primavera Sound 2026 – Barcelona", cat: "festival", note: "El Coachella europeo. Indie, alternativo, pop. Cartel de primer nivel." },
  { month: 6, date: "5 jun", name: "Día Mundial del Medio Ambiente 🌿", cat: "daykeeting", note: "Sostenibilidad obligada. Gran consumo, energía, alimentación." },
  { month: 6, date: "7 jun", name: "Día Mundial de la Seguridad Alimentaria", cat: "granconsumo", note: "Alimentación, distribución, packaging. Muy relevante para gran consumo." },
  { month: 6, date: "8 jun", name: "Día Mundial de los Océanos 🌊", cat: "daykeeting", note: "Medioambiente, turismo, alimentación sostenible." },
  { month: 6, date: "9–11 jun", name: "SELECTIVIDAD PAU – Cataluña", cat: "educacion", note: "Cataluña tiene fechas propias: 9, 10 y 11 de junio." },
  { month: 6, date: "11 jun", name: "MUNDIAL FIFA 2026 – ¡ARRANCA! 🏆", cat: "deporte", note: "EE.UU., México, Canadá. 48 selecciones. El evento deportivo del año. España participa." },
  { month: 6, date: "11 jun", name: "El Día de la Revelación (Spielberg)", cat: "pelicula", note: "Nueva película del maestro Spielberg. Ciencia ficción. Expectación máxima." },
  { month: 6, date: "12 jun", name: "Scary Movie 6", cat: "pelicula", note: "Regreso Wayans + Anna Faris + Regina Hall tras 13 años. Parodia terror reciente. Muy viral." },
  { month: 6, date: "14 jun", name: "Día Mundial del Donante de Sangre", cat: "farma", note: "Salud y solidaridad. Cruz Roja, hospitales, farma." },
  { month: 6, date: "18–21 jun", name: "Sónar 2026 – Barcelona", cat: "festival", note: "Referente mundial de música electrónica y tecnología digital." },
  { month: 6, date: "19 jun", name: "Toy Story 5", cat: "pelicula", note: "Woody y Buzz regresan. Amenaza: las tablets y la IA. El regreso Pixar más esperado." },
  { month: 6, date: "20–21 jun", name: "Kalorama – Madrid (Caja Mágica)", cat: "festival", note: "Pet Shop Boys, Jorja Smith, Scissor Sisters. Festival pop-indie en Madrid." },
  { month: 6, date: "21 jun", name: "Solsticio de Verano / Día de la Música", cat: "daykeeting", note: "Conciertos gratuitos, música en la calle. Tendencia en Europa." },
  { month: 6, date: "21 jun", name: "Día del Padre 👨", cat: "granconsumo", note: "Perfumería, tecnología, deporte, alimentación. Gran consumo." },
  { month: 6, date: "23–24 jun", name: "Linkin Park – Madrid (Rivas Vaciamadrid)", cat: "concierto", note: "Regreso con nueva cantante Emily Armstrong. Sold out." },
  { month: 6, date: "24 jun", name: "San Juan 🔥", cat: "festivo", note: "Hogueras, playa, noche mágica en Galicia, Valencia, Cataluña." },
  { month: 6, date: "25–28 jun", name: "Resurrection Fest – Viveiro", cat: "festival", note: "Korn, Slipknot, Judas Priest. Metal. Community muy activa." },
  { month: 6, date: "26 jun", name: "Supergirl: Woman of Tomorrow (DC)", cat: "pelicula", note: "DC Universe. Gran expectación fans superhéroes." },
  { month: 6, date: "27 jun–4 jul", name: "Gay Games – Valencia", cat: "festivo", note: "Primer Gay Games en España. Diversidad e inclusión de alcance global." },
  { month: 6, date: "28 jun", name: "Día Internacional del Orgullo LGTBIQ+ 🏳️‍🌈", cat: "daykeeting", note: "El día de mayor alcance para diversidad en redes. Alto engagement." },
  { month: 6, date: "30 jun", name: "FIN Campaña Declaración de la Renta", cat: "fiscal", note: "Último día para presentar el IRPF 2025. Pico de búsqueda." },
  { month: 6, date: "4–6 jun", name: "Zahara – Madrid (Noches del Botánico)", cat: "concierto", note: "Jesucrista Superstar Tour. Indie español." },
  { month: 6, date: "20 jun", name: "Alejandro Sanz – Madrid (Metropolitano)", cat: "concierto", note: "¿Y Ahora Qué? Tour en estadio." },
  { month: 6, date: "9 jun", name: "Mobland (SkyShowtime)", cat: "serie", note: "Guy Ritchie. Tom Hardy, Pierce Brosnan, Helen Mirren. Mafia. BOMBAZO del año." },
  { month: 6, date: "19 jun", name: "Lume (HBO Max)", cat: "serie", note: "Serie española. Thriller sobre incendios en Galicia." },
  // ══ JULIO ══
  { month: 7, date: "1 jul", name: "Minions 3 (Minions & Monsters)", cat: "pelicula", note: "7ª entrega Mi Villano Favorito. Trending meme garantizado." },
  { month: 7, date: "3 jul", name: "OT 2025 – Gira Madrid (Movistar Arena)", cat: "concierto", note: "Los 16 concursantes de Operación Triunfo 2025 en Madrid." },
  { month: 7, date: "4 jul", name: "Chayanne – Madrid (Metropolitano)", cat: "concierto", note: "Bailemos Otra Vez World Tour. El galán eterno llena estadios." },
  { month: 7, date: "4 jul", name: "Independencia USA 🎇", cat: "daykeeting", note: "Barbacoas, verano, cultura americana. Relevante para marcas globales." },
  { month: 7, date: "5 jul", name: "Kany García – Madrid (Movistar Arena)", cat: "concierto", note: "La compositora favorita del pop en español." },
  { month: 7, date: "6–14 jul", name: "San Fermín – Pamplona", cat: "festivo", note: "Encierros, chupinazo. Icono cultural español con proyección internacional." },
  { month: 7, date: "7 jul", name: "Día Mundial del Chocolate 🍫", cat: "granconsumo", note: "Confitería, snacks. Altísimo engagement." },
  { month: 7, date: "8–11 jul", name: "Mad Cool 2026 – Madrid", cat: "festival", note: "Foo Fighters, Florence+Machine, Lorde, Twenty One Pilots, Kings of Leon, Nick Cave. El mayor festival rock de España." },
  { month: 7, date: "9–11 jul", name: "Bilbao BBK Live 2026", cat: "festival", note: "Lily Allen, Robbie Williams, Alabama Shakes, Interpol, IDLES. Kobetamendi." },
  { month: 7, date: "9–12 jul", name: "Festival Cruïlla – Barcelona", cat: "festival", note: "Indie, pop, world music en el Parc del Fòrum." },
  { month: 7, date: "9 jul", name: "Grupo Frontera – Madrid (Movistar Arena)", cat: "concierto", note: "Regional mexicano fusión. Fenómeno del año en la música urbana latina." },
  { month: 7, date: "10 jul", name: "Vaiana – Live-Action Disney", cat: "pelicula", note: "Remake acción real de Moana. Dwayne Johnson como Maui. 10º aniversario del original." },
  { month: 7, date: "11–12 jul", name: "Aitana – Madrid (Movistar Arena) 1ª y 2ª noche", cat: "concierto", note: "Cuarto Azul World Tour. Dos noches agotadas en Madrid." },
  { month: 7, date: "16 jul", name: "Día Mundial del Emoji 🎉", cat: "daykeeting", note: "Trending lúdico. Muy viral y fácil de activar en RRSS." },
  { month: 7, date: "16 jul", name: "Jamiroquai – Sevilla", cat: "concierto", note: "Concierto único en España. Funky, nostálgico y viral." },
  { month: 7, date: "17 jul", name: "La Odisea (Christopher Nolan)", cat: "pelicula", note: "Homero en IMAX. El evento cinematográfico del verano." },
  { month: 7, date: "17–19 jul", name: "FIB 2026 – Benicàssim", cat: "festival", note: "The Prodigy, The Kooks, Kaiser Chiefs, Biffy Clyro, Pendulum. Festival de playa indie/brit." },
  { month: 7, date: "19 jul", name: "MUNDIAL FIFA 2026 – FINAL 🏆", cat: "deporte", note: "La final del torneo más visto de la historia. El evento global del año." },
  { month: 7, date: "22 jul", name: "Aitana – Madrid 3ª y 4ª noche", cat: "concierto", note: "Cuarto Azul World Tour. 4 noches en Madrid en total." },
  { month: 7, date: "25 jul", name: "Santiago Apóstol – Día de Galicia", cat: "festivo", note: "Festivo en Galicia. El Camino, peregrinación, cultura." },
  { month: 7, date: "28 jul", name: "Día Mundial de la Hepatitis C", cat: "farma", note: "Hepatología y diagnóstico." },
  { month: 7, date: "30 jul", name: "Día Mundial de la Amistad 💛", cat: "daykeeting", note: "Muy emocional. Gran consumo: bebidas, snacks, experiencias." },
  { month: 7, date: "31 jul", name: "Spider-Man: Brand New Day", cat: "pelicula", note: "Tom Holland regresa. Con Hulk (Ruffalo) y Punisher (Bernthal). Conversación Marvel máxima." },
  { month: 7, date: "9 jul", name: "Ballard (Amazon Prime Video)", cat: "serie", note: "Spin-off de Bosch. Policíaca de culto." },
  { month: 7, date: "11 jul", name: "Furia (HBO Max)", cat: "serie", note: "Serie española. Episodios con mujeres protagonistas en situaciones límite." },
  // ══ AGOSTO ══
  { month: 8, date: "1 ago", name: "Día Mundial de la Cerveza 🍺", cat: "granconsumo", note: "Bebidas, hostelería. Muy viral en verano." },
  { month: 8, date: "1–2 ago", name: "Dreambeach – Vélez-Málaga", cat: "festival", note: "David Guetta, Eric Prydz. Electrónica + playa. +120.000 asistentes." },
  { month: 8, date: "5–8 ago", name: "FIB – Benicàssim (edición extra)", cat: "festival", note: "The Prodigy, Pendulum, Biffy Clyro." },
  { month: 8, date: "7 ago", name: "Día Internacional de la Cerveza (1º viernes agosto)", cat: "granconsumo", note: "Mayor conversación cervecera en RRSS. Hostelería y gran consumo." },
  { month: 8, date: "12 ago", name: "Día Internacional de la Juventud", cat: "daykeeting", note: "Marcas de consumo joven, educación y cultura." },
  { month: 8, date: "15 ago", name: "Asunción de la Virgen – FESTIVO NACIONAL 🎉", cat: "festivo", note: "Pico de vacaciones. Turismo, hostelería, distribución." },
  { month: 8, date: "19 ago", name: "Día Mundial de la Fotografía 📷", cat: "daykeeting", note: "Muy visual. Marcas creativas, fotógrafos, moda, lifestyle." },
  { month: 8, date: "28–30 ago", name: "The Weeknd – Madrid (Metropolitano)", cat: "concierto", note: "After Hours Til Dawn Tour. 3 noches. R&B global de primer nivel." },
  { month: 8, date: "28–30 ago", name: "GP MotoGP – Aragón (MotorLand)", cat: "deporte", note: "Gran Premio de Aragón. Marc Márquez en casa." },
  { month: 8, date: "TBC", name: "Arenal Sound – Burriana", cat: "festival", note: "Mayor festival de playa de España. Pop, indie, reggaetón." },
  { month: 8, date: "TBC", name: "Medusa Festival – Benicàssim", cat: "festival", note: "Electrónica masiva y playa. Escenario flotante. Muy viral." },
  { month: 8, date: "TBC", name: "Sonorama Ribera – Aranda de Duero", cat: "festival", note: "Crystal Fighters, Leiva, Love of Lesbian, Guitarricadelafuente." },
  // ══ SEPTIEMBRE ══
  { month: 9, date: "1 sep", name: "Vuelta al Cole 🎒", cat: "granconsumo", note: "El pico de compra escolar. Mochilas, material, alimentación, farma." },
  { month: 9, date: "1–6 sep", name: "Premier Pádel – Madrid (Movistar Arena)", cat: "deporte", note: "Lebron, Galán, Tapia. Las grandes estrellas del pádel mundial." },
  { month: 9, date: "2–4 sep", name: "Selectividad Extraordinaria – Cataluña", cat: "educacion", note: "Segunda convocatoria PAU en Cataluña." },
  { month: 9, date: "4–8 sep", name: "Aitana – Barcelona (Palau Sant Jordi, 4 noches, AG)", cat: "concierto", note: "Cuarto Azul World Tour en casa. Fenómeno en Cataluña." },
  { month: 9, date: "8–9 sep", name: "Leiva – Madrid (Movistar Arena, 4 noches)", cat: "concierto", note: "El cantautor de referencia del indie español." },
  { month: 9, date: "10 sep", name: "Día Mundial Prevención del Suicidio", cat: "farma", note: "Salud mental. Muy sensible. Farma, seguros, bienestar." },
  { month: 9, date: "11–15 sep", name: "Aitana – Madrid (Movistar Arena, 4 noches, AG)", cat: "concierto", note: "Cuarto Azul World Tour en Madrid. 4 noches. Fenómeno histórico artista española." },
  { month: 9, date: "11–13 sep", name: "Gran Premio de España F1 – Madrid (IFEMA)", cat: "deporte", note: "F1 vuelve a Madrid. Evento histórico. Trending global." },
  { month: 9, date: "15 sep", name: "Día Internacional de la Democracia", cat: "daykeeting", note: "Valores y ciudadanía." },
  { month: 9, date: "18–27 sep", name: "Shakira – Madrid (residencia, 6 noches)", cat: "concierto", note: "Estadio Shakira: 18, 19, 20, 25, 26 y 27 sept. El evento del otoño." },
  { month: 9, date: "21 sep", name: "Día Internacional de la Paz ☮️", cat: "daykeeting", note: "Valores universales. Marcas con propósito." },
  { month: 9, date: "23–27 sep", name: "Finales World Triatlón – Pontevedra", cat: "deporte", note: "Evento internacional de triatlón. Galicia en el foco." },
  { month: 9, date: "24–27 sep", name: "ARCO Madrid – Arte Contemporáneo (IFEMA)", cat: "daykeeting", note: "Cita clave de arte y coleccionismo. Lifestyle, lujo, cultura." },
  { month: 9, date: "26 sep", name: "Estreno ROMI (Amazon Prime Video)", cat: "serie", note: "Serie española. Agente de policía sorda. Producción nacional esperada." },
  { month: 9, date: "27 sep", name: "Día Mundial del Turismo", cat: "granconsumo", note: "Hostelería, destinos, agencias. Gran consumo turístico." },
  { month: 9, date: "29 sep", name: "Día Mundial del Corazón ❤️", cat: "farma", note: "El mayor día de farma cardiovascular del año. Seguros de salud, bienestar." },
  // ══ OCTUBRE ══
  { month: 10, date: "1 oct", name: "Día Internacional de las Personas Mayores", cat: "farma", note: "Salud sénior, suplementación, farma. Gran relevancia sector salud." },
  { month: 10, date: "1 oct", name: "Día Mundial del Café ☕", cat: "granconsumo", note: "Gran consumo: café, hostelería, food. Altísimo engagement." },
  { month: 10, date: "1 oct", name: "Placebo – Madrid (Movistar Arena)", cat: "concierto", note: "30 aniversario. Placebo RE:CREATED. Rock alternativo." },
  { month: 10, date: "2–11 oct", name: "Shakira – Madrid (cierre residencia, 5 noches)", cat: "concierto", note: "2, 3, 4, 10 y 11 oct. 11 noches totales en Madrid. Fenómeno histórico." },
  { month: 10, date: "3 oct", name: "Estreno MONSTRUO: Ed Gein (Netflix)", cat: "serie", note: "Ryan Murphy. Nueva entrega de la saga (Dahmer, Hermanos Méndez). Expectación máxima." },
  { month: 10, date: "3 oct", name: "Estreno ZOOMERS (Amazon Prime)", cat: "serie", note: "Miniserie española de comedia universitaria. Audiencia joven." },
  { month: 10, date: "3 oct", name: "Estreno ANIMAL (Netflix)", cat: "serie", note: "Luis Zahera en la España rural. Drama de autor español." },
  { month: 10, date: "5 oct", name: "Día Mundial de los Docentes", cat: "daykeeting", note: "Educación y formación. Marcas de material escolar, ed-tech." },
  { month: 10, date: "8 oct", name: "Estreno LA SUERTE (Disney+)", cat: "serie", note: "Comedia de Paco Plaza con taxista y torero. Producción española." },
  { month: 10, date: "10 oct", name: "Día Mundial de la Salud Mental 🧠", cat: "farma", note: "El día más importante del año para salud mental. Farma, seguros, apps de bienestar." },
  { month: 10, date: "12 oct", name: "Día de la Hispanidad 🎉 PUENTE (LUNES)", cat: "festivo", note: "Cae en lunes. Puente de 3 días en toda España. Orgullo nacional." },
  { month: 10, date: "16 oct", name: "Día Mundial de la Alimentación 🍎", cat: "granconsumo", note: "El mayor día del año para marcas de alimentación. Nutrición, dietas, gran consumo." },
  { month: 10, date: "16 oct", name: "Street Fighter: La Película", cat: "pelicula", note: "Remake del clásico videojuego. Gaming community muy activa." },
  { month: 10, date: "20 oct", name: "Día Mundial de la Osteoporosis", cat: "farma", note: "Calcio, suplementación, farma ortopédica." },
  { month: 10, date: "22 oct", name: "Evanescence – Barcelona", cat: "concierto", note: "Amy Lee en Barcelona. Rock gótico-melódico." },
  { month: 10, date: "25 oct", name: "Día Contra el Cáncer de Mama 🎗️", cat: "farma", note: "El mayor día de visibilidad del año para oncología y farma." },
  { month: 10, date: "31 oct", name: "Halloween 🎃", cat: "festivo", note: "En crecimiento en España. Gran oportunidad de branded content creativo." },
  { month: 10, date: "31 oct", name: "Estreno DIME TU NOMBRE (Amazon Prime)", cat: "serie", note: "Serie de terror sobrenatural. Perfecta para la semana de Halloween." },
  { month: 10, date: "TBC oct", name: "El Fantasma de la Ópera (2026, Francia)", cat: "pelicula", note: "Nueva adaptación francesa. Deva Cassel. Ambientada en el Ballet de la Ópera de París." },
  // ══ NOVIEMBRE ══
  { month: 11, date: "1–2 nov", name: "Día de Todos los Santos 🎉 PUENTE", cat: "festivo", note: "Festivo lunes 2 nov en varias CC.AA. Puente de 4 días." },
  { month: 11, date: "4 nov", name: "Estreno TODAS LAS DE LA LEY (Disney+)", cat: "serie", note: "Ryan Murphy. Kim Kardashian, Naomi Watts, Glenn Close. Drama legal. Bombazo." },
  { month: 11, date: "7 nov", name: "Estreno PLURIBUS (Apple TV+)", cat: "serie", note: "Serie sci-fi del creador de Breaking Bad. Uno de los eventos de la temporada." },
  { month: 11, date: "7 nov", name: "Estreno MAXTON HALL T2 (Amazon)", cat: "serie", note: "Regreso de la serie alemana más vista de Europa." },
  { month: 11, date: "10–12 nov", name: "Mobile World Congress – Barcelona", cat: "daykeeting", note: "Samsung, Huawei, Sony. Tecnología global. Trending tech." },
  { month: 11, date: "11 nov", name: "Single's Day / 11-11 🛒", cat: "granconsumo", note: "El mayor día de ecommerce del año. Moda, tecnología, gran consumo." },
  { month: 11, date: "14 nov", name: "Día Mundial de la Diabetes 💙", cat: "farma", note: "El mayor día de farma diabetológica del año." },
  { month: 11, date: "15 nov", name: "Día Mundial del Reciclaje ♻️", cat: "daykeeting", note: "Sostenibilidad. Gran consumo circular, packaging, medioambiente." },
  { month: 11, date: "15–16 nov", name: "Agorazein – Madrid (Movistar Arena, AGOTADO)", cat: "concierto", note: "Regreso icónico del rap en castellano. Dos noches agotadas." },
  { month: 11, date: "20 nov", name: "Los Juegos del Hambre: Amanecer en la Cosecha", cat: "pelicula", note: "Nueva precuela del universo Katniss. Francis Lawrence. La franquicia dystópica YA más exitosa." },
  { month: 11, date: "20–22 nov", name: "GP MotoGP Valencia – Cheste (FINAL TEMPORADA)", cat: "deporte", note: "Última carrera del Mundial de MotoGP 2026. Gran emotividad." },
  { month: 11, date: "21 nov", name: "Día Mundial de la Televisión 📺", cat: "daykeeting", note: "Medios y entretenimiento. Series, plataformas, OTT." },
  { month: 11, date: "23 nov", name: "Tokio Hotel – Madrid (Palacio Vistalegre)", cat: "concierto", note: "Regreso icónico dosmilero. Nostalgia garantizada." },
  { month: 11, date: "25 nov", name: "Día Internacional Contra la Violencia de Género 🟣", cat: "daykeeting", note: "Alta conversación social. Marcas con valores deben activar." },
  { month: 11, date: "TBC nov", name: "28 Años Después: El Templo de los Huesos", cat: "pelicula", note: "Secuela de 28 años después (2025). Nia DaCosta dirige. Terror zombi británico de culto." },
  { month: 11, date: "26 nov", name: "Las Crónicas de Narnia (Greta Gerwig)", cat: "pelicula", note: "Primera película de Gerwig tras Barbie (1.400M$). Netflix en cines primero. Bombazo cultural." },
  { month: 11, date: "TBC nov", name: "Black Friday 🛒", cat: "granconsumo", note: "El mayor pico de consumo del año. Gran consumo, retail, electrónica, moda." },
  { month: 11, date: "27 nov", name: "La Plazuela – Madrid (Movistar Arena)", cat: "concierto", note: "Concierto esperado del cantautor malagueño." },
  // ══ DICIEMBRE ══
  { month: 12, date: "1 dic", name: "Día Mundial del SIDA 🔴", cat: "farma", note: "El mayor día de farma VIH del año. Alta visibilidad social y farma." },
  { month: 12, date: "3 dic", name: "Día Internacional Personas con Discapacidad", cat: "daykeeting", note: "Inclusión social. RSC y marcas con valores." },
  { month: 12, date: "5 dic", name: "Día del Voluntariado", cat: "daykeeting", note: "RSC y propósito de marca." },
  { month: 12, date: "6–8 dic", name: "Puente Constitución + Inmaculada 🎉 (4 días)", cat: "festivo", note: "Festivo 7 dic (lunes). Uno de los puentes más largos del año. Viajes, compras navideñas." },
  { month: 12, date: "11 dic", name: "Jumanji 3", cat: "pelicula", note: "Dwayne Johnson, Jack Black, Kevin Hart, Karen Gillan. Despedida épica de la saga. Cine familiar navideño." },
  { month: 12, date: "11–12 dic", name: "Hombres G – Madrid (Movistar Arena, AGOTADO)", cat: "concierto", note: "Los mejores años de nuestra vida Tour. Nostalgia 80s/90s. Sold out." },
  { month: 12, date: "14 dic", name: "Jeanette – Madrid (Movistar Arena)", cat: "concierto", note: "La leyenda del pop en Madrid." },
  { month: 12, date: "18 dic", name: "DOBLE BOMBAZO: Avengers Doomsday + Dune 3", cat: "pelicula", note: "Avengers con RDJ como Doctor Doom + Dune Parte 3 (Chalamet, Zendaya) el mismo día. Fin de año sin precedentes." },
  { month: 12, date: "19 dic", name: "Raphael – Madrid (Movistar Arena)", cat: "concierto", note: "El divo eterno en Navidad." },
  { month: 12, date: "22 dic", name: "Melendi – Madrid (Movistar Arena)", cat: "concierto", note: "El cantautor malagueño en Navidad." },
  { month: 12, date: "22 dic", name: "El Gordo – Lotería de Navidad 🎲", cat: "granconsumo", note: "El mayor evento de lotería de Europa. Trending masivo y muy emocional." },
  { month: 12, date: "25 dic", name: "Navidad 🎄", cat: "festivo", note: "El período de mayor actividad de contenido del año. Balance, deseos, familia." },
  { month: 12, date: "25 dic", name: "HARRY POTTER T1 – ESTRENO HBO Max 🪄", cat: "serie", note: "Harry Potter y la Piedra Filosofal. 25 diciembre. Nuevo reparto. 8 episodios. Tráiler con 277M vistas en 48h. FENÓMENO GLOBAL." },
  { month: 12, date: "26 dic", name: "Taburete – Madrid (Movistar Arena)", cat: "concierto", note: "Post-Navidad con Taburete." },
  { month: 12, date: "28 dic", name: "Amaral – Madrid (Movistar Arena)", cat: "concierto", note: "El dúo de Zaragoza en Navidad en Madrid." },
  { month: 12, date: "30 dic", name: "La Oreja de Van Gogh – Madrid (cierre de año)", cat: "concierto", note: "Tantas Cosas que Contar Tour. El regreso definitivo con Amaia Montero cierra el año." },
  { month: 12, date: "21 dic", name: "Solsticio de Invierno", cat: "daykeeting", note: "El día más corto del año. Contenido poético y estacional." },
  { month: 12, date: "31 dic", name: "Nochevieja – Las 12 Uvas 🍇", cat: "festivo", note: "Puerta del Sol, 12 uvas, champán. El cierre del año más seguido de España." },
  { month: 12, date: "Dic", name: "Mercadillos de Navidad", cat: "granconsumo", note: "Madrid, Barcelona, Sevilla, Granada. Contenido de ambiente navideño y lifestyle." },
];

const ALL_CATS = Object.keys(CAT);

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.4rem", marginBottom: "0.35rem" }}>
        <span style={{ background: cat.color, color: J.white, padding: "0.12rem 0.5rem", borderRadius: 6, fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
          {cat.icon} {cat.tag}
        </span>
        <span style={{ fontSize: "0.7rem", color: J.muted, fontWeight: 600, textAlign: "right", flexShrink: 0 }}>
          {ev.date}
        </span>
      </div>
      <div style={{ fontWeight: 800, fontSize: "0.88rem", lineHeight: 1.3, marginBottom: ev.note ? "0.3rem" : 0, color: J.text }}>
        {ev.name}
      </div>
      {ev.note && (
        <div style={{ fontSize: "0.73rem", color: J.muted, lineHeight: 1.5 }}>
          {ev.note}
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
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const base = view === "month"
      ? EVENTS.filter(e => e.month === activeMonth)
      : EVENTS.filter(e => e.cat === globalCat);
    return base.filter(e =>
      (activeCat === "todos" || e.cat === activeCat) &&
      (search === "" || e.name.toLowerCase().includes(search.toLowerCase()) || (e.note || "").toLowerCase().includes(search.toLowerCase()))
    );
  }, [view, activeMonth, activeCat, globalCat, search]);

  return (
    <div style={{ fontFamily: "'Rethink Sans', sans-serif", background: J.bg, minHeight: "100vh", color: J.text }}>
      {/* HEADER */}
      <div style={{ background: J.blue, padding: "0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, background: J.yellow, borderRadius: "50%", opacity: 0.2 }} />
        <div style={{ position: "absolute", bottom: -20, left: 200, width: 100, height: 100, background: J.pink, borderRadius: "50%", opacity: 0.18 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem 2rem 1.2rem", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div style={{ background: J.white, borderRadius: 14, padding: "6px 14px" }}>
                <span style={{ color: J.blue, fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em" }}>Jirada</span>
              </div>
              <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.3)" }} />
              <div>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Social Creative Agency</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: J.white }}>Calendario de Oportunidades</div>
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ background: J.yellow, color: J.blueDeep, fontWeight: 800, padding: "0.3rem 1rem", borderRadius: 20, fontSize: "0.85rem" }}>ABR — DIC 2026</span>
              <span style={{ background: "rgba(255,255,255,0.15)", color: J.white, fontWeight: 600, padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.8rem" }}>{EVENTS.length} entradas</span>
            </div>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text" placeholder="🔍  Buscar evento, artista, serie, película..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", maxWidth: 460, padding: "0.55rem 1rem", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, color: J.white, fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginTop: "0.9rem", display: "flex", gap: "0.5rem" }}>
            {[{ id: "month", label: "📅 Vista Mensual" }, { id: "global", label: "🗂️ Vista Global por Categoría" }].map(v => (
              <button key={v.id} onClick={() => setView(v.id)} style={{ padding: "0.4rem 1rem", borderRadius: 20, border: "1.5px solid rgba(255,255,255,0.4)", background: view === v.id ? J.yellow : "rgba(255,255,255,0.1)", color: view === v.id ? J.blueDeep : J.white, fontWeight: 700, fontSize: "0.8rem", transition: "all 0.15s" }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem 2rem" }}>

        {/* VISTA MENSUAL */}
        {view === "month" && (
          <>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {MONTHS.map(m => {
                const isActive = m.id === activeMonth;
                const count = EVENTS.filter(e => e.month === m.id).length;
                return (
                  <button key={m.id} onClick={() => setActiveMonth(m.id)} style={{ padding: "0.45rem 1rem", borderRadius: 8, background: isActive ? J.blue : J.white, border: `2px solid ${isActive ? J.blue : J.border}`, color: isActive ? J.white : J.muted, fontWeight: 700, fontSize: "0.8rem", transition: "all 0.15s" }}>
                    {m.name} <span style={{ opacity: 0.65, fontSize: "0.7rem" }}>({count})</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
              {["todos", ...ALL_CATS].map(f => {
                const isActive = f === activeCat;
                const cat = CAT[f];
                return (
                  <button key={f} onClick={() => setActiveCat(f)} style={{ padding: "0.3rem 0.7rem", borderRadius: 20, background: isActive ? (cat ? cat.color : J.blue) : "transparent", border: `1.5px solid ${cat ? cat.color : J.blue}`, color: isActive ? J.white : (cat ? cat.color : J.blue), fontSize: "0.7rem", fontWeight: 700, transition: "all 0.15s", whiteSpace: "nowrap" }}>
                    {cat ? `${cat.icon} ${cat.label}` : "🗓 Todos"}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
              <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 800, color: J.blue, letterSpacing: "-0.03em" }}>
                {MONTHS.find(m => m.id === activeMonth)?.name}
              </h2>
              <div style={{ height: 3, flex: 1, background: `linear-gradient(90deg, ${J.blue}, transparent)`, borderRadius: 2 }} />
              <span style={{ background: J.yellow, color: J.blueDeep, fontWeight: 800, padding: "0.2rem 0.7rem", borderRadius: 12, fontSize: "0.8rem" }}>{filtered.length} eventos</span>
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: J.muted, fontStyle: "italic" }}>Sin resultados.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "0.8rem" }}>
                {filtered.map((ev, i) => <EventCard key={i} ev={ev} />)}
              </div>
            )}
          </>
        )}

        {/* VISTA GLOBAL */}
        {view === "global" && (
          <>
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontSize: "0.75rem", color: J.muted, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Selecciona categoría para ver todo el año</div>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {ALL_CATS.map(c => {
                  const cat = CAT[c];
                  const isActive = c === globalCat;
                  const count = EVENTS.filter(e => e.cat === c).length;
                  return (
                    <button key={c} onClick={() => setGlobalCat(c)} style={{ padding: "0.45rem 1rem", borderRadius: 8, background: isActive ? cat.color : J.white, border: `2px solid ${cat.color}`, color: isActive ? J.white : cat.color, fontWeight: 700, fontSize: "0.78rem", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                      {cat.icon} {cat.label} <span style={{ opacity: 0.65, fontSize: "0.7rem" }}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {(() => {
              const cat = CAT[globalCat];
              const evsByMonth = MONTHS.map(m => ({ month: m, events: filtered.filter(e => e.month === m.id) })).filter(x => x.events.length > 0);
              return (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "2.2rem" }}>{cat.icon}</span>
                    <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: 800, color: cat.color }}>{cat.label} — Vista anual</h2>
                    <span style={{ background: cat.color, color: J.white, fontWeight: 800, padding: "0.2rem 0.8rem", borderRadius: 12, fontSize: "0.8rem", marginLeft: "auto" }}>{filtered.length} entradas</span>
                  </div>
                  {evsByMonth.map(({ month: m, events }) => (
                    <div key={m.id} style={{ marginBottom: "1.8rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem" }}>
                        <span style={{ background: J.blue, color: J.white, fontWeight: 800, padding: "0.2rem 0.8rem", borderRadius: 6, fontSize: "0.8rem" }}>{m.name.toUpperCase()}</span>
                        <div style={{ height: 2, flex: 1, background: J.border, borderRadius: 2 }} />
                        <span style={{ fontSize: "0.75rem", color: J.muted, fontWeight: 600 }}>{events.length} eventos</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "0.7rem" }}>
                        {events.map((ev, i) => <EventCard key={i} ev={ev} />)}
                      </div>
                    </div>
                  ))}
                </>
              );
            })()}
          </>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: "2.5rem", padding: "1.2rem 1.5rem", background: J.white, border: `1.5px solid ${J.border}`, borderRadius: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.8rem" }}>
            {ALL_CATS.map(c => {
              const cat = CAT[c];
              return (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: J.muted, fontWeight: 600 }}>
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
