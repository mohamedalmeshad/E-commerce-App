'use client';

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon, EyeIcon, EyeOffIcon, ShieldCheckIcon } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdatePasswordSchema } from "@/schemas/profile.schema"
import { Spinner } from '@/components/ui/spinner';
import { Controller, useForm } from 'react-hook-form';
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field"
import { updatePasswordAction } from '@/actions/user.actions';
import { UpdatePasswordData } from '@/interfaces';

export default function UpdatePasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<UpdatePasswordData>({
        resolver: zodResolver(UpdatePasswordSchema),
        defaultValues: {
            currentPassword: '',
            password: '',
            rePassword: '',
        },
        mode: "onChange",
    });

    async function handleUpdatePassword(data: UpdatePasswordData) {
        setIsLoading(true);
        try {
            const resData = await updatePasswordAction(data);
            if (resData.message === "success") {
                form.reset();
                toast.success("Security barriers reinforced. Please log in with your new credentials...");
                setTimeout(() => {
                    signOut({ callbackUrl: '/auth/login' });
                }, 2500);
            } else {
                toast.error(resData.message || "Failed to update credentials.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network protocols interrupted.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="border-2 shadow-sm border-orange-500/20 h-full rounded-4xl overflow-hidden">
            <CardHeader className="border-b bg-muted/10 px-8 py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-600">
                        <LockIcon className="size-5" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">Security & Password</CardTitle>
                        <CardDescription>Secure your account with a strong password.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <form onSubmit={form.handleSubmit(handleUpdatePassword)} className="space-y-8">
                    <FieldGroup className="space-y-6">
                        {/* Current Password */}
                        <Controller
                            name="currentPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="current-password" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        Current Password
                                    </FieldLabel>
                                    <div className="relative group/field">
                                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                                        <Input
                                            {...field}
                                            id="current-password"
                                            type={showCurrentPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-14 pl-12 pr-12 rounded-xl bg-muted/10 border-2 focus:border-primary/20 focus:bg-white transition-all font-bold"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                                        >
                                            {showCurrentPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                                        </button>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* New Password */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="new-password" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        New Password
                                    </FieldLabel>
                                    <div className="relative group/field">
                                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                                        <Input
                                            {...field}
                                            id="new-password"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-14 pl-12 pr-12 rounded-xl bg-muted/10 border-2 focus:border-primary/20 focus:bg-white transition-all font-bold"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                                        >
                                            {showNewPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                                        </button>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* Confirm Password */}
                        <Controller
                            name="rePassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="re-password" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        Confirm Password
                                    </FieldLabel>
                                    <div className="relative group/field">
                                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                                        <Input
                                            {...field}
                                            id="re-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-14 pl-12 pr-12 rounded-xl bg-muted/10 border-2 focus:border-primary/20 focus:bg-white transition-all font-bold"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                                        >
                                            {showConfirmPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                                        </button>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <div className="pt-6 border-t flex w-full">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="grow h-14 px-10 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-[0.95] transition-all cursor-pointer bg-primary text-primary-foreground"
                        >
                            <div className="flex items-center gap-2">
                                {isLoading ? <Spinner /> : <ShieldCheckIcon className="size-5" />}
                                Update Password
                            </div>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
