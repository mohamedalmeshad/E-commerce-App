'use client'
import React, { useContext, useState } from 'react'
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { WishlistContext } from '@/context/WishlistContext';
import { Trash2 } from 'lucide-react';
import { removeFromWishListAction } from '@/actions/wishlist.actions';

export default function RemoveFromWishlist({ productId }: { productId: string }) {
    const session = useSession()
    const navigate = useRouter()
    const { getWishlist } = useContext(WishlistContext);
    const [isLoading, setisLoading] = useState(false);

    async function removeProductFromWishList() {
        try {
            if (session.status == 'authenticated') {
                setisLoading(true);
                const data = await removeFromWishListAction(productId);
                if (data.status == 'success') {
                    await getWishlist(); // Refresh wishlist data
                    toast.success(data.message);
                }
                setisLoading(false)
            } else {
                toast.error("You need to sign in first")
                navigate.push('/auth/login')
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            {isLoading ? <Spinner className='size-6' /> :
                <Trash2
                    onClick={removeProductFromWishList}
                    className="size-6 cursor-pointer text-destructive transition-all duration-300 hover:scale-110"
                />
            }
        </>
    )
}
