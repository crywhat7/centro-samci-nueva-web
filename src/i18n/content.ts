import type { Locale } from "./config";

type T = { es: string; en: string };
type TL = { es: string[]; en: string[] };

export type ProductData = { slug: T; name: T; desc: T; body: T; uses: TL; tags: string[] };
export type CategoryData = { slug: T; name: T; kicker: T; intro: T; body: TL; image: string; products: ProductData[] };

export const categories: CategoryData[] = [
  {
    slug: { es: "equipo-contra-incendios", en: "fire-equipment" },
    name: { es: "Equipo contra incendios", en: "Fire equipment" },
    kicker: { es: "Extintores · Mangueras · CPVC", en: "Extinguishers · Hoses · CPVC" },
    image: "/img/extintores.jpg",
    intro: {
      es: "Extintores portátiles para cada clase de fuego y equipo de primera respuesta para oficinas, comercios, restaurantes, bodegas e industria en Honduras.",
      en: "Portable extinguishers for every class of fire and first-response equipment for offices, retail, restaurants, warehouses and industry in Honduras.",
    },
    body: {
      es: [
        "El extintor portátil es la primera línea de defensa ante un conato de incendio. Elegir el agente correcto es tan importante como tenerlo a mano: un extintor de químico seco ABC protege la mayoría de oficinas y comercios, uno de CO2 cuida equipos eléctricos y electrónicos sin dejar residuo, el Purple K responde ante líquidos y gases inflamables y el extintor clase K está diseñado para las freidoras y planchas de las cocinas comerciales.",
        "En Centro Samci le ayudamos a calcular cuántos extintores necesita, de qué capacidad y dónde ubicarlos, siguiendo las recomendaciones de la norma NFPA 10 y los requisitos del Cuerpo de Bomberos de Honduras. Todos nuestros equipos se entregan cargados, con su etiqueta de inspección y la opción de incluirlos en nuestro programa de recarga y mantenimiento.",
        "Complementamos los extintores con mangueras contra incendio para gabinetes y tubería CPVC para sistemas de rociadores, de manera que su edificio cuente con una protección completa desde un solo proveedor.",
      ],
      en: [
        "A portable extinguisher is the first line of defense against an incipient fire. Choosing the right agent matters as much as having one at hand: an ABC dry chemical extinguisher protects most offices and shops, CO2 protects electrical and electronic equipment without residue, Purple K handles flammable liquids and gases, and Class K is designed for the fryers and griddles of commercial kitchens.",
        "At Centro Samci we help you work out how many extinguishers you need, what size and where to place them, following NFPA 10 guidance and the requirements of the Honduran Fire Department. Every unit is delivered charged, tagged and ready to join our refill and maintenance program.",
        "We complement extinguishers with fire hoses for hose cabinets and CPVC pipe for sprinkler systems, so your building gets complete protection from a single supplier.",
      ],
    },
    products: [
      {
        slug: { es: "extintor-abc-quimico-seco", en: "abc-dry-chemical-extinguisher" },
        name: { es: "Extintor ABC de químico seco", en: "ABC dry chemical extinguisher" },
        tags: ["A", "B", "C"],
        desc: {
          es: "Fosfato monoamónico multipropósito para fuegos de sólidos, líquidos inflamables y equipos eléctricos.",
          en: "Multipurpose monoammonium phosphate for fires in solids, flammable liquids and electrical equipment.",
        },
        body: {
          es: "El extintor ABC es el más versátil y el más utilizado en Honduras. Su agente de fosfato monoamónico se derrite y se adhiere a las superficies en incendios clase A, aislando el combustible del oxígeno; en incendios clase B interrumpe la reacción química en cadena, y como no conduce la electricidad es seguro frente a equipos energizados (clase C). Lo ofrecemos en distintas capacidades para vehículos, hogares, oficinas, bodegas y plantas industriales.",
          en: "The ABC extinguisher is the most versatile and widely used in Honduras. Its monoammonium phosphate agent melts and clings to surfaces in Class A fires, cutting off oxygen; in Class B fires it breaks the chemical chain reaction, and because it is non-conductive it is safe on energized equipment (Class C). Available in several sizes for vehicles, homes, offices, warehouses and plants.",
        },
        uses: { es: ["Oficinas y comercios", "Bodegas y centros de distribución", "Vehículos y flotas", "Hogares y condominios"], en: ["Offices and retail", "Warehouses and distribution centers", "Vehicles and fleets", "Homes and condominiums"] },
      },
      {
        slug: { es: "extintor-co2", en: "co2-extinguisher" },
        name: { es: "Extintor de dióxido de carbono (CO2)", en: "Carbon dioxide (CO2) extinguisher" },
        tags: ["B", "C", "FM", "USCG"],
        desc: {
          es: "Gas limpio, sin olor y sin residuo. Ideal para cuartos de servidores, laboratorios y equipo electrónico.",
          en: "Clean, odorless, residue-free gas. Ideal for server rooms, labs and electronic equipment.",
        },
        body: {
          es: "El CO2 desplaza el oxígeno y enfría la zona del fuego sin dejar polvo ni humedad, por lo que es la opción preferida donde un agente químico causaría daños: centros de datos, tableros eléctricos, laboratorios, archivos, cocinas y áreas de alimentos. Combate eficazmente incendios clase B y C, no conduce la electricidad y cuenta con aprobaciones FM y USCG.",
          en: "CO2 displaces oxygen and cools the fire area without leaving powder or moisture, making it the preferred choice wherever a chemical agent would cause damage: data centers, electrical panels, labs, archives and food areas. Effective on Class B and C fires, non-conductive, with FM and USCG approvals.",
        },
        uses: { es: ["Centros de datos y telecomunicaciones", "Tableros y subestaciones eléctricas", "Laboratorios y hospitales", "Archivos y documentación"], en: ["Data and telecom centers", "Electrical panels and substations", "Labs and hospitals", "Archives and records"] },
      },
      {
        slug: { es: "extintor-purple-k", en: "purple-k-extinguisher" },
        name: { es: "Extintor Purple K", en: "Purple K extinguisher" },
        tags: ["B", "C"],
        desc: {
          es: "Bicarbonato de potasio de alta eficacia sobre líquidos inflamables y gases presurizados.",
          en: "High-efficiency potassium bicarbonate for flammable liquids and pressurized gases.",
        },
        body: {
          es: "El Purple K es un químico seco a base de bicarbonato de potasio, considerado uno de los agentes más eficaces contra incendios clase B. Es la elección de la industria química, gasolineras, plantas de gas LPG, aeropuertos y refinerías, donde los derrames de combustible y las fugas de gas a presión exigen una extinción rápida. No conduce la electricidad.",
          en: "Purple K is a potassium bicarbonate dry chemical regarded as one of the most effective agents against Class B fires. It is the choice of chemical plants, fuel stations, LPG facilities, airports and refineries, where fuel spills and pressurized gas leaks demand fast knockdown. Non-conductive.",
        },
        uses: { es: ["Gasolineras y plantas de LPG", "Industria química y petrolera", "Aeropuertos y hangares", "Talleres mecánicos"], en: ["Fuel stations and LPG plants", "Chemical and oil industry", "Airports and hangars", "Auto repair shops"] },
      },
      {
        slug: { es: "extintor-clase-k", en: "class-k-extinguisher" },
        name: { es: "Extintor clase K de químico húmedo", en: "Class K wet chemical extinguisher" },
        tags: ["K", "UL"],
        desc: {
          es: "Diseñado para aceites y grasas de cocina en restaurantes, hoteles y comedores industriales.",
          en: "Designed for cooking oils and fats in restaurants, hotels and industrial cafeterias.",
        },
        body: {
          es: "Los aceites vegetales de las freidoras modernas alcanzan temperaturas que los extintores convencionales no logran controlar. El extintor clase K utiliza una solución de acetato de potasio de bajo pH que forma una capa jabonosa sobre el aceite (saponificación), sofoca el fuego y enfría la superficie para evitar la reignición. Está listado por UL para la clase K y es compatible con los sistemas de supresión pre-ingenierizados de campanas de cocina.",
          en: "The vegetable oils in modern fryers reach temperatures that conventional extinguishers can't control. A Class K extinguisher uses a low-pH potassium acetate solution that forms a soapy layer on the oil (saponification), smothers the fire and cools the surface to prevent reignition. UL listed for Class K and compatible with pre-engineered kitchen hood suppression systems.",
        },
        uses: { es: ["Restaurantes y cadenas de comida", "Hoteles", "Comedores industriales", "Panaderías"], en: ["Restaurants and food chains", "Hotels", "Industrial cafeterias", "Bakeries"] },
      },
      {
        slug: { es: "mangueras-contra-incendio", en: "fire-hoses" },
        name: { es: "Mangueras contra incendio", en: "Fire hoses" },
        tags: ["NST", "1½\"", "2½\""],
        desc: {
          es: "Tramos de 50, 75 y 100 pies, diámetros de 1½\" y 2½\", capa sencilla o doble.",
          en: "50, 75 and 100 ft lengths, 1½\" and 2½\" diameters, single or double jacket.",
        },
        body: {
          es: "Mangueras de 100% poliéster con rosca NST, livianas, flexibles y resistentes a la abrasión, diseñadas para uso industrial y para gabinetes contra incendio en edificios comerciales. Las ofrecemos en capa sencilla o doble capa y en los largos más comunes, con la opción de suministrar el gabinete, la boquilla y el rack de montaje.",
          en: "100% polyester hoses with NST threads — lightweight, flexible and abrasion resistant — designed for industrial use and for hose cabinets in commercial buildings. Available single or double jacket in the most common lengths, with optional cabinet, nozzle and rack.",
        },
        uses: { es: ["Gabinetes contra incendio", "Plantas industriales", "Edificios comerciales", "Brigadas de emergencia"], en: ["Fire hose cabinets", "Industrial plants", "Commercial buildings", "Emergency brigades"] },
      },
      {
        slug: { es: "tuberia-cpvc-rociadores", en: "cpvc-sprinkler-pipe" },
        name: { es: "Tubería CPVC para rociadores", en: "CPVC sprinkler pipe" },
        tags: ["CPVC", "FlameGuard"],
        desc: {
          es: "Tubería y accesorios Spears FlameGuard para sistemas de rociadores residenciales y comerciales ligeros.",
          en: "Spears FlameGuard pipe and fittings for residential and light-hazard sprinkler systems.",
        },
        body: {
          es: "La tubería CPVC FlameGuard de Spears es una alternativa económica a la tubería metálica en sistemas de rociadores. No se corroe, mantiene su capacidad hidráulica con los años, se instala más rápido y con menos mano de obra. Es ideal para apartamentos, hoteles, condominios y edificios de oficinas de riesgo ligero.",
          en: "Spears FlameGuard CPVC pipe is an economical alternative to steel pipe in sprinkler systems. It doesn't corrode, keeps its hydraulic capacity over the years and installs faster with less labor. Ideal for apartments, hotels, condominiums and light-hazard office buildings.",
        },
        uses: { es: ["Apartamentos y condominios", "Hoteles", "Oficinas", "Remodelaciones"], en: ["Apartments and condominiums", "Hotels", "Offices", "Retrofits"] },
      },
    ],
  },
  {
    slug: { es: "sistemas-de-deteccion-y-alarma", en: "detection-and-alarm-systems" },
    name: { es: "Sistemas de detección y alarma", en: "Detection & alarm systems" },
    kicker: { es: "Paneles · Detectores · Supresión", en: "Panels · Detectors · Suppression" },
    image: "/img/alarmas.jpg",
    intro: {
      es: "Detección temprana, alarma y supresión automática para edificios, plantas industriales, hospitales y cuartos técnicos.",
      en: "Early detection, alarm and automatic suppression for buildings, plants, hospitals and technical rooms.",
    },
    body: {
      es: [
        "Un sistema de detección y alarma contra incendios gana los minutos que separan un susto de una pérdida total. Diseñamos e instalamos sistemas direccionables que indican en el panel el punto exacto del evento, para que su brigada o el cuerpo de bomberos respondan directamente donde se necesita.",
        "Trabajamos con paneles de control, detectores de humo y de calor, estaciones manuales, sirenas y luces estroboscópicas, y con sistemas de supresión automática localizada como Firetrace para proteger equipos críticos. Cada proyecto incluye levantamiento en sitio, diseño, instalación, programación, pruebas y capacitación del personal.",
      ],
      en: [
        "A fire detection and alarm system buys the minutes that separate a scare from a total loss. We design and install addressable systems that show the exact location of the event on the panel, so your brigade or the fire department can respond exactly where needed.",
        "We work with control panels, smoke and heat detectors, pull stations, horns and strobes, and localized automatic suppression such as Firetrace to protect critical equipment. Every project includes site survey, design, installation, programming, testing and staff training.",
      ],
    },
    products: [
      {
        slug: { es: "estaciones-manuales", en: "manual-pull-stations" },
        name: { es: "Estaciones manuales de alarma", en: "Manual pull stations" },
        tags: ["Direccionable"],
        desc: { es: "Doble acción con interfaz direccionable para ubicar el punto exacto de activación.", en: "Dual-action with addressable interface to pinpoint the activation point." },
        body: {
          es: "Las estaciones manuales permiten que cualquier persona active la alarma al detectar un incendio. Su diseño de doble acción requiere dos movimientos para activarse, lo que reduce las falsas alarmas por golpes o manipulación accidental, y su interfaz direccionable le indica al panel la ubicación exacta de la estación activada.",
          en: "Pull stations let anyone raise the alarm on discovering a fire. The dual-action design requires two movements to activate, reducing false alarms from bumps or tampering, and the addressable interface tells the panel the exact location of the activated station.",
        },
        uses: { es: ["Salidas de emergencia", "Pasillos y escaleras", "Áreas de producción"], en: ["Emergency exits", "Corridors and stairs", "Production areas"] },
      },
      {
        slug: { es: "panel-de-control-de-alarma", en: "fire-alarm-control-panel" },
        name: { es: "Panel de control de alarma contra incendios", en: "Fire alarm control panel" },
        tags: ["198 dispositivos", "IP"],
        desc: { es: "Hasta 198 dispositivos direccionables con comunicador IP integrado.", en: "Up to 198 addressable devices with built-in IP communicator." },
        body: {
          es: "El cerebro del sistema. Soporta hasta 198 dispositivos direccionables (99 detectores y 99 módulos) e incluye un comunicador de doble tecnología que transmite alarmas, fallas y pérdidas de energía a una estación central y, al mismo tiempo, envía notificaciones por Internet. Ideal para edificios de oficinas, hoteles, centros educativos y naves industriales.",
          en: "The brain of the system. Supports up to 198 addressable devices (99 detectors, 99 modules) with a dual-technology communicator that reports alarms, troubles and power loss to a central station while sending notifications over the Internet. Ideal for office buildings, hotels, schools and industrial facilities.",
        },
        uses: { es: ["Edificios de oficinas", "Hoteles y hospitales", "Centros educativos", "Naves industriales"], en: ["Office buildings", "Hotels and hospitals", "Schools", "Industrial facilities"] },
      },
      {
        slug: { es: "detectores-de-humo-y-calor", en: "smoke-and-heat-detectors" },
        name: { es: "Detectores de humo y calor", en: "Smoke & heat detectors" },
        tags: ["Direccionable"],
        desc: { es: "Detección fotoeléctrica y térmica direccionable que cumple los códigos más estrictos.", en: "Addressable photoelectric and thermal detection meeting the strictest codes." },
        body: {
          es: "Los detectores de humo fotoeléctricos identifican el humo de una amplia variedad de fuentes desde sus primeras etapas, mientras que los detectores de calor responden a temperaturas fijas o aumentos rápidos de temperatura en áreas donde el humo o el polvo son normales, como cocinas y parqueos. Su interfaz direccionable permite localizar cada dispositivo desde el panel.",
          en: "Photoelectric smoke detectors identify smoke from a wide range of sources at its earliest stages, while heat detectors respond to fixed temperatures or rapid rate-of-rise in areas where smoke or dust is normal, such as kitchens and garages. Each device can be located from the panel.",
        },
        uses: { es: ["Oficinas y habitaciones", "Cuartos eléctricos", "Cocinas y parqueos (calor)"], en: ["Offices and rooms", "Electrical rooms", "Kitchens and garages (heat)"] },
      },
      {
        slug: { es: "sistema-firetrace", en: "firetrace-system" },
        name: { es: "Sistema de supresión Firetrace™", en: "Firetrace™ suppression system" },
        tags: ["Automático"],
        desc: { es: "Supresión automática localizada que detecta y extingue el fuego en su origen.", en: "Localized automatic suppression that detects and extinguishes fire at the source." },
        body: {
          es: "Firetrace utiliza un tubo detector sensible al calor que se instala dentro del equipo a proteger. Al contacto con el fuego, el tubo se rompe y libera el agente extintor exactamente donde se originó el incendio, sin necesidad de electricidad. Es especialmente recomendado para racks de servidores, salas de telecomunicaciones, tableros eléctricos, maquinaria CNC y motores de embarcaciones.",
          en: "Firetrace uses a heat-sensitive detection tube installed inside the equipment being protected. When it meets fire, the tube ruptures and releases the agent exactly where the fire started — no electricity required. Especially recommended for server racks, telecom rooms, electrical panels, CNC machinery and marine engines.",
        },
        uses: { es: ["Racks y salas de telecomunicaciones", "Tableros eléctricos", "Maquinaria CNC", "Motores de embarcaciones"], en: ["Racks and telecom rooms", "Electrical panels", "CNC machinery", "Marine engines"] },
      },
    ],
  },
  {
    slug: { es: "senalizacion-e-hidrantes", en: "signage-and-hydrants" },
    name: { es: "Señalización, iluminación e hidrantes", en: "Signage, lighting & hydrants" },
    kicker: { es: "Rótulos · Lámparas · Conexiones", en: "Signs · Lights · Connections" },
    image: "/img/rociador.jpg",
    intro: {
      es: "Rótulos de salida, iluminación de emergencia, hidrantes y tomas siamesas para cumplir la normativa y facilitar la evacuación.",
      en: "Exit signs, emergency lighting, hydrants and fire department connections to meet code and support evacuation.",
    },
    body: {
      es: [
        "Durante una emergencia, la visibilidad y el acceso al agua son decisivos. Los rótulos de salida y las lámparas de emergencia guían a las personas hacia una evacuación segura aunque falle la energía eléctrica, y los hidrantes y tomas siamesas permiten que el cuerpo de bomberos conecte sus equipos y aumente el caudal disponible en el edificio.",
        "Suministramos e instalamos estos elementos con productos listados UL y aprobados FM, y le asesoramos sobre su ubicación para cumplir con las inspecciones de bomberos y aseguradoras.",
      ],
      en: [
        "In an emergency, visibility and access to water are decisive. Exit signs and emergency lights guide people to a safe evacuation even if power fails, while hydrants and fire department connections let firefighters hook up and boost the building's water supply.",
        "We supply and install these items with UL listed and FM approved products, and advise you on placement to pass fire department and insurer inspections.",
      ],
    },
    products: [
      {
        slug: { es: "rotulo-de-salida-led", en: "led-exit-sign" },
        name: { es: "Rótulo de salida LED", en: "LED exit sign" },
        tags: ["UL", "120/277 VAC"],
        desc: { es: "Termoplástico a prueba de llamas, doble cara y luz LED. Listado UL.", en: "Flame-proof thermoplastic, double face, LED light. UL listed." },
        body: {
          es: "Rótulo de SALIDA de fácil instalación fabricado en termoplástico a prueba de llamas, con iluminación LED de bajo consumo, cara frontal adicional para uso doble y kit de montaje en techo, pared o extremo. Listado UL para áreas húmedas y compatible con 120/277 VAC.",
          en: "Easy-install EXIT sign in flame-proof thermoplastic with low-energy LED lighting, an extra face for double-sided use and a ceiling, wall or end mounting kit. UL listed for damp locations, 120/277 VAC.",
        },
        uses: { es: ["Rutas de evacuación", "Salidas de emergencia", "Escaleras"], en: ["Evacuation routes", "Emergency exits", "Stairwells"] },
      },
      {
        slug: { es: "lampara-de-emergencia", en: "emergency-light" },
        name: { es: "Lámpara de emergencia LED", en: "LED emergency light" },
        tags: ["UL", "90 min"],
        desc: { es: "90 minutos de iluminación continua y cobertura de hasta 75 pies.", en: "90 minutes of continuous light and up to 75 ft spacing." },
        body: {
          es: "Lámparas de emergencia con potentes cabezales LED que ofrecen máxima cobertura con espaciamientos de hasta 75 pies y 90 minutos de iluminación constante cuando falla la energía. Carcasa termoplástica resistente a decoloración, golpes y rayones; cabezales ajustables y montaje en techo o pared. Listado UL para áreas húmedas, 120/277 VAC.",
          en: "Emergency lights with powerful LED heads delivering maximum coverage at up to 75 ft spacing and 90 minutes of constant light during power failure. Thermoplastic housing resists fading, impact and scratches; adjustable heads; ceiling or wall mount. UL listed for damp locations, 120/277 VAC.",
        },
        uses: { es: ["Pasillos y escaleras", "Bodegas", "Parqueos"], en: ["Corridors and stairs", "Warehouses", "Parking garages"] },
      },
      {
        slug: { es: "hidrante-de-pared", en: "wall-hydrant" },
        name: { es: "Hidrante de pared", en: "Wall hydrant" },
        tags: ["500 gpm"],
        desc: { es: "Dos salidas NPT de 2½\" y entrada de 4\". Capacidad de 500 gpm.", en: "Two 2½\" NPT outlets and a 4\" inlet. 500 gpm capacity." },
        body: {
          es: "Hidrante de pared para cuando los cuerpos de rescate requieren agua adicional. Cada unidad posee dos salidas NPT macho de 2½\" y una entrada NPT hembra de 4\", con una capacidad de 500 galones por minuto.",
          en: "Wall hydrant for when rescue crews need additional water. Each unit has two 2½\" male NPT outlets and one 4\" female NPT inlet, rated at 500 gallons per minute.",
        },
        uses: { es: ["Edificios comerciales", "Plantas industriales", "Bodegas"], en: ["Commercial buildings", "Industrial plants", "Warehouses"] },
      },
      {
        slug: { es: "toma-siamesa", en: "siamese-connection" },
        name: { es: "Toma siamesa", en: "Siamese fire department connection" },
        tags: ["UL", "FM", "500 gpm"],
        desc: { es: "Permite a bomberos aumentar el agua disponible en el edificio. Listada UL y aprobada FM.", en: "Lets firefighters boost the building's water supply. UL listed and FM approved." },
        body: {
          es: "La toma siamesa permite al cuerpo de bomberos inyectar agua al sistema de rociadores o de mangueras del edificio desde sus camiones. Cada conexión posee dos entradas NST de 2½\" y una salida NPT de 4\", con capacidad de 500 gpm. Listada UL y aprobada FM.",
          en: "The Siamese connection lets the fire department pump water into the building's sprinkler or standpipe system from their trucks. Two 2½\" NST inlets and one 4\" NPT outlet, 500 gpm. UL listed and FM approved.",
        },
        uses: { es: ["Sistemas de rociadores", "Sistemas de mangueras (standpipe)", "Edificios de altura"], en: ["Sprinkler systems", "Standpipe systems", "High-rise buildings"] },
      },
    ],
  },
];

