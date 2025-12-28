import React from 'react';
import { OrderI } from '@/interfaces/order';
import { PackageIcon, HistoryIcon, ShoppingBasketIcon, ArrowRightIcon } from 'lucide-react';
import OrderCard from '@/components/OrderCard/OrderCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUserOrdersAction } from '@/actions/order.actions';

export const dynamic = 'force-dynamic';

export default async function AllOrdersPage() {
  let orders: OrderI[] = [];

  try {
    orders = await getUserOrdersAction();
  } catch (error) {
    console.error('Error fetching orders:', error);
    // orders will remain as empty array
  }

  return (
    <div className="container mx-auto px-2 py-6 md:py-16 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-8 md:mb-16">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-3">
            <HistoryIcon className="size-5 md:size-6 text-primary" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              Archives
            </div>
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight text-foreground">
            Order <span className="text-primary italic">History</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg max-w-xl leading-relaxed">
            A comprehensive terminal for all your successful acquisitions and logs.
          </p>
        </div>

        <div className="w-fit">
          <div className="bg-background border-2 border-primary/10 shadow-2xl shadow-primary/5 px-4 md:px-8 py-3 md:py-5 rounded-3xl md:rounded-4xl flex items-center justify-between gap-6 group hover:border-primary/30 transition-all duration-500">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] leading-none">Total Shipments</p>
              <p className="text-4xl font-black text-primary leading-none tracking-tighter">
                {String(orders?.length ?? 0).padStart(2, '0')}
              </p>
            </div>
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <PackageIcon className="size-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {orders && orders.length > 0 ? (
          <div className="grid gap-8">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-muted/30 rounded-[3rem] border-2 border-dashed border-muted-foreground/10 group hover:border-primary/20 transition-all duration-500">
            <div className="bg-background p-10 rounded-[2.5rem] shadow-xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
              <PackageIcon className="size-20 text-muted-foreground opacity-10" />
            </div>
            <h2 className="text-3xl font-black mb-4 text-foreground tracking-tighter">No orders found...</h2>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-12 leading-relaxed px-4">
              The grand catalog of your orders awaits its first entry. Discover and acquire your first blueprint today.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-12 h-16 font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Link href={'/products'}>
                Explore Blueprints
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
