"use server"

import { getUserToken } from "@/app/helpers/getUserToken";



export async function addToCardAction(productId: string) {


    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
            token: await getUserToken(),
            'content-type': 'application/json'
        }
    });
    const data = await response.json();
    return data
}