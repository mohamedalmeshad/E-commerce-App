import { Metadata } from 'next';
import React from 'react';
import { ProductI, CategoryI } from '@/interfaces';
import ProductCard from '@/components/ProductCard/ProductCard';
import SubcategoryList from '@/components/SubcategoryList/SubcategoryList';
import { Params } from 'next/dist/server/request/params';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { getCategoryByIdAction, getProductsAction } from '@/actions/product.actions';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { categoryId } = await params;
    if (!categoryId || typeof categoryId !== 'string') return { title: 'Category' };

    try {
        const { data: category } = await getCategoryByIdAction(categoryId);
        return {
            title: category?.name || 'Category',
            description: `Browse the best products in the ${category?.name} category at SHOP.CO.`,
        };
    } catch (error) {
        return { title: 'Category' };
    }
}

export default async function CategoryProducts({ params }: { params: Params }) {
    const { categoryId } = await params;

    if (!categoryId || typeof categoryId !== 'string') {
        notFound();
    }

    let products: ProductI[] = [];
    let category: CategoryI | null = null;

    try {
        // Fetch products for this category
        const productsRes = await getProductsAction(`category[in]=${categoryId}`);
        products = productsRes.data;

        // Fetch category details for the header
        const categoryRes = await getCategoryByIdAction(categoryId);
        category = categoryRes.data;
    } catch (error) {
        console.error('Error fetching category data:', error);
    }

    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <Link href="/categories" className="inline-flex  items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all group mb-4">
                <ArrowLeftIcon className="size-3 group-hover:-translate-x-1 transition-transform" />
                Back to categories
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        Sector Classification
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                        {category?.name || 'Sector'} <span className="text-primary italic">PRODUCTS</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl text-lg leading-relaxed">
                        Explore our curated series of items within the <span className="text-foreground font-bold">{category?.name}</span> sector matrix.
                    </p>
                </div>
            </div>

            <div className="mb-12">
                <SubcategoryList categoryId={categoryId} categoryName={category?.name || 'Category'} />
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
                        🔍
                    </div>
                    <h2 className="text-3xl font-black mb-3 tracking-tighter uppercase">No Sector Records</h2>
                    <p className="text-muted-foreground max-w-md text-lg font-medium">
                        Our inventory for the <span className="text-foreground font-bold">{category?.name}</span> sector is currently undergoing re-evaluation. Check back soon for new arrivals.
                    </p>
                </div>
            )}
        </div>
    );
}
