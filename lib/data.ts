import type { BlogPost, CategoryId, Finish, Product } from "./types";

const desk = (file: string) =>
  `https://symart.com.mx/wp-content/uploads/2026/02/${file}`;
const nov = (file: string) =>
  `https://symart.com.mx/wp-content/uploads/2025/11/${file}`;
const oct = (file: string) =>
  `https://symart.com.mx/wp-content/uploads/2025/10/${file}`;
const sep = (file: string) =>
  `https://symart.com.mx/wp-content/uploads/2025/09/${file}`;

const FINISH: Record<string, { name: string; hex: string }> = {
  M: { name: "Acabado M", hex: "#C6A46A" },
  Q: { name: "Acabado Q", hex: "#8D5A2B" },
  U: { name: "Acabado U", hex: "#4E3426" },
  MD: { name: "Acabado MD", hex: "#E4D2B8" },
};

function finishes(
  items: { id: keyof typeof FINISH; file: string }[],
): Finish[] {
  return items.map((item) => ({
    id: item.id,
    name: FINISH[item.id].name,
    hex: FINISH[item.id].hex,
    image: desk(item.file),
  }));
}

const deskCopy =
  "Escritorio fabricado en Aguascalientes para uso intensivo. Cubierta de melamina de alto tránsito, estructura metálica reforzada y canalización para cables. El color del catálogo no cambia el precio.";

const deskHighlights = [
  "Fabricación propia en Aguascalientes",
  "Melamina de alto tránsito con certificación antiviral y antibacterial",
  "Canalización oculta de cables",
  "Garantía de 5 años contra defectos de fabricación",
  "Instalación incluida en Aguascalientes",
];

function deskProduct(
  partial: Omit<
    Product,
    "materials" | "description" | "highlights" | "images" | "finishes"
  > & {
    finishFiles: { id: keyof typeof FINISH; file: string }[];
    description?: string;
  },
): Product {
  const { finishFiles, description, ...rest } = partial;
  const swatches = finishes(finishFiles);
  return {
    ...rest,
    materials: ["Melamina", "Metal"],
    finishes: swatches,
    images: swatches.map((item) => item.image),
    description: description ?? deskCopy,
    highlights: deskHighlights,
  };
}

export const company = {
  name: "Symart",
  tagline: "Muebles de oficina a tu medida",
  phone: "+52 449 915 0678",
  phoneHref: "tel:+524499150678",
  whatsapp: "https://wa.me/524499150678",
  email: "ventas@symart.com.mx",
  instagram: "https://www.instagram.com/symartmuebles/",
  instagramHandle: "@symartmuebles",
  city: "Aguascalientes, México",
  years: 21,
  warranty: "5 años",
  leadTime: "5 a 15 días hábiles",
  logo: "/images/logo-symart.png",
  logoMark: oct("Symart-logo-fo.png"),
};

export const categories: {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
}[] = [
  {
    id: "escritorios",
    name: "Escritorios",
    blurb: "Rectos, en L y ejecutivos",
    image: desk("OG-150M-SC-150cm.webp"),
  },
  {
    id: "sillas",
    name: "Sillas de oficina",
    blurb: "Ejecutivas, operativas e industriales",
    image: nov("sillas-ergonomicas.webp"),
  },
  {
    id: "estaciones",
    name: "Estaciones de trabajo",
    blurb: "Módulos para equipos",
    image: nov("muebles-Estaciones-de-trabajo.webp"),
  },
  {
    id: "mesas",
    name: "Mesas",
    blurb: "Reunión, espera y restaurante",
    image: nov("mesas-para-restaurantes-y-oficinas.webp"),
  },
  {
    id: "almacenamiento",
    name: "Libreros y archiveros",
    blurb: "Almacenamiento de alto uso",
    image: sep("muebles-de-almacenamiento-symart.webp"),
  },
  {
    id: "recepciones",
    name: "Recepción y salas de espera",
    blurb: "La primera impresión del espacio",
    image: nov("muebles-de-recepcion-y-salas-de-espera.webp"),
  },
];

