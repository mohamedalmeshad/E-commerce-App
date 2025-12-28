import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function WishlistLoading() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32 rounded-full" />
                    <Skeleton className="h-12 w-64 md:w-96 rounded-xl" />
                    <Skeleton className="h-4 w-full md:w-[500px] rounded-full" />
                </div>
                <Skeleton className="h-20 w-48 rounded-4xl" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="space-y-6">
                        <Skeleton className="aspect-4/5 w-full rounded-4xl" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-24 rounded-full" />
                            <Skeleton className="h-6 w-3/4 rounded-lg" />
                            <div className="flex justify-between items-center pt-2">
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-12 w-32 rounded-xl" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
