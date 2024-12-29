import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { collections } from "@/components/data";

interface Product {
  kitAltImage?: {
    srcSet?: {
      src: string;
    };
  };
  kitImage?: {
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
  watchbandImage?: {
    srcSet?: {
      src: string;
    };
  };
  watchcaseImage?: {
    srcSet?: {
      src: string;
    };
  };
}

interface StudioContextType {
  showInventory: boolean;
  setShowInventory: (show: boolean) => void;
  step: number | null;
  setStep: (step: number | null) => void;
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  showSideView: boolean;
  selectedCollection: string;
  handleGetStarted: () => void;
  handleOptionClick: (optionNumber: number) => void;
  handleProductSelect: (product: Product) => void;
  toggleView: () => void;
  setSelectedCollection: (collection: string) => void;
  getSelectedProductDetails: () => {
    name: string | undefined;
    price: string | undefined;
  };
  handleSaveProduct: () => void;
  savedProducts: Product;
  showShareOptions: boolean;
  setShowShareOptions: (show: boolean) => void;
}

interface ApiParams {
  product?: string;
  watchCases?: string[];
  watchBands?: string[];
  section?: string;
  collection?: string;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showInventory, setShowInventory] = useState(false);
  const [step, setStep] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSideView, setShowSideView] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(
    collections[0].value
  );
  const [apiParams, setApiParams] = useState<ApiParams>({
    collection: collections[0].value,
  });
  const [savedProducts, setSavedProducts] = useState<Product>({});
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleGetStarted = () => {
    setShowInventory(true);
  };

  const handleOptionClick = (optionNumber: number) => {
    setStep(optionNumber);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const toggleView = () => setShowSideView((prev) => !prev);

  const getSelectedProductDetails = () => {
    return {
      name: selectedProduct?.productName,
      price: selectedProduct?.currentPrice,
    };
  };

  useEffect(() => {
    setApiParams({ collection: selectedCollection });
    setStep(null);
    setSelectedProduct(null);
  }, [selectedCollection]);

  useEffect(() => {
    if (step !== null && selectedProduct) {
      setApiParams({
        product: selectedProduct.part,
        watchCases: selectedProduct.options?.watch_cases,
        watchBands: selectedProduct.options?.watch_bands,
        section: step === 1 ? "case" : step === 2 ? "bands" : "size",
      });
    }
  }, [step]);

  const getProducts = useCallback(() => {
    setLoading(true);

    axios
      .get("/api/studio-api", { params: apiParams })
      .then((res) => {
        const products = res?.data?.body?.products;
        const defaultProduct = res?.data?.body?.defaultProduct;
        if (products) {
          setProducts(products);
        }
        if (!selectedProduct) {
          setSelectedProduct(defaultProduct);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiParams]);

  useEffect(() => {
    getProducts();
  }, [apiParams]);

  const handleSaveProduct = useCallback(() => {
    if (!selectedProduct) return;
    
    localStorage.setItem('savedProducts', JSON.stringify(selectedProduct));
    
    setSavedProducts(selectedProduct);
    setShowShareOptions(true);
  }, [selectedProduct]);

  // Load saved products on mount
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    setSavedProducts(savedItems);
  }, []);

  const value = {
    showInventory,
    setShowInventory,
    step,
    setStep,
    products,
    selectedProduct,
    loading,
    showSideView,
    selectedCollection,
    handleGetStarted,
    handleOptionClick,
    handleProductSelect,
    toggleView,
    setSelectedCollection,
    getSelectedProductDetails,
    handleSaveProduct,
    savedProducts,
    showShareOptions,
    setShowShareOptions,
  };

  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (context === undefined) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
};
