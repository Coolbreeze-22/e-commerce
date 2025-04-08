import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Admin from "./components/Admin/Admin";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import { useEffect } from "react";
import { fetchProducts } from "./controller/productController";
import { useDispatch } from "react-redux";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductDetails from "./components/AllProducts/ProductDetails/ProductDetails";
import ScrollRestoration from "./components/utils/ScrollRestoration";
import Cart from "./components/Cart/Cart";
import RelatedProducts from "./components/Home/RelatedProducts/RelatedProducts";
import Checkout from "./components/Checkout/Checkout";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(dispatch);
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products/cart/checkout" element={<Checkout />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
