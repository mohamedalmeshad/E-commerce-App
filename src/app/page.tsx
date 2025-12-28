import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import FeaturedProductsSkeleton from "@/components/FeaturedProducts/FeaturedProductsSkeleton";
import { Suspense } from "react";
import { ArrowRightIcon, ShieldCheckIcon, ZapIcon, GlobeIcon } from 'lucide-react';
import heroImage from "../../public/premium_hero_fashion_1766613986110.jpg"

export default function Home() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background/80">
        {/* Architectural Background Elements */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left Content: High-Impact Messaging */}
            <div className="flex-1 space-y-10 py-12 lg:py-24 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-4 duration-700">
                <ZapIcon className="size-3 fill-primary" />
                Next-Gen Collection 2025
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] uppercase animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                FIND PRODUCTS <br />
                THAT MATCH <br />
                YOUR <span className="text-primary italic">STYLE</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                Explore a curated matrix of premium products designed for the contemporary lifestyle.
                Architected for performance, tailored for you.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                <Link href="/products">
                  <Button size="lg" className="cursor-pointer h-16 px-15 rounded-4xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/25 hover:scale-105 transition-transform group">
                    Begin Exploration
                    <ArrowRightIcon className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="size-12 rounded-full border-4 border-white bg-muted overflow-hidden ring-2 ring-primary/5">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${i + 140}`}
                        alt="User"
                        width={48}
                        height={48}
                      />
                    </div>
                  ))}
                  <div className="size-12 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-[10px] font-black">
                    +50k
                  </div>
                </div>
              </div>

              {/* Tactical Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-primary/5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight">500+</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Certified Brands</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight">10k+</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Premium Units</p>
                </div>
                <div className="hidden md:block space-y-1">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight">50k+</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Verified Enrollees</p>
                </div>
              </div>
            </div>

            {/* Right Content: Cinematic Imagery */}
            <div className="flex-1 relative w-full aspect-square lg:aspect-auto lg:h-[80vh] flex items-center justify-center animate-in fade-in zoom-in duration-1000">
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 border-8 border-white group/hero">
                <Image
                  fill
                  src={heroImage}
                  alt="Premium Fashion Collection"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

                {/* Floating UI Elements */}
                <div className="absolute bottom-8 left-8 p-6 bg-white/70 backdrop-blur-xl rounded-4xl border border-white/50 shadow-2xl flex items-center gap-4 animate-bounce-slow">
                  <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                    <ShieldCheckIcon className="size-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quality Guarantee</p>
                    <p className="text-sm font-bold">Authenticated Goods</p>
                  </div>
                </div>

                <div className="absolute top-8 right-8 p-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl flex items-center gap-3">
                  <GlobeIcon className="size-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sector: New Arrivals */}
      <section className="py-15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              NEW <span className="text-primary italic">ARRIVALS</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground font-medium uppercase tracking-[0.15em] text-sm">
              The latest architectural additions to our inventory
            </p>
          </div>

          <Suspense fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>

          <div className="pt-8">
            <Link href="/products">
              <Button variant="outline" className="cursor-pointer h-14 md:h-16 px-12 md:px-16 rounded-full text-xs md:text-sm font-black uppercase tracking-[0.15em] md:tracking-[0.2em] border-primary/10 hover:bg-primary hover:text-white transition-all duration-300">
                View Entire Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
