import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32 rounded-full" />
                    <Skeleton className="h-12 w-64 md:w-96 rounded-xl" />
                    <Skeleton className="h-4 w-full md:w-[500px] rounded-full" />
                    <Skeleton className="h-4 w-full md:w-[300px] rounded-full" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex flex-col gap-6 rounded-4xl border-2 border-primary/5 bg-white shadow-sm">
                        <div className="w-full h-full">
                            <Skeleton className="w-full aspect-square rounded-t-4xl" />
                            <div className="px-6 pb-6 flex flex-col gap-6">
                                <div className="space-y-3 mt-2">
                                    <Skeleton className="h-4 w-1/4 rounded-full" />
                                    <Skeleton className="h-7 w-3/4 rounded-lg" />
                                </div>
                                <div className="mt-auto space-y-6">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-24 rounded-full" />
                                        <Skeleton className="h-4 w-8 rounded-full" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-8 w-12 rounded-full" />
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <Skeleton className="h-10 w-full rounded-2xl" />
                                        <Skeleton className="h-8 w-10 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
