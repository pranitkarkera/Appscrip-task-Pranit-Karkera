"use client";

import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { FaHeartBroken } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import styles from "./Wishlist.module.css";

interface CartProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  category: string; // Ensure category is required
}

interface WishlistProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  category?: string; // Optional in WishlistProduct
}

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const handleAddToCart = (item: WishlistProduct) => {
    setAddingToCart(item.id);

    const cartProduct: CartProduct = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      category: item.category || "Uncategorized", // Provide a default if missing
    };

    addToCart(cartProduct);
    removeFromWishlist(item.id);

    setTimeout(() => setAddingToCart(null), 2000);
  };

  if (wishlist.length === 0) {
    return (
      <div
        className={styles.container}
        style={{ textAlign: "center", padding: "2rem" }}
      >
        <FaHeartBroken size={80} color="#ccc" />
        <h2 style={{ marginTop: "1rem", color: "#555" }}>Empty!!</h2>
        <Link
          href="/"
          style={{
            color: "#777",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Add your favorites.
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Your Wishlist</h1>
      <div className={styles.grid}>
        {wishlist.map((item) => (
          <div key={item.id} className={styles.card}>
            <Image
              src={item.image}
              alt={item.title}
              className={styles.productImage}
              width={150}
              height={50}
            />
            <h5>{item.title}</h5>
            <p>${item.price}</p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <button
                aria-label="Remove from wishlist"
                onClick={() => removeFromWishlist(item.id)}
                className={styles.wishlistBtn}
              >
                Remove
              </button>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(item)}
                disabled={addingToCart === item.id}
              >
                {addingToCart === item.id ? "Adding to Cart..." : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
