import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Addresses",
    description: "Manage your saved shipping addresses at SHOP.CO.",
};

export default function ProfileAddressesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
