

export interface Cloth{
    _id: string
    name: string
    description: string
    brand: string
    category: string 
    size: "XS" | "S" | "M" | "L" | "XL" | "XXL"
    pricePerDay: number
    // images: [String]
    image: string
    available: Boolean
    currentRental?: string
}

