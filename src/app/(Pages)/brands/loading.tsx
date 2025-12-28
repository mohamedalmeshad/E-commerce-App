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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {Array.from({ length: 15 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-3xl border-2 border-primary/5 p-6 flex flex-col items-center space-y-6 shadow-sm"
                    >
                        <Skeleton className="w-full aspect-square rounded-2xl" />
                        <Skeleton className="h-6 w-3/4 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}
