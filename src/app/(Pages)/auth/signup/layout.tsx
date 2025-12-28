import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create a new SHOP.CO account and start shopping for premium fashion.",
};

export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
