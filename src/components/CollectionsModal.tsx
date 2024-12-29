import { motion, AnimatePresence } from "framer-motion";
import styles from "./CollectionsModal.module.css";
import { collections } from "./data";
import { useStudio } from "@/context/StudioContext";

interface CollectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (collection: string) => void;
}

const CollectionsModal = ({ isOpen, onClose, onSelect }: CollectionsModalProps) => {
  const { selectedCollection } = useStudio();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={styles.modalContent}>
              {collections.map((collection) => (
                <button
                  key={collection.value}
                  className={`${styles.collectionButton} ${
                    selectedCollection === collection.value ? styles.selected : ''
                  }`}
                  onClick={() => {
                    onSelect(collection.value);
                    onClose();
                  }}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CollectionsModal; 