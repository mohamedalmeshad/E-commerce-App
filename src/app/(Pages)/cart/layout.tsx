import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart",
    description: "View your shopping cart and proceed to checkout at SHOP.CO.",
};

export default function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
