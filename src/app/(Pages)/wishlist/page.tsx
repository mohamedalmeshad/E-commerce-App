'use client'
import React, { useContext, useEffect } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { HeartIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WishlistContext } from "@/context/WishlistContext";
import { ProductI } from "@/interfaces";
import WishlistLoading from "./loading";

export default function WishlistPage() {
    const { wishlistData, isLoading, getWishlist } = useContext(WishlistContext);
    const products = wishlistData?.data || [];

    useEffect(() => {
        if (typeof wishlistData?.data[0] === "string") {
            getWishlist();
        }
    }, [wishlistData, getWishlist]);

    if ((isLoading && !wishlistData) || (typeof wishlistData?.data[0] === 'string' && products.length > 0)) {
        return <WishlistLoading />
    }
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                        <HeartIcon className="size-3 fill-primary" />
                        Personal Collection
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                        My <span className="text-primary italic">Wishlist</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                        Curate your favorites and keep track of the items you love across our entire store.
                    </p>
                </div>
                <div className="flex items-center w-fit gap-4 bg-background border-2 border-primary/10 shadow-xl shadow-primary/5 px-8 py-4 rounded-4xl group hover:border-primary/30 transition-all duration-500">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none">Total Items</p>
                        <p className="text-3xl font-black text-primary leading-none tracking-tighter">
                            {String(products.length).padStart(2, '0')}
                        </p>
                    </div>
                    <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <ShoppingBagIcon className="size-5" />
                    </div>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-muted/30 rounded-[3rem] border-2 border-dashed border-muted-foreground/10 group hover:border-primary/20 transition-all duration-500">
                    <div className="bg-background p-10 rounded-[2.5rem] shadow-xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
                        <HeartIcon className="size-20 text-muted-foreground opacity-10" />
                    </div>
                    <h2 className="text-3xl font-black mb-4 text-foreground tracking-tighter">Your wishlist is empty...</h2>
                    <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-12 leading-relaxed px-4">
                        Looks like you haven&apos;t added any products to your collection yet. Discovery awaits!
                    </p>
                    <Button asChild size="lg" className="cursor-pointer rounded-2xl px-12 h-16 font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Link href="/products">
                            Explore Shop
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
                    {(products as ProductI[]).map((product) => (
                        <ProductCard key={product._id} product={product} showDelete={true} />
                    ))}
                </div>
            )}
        </div>
    );

}
