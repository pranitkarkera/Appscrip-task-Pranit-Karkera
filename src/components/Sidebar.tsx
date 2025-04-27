"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { Product } from "@/types/product";

const FILTER_SECTIONS = [
  {
    title: "IDEAL FOR",
    options: ["men's clothing", "jewelery", "electronics", "women's clothing"],
  },
  {
    title: "OCCASION",
    options: ["Casual", "Formal", "Party"],
  },
  {
    title: "WORK",
    options: ["Office", "Outdoor", "Remote"],
  },
  {
    title: "FABRIC",
    options: ["Cotton", "Silk", "Linen"],
  },
  {
    title: "SEGMENT",
    options: ["Premium", "Budget", "Mid-Range"],
  },
  {
    title: "SUITABLE FOR",
    options: ["Summer", "Winter", "All Seasons"],
  },
  {
    title: "RAW MATERIALS",
    options: ["Organic", "Synthetic", "Blend"],
  },
  {
    title: "PATTERN",
    options: ["Solid", "Striped", "Checked"],
  },
];

// Define stable initial states outside the component
const initialExpandedSections = FILTER_SECTIONS.reduce((acc, section) => {
  acc[section.title] = false;
  return acc;
}, {} as Record<string, boolean>);

const initialSelectedOptions = FILTER_SECTIONS.reduce((acc, section) => {
  acc[section.title] = [];
  return acc;
}, {} as Record<string, string[]>);

interface SidebarProps {
  setSelectedCategory: (category: string | null) => void;
}

export default function Sidebar({ setSelectedCategory }: SidebarProps) {
  const [customizable, setCustomizable] = useState(false);
  const [expandedSections, setExpandedSections] = useState(
    FILTER_SECTIONS.reduce((acc, section) => {
      acc[section.title] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [selectedOptions, setSelectedOptions] = useState(
    FILTER_SECTIONS.reduce((acc, section) => {
      acc[section.title] = [];
      return acc;
    }, {} as Record<string, string[]>)
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleCheckboxChange = (sectionTitle: string, option: string) => {
    setSelectedOptions((prev) => {
      const current = prev[sectionTitle];
      if (current.includes(option)) {
        return {
          ...prev,
          [sectionTitle]: current.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          [sectionTitle]: [...current, option],
        };
      }
    });

    if (sectionTitle === "IDEAL FOR") {
      setSelectedCategory(option);
    }
  };

  const handleUnselectAll = (sectionTitle: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [sectionTitle]: [],
    }));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.customizableSection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={customizable}
            onChange={() => setCustomizable((v) => !v)}
          />
          CUSTOMIZABLE
        </label>
      </div>

      {FILTER_SECTIONS.map(({ title, options }) => (
        <div key={title} className={styles.filterSection}>
          <button
            className={styles.filterHeader}
            onClick={() => toggleSection(title)}
            aria-expanded={expandedSections[title]}
            aria-controls={`${title}-content`}
            type="button"
          >
            <span>{title}</span>
            {expandedSections[title] ? (
              <FaChevronUp className={styles.arrowIcon} />
            ) : (
              <FaChevronDown className={styles.arrowIcon} />
            )}
          </button>

          <div
            id={`${title}-content`}
            className={`${styles.filterContent} ${
              expandedSections[title] ? styles.expanded : styles.collapsed
            }`}
          >
            {expandedSections[title] && (
              <>
                <a
                  href="#"
                  className={styles.unselectAll}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleUnselectAll(title);
                  }}
                >
                  Unselect All
                </a>
                <ul className={styles.optionList}>
                  {options.map((option) => (
                    <li key={option}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedOptions[title].includes(option)}
                          onChange={() => handleCheckboxChange(title, option)}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </aside>
  );
}