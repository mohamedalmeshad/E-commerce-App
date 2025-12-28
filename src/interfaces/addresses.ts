/** Response for multiple addresses (get, add, remove) */
export interface AddressResponse {
    results?: number
    status: string
    message?: string
    data: Address[]
}
/** Response for a single address */
export interface SpecificAddressResponse {
    status: string
    data: Address
}
/** User address structure */
export interface Address {
    _id?: string
    name?: string
    details: string
    phone: string
    city: string
}
/** Shipping data for checkout */
export interface ShippingAddress {
    details: string
    phone: string
    city: string
}