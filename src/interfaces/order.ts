import { CartItem } from "./cartResponse"
import { ShippingAddress } from "./addresses"
import { UserI } from "./user"

export interface OrderI {
    shippingAddress: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: UserI
    cartItems: CartItem[]
    paidAt: string
    createdAt: string
    updatedAt: string
    id: number
    __v: number
}




