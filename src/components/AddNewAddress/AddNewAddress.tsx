'use client'
import React, { useContext, useState } from 'react'
import { z } from "zod"
import { PlusIcon, MapPinIcon, HomeIcon, BriefcaseIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { AddressContext } from '@/context/AddressContext'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema } from '@/schemas/address.schema'
import {
    Field,
    FieldLabel,
    FieldError,
} from "@/components/ui/field"
import { Spinner } from '../ui/spinner'

interface AddNewAddressProps {
    onClick?: () => void;
    className?: string;
}

export default function AddNewAddress({ onClick, className }: AddNewAddressProps) {
    const { addAddress } = useContext(AddressContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    type AddressFormData = z.infer<typeof addressSchema>;

    const form = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: "",
            city: "",
            details: "",
            phone: "",
        },
        mode: "onChange"
    })

    async function onSubmit(data: AddressFormData) {
        try {
            setIsSubmitting(true);
            const success = await addAddress(data);
            setIsSubmitting(false);

            if (success) {
                setIsOpen(false);
                form.reset();
                if (onClick) onClick();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) {
                form.reset()
                form.clearErrors()
            }
        }}>
            <DialogTrigger asChild>
                <Button
                    className={`cursor-pointer rounded-2xl px-8 h-14 font-black text-sm uppercase tracking-wider shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all group ${className}`}
                >
                    <PlusIcon className="mr-2 size-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add New Address
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-4xl shadow-2xl">
                <div className="bg-linear-to-b from-primary/10 to-transparent p-8 pb-4">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="size-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                                <MapPinIcon className="size-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black tracking-tight">New Address</DialogTitle>
                                <DialogDescription className="font-medium text-muted-foreground/80">
                                    Add a new shipping location to your collection.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="px-8 pb-8 pt-4 space-y-5">
                        {/* Label Quick Select */}
                        <div className="space-y-2">
                            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Quick Label</FieldLabel>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => form.setValue("name", "Home")}
                                    className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl font-bold text-xs uppercase tracking-wide transition-all border-2 ${form.watch("name") === "Home"
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50"
                                        }`}
                                >
                                    <HomeIcon className="size-4" />
                                    Home
                                </button>
                                <button
                                    type="button"
                                    onClick={() => form.setValue("name", "Work")}
                                    className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl font-bold text-xs uppercase tracking-wide transition-all border-2 ${form.watch("name") === "Work"
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50"
                                        }`}
                                >
                                    <BriefcaseIcon className="size-4" />
                                    Work
                                </button>
                            </div>
                        </div>

                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address Name (e.g. Home, Office)</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g. My Home"
                                        className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner"
                                    />
                                    {fieldState.invalid && <FieldError className="mt-1 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g. Cairo"
                                        className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner"
                                    />
                                    {fieldState.invalid && <FieldError className="mt-1 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="details"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Details</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g. Street name, building number"
                                        className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner"
                                    />
                                    {fieldState.invalid && <FieldError className="mt-1 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g. 0123456789"
                                        className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner"
                                    />
                                    {fieldState.invalid && <FieldError className="mt-1 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>

                    <DialogFooter className="bg-muted/30 p-8 flex justify-end border-t border-muted-foreground/5 items-center">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto rounded-xl h-12 px-10 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 cursor-pointer bg-primary text-primary-foreground transition-all active:scale-95"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <Spinner />
                                    Saving...
                                </div>
                            ) : (
                                "Save Address"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
