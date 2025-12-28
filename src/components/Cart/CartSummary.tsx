import CheckOut from "@/components/CheckOut/CheckOut";
import { Button } from "@/components/ui/button";
import { CreditCardIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CartSummaryProps {
    totalCartPrice: number;
    cartId: string;
    removeCart: () => Promise<void>;
}

export default function CartSummary({
    totalCartPrice,
    cartId,
    removeCart,
}: CartSummaryProps) {
    return (
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-background rounded-[3rem] border-2 border-primary/5 p-8 shadow-2xl shadow-primary/5 space-y-8">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                        Checkout Hub
                    </p>
                    <h4 className="text-2xl font-black text-foreground tracking-tight">
                        Order Architecture
                    </h4>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold bg-muted/30 p-4 rounded-2xl">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">{totalCartPrice}$</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold bg-muted/30 p-4 rounded-2xl">
                        <span className="text-muted-foreground">Shipping Fee</span>
                        <span className="text-emerald-500 uppercase tracking-widest text-[10px]">
                            Complimentary
                        </span>
                    </div>
                    <div className="pt-4 flex justify-between items-end px-2">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">
                                Grand Total
                            </p>
                            <p className="text-4xl font-black text-foreground tracking-tighter leading-none">
                                {totalCartPrice}$
                            </p>
                        </div>
                        <div className="size-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/30">
                            <CreditCardIcon className="size-6" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-4">
                    <CheckOut removeCart={removeCart} cartId={cartId} />
                    <Button
                        asChild
                        variant="ghost"
                        className="cursor-pointer w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-muted transition-all"
                    >
                        <Link href={"/products"}>
                            Continue Browsing
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-4xl border border-dashed border-primary/20 flex gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ShieldCheckIcon className="size-6" />
                </div>
                <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
                    Every transaction is encrypted and secured. Your data privacy is our
                    absolute priority during coordinates processing.
                </p>
            </div>
        </div>
    );
}
