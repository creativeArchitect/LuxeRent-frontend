
type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL"

export interface Cloth{
    _id?: string
    name: string
    description: string
    brand: string
    category: string 
    size: Size
    pricePerDay: number
    image: string
    available: boolean
    currentRental?: string
}

