"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaAngleLeft } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import styles from "./ProductPage.module.css";
import { Product } from "@/types/product";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sortBy, setSortBy] = useState("RECOMMENDED");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  const { searchQuery } = useSearch();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load products");
        setLoading(false);
      });
  }, []);

  // Check auth token on client mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Shuffle helper
  const shuffleArray = (array: Product[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Sort helper
  useEffect(() => {
  if (loading || error) return;

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
        return productsToSort;
    }
  };

  // Filter products based on searchQuery and selectedCategory
  let filtered = products;

  if (searchQuery) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory) {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory
    );
  }

  // Sort the filtered products
  let sorted = sortProducts(filtered);

  // Shuffle if sortBy is RECOMMENDED
  // if (sortBy.toUpperCase() === "RECOMMENDED") {
  //   const shuffleArray = (array: Product[]) => {
  //     const arr = [...array];
  //     for (let i = arr.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [arr[i], arr[j]] = [arr[j], arr[i]];
  //     }
  //     return arr;
  //   };
  //   sorted = shuffleArray(sorted);
  // }

  if (sortBy.toUpperCase() === "RECOMMENDED") {
      sorted = shuffleArray(sorted);
    }

  // Update the state with sorted products
  setSortedProducts(sorted);
}, [products, searchQuery, selectedCategory, sortBy, loading, error]);


  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

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
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
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
