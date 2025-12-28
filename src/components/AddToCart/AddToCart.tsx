'use client'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCartIcon } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { CartContext } from '@/context/CartContext';
import { addToCartAction } from '@/actions/cart.actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AddToCart({ productId }: { productId: string }) {
    const session = useSession()
    const navigate = useRouter()
    const { setCartData } = useContext(CartContext);
    const [isLoading, setisLoading] = useState(false);
    async function addProductToCart() {
        if (session.status === 'authenticated') {
            try {
                setisLoading(true);
                const data = await addToCartAction(productId);
                if (data.status == 'success') {
                    toast.success(data.message);
                    setCartData(data)
                }
            } catch (err) {
                console.log(err);
                toast.error("Something went wrong");
            } finally {
                setisLoading(false)
            }
        } else {
            navigate.push('/auth/login?reason=unauthorized');
        }

    }
    return (
        <Button onClick={addProductToCart} disabled={isLoading} className='w-full cursor-pointer'>
            {isLoading ? <Spinner /> : <>
                <ShoppingCartIcon />
                Add to Cart
            </>}
        </Button>
    )
}
