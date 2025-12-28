'use client'

import { useContext, useState, useEffect } from "react"
import { CartContext } from "@/context/CartContext"
import Loading from "./loading"
import { toast } from "sonner"
import { clearCartAction, removeFromCartAction, updateCartProductQuantityAction } from "@/actions/cart.actions"
import CartHeader from "@/components/Cart/CartHeader"
import CartItem from "@/components/Cart/CartItem"
import ClearCartDialog from "@/components/Cart/ClearCartDialog"
import CartSummary from "@/components/Cart/CartSummary"
import CartEmptyState from "@/components/Cart/CartEmptyState"

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
      ) : (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <CartHeader numOfCartItems={cartData?.numOfCartItems ?? 0} />
          {(cartData?.numOfCartItems ?? 0) > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-6">
                {cartData?.data.products.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    updatingId={updatingId}
                    removingId={removingId}
                    updateCartItem={updateCartItem}
                    removeCartItem={removeCartItem}
                  />
                ))}

                <ClearCartDialog
                  isConfirmOpen={isConfirmOpen}
                  setIsConfirmOpen={setIsConfirmOpen}
                  removeCart={removeCart}
                  isRemovingCart={isRemovingCart}
                />
              </div>

              {/* Summary Sidebar */}
              <CartSummary
                totalCartPrice={cartData?.data.totalCartPrice ?? 0}
                cartId={cartData?.cartId ?? ''}
                removeCart={() => removeCart(false)}
              />
            </div>
          ) : (
            <div className="text-center">
              <CartEmptyState />
            </div>
          )}
        </div>
      )}
    </>
  )
}
