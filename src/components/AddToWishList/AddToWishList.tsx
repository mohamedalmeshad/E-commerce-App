'use client'
import React, { useContext, useState } from 'react'
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { WishlistContext } from '@/context/WishlistContext';
import { addToWishListAction } from '@/actions/wishlist.actions';

export default function AddToWishList({ productId }: { productId: string }) {
    const session = useSession()
    const navigate = useRouter()
    const { wishlistData, setWishlistData } = useContext(WishlistContext);
    const [isLoading, setisLoading] = useState(false);

    const isInWishlist = wishlistData?.data?.some((item) => {
        if (typeof item === 'string') return item === productId;
        return item._id === productId;
    }) ?? false;

    async function addProductToWishList() {
        try {
            if (isInWishlist) return; // Already in wishlist

            if (session.status == 'authenticated') {
                setisLoading(true);
                const data = await addToWishListAction(productId);
                if (data.status == 'success') {
                    toast.success(data.message);
                    setWishlistData(data)
                }
                setisLoading(false)
                console.log(data);
            } else {
                navigate.push('/auth/login')
            }
        } catch (error) {
            console.log(error);
            toast.error("You need to sign in first")
            navigate.push('/auth/login');
        }
    }
    return (

        <>
            {isLoading ? <Spinner className='size-6' /> :
                <svg
                    onClick={addProductToWishList}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-6 transition-all duration-300 ${isInWishlist
                        ? "fill-accent-foreground text-accent-foreground cursor-default"
                        : "cursor-pointer fill-transparent hover:fill-accent-foreground hover:text-accent-ffill-accent-foreground"
                        }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>

            }
        </>
    )
}
