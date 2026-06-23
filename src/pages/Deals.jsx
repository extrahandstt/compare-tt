import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Deals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {
    const { data } = await supabase
      .from("deals")
.select("*")
.gte("end_date", new Date().toISOString().split("T")[0])
.order("created_at", { ascending: false })

    setDeals(data || []);
  }

  return (
    <div style={{ padding: "20px" }}>
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