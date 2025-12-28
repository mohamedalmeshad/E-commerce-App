"use server"
import { getUserToken } from "@/app/helpers/getUserToken";
import { ShippingAddress, OrderI, CreditCardResponse, CashResponse } from "@/interfaces";
import { authService } from "@/services/auth.service";
import { orderService } from "@/services/order.service";

export async function createCheckoutSessionAction(cartId: string, shippingAddress: ShippingAddress): Promise<CreditCardResponse> {
    const token = await getUserToken();

    // Determine base URL: specific NEXT_URL -> Vercel Deployment URL -> Localhost fallback
    let baseUrl = process.env.NEXT_URL;
    if (!baseUrl) {
        if (process.env.VERCEL_URL) {
            baseUrl = `https://${process.env.VERCEL_URL}`;
        } else {
            baseUrl = 'http://localhost:3000';
        }
    }

    const data = await orderService.createCheckoutSession(cartId, shippingAddress, token, baseUrl);
    return data;
}

export async function createCashOrderAction(cartId: string, shippingAddress: ShippingAddress): Promise<CashResponse> {
    const token = await getUserToken();
    const data = await orderService.createCashOrder(cartId, shippingAddress, token);
    return data;
}

export async function getUserOrdersAction(): Promise<OrderI[]> {
    const token = await getUserToken();
    const tokenDetails = await authService.verifyToken(token);
    console.log(tokenDetails);
    if (tokenDetails.message === "verified" && tokenDetails.decoded) {
        const orders = await orderService.getUserOrders(tokenDetails.decoded.id);
        return orders;
    }

    return [];
}
