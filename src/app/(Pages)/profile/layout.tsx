import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your account, addresses, and orders at SHOP.CO.",
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