export const products: Product[] = [
  deskProduct({
    slug: "og-150-sc",
    sku: "OG-150-SC",
    name: "Escritorio recto sin cajones 150 cm",
    category: "escritorios",
    price: 6890,
    compareAt: 7490,
    widthCm: 150,
    drawers: 0,
    inStock: true,
    rating: 4.9,
    reviews: 28,
    badge: "Más pedido",
    bestseller: true,
    featured: true,
    sale: true,
    finishFiles: [
      { id: "M", file: "OG-150M-SC-150cm.webp" },
      { id: "Q", file: "OG-150Q-SC-150cm.webp" },
      { id: "U", file: "OG-150U-SC-150cm.webp" },
    ],
  }),
  deskProduct({
    slug: "og-120-sc",
    sku: "OG-120-SC",
    name: "Escritorio recto sin cajones 120 cm",
    category: "escritorios",
    price: 5490,
    widthCm: 120,
    drawers: 0,
    inStock: true,
    rating: 4.7,
    reviews: 16,
    featured: true,
    finishFiles: [
      { id: "M", file: "OG-120M-SC-120cm.webp" },
      { id: "Q", file: "OG-120Q-SC-120cm.webp" },
      { id: "U", file: "OG-120U-SC-120cm.webp" },
    ],
  }),
  deskProduct({
    slug: "og-150-1c",
    sku: "OG-150M-1C",
    name: "Escritorio recto con un cajón 150 cm",
    category: "escritorios",
    price: 7490,
    widthCm: 150,
    drawers: 1,
    inStock: true,
    rating: 4.8,
    reviews: 11,
    finishFiles: [{ id: "M", file: "OG-150M-1C-150cm.webp" }],
  }),
  deskProduct({
    slug: "og-120-1c",
    sku: "OG-120M-1C",
    name: "Escritorio recto con un cajón 120 cm",
    category: "escritorios",
    price: 6290,
    widthCm: 120,
    drawers: 1,
    inStock: false,
    rating: 4.6,
    reviews: 7,
    finishFiles: [{ id: "M", file: "OG-120M-1C-120cm.webp" }],
  }),
  deskProduct({
    slug: "og-180-2c",
    sku: "OG-180-2C",
    name: "Escritorio recto con 2 cajones 180 cm",
    category: "escritorios",
    price: 9890,
    compareAt: 10990,
    widthCm: 180,
    drawers: 2,
    inStock: true,
    rating: 4.9,
    reviews: 22,
    badge: "-10%",
    bestseller: true,
    featured: true,
    sale: true,
    finishFiles: [
      { id: "M", file: "OG-180M-2C-180cm.webp" },
      { id: "Q", file: "OG-180Q-2C-180cm.webp" },
      { id: "U", file: "OG-180U-2C-180cm.webp" },
    ],
  }),
  deskProduct({
    slug: "og-150-2c",
    sku: "OG-150-2C",
    name: "Escritorio recto con 2 cajones 150 cm",
    category: "escritorios",
    price: 8490,
    widthCm: 150,
    drawers: 2,
    inStock: true,
    rating: 4.8,
    reviews: 19,
    featured: true,
    finishFiles: [
      { id: "M", file: "OG-150M-2C-150cm.webp" },
      { id: "Q", file: "OG-150Q-2C-150cm.webp" },
      { id: "U", file: "OG-150U-2C-150cm.webp" },
    ],
  }),
  deskProduct({
    slug: "og-120-2c",
    sku: "OG-120-2C",
    name: "Escritorio recto con 2 cajones 120 cm",
    category: "escritorios",
    price: 7290,
    widthCm: 120,
    drawers: 2,
    inStock: true,
    rating: 4.7,
    reviews: 9,
    finishFiles: [
      { id: "M", file: "OG-120M-2C-120cm.webp" },
      { id: "Q", file: "OG-120Q-2C-120cm.webp" },
      { id: "U", file: "OG-120U-2C-120cm-1.webp" },
    ],
  }),
  deskProduct({
    slug: "og-180-4c",
    sku: "OG-180MD-4C",
    name: "Escritorio recto con 4 cajones 180 cm",
    category: "escritorios",
    price: 11490,
    widthCm: 180,
    drawers: 4,
    inStock: true,
    rating: 4.8,
    reviews: 8,
    finishFiles: [{ id: "MD", file: "OG-180MD-4C-180cm.webp" }],
  }),
  deskProduct({
    slug: "og-180-3c",
    sku: "OG-180",
    name: "Escritorio recto con 3 cajones 180 cm",
    category: "escritorios",
    price: 11990,
    widthCm: 180,
    drawers: 3,
    inStock: true,
    rating: 4.9,
    reviews: 14,
    bestseller: true,
    finishFiles: [
      { id: "M", file: "OG-180M-180cm.webp" },
      { id: "Q", file: "OG-180Q-180cm.webp" },
      { id: "U", file: "OG-180U-180cm.webp" },
      { id: "MD", file: "OG-180MD-180cm.webp" },
    ],
  }),
  deskProduct({
    slug: "og-150-3c",
    sku: "OG-150",
    name: "Escritorio recto con 3 cajones 150 cm",
    category: "escritorios",
    price: 9990,
    widthCm: 150,
    drawers: 3,
    inStock: true,
    rating: 4.8,
    reviews: 12,
    finishFiles: [
      { id: "M", file: "OG-150M-150cm.webp" },
      { id: "Q", file: "OG-150Q-150cm.webp" },
      { id: "U", file: "OG-150U-150cm.webp" },
    ],
  }),
  deskProduct({
    slug: "og-120-3c",
    sku: "OG-120",
    name: "Escritorio recto con 3 cajones 120 cm",
    category: "escritorios",
    price: 8690,
    widthCm: 120,
    drawers: 3,
    inStock: true,
    rating: 4.6,
    reviews: 6,
    finishFiles: [
      { id: "M", file: "OG-120M-120cm.webp" },
      { id: "Q", file: "OG-120Q-120cm.webp" },
      { id: "U", file: "OG-120U-120cm.webp" },
    ],
  }),
  deskProduct({
    slug: "ogl-180-2c",
    sku: "OGL-180-2C",
    name: "Escritorio en L con 2 cajones 180 cm",
    category: "escritorios",
    price: 14290,
    compareAt: 15490,
    widthCm: 180,
    drawers: 2,
    inStock: true,
    rating: 5,
    reviews: 17,
    badge: "Proyecto",
    bestseller: true,
    featured: true,
    sale: true,
    finishFiles: [
      { id: "M", file: "OGL-180M-2C-180cm.webp" },
      { id: "Q", file: "OGL-180Q-2C-180cm.webp" },
      { id: "U", file: "OGL-180U-2C-180cm.webp" },
      { id: "MD", file: "OGL-180MD-2C-180cm.webp" },
    ],
  }),
  deskProduct({
    slug: "ogl-150-2c",
    sku: "OGL-150-2C",
    name: "Escritorio en L con 2 cajones 150 cm",
    category: "escritorios",
    price: 12490,
    widthCm: 150,
    drawers: 2,
    inStock: true,
    rating: 4.8,
    reviews: 10,
    finishFiles: [
      { id: "M", file: "OGL-150M-2C-150cm.webp" },
      { id: "Q", file: "OGL-150Q-2C-150cm.webp" },
      { id: "U", file: "escritorio-en-l-OGL-150U-2C-150cm.webp" },
    ],
  }),
  deskProduct({
    slug: "ogl-180-3c",
    sku: "OGL-180",
    name: "Escritorio en L con 3 cajones 180 cm",
    category: "escritorios",
    price: 15990,
    widthCm: 180,
    drawers: 3,
    inStock: true,
    rating: 4.9,
    reviews: 13,
    featured: true,
    finishFiles: [
      { id: "M", file: "escritorio-en-l-OGL-180M-180cm.webp" },
      { id: "Q", file: "escritorio-en-l-OGL-180Q-180cm.webp" },
      { id: "U", file: "escritorio-en-l-OGL-180U-180cm.webp" },
      { id: "MD", file: "escritorio-en-l-OGL-180MD-180cm.webp" },
    ],
  }),
  deskProduct({
    slug: "ocg-180-2c",
    sku: "OCG-180-2C",
    name: "Escritorio ejecutivo con 2 cajones 180 cm",
    category: "escritorios",
    price: 18990,
    widthCm: 180,
    drawers: 2,
    inStock: true,
    rating: 5,
    reviews: 21,
    badge: "Ejecutivo",
    bestseller: true,
    featured: true,
    description:
      "Escritorio ejecutivo de 180 cm para dirección y gerencia. Cubierta amplia, dos cajones y acabados del catálogo Symart sin variación de precio.",
    finishFiles: [
      { id: "M", file: "Escritorio-ejecutivo-OCG-180M-2C-180cm.webp" },
      { id: "Q", file: "OCG-180Q-2C-180cm.webp" },
      { id: "U", file: "Escritorio-ejecutivo-OCG-180U-2C-180cm.webp" },
      { id: "MD", file: "OCG-180MD-S-2C-180cm.webp" },
    ],
  }),
  deskProduct({
    slug: "oce-180-2c",
    sku: "OCE-180-2C",
    name: "Escritorio ejecutivo OCE con 2 cajones 180 cm",
    category: "escritorios",
    price: 18490,
    widthCm: 180,
    drawers: 2,
    inStock: true,
    rating: 4.8,
    reviews: 9,
    finishFiles: [
      { id: "M", file: "Escritorio-ejecutivo-OCE-180M-2C-180cm.webp" },
      { id: "Q", file: "Escritorio-ejecutivo-OCE-180Q-2C-180cm.webp" },
      { id: "U", file: "Escritorio-ejecutivo-OCE-180U-2C-180cm.webp" },
    ],
  }),
  deskProduct({
    slug: "ocg-160-3c",
    sku: "OCG-160",
    name: "Escritorio ejecutivo con 3 cajones 160 cm",
    category: "escritorios",
    price: 19890,
    widthCm: 160,
    drawers: 3,
    inStock: true,
    rating: 4.9,
    reviews: 11,
    finishFiles: [
      { id: "M", file: "Escritorio-ejecutivo-OCG-160M-160cm.webp" },
      { id: "Q", file: "Escritorio-ejecutivo-OCG-160Q-160cm.webp" },
      { id: "U", file: "Escritorio-ejecutivo-OCG-160U-160cm.webp" },
      { id: "MD", file: "Escritorio-ejecutivo-OCG-160MD-S-160cm.webp" },
    ],
  }),
  {
    slug: "silla-ejecutiva",
    sku: "SIL-EJEC",
    name: "Silla ejecutiva ergonómica",
    category: "sillas",
    price: 6890,
    compareAt: 7590,
    images: [nov("sillas-ergonomicas.webp"), nov("sillas-para-oficina-2.webp")],
    finishes: [
      {
        id: "negra",
        name: "Negra",
        hex: "#1C1C1C",
        image: nov("sillas-ergonomicas.webp"),
      },
      {
        id: "gris",
        name: "Gris",
        hex: "#8E8E8E",
        image: nov("sillas-para-oficina-2.webp"),
      },
    ],
    materials: ["Tela", "Malla", "Metal"],
    inStock: true,
    rating: 4.9,
    reviews: 34,
    badge: "Ley Silla",
    bestseller: true,
    featured: true,
    sale: true,
    description:
      "Silla ejecutiva para jornadas largas. Respaldo ergonómico, mecanismo ajustable y materiales pensados para alto uso. Symart cubre pistón, mecanismo y una llanta rota dentro de la garantía de 5 años.",
    highlights: [
      "Línea ejecutiva del catálogo Symart",
      "Pensada para cumplir con la Ley Silla",
      "Garantía de 5 años: pistón, mecanismo y una llanta rota",
      "El color del tapiz no cambia el precio",
    ],
  },
  {
    slug: "silla-operativa",
    sku: "SIL-OPE",
    name: "Silla secretarial y operativa",
    category: "sillas",
    price: 3290,
    images: [nov("sillas-operativas.webp"), nov("sillas-para-oficina-2.webp")],
    finishes: [
      {
        id: "negra",
        name: "Negra",
        hex: "#1C1C1C",
        image: nov("sillas-operativas.webp"),
      },
    ],
    materials: ["Tela", "Malla"],
    inStock: true,
    rating: 4.7,
    reviews: 26,
    bestseller: true,
    description:
      "Silla operativa para estaciones de trabajo, mostradores y áreas administrativas de uso diario. Estructura lista para alto tráfico.",
    highlights: [
      "Línea secretarial y operativa",
      "Uso intensivo en oficina",
      "Garantía de 5 años en pistón, mecanismo y una llanta",
    ],
  },
  {
    slug: "silla-industrial",
    sku: "SIL-IND",
    name: "Silla industrial",
    category: "sillas",
    price: 2490,
    images: [
      nov("sillas-resistentes-para-oficina.webp"),
      nov("variedad-de-sillas.webp"),
    ],
    finishes: [
      {
        id: "negra",
        name: "Negra",
        hex: "#222222",
        image: nov("sillas-resistentes-para-oficina.webp"),
      },
    ],
    materials: ["Polipropileno", "Metal"],
    inStock: false,
    rating: 4.6,
    reviews: 8,
    description:
      "Silla industrial para plantas, talleres y áreas de alto desgaste. Pensada para resistir uso continuo sin perder estabilidad.",
    highlights: [
      "Línea industrial",
      "Materiales de alto tránsito",
      "Fabricación para espacios de trabajo exigentes",
    ],
  },
  {
    slug: "silla-visitas",
    sku: "SIL-VIS",
    name: "Silla para visitas y comedor",
    category: "sillas",
    price: 1890,
    images: [nov("variedad-de-sillas.webp"), nov("sillas-para-exteriores.webp")],
    finishes: [
      {
        id: "negra",
        name: "Negra",
        hex: "#2B2B2B",
        image: nov("variedad-de-sillas.webp"),
      },
      {
        id: "madera",
        name: "Madera",
        hex: "#A56B3C",
        image: nov("sillas-para-exteriores.webp"),
      },
    ],
    materials: ["Tela", "Madera", "Metal"],
    inStock: true,
    rating: 4.5,
    reviews: 15,
    description:
      "Silla de visita y comedor para salas de espera, comedores ejecutivos y áreas de atención. Disponible en los tapices del catálogo.",
    highlights: [
      "Visitas, comedor y espera",
      "Fácil mantenimiento",
      "El color no modifica el precio",
    ],
  },
  {
    slug: "estacion-modular",
    sku: "EST-MOD",
    name: "Estación de trabajo modular",
    category: "estaciones",
    price: 28600,
    images: [
      nov("muebles-Estaciones-de-trabajo.webp"),
      nov("Estaciones-de-trabajo-para-oficinas.webp"),
      nov("Mobiliario-y-estaciones-de-trabajo-oficinas.webp"),
    ],
    finishes: [
      {
        id: "M",
        name: "Acabado M",
        hex: "#C6A46A",
        image: nov("muebles-Estaciones-de-trabajo.webp"),
      },
      {
        id: "U",
        name: "Acabado U",
        hex: "#4E3426",
        image: nov("Estaciones-de-trabajo-para-oficinas.webp"),
      },
    ],
    materials: ["Melamina", "Metal"],
    inStock: true,
    rating: 5,
    reviews: 18,
    badge: "A medida",
    bestseller: true,
    featured: true,
    description:
      "Estación modular para equipos que comparten un mismo piso. Se diseña según el número de puestos, el flujo de trabajo y la electrificación del espacio.",
    highlights: [
      "Configuración a la medida del área",
      "Electrificación y paso de cables",
      "Diseño, fabricación e instalación",
      "Lista entre 5 y 15 días hábiles, según el proyecto",
    ],
  },
  {
    slug: "estacion-doble",
    sku: "EST-2P",
    name: "Estación doble de trabajo",
    category: "estaciones",
    price: 16400,
    images: [
      nov("Mobiliario-estaciones-de-trabajo.webp"),
      nov("Muebles-para-Estaciones-de-trabajo.webp"),
    ],
    finishes: [
      {
        id: "M",
        name: "Acabado M",
        hex: "#C6A46A",
        image: nov("Mobiliario-estaciones-de-trabajo.webp"),
      },
    ],
    materials: ["Melamina", "Metal"],
    inStock: true,
    rating: 4.8,
    reviews: 9,
    description:
      "Estación para dos puestos enfrentados o en línea. Aprovecha el metro cuadrado sin sacrificar superficie de trabajo.",
    highlights: [
      "Dos puestos de trabajo",
      "Pantallas y almacenaje opcionales",
      "Fabricada en planta Symart",
    ],
  },
  {
    slug: "mesa-reunion",
    sku: "MES-REU",
    name: "Mesa de reunión",
    category: "mesas",
    price: 12800,
    images: [
      nov("mesas-para-restaurantes-y-oficinas.webp"),
      nov("mesas-para-salas-de-espera.webp"),
    ],
    finishes: [
      {
        id: "M",
        name: "Acabado M",
        hex: "#C6A46A",
        image: nov("mesas-para-restaurantes-y-oficinas.webp"),
      },
      {
        id: "U",
        name: "Acabado U",
        hex: "#4E3426",
        image: nov("mesas-para-salas-de-espera.webp"),
      },
    ],
    materials: ["Melamina", "Metal"],
    inStock: true,
    rating: 4.8,
    reviews: 12,
    description:
      "Mesa de reunión para salas de juntas y espacios de colaboración. Se dimensiona al área y al número de personas.",
    highlights: [
      "Medida según la sala",
      "Estructura para uso diario",
      "Acabados del catálogo sin cambio de precio",
    ],
  },
  {
    slug: "mesa-restaurante",
    sku: "MES-RES",
    name: "Mesa para restaurante y cafetería",
    category: "mesas",
    price: 6400,
    compareAt: 7200,
    images: [
      nov("mesas-para-restaurantes.webp"),
      nov("mesas-para-restaurantes-Aguascalientes.webp"),
    ],
    finishes: [
      {
        id: "M",
        name: "Acabado M",
        hex: "#C6A46A",
        image: nov("mesas-para-restaurantes.webp"),
      },
      {
        id: "Q",
        name: "Acabado Q",
        hex: "#8D5A2B",
        image: nov("mesas-para-restaurantes-Aguascalientes.webp"),
      },
    ],
    materials: ["Melamina", "Madera", "Metal"],
    inStock: true,
    rating: 4.7,
    reviews: 14,
    sale: true,
    badge: "-11%",
    description:
      "Mesa para restaurantes y cafeterías que necesitan mobiliario resistente, fácil de limpiar y con presencia.",
    highlights: [
      "Alto tráfico de comedor",
      "Fácil mantenimiento",
      "Fabricación local",
    ],
  },
  {
    slug: "archivero",
    sku: "ALM-ARC",
    name: "Archivero de oficina",
    category: "almacenamiento",
    price: 4590,
    images: [
      sep("muebles-de-almacenamiento-symart.webp"),
      nov("muebles-de-oficina-para-almacenamiento.webp"),
    ],
    finishes: [
      {
        id: "M",
        name: "Acabado M",
        hex: "#C6A46A",
        image: sep("muebles-de-almacenamiento-symart.webp"),
      },
      {
        id: "U",
        name: "Acabado U",
        hex: "#4E3426",
        image: nov("muebles-de-oficina-para-almacenamiento.webp"),
      },
    ],
    materials: ["Melamina", "Metal"],
    inStock: true,
    rating: 4.6,
    reviews: 11,
    description:
      "Archivero para documentos y archivo activo. Correderas y jaladeras cubiertas por la garantía de fabricación.",
    highlights: [
      "Para archivo de uso diario",
      "Garantía en correderas, vistas y jaladeras",
      "Se integra a escritorios y estaciones",
    ],
  },
  {
    slug: "librero",
    sku: "ALM-LIB",
    name: "Librero y credenza",
    category: "almacenamiento",
    price: 5290,
    images: [
      nov("muebles-de-oficina-almacenamiento.webp"),
      nov("muebles-para-almacenamiento.webp"),
    ],
    finishes: [
      {
        id: "M",
        name: "Acabado M",
        hex: "#C6A46A",
        image: nov("muebles-de-oficina-almacenamiento.webp"),
      },
    ],
    materials: ["Melamina"],
    inStock: true,
    rating: 4.7,
    reviews: 7,
    description:
      "Librero y credenza para oficinas que necesitan guardar, exhibir y mantener el área despejada.",
    highlights: [
      "Almacenamiento vertical",
      "Acabado de catálogo",
      "Se fabrica a la medida del muro",
    ],
  },
  {
    slug: "recepcion",
    sku: "REC-01",
    name: "Mueble de recepción",
    category: "recepciones",
    price: 24800,
    images: [
      nov("muebles-de-recepcion-y-salas-de-espera.webp"),
      nov("muebles-para-recepecion.webp"),
      nov("Muebles-para-recepcion-y-salas-de-espera.webp"),
    ],
    finishes: [
      {
        id: "M",
        name: "Acabado M",
        hex: "#C6A46A",
        image: nov("muebles-de-recepcion-y-salas-de-espera.webp"),
      },
      {
        id: "U",
        name: "Acabado U",
        hex: "#4E3426",
        image: nov("muebles-para-recepecion.webp"),
      },
    ],
    materials: ["Melamina", "Metal"],
    inStock: true,
    rating: 5,
    reviews: 9,
    badge: "A medida",
    bestseller: true,
    description:
      "Recepción fabricada al frente del acceso: altura de atención, paso de cables y almacenaje del lado operativo.",
    highlights: [
      "Diseño según el lobby",
      "Frente de atención y zona de trabajo",
      "Instalación incluida en Aguascalientes",
    ],
  },
  {
    slug: "sala-espera",
    sku: "REC-ESP",
    name: "Mobiliario para sala de espera",
    category: "recepciones",
    price: 9800,
    images: [
      nov("muebles-para-salas-de-espera.webp"),
      nov("sillas-para-salones-de-espera.webp"),
    ],
    finishes: [
      {
        id: "tela",
        name: "Tela",
        hex: "#6E7C86",
        image: nov("muebles-para-salas-de-espera.webp"),
      },
      {
        id: "negra",
        name: "Negra",
        hex: "#222",
        image: nov("sillas-para-salones-de-espera.webp"),
      },
    ],
    materials: ["Tela", "Metal", "Melamina"],
    inStock: true,
    rating: 4.7,
    reviews: 8,
    description:
      "Conjunto para salas de espera de consultorios, clínicas, escuelas y corporativos. Resistente al uso de visitantes.",
    highlights: [
      "Consultorios, clínicas y corporativos",
      "Fácil de limpiar",
      "Se cotiza por el número de lugares",
    ],
  },
];

