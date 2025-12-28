"use server"
import { getUserToken } from "@/app/helpers/getUserToken";
import { wishlistService } from "@/services/wishlist.service";
import { WishListResponse } from "@/interfaces/wishListResponse";

export async function addToWishListAction(productId: string): Promise<WishListResponse> {
    const token = await getUserToken();
    const data = await wishlistService.addToWishlist(productId, token);
    return data;
}

export async function removeFromWishListAction(productId: string): Promise<WishListResponse> {
    const token = await getUserToken();
    const data = await wishlistService.removeFromWishlist(productId, token);
    return data;
}

export async function getUserWishlistAction(): Promise<WishListResponse> {
    const token = await getUserToken();
    const data = await wishlistService.getWishlist(token);
    return data;
}
