"use client";

import { useCart } from "@/context/CartContext";
import styles from "./CheckoutPage.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart();
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [clearCart, router]);

  return (
    <>
      <div className={styles.checkoutContainer}>
        <h1 className={styles.successMessage}>Order placed successfully!</h1>
      </div>
    </>
  );
}
