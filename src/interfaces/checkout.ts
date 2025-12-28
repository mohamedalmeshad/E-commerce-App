import { OrderI } from "./order"

export interface CreditCardResponse {
    status?: string
    session?: Session
    statusMsg?: string
    message?: string
}
export interface CashResponse {
    statusMsg?: string
    message?: string
    status?: string
    data?: OrderI
}


export interface Session {
    url: string
    success_url: string
    cancel_url: string
}