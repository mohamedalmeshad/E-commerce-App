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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white relative rounded-[2.5rem] border-2 border-primary/5 overflow-hidden shadow-sm"
                    >
                        <Skeleton className="w-full aspect-square" />
                    </div>
                ))}
            </div>
        </div>
    );
}
