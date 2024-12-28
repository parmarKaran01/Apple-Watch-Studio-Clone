/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */

import styles from "./Landing.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";
import ProductCarousel from "../ProductCarousel";
import axios from "axios";

interface Product {
  kitAltImage?: {
    srcSet?: {
      src: string;
    };
  };
  productName?: string;
  currentPrice?: string;
  part?: string;
  options?: {
    watch_cases?: string[];
    watch_bands?: string[];
  };
  collectionName?: string;
}

const optionsButtonArray = [
  {
    name: "size",
    svg: () => (
      <svg
        height="21"
        viewBox="0 0 16 21"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m0 0h16v21h-16z" fill="none"></path>
        <path
          d="m16 7.8525v1.3326c0 .2273-.0637.4116-.1912.5526-.1274.1414-.2944.2119-.5012.2119h-.3076v3.8988c0 1.7405-1.4109 3.1515-3.1516 3.1515h-2.8064c.2803-.2888.5098-.6262.6733-1h2.1331c1.1863 0 2.1516-.9652 2.1516-2.1515v-6.697c0-1.1863-.9653-2.1515-2.1516-2.1515h-5.6968c-.7747 0-1.449.3842-1.8281 1h-1.1089c.4529-1.1854 1.5923-2 2.937-2h5.6968c1.7224 0 3.1172 1.3831 3.1462 3.0984h.313c.2068 0 .3738.069.5012.2067.1274.1378.1912.3202.1912.5475zm-6.7629 3.724h-.2371v3.0435c0 1.3145-1.0657 2.38-2.3799 2.38h-4.2402c-1.3142 0-2.3799-1.0656-2.3799-2.38v-5.2401c0-1.3143 1.0657-2.3799 2.3799-2.3799h4.2402c1.3142 0 2.3799 1.0656 2.3799 2.3799v.0035h.2371c.1589 0 .2874.053.3855.1589s.147.2463.147.4211v1.025c0 .1749-.0488.3167-.147.4252-.0981.1086-.2266.1628-.3855.1628zm-1.2371-2.1967c0-.7609-.6189-1.3799-1.3799-1.3799h-4.2402c-.761 0-1.3799.619-1.3799 1.3799v5.2401c0 .761.6189 1.38 1.3799 1.38h4.2402c.0986 0 .1948-.0114.2876-.0311.6233-.1328 1.0923-.6866 1.0923-1.3489z"
          fill="#1d1d1f"
        ></path>
      </svg>
    ),
    optionId: 0,
  },
  {
    name: "case",
    svg: () => (
      <svg
        height="21"
        viewBox="0 0 13 21"
        width="13"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m0 0h13v21h-13z" fill="none"></path>
        <path
          d="m12.8088 7.3051c-.1274-.1377-.2944-.2067-.5012-.2067h-.313c-.0291-1.7153-1.4238-3.0984-3.1462-3.0984h-5.6968c-1.7407 0-3.1516 1.411-3.1516 3.1515v6.697c0 1.7405 1.4109 3.1515 3.1516 3.1515h5.6968c1.7407 0 3.1516-1.411 3.1516-3.1515v-3.8988h.3076c.2068 0 .3738-.0706.5012-.2119.1274-.141.1912-.3253.1912-.5526v-1.3326c0-.2273-.0637-.4097-.1912-.5475zm-1.8088 6.5435c0 1.1863-.9653 2.1515-2.1516 2.1515h-5.6968c-1.1863 0-2.1516-.9652-2.1516-2.1515v-6.6971c0-1.1863.9653-2.1515 2.1516-2.1515h5.6968c1.1863 0 2.1516.9652 2.1516 2.1515v6.697z"
          fill="#1d1d1f"
        ></path>
      </svg>
    ),
    optionId: 1,
  },
  {
    name: "band",
    svg: () => (
      <svg
        height="21"
        viewBox="0 0 9 21"
        width="9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m0 0h9v21h-9z" fill="none"></path>
        <path
          d="m8.5 18.5a.5.5 0 0 1 -.5.5h-7a.5.5 0 1 1 0-1h.015a.485.485 0 0 0 .485-.485v-4.8974a3.9956 3.9956 0 0 0 1 .8259v4.0715a1.4779 1.4779 0 0 1 -.0813.485h4.1628a1.4732 1.4732 0 0 1 -.0815-.485v-4.0714a3.9981 3.9981 0 0 0 1-.826v4.8974a.4851.4851 0 0 0 .485.485h.015a.5.5 0 0 1 .5.5zm-1.9187-15.5h-4.1628a1.4732 1.4732 0 0 1 .0815.485v6.515a2 2 0 0 0 4 0v-6.515a1.4779 1.4779 0 0 1 .0813-.485m1.4187-1a.5.5 0 1 1 0 1h-.015a.485.485 0 0 0 -.485.485v6.515a3 3 0 0 1 -6 0v-6.515a.4851.4851 0 0 0 -.485-.485h-.015a.5.5 0 0 1 0-1zm-3 8a.5.5 0 1 0 -.5.5.5.5 0 0 0 .5-.5zm0-2a.5.5 0 1 0 -.5.5.5.5 0 0 0 .5-.5zm0-2a.5.5 0 1 0 -.5.5.5.5 0 0 0 .5-.5z"
          fill="#1d1d1f"
        ></path>
      </svg>
    ),
    optionId: 2,
  },
];

