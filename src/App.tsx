import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
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
import AllProducts from "./components/Home/AllProducts/AllProducts";
import ProductDetails from "./components/Home/AllProducts/ProductDetails/ProductDetails";
import ScrollRestoration from "./components/ScrollRestoration/ScrollRestoration";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(dispatch);
  }, []);

  return (
    <BrowserRouter>
      <ScrollRestoration />
      <main>
        <Routes>
          <Route path="*" element={<Navigate replace to="/home" />} />
          <Route
            path="/home"
            element={
              <Navbar>
                <Home />
              </Navbar>
            }
          />
          <Route
            path="/home/products"
            element={
              <Navbar>
                <AllProducts />
              </Navbar>
            }
          />
          <Route
            path="/account/product-details/:id"
            element={
              <Navbar>
                <ProductDetails />
              </Navbar>
            }
          />
          <Route
            path="/contact"
            element={
              <Navbar>
                <Contact />
              </Navbar>
            }
          />
          <Route
            path="/login"
            element={
              <Navbar>
                <Login />
              </Navbar>
            }
          />
          <Route
            path="/register"
            element={
              <Navbar>
                <Register />
              </Navbar>
            }
          />
          <Route
            path="/account"
            element={
              <Navbar>
                <Account />
              </Navbar>
            }
          />
          <Route
            path="/about"
            element={
              <Navbar>
                <About />
              </Navbar>
            }
          />
          <Route
            path="/admin"
            element={
              <Navbar>
                <Admin />
              </Navbar>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