export const clients = [
  { name: "Universidad Autónoma de Aguascalientes", logo: nov("Logo-Universidad-Autonoma-de-Aguascalientes.webp") },
  { name: "World Emblem", logo: nov("Logo-World-Emblem.webp") },
  { name: "Orotex", logo: nov("Logo-Orotex.webp") },
  { name: "Universidad Panamericana", logo: nov("Logo-Universidad-Panamericana.webp") },
  { name: "MMPM", logo: nov("Logo-MMPM.webp") },
];

export const heroSlides = [
  {
    image: oct("fabrica-de-muebles-de-oficina-1.webp"),
    kicker: "Aguascalientes",
    title: "Oficina a tu medida",
    text: "Escritorios, sillas y estaciones de trabajo fabricados para durar.",
    href: "/tienda",
    cta: "Ver la tienda",
  },
  {
    image: nov("Mobiliario-y-estaciones-de-trabajo-oficinas.webp"),
    kicker: "Estaciones",
    title: "Estaciones",
    text: "Módulos para equipos, con cubierta de melamina y cableado oculto.",
    href: "/tienda?categoria=estaciones",
    cta: "Ver estaciones",
  },
  {
    image: nov("muebles-para-salas-de-espera.webp"),
    kicker: "Salas",
    title: "Salas de espera",
    text: "Recepción y espera con la misma fabricación que el resto de la oficina.",
    href: "/tienda?categoria=recepciones",
    cta: "Ver salas",
  },
];

