// app/product/page.tsx
import type { Metadata } from "next";
import { getProducts } from "@/utils/api";
import ProductGrid from "@/app/products/ProductGrid";
import { cookies } from "next/headers";

// SEO metadata
export const metadata: Metadata = {
  title: "Shop Our Products - [Your Store Name]",
  description:
    "Discover a wide range of high-quality products at [Your Store Name]. Browse our collection and find the perfect item for you.",
  openGraph: {
    title: "Shop Our Products - [Your Store Name]",
    description:
      "Discover a wide range of high-quality products at [Your Store Name].",
    images: ["URL_TO_YOUR_LOGO"],
  },
};

export default async function ProductPage() {
  const products = await getProducts();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const isAuthenticated = !!token;

  return <ProductGrid products={products}/>;
}
