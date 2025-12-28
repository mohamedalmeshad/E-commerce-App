export const API_BASE_URL = process.env.API_BASE_URL;

export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/signin`,
        SIGNUP: `${API_BASE_URL}/auth/signup`,
        FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgotPasswords`,
        VERIFY_RESET_CODE: `${API_BASE_URL}/auth/verifyResetCode`,
        RESET_PASSWORD: `${API_BASE_URL}/auth/resetPassword`,
        VERIFY_TOKEN: `${API_BASE_URL}/auth/verifyToken`,
    },
    PRODUCTS: {
        BASE: `${API_BASE_URL}/products`,
        SINGLE: (id: string) => `${API_BASE_URL}/products/${id}`,
    },
    CATEGORIES: {
        BASE: `${API_BASE_URL}/categories`,
        SINGLE: (id: string) => `${API_BASE_URL}/categories/${id}`,
        SUBCATEGORIES: (id: string) => `${API_BASE_URL}/categories/${id}/subcategories`,
    },
    BRANDS: {
        BASE: `${API_BASE_URL}/brands`,
        SINGLE: (id: string) => `${API_BASE_URL}/brands/${id}`,
    },
    CART: {
        BASE: `${API_BASE_URL}/cart`,
        ITEM: (id: string) => `${API_BASE_URL}/cart/${id}`,
    },
    WISHLIST: {
        BASE: `${API_BASE_URL}/wishlist`,
        ITEM: (id: string) => `${API_BASE_URL}/wishlist/${id}`,
    },
    ADDRESSES: {
        BASE: `${API_BASE_URL}/addresses`,
        ITEM: (id: string) => `${API_BASE_URL}/addresses/${id}`,
    },
    ORDERS: {
        USER: (id: string) => `${API_BASE_URL}/orders/user/${id}`,
        CHECKOUT_SESSION: (cartId: string) => `${API_BASE_URL}/orders/checkout-session/${cartId}`,
        CASH: (cartId: string) => `${API_BASE_URL}/orders/${cartId}`,
    },
    USER: {
        UPDATE_PROFILE: `${API_BASE_URL}/users/updateMe`,
        UPDATE_PASSWORD: `${API_BASE_URL}/users/changeMyPassword`,
    }
};
