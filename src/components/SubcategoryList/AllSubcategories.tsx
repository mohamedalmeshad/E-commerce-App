'use client';

import React, { useEffect, useState } from 'react';
import { getAllSubcategoriesAction } from '@/actions/product.actions';
import { CategoryI } from '@/interfaces';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function AllSubcategories() {
    const [subcategories, setSubcategories] = useState<CategoryI[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSubcategories() {
            try {
                const response = await getAllSubcategoriesAction();
                // Check if response has data property (based on CategoryResponseI interface)
                if (response && response.data) {
                    setSubcategories(response.data);
                } else if (Array.isArray(response)) {
                    // Fallback if the API returns an array directly
                    setSubcategories(response);
                }
            } catch (error) {
                console.error('Failed to fetch all subcategories', error);
            } finally {
                setLoading(false);
            }
        }
        fetchSubcategories();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-wrap gap-3 justify-center">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
            </div>
        )
    }

    if (subcategories.length === 0) return null;

    return (
        <div className='w-full max-w-5xl mx-auto'>
            <div className="flex flex-wrap gap-3 justify-center">
                {subcategories.map((sub) => (
                    <Link key={sub._id} href={`/subcategories/${sub._id}`}>
                        <div
                            className="px-5 py-2 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-md hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-lg hover:shadow-primary/20 cursor-pointer group active:scale-95"
                        >
                            <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                                {sub.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
