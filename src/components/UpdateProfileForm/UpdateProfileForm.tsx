'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserIcon, MailIcon, PhoneIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod"
import { EditProfileSchema } from "@/schemas/profile.schema"
import { Spinner } from '@/components/ui/spinner';
import { Controller, useForm } from 'react-hook-form';
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field"
import { updateUserProfileAction } from '@/actions/user.actions';
import { UpdateUserProfileData } from '@/interfaces';

export default function UpdateProfileForm() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<UpdateUserProfileData>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            name: session?.user?.name || '',
            email: session?.user?.email || '',
            phone: session?.user?.phone || '',
        },
        mode: "onChange",
    })

    async function handleUpdateDetails(data: UpdateUserProfileData) {
        setIsLoading(true)
        try {
            const resData = await updateUserProfileAction(data);
            if (resData.message === "success") {
                toast.success("Profile coordinates updated. Logging out for security verification...");
                setTimeout(() => {
                    signOut({ callbackUrl: '/auth/login' });
                }, 2500);
            } else {
                toast.error(resData.message || "Failed to update profile.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network protocols interrupted.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (session?.user) {
            form.reset({
                name: session.user.name ?? '',
                email: session.user.email ?? '',
                phone: session.user.phone ?? '',
            });
        }
    }, [session, form]);

    return (
        <Card className="border-2 shadow-sm h-full rounded-4xl overflow-hidden gap-6">
            <CardHeader className="border-b bg-muted/10 px-8 py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <UserIcon className="size-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
                        <CardDescription>Update your name and phone number used for deliveries.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <form onSubmit={form.handleSubmit(handleUpdateDetails)} className="space-y-8">
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="space-y-3">
                                        <FieldLabel htmlFor="profile-name" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                                            Full Name
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                id="profile-name"
                                                type="text"
                                                onFocus={() => setError(null)}
                                                className="h-14 pl-12 rounded-xl bg-muted/10 border-2 focus:border-primary/20 focus:bg-white transition-all font-bold"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter your full name"
                                            />
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/50" />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />
                                        )}
                                    </div>
                                </Field>
                            )}
                        />
                        {/* Phone */}
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="space-y-3">
                                        <FieldLabel htmlFor="profile-number" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                                            Phone Number
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                id="profile-number"
                                                onFocus={() => setError(null)}
                                                className="h-14 pl-12 font-bold border-2 text-lg rounded-xl"
                                                placeholder="Enter your phone number"
                                                type="text"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/50" />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />
                                        )}
                                    </div>
                                </Field>
                            )}
                        />
                        {/* Email */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="space-y-3">
                                        <FieldLabel htmlFor="profile-email" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                                            Email Address
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                id="profile-email"
                                                type="email"
                                                onFocus={() => setError(null)}
                                                className="h-14 pl-12 font-bold border-2 text-lg rounded-xl"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/30" />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />
                                        )}
                                    </div>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    {error && (
                        <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 text-destructive text-center text-xs font-bold uppercase tracking-widest">
                            {error}
                        </div>
                    )}
                    <div className="pt-6 border-t flex w-full">
                        <Button
                            type="submit"
                            className="grow h-14 px-10 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-[0.95] transition-all cursor-pointer"
                            disabled={isLoading}
                        >
                            <div className="flex items-center gap-2">
                                {isLoading ? <Spinner /> : <SaveIcon className="size-5" />}
                                Save Changes
                            </div>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
