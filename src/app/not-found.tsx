'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CompassIcon, HomeIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] relative flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] bg-primary/5 rounded-full blur-[80px]" />
      </div>

      {/* Compact Content */}
      <div className="container relative z-10 px-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.25em]">
            <AlertTriangle className="size-3" />
            Error 404
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            PAGE NOT <br />
            <span className="text-primary italic">FOUND</span>
          </h1>
        </div>

        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto">
          {"The requested resource doesn't exist in our database."}
        </p>

        {/* Compact Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/">
            <Button className="cursor-pointer h-12 px-8 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
              <HomeIcon className="mr-2 size-4" />
              Home
            </Button>
          </Link>

          <Link href="/products">
            <Button variant="outline" className="cursor-pointer h-12 px-8 rounded-xl text-xs font-black uppercase tracking-widest border-primary/10 hover:bg-primary/5 transition-all">
              <CompassIcon className="mr-2 size-4" />
              Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
