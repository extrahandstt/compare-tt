import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function SubmitPrice() {
  const [products, setProducts] = useState([]);
const [variants, setVariants] = useState([]);
const [categories,setCategories] = useState([]);
const [selectedCategory,setSelectedCategory] = useState("");
const [selectedProduct, setSelectedProduct] = useState("");
const navigate = useNavigate();


useEffect(()=>{

checkUser();

},[]);



async function checkUser(){

const {data}=await supabase.auth.getUser();


if(!data.user){

navigate("/login");

}

}

  const [form, setForm] = useState({
  product_id: "",
  variant_id: "",
  store_name: "",
  region: "",
  town: "",
  area: "",
  price: "",
  description: ""
});
const [imageFile, setImageFile] = useState(null);

const filteredProducts = products
  .filter(
    (p) => p.category_id === Number(selectedCategory)
  )
  .sort((a, b) => a.name.localeCompare(b.name));


  useEffect(() => {
  fetchCategories();
  fetchProducts();
}, []);

  async function fetchVariants(productId) {

  console.log("Selected product:", productId);

  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId);


  console.log("Variants:", data);
  console.log("Error:", error);


  setVariants(data || []);

}

const [searchParams] = useSearchParams();

useEffect(() => {
  const productId = searchParams.get("product");

  if (productId) {
    setForm((prev) => ({
      ...prev,
      product_id: productId
    }));
  }
}, []);

async function fetchCategories() {

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  console.log("FIRST CATEGORY:", data[0]);

  setCategories(data || []);

}
  async function fetchProducts(){

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      category_id
    `);

  console.log("PRODUCT ERROR:", error);
  console.log("PRODUCTS:", data);


  if(error){
    return;
  }


  console.log(
    "FIRST PRODUCT:",
    data?.[0]
  );


  setProducts(data || []);

}

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
  e.preventDefault();
  let imageUrl = null;

if (imageFile) {

  const fileName = `${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase
    .storage
    .from("price-images")
    .upload(fileName, imageFile);


  if (uploadError) {
    console.log(uploadError);
    alert("Image upload failed");
    return;
  }


  const { data } = supabase
    .storage
    .from("price-images")
    .getPublicUrl(fileName);


  imageUrl = data.publicUrl;

}

 if (!form.product_id) {
  alert("Missing product");
  return;
}

if (!form.store_name) {
  alert("Missing store");
  return;
}

if (!form.area) {
  alert("Missing area");
  return;
}

if (!form.price) {
  alert("Missing price");
  return;
}
    const { data: existing } = await supabase
  .from("price_reports")
  .select("id")
  .eq("product_id", form.product_id)
  .eq("variant_id", form.variant_id)
  .eq("store_name", form.store_name)
  .eq("area", form.area)
  .eq("price", Number(form.price))
    .in("approved", [false, true])


if (existing && existing.length > 0) {
  alert("This price was already submitted for review.");
  return;
}


  const { data, error } = await supabase
    .from("price_reports")
    .insert([
       {
        
  product_id: form.product_id,
  variant_id: form.variant_id || null,
  store_name: form.store_name,
  region: form.region,
  town: form.town,
  area: form.area,
 price: Number(form.price),
description: form.description || null,
image_url: imageUrl,
approved: false
}

    ]);
console.log("INSERT RESULT:", data);
console.log("INSERT ERROR:", error);

  if (error) {
  console.log("SUBMIT ERROR:", error);
  alert(error.message);

} else {

  alert("Price submitted for review!");
    setForm({
  product_id: "",
  variant_id: "",
  store_name: "",
  region: "",
  town: "",
  area: "",
  price: "",
  description: ""
});
  }
}
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  marginBottom: "16px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
  fontSize: "15px"
};
  return (
  <div
    style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px"
    }}
  >
    <Helmet>
  <title>Submit a Price | CompareTT</title>

  <meta
    name="description"
    content="Help shoppers across Trinidad & Tobago by submitting the latest prices from your local stores."
  />
</Helmet>
    <div
      style={{
        background: "linear-gradient(135deg,#16a34a,#22c55e)",
        color: "white",
        padding: "24px",
        borderRadius: "16px",
        marginBottom: "20px"
      }}
    >
      <h1 style={{ margin: 0 }}>
        Submit a Price
      </h1>

      <p style={{ marginTop: "10px" }}>
        Help shoppers across Trinidad & Tobago save money.
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}
    >
      <div
style={{
marginBottom:"18px"
}}
>

