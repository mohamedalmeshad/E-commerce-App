import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FacebookIcon, GithubIcon, InstagramIcon, MailIcon, TwitterIcon } from 'lucide-react'

export default function Footer() {
    return (
        <footer className='relative bg-background'>
            {/* Refined Newsletter Section - Integrated Layout */}
            <div className='container mx-auto px-4 md:px-0'>
                <div className='bg-accent-foreground rounded-4xl p-6 md:p-10 translate-y-1/2 relative z-20 shadow-2xl'>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
                        <div>
                            <h2 className='text-2xl md:text-4xl font-black uppercase text-background leading-none tracking-tighter'>
                                STAY UP TO DATE ABOUT OUR <br className="hidden md:block" />
                                <span className="text-background/30 italic">LATEST OFFERS</span>
                            </h2>
                        </div>
                        <div className='flex flex-col gap-3 w-full lg:ml-auto'>
                            <div className="relative">
                                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-background/40" />
                                <Input
                                    placeholder="Enter your email address"
                                    className="h-12 pl-12 rounded-xl bg-background/10 border-background/10 text-background placeholder:text-background/30 font-bold focus:border-background/30 transition-all border-none"
                                />
                            </div>
                            <Button className='h-12 cursor-pointer rounded-xl bg-background text-accent-foreground hover:bg-gray-100 font-black uppercase tracking-widest transition-all'>
                                Subscribe to Newsletter
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Matrix */}
            <div className='bg-muted/90 pt-48 pb-12 rounded-t-[4rem]'>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 pb-16 border-b border-primary/5">

                        {/* Brand Signature */}
                        <div className='lg:col-span-2 space-y-8'>
                            <div className="space-y-4">
                                <Link href="/" className="text-3xl font-black tracking-tighter uppercase inline-block hover:scale-105 transition-transform">
                                    SHOP.<span className="text-primary italic">CO</span>
                                </Link>
                                <p className='text-muted-foreground text-sm font-medium leading-relaxed max-w-xs'>
                                    Empowering contemporary lifestyles through a curated matrix of premium products and architectural design.
                                </p>
                            </div>

                            {/* Social Connectivity Matrix */}
                            <div className="flex items-center gap-4">
                                {[
                                    { icon: TwitterIcon, label: 'Twitter' },
                                    { icon: FacebookIcon, label: 'Facebook' },
                                    { icon: InstagramIcon, label: 'Instagram' },
                                    { icon: GithubIcon, label: 'Github' }
                                ].map((social, idx) => (
                                    <div
                                        key={idx}
                                        className='group/social size-10 bg-background rounded-xl flex justify-center items-center cursor-pointer border border-primary/5 shadow-sm hover:bg-accent-foreground hover:scale-110 transition-all duration-300'
                                    >
                                        <social.icon className='size-5 text-accent-foreground group-hover/social:text-background transition-colors' />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 lg:col-span-4 gap-12">
                            <div className="space-y-6">
                                <h3 className='text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40'>Company</h3>
                                <ul className="space-y-4">
                                    {['About', 'Features', 'Works', 'Career'].map((item) => (
                                        <li key={item} className="text-sm font-bold text-muted-foreground hover:text-primary cursor-pointer  transition-transform hover:translate-x-1">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h3 className='text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40'>Help</h3>
                                <ul className="space-y-4">
                                    {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                                        <li key={item} className="text-sm font-bold text-muted-foreground hover:text-primary cursor-pointer transition-transform hover:translate-x-1">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h3 className='text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40'>FAQ</h3>
                                <ul className="space-y-4">
                                    {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map((item) => (
                                        <li key={item} className="text-sm font-bold text-muted-foreground hover:text-primary cursor-pointer transition-transform hover:translate-x-1">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h3 className='text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40'>Resources</h3>
                                <ul className="space-y-4">
                                    {['Free eBooks', 'Development', 'Blog', 'Playlists'].map((item) => (
                                        <li key={item} className="text-sm font-bold text-muted-foreground hover:text-primary cursor-pointer transition-transform hover:translate-x-1">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Status Grid */}
                    <div className='flex flex-col md:flex-row items-center justify-between gap-6 mt-10'>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <span>Shop.Co © 2000-2025</span>
                            <span className="size-1 bg-muted-foreground rounded-full opacity-30" />
                            <span className="text-primary italic">All Records Secured</span>
                        </div>

                        {/* Optional Payment Terminal Icons */}
                        <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="relative size-8 bg-background rounded-lg border border-primary/5 flex items-center justify-center p-1.5 shadow-sm overflow-hidden">
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                                    alt="Visa"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <div className="relative size-8 bg-background rounded-lg border border-primary/5 flex items-center justify-center p-1.5 shadow-sm overflow-hidden">
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                    alt="Mastercard"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <div className="relative size-8 bg-background rounded-lg border border-primary/5 flex items-center justify-center p-1.5 shadow-sm overflow-hidden">
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                    alt="PayPal"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
