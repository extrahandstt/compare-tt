import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Category from "./pages/Category";
import SubmitPrice from "./pages/SubmitPrice";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { initGA, trackPageView } from "./analytics";
import {useEffect} from "react";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";


export default function App() {
  const [location,setLocation] = useState("all");

useEffect(() => {
  initGA();
  trackPageView();
}, []);

  return (
      <div style={{paddingBottom:"70px"}}>

    <Navbar />

    <Routes>
      <Route
path="/"
element={
<Home
 location={location}
 setLocation={setLocation}
/>
}
/>
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/product/:slug" element={<Product />} />
      <Route path="/submit-price" element={<SubmitPrice />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route
  path="/terms"
  element={<Terms />}
/>
<Route path="/contact" element={<Contact />} />
      <Route
  path="/about"
  element={<About />}
/>
<Route
  path="/categories"
  element={<Categories />}
/>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
    </div>
  );
}