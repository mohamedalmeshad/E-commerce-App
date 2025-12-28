'use client'

import React, { useContext } from 'react'
import { signOut, useSession } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import {
    HeartIcon,
    LogOut,
    MenuIcon,
    ShoppingCartIcon,
    UserIcon,
    SettingsIcon,
    LayoutDashboardIcon,
    HistoryIcon
} from 'lucide-react'
import { CartContext } from '@/context/CartContext'
import { Spinner } from '../ui/spinner'
import { WishlistContext } from '@/context/WishlistContext'
import { cn } from '@/lib/utils'

export default function Navbar() {
    const { cartData } = useContext(CartContext)
    const { wishlistData } = useContext(WishlistContext);
    const { data: session, status } = useSession();

    return (
        <nav className='sticky top-0 inset-x-0 z-50 transition-all duration-300 border-b border-primary/5 bg-white/70 backdrop-blur-xl supports-backdrop-filter:bg-white/60'>
            <div className="container mx-auto py-4 px-2 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center gap-2 md:gap-8">
                    {/* Architectural Branding & Mobile Trigger */}
                    <div className="flex items-center gap-1 md:gap-4">
                        <div className="md:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger className='p-2 hover:bg-muted/50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer'>
                                    <MenuIcon className="size-6 text-foreground" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56 p-2 rounded-2xl border-2 border-primary/5 shadow-2xl">
                                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 font-bold cursor-pointer">
                                        <Link href='/products'>Products</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 font-bold cursor-pointer">
                                        <Link href='/categories'>Categories</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 font-bold cursor-pointer">
                                        <Link href='/brands'>Brands</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Link href='/' className='text-xl md:text-3xl font-black tracking-tighter hover:scale-[1.02] transition-transform'>
                            SHOP.<span className="text-primary italic">CO</span>
                        </Link>
                    </div>

                    {/* Desktop Tactical Navigation */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-2">

                                <NavigationMenuItem key="Products">
                                    <NavigationMenuLink asChild className="group/link px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all cursor-pointer">
                                        <Link href="/products">
                                            Products
                                            <span className="block h-0.5 w-0 bg-primary transition-all group-hover/link:w-full mt-0.5" />
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem key="Categories">
                                    <NavigationMenuLink asChild className="group/link px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all cursor-pointer">
                                        <Link href="/categories">
                                            Categories
                                            <span className="block h-0.5 w-0 bg-primary transition-all group-hover/link:w-full mt-0.5" />
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem key="Brands">
                                    <NavigationMenuLink asChild className="group/link px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all cursor-pointer">
                                        <Link href="/brands">
                                            Brands
                                            <span className="block h-0.5 w-0 bg-primary transition-all group-hover/link:w-full mt-0.5" />
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Operational Actions & Identity Hub */}
                    <div className="flex gap-2 md:gap-4 items-center">
                        {status === "loading" ? (
                            <div className="size-10 flex items-center justify-center">
                                <Spinner />
                            </div>
                        ) : status === "authenticated" ? (
                            <div className="flex items-center gap-2 md:gap-6">
                                {/* Action Section */}
                                <div className="flex items-center gap-1 md:gap-4 border-r border-primary/5 pr-2 md:pr-6">
                                    <Link href='/wishlist' className='group relative p-2 text-muted-foreground hover:text-rose-500 transition-colors'>
                                        <HeartIcon className={cn("size-6 transition-transform group-hover:scale-110", Number(wishlistData?.data?.length) > 0 && "fill-rose-500 stroke-rose-500")} />
                                        {Number(wishlistData?.data?.length) > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-lg shadow-rose-500/20 animate-in fade-in zoom-in duration-300">
                                                {wishlistData?.data?.length}
                                            </span>
                                        )}
                                    </Link>

                                    <Link href='/cart' className='group relative p-2 text-muted-foreground hover:text-primary transition-colors'>
                                        <ShoppingCartIcon className="size-6 transition-transform group-hover:scale-110" />
                                        {Number(cartData?.numOfCartItems) > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white shadow-lg shadow-primary/20 animate-pulse">
                                                {cartData?.numOfCartItems}
                                            </span>
                                        )}
                                    </Link>
                                </div>

                                {/* Identity Hub Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='focus:outline-none group'>
                                        <div className="flex items-center gap-3 px-2 py-1.5 rounded-2xl hover:bg-muted/50 transition-all cursor-pointer">
                                            <div className="size-10 bg-linear-to-br from-primary to-primary-dark text-white rounded-xl flex items-center justify-center text-sm font-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                                {session?.user?.name?.[0].toUpperCase() || 'U'}
                                            </div>
                                            <div className="hidden lg:block text-left mr-1">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Identity Verified</p>
                                                <p className="text-sm font-bold text-foreground leading-none">{session?.user?.name?.split(' ')[0]}</p>
                                            </div>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-64 p-2 rounded-4xl border-2 border-primary/5 shadow-2xl mt-2 animate-in slide-in-from-top-4 duration-300">
                                        <DropdownMenuLabel className="px-4 py-3">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Email </p>
                                            <p className="text-sm font-bold truncate">{session?.user?.email}</p>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-primary/5" />
                                        <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-primary/5 cursor-pointer">
                                            <Link href='/profile' className="flex items-center gap-3">
                                                <LayoutDashboardIcon className="size-4 text-primary" />
                                                <span className="font-bold">Account Dashboard</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-primary/5 cursor-pointer">
                                            <Link href='/profile/edit' className="flex items-center gap-3">
                                                <SettingsIcon className="size-4 text-primary" />
                                                <span className="font-bold">Account Settings</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-primary/5 cursor-pointer">
                                            <Link href='/allorders' className="flex items-center gap-3">
                                                <HistoryIcon className="size-4 text-primary" />
                                                <span className="font-bold">Order History</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-primary/5" />
                                        <DropdownMenuItem
                                            onClick={() => signOut()}
                                            className="rounded-xl px-4 py-3 focus:bg-destructive/5 text-destructive cursor-pointer group/logout"
                                        >
                                            <div className="flex items-center gap-3">
                                                <LogOut className="size-4 group-hover/logout:-translate-x-1 transition-transform" />
                                                <span className="font-black uppercase text-xs tracking-widest">Log out</span>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className='p-2 hover:bg-muted/50 rounded-xl transition-colors focus:outline-none cursor-pointer'>
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="size-6 text-muted-foreground" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-2 border-primary/5 shadow-2xl mt-2 animate-in slide-in-from-top-4 duration-300">
                                    <DropdownMenuLabel className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Identity Gateway</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-primary/5" />
                                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-primary/5 cursor-pointer">
                                        <Link href='/auth/login' className="font-bold">Log In</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-primary/5 cursor-pointer">
                                        <Link href='/auth/signup' className="font-bold">Sign Up</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
