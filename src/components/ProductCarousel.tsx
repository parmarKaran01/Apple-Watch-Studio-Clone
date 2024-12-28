/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./ProductCarousel.module.css";
import { useEffect, useRef } from "react";

interface Product {
  currentPrice: string;
  productName: string;
  watchbandImage: {
    srcSet: {
      src: string;
    };
  };
  watchcaseImage: {
    srcSet: {
      src: string;
    };
  };
  selected: boolean;
}

interface ProductCarouselProps {
  products: any[];
  onSelect: (product: Product) => void;
  step: number;
  selectedCase: any;
  selectedBand: any;
}

const ProductCarousel = ({
  products,
  onSelect,
  step,
  selectedCase,
  selectedBand,
}: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Find the index of the selected product based on step
  const getSelectedIndex = () => {
    let selectedProduct;
    switch (step) {
      case 1:
        selectedProduct = selectedCase;
        break;
      case 2:
        selectedProduct = selectedBand;
        break;
      default:
        selectedProduct = products[0];
    }

    return products.findIndex(
      (p) => p.productName === selectedProduct.productName
    );
  };

  // Scroll to selected product
  const scrollToSelected = () => {
    if (!scrollRef.current) return;

    const selectedIndex = getSelectedIndex();
    const cardWidth = 430; // card width + gap
    const scrollPosition = selectedIndex * cardWidth;
    
    scrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const containerWidth = scrollContainer.offsetWidth;
    const scrollPosition = scrollContainer.scrollLeft;
    const cardWidth = 400; // width + gap

    // Calculate which product should be selected based on scroll position
    const centerIndex = Math.round(
      (scrollPosition + containerWidth / 2 - cardWidth / 2) / cardWidth
    );
    const centerProduct =
      products[Math.max(0, Math.min(centerIndex, products.length - 1))];

    if (centerProduct && !centerProduct.selected) {
      onSelect(centerProduct);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [products]);

  // Scroll to selected product when component mounts or step changes
  useEffect(() => {
    setTimeout(scrollToSelected, 100);
  }, [step]);

  return (
    <motion.div
      className={styles.carouselContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={scrollRef} className={styles.productsWrapper}>
        {products.map((product) => (
          <motion.div
            key={product.productName}
            className={`${styles.productCard} ${
              product.selected ? styles.selected : ""
            }`}
          >
            <div className={styles.imageWrapper}>
              {step !== 1 && (
                <Image
                  src={product.watchbandImage.srcSet.src}
                  alt={product.productName}
                  fill
                />
              )}

              {step !== 2 && (
                <Image
                  src={product.watchcaseImage.srcSet.src}
                  alt={product.productName}
                  fill
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {step === 1 && (
        <Image
          src={selectedBand.watchbandImage.srcSet.src}
          alt={selectedBand.productName}
          fill
          className={styles.outsideImage}
        />
      )}

      {step === 2 && (
        <Image
          src={selectedCase.watchcaseImage.srcSet.src}
          alt={selectedCase.productName}
          fill
          className={styles.outsideCaseImage}
        />
      )}
    </motion.div>
  );
};

export default ProductCarousel;
