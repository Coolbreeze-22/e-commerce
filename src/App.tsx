import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Account from "./components/Account/Account";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
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
            path="/contact"
            element={
              <Navbar>
                <Contact />
              </Navbar>
            }
          />
          <Route
            path="/auth"
            element={
              <Navbar>
                <Auth />
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
