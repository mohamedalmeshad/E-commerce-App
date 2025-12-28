'use client';

import React from 'react';
import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { ShippingAddress } from '@/interfaces/addresses';

interface ManualAddressSectionProps {
    control: Control<ShippingAddress>;
    selectedAddressId: string | null;
    onFocus: () => void;
}

export default function ManualAddressSection({ control, selectedAddressId, onFocus }: ManualAddressSectionProps) {
    return (
        <div className="space-y-6">
            {/* OR Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted-foreground/10" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                    <span className="bg-background px-4 text-muted-foreground">Or Enter Details</span>
                </div>
            </div>

            {/* Manual Entry Form */}
            <form className={`space-y-4 transition-all duration-300 ${selectedAddressId ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City</FieldLabel>
                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                onFocus={onFocus}
                                placeholder="e.g. Cairo"
                                className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner transition-all"
                            />
                            {fieldState.invalid && <FieldError className="mt-1 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="details"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Details</FieldLabel>
                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                onFocus={onFocus}
                                placeholder="e.g. Street name, building number"
                                className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner transition-all"
                            />
                            {fieldState.invalid && <FieldError className="mt-1 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</FieldLabel>
                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                onFocus={onFocus}
                                placeholder="e.g. 01112223333"
                                className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner transition-all"
                            />
                            {fieldState.invalid && <FieldError className="mt-1 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </form>
        </div>
    );
}
