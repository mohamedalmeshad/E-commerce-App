'use client';

import React, { useEffect, useState } from 'react';
import { getSubcategoriesByCategoryIdAction } from '@/actions/product.actions';
import { CategoryI } from '@/interfaces';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';


export default function SubcategoryList({ categoryId, categoryName }: {
    categoryId: string;
    categoryName: string;
}) {
    const [subcategories, setSubcategories] = useState<CategoryI[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSubcategories() {
            try {
                const { data } = await getSubcategoriesByCategoryIdAction(categoryId);
                setSubcategories(data);
            } catch (error) {
                console.error('Failed to fetch subcategories', error);
            } finally {
                setLoading(false);
            }
        }
        fetchSubcategories();
    }, [categoryId]);

    if (loading) {
        return (
            <div className="flex gap-4 overflow-x-auto pb-4 mask-fade-sides no-scrollbar">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-32 rounded-full flex-shrink-0" />
                ))}
            </div>
        )
    }

    if (subcategories.length === 0) return null;

    return (
        <div className='space-y-4'>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Explore Divisions</p>
            <div className="flex gap-3 overflow-x-auto pb-4 mask-fade-sides no-scrollbar touch-pan-x">
                {subcategories.map((sub) => (
                    <Link
                        key={sub._id}
                        href={`/subcategories/${sub._id}?parentName=${encodeURIComponent(categoryName)}&parentId=${categoryId}`}
                        className="group flex-shrink-0 cursor-pointer"
                    >
                        <div className={cn(
                            "px-6 py-2.5 rounded-full border border-primary/10 bg-background/50 backdrop-blur-md",
                            "hover:bg-primary hover:text-white hover:border-primary transition-all duration-300",
                            "flex items-center gap-2 shadow-sm hover:shadow-lg hover:shadow-primary/20",
                            "active:scale-95"
                        )}>
                            <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">
                                {sub.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
