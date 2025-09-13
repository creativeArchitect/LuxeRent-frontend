
export interface CartItem {
    clothId: string
    name: string
    pricePerDay: number
    available: boolean
    category: string 
    size: "XS" | "S" | "M" | "L" | "XL" | "XXL"
    image: string
    quantity: number
    fromDate: string
    toDate: string
}


