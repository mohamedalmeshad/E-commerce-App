import { Metadata } from "next";
import { BrandI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getBrandsAction } from "@/actions/product.actions";

export const metadata: Metadata = {
  title: "Brands",
  description: "Shop from our wide selection of certified global brands at SHOP.CO.",
};

export default async function Brands() {
  let data: BrandI[] = [];

  try {
    const response = await getBrandsAction();
    data = response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-destructive font-black uppercase tracking-widest bg-destructive/5 py-4 rounded-2xl border border-destructive/10">Failed to load manufacturer brands.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            Manufacturer Network
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            GLOBAL <span className="text-primary italic">BRANDS</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            {"Connect with the world's most trusted manufacturers and designer labels."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {data.map((brand) => (
          <Link
            href={`/brands/${brand._id}`}
            key={brand._id}
            className="group relative bg-white rounded-4xl border-2 border-primary/5 p-6 flex flex-col items-center gap-6 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-muted/10 p-4">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain p-2 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 15vw"
              />
            </div>

            <div className="space-y-1 text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Certified Partner</p>
              <h2 className="text-lg font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
                {brand.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
