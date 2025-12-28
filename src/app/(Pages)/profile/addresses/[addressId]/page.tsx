import React from "react";
import { SpecificAddressResponse } from "@/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, PhoneIcon, HomeIcon, MapIcon, ChevronLeft, BriefcaseIcon } from "lucide-react";
import Link from "next/link";
import { Params } from 'next/dist/server/request/params'
import { getSpecificAddressAction } from "@/actions/address.actions";


export default async function AddressDetailsPage({ params }: { params: Params }) {
    const { addressId } = await params;
    const data: SpecificAddressResponse = await getSpecificAddressAction(addressId as string);
    const address = data?.data;

    if (!address) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold">Address not found</h1>
                <Link href="/profile/addresses" className="text-primary hover:underline mt-4 inline-block">
                    Back to Addresses
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <Link href="/profile/addresses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-all group">
                <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-bold uppercase tracking-widest text-[10px]">Back to Collection</span>
            </Link>

            <div className="relative">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full scale-110" />

                <Card className="border-2 pt-0 border-white/40 shadow-2xl shadow-primary/5 rounded-[2.5rem] overflow-hidden bg-white/60 backdrop-blur-xl">
                    <CardHeader className="bg-muted/30 pb-10 pt-12 px-10 border-b border-primary/5">
                        <div className="flex items-center gap-6">
                            <div className="size-16 rounded-2xl bg-white shadow-lg shadow-primary/5 flex items-center justify-center text-primary ring-4 ring-white/50">
                                {address.name?.toLowerCase() === 'home' ? (
                                    <HomeIcon className="size-8" />
                                ) : address.name?.toLowerCase() === 'work' ? (
                                    <BriefcaseIcon className="size-8" />
                                ) : (
                                    <MapPinIcon className="size-8" />
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em] mb-1 pl-1">Shipping Location</p>
                                <CardTitle className="text-4xl font-black capitalize tracking-tight text-foreground">
                                    {address.name}
                                </CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 text-foreground">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-3 p-6 rounded-3xl bg-white/50 border border-white/40 shadow-sm hover:shadow-md transition-all duration-500 group">
                                    <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                                        <MapIcon className="size-4" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Detailed Address</p>
                                    </div>
                                    <p className="text-xl font-bold leading-relaxed pl-7">
                                        {address.details}
                                    </p>
                                </div>
                                <div className="space-y-3 p-6 rounded-3xl bg-white/50 border border-white/40 shadow-sm hover:shadow-md transition-all duration-500 group">
                                    <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                                        <MapPinIcon className="size-4" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">City / Region</p>
                                    </div>
                                    <p className="text-xl font-bold leading-relaxed pl-7">
                                        {address.city}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3 p-6 rounded-3xl bg-white/50 border border-white/40 shadow-sm hover:shadow-md transition-all duration-500 group">
                                    <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                                        <PhoneIcon className="size-4" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Number</p>
                                    </div>
                                    <p className="text-2xl font-black tracking-tight text-primary pl-7">
                                        {address.phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
