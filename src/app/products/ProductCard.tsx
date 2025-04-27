"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import styles from "./ProductCard.module.css";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating?: Rating;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [addingToCart, setAddingToCart] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    setAddingToCart(true);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    // Simulate async operation delay (e.g., API call)
    setTimeout(() => {
      setAddingToCart(false);
    }, 2000);
  };

  return (
    <div className={styles.productCardWrapper}>
      <div className={styles.productCard}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.title}
            width={280}
            height={280}
            className={styles.productImage}
            priority={true}
          />
        </div>

        <div className={styles.productDetails}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <p className={styles.productDescription}>{product.description}</p>

          {product.rating && (
            <p className={styles.productRating}>
              ⭐ {product.rating.rate.toFixed(1)} ({product.rating.count}{" "}
              reviews)
            </p>
          )}

          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>

          <div className={styles.actionButtons}>
            <button
              type="button"
              aria-label={
                inWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
              className={`${styles.wishlistBtn} ${
                inWishlist ? styles.active : ""
              }`}
              onClick={toggleWishlist}
            >
              <FaHeart />
            </button>

            <button
              type="button"
              aria-label="Add to cart"
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              <FaShoppingCart />
              <span style={{ marginLeft: "0.5rem" }}>
                {addingToCart ? "Adding to Cart..." : "Add to Cart"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
