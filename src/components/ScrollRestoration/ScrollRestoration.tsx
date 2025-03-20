import { useEffect } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

const ScrollRestoration = () => {
  const location = useLocation();
  type NavigateFunctionWithScrollRestoration = NavigateFunction & {
    scrollRestoration: "auto" | "manual";
  };

  const navigate = useNavigate() as NavigateFunctionWithScrollRestoration;

  // const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    // Scroll to the top on each page navigation
    window.scrollTo(0, 0);

    // Enable scroll restoration when navigating back

    navigate.scrollRestoration = "manual";

    return () => {
      // Disable scroll restoration when component is unmounted

      navigate.scrollRestoration = "auto";
    };
  }, [location, navigate]);

  return null;
};

export default ScrollRestoration;
