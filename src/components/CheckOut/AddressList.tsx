'use client';

import React from 'react';
import { Address } from '@/interfaces/addresses';
import { FieldLabel } from "@/components/ui/field";
import { CheckIcon } from 'lucide-react';

interface AddressListProps {
    addresses: Address[];
    selectedAddressId: string | null;
    onSelectAddress: (id: string) => void;
}

export default function AddressList({ addresses, selectedAddressId, onSelectAddress }: AddressListProps) {
    if (addresses.length === 0) return null;

    return (
        <div className="space-y-4">
            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Saved Addresses
            </FieldLabel>
            <div className="grid gap-3">
                {addresses.map((address: Address) => (
                    <div
                        key={address._id}
                        onClick={() => onSelectAddress(address._id!)}
                        className={`relative p-4 rounded-3xl border-2 transition-all duration-300 cursor-pointer group ${selectedAddressId === address._id
                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
                            : 'border-muted bg-muted/20 hover:border-primary/30'
                            }`}
                    >
                        <div className="flex justify-between items-center gap-4">
                            <div className="space-y-1">
                                <h4 className="font-black text-xs uppercase tracking-tight">{address.name || 'Unnamed Address'}</h4>
                                <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                                    {address.details}, {address.city}
                                </p>
                            </div>
                            {selectedAddressId === address._id && (
                                <div className="size-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground animate-in zoom-in spin-in-90 duration-300">
                                    <CheckIcon className="size-3" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
