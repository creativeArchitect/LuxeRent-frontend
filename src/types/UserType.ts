


export interface UserType {
    _id: string
    firstName: string
    lastName?: string
    email: string
    password: string
    avatarUrl?: string
    role: "owner" | "user"
    rentals: string[]
}
