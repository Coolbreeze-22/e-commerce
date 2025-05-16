import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { RootState } from "./states/redux/store";
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
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import Checkout from "./components/Checkout/Checkout";
import Wishlist from "./components/Wishlist/Wishlist";
import Error404 from "./components/Error404/Error404";
import SearchedProducts from "./components/SearchedProducts/SearchedProducts";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ManageOrders from "./components/ManageOrders/ManageOrders";
import Users from "./components/Users/Users";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import Countdown from "./components/Countdown/Countdown";
import ResetPassword from "./components/Authentication/ResetPassword/ResetPassword";
import { useStateContext } from "./context/context";

function App() {
  const { isDropdown, setIsDropdown } = useStateContext();
  const { user } = useSelector((state: RootState) => state.userReducer);

  const UserOnly = ({ children }: { children: React.ReactNode }) => {
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

  const AdminOnly = ({ children }: { children: React.ReactNode }) => {
    if (user?.isAdmin) {
      return children;
    } else {
      return <Navigate to="/" replace={false} />;
    }
  };

  return (
    <div>
      <ScrollRestoration />
      <ToastContainer />
      <main onClick={() => isDropdown && setIsDropdown(false)}>
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
          <Route
            path="/reset-password"
            element={
              <UserAuth>
                <ResetPassword />
              </UserAuth>
            }
          />
          <Route
            path="/account"
            element={
              <UserOnly>
                <Account />
              </UserOnly>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin"
            element={
              <AdminOnly>
                <Admin />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminOnly>
                <Users />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminOnly>
                <ManageOrders />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/create-product"
            element={
              <AdminOnly>
                <CreateProduct />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/Countdown"
            element={
              <AdminOnly>
                <Countdown />
              </AdminOnly>
            }
          />
          <Route
            path="/admin/update-product/:id"
            element={
              <AdminOnly>
                <UpdateProduct />
              </AdminOnly>
            }
          />
          <Route
            path="/products/cart/checkout"
            element={
              <UserOnly>
                <Checkout />
              </UserOnly>
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
