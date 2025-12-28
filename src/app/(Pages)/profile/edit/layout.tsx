import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account Settings",
    description: "Update your personal information and security settings at SHOP.CO.",
};

export default function ProfileEditLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
