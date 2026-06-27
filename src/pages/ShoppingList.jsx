import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet-async";

export default function ShoppingList() {

  const [item,setItem] = useState("");
    const [products,setProducts] = useState([]);
const [search,setSearch] = useState("");
const [results,setResults] = useState([]);
const [items,setItems] = useState([]);
const [comparison,setComparison] = useState([]);
const [selectedProduct,setSelectedProduct] = useState(null);
const [variants,setVariants] = useState([]);


useEffect(() => {
  fetchProducts();
}, []);

async function fetchProducts(){

const { data, error } = await supabase
.from("products")
.select(`
id,
name,
product_variants(
id,
brand,
variant_name,
size,
unit
)
`)
.order("name");


if(error){

console.log(error);
return;

}


setProducts(data || []);

}
function compareBasket(){

let stores = {};


items.forEach((item)=>{

(item.variant.prices || []).forEach((price)=>{

const store = price.store_name;

if(!stores[store]){

stores[store] = {
total:0,
products:{}
};

}


if(!stores[store].products[item.variant.id]){

stores[store].products[item.variant.id] = {

name:item.name,

variant:item.variant.name,

price:Number(price.price)

};

stores[store].total += Number(price.price);

}

});

});


const results = Object.entries(stores)

.map(([store,data])=>({

store,

total:data.total,

products:Object.values(data.products),

count:Object.keys(data.products).length

}))

.sort((a,b)=>{

if(b.count !== a.count){

return b.count - a.count;

}

return a.total - b.total;

});


setComparison(results);

}
  
  function removeItem(index){

    setItems(
      items.filter((_,i)=>i !== index)
    );

  }
  function handleSearch(value){

  setSearch(value);

  if(value.length < 2){

    setResults([]);
    return;

  }

  const filtered = products.filter((p)=>
    p.name.toLowerCase()
      .includes(value.toLowerCase())
  );

  setResults(filtered.slice(0,10));

}
  return (

    <div
    style={{
      padding:"20px",
      maxWidth:"700px",
      margin:"0 auto"
    }}
    >
<Helmet>
  <title>Shopping List Price Comparison | CompareTT</title>

  <meta
    name="description"
    content="Build your shopping list and compare grocery prices across multiple supermarkets in Trinidad & Tobago."
  />
</Helmet>
      <h1>
        🛒 Shopping List
      </h1>

      <p>
        Build your grocery basket and compare stores.
      </p>
<button
onClick={compareBasket}
style={{
padding:"12px",
borderRadius:"10px",
background:"#16a34a",
color:"white",
border:"none",
marginBottom:"20px",
cursor:"pointer"
}}
>
Compare Stores
</button>

      <div
      style={{
        display:"flex",
        gap:"10px",
        marginBottom:"20px"
      }}
      >

        <input
value={search}
onChange={(e)=>handleSearch(e.target.value)}
placeholder="Search products..."
style={{
flex:1,
padding:"12px",
borderRadius:"10px",
border:"1px solid #ddd"
}}
/>
{results.map((product)=>(

<div
key={product.id}
onClick={() => {

setSelectedProduct(product);

setVariants(product.product_variants || []);

setSearch("");
setResults([]);

}}
style={{
background:"#fff",
padding:"10px",
cursor:"pointer",
borderBottom:"1px solid #eee"
}}
>

{product.name}

</div>

))}

        
      </div>

{selectedProduct && (

<div
style={{
background:"#fff",
padding:"15px",
borderRadius:"12px",
marginBottom:"20px"
}}
>

<h3>
Choose {selectedProduct.name}
</h3>


{variants.length === 0 && (

<p>
No variants available
</p>

)}


{variants.map((variant)=>(

<button

key={variant.id}

onClick={async () => {


const {data} = await supabase

.from("price_reports")

.select("*")

.eq("variant_id", variant.id)

.eq("approved", true);



setItems([

...items,

{

...selectedProduct,


variant:{

id:variant.id,

brand:variant.brand,

name:variant.variant_name,

size:variant.size,

unit:variant.unit,

prices:data || []

}


}

]);


setSelectedProduct(null);

setVariants([]);


}}

style={{

display:"block",
width:"100%",
padding:"12px",
marginBottom:"8px",
borderRadius:"8px",
border:"1px solid #ddd",
background:"#f8fafc",
cursor:"pointer"

}}

>

<div>
{variant.brand}
</div>

<div>
{variant.variant_name}
</div>

<div style={{fontSize:"14px",color:"#666"}}>

{variant.size} {variant.unit}

</div>

</button>


))}


</div>

)}
{comparison.length > 0 && (

<div
style={{
background:"#fff",
padding:"15px",
borderRadius:"12px",
marginBottom:"20px"
}}
>

<h2>
🛒 Basket Totals
</h2>


{comparison.filter(c => c.count === items.length).length === 0 && (

<div
style={{
background:"#fef3c7",
padding:"12px",
borderRadius:"8px",
marginBottom:"15px"
}}
>

No store currently has prices for every item in your basket.

</div>

)}


{comparison.map((store)=>(

<div
key={store.store}
style={{
marginBottom:"25px",
paddingBottom:"15px",
borderBottom:"1px solid #eee"
}}
>

<h3>

{store.store}

</h3>


<div>

Items Found: {store.count}/{items.length}

</div>


{store.products.map((product,index)=>(

<div
key={index}
style={{
fontSize:"14px",
marginTop:"4px"
}}
>

{product.name}

{" - "}

${product.price.toFixed(2)}

</div>

))}


<div
style={{
marginTop:"10px",
fontWeight:"bold"
}}
>

Total: ${store.total.toFixed(2)}

</div>

</div>

))}

</div>

)}

      {items.map((product,index)=>(

        <div
        key={index}
        style={{
          background:"white",
          padding:"15px",
          borderRadius:"12px",
          marginBottom:"10px",
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          boxShadow:"0 2px 8px rgba(0,0,0,.08)"
        }}
        >

          <span>

{product.name}

{product.variant && (

<div style={{fontSize:"14px",color:"#666"}}>

{product.variant.brand}
<br/>

{product.variant.name}
<br/>

{product.variant.size} {product.variant.unit}

</div>

)}
</span>

          <button
          onClick={()=>removeItem(index)}
          style={{
            background:"#dc2626",
            color:"white",
            border:"none",
            padding:"6px 10px",
            borderRadius:"8px"
          }}
          >
            Remove
          </button>

        </div>

      ))}

<h2>
Price Comparison
</h2>

{items.map((product)=>(

<div key={product.variant.id}>

<h3>{product.name}</h3>

{product.variant.prices?.map((p)=>(

<div key={p.id}>

{p.store_name} - ${p.price}

</div>

))}

</div>

))}
    </div>

  );

}