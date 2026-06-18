import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Product() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

const location = searchParams.get("location");

  
  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  async function fetchProduct() {
    setLoading(true);

    // 1. GET PRODUCT (SAFE VERSION)
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (productError || !productData) {
      console.log("Product error:", productError);
      setLoading(false);
      return;
    }

    setProduct(productData);

    // 2. GET PRICES
    let priceQuery = supabase
  .from("price_reports")
  .select(`
  *,
  product_variants (
    variant_name
  )
`)
  .eq("product_id", productData.id)
  .eq("approved", true);


if (location && location !== "all") {

  priceQuery = priceQuery
    .or(
      `town.eq.${location},region.eq.${location}`
    );

}


const { data: priceData, error: priceError } =
  await priceQuery;


if (priceError) {
  console.log("Price error:", priceError);
} else {
  setPrices(priceData || []);
  console.log(
  "PRICE ROW JSON:",
  JSON.stringify(priceData[0], null, 2)
);
}


setLoading(false);
}


if (loading) return <h2>Loading...</h2>;

if (!product) return <h2>Product not found</h2>;


const pricesOnly = (prices || []).map(
  p => Number(p.price)
);


const lowest = pricesOnly.length
  ? Math.min(...pricesOnly)
  : null;


const highest = pricesOnly.length
  ? Math.max(...pricesOnly)
  : null;


const average = pricesOnly.length
  ? (
      pricesOnly.reduce((a,b)=>a+b,0)
      / pricesOnly.length
    ).toFixed(2)
  : null;


const cheapestPrice = prices.length
  ? Math.min(
      ...prices.map(
        p => Number(p.price)
      )
    )
  : null;


const shareText = product
  ? `
${product.name}
Lowest price: TT$${lowest ?? "N/A"}
Compare here: CompareTT
  `.trim()
  : "";


const whatsappLink =
  `https://wa.me/?text=${encodeURIComponent(shareText)}`;


const cheapestStore = prices.find(
  p => Number(p.price) === cheapestPrice
);

  return (
  <div
    style={{
      maxWidth: "700px",
      margin: "0 auto",
      padding: "16px",
      fontFamily: "Arial, sans-serif"
    }}
  >

    {/* PRODUCT HEADER */}
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        marginBottom: "20px"
      }}
    >
      <h1 style={{ margin: 0 }}>
        {product.name}
      </h1>
{product.image_url && (

<div
style={{
display:"flex",
justifyContent:"center",
marginTop:"15px"
}}
>

<img

src={product.image_url}

alt={product.name}

style={{

width:"120px",

height:"120px",

objectFit:"contain",

borderRadius:"16px",

background:"#f8fafc",

padding:"10px",

boxShadow:"0 3px 10px rgba(0,0,0,0.12)",

transition:"0.3s",

cursor:"pointer"

}}

onMouseOver={(e)=>
e.currentTarget.style.transform="scale(1.08)"
}

onMouseOut={(e)=>
e.currentTarget.style.transform="scale(1)"
}

/>

</div>

)}
      <p style={{ color: "#777" }}>
        Compare prices from stores across Trinidad & Tobago
      </p>
    </div>


    {/* PRICE SUMMARY */}
    <h2>
      📊 Price Comparison
    </h2>

    {prices.length > 0 ? (

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginBottom: "25px"
        }}
      >

        <div
          style={{
            background:"#f5fff5",
            padding:"15px",
            borderRadius:"12px",
            textAlign:"center"
          }}
        >
          <small>Lowest</small>
          <h3>
            TT${lowest}
          </h3>
        </div>


        <div
          style={{
            background:"#f8f8f8",
            padding:"15px",
            borderRadius:"12px",
            textAlign:"center"
          }}
        >
          <small>Average</small>
          <h3>
            TT${average}
          </h3>
        </div>


        <div
          style={{
            background:"#fff8f8",
            padding:"15px",
            borderRadius:"12px",
            textAlign:"center"
          }}
        >
          <small>Highest</small>
          <h3>
            TT${highest}
          </h3>
        </div>

      </div>

    ) : (

      <p>
        No comparisons yet — be the first to submit.
      </p>

    )}



    {/* STORES */}
    <h2>
      🏪 Store Prices
    </h2>


    {prices.length === 0 ? (

      <p>No prices yet</p>

    ) : (

      prices.map((p)=>{

        const isCheapest =
        Number(p.price) === cheapestPrice;


        return (

          <div
  key={p.id}
  style={{
    background:"white",
    padding:"12px",
    borderRadius:"14px",
    marginBottom:"10px",
    border:
    isCheapest
    ? "2px solid green"
    : "1px solid #ddd",
    boxShadow:
    "0 2px 8px rgba(0,0,0,0.05)",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }}
>

            <div>

<div
style={{
display:"flex",
alignItems:"center",
gap:"8px"
}}
>

<strong>
{p.store_name}
</strong>



</div>


{p.product_variants?.variant_name && (
<p
style={{
margin:"4px 0",
color:"#16a34a",
fontWeight:"bold",
fontSize:"13px"
}}
>
📦 {p.product_variants.variant_name}
</p>
)}


<h3
style={{
margin:"5px 0",
fontSize:"18px"
}}
>
TT${p.price}
</h3>


<p
style={{
margin:"3px 0",
fontSize:"13px",
color:"#666"
}}
>
📍 {p.area}
</p>


<p
style={{
margin:"3px 0",
fontSize:"13px",
color:"#888"
}}
>
👥 Reported {
prices.filter(
item =>
item.product_id === p.product_id &&
item.variant_id === p.variant_id &&
Number(item.price) === Number(p.price)
).length
} times
</p>


<small style={{color:"#888"}}>
{new Date(
p.created_at
).toLocaleDateString()}
</small>


</div>


<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"5px"
}}
>

{isCheapest && (
<span
style={{
fontSize:"14px",
fontWeight:"bold",
color:"white",
background:"#16a34a",
padding:"4px 8px",
borderRadius:"12px"
}}
>
🟢 Cheapest
</span>
)}


{p.image_url && (
<img
src={p.image_url}
alt="Price proof"
style={{
width:"55px",
height:"55px",
objectFit:"cover",
borderRadius:"8px"
}}
/>
)}

</div>

          </div>

        )

      })

    )}




    {/* ACTION BUTTONS */}

    <Link
      to={`/submit-price?product=${product.id}`}
      style={{
        textDecoration:"none"
      }}
    >

      <button
        style={{
          width:"100%",
          padding:"14px",
          borderRadius:"12px",
          border:"none",
          marginTop:"15px",
          fontSize:"16px",
          cursor:"pointer"
        }}
      >
        ➕ Submit a Price
      </button>


    </Link>



    <a
      href={whatsappLink}
      target="_blank"
      style={{
        textDecoration:"none"
      }}
    >

      <button
        style={{
          width:"100%",
          padding:"14px",
          borderRadius:"12px",
          border:"none",
          marginTop:"12px",
          fontSize:"16px",
          cursor:"pointer"
        }}
      >
        📲 Share on WhatsApp
      </button>


    </a>


  </div>
);
}