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
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-20 w-32 rounded-4xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-muted/10 rounded-[2.5rem] p-8 flex flex-col sm:flex-row items-center gap-8">
              <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-4xl shrink-0" />
              <div className="flex-1 space-y-4 w-full">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/4 rounded-full" />
                </div>
                <Skeleton className="h-10 w-32 rounded-2xl" />
              </div>
              <div className="flex flex-col items-center sm:items-end gap-3 min-w-[100px]">
                <Skeleton className="h-10 w-24 rounded-lg" />
                <Skeleton className="h-3 w-20 rounded-full" />
              </div>
            </div>
          ))}
          <Skeleton className="h-16 w-full rounded-4xl" />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-muted/10 rounded-[3rem] p-8 space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded-full" />
              <Skeleton className="h-8 w-48 rounded-lg" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
              <div className="flex justify-between items-end pt-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 rounded-full" />
                  <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
                <Skeleton className="size-12 rounded-2xl" />
              </div>
            </div>
            <div className="space-y-3 pt-4">
              <Skeleton className="h-14 w-full rounded-2xl" />
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
