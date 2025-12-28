import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            {/* Header Section Skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/10 h-6 w-32" />
                    <Skeleton className="h-12 w-64 md:w-[450px] rounded-xl" />
                    <Skeleton className="h-4 w-full md:w-[550px] rounded-full" />
                </div>
                <Skeleton className="h-16 w-48 rounded-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-[2.5rem] bg-white border-2 border-primary/5 p-8 space-y-8 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <Skeleton className="size-14 rounded-2xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-40 rounded-lg" />
                                    <Skeleton className="h-2 w-16 rounded-full" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="size-10 rounded-full" />
                                <Skeleton className="size-10 rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/20 border border-primary/5">
                                <Skeleton className="size-5 rounded-full shrink-0" />
                                <div className="space-y-2 w-full">
                                    <Skeleton className="h-4 w-full rounded-full" />
                                    <Skeleton className="h-3 w-1/2 rounded-full" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-muted/20 border border-primary/5">
                                <Skeleton className="size-5 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-3/4 rounded-full" />
                            </div>
                        </div>
                        <div className="pt-2">
                            <Skeleton className="h-14 w-full rounded-2xl" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
