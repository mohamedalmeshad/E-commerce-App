import { ShoppingBagIcon } from "lucide-react";
import React from "react";

interface CartHeaderProps {
    numOfCartItems: number;
}

export default function CartHeader({ numOfCartItems }: CartHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                    <ShoppingBagIcon className="size-3" />
                    Secure Checkout
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground text-nowrap">
                    Shopping <span className="text-primary italic">Cart</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                    Review your selected items and proceed to a secure checkout to complete your order.
                </p>
            </div>

            <div className="w-full md:w-auto">
                <div className="bg-background w-fit border-2 border-primary/10 shadow-xl shadow-primary/5 px-6 py-4 rounded-4xl flex items-center gap-3">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none text-nowrap">
                            Total Items
                        </p>
                        <p className="text-2xl text-center font-black text-primary leading-none tracking-tighter">
                            {String(numOfCartItems).padStart(2, "0")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
