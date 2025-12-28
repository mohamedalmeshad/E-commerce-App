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

    async getSubcategoriesByCategoryId(categoryId: string) {
        const response = await fetch(ENDPOINTS.CATEGORIES.SUBCATEGORIES(categoryId));
        return response.json();
    },

    async getAllSubcategories() {
        const response = await fetch(ENDPOINTS.SUBCATEGORIES.BASE);
        return response.json();
    },

    async getSubcategoryById(id: string) {
        const response = await fetch(ENDPOINTS.SUBCATEGORIES.SINGLE(id));
        return response.json();
    },
};
