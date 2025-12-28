'use client'
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/schemas/auth.schema"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import Link from "next/link"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { signupAction } from "@/actions/auth.actions"
import { UserIcon, MailIcon, LockIcon, PhoneIcon, CheckCircle2Icon, EyeIcon, EyeOffIcon } from 'lucide-react'

type SignUpFormData = z.infer<typeof signUpSchema>

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailCreated, setIsEmailCreated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: "onChange",
  })


  async function sendData(data: SignUpFormData) {
    setIsLoading(true)
    try {
      const resData = await signupAction(data);

      if (resData.message === "success") {
        setIsEmailCreated(true);
        setError(null);
      } else if (resData.statusMsg) { 
        setError(resData.message)
      }
    } catch (err) {
      setError((err as Error).message || "Identity registration failed.")
    } finally {
      setIsLoading(false);
    }
  }

  if (isEmailCreated) {
    return (
      <div className="container mx-auto px-4 min-h-[80vh] flex justify-center items-center py-16">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-700">
          <Card className="rounded-[3rem] items-center border-2 border-green-500/10 shadow-2xl shadow-green-500/5 bg-white overflow-hidden text-center p-12 space-y-8">
            <div className="inline-flex items-center justify-center size-20 rounded-4xl bg-green-500/10 text-green-600">
              <CheckCircle2Icon className="size-10" />
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-black uppercase tracking-tighter">Account <span className="text-green-600 italic">Created</span></h1>
              <p className="text-muted-foreground font-medium">Your account is ready for use.</p>
            </div>
            <Link href="/auth/login" className="w-full">
              <Button className="cursor-pointer w-full h-16 rounded-2xl bg-green-600 hover:bg-green-700 text-sm font-black uppercase tracking-widest transition-transform hover:scale-[1.02]">
                Log In Now
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 min-h-[90vh] flex justify-center items-center py-16">
      <div className="w-full max-w-2xl space-y-8">

        {/* Portal Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Sign UP</h1>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Start your journey with us</p>
        </div>

        <Card className="rounded-[3rem] border-2 border-primary/5 shadow-2xl shadow-primary/5 bg-white overflow-hidden relative">
          <CardContent className="p-10">
            <form id="signup-form" onSubmit={form.handleSubmit(sendData)} className="space-y-10">
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                      <FieldLabel htmlFor="signup-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                        Full Name
                      </FieldLabel>
                      <div className="relative group/field">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        <Input
                          {...field}
                          id="signup-name"
                          type="text"
                          placeholder="Ex. Operative Zero"
                          className="h-14 pl-12 rounded-xl bg-muted/10 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-bold"
                          aria-invalid={fieldState.invalid}
                        />
                      </div>
                      {fieldState.invalid && <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-1">
                      <FieldLabel htmlFor="signup-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                        Email
                      </FieldLabel>
                      <div className="relative group/field">
                        <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        <Input
                          {...field}
                          id="signup-email"
                          type="email"
                          placeholder="user@network.com"
                          className="h-14 pl-12 rounded-xl bg-muted/10 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-bold"
                          aria-invalid={fieldState.invalid}
                        />
                      </div>
                      {fieldState.invalid && <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-1">
                      <FieldLabel htmlFor="signup-phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                        Phone Number
                      </FieldLabel>
                      <div className="relative group/field">
                        <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        <Input
                          {...field}
                          id="signup-phone"
                          type="text"
                          placeholder="0111 222 3333"
                          className="h-14 pl-12 rounded-xl bg-muted/10 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-bold"
                          aria-invalid={fieldState.invalid}
                        />
                      </div>
                      {fieldState.invalid && <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-1">
                      <FieldLabel htmlFor="signup-password" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                        Password
                      </FieldLabel>
                      <div className="relative group/field">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        <Input
                          {...field}
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-14 pl-12 pr-12 rounded-xl bg-muted/10 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-bold"
                          aria-invalid={fieldState.invalid}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="size-5" />
                          ) : (
                            <EyeIcon className="size-5" />
                          )}
                        </button>
                      </div>
                      {fieldState.invalid && <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Re Password */}
                <Controller
                  name="rePassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-1">
                      <FieldLabel htmlFor="signup-repassword" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                        Re Password
                      </FieldLabel>
                      <div className="relative group/field">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        <Input
                          {...field}
                          id="signup-repassword"
                          type={showRePassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-14 pl-12 pr-12 rounded-xl bg-muted/10 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-bold"
                          aria-invalid={fieldState.invalid}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRePassword(!showRePassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                        >
                          {showRePassword ? (
                            <EyeOffIcon className="size-5" />
                          ) : (
                            <EyeIcon className="size-5" />
                          )}
                        </button>
                      </div>
                      {fieldState.invalid && <FieldError className="mt-2 text-[10px] font-bold uppercase" errors={[fieldState.error]} />}
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
                  {isLoading ? <Spinner className="size-6 text-white" /> : "Register"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          Already Have An Account?{" "}
          <Link
            href="/auth/login"
            className="text-primary hover:underline ml-2"
          >
            Sign In Now
          </Link>
        </p>
      </div>
    </div>
  )
}
