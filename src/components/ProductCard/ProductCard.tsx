import { ProductI } from "@/interfaces";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Star from "@/components/ui/star";
import AddToCart from "@/components/AddToCart/AddToCart";
import AddToWishlist from "@/components/AddToWishList/AddToWishList";
import RemoveFromWishlist from "@/components/RemoveFromWishlist/RemoveFromWishlist";


export default function ProductCard({ product, showDelete = false }: { product: ProductI, showDelete?: boolean }) {
    return (
        <Card className='group flex flex-col h-full bg-white border-2 border-primary/5 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden'>
            {/* Visual Interface */}
            <Link href={'/products/' + product._id} className="relative block aspect-square overflow-hidden bg-muted/30">
                <Image
                    src={product.imageCover}
                    fill
                    className='object-cover w-full transition-transform duration-700 group-hover:scale-110'
                    alt={product.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Tactical Overlays */}
                <div className="absolute top-4 right-4 z-10">
                    <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/70 backdrop-blur-md text-foreground rounded-full border border-white/50 shadow-xl">
                        {product.brand.name}
                    </span>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            {/* Specifications Module */}
            <div className="flex flex-col flex-1 px-5">
                <CardHeader className="p-0 mb-4">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{product.category.name}</p>
                    <CardTitle className="text-xl font-bold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {product.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0 grow space-y-6">
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center text-yellow-500'>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    fill={Math.max(0, Math.min(1, product.ratingsAverage - i))}
                                />
                            ))}
                        </div>
                        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded-full">
                            {product.ratingsAverage}
                        </span>
                    </div>

                    <div className="flex items-end justify-between pt-2">
                        <h3 className='text-2xl font-black tracking-tight'>
                            {product.price}
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">EGP</span>
                        </h3>
                    </div>
                </CardContent>

                <CardFooter className='gap-3 p-0 mt-8'>
                    <div className="grow">
                        <AddToCart productId={product._id} />
                    </div>
                    <div className="shrink-0">
                        {showDelete ? <RemoveFromWishlist productId={product._id} /> : <AddToWishlist productId={product._id} />}
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}
