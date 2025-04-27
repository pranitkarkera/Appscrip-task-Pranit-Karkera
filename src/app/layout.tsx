import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop Our Products - Logo",
  description:
    "Discover a wide range of high-quality products at Logo. Browse our collection and find the perfect item for you.",
  openGraph: {
    title: "Shop Our Products - Logo",
    description:
      "Discover a wide range of high-quality products at Logo.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SearchProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
