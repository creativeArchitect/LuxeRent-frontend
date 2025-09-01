

export interface Cloth {
    _id: string; 
    name: string;
    description: string;
    category: string;
    size: "S" | "M" | "L";
    pricePerDay: number;
    images: string[];
    available: boolean;
    currentRental?: string;
  }
  

export type ClothesType = {
    clothes: Cloth[]
}