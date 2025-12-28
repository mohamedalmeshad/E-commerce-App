'use client'
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordSchema } from "@/schemas/auth.schema"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import {
    Field,
    FieldGroup,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { forgotPasswordAction } from "@/actions/auth.actions"
import { Spinner } from "@/components/ui/spinner"
import { MailIcon, ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'


type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    })

    async function onSubmit(data: ForgotPasswordFormData) {
        setIsLoading(true)
        try {
            const result = await forgotPasswordAction(data.email);
            if (result.statusMsg === "success") {
                router.push("/auth/verify-email");
            } else {
                setError("No identity matches this communication matrix.");
            }
        } catch (error) {
            console.log(error);
            setError("Network protocols interrupted.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 min-h-[80vh] flex justify-center items-center py-16">
            <div className="w-full max-w-[480px] space-y-8">

                {/* Portal Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Forgot <span className="text-primary italic">Password</span></h1>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Restore access to your email</p>
                </div>

                <Card className="rounded-[2.5rem] border-2 border-primary/5 shadow-2xl shadow-primary/5 bg-white overflow-hidden relative">
                    <CardContent className="p-10">
                        <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FieldGroup>
                                {/* Email */}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="forgot-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                                                Email
                                            </FieldLabel>
                                            <div className="relative group/field">
                                                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                                                <Input
                                                    {...field}
                                                    id="forgot-email"
                                                    type="email"
                                                    onFocus={() => setError(null)}
                                                    placeholder="user@example.com"
                                                    className="h-14 pl-12 rounded-xl bg-muted/10 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-bold"
                                                    aria-invalid={fieldState.invalid}
                                                />
                                            </div>

                                            {fieldState.invalid && (
                                                <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            {error &&
                                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 text-destructive text-center text-xs font-bold uppercase tracking-widest">
                                    {error}
                                </div>
                            }

                            <div className="pt-4">
                                <Button type="submit" disabled={isLoading} className="w-full h-16 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer">
                                    {isLoading ? <Spinner className="size-6 text-white" /> : "Send Code"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ChevronLeftIcon className="size-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}
