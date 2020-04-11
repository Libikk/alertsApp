import { useEffect, useState } from 'react';

type returnObject = {
  currentWidth: number
  isMobileView: boolean
  isTabletView: boolean
  isLaptopView: boolean
  isDesktopView: boolean
}

const useWindowWith = (): returnObject => {
  const initialWidthWidth = typeof window !== 'undefined' && window.innerWidth;
  const [currentWidth, setWidth] = useState(initialWidthWidth);

  const isMobileView = currentWidth < 768;
  const isTabletView = currentWidth >= 768 && currentWidth < 1024;
  const isLaptopView = currentWidth >= 1024 && currentWidth < 1280;
  const isDesktopView = currentWidth >= 1280;


  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return { currentWidth, isMobileView, isTabletView, isLaptopView, isDesktopView };
};

export default useWindowWith;
