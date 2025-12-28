import { ShippingAddress } from "@/interfaces";
import { ENDPOINTS } from "./api.config";

export const orderService = {
    async getUserOrders(userId: string) {
        const response = await fetch(ENDPOINTS.ORDERS.USER(userId));
        return response.json();
    },

    async createCheckoutSession(cartId: string, shippingAddress: ShippingAddress, token: string, baseUrl: string) {
        const response = await fetch(`${ENDPOINTS.ORDERS.CHECKOUT_SESSION(cartId)}?url=${baseUrl}`, {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ shippingAddress }),
        });
        return response.json();
    },

    async createCashOrder(cartId: string, shippingAddress: ShippingAddress, token: string) {
        const response = await fetch(ENDPOINTS.ORDERS.CASH(cartId), {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ shippingAddress }),
        });
        return response.json();
    }
};
