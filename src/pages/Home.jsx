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
  const [deals, setDeals] = useState([]);
  

const storeTypes = [
  {
    name: "Grocery",
    icon: "🛒",
    slug: "grocery",
    color: "#ecfdf5"
  },
  {
    name: "Pharmacy",
    icon: "💊",
    slug: "pharmacy",
    color: "#eff6ff"
  },
  {
    name: "Beauty",
    icon: "💄",
    slug: "beauty",
    color: "#fdf2f8"
  },
  {
    name: "Furniture",
    icon: "🛋️",
    slug: "furniture",
    color: "#fef7ed"
  },
  {
    name: "Books & Office",
    icon: "📚",
    slug: "books",
    color: "#fefce8"
  }
];
useEffect(() => {
  fetchTrending();
  fetchProducts();
  fetchDeals();
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

async function fetchDeals() {

  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .gte("end_date", new Date().toISOString().split("T")[0])
    .order("created_at", { ascending: false })
    .limit(5);


  console.log(error);

  setDeals(data || []);

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
      <h2 style={{marginTop:"25px"}}>
🔥 Deals Today
</h2>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"12px"
}}
>

{deals.map((deal)=>(

<Link
key={deal.id}
to="/deals"
style={{
textDecoration:"none",
color:"inherit"
}}
>

<div
style={{
background:"#fff",
padding:"12px",
borderRadius:"12px",
boxShadow:"0 2px 8px rgba(0,0,0,.08)"
}}
>

{deal.image_url && (
<img
src={deal.image_url}
alt={deal.title}
style={{
width:"100%",
height:"100px",
objectFit:"contain",
borderRadius:"8px",
background:"#f5f5f5"
}}
/>
)}


<h3
style={{
fontSize:"16px",
margin:"10px 0 5px"
}}
>
{deal.title}
</h3>


<p
style={{
fontSize:"14px",
margin:"5px 0"
}}
>
🏪 {deal.store_name}
</p>


<div>

{deal.regular_price && (
<span
style={{
fontSize:"13px",
marginRight:"8px"
}}
>
<s>${deal.regular_price}</s>
</span>
)}


<span
style={{
color:"green",
fontWeight:"700"
}}
>
${deal.sale_price}
</span>

</div>


</div>

</Link>

))}

</div>


<Link
to="/deals"
style={{
display:"block",
textAlign:"center",
marginTop:"15px"
}}
>
View all deals →
</Link>
<h2>
🏪 Browse Stores
</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:"15px"
}}
>

{storeTypes.map((store)=>(

<Link
key={store.slug}
to={`/stores/${store.slug}`}
style={{
textDecoration:"none",
color:"#333"
}}
>

<div
style={{
background:store.color,
padding:"22px",
borderRadius:"20px",
textAlign:"center",
boxShadow:"0 4px 12px rgba(0,0,0,.08)"
}}
>

<div
style={{
fontSize:"40px"
}}
>
{store.icon}
</div>


<h3>
{store.name}
</h3>


<p
style={{
fontSize:"13px",
color:"#666"
}}
>
View Stores →
</p>


</div>

</Link>

))}

</div>
      
<AdBanner slot="3077641350" />
<Link
to="/shopping-list"
style={{
textDecoration:"none",
color:"inherit"
}}
>

<div
style={{
marginTop:"25px",
background:"linear-gradient(135deg,#16a34a,#22c55e)",
color:"white",
padding:"25px",
borderRadius:"18px",
textAlign:"center",
boxShadow:"0 12px 30px rgba(22,163,74,.25)",
transform:"translateY(-3px)"
}}
>

<h2>
🛒 Build My Shopping List
</h2>

<p>
Compare your grocery basket across stores.
</p>

</div>

</Link>

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
    
  