const es = {
  meta: {
    title: "Extintores en Honduras desde 1973 | Centro Samci",
    description:
      "Centro Samci, pioneros en protección contra incendios en Honduras desde 1973. Venta, recarga y mantenimiento de extintores, alarmas, detectores de humo, rociadores y capacitaciones en Tegucigalpa y San Pedro Sula.",
    keywords: [
      "extintores Honduras", "extintores Tegucigalpa", "extintores San Pedro Sula", "venta de extintores", "recarga de extintores",
      "recarga de extintores Tegucigalpa", "mantenimiento de extintores", "equipo contra incendios", "equipo contra incendios Honduras",
      "sistemas contra incendios", "alarma contra incendios", "detectores de humo", "rociadores contra incendios", "extintor ABC",
      "extintor CO2", "extintor clase K", "extintor Purple K", "mangueras contra incendio", "lámparas de emergencia", "rótulos de salida",
      "capacitación uso de extintores", "seguridad industrial Honduras", "NFPA Honduras", "Centrosamci", "Centro Samci", "CCENTROSAMCI",
    ],
  },
  nav: { home: "Inicio", products: "Productos", services: "Servicios", about: "Nosotros", contact: "Contacto", quote: "Cotizar", menu: "Menú", close: "Cerrar" },
  hero: {
    kicker: "Protección contra incendios · Honduras",
    l1: "La prevención",
    l2: "es la mejor arma",
    l3: "contra el fuego",
    sub: "Desde 1973 vendemos, instalamos y mantenemos extintores y sistemas contra incendios para empresas, industrias y hogares en toda Honduras.",
    cta: "Solicitar cotización",
    cta2: "Ver productos",
    scroll: "Desplácese",
  },
  legacy: {
    label: "Pioneros en Honduras",
    title: "Antes que nadie, protegiendo a Honduras del fuego.",
    p: "Centro Samci nació en 1973 como la primera empresa hondureña especializada en protección contra incendios. Cinco décadas después seguimos con el mismo compromiso: seguridad preventiva, personal técnico preparado y soluciones confiables y económicas para cada cliente.",
    facts: [
      { n: "1973", l: "Año de fundación" },
      { n: "50+", l: "Años de experiencia" },
      { n: "2", l: "Sucursales: Tegucigalpa y San Pedro Sula" },
    ],
  },
  home: {
    productsLabel: "Catálogo",
    productsTitle: "Equipo para cada riesgo",
    servicesLabel: "Servicios",
    servicesTitle: "No solo vendemos el equipo. Lo mantenemos listo.",
    classesLabel: "Guía rápida",
    classesTitle: "¿Qué extintor necesito?",
    classesP: "Cada clase de fuego requiere un agente extintor distinto. Usar el equivocado puede ser inútil o incluso peligroso. Esta guía resume lo esencial; nuestro equipo técnico le asesora sin costo.",
    classes: [
      { k: "A", t: "Combustibles sólidos", d: "Madera, papel, cartón, telas, plásticos.", a: "ABC · Agua" },
      { k: "B", t: "Líquidos y gases inflamables", d: "Gasolina, diésel, aceites, solventes, LPG.", a: "ABC · CO2 · Purple K" },
      { k: "C", t: "Equipo eléctrico energizado", d: "Tableros, motores, servidores, electrodomésticos.", a: "CO2 · ABC" },
      { k: "K", t: "Aceites de cocina", d: "Freidoras y planchas de cocinas comerciales.", a: "Químico húmedo clase K" },
    ],
    seoLabel: "Extintores en Honduras",
    seoTitle: "Venta, recarga y mantenimiento de extintores en Tegucigalpa y San Pedro Sula",
    seo: [
      "Un extintor que no ha sido inspeccionado o recargado a tiempo puede fallar justo cuando más se necesita. Por eso en Centro Samci no solo vendemos extintores: ofrecemos un servicio completo de recarga, mantenimiento e inspección periódica para empresas, instituciones, comercios y hogares en Tegucigalpa, Comayagüela, San Pedro Sula y el resto de Honduras.",
      "Durante el mantenimiento revisamos el cilindro, la válvula, el manómetro, la manguera y el sello de seguridad; verificamos el peso y la presión del agente; recargamos cuando es necesario y colocamos una etiqueta con la fecha del servicio. Para cilindros de mayor antigüedad realizamos la prueba hidrostática que exige la normativa.",
      "Atendemos a bancos, universidades, hospitales, hoteles, restaurantes, telecomunicaciones, industria manufacturera, energía y comercio. Si su empresa necesita cumplir con una inspección del Cuerpo de Bomberos, de su aseguradora o de un cliente corporativo, le ayudamos a dejar su equipo en regla y documentado.",
      "Además de extintores, diseñamos e instalamos sistemas de alarma y detección de incendios, rociadores, gabinetes con mangueras, hidrantes, señalización de evacuación e iluminación de emergencia, y capacitamos a su personal para que sepa actuar ante un conato de incendio.",
    ],
    clientsLabel: "Confían en nosotros",
    faqLabel: "Preguntas frecuentes",
    faqTitle: "Lo que más nos preguntan",
    faq: [
      { q: "¿Cada cuánto se debe recargar un extintor?", a: "Se recomienda una inspección visual mensual y un mantenimiento profesional al menos una vez al año. Los extintores de químico seco deben recargarse después de cualquier uso, aunque sea parcial, y cuando el manómetro indique baja presión. Los cilindros requieren prueba hidrostática periódica según su tipo." },
      { q: "¿Qué extintor es mejor para una oficina o un hogar?", a: "Para la mayoría de oficinas, comercios y hogares el extintor ABC de químico seco es la opción más versátil. Si tiene cuartos de servidores o equipo electrónico sensible, complemente con un extintor de CO2. En cocinas comerciales se requiere un extintor clase K." },
      { q: "¿Cuántos extintores necesita mi negocio?", a: "Depende del área, el tipo de riesgo y la distancia de recorrido hasta cada extintor. Como referencia general, en riesgos ordinarios no debería caminar más de 75 pies (unos 23 metros) para alcanzar uno. Le hacemos una evaluación en sitio sin costo para recomendar la cantidad y ubicación correctas." },
      { q: "¿Venden en Tegucigalpa y San Pedro Sula?", a: "Sí. Tenemos sucursales en Tegucigalpa (Colonia 15 de Septiembre) y San Pedro Sula (Colonia Los Laureles), y atendemos proyectos en todo el territorio hondureño." },
      { q: "¿Ofrecen capacitación en el uso de extintores?", a: "Sí. Impartimos capacitaciones teóricas y prácticas sobre prevención de incendios, clases de fuego y uso correcto del extintor, ideales para brigadas de emergencia y para cumplir requisitos de seguridad ocupacional." },
      { q: "¿Instalan sistemas de alarma contra incendios?", a: "Sí. Diseñamos, instalamos, programamos y damos mantenimiento a sistemas de detección y alarma direccionables, así como a sistemas de supresión automática como Firetrace." },
    ],
    ctaTitle: "¿Su extintor está vencido?",
    ctaP: "Agende hoy la recarga y el mantenimiento de su equipo. Respondemos rápido en Tegucigalpa y San Pedro Sula.",
  },
  products: {
    label: "Catálogo",
    title: "Productos contra incendios",
    sub: "Equipo portátil, sistemas fijos y señalización con certificaciones internacionales. Estos son algunos de nuestros principales productos; contáctenos para conocer el catálogo completo, capacidades y precios.",
    see: "Ver detalle",
    ask: "Cotizar este producto",
    uses: "Aplicaciones",
    related: "Otros productos de la categoría",
    back: "Volver a",
  },
  services: {
    label: "Servicios",
    title: "Servicio integral, de la instalación a la emergencia",
    sub: "Un equipo contra incendios solo sirve si funciona el día que se necesita. Nuestro personal técnico le acompaña antes, durante y después de la compra.",
    items: [
      {
        t: "Instalación",
        d: "Instalamos en sitio todos nuestros productos, cumpliendo estrictos estándares de calidad y los requerimientos técnicos de cada proyecto.",
        long: "Desde la colocación de extintores y señalización hasta la instalación completa de sistemas de alarma, detección y rociadores. Realizamos levantamiento en sitio, proponemos la solución adecuada al riesgo y entregamos el sistema probado y documentado.",
        points: ["Levantamiento y diseño", "Sistemas de alarma y detección", "Rociadores y gabinetes", "Señalización e iluminación"],
      },
      {
        t: "Recarga y mantenimiento",
        d: "Mantenimiento periódico para que su equipo esté en óptimas condiciones ante una emergencia.",
        long: "Programas de mantenimiento preventivo para extintores y sistemas: inspección, recarga, cambio de componentes, prueba hidrostática y etiquetado. Llevamos el control de fechas para que usted no tenga que hacerlo.",
        points: ["Recarga de extintores", "Prueba hidrostática", "Inspección y etiquetado", "Mantenimiento de sistemas"],
      },
      {
        t: "Capacitación y asesoría",
        d: "Capacitamos a su personal sobre qué hacer ante un incendio y cómo usar el equipo instalado.",
        long: "Capacitaciones teóricas y prácticas para brigadas y colaboradores, y asesoría técnica para evaluar riesgos, preparar inspecciones de bomberos o aseguradoras y planificar la protección de nuevas instalaciones.",
        points: ["Uso de extintores", "Formación de brigadas", "Evaluación de riesgos", "Preparación de inspecciones"],
      },
    ],
  },
  about: {
    label: "Nosotros",
    title: "Cinco décadas protegiendo Honduras",
    p: [
      "Somos la Compañía Centroamericana de Servicios, Acoplamientos y Materiales Contra Incendios (CCENTROSAMCI, S. de R.L. de C.V.). Desde 1973 asumimos el compromiso de ofrecer seguridad preventiva, con personal dispuesto a trabajar eficientemente y con soluciones confiables y económicas.",
      "Fuimos los pioneros de la protección contra incendios en Honduras y desde entonces somos líderes en la venta y el mantenimiento de toda clase de equipo contra incendio. Bancos, universidades, empresas de telecomunicaciones, energía, industria y comercio confían en nosotros para proteger a su gente y su patrimonio.",
      "Hoy atendemos desde nuestras sucursales en Tegucigalpa y San Pedro Sula, con la misma filosofía con la que empezamos: la prevención es la mejor arma contra el fuego.",
    ],
    values: [
      { t: "Pioneros", d: "La primera empresa hondureña especializada en protección contra incendios." },
      { t: "Equipo certificado", d: "Productos listados UL y aprobados FM de marcas reconocidas internacionalmente." },
      { t: "Cobertura nacional", d: "Sucursales en Tegucigalpa y San Pedro Sula y proyectos en todo el país." },
      { t: "Servicio técnico", d: "Personal capacitado para instalar, mantener y capacitar." },
    ],
  },
  contact: {
    label: "Contacto",
    title: "Hablemos de su protección",
    sub: "Escríbanos o llámenos para cotizaciones, recargas, mantenimiento y asesoría técnica. Atendemos en Tegucigalpa, San Pedro Sula y todo Honduras.",
    phone: "Teléfonos",
    email: "Correo",
    address: "Dirección",
    branch: "Sucursal",
    form: { title: "Solicite una cotización", name: "Nombre", company: "Empresa", phone: "Teléfono", message: "¿En qué le podemos ayudar?", send: "Enviar solicitud", note: "Al enviar se abrirá su aplicación de correo con el mensaje listo." },
  },
  footer: { tagline: "Pioneros en protección contra incendios en Honduras desde 1973.", branches: "Sucursales", links: "Navegación", social: "Redes", rights: "Todos los derechos reservados." },
  notFound: { title: "Página no encontrada", p: "La página que busca no existe o cambió de dirección.", cta: "Ir al inicio" },
};

