import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet-async";

export default function Deals() {
  console.log("DEALS PAGE LOADED");
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {

  console.log("Fetching deals started");

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("deals")
    .select("*");

  console.log("TODAY:", today);
  console.log("DEALS DATA:", data);
  console.log("DEALS ERROR:", error);


  setDeals(data || []);
}
  return (
    <div style={{ padding: "20px" }}>
      <Helmet>
  <title>Today's Deals | CompareTT</title>

  <meta
    name="description"
    content="Browse the latest supermarket deals, discounts and special offers across Trinidad & Tobago."
  />
</Helmet>
      <h1>🔥 Store Specials & Deals</h1>

      {deals.map((deal) => (
        <div
  style={{
    background:"#fff",
    padding:"12px",
    marginBottom:"12px",
    borderRadius:"12px"
  }}
>
          {deal.image_url && (
            <img
              src={deal.image_url}
              alt={deal.title}
              style={{
  width: "100%",
  maxHeight: "220px",
  objectFit: "contain",
  borderRadius: "10px",
  background: "#f5f5f5",
  padding: "10px"
}}
            />
          )}

          <h2>{deal.title}</h2>

          <p>🏪 {deal.store_name}</p>

          <p>{deal.description}</p>

          {deal.regular_price && (
            <p>
              Regular: <s>${deal.regular_price}</s>
            </p>
          )}

          {deal.sale_price && (
            <h3 style={{ color: "green" }}>
              Sale: ${deal.sale_price}
            </h3>
          )}

          {deal.while_stocks_last ? (
  <p
    style={{
      color:"#f97316",
      fontWeight:"600"
    }}
  >
    🔥 While Stocks Last
  </p>
) : (
  <p>
    Ends: {deal.end_date}
  </p>
)}
        </div>
      ))}
    </div>
  );
}