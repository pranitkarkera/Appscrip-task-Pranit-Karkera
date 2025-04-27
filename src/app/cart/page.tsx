"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  const router = useRouter();

  const handleCheckout = () => {
    clearCart(); 
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <>
        <div className={styles.emptyCart}>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <Link href="/" className={styles.shopLink}>
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.cartContainer}>
        <h1 className={styles.title}>Your Shopping Cart</h1>

        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th aria-label="Remove item"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className={styles.productCell}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.productImage}
                  />
                  <span>{item.title}</span>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className={styles.quantityInput}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.cartSummary}>
          <p className={styles.total}>
            <strong>Total: </strong>${totalPrice.toFixed(2)}
          </p>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}
