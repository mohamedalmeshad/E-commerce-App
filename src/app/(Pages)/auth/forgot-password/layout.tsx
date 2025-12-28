import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Recover your SHOP.CO account password.",
};

export default function ForgotPasswordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
