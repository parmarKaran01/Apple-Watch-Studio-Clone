import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Fragment } from "react";
import { useStudio } from "@/context/StudioContext";
import styles from "./WatchImage.module.css";
import Loader from "./Loader";

interface WatchImageProps {
  showSideView: boolean;
}

const WatchImage = ({ showSideView }: WatchImageProps) => {
  const { selectedProduct, loading } = useStudio();
  
  return (
    <div className={styles.watchImageWrapper}>
      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={showSideView ? "side" : "front"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {showSideView ? (
              <Image
                src={selectedProduct?.kitAltImage?.srcSet?.src || ""}
                alt="watch-band-image"
                className={styles.image}
                fill
              />
            ) : (
              <Fragment>
                <Image
                  src={selectedProduct?.kitImage?.srcSet?.src || ""}
                  alt="watch-band-image"
                  className={styles.image}
                  fill
                />
              </Fragment>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default WatchImage; 