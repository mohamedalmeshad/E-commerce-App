import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Log In",
    description: "Log in to your SHOP.CO account to access your profile and orders.",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
