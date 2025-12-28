import { ProductI } from "./product";

export interface WishListResponse {
    statusMsg? : string //if error
    status: string
    message: string
    data: (string | ProductI)[]
}