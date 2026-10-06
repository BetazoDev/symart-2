export type CategoryId =
  | "escritorios"
  | "sillas"
  | "estaciones"
  | "mesas"
  | "almacenamiento"
  | "recepciones";

export type Finish = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: CategoryId;
  price: number;
  compareAt?: number;
  images: string[];
  finishes: Finish[];
  materials: string[];
  widthCm?: number;
  drawers?: number;
  inStock: boolean;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  highlights: string[];
  bestseller?: boolean;
  featured?: boolean;
  sale?: boolean;
};

export type CartLine = {
  slug: string;
  finishId: string;
  qty: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  body: string[];
};
