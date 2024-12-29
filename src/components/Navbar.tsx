import React, { useState } from "react";
import Image from "next/image";
import styles from "./Navber.module.css";
import CollectionsModal from "./CollectionsModal";
import { useStudio } from "@/context/StudioContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedCollection, showInventory, selectedProduct, handleSaveProduct, showShareOptions, setShowShareOptions } = useStudio();

  const handleCollectionSelect = (collection: string) => {
    setSelectedCollection(collection);
  };

  const handleShare = async (platform: 'twitter' | 'facebook' | 'copy') => {
    const shareUrl = selectedProduct?.kitImage?.srcSet?.src || '';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out my custom watch design!`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        break;
    }
    setShowShareOptions(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Image
          src={
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-design-studio-logo?wid=236&hei=52&fmt=jpeg&qlt=90&.v=1566849941844"
          }
          alt="apple-logo"
          width={90}
          height={19}
        />
      </div>
      {showInventory && (
        <motion.div
          className={styles.rightSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 , delay: 1}}
        >
          <button
            className={styles.collectionsButton}
            onClick={() => setIsModalOpen(true)}
          >
            Collections
          </button>

        <div className={styles.saveButtonWrapper}>
            <button 
              className={styles.saveButton} 
              onClick={() => {
                handleSaveProduct();
                setShowShareOptions(true);
              }}
            >
              Save
            </button>
            <AnimatePresence>
              {showShareOptions && (
                <motion.div 
                  className={styles.shareDropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className={styles.shareHeader}>
                    <h3>Share your design</h3>
                    <button 
                      onClick={() => setShowShareOptions(false)}
                      className={styles.closeButton}
                    >
                      ×
                    </button>
                  </div>
                  <div className={styles.shareButtons}>
                    <button onClick={() => handleShare('twitter')} className={styles.btn}>
                      Share on Twitter
                    </button>
                    <button onClick={() => handleShare('facebook')} className={styles.btn}>
                      Share on Facebook
                    </button>
                    <button onClick={() => handleShare('copy')} className={styles.btn}>
                      Copy Link
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
        </motion.div>
      )}
      <CollectionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleCollectionSelect}
      />
    </div>
  );
};

export default React.memo(Navbar);
