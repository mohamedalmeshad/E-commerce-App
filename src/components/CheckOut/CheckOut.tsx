'use client';

import React, { useContext, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from 'lucide-react';
import { AddressContext } from '@/context/AddressContext';
import { Address, ShippingAddress } from '@/interfaces/addresses';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from '@/schemas/checkout.schema';
import { createCashOrderAction, createCheckoutSessionAction } from '@/actions/order.actions';

// Parts
import AddressList from './AddressList';
import ManualAddressSection from './ManualAddressSection';
import CheckOutFooter from './CheckOutFooter';
import AddNewAddress from '../AddNewAddress/AddNewAddress';

export default function CheckOut({ cartId, removeCart }: { cartId: string | undefined, removeCart: () => Promise<void> }) {
    const { addresses, getAddresses } = useContext(AddressContext);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [isLoadingCredit, setIsLoadingCredit] = useState(false);
    const [isLoadingCash, setIsLoadingCash] = useState(false);
    const router = useRouter();

    const form = useForm<ShippingAddress>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            city: "",
            details: "",
            phone: ""
        },
        mode: "onChange"
    });

    function handleSelectAddress(id: string) {
        setSelectedAddressId(id);
        form.reset({ city: "", details: "", phone: "" });
        form.clearErrors();
    }

    function handleManualFocus() {
        if (selectedAddressId) {
            setSelectedAddressId(null);
        }
    }

    async function processPayment(shippingAddress: ShippingAddress, type: 'card' | 'cod') {
        if (type === 'card') {
            setIsLoadingCredit(true);
            try {
                const data = await createCheckoutSessionAction(cartId!, shippingAddress);
                if (data.status === 'success' && data.session?.url) {
                    window.location.href = data.session.url;
                }
            } finally {
                setIsLoadingCredit(false);
            }
        } else {
            setIsLoadingCash(true);
            try {
                const data = await createCashOrderAction(cartId!, shippingAddress);
                if (data.status === 'success') {
                    router.push('/allorders');
                    await removeCart();
                }
            } finally {
                setIsLoadingCash(false);
            }
        }
    }

    function onCheckOut(type: 'card' | 'cod') {
        if (selectedAddressId) {
            const selected = addresses.find((a: Address) => a._id === selectedAddressId);
            if (selected) {
                const shippingAddress: ShippingAddress = {
                    details: selected.details,
                    phone: selected.phone,
                    city: selected.city
                };
                processPayment(shippingAddress, type);
            }
        } else {
            form.handleSubmit((data) => {
                processPayment(data, type);
            })();
        }
    };

    return (
        <Dialog onOpenChange={async (open) => {
            if (open) await getAddresses();
        }}>
            <DialogTrigger asChild>
                <Button className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                    Proceed to Checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-4xl shadow-2xl max-h-[90vh] flex flex-col">
                <div className="bg-linear-to-b from-primary/10 to-transparent p-8 pb-4 shrink-0">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="size-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                                <MapPinIcon className="size-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black tracking-tight">Shipping Address</DialogTitle>
                                <DialogDescription className="font-medium text-muted-foreground/80">
                                    Choose a saved address or enter a new one.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <div className="px-8 pb-8 pt-4 overflow-y-auto custom-scrollbar flex-1">
                    <div className="space-y-6">
                        <AddressList
                            addresses={addresses}
                            selectedAddressId={selectedAddressId}
                            onSelectAddress={handleSelectAddress}
                        />

                        <AddNewAddress
                            className="w-full bg-white text-primary border-2 border-primary/10 shadow-none hover:bg-primary/5 h-12 rounded-2xl"
                        />

                        <ManualAddressSection
                            control={form.control}
                            selectedAddressId={selectedAddressId}
                            onFocus={handleManualFocus}
                        />
                    </div>
                </div>

                <CheckOutFooter
                    isLoadingCash={isLoadingCash}
                    isLoadingCredit={isLoadingCredit}
                    onCheckOut={onCheckOut}
                />
            </DialogContent>
        </Dialog>
    );
}
