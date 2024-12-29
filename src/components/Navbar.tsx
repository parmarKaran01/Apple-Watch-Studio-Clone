import React, { useState } from "react";
import Image from "next/image";
import styles from "./Navber.module.css";
import CollectionsModal from "./CollectionsModal";
import { useStudio } from "@/context/StudioContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedCollection, showInventory } = useStudio();

  const handleCollectionSelect = (collection: string) => {
    setSelectedCollection(collection);
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

          <button
            className={styles.saveButton}
          >
            Save
          </button>
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
