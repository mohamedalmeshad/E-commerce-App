import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 mb-12">
                <Skeleton className="size-4 rounded" />
                <Skeleton className="h-4 w-40 rounded-full" />
            </div>

            <div className="bg-white border-2 border-primary/5 rounded-[3rem] shadow-2xl shadow-primary/5 overflow-hidden">
                {/* Header Sub-section */}
                <div className="bg-muted/10 pb-10 pt-12 px-10 border-b">
                    <div className="flex items-center gap-6">
                        <Skeleton className="size-16 rounded-2xl" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-32 rounded-full" />
                            <Skeleton className="h-10 w-64 rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* Content Sub-section */}
                <div className="p-10 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            {[1, 2].map((i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex items-center gap-2 ml-1">
                                        <Skeleton className="size-4 rounded-full" />
                                        <Skeleton className="h-3 w-24 rounded-full" />
                                    </div>
                                    <Skeleton className="h-16 w-full rounded-2xl" />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 ml-1">
                                    <Skeleton className="size-4 rounded-full" />
                                    <Skeleton className="h-3 w-32 rounded-full" />
                                </div>
                                <Skeleton className="h-16 w-2/3 rounded-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-primary/5 flex justify-end">
                        <Skeleton className="h-14 w-48 rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
