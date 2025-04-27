// src/app/products/[productId]/page.tsx
import { getProducts } from "@/utils/api";
import { ProductCard } from "@/app/products/ProductCard";

export default async function ProductDetailPage({ params }) {
  const { productId } = params;
  const products = await getProducts();
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <ProductCard product={product} />
    </div>
  );
}
