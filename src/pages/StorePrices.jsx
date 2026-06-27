import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function StorePrices() {
  const { storeName } = useParams();

  const [prices, setPrices] = useState([]);
  const [search, setSearch] = useState("");

  const filteredPrices = prices.filter(item =>
  item.products?.name
    .toLowerCase()
    .includes(search.toLowerCase())
);

  useEffect(() => {
    fetchPrices();
  }, [storeName]);

  async function fetchPrices() {
    const { data, error } = await supabase
  .from("price_reports")
  .select(`
    *,
    products(name,image_url),
    product_variants(variant_name)
  `)
  .eq("approved", true)
  .ilike("store_name", `%${decodeURIComponent(storeName)}%`)
  .order("created_at", { ascending: false });
    console.log(data);
    console.log(error);

    setPrices(data || []);
  }

  return (
  <>

    <Helmet>

      <title>
        {decodeURIComponent(storeName)} Prices in Trinidad & Tobago | CompareTT
      </title>

      <meta
        name="description"
        content={`Compare prices at ${decodeURIComponent(storeName)} in Trinidad & Tobago. View products, prices and shopper submissions on CompareTT.`}
      />
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Store",
  "name": decodeURIComponent(storeName),
  "description": `Compare prices at ${decodeURIComponent(storeName)} in Trinidad & Tobago.`,
  "url": window.location.href,
  "areaServed": {
    "@type": "Country",
    "name": "Trinidad and Tobago"
  }
})}
</script>
    </Helmet>


    <div style={{ padding: "20px" }}>
      <h1>
🏪 {decodeURIComponent(storeName)} Prices
</h1>

<p>
Compare prices at {decodeURIComponent(storeName)} across Trinidad & Tobago.
</p>


<Link to="/stores/grocery">
← View all stores
</Link>

      {prices.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#fff",
            padding: "15px",
            marginBottom: "12px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)"
          }}
        >
            {item.products?.image_url && (
  <img
    src={item.products.image_url}
    alt={item.products.name}
    style={{
      width:"100%",
      height:"180px",
      objectFit:"contain",
      background:"#fff",
      borderRadius:"10px",
      marginBottom:"10px"
    }}
  />
)}
          <Link
  to={`/product/${item.products.slug}`}
  style={{
    textDecoration:"none",
    color:"#16a34a",
    fontWeight:"bold"
  }}
>
  <h3>
    {item.products?.name}
  </h3>
</Link>

          <p>
            📦 {item.product_variants?.variant_name}
          </p>

          <h2>
            TT${item.price}
          </h2>

          <p>
            📍 {item.area}
          </p>
        </div>
      ))}
        </div>

  </>
  );
}