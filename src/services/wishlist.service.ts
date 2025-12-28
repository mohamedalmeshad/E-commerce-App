import { ENDPOINTS } from "./api.config";

export const wishlistService = {
    async getWishlist(token: string) {
        const response = await fetch(ENDPOINTS.WISHLIST.BASE, {
            headers: { token },
        });
        return response.json();
    },

    async addToWishlist(productId: string, token: string) {
        const response = await fetch(ENDPOINTS.WISHLIST.BASE, {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
        });
        return response.json();
    },

    async removeFromWishlist(productId: string, token: string) {
        const response = await fetch(ENDPOINTS.WISHLIST.ITEM(productId), {
            method: "DELETE",
            headers: { token },
        });
        return response.json();
    },
};
