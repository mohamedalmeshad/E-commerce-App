'use client';

import React, { useState } from 'react';
import { OrderI } from '@/interfaces/order';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CreditCardIcon, CheckCircle2Icon, ChevronDownIcon, MapPinIcon, HashIcon, BoxIcon, PhoneIcon, LandmarkIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OrderCardProps {
    order: OrderI;
}

export default function OrderCard({ order }: OrderCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="relative group overflow-visible">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-[2.5rem] -z-10 group-hover:scale-[1.01] transition-transform duration-500" />

            <div className="bg-background border-2 border-primary/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                {/* 1. Order ID and Primary Status */}
                <div className="bg-muted/30 px-3 md:px-8 py-3 md:py-6 border-b flex flex-wrap items-center justify-between gap-3 md:gap-6">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="size-8 md:size-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary border border-primary/5">
                            <HashIcon className="size-4 md:size-5" />
                        </div>
                        <div>
                            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground leading-none mb-1">ID</p>
                            <p className="text-xs md:text-sm font-black font-mono tracking-tighter">ORD-{order._id.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground leading-none mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                {order.isDelivered ? (
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full px-3 md:px-4 text-[8px] md:text-[9px] font-black uppercase tracking-widest h-5 md:h-6">
                                        Delivered
                                    </Badge>
                                ) : (
                                    <Badge className="bg-blue-500/10 text-blue-600 border-none rounded-full px-3 md:px-4 text-[8px] md:text-[9px] font-black uppercase tracking-widest h-5 md:h-6">
                                        In Transit
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Key Metrics Grid */}
                <div className="px-3 md:px-8 py-4 md:py-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    <div className="space-y-1 md:space-y-2">
                        <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            <CalendarIcon className="size-2.5 md:size-3" />
                            <span>Registry</span>
                        </div>
                        <p className="text-sm md:text-base font-black tracking-tight">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                        </p>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                        <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            <LandmarkIcon className="size-2.5 md:size-3" />
                            <span>Total</span>
                        </div>
                        <p className="text-sm md:text-xl font-black text-primary tracking-tighter">
                            {order.totalOrderPrice} <span className="text-[10px] uppercase ml-0.5">EGP</span>
                        </p>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                        <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            <BoxIcon className="size-2.5 md:size-3" />
                            <span>Units</span>
                        </div>
                        <p className="text-sm md:text-base font-black tracking-tight">
                            {String(order.cartItems.reduce((acc, item) => acc + item.count, 0)).padStart(2, '0')}
                        </p>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                        <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            <CreditCardIcon className="size-2.5 md:size-3" />
                            <span>Pay</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest">{order.paymentMethodType === 'cash' ? 'Cash' : 'Card'}</span>
                            {order.isPaid ? (
                                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            ) : (
                                <div className="size-1.5 rounded-full bg-orange-500" />
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Coordinates (Shipping Info) */}
                <div className="mx-2 md:mx-8 mb-4 md:mb-8 p-3 md:p-6 rounded-2xl md:rounded-4xl bg-muted/20 border-2 border-dashed border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                    <div className="flex items-start gap-3 md:gap-4">
                        <div className="size-8 md:size-10 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                            <MapPinIcon className="size-4 md:size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Address</p>
                            <p className="text-[11px] md:text-sm font-black leading-tight truncate">{order.shippingAddress.details}, {order.shippingAddress.city}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-3 md:border-l border-primary/10 md:pl-8">
                        <div className="flex items-start gap-3 md:gap-4 min-w-0">
                            <div className="size-8 md:size-10 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                                <PhoneIcon className="size-3 text-primary" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Phone</p>
                                <p className="text-[11px] md:text-sm font-black truncate">{order.shippingAddress.phone}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="h-10 md:h-12 px-4 md:px-6 rounded-lg md:rounded-xl bg-primary text-primary-foreground font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 md:gap-3 shrink-0"
                        >
                            <span className="hidden xs:inline">{isExpanded ? 'Hide' : 'Show'} Details</span>
                            <span className="xs:hidden">{isExpanded ? 'Hide' : 'Show'}</span>
                            <div className={cn("transition-transform duration-500", isExpanded && "rotate-180")}>
                                <ChevronDownIcon className="size-3 stroke-3" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* 4. Cargo Manifest (Items) */}
                <div className={cn(
                    "grid transition-all duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)]",
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}>
                    <div className="overflow-hidden">
                        <div className="px-3 md:px-8 pb-4 md:pb-10 space-y-4 md:space-y-6 pt-2">
                            <div className="h-px w-full bg-linear-to-r from-transparent via-primary/10 to-transparent mb-4 md:mb-8" />
                            {order.cartItems.map((item) => (
                                <div key={item._id} className="flex items-center gap-2 md:gap-6 p-1.5 md:p-4 rounded-xl md:rounded-2xl hover:bg-primary/5 transition-colors group/item relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/50 -z-10 blur-sm" />
                                    <div className="relative size-16 md:size-24 rounded-xl md:rounded-2xl overflow-hidden bg-muted border-2 border-white shadow-sm shrink-0 group-hover/item:scale-105 transition-transform duration-500">
                                        <Image
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                                        <div>
                                            <p className="text-[7px] md:text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-0.5 line-clamp-1">{item.product.category?.name || 'Category'}</p>
                                            <h3 className="text-xs md:text-lg font-black tracking-tight leading-tight line-clamp-1">{item.product.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-1.5 md:gap-4">
                                            <div className="flex items-center gap-1 bg-white/80 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-md md:rounded-lg border border-primary/5">
                                                <span className="text-[7px] md:text-[10px] font-black text-muted-foreground uppercase opacity-50">Q</span>
                                                <span className="text-[9px] md:text-xs font-black">{item.count}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-white/80 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-md md:rounded-lg border border-primary/5">
                                                <span className="text-[7px] md:text-[10px] font-black text-muted-foreground uppercase opacity-50">U</span>
                                                <span className="text-[9px] md:text-xs font-black truncate max-w-10 md:max-w-none">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[7px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-0.5 md:mb-1">Total</p>
                                        <p className="text-sm md:text-2xl font-black tracking-tighter text-foreground">{item.price * item.count} <span className="text-[8px] md:text-xs">EGP</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. Authentic Signature Area */}
                <div className="bg-muted/10 px-3 md:px-8 py-2 md:py-4 border-t border-primary/5 flex items-center justify-between">
                    <p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 truncate mr-4">
                        ID: {order._id.toUpperCase()}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <CheckCircle2Icon className="size-2.5 md:size-3 text-emerald-500/30" />
                        <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-muted-foreground/20 italic">Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
