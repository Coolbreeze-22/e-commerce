import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { RootState } from "./states/redux/store";
import {
  fetchProducts,
  getFlashSaleCountdown,
} from "./controller/productController";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Admin from "./components/Admin/Admin";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ScrollRestoration from "./components/utils/ScrollRestoration";
import Cart from "./components/Cart/Cart";
import RelatedProducts from "./components/Home/RelatedProducts/RelatedProducts";
import Checkout from "./components/Checkout/Checkout";
import Wishlist from "./components/Wishlist/Wishlist";
import Error404 from "./components/Error404/Error404";
import SearchedProducts from "./components/SearchedProducts/SearchedProducts";

function App() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const UserCheckout = ({ children }: { children: React.ReactNode }) => {
    if (user?.id) {
      return children;
    } else {
      return <Navigate to="/login" replace={false} />;
    }
  };
  const UserAuth = ({ children }: { children: React.ReactNode }) => {
    if (!user?.id) {
      return children;
    } else {
      return <Navigate to="/" replace={false} />;
    }
  };

  useEffect(() => {
    fetchProducts(dispatch);
    getFlashSaleCountdown(dispatch);
  }, []);

  return (
    <div>
      <ScrollRestoration />
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<RelatedProducts />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              <UserAuth>
                <Login />
              </UserAuth>
            }
          />
          <Route
            path="/register"
            element={
              <UserAuth>
                <Register />
              </UserAuth>
            }
          />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/products/cart/checkout"
            element={
              <UserCheckout>
                <Checkout />
              </UserCheckout>
            }
          />
          <Route path="/search" element={<SearchedProducts />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
