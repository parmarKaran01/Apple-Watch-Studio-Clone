/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./ProductCarousel.module.css";
import { useEffect, useRef, useCallback } from "react";
import Loader from "./Loader";
import { useStudio } from "@/context/StudioContext";

// interface Product {
//   currentPrice: string;
//   productName: string;
//   watchbandImage: {
//     srcSet: {
//       src: string;
//     };
//   };
//   watchcaseImage: {
//     srcSet: {
//       src: string;
//     };
//   };
//   selected: boolean;
// }

interface ProductCarouselProps {
  products: any[];
  onSelect: (product: any) => void;
  step: number | null;
  selectedProduct: any;
  showSideView: boolean;
}

const ProductCarousel = ({
  products,
  onSelect,
  step,
  selectedProduct,
  showSideView,
}: ProductCarouselProps) => {
  const { loading } = useStudio();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Find the index of the selected product based on step
  const getSelectedIndex = () => {
    return products.findIndex(
      (p) => p?.productName === selectedProduct?.productName
    );
  };

  // Scroll to selected product
  const scrollToSelected = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const centerLine = container.offsetWidth / 2;
    const selectedCard = container.children[getSelectedIndex()];

    if (selectedCard) {
      const cardRect = selectedCard.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const cardCenterX =
        cardRect.left - containerRect.left + cardRect.width / 2;
      const scrollAdjustment = cardCenterX - centerLine;

      container.scrollBy({
        left: scrollAdjustment,
        behavior: "smooth",
      });
    }
  }, [getSelectedIndex]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const containerWidth = scrollContainer.offsetWidth;

    // Find the product that intersects with the center line
    const cards = Array.from(scrollContainer.children);
    const intersectingCard = cards.find((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      // Check if the card's center is closest to the viewport center
      return Math.abs(cardCenter - containerWidth / 2) < rect.width / 2;
    });

    if (intersectingCard) {
      const index = cards.indexOf(intersectingCard);
      const centerProduct = products[index];

      if (
        centerProduct &&
        centerProduct?.productName !== selectedProduct?.productName
      ) {
        onSelect(centerProduct);
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [products, selectedProduct]);

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
      key={step}
    >
      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <>
          <div ref={scrollRef} className={styles.productsWrapper}>
            {products.map((product, index) => (
              <motion.div
                key={product.productName}
                className={`${styles.productCard}`}
              >
                <div className={styles.imageWrapper}>
                  <AnimatePresence mode="wait">
                    {showSideView && index === getSelectedIndex() ? (
                      <motion.div
                        key={
                          showSideView && index === getSelectedIndex()
                            ? "side"
                            : "front"
                        }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={selectedProduct?.kitAltImage?.srcSet?.src}
                          alt={selectedProduct?.productName}
                          fill
                        />
                      </motion.div>
                    ) : (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          key={
                            showSideView && index === getSelectedIndex()
                              ? "side"
                              : "front"
                          }
                        >
                          {step !== 1 && (
                            <Image
                              src={product?.watchbandImage?.srcSet?.src}
                              alt={product?.productName}
                              fill
                            />
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          key={
                            showSideView && index === getSelectedIndex()
                              ? "side"
                              : "front"
                          }
                        >
                          {step !== 2 && (
                            <Image
                              src={product?.watchcaseImage?.srcSet?.src}
                              alt={product?.productName}
                              fill
                            />
                          )}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={showSideView ? "side" : "front"}
            >
              {step === 1 && !showSideView && (
                <Image
                  src={selectedProduct?.watchbandImage?.srcSet?.src}
                  alt={selectedProduct?.productName}
                  fill
                  className={styles.outsideImage}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={showSideView ? "side" : "front"}
            >
              {step === 2 && !showSideView && (
                <Image
                  src={selectedProduct?.watchcaseImage?.srcSet?.src}
                  alt={selectedProduct?.productName}
                  fill
                  className={styles.outsideCaseImage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

export default ProductCarousel;
