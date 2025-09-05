
export type Role = "admin" | "user"

export interface UserType {
    _id: string
    firstName: string
    lastName?: string
    email: string
    password: string
    avatarUrl?: string
    role: Role
    rentals: string[]
}


export type RegisterUserType = {
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string,
    role: Role
}

export type LoginUserType = {
    email: string,
    password: string
}