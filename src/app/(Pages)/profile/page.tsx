'use client';

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  MapPinIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  ArrowRightIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  HistoryIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Profile() {
  const { data: session } = useSession();
  console.log(session);
  
  const profileLinks = [
    {
      title: 'Order History',
      description: 'Registry of architectural acquisitions and shipment logs.',
      href: '/allorders',
      icon: <HistoryIcon className="size-6" />,
      color: 'text-blue-500'
    },
    {
      title: 'Addresses',
      description: 'Manage your primary and secondary delivery coordinates.',
      href: '/profile/addresses',
      icon: <MapPinIcon className="size-6" />,
      color: 'text-emerald-500'
    },
    {
      title: 'Wishlist',
      description: 'A curated selection of blueprints reserved for later.',
      href: '/wishlist',
      icon: <HeartIcon className="size-6" />,
      color: 'text-rose-500'
    },
    {
      title: 'Cart',
      description: 'Current collection of items staged for acquisition.',
      href: '/cart',
      icon: <ShoppingCartIcon className="size-6" />,
      color: 'text-amber-500'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <LayoutDashboardIcon className="size-6 text-primary" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              Command Center
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Account <span className="text-primary italic">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            The central terminal for managing your identity, acquisitions, and architectural preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* User Identity */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-[3rem] -z-10 group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="bg-white border-2 border-primary/5 rounded-[3rem] p-8 shadow-2xl shadow-primary/5 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative size-24 bg-linear-to-br from-primary to-primary-dark text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-xl shadow-primary/20">
                  {session?.user?.name?.[0].toUpperCase() || 'U'}
                </div>
              </div>

              <h2 className="text-2xl font-black tracking-tight mb-1">{session?.user?.name || 'Identity Unknown'}</h2>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 truncate w-full px-2">
                {session?.user?.email}
              </p>

              <Badge className="mb-8 bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 h-auto rounded-full">
                {session?.user?.role || 'Customer Account'}
              </Badge>

              <div className="w-full pt-8 border-t border-primary/5 space-y-3">
                <Link
                  href="/profile/edit"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-muted/30 text-[10px] font-black uppercase tracking-widest text-foreground hover:bg-primary hover:text-white transition-all group/btn"
                >
                  <Settings2Icon className="size-4 group-hover/btn:rotate-90 transition-transform duration-500" />
                  Account Settings
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Navigation Grid */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-[2.5rem] -z-10 group-hover:scale-[1.03] transition-transform duration-500" />
                <div className="p-8 bg-white border-2 border-primary/5 rounded-[2.5rem] h-full shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-8">
                    <div className={cn("p-4 bg-muted/30 rounded-2xl group-hover:bg-primary transition-colors duration-500", link.color)}>
                      <div className="group-hover:text-white transition-colors duration-500">
                        {link.icon}
                      </div>
                    </div>
                    <div className="size-10 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowRightIcon className="size-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight text-foreground transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:col-span-12 col-span-1">
          {/* Secondary system status card */}
          <div className="mt-8 relative group">
            <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent rounded-[2.5rem] -z-10" />
            <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <UserIcon className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none mb-1.5">System Status</p>
                  <p className="text-sm font-black text-foreground">Account synchronization active across all architectural nodes.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Secure Terminal Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { cn } from '@/lib/utils'
