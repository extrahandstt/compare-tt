import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


export default function Admin() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pending, setPending] = useState([]);
const [categoryName, setCategoryName] = useState("");
const [categories, setCategories] = useState([]);
const [productName, setProductName] = useState("");
const [productDescription, setProductDescription] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [tab,setTab] = useState("prices");
const [products, setProducts] = useState([]);
const [variantProduct, setVariantProduct] = useState("");
const [variantName, setVariantName] = useState("");
const [categoryList, setCategoryList] = useState([]);
const [productImage, setProductImage] = useState(null);
const [selectedProduct,setSelectedProduct] = useState("");
const [variantBrand,setVariantBrand] = useState("");
const [variantSize,setVariantSize] = useState("");
const [variantUnit,setVariantUnit] = useState("");
const [dealTitle,setDealTitle] = useState("");
const [dealStore,setDealStore] = useState("");
const [dealDescription,setDealDescription] = useState("");
const [dealRegular,setDealRegular] = useState("");
const [dealSale,setDealSale] = useState("");
const [dealEnd,setDealEnd] = useState("");
const [dealImage,setDealImage] = useState(null);
const [whileStocksLast, setWhileStocksLast] = useState(false);
const [businesses,setBusinesses] = useState([]);
const [editBusinessId,setEditBusinessId] = useState("");
const [partnerLogo,setPartnerLogo] = useState(null);
const [partnerMode,setPartnerMode] = useState("new");
const [partnerStatus,setPartnerStatus] = useState("none");

const [businessName,setBusinessName] = useState("");
const [businessCategory,setBusinessCategory] = useState("");
const [businessDescription,setBusinessDescription] = useState("");
const [businessLocation,setBusinessLocation] = useState("");
const [businessPhone,setBusinessPhone] = useState("");
const [businessWhatsapp,setBusinessWhatsapp] = useState("");
const [businessEmail,setBusinessEmail] = useState("");
const [businessWebsite,setBusinessWebsite] = useState("");
const [partnerRequests,setPartnerRequests] = useState([]);

