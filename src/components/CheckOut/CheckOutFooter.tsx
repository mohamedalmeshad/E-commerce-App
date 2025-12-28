'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Spinner } from '../ui/spinner';
import { CreditCardIcon, LandmarkIcon } from 'lucide-react';

interface CheckOutFooterProps {
    isLoadingCash: boolean;
    isLoadingCredit: boolean;
    onCheckOut: (type: 'card' | 'cod') => void;
}

export default function CheckOutFooter({ isLoadingCash, isLoadingCredit, onCheckOut }: CheckOutFooterProps) {
    return (
        <DialogFooter className="bg-muted/30 p-8 flex flex-col sm:flex-row gap-4 sm:justify-between border-t border-muted-foreground/5 items-center shrink-0">
            <DialogClose asChild>
                <Button variant="ghost" className="hidden sm:inline-flex rounded-xl font-black text-[10px] uppercase tracking-widest text-muted-foreground hover:bg-background h-12 cursor-pointer">
                    Discard
                </Button>
            </DialogClose>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Button
                    variant="outline"
                    disabled={isLoadingCash}
                    onClick={() => onCheckOut('cod')}
                    className="w-full sm:w-auto rounded-xl h-12 px-6 font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer border-2 hover:bg-primary/5 transition-all active:scale-95"
                >
                    {isLoadingCash ? <Spinner /> : <>
                        <LandmarkIcon className="size-3.5 mr-2" />
                        Cash Order
                    </>}
                </Button>
                <Button
                    disabled={isLoadingCredit}
                    onClick={() => onCheckOut('card')}
                    className="w-full sm:w-auto rounded-xl h-12 px-8 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 cursor-pointer bg-primary text-primary-foreground transition-all active:scale-95"
                >
                    <div className="flex items-center gap-2">
                        {isLoadingCredit ? <Spinner /> :
                            <>
                                <CreditCardIcon className="size-3.5" />
                                Pay by Card
                            </>
                        }
                    </div>
                </Button>
            </div>
        </DialogFooter>
    );
}
