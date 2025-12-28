import { ProductI } from '@/interfaces';
import React from 'react'
import ProductCard from '@/components/ProductCard/ProductCard';
import { getProductsAction } from '@/actions/product.actions';

export default async function Products() {
  let products: ProductI[] = [];

  try {
    const { data } = await getProductsAction();
    products = data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8'>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            Global Inventory
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            TOTAL <span className="text-primary italic">PRODUCTS</span>
          </h2>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Explore our complete matrix of premium goods, architected for performance and style.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
