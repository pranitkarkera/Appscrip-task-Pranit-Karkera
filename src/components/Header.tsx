"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import {
  FaBars,
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import logo from "../../public/logo.png";
import { useSearch } from "@/context/SearchContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    // Check token existence on mount
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) {
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.mobileMenu}>
          <FaBars className={styles.menuIcon} onClick={toggleMenu} />
        </div>

        <div className={styles.logoWrapper}>
          <Link href="/">
            <Image src={logo} alt="Logo" className={styles.logoIcon} />
          </Link>
        </div>

        <div className={styles.logoText}>
          <Link href="/" className={styles.logoTextLink}>
            LOGO
          </Link>
        </div>

        <div className={styles.icons}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.icon} onClick={toggleSearch} />
            {searchOpen && (
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
                placeholder="Search..."
              />
            )}
            <Link href="/wishlist" aria-label="Wishlist">
              <FaHeart className={styles.icon} />
            </Link>
            <Link href="/cart" aria-label="Cart">
              <FaShoppingBag className={styles.icon} />
            </Link>
            <div className={styles.desktopIcons}>
              <Link
                href="/profile" 
                aria-label="Profile"
              >
                <FaUser className={styles.icon} />
              </Link>
              <div className={styles.language}>
                <span>EN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
        <a href="#">SHOP</a>
        <a href="#">SKILLS</a>
        <a href="#">STORIES</a>
        <a href="#">ABOUT</a>
        <a href="#">CONTACT US</a>
      </nav>

      <div className={styles.hero}>
        <h1>DISCOVER OUR PRODUCTS</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
          scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
          dolor.
        </p>
      </div>
    </header>
  );
}
