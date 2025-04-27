"use client";

import { useState } from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import {
  FaInstagram,
  FaLinkedin,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
// import amex from "../images/amex.svg";
// import apple from "../images/apple.svg";
// import googlepay from "../images/googlepay.svg";
// import mastercard from "../images/mastercard.svg";
// import paypal from "../images/paypal.svg";

export default function Footer() {
  const [mettaMuseOpen, setMettaMuseOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [followUsOpen, setFollowUsOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      {/* Top Newsletter and Contact Info */}
      <div className={styles.topSection}>
        <div className={styles.newsletter}>
          <h4>BE THE FIRST TO KNOW</h4>
          <p>Sign up for updates from mettà muse.</p>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Enter your e-mail..." />
            <button>Subscribe</button>
          </div>
        </div>

        <div className={styles.contact}>
          <h4>CONTACT US</h4>
          <small>+44 221 133 5360</small>
          <small>customercare@mettamuse.com</small>
          <h4>CURRENCY</h4>
          <p>🇺🇸 - USD</p>
          <small>
            Transactions will be completed in Euros and currency reference is
            available on hover.
          </small>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottomSection}>
        {/* Collapsible mettà muse Section */}
        <div
          className={`${styles.collapsibleSection} ${styles.mettaMuseSection}`}
        >
          <h5
            onClick={() => setMettaMuseOpen(!mettaMuseOpen)}
            className={styles.collapsibleTitle}
          >
            mettà muse
            {mettaMuseOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h5>
          <div
            className={`${styles.collapsibleContent} ${
              mettaMuseOpen ? styles.open : ""
            }`}
          >
            <p>About Us</p> <p>Stories</p>
            <p>Artisans</p>
            <p>Boutiques</p>
            <p>Contact Us</p>
            <p>EU Compliances Docs</p>
          </div>
        </div>

        {/* Collapsible Quick Links Section */}
        <div
          className={`${styles.collapsibleSection} ${styles.quickLinksSection}`}
        >
          <h5
            onClick={() => setQuickLinksOpen(!quickLinksOpen)}
            className={styles.collapsibleTitle}
          >
            QUICK LINKS
            {quickLinksOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h5>
          <div
            className={`${styles.collapsibleContent} ${
              quickLinksOpen ? styles.open : ""
            }`}
          >
            <p>Orders & Shipping</p>
            <p>Join/Login as a Seller</p>
            <p>Payment & Pricing</p>
            <p>Return & Refunds</p>
            <p>FAQs</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>

        {/* Collapsible Follow Us Section */}
        <div
          className={`${styles.collapsibleSection} ${styles.followUsSection}`}
        >
          <h5
            onClick={() => setFollowUsOpen(!followUsOpen)}
            className={styles.collapsibleTitle}
          >
            FOLLOW US
            {followUsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h5>
          <div
            className={`${styles.collapsibleContent} ${
              followUsOpen ? styles.open : ""
            }`}
          >
            <div className={styles.socialIcons}>
              <FaInstagram size={20} />
              <FaLinkedin size={20} />
            </div>
          </div>
        </div>

        {/* Payment Icons */}
        <div className={styles.paymentIcons}>
          <Image
            src="/images/googlepay.svg"
            alt="Google Pay"
            width={40}
            height={50}
          />
          <Image src="/images/paypal.svg" alt="Paypal" width={40} height={50} />
          <Image
            src="/images/mastercard.svg"
            alt="Mastercard"
            width={40}
            height={50}
          />
          <Image src="/images/amex.svg" alt="Amex" width={40} height={50} />
          <Image
            src="/images/apple.svg"
            alt="Apple Pay"
            width={40}
            height={50}
          />
        </div>
      </div>

      <div className={styles.copyRight}>
        Copyright © 2023 mettamuse. All rights reserved.
      </div>
    </footer>
  );
}
