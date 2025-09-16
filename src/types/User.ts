import type { OrderType } from "./Order"


export type Role = 'user' | 'admin'

export interface UserType {
    _id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role: Role
    avatarUrl: string
    rentals?: [OrderType]
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

