'use client'
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserCartAction } from "@/actions/cart.actions";

export const CartContext = createContext<
    {
        cartData: CartResponse | null,
        setCartData: (value: CartResponse | null) => void,
        isLoading: boolean,
        setIsLoading: (value: boolean) => void,
        getCart: () => void,
    }>({
        cartData: null,
        setCartData: () => { },
        isLoading: false,
        setIsLoading: () => { },
        getCart: () => { },
    });

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [cartData, setCartData] = useState<CartResponse | null>(null);
    async function getCart() {
        setIsLoading(true);
        try {
            const data = await getUserCartAction();
            setCartData(data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getCart()
    }, [])
    return <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart }} >
        {children}
    </CartContext.Provider>
}

