"use server"

import { getUserToken } from "@/app/helpers/getUserToken";
import { WishListResponse } from "@/interfaces/wishListResponse";



export async function addToWishListAction(productId: string) {
    
    
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
            token: await getUserToken(),
            'content-type': 'application/json'
        }
    });
    const data: WishListResponse = await response.json();
    return data
}