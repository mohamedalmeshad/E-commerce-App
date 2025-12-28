import { ENDPOINTS } from "./api.config";

export const cartService = {
    async getCart(token: string) {
        const response = await fetch(ENDPOINTS.CART.BASE, {
            headers: { token },
        });
        return response.json();
    },

    async addToCart(productId: string, token: string) {
        const response = await fetch(ENDPOINTS.CART.BASE, {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
        });
        return response.json();
    },

    async updateCartItem(productId: string, count: number, token: string) {
        const response = await fetch(ENDPOINTS.CART.ITEM(productId), {
            method: "PUT",
            headers: {
                token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ count }),
        });
        return response.json();
    },

    async removeCartItem(productId: string, token: string) {
        const response = await fetch(ENDPOINTS.CART.ITEM(productId), {
            method: "DELETE",
            headers: { token },
        });
        return response.json();
    },

    async clearCart(token: string) {
        const response = await fetch(ENDPOINTS.CART.BASE, {
            method: "DELETE",
            headers: { token },
        });
        return response.json();
    }
};