<label
style={{
display:"block",
fontWeight:"500",
marginBottom:"8px",
fontSize:"15px"
}}
>
Choose Category
</label>


<select
value={selectedCategory}
onChange={(e)=>{

setSelectedCategory(e.target.value);

setForm({
...form,
product_id:"",
variant_id:""
});

}}
style={{
...inputStyle,
background:"#f0fdf4",
border:"2px solid #bbf7d0",
fontWeight:"500"
}}
>


<option value="">
Select a category
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


</div>
            <label>
Product
</label>

<select
  name="product_id"
  value={form.product_id}
  onChange={(e)=>{

    const id = e.target.value;

    setForm({
      ...form,
      product_id:id,
      variant_id:""
    });

    if(id){
      fetchVariants(id);
    }

  }}
  style={inputStyle}
>

  <option value="">
    Select Product
  </option>


  {filteredProducts.map((p) => (

    <option
      key={p.id}
      value={p.id}
    >
      {p.name}
    </option>

  ))}


</select>


{variants.length > 0 && (

<>

<label>
Choose Variation
</label>


<select
  name="variant_id"
  value={form.variant_id}
  onChange={handleChange}
  style={inputStyle}
>


<option value="">
Select Variation
</option>


{variants.map((v)=>(

<option
key={v.id}
value={v.id}
>

{v.variant_name}

</option>

))}


</select>

</>

)}
      <label>Store Name</label>

      <input
        name="store_name"
        placeholder="Massy Stores"
        value={form.store_name}
        onChange={handleChange}
        style={inputStyle}
      />
<label>Region (Optional)</label>

<select
  name="region"
  value={form.region}
  onChange={handleChange}
  style={inputStyle}
>

  <option value="">
    Select Region
  </option>

  <option value="North West">
    North West
  </option>

  <option value="North Central">
    North Central
  </option>

  <option value="North East">
    North East
  </option>

  <option value="Central">
    Central
  </option>

  <option value="South">
    South
  </option>

  <option value="Tobago">
    Tobago
  </option>

</select>
      <label>Town (Optional)</label>

<select
  name="town"
  value={form.town}
  onChange={handleChange}
  style={inputStyle}
>
  <option value="">
    Select Location
  </option>

  <option value="Port of Spain">
    Port of Spain
  </option>

  <option value="Maraval">
    Maraval
  </option>

  <option value="St James">
    St James
  </option>

  <option value="Woodbrook">
    Woodbrook
  </option>

  <option value="Diego Martin">
    Diego Martin
  </option>

  <option value="San Juan">
    San Juan
  </option>

  <option value="Barataria">
    Barataria
  </option>

  <option value="Valsayn">
    Valsayn
  </option>

  <option value="Curepe">
    Curepe
  </option>

  <option value="Tunapuna">
    Tunapuna
  </option>

  <option value="Trincity">
    Trincity
  </option>

  <option value="Arima">
    Arima
  </option>

  <option value="Chaguanas">
    Chaguanas
  </option>

  <option value="Couva">
    Couva
  </option>

  <option value="San Fernando">
    San Fernando
  </option>

  <option value="Princes Town">
    Princes Town
  </option>

  <option value="Penal">
    Penal
  </option>

  <option value="Siparia">
    Siparia
  </option>

  <option value="Point Fortin">
    Point Fortin
  </option>

  <option value="Rio Claro">
    Rio Claro
  </option>

  <option value="Sangre Grande">
    Sangre Grande
  </option>

  <option value="Mayaro">
    Mayaro
  </option>

  <option value="Scarborough">
    Scarborough
  </option>

  <option value="Other">
    Other
  </option>

</select>
      <label>Area / Location</label>

      <input
  name="area"
  placeholder="Area / Street / Mall (e.g. West Mall)"
  value={form.area}
  onChange={handleChange}
  style={inputStyle}
  required
/>

      <label>Price (TTD)</label>

      <input
        name="price"
        type="number"
        placeholder="25.99"
        value={form.price}
        onChange={handleChange}
        style={inputStyle}
      />
      <label>
Description (Optional)
</label>

<textarea
  name="description"
  placeholder="Example: Special offer, promotion, size details..."
  value={form.description}
  onChange={handleChange}
  style={{
    ...inputStyle,
    height:"90px",
    resize:"vertical"
  }}
/>
<label>
Product Image (optional)
</label>

<input
type="file"
accept="image/*"
onChange={(e)=>setImageFile(e.target.files[0])}
/>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "14px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: "10px",
          cursor: "pointer"
        }}
      >
        Submit Price
      </button>
    </form>
  </div>
);
}