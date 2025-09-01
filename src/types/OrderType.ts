

export interface OrderType {
    user: string;
    item: string;
    startDate: Date
    endDate: Date
    totalPrice: Number
    status: "Ongoing" | "Returned" | "Overdue"
}

export type OrdersDetails = {
    orders: OrderType[]
}