import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import CartContextProvider from "@/context/CartContext";
import WishlistContextProvider from "@/context/WishlistContext";
import AddressContextProvider from "@/context/AddressContext";
import MainProviders from "@/components/Providers/MainProviders";
import Footer from "@/components/Footer/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: "SHOP.CO | Premium Fashion Destination",
    template: "%s | SHOP.CO"
  },
  description: "Experience the ultimate in fashion with SHOP.CO. Browse our curated collection of premium apparel, accessories, and brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <MainProviders >
          <AddressContextProvider>
            <CartContextProvider>
              <WishlistContextProvider>
                <Navbar />
                <main>
                  {children}
                </main>
                <Toaster />
                <Footer />
              </WishlistContextProvider>
            </CartContextProvider>
          </AddressContextProvider>
        </MainProviders>
      </body>
    </html>
  );
}

