import { Routes, Route, useLocation } from "react-router-dom";
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
import Deals from "./pages/Deals";
import StorePrices from "./pages/StorePrices";
import StoreCategory from "./pages/StoreCategory";
import ShoppingList from "./pages/ShoppingList";
import PartnerForm from "./components/PartnerForm";
import PartnerLanding from "./pages/PartnerLanding";

export default function App() {
  const [location,setLocation] = useState("all");
  const routerLocation = useLocation();

useEffect(() => {
  initGA();
}, []);

useEffect(() => {
  trackPageView();
}, [routerLocation.pathname]);

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
      <Route path="/deals" element={<Deals />} />
      <Route path="/submit-price" element={<SubmitPrice />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/PartnerLanding" element={<PartnerLanding />} />
      <Route
  path="/store/:storeName"
  element={<StorePrices />}
/>
<Route
path="/stores/:type"
element={<StoreCategory />}
/>
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
<Route
  path="/shopping-list"
  element={<ShoppingList />}
/>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route 
path="/partner" 
element={<PartnerForm />} 
/>
    </Routes>
    </div>
  );
}