import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PartnerBadge from "../components/PartnerBadge";

export default function StorePrices() {
  const [prices, setPrices] = useState([]);
    const [search, setSearch] = useState("");
  const { storeName: storeSlug } = useParams();

const [store, setStore] = useState(null);


  const filteredPrices = prices.filter(item =>
  item.products?.name
    ?.toLowerCase()
    .includes(search.toLowerCase())
);

  useEffect(() => {
  fetchStore();
}, [storeSlug]);

async function fetchStore() {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("slug", storeSlug)
    .single();

  console.log("STORE:", data);
  console.log(error);

  if (!data) return;

  setStore(data);

  fetchPrices(data.name.trim());
}

  async function fetchPrices(storeName) {

  const { data, error } = await supabase
    .from("price_reports")
    .select(`
      *,
      products(*),
      product_variants(*)
    `)
    .eq("approved", true)
    .ilike("store_name", `%${storeName.trim()}%`)
    .order("created_at", { ascending:false });


  console.log("STORE PRICES:", data);
  console.log(error);

  setPrices(data || []);
}
  return (
  <>

    <Helmet>

      <title>{`${store?.name || "Store"} Prices in Trinidad & Tobago | CompareTT`}</title>

      <meta
        name="description"
        content={`Compare prices at ${store?.name} in Trinidad & Tobago. View products, prices and shopper submissions on CompareTT.`}
      />
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Store",
  "name": store?.name || "Store",
  "description": `Compare prices at ${store?.name} in Trinidad & Tobago.`,
  "url": window.location.href,
  "areaServed": {
    "@type": "Country",
    "name": "Trinidad and Tobago"
  }
})}
</script>
    </Helmet>


    <div style={{ padding: "20px" }}>

  <div
    style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "0 8px 25px rgba(0,0,0,.08)",
      textAlign: "center"
    }}
  >

    {store?.logo_url ? (
      <img
        src={store.logo_url}
        alt={store.name}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "contain",
          marginBottom: "15px"
        }}
      />
    ) : (
      <div
        style={{
          fontSize: "70px",
          marginBottom: "15px"
        }}
      >
        🏪
      </div>
    )}

    <PartnerBadge 
  status={store?.partner_status}
/>


<h1>
{store?.name}
</h1>


{store?.description && (
<p>
{store.description}
</p>
)}


{store?.location && (
<p>
📍 {store.location}
</p>
)}


{store?.phone && (
<p>
📞 {store.phone}
</p>
)}


{store?.website && (
<a
href={store.website}
target="_blank"
rel="noopener noreferrer"
>
Visit Website
</a>
)}

</div>


<br />

<Link to="/stores/grocery">
← View all stores
</Link>
  <h2
    style={{
      marginTop: "25px",
      marginBottom: "15px"
    }}
  >
    🛒 Latest Prices
  </h2>

         {filteredPrices.map((item) => (
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