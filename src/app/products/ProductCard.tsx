// src/components/ProductCard.tsx
"use client";

import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    image: string;
    price: number;
    // Add other product properties as needed
  };
  isAuthenticated?: boolean;
  isInWishlist?: (id: number) => boolean;
  addToWishlist?: (product: any) => void;
  removeFromWishlist?: (id: number) => void;
}

export function ProductCard({
  product,
  isAuthenticated = false,
  isInWishlist = () => false,
  addToWishlist = () => {},
  removeFromWishlist = () => {},
}: ProductCardProps) {
  return (
    <div>
      <Link href={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      {isAuthenticated ? (
        <p>${product.price}</p>
      ) : (
        <p>
          <Link href="/signin">Sign in</Link> to see pricing
        </p>
      )}
      <button
        onClick={() =>
          isInWishlist(product.id)
            ? removeFromWishlist(product.id)
            : addToWishlist(product)
        }
      >
        {isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
      </button>
    </div>
  );
}
