import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PartnerBadge from "../components/PartnerBadge";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function StoreCategory() {

  const { type } = useParams();
const [stores, setStores] = useState([]);
const [search, setSearch] = useState("");
 
  const icons = {
    grocery:"🛒",
    pharmacy:"💊",
    beauty:"💄",
    furniture:"🛋️",
    books:"📚",
    variety:"🏪"
  };


const colors = {
    grocery:"#dcfce7",
    pharmacy:"#dbeafe",
    beauty:"#fce7f3",
    furniture:"#ffedd5",
    books:"#fef3c7",
    variety:"#e0f2fe"
};

useEffect(() => {
  fetchStores();
}, [type]);


async function fetchStores(){

const { data, error } = await supabase
.from("stores")
.select("*")
.eq("category", type)
.order("featured", { ascending:false });


console.log("STORES:", data);
console.log("ERROR:", error);


setStores(data || []);

}

  return (
  <>

    <Helmet>

      <title>
        {`${type.charAt(0).toUpperCase() + type.slice(1)} Stores in Trinidad & Tobago | CompareTT`}
      </title>

      <meta
        name="description"
        content={`Browse ${type} stores in Trinidad & Tobago. Compare prices, find deals and view products available at each store with CompareTT.`}
      />

    </Helmet>

    <div style={{ padding: "20px" }}>

      <h1>
        {icons[type]} {type.charAt(0).toUpperCase() + type.slice(1)} Stores in Trinidad & Tobago
      </h1>
<input
  placeholder="Search stores..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  style={{
    width:"100%",
    padding:"14px",
    marginTop:"20px",
    marginBottom:"20px",
    borderRadius:"10px",
    border:"2px solid #dcfce7",
    outline:"none",
    boxSizing:"border-box",
    fontSize:"16px"
  }}
/>
      <div
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
        gap:"15px"
      }}
      >

      {(stores
.filter(store =>
  store.name
    .toLowerCase()
    .includes(search.toLowerCase())
)
.map((store)=>

        <Link
        key={store.name}
        to={`/store/${store.slug}`}
        style={{
          textDecoration:"none",
          color:"#333"
        }}
        >

          <div
style={{
  background: store.partner_status === "founding"
    ? "linear-gradient(180deg,#fffdf5,#fff7d6)"
    : colors[type],

  padding:"20px",
  borderRadius:"18px",

  border: store.partner_status === "founding"
    ? "2px solid #facc15"
    : "none",

  boxShadow:"0 8px 20px rgba(0,0,0,.12)",
  textAlign:"center"
}}
>

           {store.logo_url ? (

<img
src={store.logo_url}
alt={store.name}
style={{
width:"70px",
height:"70px",
objectFit:"contain",
borderRadius:"12px",
marginBottom:"10px"
}}
/>

) : (

<div style={{fontSize:"40px"}}>
🏪
</div>

)}
            <h3>
 {store.name}
</h3>
{store.location && (
<p>
📍 {store.location}
</p>
)}

<PartnerBadge 
  status={store.partner_status}
/>

            <p>
              View Prices →
            </p>

          </div>

        </Link>

      ))}

      </div>


        </div>

  </>

);

}