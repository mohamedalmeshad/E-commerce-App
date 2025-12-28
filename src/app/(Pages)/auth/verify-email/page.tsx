'use client'
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { VerifyEmailSchema } from "@/schemas/auth.schema"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {
    Field,
    FieldGroup,
} from "@/components/ui/field"
import { verifyResetCodeAction } from "@/actions/auth.actions"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { TimerIcon, ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'


type VerifyEmailFormData = z.infer<typeof VerifyEmailSchema>

export default function VerifyEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<VerifyEmailFormData>({
        resolver: zodResolver(VerifyEmailSchema),
        defaultValues: {
            resetCode: "",
        },
        mode: "onChange",
    })

    async function onSubmit(data: VerifyEmailFormData) {
        setIsLoading(true)
        try {
            const result = await verifyResetCodeAction(data.resetCode);
            if (result.status == "Success") {
                router.push("/auth/reset-password");
            } else {
                setError("Security code verification failed.");
            }
        } catch (error) {
            console.log(error)
            setError("Communication link error.");
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 min-h-[80vh] flex justify-center items-center py-16">
            <div className="w-full max-w-[480px] space-y-8">

                {/* Portal Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Verify Identity</h1>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Input the code we sent you</p>
                </div>

                <Card className="rounded-[2.5rem] border-2 border-primary/5 shadow-2xl shadow-primary/5 bg-white overflow-hidden relative">
                    <CardContent className="p-10">
                        <form id="verify-email-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                            <div className="space-y-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">
                                    Enter 6-Digit Authentication Code
                                </p>
                                <FieldGroup className="flex justify-center">
                                    {/* Code */}
                                    <Controller
                                        name="resetCode"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <InputOTP
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    pattern={REGEXP_ONLY_DIGITS}
                                                    maxLength={6}
                                                    onFocus={() => setError(null)}
                                                    containerClassName="flex justify-center gap-3"
                                                >
                                                    <InputOTPGroup className="gap-2">
                                                        <InputOTPSlot index={0} className="size-12 rounded-xl border-2 font-black text-lg bg-muted/10" />
                                                        <InputOTPSlot index={1} className="size-12 rounded-xl border-2 font-black text-lg bg-muted/10" />
                                                        <InputOTPSlot index={2} className="size-12 rounded-xl border-2 font-black text-lg bg-muted/10" />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator className="text-primary/20" />
                                                    <InputOTPGroup className="gap-2">
                                                        <InputOTPSlot index={3} className="size-12 rounded-xl border-2 font-black text-lg bg-muted/10" />
                                                        <InputOTPSlot index={4} className="size-12 rounded-xl border-2 font-black text-lg bg-muted/10" />
                                                        <InputOTPSlot index={5} className="size-12 rounded-xl border-2 font-black text-lg bg-muted/10" />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </div>

                            {error &&
                                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 text-destructive text-center text-xs font-bold uppercase tracking-widest">
                                    {error}
                                </div>
                            }

                            <div className="pt-4">
                                <Button type="submit" disabled={isLoading} className="w-full h-16 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer">
                                    {isLoading ? <Spinner className="size-6 text-white" /> : "Confirm Identity"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="flex flex-col items-center gap-6">
                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        <TimerIcon className="size-3" />
                        Code valid for 10 minutes
                    </p>
                    <Link
                        href="/auth/forgot-password"
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ChevronLeftIcon className="size-3 group-hover:-translate-x-1 transition-transform" />
                        Resend Code
                    </Link>
                </div>
            </div>
        </div>
    )
}