export type Dict = typeof es;

const en: Dict = {
  meta: {
    title: "Fire extinguishers in Honduras since 1973 | Centro Samci",
    description:
      "Centro Samci, fire protection pioneers in Honduras since 1973. Sales, refill and maintenance of fire extinguishers, alarms, smoke detectors, sprinklers and training in Tegucigalpa and San Pedro Sula.",
    keywords: [
      "fire extinguishers Honduras", "fire extinguisher Tegucigalpa", "fire extinguisher San Pedro Sula", "fire extinguisher refill",
      "fire protection Honduras", "fire alarm systems Honduras", "smoke detectors", "fire sprinklers", "CO2 extinguisher", "Class K extinguisher",
      "Purple K", "fire hose", "emergency lighting", "exit signs", "fire safety training", "Centrosamci", "Centro Samci",
    ],
  },
  nav: { home: "Home", products: "Products", services: "Services", about: "About", contact: "Contact", quote: "Get a quote", menu: "Menu", close: "Close" },
  hero: {
    kicker: "Fire protection · Honduras",
    l1: "Prevention",
    l2: "is the best weapon",
    l3: "against fire",
    sub: "Since 1973 we have sold, installed and maintained fire extinguishers and fire protection systems for businesses, industry and homes across Honduras.",
    cta: "Request a quote",
    cta2: "View products",
    scroll: "Scroll",
  },
  legacy: {
    label: "Pioneers in Honduras",
    title: "First in line, protecting Honduras from fire.",
    p: "Centro Samci was founded in 1973 as the first Honduran company specialized in fire protection. Five decades later our commitment is the same: preventive safety, trained technicians and reliable, cost-effective solutions for every client.",
    facts: [
      { n: "1973", l: "Founded" },
      { n: "50+", l: "Years of experience" },
      { n: "2", l: "Branches: Tegucigalpa and San Pedro Sula" },
    ],
  },
  home: {
    productsLabel: "Catalog",
    productsTitle: "Equipment for every risk",
    servicesLabel: "Services",
    servicesTitle: "We don't just sell the equipment. We keep it ready.",
    classesLabel: "Quick guide",
    classesTitle: "Which extinguisher do I need?",
    classesP: "Each class of fire needs a different extinguishing agent. Using the wrong one can be useless or even dangerous. This guide covers the essentials; our technicians advise you free of charge.",
    classes: [
      { k: "A", t: "Ordinary combustibles", d: "Wood, paper, cardboard, fabric, plastics.", a: "ABC · Water" },
      { k: "B", t: "Flammable liquids & gases", d: "Gasoline, diesel, oils, solvents, LPG.", a: "ABC · CO2 · Purple K" },
      { k: "C", t: "Energized electrical equipment", d: "Panels, motors, servers, appliances.", a: "CO2 · ABC" },
      { k: "K", t: "Cooking oils", d: "Fryers and griddles in commercial kitchens.", a: "Class K wet chemical" },
    ],
    seoLabel: "Fire extinguishers in Honduras",
    seoTitle: "Fire extinguisher sales, refill and maintenance in Tegucigalpa and San Pedro Sula",
    seo: [
      "An extinguisher that hasn't been inspected or refilled on time can fail exactly when it's needed most. That's why Centro Samci doesn't just sell extinguishers: we provide complete refill, maintenance and periodic inspection for companies, institutions, shops and homes in Tegucigalpa, Comayagüela, San Pedro Sula and the rest of Honduras.",
      "During maintenance we check the cylinder, valve, gauge, hose and tamper seal; verify agent weight and pressure; refill when needed and attach a tag with the service date. Older cylinders receive the hydrostatic test required by code.",
      "We serve banks, universities, hospitals, hotels, restaurants, telecoms, manufacturing, energy and retail. If your company needs to pass a fire department, insurer or corporate client inspection, we help you get your equipment compliant and documented.",
      "Beyond extinguishers, we design and install fire alarm and detection systems, sprinklers, hose cabinets, hydrants, evacuation signage and emergency lighting, and train your staff to respond to an incipient fire.",
    ],
    clientsLabel: "Trusted by",
    faqLabel: "FAQ",
    faqTitle: "What people ask us most",
    faq: [
      { q: "How often should a fire extinguisher be refilled?", a: "A monthly visual check and professional maintenance at least once a year are recommended. Dry chemical extinguishers must be refilled after any use, even partial, and whenever the gauge shows low pressure. Cylinders also need periodic hydrostatic testing depending on type." },
      { q: "Which extinguisher is best for an office or home?", a: "For most offices, shops and homes an ABC dry chemical extinguisher is the most versatile choice. Add a CO2 unit for server rooms or sensitive electronics. Commercial kitchens require a Class K extinguisher." },
      { q: "How many extinguishers does my business need?", a: "It depends on floor area, hazard type and travel distance to each unit. As a general reference, in ordinary hazards nobody should walk more than 75 ft (about 23 m) to reach one. We offer a free on-site assessment to recommend the right number and placement." },
      { q: "Do you serve Tegucigalpa and San Pedro Sula?", a: "Yes. We have branches in Tegucigalpa (Colonia 15 de Septiembre) and San Pedro Sula (Colonia Los Laureles), and we handle projects throughout Honduras." },
      { q: "Do you offer fire extinguisher training?", a: "Yes. We run classroom and hands-on training on fire prevention, fire classes and proper extinguisher use — ideal for emergency brigades and occupational safety requirements." },
      { q: "Do you install fire alarm systems?", a: "Yes. We design, install, program and maintain addressable detection and alarm systems, as well as automatic suppression systems such as Firetrace." },
    ],
    ctaTitle: "Is your extinguisher expired?",
    ctaP: "Schedule refill and maintenance today. We respond fast in Tegucigalpa and San Pedro Sula.",
  },
  products: {
    label: "Catalog",
    title: "Fire protection products",
    sub: "Portable equipment, fixed systems and signage with international certifications. These are some of our main products — contact us for the full catalog, sizes and pricing.",
    see: "View details",
    ask: "Quote this product",
    uses: "Applications",
    related: "More in this category",
    back: "Back to",
  },
  services: {
    label: "Services",
    title: "End-to-end service, from installation to emergency",
    sub: "Fire equipment is only useful if it works the day you need it. Our technicians support you before, during and after the purchase.",
    items: [
      {
        t: "Installation",
        d: "On-site installation of all our products, meeting strict quality standards and each project's technical requirements.",
        long: "From placing extinguishers and signage to complete alarm, detection and sprinkler systems. We survey the site, propose the right solution for the risk and hand over a tested, documented system.",
        points: ["Survey and design", "Alarm and detection systems", "Sprinklers and hose cabinets", "Signage and lighting"],
      },
      {
        t: "Refill & maintenance",
        d: "Periodic maintenance so your equipment is in top condition for an emergency.",
        long: "Preventive maintenance programs for extinguishers and systems: inspection, refill, component replacement, hydrostatic testing and tagging. We track the dates so you don't have to.",
        points: ["Extinguisher refill", "Hydrostatic testing", "Inspection and tagging", "System maintenance"],
      },
      {
        t: "Training & advice",
        d: "We train your staff on what to do in a fire and how to use the installed equipment.",
        long: "Classroom and hands-on training for brigades and staff, plus technical advice to assess risks, prepare for fire department or insurer inspections and plan protection for new facilities.",
        points: ["Extinguisher use", "Brigade training", "Risk assessment", "Inspection readiness"],
      },
    ],
  },
  about: {
    label: "About",
    title: "Five decades protecting Honduras",
    p: [
      "We are the Central American Company of Fire Protection Services, Couplings and Materials (CCENTROSAMCI, S. de R.L. de C.V.). Since 1973 we have been committed to preventive safety, with an efficient team and reliable, cost-effective solutions.",
      "We were the pioneers of fire protection in Honduras and have since led the sale and maintenance of all kinds of fire equipment. Banks, universities, telecom, energy, industry and retail companies trust us to protect their people and assets.",
      "Today we serve from our branches in Tegucigalpa and San Pedro Sula, with the same philosophy we started with: prevention is the best weapon against fire.",
    ],
    values: [
      { t: "Pioneers", d: "The first Honduran company specialized in fire protection." },
      { t: "Certified equipment", d: "UL listed and FM approved products from internationally recognized brands." },
      { t: "Nationwide", d: "Branches in Tegucigalpa and San Pedro Sula, projects across the country." },
      { t: "Technical service", d: "Trained staff to install, maintain and train." },
    ],
  },
  contact: {
    label: "Contact",
    title: "Let's talk about your protection",
    sub: "Write or call us for quotes, refills, maintenance and technical advice. We serve Tegucigalpa, San Pedro Sula and all of Honduras.",
    phone: "Phones",
    email: "Email",
    address: "Address",
    branch: "Branch",
    form: { title: "Request a quote", name: "Name", company: "Company", phone: "Phone", message: "How can we help?", send: "Send request", note: "Submitting opens your email app with the message ready." },
  },
  footer: { tagline: "Fire protection pioneers in Honduras since 1973.", branches: "Branches", links: "Navigation", social: "Social", rights: "All rights reserved." },
  notFound: { title: "Page not found", p: "The page you're looking for doesn't exist or has moved.", cta: "Go home" },
};

