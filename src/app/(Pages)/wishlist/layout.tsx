import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wishlist",
    description: "View and manage your personal product wishlist at SHOP.CO.",
};

export default function WishlistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
