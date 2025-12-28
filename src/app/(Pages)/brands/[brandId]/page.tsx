import React from 'react';
import { ProductI, BrandI } from '@/interfaces';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Params } from 'next/dist/server/request/params';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { getBrandByIdAction, getProductsAction } from '@/actions/product.actions';
import { notFound } from 'next/navigation';

export default async function BrandProducts({ params }: { params: Params }) {
    const { brandId } = await params;

    if (!brandId || typeof brandId !== 'string') {
        notFound();
    }

    let products: ProductI[] = [];
    let brand: BrandI | null = null;

    try {
        // Fetch products for this brand
        const productsRes = await getProductsAction(`brand=${brandId}`);
        products = productsRes.data;

        // Fetch brand details for the header
        const brandRes = await getBrandByIdAction(brandId);
        brand = brandRes.data;
    } catch (error) {
        console.error('Error fetching brand data:', error);
    }

    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <Link href="/brands" className="inline-flex  items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all group mb-4">
                <ArrowLeftIcon className="size-3 group-hover:-translate-x-1 transition-transform" />
                Back to brands
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        Manufacturer Lineup
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                        {brand?.name || 'Brand'} <span className="text-primary italic">COLLECTION</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl text-lg leading-relaxed">
                        Authorized dealer inventory for the <span className="text-foreground font-bold">{brand?.name}</span> designer matrix.
                    </p>
                </div>
            </div>

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="min-h-[450px] flex flex-col items-center justify-center bg-muted/10 rounded-[3rem] border-2 border-primary/5 p-12 text-center group">
                    <div className="size-24 bg-white shadow-2xl shadow-primary/5 rounded-3xl flex items-center justify-center text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">
                        📦
                    </div>
                    <h2 className="text-3xl font-black mb-3 tracking-tighter uppercase">Inventory Depleted</h2>
                    <p className="text-muted-foreground max-w-md text-lg font-medium">
                        The current catalog for <span className="text-foreground font-bold">{brand?.name}</span> is temporarily offline for maintenance. Explore our other manufacturer networks.
                    </p>
                </div>
            )}
        </div>
    );
}
