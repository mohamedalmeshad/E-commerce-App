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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/10 h-6 w-32" />
                    </div>
                    <Skeleton className="h-12 w-64 md:w-[450px] rounded-xl" />
                    <Skeleton className="h-4 w-full md:w-[550px] rounded-full" />
                </div>

                <div className="w-full md:w-auto">
                    <div className="bg-muted/10 border-2 border-primary/5 px-8 py-4 rounded-4xl flex items-center gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-20 rounded-full" />
                            <Skeleton className="h-8 w-12 rounded-lg" />
                        </div>
                        <Skeleton className="size-10 rounded-2xl" />
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white border-2 border-primary/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                        {/* 1. Order ID and Primary Status Skeleton */}
                        <div className="bg-muted/30 px-8 py-6 border-b flex flex-wrap items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <Skeleton className="size-10 rounded-xl" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-3 w-8 rounded-full" />
                                    <Skeleton className="h-5 w-32 rounded-lg" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5">
                                <Skeleton className="h-3 w-24 rounded-full" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                            </div>
                        </div>

                        {/* 2. Key Metrics Grid Skeleton */}
                        <div className="px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map((j) => (
                                <div key={j} className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="size-3 rounded-full" />
                                        <Skeleton className="h-3 w-20 rounded-full" />
                                    </div>
                                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                                </div>
                            ))}
                        </div>

                        {/* 3. Coordinates (Shipping Info) Skeleton */}
                        <div className="mx-8 mb-8 p-6 rounded-4xl bg-muted/20 border-2 border-dashed border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="flex items-start gap-4">
                                <Skeleton className="size-10 rounded-2xl shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-3 w-16 rounded-full" />
                                    <Skeleton className="h-4 w-48 rounded-lg" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-6 md:border-l md:pl-8 border-primary/10 w-full">
                                <div className="flex items-start gap-4 flex-1 md:flex-none">
                                    <Skeleton className="size-10 rounded-2xl shrink-0" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-16 rounded-full" />
                                        <Skeleton className="h-4 w-32 rounded-lg" />
                                    </div>
                                </div>
                                <Skeleton className="h-12 w-32 rounded-xl shrink-0" />
                            </div>
                        </div>

                        {/* 5. Authentic Signature Area Skeleton */}
                        <div className="bg-muted/10 px-8 py-4 border-t border-primary/5 flex items-center justify-between">
                            <Skeleton className="h-3 w-48 rounded-full" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="size-3 rounded-full" />
                                <Skeleton className="h-2 w-32 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
