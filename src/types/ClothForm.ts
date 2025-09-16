
type size = "XS" | "S" | "M" | "L" | "XL" | "XXL"

export interface ClothFormType {
    name: string
    description: string
    brand: string
    category: string 
    size: "XS" | "S" | "M" | "L" | "XL" | "XXL"
    pricePerDay: number
    // images: [string]
    image: string
    available: Boolean
    currentRental?: string
}


