import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const categoryTitles = {
  "school-supplies": "School Supplies Prices in Trinidad and Tobago",
  "groceries": "Grocery Prices in Trinidad and Tobago",
  "building-materials": "Building Material Prices in Trinidad and Tobago"
};

const categoryDescription = {
  "school-supplies":
    "Compare school supply prices from stores across Trinidad and Tobago.",

  "groceries":
    "Compare grocery prices and find better deals before you shop.",

  "building-materials":
    "Compare building material prices from suppliers across Trinidad and Tobago."
    };

  useEffect(() => {
    fetchProducts();
  }, [slug]);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category_slug", slug);

    if (error) {
      console.log(error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>
  {categoryTitles[slug] || slug?.replace("-", " ")}
</h1>

<p style={{ color: "#666", marginBottom: "25px" }}>
  {categoryDescription[slug]}
</p>
<p>
  <strong>{products.length}</strong> products available
</p>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((p) => (
  <Link
    key={p.id}
    to={`/product/${p.slug}`}
    style={{
      display: "block",
      textDecoration: "none",
      color: "inherit"
    }}
  >
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "12px"
      }}
    >
      {p.image_url && (

<img
src={p.image_url}
alt={p.name}
style={{
width:"80px",
height:"80px",
objectFit:"contain",
borderRadius:"10px"
}}
/>

)}

<strong>{p.name}</strong>

      <div
        style={{
          fontSize: "14px",
          color: "#666",
          marginTop: "5px"
        }}
      >
        View price comparisons
      </div>
    </div>
  </Link>
))
      )}
      <hr style={{ marginTop: "30px" }} />

<h2>
  Compare {slug?.replace("-", " ")} Prices
</h2>

<p>
  CompareTT helps shoppers find updated prices across
  Trinidad and Tobago. Prices are submitted by users
  and may vary by location and store.
</p>

<p>
  Check regularly for new price submissions and
  compare options before making purchases.
</p>
    </div>
  );
}