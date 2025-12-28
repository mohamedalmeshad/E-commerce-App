import { getProductsAction } from "@/actions/product.actions";
import ProductCard from "@/components/ProductCard/ProductCard";

export default async function FeaturedProducts() {
    try {
        const { data: products } = await getProductsAction();
        const featuredProducts = products?.slice(0, 4) || [];

        if (featuredProducts.length === 0) {
            return (
                <div className="py-20 text-center">
                    <p className="text-muted-foreground font-black uppercase tracking-widest text-sm">
                        No tactical products found in current sector.
                    </p>
                </div>
            )
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        );
    } catch (error) {
        console.error("FeaturedProducts error:", error);
        return (
            <div className="py-20 text-center">
                <p className="text-destructive font-black uppercase tracking-widest text-sm">
                    Protocol Error: Unable to retrieve featured inventory.
                </p>
            </div>
        )
    }
}
