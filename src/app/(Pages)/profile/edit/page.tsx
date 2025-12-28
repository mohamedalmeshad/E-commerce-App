'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';
import { Settings2Icon, ArrowLeftIcon } from "lucide-react";
import Link from 'next/link';
import UpdateProfileForm from '@/components/UpdateProfileForm/UpdateProfileForm';
import UpdatePasswordForm from '@/components/UpdatePasswordForm/UpdatePasswordForm';

export default function EditProfilePage() {
    const { data: session } = useSession();

    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            {/* Header section with premium styling */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <Link href="/profile" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all group mb-4">
                        <ArrowLeftIcon className="size-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Identity
                    </Link>
                    <div className="flex items-center gap-3">
                        <Settings2Icon className="size-6 text-primary" />
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                            Configuration
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                        Account <span className="text-primary italic">Settings</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                        Refine your personal coordinates and reinforce your account security barriers.
                    </p>
                </div>

                <div className="hidden md:flex gap-6 items-center bg-muted/30 px-8 py-6 rounded-[2.5rem] border border-primary/5 shadow-2xl shadow-primary/5 group transition-all">
                    <div className="size-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        {session?.user?.name?.[0].toUpperCase() || 'U'}
                    </div>
                    <div className="space-y-1">
                        <p className="text-xl font-black tracking-tight">{session?.user?.name || 'User Name'}</p>
                        <div className="flex items-center gap-2">
                            <Badge className="text-[9px] font-black uppercase tracking-widest h-5 px-2 bg-primary/10 text-primary border-none">
                                {session?.user?.role || 'Customer'}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{session?.user?.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* 1. Update Profile Information */}
                <div className="lg:col-span-12 xl:col-span-7">
                    <UpdateProfileForm />
                </div>

                {/* 2. Update Password section */}
                <div className="lg:col-span-12 xl:col-span-5">
                    <UpdatePasswordForm />
                </div>
            </div>
        </div>
    );
}
