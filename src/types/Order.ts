import type { Cloth } from "./Cloth"
import type { UserType } from "./User"

export interface OrderType {
    userId: string
    clothId: string
    fromDate: string
    toDate: string
    totalPrice: number
    status: "ongoing" | "returned" | "late"
    cloth?: Cloth
    user?: UserType
}




