"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { FaHeart, FaAngleLeft } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import styles from "./ProductPage.module.css";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products: initialProducts }: ProductGridProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sortBy, setSortBy] = useState("RECOMMENDED");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize as false

  const { searchQuery } = useSearch();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set isAuthenticated based on token existence
  }, []);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const shuffleArray = (array: Product[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const sortProducts = (productsToSort: Product[]) => {
    switch (sortBy.toUpperCase()) {
      case "PRICE: LOW TO HIGH":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "PRICE: HIGH TO LOW":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "NEWEST FIRST":
        return [...productsToSort].sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        );
      case "POPULAR":
        return [...productsToSort].sort(
          (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
        );
      case "RECOMMENDED":
      default:
        return shuffleArray(productsToSort);
    }
  };

  const searchedProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const filteredProducts = selectedCategory
    ? searchedProducts.filter(
        (product) => product.category === selectedCategory
      )
    : searchedProducts;

  const sortedProducts = sortProducts(filteredProducts);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topBar}>
        <span className={styles.itemCount}>{sortedProducts.length} ITEMS</span>
        <div className={styles.filterHeader}>
          <button className={styles.hideFilter} onClick={toggleSidebar}>
            <FaAngleLeft /> {showSidebar ? "HIDE FILTER" : "SHOW FILTER"}
          </button>

          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option>RECOMMENDED</option>
            <option>NEWEST FIRST</option>
            <option>POPULAR</option>
            <option>PRICE: LOW TO HIGH</option>
            <option>PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>

      <div className={styles.mainContainer}>
        {showSidebar && (
          <Sidebar
            products={products}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        <main className={styles.main}>
          <div className={styles.grid}>
            {sortedProducts.map((product) => (
              <div key={product.id} className={styles.card}>
                <Link
                  href={`/products/${product.id}`}
                  className={styles.cardLink}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={product.image}
                      alt={product.title}
                      title={product.title}
                    />
                  </div>
                  <h5 className={styles.productTitle}>{product.title}</h5>
                </Link>

                <div className={styles.priceWishlistRow}>
                  {isAuthenticated ? (
                    <p className={styles.productPrice}>${product.price}</p>
                  ) : (
                    <p className={styles.pricePrompt}>
                      <Link href="/signin" className={styles.signInLink}>
                        Sign in
                      </Link>{" "}
                      or Create an account to see pricing.
                    </p>
                  )}

                  <button
                    className={`${styles.addToWishlistBtn} ${
                      isInWishlist(product.id) ? styles.active : ""
                    }`}
                    aria-label={
                      isInWishlist(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    onClick={() =>
                      isInWishlist(product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product)
                    }
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            ))}

            {sortedProducts.length === 0 && (
              <p className={styles.noResults}>No products found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
