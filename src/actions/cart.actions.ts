"use server"
import { getUserToken } from "@/app/helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { cartService } from "@/services/cart.service";

export async function getUserCartAction(): Promise<CartResponse> {
    const token = await getUserToken();
    const data = await cartService.getCart(token);
    return data;
}

export async function addToCartAction(productId: string): Promise<CartResponse> {
    const token = await getUserToken();
    const data = await cartService.addToCart(productId, token);
    return data;
}

export async function removeFromCartAction(productId: string): Promise<CartResponse> {
    const token = await getUserToken();
    const data = await cartService.removeCartItem(productId, token);
    return data;
}

export async function clearCartAction(): Promise<CartResponse> {
    const token = await getUserToken();
    const data = await cartService.clearCart(token);
    return data;
}

export async function updateCartProductQuantityAction(productId: string, count: number): Promise<CartResponse> {
    const token = await getUserToken();
    const data = await cartService.updateCartItem(productId, count, token);
    return data;
}
