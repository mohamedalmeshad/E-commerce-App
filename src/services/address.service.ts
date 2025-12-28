import { Address } from "@/interfaces";
import { ENDPOINTS } from "./api.config";

export const addressService = {
    async getAddresses(token: string) {
        const response = await fetch(ENDPOINTS.ADDRESSES.BASE, {
            headers: { token },
        });
        return response.json();
    },

    async getSpecificAddress(addressId: string, token: string) {
        const response = await fetch(ENDPOINTS.ADDRESSES.ITEM(addressId), {
            headers: { token },
        });
        return response.json();
    },

    async addAddress(address: Address, token: string) {
        const response = await fetch(ENDPOINTS.ADDRESSES.BASE, {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(address),
        });
        return response.json();
    },

    async removeAddress(addressId: string, token: string) {
        const response = await fetch(ENDPOINTS.ADDRESSES.ITEM(addressId), {
            method: "DELETE",
            headers: { token },
        });
        return response.json();
    }
};
