import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            {/* Header Section Skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-6 rounded-lg" />
                        <Skeleton className="h-6 w-32 rounded-full" />
                    </div>
                    <Skeleton className="h-12 w-64 md:w-[400px] rounded-xl" />
                    <Skeleton className="h-4 w-full md:w-[500px] rounded-full" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* User Identity Matrix Skeleton */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="bg-white border-2 border-primary/5 rounded-[3rem] p-8 shadow-2xl shadow-primary/5 flex flex-col items-center text-center">
                        <Skeleton className="size-24 rounded-3xl mb-6" />
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-40 mb-4" />
                        <Skeleton className="h-6 w-32 rounded-full mb-8" />
                        <div className="w-full pt-8 border-t border-primary/5">
                            <Skeleton className="h-14 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>

                {/* Tactical Navigation Grid Skeleton */}
                <div className="lg:col-span-8 xl:col-span-9">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="p-8 bg-white border-2 border-primary/5 rounded-[2.5rem] h-full shadow-sm flex flex-col justify-between space-y-8">
                                <div className="flex items-start justify-between">
                                    <Skeleton className="size-14 rounded-2xl" />
                                    <Skeleton className="size-10 rounded-full" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-8 w-48 rounded-lg" />
                                    <Skeleton className="h-4 w-full rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
