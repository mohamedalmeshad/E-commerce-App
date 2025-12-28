import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProductsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-6 rounded-4xl border-2 border-primary/5 bg-white shadow-sm">
                    <div className="w-full h-full">
                        <Skeleton className="w-full aspect-square rounded-3xl" />
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
    );
}
