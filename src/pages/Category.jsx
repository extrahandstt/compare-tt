import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AdBanner from "../components/AdBanner";
import { Helmet } from "react-helmet-async";

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

  // Get category ID from slug
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();


  if (categoryError) {
    console.log("CATEGORY ERROR:", categoryError);
    setLoading(false);
    return;
  }


  if (!category) {
    console.log("No category found");
    setLoading(false);
    return;
  }


  // Get products using category_id
  const { data: products, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .order("name", { ascending: true });

    if (productError) {
    console.log("PRODUCT ERROR:", productError);
    setLoading(false);
    return;
  }

const productsWithVariants = await Promise.all(
  products.map(async (product) => {

   const { data: variants, error } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", product.id);

console.log("PRODUCT ID:", product.id);
console.log("VARIANTS FOUND:", variants);

 if (error) {
        console.log("VARIANT ERROR:", error);
      }


    return {
        ...product,
        variants: variants || [],
        variant_count: variants?.length || 0
      };
    })
  );

setProducts(productsWithVariants);

  console.log("CATEGORY:", category);
  console.log("PRODUCTS:", productsWithVariants);
  
  setLoading(false);
}

   
  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <Helmet>
  <title>Grocery Stores | CompareTT</title>

  <meta
    name="description"
    content="Browse grocery stores in Trinidad & Tobago and compare prices before you shop."
  />
</Helmet>
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
  {p.variant_count || 0} variants available
</div>

<div
  style={{
    color: "#16a34a",
    fontWeight: "600",
    marginTop: "4px"
  }}
>
  Compare prices →
</div>
    </div>
  </Link>
))
      )}
      <hr style={{ marginTop: "30px" }} />
      <AdBanner slot="7544600056" />

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