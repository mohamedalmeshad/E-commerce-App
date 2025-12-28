'use client'
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas/auth.schema"

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
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { LockIcon, MailIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { toast } from "sonner"


type LoginFormData = z.infer<typeof LoginSchema>

export default function Login() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  })

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true)
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: '/',
      redirect: true
    })
  }

  if (searchParams.get('error') == "CredentialsSignin") {
    if (!error) setError("Invalid Email Or Password.")
  }
  useEffect(() => {
    if (searchParams.get("reason") === "unauthorized") {
      toast.error("You need to sign in first.");
    }
  }, [searchParams]);
  return (
    <div className="container mx-auto px-4 min-h-[80vh] flex justify-center items-center py-16">
      <div className="w-full max-w-[480px] space-y-8">

        {/* Log in Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Log In</h1>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Identify your credentials to proceed</p>
        </div>

        <Card className="rounded-[2.5rem] border-2 border-primary/5 shadow-2xl shadow-primary/5 bg-white overflow-hidden relative">
          {/* Visual Flare */}
          <div className="absolute top-0 right-0 size-32 bg-primary/5 -translate-y-1/2 translate-x-1/2 blur-3xl rounded-full" />



          <CardContent className="p-10">
            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FieldGroup className="space-y-6">
                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                        Email
                      </FieldLabel>
                      <div className="relative group/field">
                        <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        <Input
                          {...field}
                          id="login-email"
                          type="email"
                          onFocus={() => setError(null)}
                          placeholder="user@network.com"
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

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center justify-between mb-2 pr-1">
                        <FieldLabel htmlFor="login-password" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                          Password
                        </FieldLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative group/field">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        <Input
                          {...field}
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          onFocus={() => setError(null)}
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
                  {isLoading ? <Spinner className="size-6 text-white" /> : "Log IN"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          {"Don't Have an account? "}
          <Link
            href="/auth/signup"
            className="text-primary hover:underline ml-2"
          >
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  )
}
