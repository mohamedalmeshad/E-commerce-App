import { ENDPOINTS } from "./api.config";

export const productService = {
    async getProducts(params?: string) {
        const url = params ? `${ENDPOINTS.PRODUCTS.BASE}?${params}` : ENDPOINTS.PRODUCTS.BASE;
        const response = await fetch(url);
        return response.json();
    },

    async getProductById(id: string) {
        const response = await fetch(ENDPOINTS.PRODUCTS.SINGLE(id));
        return response.json();
    },

    async getCategories() {
        const response = await fetch(ENDPOINTS.CATEGORIES.BASE);
        return response.json();
    },

    async getCategoryById(id: string) {
        const response = await fetch(ENDPOINTS.CATEGORIES.SINGLE(id));
        return response.json();
    },

    async getBrands() {
        const response = await fetch(ENDPOINTS.BRANDS.BASE);
        return response.json();
    },

    async getBrandById(id: string) {
        const response = await fetch(ENDPOINTS.BRANDS.SINGLE(id));
        return response.json();
    },
};
