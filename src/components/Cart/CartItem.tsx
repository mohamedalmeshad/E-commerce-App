import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CartItemProps {
    item: any; // Ideally this should be typed properly with the Product interface
    updatingId: string | null;
    removingId: string | null;
    updateCartItem: (productId: string, count: number) => void;
    removeCartItem: (productId: string) => void;
}

export default function CartItem({
    item,
    updatingId,
    removingId,
    updateCartItem,
    removeCartItem,
}: CartItemProps) {
    return (
        <div className="group relative bg-background rounded-[2.5rem] border-2 border-transparent hover:border-primary/5 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5">
            <div className="absolute inset-0 bg-linear-to-br from-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 relative z-10">
                <Link href={`/products/${item.product._id}`} className="shrink-0">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-muted/30 rounded-4xl overflow-hidden group-hover:scale-105 transition-transform duration-700 shadow-inner">
                        <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </Link>

                <div className="flex-1 min-w-0 space-y-4 text-center sm:text-left">
                    <div>
                        <Link href={`/products/${item.product._id}`}>
                            <h3 className="text-xl sm:text-2xl font-black text-foreground hover:text-primary transition-colors leading-tight">
                                {item.product.title.split(" ", 7).join(" ")}
                            </h3>
                        </Link>
                        <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-widest flex justify-center sm:justify-start items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-muted">
                                {item.product.brand.name}
                            </span>
                            <span className="size-1 bg-muted-foreground/30 rounded-full" />
                            <span>{item.product.category.name}</span>
                        </p>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="p-1 px-1.5 bg-muted/30 rounded-2xl flex items-center border border-muted-foreground/5">
                            <Button
                                variant="ghost"
                                disabled={item.count == 1 || updatingId == item.product._id}
                                onClick={() => updateCartItem(item.product._id, item.count - 1)}
                                className="h-10 w-10 p-0 rounded-xl hover:bg-background hover:text-primary hover:shadow-sm cursor-pointer"
                            >
                                -
                            </Button>
                            <span className="text-sm w-12 text-center flex justify-center items-center font-black text-foreground">
                                {updatingId == item.product._id ? <Spinner /> : item.count}
                            </span>
                            <Button
                                variant="ghost"
                                disabled={updatingId == item.product._id}
                                onClick={() => updateCartItem(item.product._id, item.count + 1)}
                                className="h-10 w-10 p-0 rounded-xl hover:bg-background hover:text-primary hover:shadow-sm cursor-pointer"
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-3 min-w-[120px]">
                    <span className="text-3xl font-black text-foreground tracking-tighter">
                        {item.price}$
                    </span>
                    <Button
                        variant={"outline"}
                        className="text-[10px] cursor-pointer font-black text-muted-foreground hover:text-destructive uppercase tracking-[0.2em] transition-colors flex justify-center items-center gap-2"
                        onClick={() => removeCartItem(item.product._id)}
                    >
                        {removingId == item.product._id ? (
                            <Spinner />
                        ) : (
                            <>
                                <Trash2Icon className="size-3" />
                                Remove Item
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
