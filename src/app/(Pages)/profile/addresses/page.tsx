'use client'
import React, { useContext, useState } from "react";
import { MapPinIcon, PhoneIcon, HomeIcon, PlusIcon, TrashIcon, MapIcon, Loader2Icon, ChevronLeft, ArrowLeftIcon, BriefcaseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AddressContext } from "@/context/AddressContext";
import Link from "next/link";
import AddNewAddress from "@/components/AddNewAddress/AddNewAddress";
import { removeAddressAction } from "@/actions/address.actions";
import { toast } from "sonner";
import AddressSkeleton from "./loading";

export default function UserAddressesPage() {
    const { addresses, isLoading, setAddresses } = useContext(AddressContext);
    const [removingId, setRemovingId] = useState<string | null>(null);

    async function removeAddress(id: string) {
        setRemovingId(id);
        try {
            const data = await removeAddressAction(id);
            if (data.status === "success") {
                setAddresses(data.data);
                toast.success("Address removed successfully");
            } else {
                toast.error(data.message || "Failed to remove address");
            }
        } catch (error) {
            console.error("Error removing address:", error);
            toast.error("An error occurred while removing the address");
        } finally {
            setRemovingId(null);
        }
    }

    if (isLoading && addresses.length === 0) {
        return <AddressSkeleton />
    }

    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <Link href="/profile" className="inline-flex  items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all group mb-4">
                <ArrowLeftIcon className="size-3 group-hover:-translate-x-1 transition-transform" />
                Back to Identity
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                        <MapPinIcon className="size-3" />
                        Location Management
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                        Saved <span className="text-primary italic">Addresses</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                        Organize your shipping locations for a seamless checkout experience across all your devices.
                    </p>
                </div>
                <AddNewAddress />

            </div>

            {addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-muted/30 rounded-[3rem] border-2 border-dashed border-muted-foreground/20 group hover:border-primary/30 transition-colors duration-500">
                    <div className="bg-background p-8 rounded-4xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500">
                        <MapIcon className="size-16 text-muted-foreground opacity-20" />
                    </div>
                    <h2 className="text-2xl font-black mb-3">No addresses yet</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-10 leading-relaxed">
                        {"Your address book is empty. Add your first shipping address to start shopping with ease."}
                    </p>
                    <div className="flex gap-4">
                        <AddNewAddress className="h-12 px-10 rounded-2xl" />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {addresses.map((address) => (
                        <Card key={address._id} className="group relative border-none shadow-none bg-transparent overflow-visible">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-[2.5rem] -z-10 group-hover:scale-[1.03] transition-transform duration-500" />
                            <CardHeader className="pb-4 flex flex-row  items-center justify-between space-y-0 p-8">
                                <div className="space-y-4">
                                    <div className="p-4 flex justify-center items-center w-fit bg-white shadow-sm rounded-2xl group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500">
                                        {address.name?.toLowerCase() === 'home' ? (
                                            <HomeIcon className="size-6 text-primary" />
                                        ) : address.name?.toLowerCase() === 'work' ? (
                                            <BriefcaseIcon className="size-6 text-primary" />
                                        ) : (
                                            <MapPinIcon className="size-6 text-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black capitalize tracking-tight">
                                            {address.name}
                                        </CardTitle>
                                        <div className="h-1 w-8 bg-primary mt-2 rounded-full transition-all duration-500 group-hover:w-16" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        onClick={() => removeAddress(address._id!)}
                                        disabled={removingId === address._id}
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-full backdrop-blur-sm transition-all cursor-pointer"
                                    >
                                        {removingId === address._id ? (
                                            <Loader2Icon className="size-5 animate-spin" />
                                        ) : (
                                            <TrashIcon className="size-5" />
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="px-8 pb-4 space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 transition-all group-hover:bg-white/80 group-hover:border-primary/10">
                                    <MapIcon className="size-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-foreground leading-snug">
                                            {address.details}
                                        </p>
                                        <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
                                            {address.city}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 transition-all group-hover:bg-white/80 group-hover:border-primary/10">
                                    <PhoneIcon className="size-5 text-primary shrink-0" />
                                    <p className="text-sm font-black text-foreground">
                                        {address.phone}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 pt-4 flex justify-between items-center bg-transparent gap-4">
                                <Link href={`/profile/addresses/${address._id}`} className="flex-1">
                                    <Button className="w-full rounded-xl h-12 font-black text-xs uppercase tracking-widest bg-white border-2 border-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm group-hover:shadow-md cursor-pointer">
                                        View Details
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
