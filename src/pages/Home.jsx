import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import LocationPicker from "../components/LocationPicker";
import logo from "../assets/comparett-logo.png";
import AdBanner from "../components/AdBanner";


export default function Home({location, setLocation}) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

const categoryIcons = {
  "groceries": "🛒",
  "school-supplies": "📚",
  "building-materials": "🏗️",
  "hardware-tools": "🔨",
  "electronics": "📱",
  "home-kitchen": "🏠",
  "automotive": "🚗",
  "health-beauty": "💄",
  "baby-products": "👶",
  "cleaning-supplies": "🧼",
  "appliances": "🔌",
  "office-supplies": "🖨️",
  "pet-supplies": "🐶",
  "sports-outdoors": "⚽"
};

useEffect(() => {
  fetchTrending();
  fetchProducts();
  fetchCategories();
}, []);

async function fetchProducts() {

  console.log("FETCH PRODUCTS RUNNING");

  const { data, error } = await supabase
    .from("products")
    .select("*");

  console.log("PRODUCTS:", data);
  console.log("PRODUCT ERROR:", error);

  setProducts(data || []);
}

async function fetchCategories() {

  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  setCategories(data || []);

}
async function fetchTrending() {
  const { data } = await supabase
    .from("price_reports")
    .select("product_id");

  const counts = {};

  (data || []).forEach((item) => {
    counts[item.product_id] =
      (counts[item.product_id] || 0) + 1;
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  setTrending(sorted); // ✅ FIXED
}
  
  async function handleSearch(e) {
  const value = e.target.value;
  setTerm(value);

  if (value.length < 2) {
    setResults([]);
    return;
  }

  const { data } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${value}%`);

  setResults(data || []); // ✅ FIXED
}
const searchProducts = async (term) => {
  const { data } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${term}%`);

  return data;
};
const productMap = Object.fromEntries(
  (products || []).map((p) => [
    p.id,
    {
      name: p.name,
      slug: p.slug
    }
  ])
);
  return (
    <div style={{ padding: "20px" }}>
      <div
  style={{
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
color: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  }}
>
  <img
  src={logo}
  alt="CompareTT"
  style={{
    width: "100px",
    height: "100px",
    objectFit: "contain",
    marginBottom: "0px"
  }}
/>

<h1
  style={{
    marginTop: "0px",
    marginBottom: "8px"
  }}
>
  Compare TT Prices
</h1>

<p
  style={{
    fontSize: "18px",
    color: "rgba(255,255,255,0.95)",
    marginTop: "0px"
  }}
>
  Compare prices across Trinidad & Tobago
  before you shop.
</p>


<p
style={{
color:"rgba(255,255,255,0.85)",
lineHeight:"1.5"
}}
>
Find better prices, see what others are paying,
and help the community save money by submitting prices.
</p>
  <LocationPicker
  location={location}
  setLocation={setLocation}
/>
  <input
    placeholder="Search products..."
    value={term}
    onChange={handleSearch}
    style={{
      width: "100%",
      padding: "14px",
      marginTop: "15px",
      borderRadius: "10px",
      border: "2px solid #dcfce7",
      outline:"none",
      boxSizing: "border-box",
      fontSize: "16px"
    }}
  />
</div>

      
      {/* RESULTS */}
      {results.map((p) => (
        <div key={p.id} style={{ marginTop: "10px" }}>
          <Link to={`/product/${p.slug}?location=${location}`}>
            {p.name}
          </Link>
        </div>
      ))}

      <hr />

      <h2 style={{marginTop:"30px"}}>
  🛍 Browse Categories
</h2>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:"15px",
marginBottom:"25px"
}}
>


{categories.map((category,index)=>(


<Link

key={category.id}

to={`/category/${category.slug}`}

style={{
textDecoration:"none",
color:"inherit"
}}

>


<div

style={{

padding:"20px",

borderRadius:"18px",

background:

[
"linear-gradient(135deg,#dbeafe,#eff6ff)",
"linear-gradient(135deg,#dcfce7,#f0fdf4)",
"linear-gradient(135deg,#fef3c7,#fffbeb)",
"linear-gradient(135deg,#fce7f3,#fdf2f8)",
"linear-gradient(135deg,#ede9fe,#f5f3ff)"

][index % 5],

boxShadow:
"0 4px 12px rgba(0,0,0,0.08)",

transition:"0.2s",

minHeight:"100px"

}}

>


<div
style={{
fontSize:"32px",
marginBottom:"10px"
}}
>

{categoryIcons[category.slug] || "🛍️"}

</div>


<h3
style={{
margin:0,
fontSize:"17px"
}}
>

{category.name}

</h3>


<p
style={{
marginTop:"8px",
fontSize:"13px",
color:"#666"
}}
>

Compare prices →

</p>


</div>


</Link>


))}


</div>
<AdBanner slot="3077641350" />

      <h2 style={{ marginTop: "30px" }}>
  🔥 Trending Products
</h2>

<div
  style={{
    display: "grid",
    gap: "12px",
    marginTop: "15px"
  }}
>
  {trending.map(([productId, count]) => (
    productMap[productId] && (

      <Link
        key={productId}
        to={`/product/${productMap[productId].slug}`}
        style={{
          textDecoration: "none",
          color: "inherit"
        }}
      >

        <div
  style={{
    background: "#ffffff",
    borderLeft: "5px solid #16a34a",
            border: "1px solid #e5e5e5",
            borderRadius: "14px",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
        >

          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "17px"
              }}
            >
              🔥 {productMap[productId].name}
            </h3>

            <p
              style={{
                margin: "6px 0 0",
                color: "#777",
                fontSize: "14px"
              }}
            >
              Updated prices: {count}
            </p>
          </div>


          <div
            style={{
              fontSize: "14px",
              color: "#555"
            }}
          >
            View →
          </div>

        </div>

      </Link>
    )
  ))}
  <div
  style={{
    marginTop: "30px",
    padding: "20px",
    background: "#dcfce7",
    border: "1px solid #bbf7d0",
    borderRadius: "12px",
    textAlign: "center"
  }}
>
  <h2>Why CompareTT Prices?</h2>

  <p>
    Save money, compare prices, and help other shoppers
    across Trinidad & Tobago.
  </p>

  <Link
    to="/about"
    style={{
      display: "inline-block",
      marginTop: "10px",
      padding: "10px 20px",
      borderRadius: "8px",
      textDecoration: "none",
      background:"#16a34a",
color:"white",
border:"none"
    }}
  >
    Learn More
  </Link>
</div>
</div>
    </div>
  );
}
    
  