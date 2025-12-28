'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import { CartContext } from "@/context/CartContext"
import Loading from "./loading"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import CheckOut from "@/components/CheckOut/CheckOut"
import { CreditCardIcon, ShieldCheckIcon, ShoppingBagIcon, Trash2Icon, AlertTriangleIcon } from "lucide-react"
import { clearCartAction, removeFromCartAction, updateCartProductQuantityAction } from "@/actions/cart.actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Cart() {
  const [removingId, setRemovingId] = useState<null | string>(null);
  const [updatingId, setUpdatingId] = useState<null | string>(null);
  const [isRemovingCart, setIsRemovingCart] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { cartData, setCartData, isLoading, getCart } = useContext(CartContext);

  useEffect(() => {
    if (typeof cartData?.data.products[0]?.product === "string") {
      getCart();
    }
  }, [cartData, getCart]);

  async function removeCartItem(productId: string) {
    setRemovingId(productId)
    const data = await removeFromCartAction(productId);
    if (data.status == 'success') {
      setCartData(data);
      toast.success('Product deleted successfully')
    }
    setRemovingId(null)
  }

  async function removeCart(key: boolean) {
    setIsRemovingCart(true)
    const data = await clearCartAction();
    if (data.message == 'success') {
      setCartData({
        status: 'success',
        numOfCartItems: 0,
        data: { products: [], totalCartPrice: 0 },
      })
      if (key) toast.success('Cart cleared successfully');
      setIsConfirmOpen(false)
    }
    setIsRemovingCart(false)
  }

  async function updateCartItem(productId: string, count: number) {
    setUpdatingId(productId)
    const data = await updateCartProductQuantityAction(productId, count);
    if (data.status == 'success') {
      setCartData(data);
    }
    setUpdatingId(null)
  }

  return (
    <>
      {isLoading || (typeof cartData?.data.products[0]?.product === 'string' && (cartData?.numOfCartItems ?? 0) > 0) ? (
        <Loading />
      ) : (cartData?.numOfCartItems ?? 0) > 0 ? (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <ShoppingBagIcon className="size-3" />
                Secure Checkout
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground text-nowrap">
                Shopping <span className="text-primary italic">Cart</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                Review your selected items and proceed to a secure checkout to complete your order.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <div className="bg-background w-fit border-2 border-primary/10 shadow-xl shadow-primary/5 px-6 py-4 rounded-4xl flex items-center gap-3">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none text-nowrap">Total Items</p>
                  <p className="text-2xl text-center font-black text-primary leading-none tracking-tighter">
                    {String(cartData?.numOfCartItems).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {cartData?.data.products.map((item) => (
                <div key={item._id} className="group relative bg-background rounded-[2.5rem] border-2 border-transparent hover:border-primary/5 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 relative z-10">
                    <Link href={`/products/${item.product._id}`} className="shrink-0">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-muted/30 rounded-4xl overflow-hidden group-hover:scale-105 transition-transform duration-700 shadow-inner">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          width={400}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0 space-y-4 text-center sm:text-left">
                      <div>
                        <Link href={`/products/${item.product._id}`}>
                          <h3 className="text-xl sm:text-2xl font-black text-foreground hover:text-primary transition-colors leading-tight">
                            {item.product.title.split(' ', 7).join(' ')}
                          </h3>
                        </Link>
                        <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-widest flex justify-center sm:justify-start items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-muted">{item.product.brand.name}</span>
                          <span className="size-1 bg-muted-foreground/30 rounded-full" />
                          <span>{item.product.category.name}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="p-1 px-1.5 bg-muted/30 rounded-2xl flex items-center border border-muted-foreground/5">
                          <Button
                            variant="ghost"
                            disabled={item.count == 1 || updatingId == item.product._id}
                            onClick={() => updateCartItem(item.product._id, item.count - 1)}
                            className="h-10 w-10 p-0 rounded-xl hover:bg-background hover:text-primary hover:shadow-sm cursor-pointer"
                          >-</Button>
                          <span className="text-sm w-12 text-center flex justify-center items-center font-black text-foreground">
                            {updatingId == item.product._id ? <Spinner /> : item.count}
                          </span>
                          <Button
                            variant="ghost"
                            disabled={updatingId == item.product._id}
                            onClick={() => updateCartItem(item.product._id, item.count + 1)}
                            className="h-10 w-10 p-0 rounded-xl hover:bg-background hover:text-primary hover:shadow-sm cursor-pointer"
                          >+</Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-3 min-w-[120px]">
                      <span className="text-3xl font-black text-foreground tracking-tighter">{item.price}$</span>
                      <Button
                        variant={'outline'}
                        className="text-[10px] cursor-pointer font-black text-muted-foreground hover:text-destructive uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
                        onClick={() => removeCartItem(item.product._id)}
                      >
                        {removingId == item.product._id ? <Spinner /> : (
                          <>
                            <Trash2Icon className="size-3" />
                            Remove Item
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-16 rounded-4xl cursor-pointer border-2 border-dashed border-muted text-muted-foreground hover:text-destructive hover:bg-destructive/5 hover:border-destructive/30 font-black uppercase tracking-[0.2em] text-xs transition-all group"
                  >
                    <Trash2Icon className="mr-2 size-4 group-hover:shake" />
                    Flush Entire Cart
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] rounded-4xl p-8 border-none shadow-2xl">
                  <DialogHeader className="space-y-4">
                    <div className="size-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mx-auto mb-2">
                      <AlertTriangleIcon className="size-8" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight text-center">Clear Entire Cart?</DialogTitle>
                    <DialogDescription className="text-center font-medium text-muted-foreground leading-relaxed">
                      This action will remove all items from your current session manifest. This cannot be undone. Are you sure you want to proceed?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="grid grid-cols-2 gap-4 mt-6">
                    <Button
                      variant="ghost"
                      onClick={() => setIsConfirmOpen(false)}
                      className="rounded-xl h-12 font-black text-[10px] uppercase tracking-widest hover:bg-muted cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={async () => removeCart(true)}
                      disabled={isRemovingCart}
                      className="rounded-xl h-12 font-black text-[10px] uppercase tracking-widest bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20 cursor-pointer"
                    >
                      {isRemovingCart ? <Spinner /> : "Confirm Clear"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="bg-background rounded-[3rem] border-2 border-primary/5 p-8 shadow-2xl shadow-primary/5 space-y-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Checkout Hub</p>
                  <h4 className="text-2xl font-black text-foreground tracking-tight">Order Architecture</h4>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold bg-muted/30 p-4 rounded-2xl">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{cartData?.data.totalCartPrice}$</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold bg-muted/30 p-4 rounded-2xl">
                    <span className="text-muted-foreground">Shipping Fee</span>
                    <span className="text-emerald-500 uppercase tracking-widest text-[10px]">Complimentary</span>
                  </div>
                  <div className="pt-4 flex justify-between items-end px-2">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">Grand Total</p>
                      <p className="text-4xl font-black text-foreground tracking-tighter leading-none">{cartData?.data.totalCartPrice}$</p>
                    </div>
                    <div className="size-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/30">
                      <CreditCardIcon className="size-6" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <CheckOut removeCart={() => removeCart(false)} cartId={cartData?.cartId} />
                  <Link href={'/products'}>
                    <Button variant="ghost" className="cursor-pointer w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-muted transition-all">
                      Continue Browsing
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-4xl border border-dashed border-primary/20 flex gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheckIcon className="size-6" />
                </div>
                <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
                  Every transaction is encrypted and secured. Your data privacy is our absolute priority during coordinates processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-24 bg-muted/30 rounded-[3rem] border-2 border-dashed border-muted-foreground/10 group hover:border-primary/20 transition-all duration-500">
            <div className="bg-background p-10 rounded-[2.5rem] shadow-xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
              <ShoppingBagIcon className="size-20 text-muted-foreground opacity-10" />
            </div>
            <h2 className="text-3xl font-black mb-4 text-foreground tracking-tighter">Your cart is empty...</h2>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-12 leading-relaxed px-4">
              Looks like you haven’t added any products to your collection yet. Discovery awaits!
            </p>
            <Link href={'/products'}>
              <Button size="lg" className="cursor-pointer rounded-2xl px-12 h-16 font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Explore Shop
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
