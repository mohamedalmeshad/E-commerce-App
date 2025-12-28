import { Metadata } from 'next'
import { Params } from 'next/dist/server/request/params'
import React from 'react'

import { Badge } from "@/components/ui/badge";
import Star from '@/components/ui/star';
import { ProductI } from '@/interfaces';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import AddToCart from '@/components/AddToCart/AddToCart';
import { ShieldCheckIcon, TruckIcon, RefreshCcwIcon, ZapIcon } from 'lucide-react';
import { getProductByIdAction } from '@/actions/product.actions';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { productId } = await params;
    if (!productId || typeof productId !== 'string') return { title: 'Product' };

    try {
        const { data: product } = await getProductByIdAction(productId);
        return {
            title: product?.title || 'Product',
            description: product?.description?.slice(0, 160) || 'View product details at SHOP.CO',
            openGraph: {
                images: product?.imageCover ? [product.imageCover] : [],
            },
        };
    } catch (error) {
        return { title: 'Product' };
    }
}

export default async function ProductId({ params }: { params: Params }) {
    const { productId } = await params;

    let product: ProductI | null = null;

    if (!productId || typeof productId !== 'string') {
        notFound();
    }

    try {
        const { data } = await getProductByIdAction(productId);
        product = data;
    } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-primary/5 rounded-[3rem] shadow-2xl shadow-primary/5 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

                    {/* Visual Interface Module */}
                    <div className="bg-muted/10 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-primary/5 flex flex-col justify-center gap-12 group">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-4">
                            <ProductSlider images={product.images} altContent={product.title} />
                        </div>

                        {/* Trust Matrix */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheckIcon className="size-6 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Authenticated</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <TruckIcon className="size-6 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Global Ship</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <RefreshCcwIcon className="size-6 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">30D Return</span>
                            </div>
                        </div>
                    </div>

                    {/* Operational Specifications Module */}
                    <div className="p-8 lg:p-16 flex flex-col justify-center space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Badge className="rounded-full px-4 py-1.5 bg-primary/5 text-primary border-primary/10 text-[10px] font-black uppercase tracking-widest">
                                    {product.category.name}
                                </Badge>
                                {product.subcategory[0] && (
                                    <Badge className="rounded-full px-4 py-1.5 bg-muted text-muted-foreground border-muted-foreground/10 text-[10px] font-black uppercase tracking-widest">
                                        {product.subcategory[0].name}
                                    </Badge>
                                )}
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Serial: {product._id.slice(-8).toUpperCase()}</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
                                {product.title.split(' ', 7).join(' ')}
                            </h1>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            fill={Math.max(0, Math.min(1, product.ratingsAverage - i))}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black bg-muted/50 px-3 py-1 rounded-full uppercase tracking-widest">
                                        {product.ratingsAverage}
                                    </span>
                                    <span className="text-muted-foreground text-sm font-medium">
                                        ({product.ratingsQuantity} Verified Reports)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                {product.description}
                            </p>
                        </div>

                        {/* Inventory & Pricing Hub */}
                        <div className="p-8 bg-muted/20 border-2 border-primary/5 rounded-[2.5rem] space-y-8">
                            <div className="flex items-end justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Valuation</p>
                                    <h2 className="text-4xl font-black tracking-tight text-foreground">
                                        {product.price} <span className="text-lg font-normal text-muted-foreground uppercase tracking-widest ml-1">EGP</span>
                                    </h2>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inventory Status</p>
                                    <span className={
                                        `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${product.quantity > 0 ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-destructive/10 text-destructive border-destructive/20"}`
                                    }>
                                        <div className={`size-2 rounded-full ${product.quantity > 0 ? "bg-green-500 animate-pulse" : "bg-destructive"}`} />
                                        {product.quantity > 0 ? `Available [${product.quantity}]` : 'Exhausted'}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <AddToCart productId={product._id} />
                            </div>
                        </div>

                        {/* Secondary System Data */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl border border-primary/5 bg-card flex items-center gap-4 group/item cursor-default">
                                <div className="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                    <ZapIcon className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Fast Dispatch</p>
                                    <p className="text-xs font-bold">Priority Status</p>
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl border border-primary/5 bg-card flex items-center gap-4 group/item cursor-default">
                                <div className="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                    <RefreshCcwIcon className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Secure Shield</p>
                                    <p className="text-xs font-bold">100% Protection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