useEffect(()=>{

if(!editBusinessId) return;

const biz = businesses.find(b => b.id == editBusinessId);

if(!biz) return;

setBusinessName(biz.name || "");
setBusinessCategory(biz.category || "");
setBusinessDescription(biz.description || "");
setBusinessLocation(biz.location || "");
setBusinessPhone(biz.phone || "");
setBusinessWhatsapp(biz.whatsapp || "");
setBusinessEmail(biz.email || "");
setBusinessWebsite(biz.website || "");
setPartnerStatus(biz.partner_status || "none");
},[editBusinessId]);

  useEffect(() => {

  if (!authed) return;

  const loadAdmin = async () => {

  await fetchPending();

  await fetchCategories();

  await fetchProducts();

  await fetchBusinesses();
await fetchPartnerRequests();

};
  loadAdmin();

}, [authed]);


  function login() {
    if (key === import.meta.env.VITE_ADMIN_KEY) {
      setAuthed(true);
    } else {
      alert("Wrong admin key");
    }
  }
  async function addCategory() {

  const slug = categoryName
    .toLowerCase()
    .replace(/\s+/g, "-");

  const { error } = await supabase
    .from("categories")
    .insert({
      name: categoryName,
      slug
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Category added");
  setCategoryName("");
}
async function addProduct() {


const slug = productName
.toLowerCase()
.trim()
.replace(/[^a-z0-9]+/g,"-");

const imageUrl =
await uploadProductImage();



const { error } = await supabase
.from("products")
.insert({

name: productName,

slug,

description: productDescription,

category_slug:selectedCategory,

image_url:imageUrl,

category_id: selectedCategory

});



if(error){

alert(error.message);
return;

}


alert("Product added");


setProductName("");
setProductDescription("");
setSelectedCategory("");
setProductImage(null);


fetchProducts();

}
async function fetchPartnerRequests(){

const {data,error} = await supabase
.from("partner_requests")
.select("*")
.eq("status","pending")
.order("created_at",{ascending:false});


if(error){

alert(error.message);
return;

}


setPartnerRequests(data || []);

}
async function fetchProducts(){

  const { data } = await supabase
    .from("products")
    .select("id,name")
    .order("name");

  setProducts(data || []);

}
  async function fetchPending() {

  const { data, error } = await supabase
    .from("pending_price_reports")
    .select("*")
    .order("created_at", { ascending:false });


  console.log("ALL REPORTS:", data);
  console.log("ERROR:", error);

  setPending(data || []);

}
  
async function fetchBusinesses(){

  const {data,error} = await supabase
    .from("stores")
    .select("*")
    .order("name");

  if(error){
    alert(error.message);
    return;
  }

  setBusinesses(data || []);
}

async function updateBusiness(){

if(!editBusinessId){

alert("Select a business first");
return;

}


let logoUrl = null;


if(partnerLogo){


const fileName =
`${Date.now()}-${partnerLogo.name}`;


const {error:uploadError} = await supabase
.storage
.from("product-images")
.upload(fileName, partnerLogo);


if(uploadError){

alert(uploadError.message);
return;

}


const {data} =
supabase
.storage
.from("product-images")
.getPublicUrl(fileName);


logoUrl = data.publicUrl;


}



const updateData = {


name: businessName,

category: businessCategory,

description: businessDescription,

location: businessLocation,

phone: businessPhone,

whatsapp: businessWhatsapp,

email: businessEmail,

website: businessWebsite,


};



if(logoUrl){

updateData.logo_url = logoUrl;

}



const {error} = await supabase
.from("stores")
.update(updateData)
.eq("id", editBusinessId);



if(error){

alert(error.message);
return;

}



alert("Business profile saved");


fetchBusinesses();


}

async function updatePartnerStatus(){

if(!editBusinessId){

alert("Select a business first");
return;

}


const {error} = await supabase
.from("stores")
.update({

partner_status: partnerStatus,

verified: partnerStatus === "verified" || partnerStatus === "founding",

featured: partnerStatus === "founding"

})
.eq("id", editBusinessId);


if(error){

alert(error.message);
return;

}


alert("Partner status updated");


fetchBusinesses();

}
async function fetchCategories() {

  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("name");


  setCategories(data || []);
  setCategoryList(data || []);

}
async function uploadProductImage(){

  if(!productImage) return null;


  const fileName =
    `${Date.now()}-${productImage.name}`;


  const { error } = await supabase
    .storage
    .from("product-images")
    .upload(fileName, productImage);


  if(error){

    alert(error.message);
    return null;

  }


  const { data } =
    supabase
    .storage
    .from("product-images")
    .getPublicUrl(fileName);


  return data.publicUrl;

}
async function addVariant(){

  if(!variantProduct){
    alert("Select product");
    return;
  }


  const generatedVariant =
  `${variantBrand} ${variantSize}${variantUnit}`.trim();

console.log({
  whileStocksLast,
  dealEnd,
  end_date: dealEnd || null,
});
  const { data, error } = await supabase
  .from("product_variants")
  .insert({

    product_id: variantProduct,

    brand: variantBrand,

    size: variantSize,

    unit: variantUnit,

    variant_name: generatedVariant

  });


  console.log("VARIANT RESULT:", data);
  console.log("VARIANT ERROR:", error);


  if(error){

    alert(error.message);

  } else {

    alert("Variant added!");

    setVariantProduct("");
    setVariantBrand("");
    setVariantSize("");
    setVariantUnit("");

  }

  }
  async function addDeal(){
    if (!whileStocksLast && !dealEnd) {

  alert("Please select a deal end date");
  return;

}

let imageUrl = null;


if(dealImage){

const fileName =
`${Date.now()}-${dealImage.name}`;


const {error} = await supabase
.storage
.from("product-images")
.upload(fileName,dealImage);


if(error){

alert(error.message);
return;

}


const {data} =
supabase
.storage
.from("product-images")
.getPublicUrl(fileName);


imageUrl = data.publicUrl;

}


console.log("whileStocksLast =", whileStocksLast);
const newDeal = {

  title: dealTitle,

  store_name: dealStore,

  description: dealDescription,

  regular_price: dealRegular
    ? Number(dealRegular)
    : null,

  sale_price: dealSale
    ? Number(dealSale)
    : null,

  while_stocks_last: whileStocksLast,

  end_date: whileStocksLast
    ? null
    : (dealEnd || null),

  image_url: imageUrl,

  approved: false

};

console.log(newDeal);

const { error } = await supabase
  .from("deals")
  .insert(newDeal);


if(error){

alert(error.message);
return;

}


alert("Deal added");


setDealTitle("");
setDealStore("");
setDealDescription("");
setDealRegular("");
setDealSale("");
setDealEnd("");
setDealImage(null);

}
  async function approve(id) {

  const { error } = await supabase
    .from("pending_price_reports")
    .update({ approved: true })
    .eq("id", id);


  console.log("APPROVE ERROR:", error);


  if(error){
    alert(error.message);
    return;
  }


  await fetchPending();

}
async function approvePartner(id){


const request =
partnerRequests.find(p=>p.id===id);


if(!request) return;



const slug =
request.business_name
.toLowerCase()
.trim()
.replace(/[^a-z0-9]+/g,"-");



const {error} = await supabase
.from("stores")
.insert({

name: request.business_name,

slug,

category: request.category,

description: request.description,

location: request.location,

phone: request.phone,

whatsapp: request.whatsapp,

email: request.email,

website: request.website,

logo_url: request.logo_url,


partner_status:"future",

verified:false,

featured:false


});


if(error){

alert(error.message);
return;

}



await supabase
.from("partner_requests")
.update({
status:"approved"
})
.eq("id",id);



alert("Business approved");


fetchPartnerRequests();
fetchBusinesses();


}
 async function remove(id) {

  const { error } = await supabase
    .from("pending_price_reports")
    .delete()
    .eq("id", id);


  console.log("DELETE ERROR:", error);


  if(error){
    alert(error.message);
    return;
  }


  await fetchPending();

}
  if (!authed) {
        return (
      <div style={{ padding: "20px" }}>
        <h1>Admin Login</h1>

        <input
          type="password"
          placeholder="Enter admin key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <button onClick={login}>Login</button>
      </div>
    );
  }
const inputStyle = {

width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"10px",
border:"1px solid #ddd"

};

  return (

<div
style={{
padding:"20px",
maxWidth:"1000px",
margin:"0 auto",
fontFamily:"Arial"
}}
>

<h1>
CompareTT Admin
</h1>


<div
style={{
display:"flex",
gap:"10px",
marginBottom:"25px",
flexWrap:"wrap"
}}
>

{[
["prices","Pending Prices"],
["categories","Categories"],
["products","Products"],
["variants","Variants"],
["businesses","Businesses"],
["requests","Partner Requests"],
["deals","Deals"]

].map(([id,label])=>(


<button

key={id}

onClick={()=>setTab(id)}

style={{
padding:"12px 18px",
borderRadius:"10px",
border:"none",
cursor:"pointer",
background:
tab===id
?"#16a34a"
:"#eee",
color:
tab===id
?"white"
:"#333"
}}

>

{label}

</button>


))}

</div>





{tab==="prices" && (

<div>

<h2>
Pending Price Reports
</h2>


{pending.map((p)=>(

<div

key={p.id}

style={{
background:"white",
padding:"18px",
borderRadius:"14px",
marginBottom:"15px",
boxShadow:"0 2px 8px rgba(0,0,0,.08)"
}}

>


<h3>
  {p.products?.name}
</h3>

<p>
  📦 {p.product_variants?.variant_name}
</p>

<p>
  🏪 {p.store_name}
</p>

<p>
  📍 {p.area}
</p>

<h2>
  TT${p.price}
</h2>


<button
onClick={()=>approve(p.id)}
style={{
background:"#16a34a",
color:"white",
border:"none",
padding:"10px",
borderRadius:"8px"
}}
>
Approve
</button>


<button

onClick={()=>remove(p.id)}

style={{
marginLeft:"10px",
background:"#dc2626",
color:"white",
border:"none",
padding:"10px",
borderRadius:"8px"
}}

>
Delete
</button>


</div>

))}

</div>

)}




{tab==="categories" && (

<div>

<div
style={{
background:"white",
padding:"20px",
borderRadius:"16px",
boxShadow:"0 2px 10px rgba(0,0,0,.08)"
}}
>


<h2>
Add Category
</h2>


<input

style={inputStyle}

value={categoryName}

onChange={(e)=>
setCategoryName(e.target.value)
}

placeholder="Electronics"

/>


<button

onClick={addCategory}

style={{
background:"#16a34a",
color:"white",
border:"none",
padding:"12px 20px",
borderRadius:"10px"
}}

>

Add Category

</button>


</div>




<div
style={{
marginTop:"25px"
}}
>

<h2>
Existing Categories
</h2>


{categoryList.map((c)=>(


<div

key={c.id}

style={{
background:"white",
padding:"15px",
borderRadius:"12px",
marginBottom:"10px",
border:"1px solid #eee"
}}

>

<strong>
{c.name}
</strong>

<p style={{color:"#777"}}>
{c.slug}
</p>


</div>


))}


</div>



</div>

)}

{tab==="products" && (

<div
style={{
background:"white",
padding:"20px",
borderRadius:"16px",
boxShadow:"0 2px 10px rgba(0,0,0,.08)"
}}
>


<h2>
Add Product
</h2>


<label>
Category
</label>


<select

value={selectedCategory}

onChange={(e)=>
setSelectedCategory(e.target.value)
}

style={inputStyle}

>


<option value="">
Select Category
</option>


{categories.map((c)=>(

<option

key={c.id}

value={c.id}

>

{c.name}

</option>


))}


</select>




<label>
Product Name
</label>


<input

style={inputStyle}

placeholder="Exercise Book"

value={productName}

onChange={(e)=>
setProductName(e.target.value)
}

/>




<label>
Description
</label>


<textarea

style={inputStyle}

placeholder="120 page ruled exercise book"

value={productDescription}

onChange={(e)=>
setProductDescription(e.target.value)
}

/>




<label>
Product Image (optional)
</label>


<input

type="file"

accept="image/*"

onChange={(e)=>
setProductImage(e.target.files[0])
}


/>



<button

onClick={addProduct}

style={{
marginTop:"15px",
background:"#16a34a",
color:"white",
padding:"12px 20px",
border:"none",
borderRadius:"10px",
cursor:"pointer"
}}

>

Add Product

</button>


</div>

)}


{tab==="variants" && (

<div
style={{
background:"white",
padding:"20px",
borderRadius:"16px",
boxShadow:"0 2px 10px rgba(0,0,0,.08)"
}}
>


<h2>
Add Variant
</h2>


<label>
Product
</label>


<select

value={variantProduct}

onChange={(e)=>
setVariantProduct(e.target.value)
}

style={inputStyle}

>

<option value="">
Select Product
</option>


{products.map((p)=>(

<option
key={p.id}
value={p.id}
>

{p.name}

</option>

))}


</select>


<label>
Variation Name
</label>

<input
placeholder="Brand (optional)"
value={variantBrand}
onChange={(e)=>setVariantBrand(e.target.value)}
style={inputStyle}
/>


<input
placeholder="Size (example 5)"
value={variantSize}
onChange={(e)=>setVariantSize(e.target.value)}
style={inputStyle}
/>


<input
placeholder="Unit (kg, L, sheets)"
value={variantUnit}
onChange={(e)=>setVariantUnit(e.target.value)}
style={inputStyle}
/>
<input

placeholder="120 Page Ruled"

value={variantName}

onChange={(e)=>
setVariantName(e.target.value)
}

style={inputStyle}

/>



<button

onClick={addVariant}

style={{
background:"#16a34a",
color:"white",
padding:"12px 20px",
border:"none",
borderRadius:"10px",
cursor:"pointer"
}}

>

Add Variant

</button>
</div>

)}
{tab === "businesses" && (

<div
style={{
background:"#fff",
padding:"20px",
borderRadius:"16px"
}}
>

<h2>Business Manager</h2>

<select
style={inputStyle}
value={editBusinessId}
onChange={(e)=>setEditBusinessId(e.target.value)}
>

<option value="">
Select Business
</option>

{businesses.map((b)=>(

<option
key={b.id}
value={b.id}
>

{b.name}

</option>

))}

</select>
<label>Partner Level</label>

<select
style={inputStyle}
value={partnerStatus}
onChange={(e)=>setPartnerStatus(e.target.value)}
>

<option value="none">No Partner</option>
<option value="future">Future Partner</option>
<option value="verified">Verified Partner</option>
<option value="founding">Founding Partner</option>

</select>
<input
style={inputStyle}
placeholder="Business Name"
value={businessName}
onChange={(e)=>setBusinessName(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Category"
value={businessCategory}
onChange={(e)=>setBusinessCategory(e.target.value)}
/>

<textarea
style={inputStyle}
placeholder="Description"
value={businessDescription}
onChange={(e)=>setBusinessDescription(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Location"
value={businessLocation}
onChange={(e)=>setBusinessLocation(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Phone"
value={businessPhone}
onChange={(e)=>setBusinessPhone(e.target.value)}
/>

<input
style={inputStyle}
placeholder="WhatsApp"
value={businessWhatsapp}
onChange={(e)=>setBusinessWhatsapp(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Email"
value={businessEmail}
onChange={(e)=>setBusinessEmail(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Website"
value={businessWebsite}
onChange={(e)=>setBusinessWebsite(e.target.value)}
/>
<label>Business Logo</label>

<input
  type="file"
  accept="image/*"
  onChange={(e) => setPartnerLogo(e.target.files[0])}
/>
<button
onClick={updateBusiness}
style={{
background:"#16a34a",
color:"#fff",
padding:"12px 20px",
border:"none",
borderRadius:"10px",
marginTop:"15px"
}}
>
Save Business
</button>

<button
onClick={updatePartnerStatus}
style={{
background:"#2563eb",
color:"#fff",
padding:"12px 20px",
border:"none",
borderRadius:"10px",
marginTop:"15px",
marginLeft:"10px"
}}
>
Update Partner
</button>
</div>

)}

{tab==="requests" && (

<div>

<h2>
Pending Partner Requests
</h2>


{partnerRequests.map((p)=>(

<div
key={p.id}
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
marginBottom:"15px"
}}
>


<h3>{p.business_name}</h3>

<p>{p.category}</p>

<p>{p.location}</p>

<p>{p.whatsapp}</p>


<button

onClick={()=>approvePartner(p.id)}

style={{
background:"#16a34a",
color:"white",
padding:"10px",
borderRadius:"8px"
}}

>

Approve Business

</button>


</div>

))}


</div>

)}

{tab==="deals" && (

<div
style={{
background:"white",
padding:"20px",
borderRadius:"16px",
boxShadow:"0 2px 10px rgba(0,0,0,.08)"
}}
>

<h2>
Add Deal
</h2>


<input
style={inputStyle}
placeholder="Deal title (Buy 2 Get 1 Free Coke)"
value={dealTitle}
onChange={(e)=>setDealTitle(e.target.value)}
/>


<input
style={inputStyle}
placeholder="Store name (Massy Stores)"
value={dealStore}
onChange={(e)=>setDealStore(e.target.value)}
/>


<textarea
style={inputStyle}
placeholder="Description"
value={dealDescription}
onChange={(e)=>setDealDescription(e.target.value)}
/>


<input
style={inputStyle}
placeholder="Regular price"
value={dealRegular}
onChange={(e)=>setDealRegular(e.target.value)}
/>


<input
style={inputStyle}
placeholder="Sale price"
value={dealSale}
onChange={(e)=>setDealSale(e.target.value)}
/>
<label
style={{
display:"flex",
alignItems:"center",
gap:"10px",
marginBottom:"15px"
}}
>
<input
type="checkbox"
checked={whileStocksLast}
onChange={(e)=>setWhileStocksLast(e.target.checked)}
/>
<p>
While Stocks Last: {String(whileStocksLast)}
</p>

While Stocks Last
</label>

<label>
Deal ends
</label>

<input
type="date"
style={inputStyle}
value={dealEnd}
disabled={whileStocksLast}
onChange={(e)=>setDealEnd(e.target.value)}
/>


<label>
Deal Image
</label>

<input
type="file"
accept="image/*"
onChange={(e)=>setDealImage(e.target.files[0])}
/>


<button

onClick={addDeal}

style={{
marginTop:"15px",
background:"#f97316",
color:"white",
padding:"12px 20px",
border:"none",
borderRadius:"10px"
}}

>

Add Deal

</button>


</div>

)}
</div>

);
}