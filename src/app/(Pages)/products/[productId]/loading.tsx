import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-primary/5 rounded-[3rem] shadow-2xl shadow-primary/5 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                    {/* Visual Interface Skeleton */}
                    <div className="bg-muted/10 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-primary/5 flex flex-col justify-center gap-8">
                        <Skeleton className="w-full aspect-square rounded-[2.5rem] shadow-inner" />
                        <div className="flex gap-4 justify-center">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="size-20 rounded-2xl" />
                            ))}
                        </div>
                    </div>

                    {/* Architectural Specifications Skeleton */}
                    <div className="p-8 lg:p-16 flex flex-col justify-center space-y-10">
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-32 rounded-full" />
                            <Skeleton className="h-12 w-full md:w-3/4 rounded-xl" />
                            <div className="flex items-center gap-6">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                        </div>

                        <div className="space-y-6 py-8 border-y border-primary/5">
                            <Skeleton className="h-4 w-full rounded-full" />
                            <Skeleton className="h-4 w-full rounded-full" />
                            <Skeleton className="h-4 w-2/3 rounded-full" />
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-20 rounded-full" />
                                <Skeleton className="h-10 w-32 rounded-lg" />
                            </div>
                            <Skeleton className="size-12 rounded-2xl" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-16 w-full rounded-2xl" />
                            <Skeleton className="h-16 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
