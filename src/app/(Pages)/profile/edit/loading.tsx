import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            {/* Header section skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <Skeleton className="h-4 w-32 rounded-full" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-6 rounded-lg" />
                        <Skeleton className="h-6 w-40 rounded-full" />
                    </div>
                    <Skeleton className="h-12 w-64 md:w-[450px] rounded-xl" />
                    <Skeleton className="h-4 w-full md:w-[550px] rounded-full" />
                </div>

                <div className="hidden md:flex gap-6 items-center bg-muted/30 px-8 py-6 rounded-[2.5rem] border border-primary/5">
                    <Skeleton className="size-16 rounded-2xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-48 rounded-lg" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-20 rounded-full" />
                            <Skeleton className="h-4 w-40 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* 1. Update Profile Information Skeleton */}
                <div className="lg:col-span-12 xl:col-span-7">
                    <div className="border border-primary/5 rounded-[2rem] overflow-hidden bg-card">
                        <div className="p-8 bg-muted/10 border-b flex gap-4">
                            <Skeleton className="size-10 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-48 rounded-lg" />
                                <Skeleton className="h-4 w-64 rounded-full" />
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3"><Skeleton className="h-4 w-24 rounded-full ml-1" /><Skeleton className="h-14 w-full rounded-xl" /></div>
                                <div className="space-y-3"><Skeleton className="h-4 w-24 rounded-full ml-1" /><Skeleton className="h-14 w-full rounded-xl" /></div>
                                <div className="md:col-span-2 space-y-3"><Skeleton className="h-4 w-40 rounded-full ml-1" /><Skeleton className="h-14 w-full rounded-xl" /></div>
                            </div>
                            <div className="flex justify-end pt-6 border-t">
                                <Skeleton className="h-14 w-56 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Update Password section Skeleton */}
                <div className="lg:col-span-12 xl:col-span-5">
                    <div className="border border-orange-500/10 rounded-[2rem] overflow-hidden bg-card">
                        <div className="p-8 bg-muted/10 border-b flex gap-4">
                            <Skeleton className="size-10 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-48 rounded-lg" />
                                <Skeleton className="h-4 w-64 rounded-full" />
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-3">
                                    <Skeleton className="h-4 w-32 rounded-full ml-1" />
                                    <Skeleton className="h-14 w-full rounded-xl" />
                                </div>
                            ))}
                            <Skeleton className="h-14 w-full rounded-xl mt-4" />
                            <Skeleton className="h-20 w-full rounded-xl mt-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