export const dictionaries: Record<Locale, Dict> = { es, en };
export const getDict = (l: Locale) => dictionaries[l];

export const branches = [
  {
    id: "tegucigalpa",
    city: "Tegucigalpa",
    street: "Colonia 15 de Septiembre, 2da Ave., Bloque B, No. 5805",
    postal: "11101",
    region: "Francisco Morazán",
    phones: ["+504 2234-9572", "+504 2233-4553"],
    email: "ventas@centrosamci.com",
  },
  {
    id: "san-pedro-sula",
    city: "San Pedro Sula",
    street: "Colonia Los Laureles, Bloque B, 1era Calle, No. 1100",
    postal: "",
    region: "Cortés",
    phones: ["+504 2566-0272", "+504 2516-2516"],
    email: "centrosamci_sps@centrosamci.hn",
  },
];

export const social = { facebook: "https://es-la.facebook.com/centrosamci", instagram: "https://instagram.com/ccentrosamci" };

export const clientLogos = [
  "claro.png", "chevron.png", "huawei.png", "puma.png", "unitec.png", "ceutec.jpg", "ba.png", "uno.jpg", "aa.png", "adh.png",
  "cafe.jpg", "car.png", "eh.jpg", "gq.png", "hf.jpg", "hm.png", "intur.jpg", "latri.png", "map.png", "occi.png", "popa.png",
  "roble.jpg", "tvc.jpg", "ua.png",
];
