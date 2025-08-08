export type Color = {
  id: number;
  name: string;
  hexCode: string;
};

export type FormData = {
  name: string;
  price: number;
  oldPrice: number;
  inStock: boolean;
  equipment: string;
  weight: number;
  size: string;
  hasApp: boolean;
  unlockType: string;
  material: string;
  description: string;
  mainImage: string;
  images: File[];
  colors: Color[];
};