const WatchImage = ({showSideView, sideViewImage} : {showSideView : boolean, sideViewImage: string | undefined}) => {
  return (
    <div className={styles.watchImageWrapper}>
      <AnimatePresence mode="wait">
        <motion.div
          key={showSideView ? 'side' : 'front'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {showSideView ? (
            <Image
              src={sideViewImage || ''}
              alt="watch-band-image"
              className={styles.image}
              fill
            />
          ) : (
            <Fragment>
              <Image
                src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYA33ref_SR_S10_VW_PF?wid=1000&hei=1000&fmt=p-jpg&qlt=95&.v=czdWc1FNWHZRRGZrVTlpcjVQTEJxVHVkcStXUmxwTmtpV2dxUWV1ZU5xeXkvYVhHUzZnbTdlRlQ4aGhRUUYyVXZ6RVMwQXJHUjF3MlcvZ3RFeXhMRDVzaDNYQm9FT2pIMkdXYzlEUEliVWM"
                alt="watch-band-image"
                className={styles.image}
                fill
              />
              <Image
                src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/watch-case-46-aluminum-jetblack-nc-s10_VW_PF+watch-face-46-aluminum-jetblack-s10_VW_PF?wid=1000&hei=1000&fmt=png-alpha&.v=ZkpvU2VZQXB3RnNRVENEZS9Wb2Y3NkVmS05vWHBxQ1hNMzNlZ1l5V3RQRm0xR2lBNEhDZ3RrRjNEOTloOGpFekM4bU8yL1REVmF4VUkrMW5QRGtKeWZZdXM3S3c2TnF5czBINnVYaTd4cVVFV3ZkVVErQ2lxQjUvY3lWaGtLb0N0ellxUDB4dVliN1NPTHhYUld4M0p5am05N0NVWnlUTTNBaW9WT3lDS2lvbmYzRTFGU1cyNFdtdUoxcXBXVFAv"
                alt="watch-dial-image"
                className={styles.image}
                fill
              />
            </Fragment>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

const Landing = () => {
  const { isMobile } = useScreenSize();
  const [showInventory, setShowInventory] = useState(false);
  const [step, setStep] = useState<number | null>(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false)
  const [showSideView, setShowSideView] = useState(false)

  const sideViewImage = selectedProduct?.kitAltImage?.srcSet?.src

  const handleGetStarted = () => {
    setShowInventory(true);
  };

  const handleOptionClick = (optionNumber: number) => {
    setStep(optionNumber);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const getSelectedProductDetails = () => {
    return {
      name: selectedProduct?.productName,
      price: parseFloat(selectedProduct?.currentPrice?.split("$")[1] || ''),
    };
  };

  const { name, price } = getSelectedProductDetails();
  useEffect(() => {
    getProducts();
  }, [step]);

  const getProducts = () => {
    setLoading(true)
    const params = {
      product: selectedProduct?.part,
      watchCases: selectedProduct?.options?.watch_cases,
      watchBands: selectedProduct?.options?.watch_bands,
      section: step === 1 ? "case" : step === 2 ? "bands" : "size",
    };
    axios
      .get("/api/studio-api", {
        params : selectedProduct ? params : {collection : 'apple-watch'},
      })
      .then((res) => {
        const products = res?.data?.body?.products;
        const defaultProduct = res?.data?.body?.defaultProduct
        console.log("products", products);
        if (products) {
          setProducts(products);
        }
        if(!selectedProduct){
            setSelectedProduct(defaultProduct)
        }
      }).finally(() => {
        setLoading(false)
      })
  };

  const toggleView = () => setShowSideView(prev => !prev)
  console.log("slected", selectedProduct);

  console.log("abcs", products);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.container}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.5 }}
      >
        <motion.div className={styles.heroContainerWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={+showInventory}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 0, opacity: !showInventory ? 1 : 0 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {!showInventory && (
                <div className={styles.heroContainer}>
                  <h4 className={styles.appleTitle}>Apple Watch Studio</h4>
                  <div>Choose a case.</div>
                  <div>Pick a band.</div>
                  <div>Create your own style.</div>

                  <button
                    className={styles.getStartedBtn}
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {(step === 0 || step === 1 || step === 2) && showInventory ? (
          <AnimatePresence mode="wait">
            {loading ? (
              <Loader />
            ) : (
                <ProductCarousel
                  products={products}
                  onSelect={handleProductSelect}
                  step={step}
                  selectedProduct={selectedProduct}
                  showSideView={showSideView}
                />
            )}
          </AnimatePresence>
        ) : (
          <motion.div
            className={styles.watchImageContainer}
            animate={{
              scale: !showInventory ? 1 : isMobile ? 0.9 : 0.5,
              y: !showInventory ? 0 : isMobile ? "-25vh" : "-20vh",
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <WatchImage sideViewImage={sideViewImage} showSideView={showSideView}/>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            className={styles.watchDetailsWrapper}
            key={+showInventory}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: showInventory ? 1 : 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div onClick={toggleView}>{showSideView ? 'Front View' : 'Side View'}</div>
            <div>{selectedProduct?.collectionName}</div>
            <div>{`${name}`}</div>

            <div>From ${price}</div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            className={styles.ctaFooter}
            key={+showInventory}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: showInventory ? 1 : 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {optionsButtonArray.map((option) => (
              <div
                key={option.name}
                className={styles.optionsBtn}
                onClick={() => handleOptionClick(option?.optionId)}
              >
                {option.svg()}
                {option.name}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default Landing;
