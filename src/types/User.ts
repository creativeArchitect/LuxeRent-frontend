

export type Role = 'user' | 'admin'

export interface UserType {
    firstName: string
    lastName: string
    email: string
    password: string
    role: Role
}

export interface RegisterDetailsType {
    firstName: string
    lastName: string
    email: string
    password: string
    role: Role
}

export interface LoginDetailsType {
    email: string
    password: string
}

