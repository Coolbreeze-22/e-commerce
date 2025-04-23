import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollPositions: { [key: string]: number } = JSON.parse(
      sessionStorage.getItem("scrollPositions") || "{}"
    );

    // Restore scroll position if available
    if (scrollPositions[location.pathname]) {
      window.scrollTo(0, scrollPositions[location.pathname]);
    } else {
      // Scroll to the top if no scroll position is stored
      window.scrollTo(0, 0);
    }

    // Store scroll position when navigating away
    return () => {
      const currentScrollPosition = window.scrollY;
      scrollPositions[location.pathname] = currentScrollPosition;
      sessionStorage.setItem("scrollPositions", JSON.stringify(scrollPositions));
    };
  }, [location]);

  return null;
};

export default ScrollRestoration;