export const spaces = [
  {
    title: "Empresas y corporativos",
    image: oct("fabrica-de-muebles-de-oficina-1.webp"),
    href: "/tienda?categoria=escritorios",
  },
  {
    title: "Coworking y estaciones",
    image: nov("Mobiliario-y-estaciones-de-trabajo-oficinas.webp"),
    href: "/tienda?categoria=estaciones",
  },
  {
    title: "Consultorios y clínicas",
    image: nov("muebles-para-salas-de-espera.webp"),
    href: "/tienda?categoria=recepciones",
  },
  {
    title: "Restaurantes y cafeterías",
    image: nov("mesas-para-restaurantes.webp"),
    href: "/tienda?categoria=mesas",
  },
  {
    title: "Colegios y universidades",
    image: oct("fabrica-de-muebles-de-oficina-1.webp"),
    href: "/tienda",
  },
  {
    title: "Parques industriales",
    image: nov("sillas-resistentes-para-oficina.webp"),
    href: "/tienda?categoria=sillas",
  },
];

export const reasons = [
  {
    title: "Fabricación propia",
    text: "Diseñamos y fabricamos en casa para controlar calidad, tiempos y acabados. Cada mueble se adapta al espacio y a las necesidades reales.",
  },
  {
    title: "Materiales de alta resistencia",
    text: "Materiales pensados para uso intensivo y alto tráfico diario. Más durabilidad, mejor apariencia y menor desgaste con el tiempo.",
  },
  {
    title: "Diseño e instalación",
    text: "Acompañamos de principio a fin: diseño, fabricación e instalación. El espacio se entrega listo para usarse.",
  },
];

