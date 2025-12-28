import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CartEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-muted/30 rounded-[3rem] border-2 border-dashed border-muted-foreground/10 group hover:border-primary/20 transition-all duration-500">
            <div className="bg-background p-10 rounded-[2.5rem] shadow-xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
                <ShoppingBagIcon className="size-20 text-muted-foreground opacity-10" />
            </div>
            <h2 className="text-3xl font-black mb-4 text-foreground tracking-tighter">
                Your cart is empty...
            </h2>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-12 leading-relaxed px-4">
                Looks like you haven’t added any products to your collection yet.
                Discovery awaits!
            </p>
            <Button
                asChild
                size="lg"
                className="cursor-pointer rounded-2xl px-12 h-16 font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
                <Link href={"/products"}>
                    Explore Shop
                </Link>
            </Button>
        </div>
    );
}
