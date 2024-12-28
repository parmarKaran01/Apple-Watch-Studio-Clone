import { useState, useEffect } from 'react';

interface ScreenSize {
  isMobile: boolean;
  width: number;
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 768, // Consider mobile if width is less than 768px
        width: window.innerWidth,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return screenSize;
}; 