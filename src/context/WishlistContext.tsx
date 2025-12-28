'use client'
import { WishListResponse } from "@/interfaces/wishListResponse";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserWishlistAction } from "@/actions/wishlist.actions";

export const WishlistContext = createContext<
    {
        wishlistData: WishListResponse | null,
        setWishlistData: (value: WishListResponse | null) => void,
        isLoading: boolean,
        setIsLoading: (value: boolean) => void,
        getWishlist: () => void,
    }>({
        wishlistData: null,
        setWishlistData: () => { },
        isLoading: false,
        setIsLoading: () => { },
        getWishlist: () => { },
    });

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [wishlistData, setWishlistData] = useState<WishListResponse | null>(null);

    async function getWishlist() {
        setIsLoading(true);
        try {
            const data = await getUserWishlistAction();
            setWishlistData(data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getWishlist()
    }, [])

    return (
        <WishlistContext.Provider value={{ wishlistData, setWishlistData, isLoading, setIsLoading, getWishlist }} >
            {children}
        </WishlistContext.Provider>
    );
}