export const faqs = [
  {
    q: "¿Los muebles tienen garantía?",
    a: "Todos nuestros muebles cuentan con 5 años de garantía contra defectos de fabricación. En sillas cubre pistón que no funcione, mecanismo descompuesto y una llanta rota. En muebles cubre una pija que atore la corredera, una vista mal colocada y jaladeras sin un tornillo.",
  },
  {
    q: "¿Cotizan sin planos?",
    a: "Sí. Se realiza una visita para conocer las instalaciones y las necesidades del espacio.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del tamaño. De manera general se tienen listos entre 5 y 15 días hábiles.",
  },
  {
    q: "¿Si elijo otro color del catálogo, cambia el precio?",
    a: "No. El precio no varía por el color que elijas dentro del catálogo.",
  },
];

export const posts: BlogPost[] = [
  {
    slug: "como-elegir-mobiliario-de-oficina",
    title: "Cómo elegir mobiliario de oficina para uso intensivo",
    date: "12 de marzo de 2026",
    category: "Guías",
    excerpt:
      "Qué revisar en escritorios, estaciones y sillas antes de equipar un piso que se usa todos los días.",
    image: nov("Mobiliario-y-estaciones-de-trabajo-oficinas.webp"),
    body: [
      "Un piso de oficinas no se equipa igual que un escritorio de casa. El mueble va a recibir jornadas completas, cambios de puesto y limpieza constante.",
      "En escritorios conviene revisar la cubierta de melamina de alto tránsito, la estructura metálica y si el cableado puede ir oculto. En estaciones, el módulo tiene que seguir el flujo real del equipo, no al revés.",
      "Symart fabrica en Aguascalientes y entrega el espacio instalado. Si todavía no hay planos, se puede cotizar con una visita al sitio.",
    ],
  },
  {
    slug: "garantia-de-5-anos",
    title: "Qué cubre la garantía de 5 años",
    date: "4 de febrero de 2026",
    category: "Servicio",
    excerpt:
      "Pistón, mecanismo, correderas y jaladeras: el detalle de la garantía contra defectos de fabricación.",
    image: nov("resistencia-muebles-de-oficina-duraderos.webp"),
    body: [
      "La garantía Symart es de 5 años contra defectos de fabricación.",
      "En sillas cubre un pistón que no funcione, un mecanismo descompuesto y una llanta rota. En muebles cubre una pija que atore la corredera, una vista mal colocada y jaladeras a las que les falte un tornillo.",
      "El plazo de fabricación de un proyecto, en general, va de 5 a 15 días hábiles según el volumen.",
    ],
  },
  {
    slug: "sillas-y-ley-silla",
    title: "Sillas de oficina y la Ley Silla",
    date: "18 de enero de 2026",
    category: "Sillas",
    excerpt:
      "La línea ejecutiva, operativa e industrial de Symart está pensada para jornadas largas y espacios de alto uso.",
    image: nov("sillas-ergonomicas.webp"),
    body: [
      "Symart separa su sillería en ejecutivas, secretariales y operativas, industriales, y sillas para visitas y comedor.",
      "La línea ejecutiva y operativa se especifica para personas que pasan la jornada sentadas. La industrial está pensada para plantas y áreas de desgaste. Las de visita cubren salas de espera y comedor.",
      "El color del tapiz, dentro del catálogo, no cambia el precio.",
    ],
  },
];

export const keywords = [
  "Escritorios",
  "Sillas ejecutivas",
  "Estaciones",
  "Mesas de reunión",
  "Archiveros",
  "Recepción",
];

export const materials = [
  "Melamina",
  "Metal",
  "Tela",
  "Malla",
  "Madera",
  "Polipropileno",
];

export function categoryName(id: CategoryId) {
  return categories.find((item) => item.id === id)?.name ?? id;
}

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, limit);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((item) => {
    const haystack = [
      item.name,
      item.sku,
      item.description,
      categoryName(item.category),
      ...item.materials,
      ...item.finishes.map((finish) => finish.name),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 30000;
export const FREE_SHIPPING = 15000;
export const SHIPPING_FEE = 890;
export const COUPON = { code: "SYMART10", rate: 0.1 };

export const instagramShots = [
  nov("muebles-para-salas-de-espera.webp"),
  nov("Escritorios-electricos-1.webp"),
  nov("sillas-ergonomicas.webp"),
  nov("muebles-Estaciones-de-trabajo.webp"),
  nov("mesas-para-restaurantes.webp"),
  oct("fabrica-de-muebles-de-oficina-1.webp"),
];
