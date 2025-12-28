import { CategoryI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getCategoriesAction } from "@/actions/product.actions";
import AllSubcategories from "@/components/SubcategoryList/AllSubcategories";

export default async function Categories() {
  let data: CategoryI[] = [];

  try {
    const response = await getCategoriesAction();
    data = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-destructive font-black uppercase tracking-widest bg-destructive/5 py-4 rounded-2xl border border-destructive/10">Failed to load sector categories.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            Tactical Taxonomy
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            OUR <span className="text-primary italic">CATEGORIES</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Browse products organized by functional sectors and lifestyle matrices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="group block relative rounded-[2.5rem] overflow-hidden bg-muted/30 border-2 border-primary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="relative aspect-4/5">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                <p className="text-[10px] font-black text-background uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Explore Collection</p>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none group-hover:scale-110 transition-transform duration-500">
                  {category.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-24 pt-16 border-t border-primary/5">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
            Sub <span className="text-primary italic">Categories</span>
          </h2>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">
            Comprehensive list of all available subcategories
          </p>
        </div>
        <AllSubcategories />
      </div>
    </div>
  );
}
