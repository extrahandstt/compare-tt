import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function PartnerForm(){
const [logo,setLogo] = useState(null);
const [form,setForm] = useState({
business_name:"",
category:"",
location:"",
contact_person:"",
phone:"",
whatsapp:"",
email:"",
website:"",
description:""
});

function update(e){
setForm({
...form,
[e.target.name]: e.target.value
});
}

async function submit(){

let logoUrl = null;

// 1. upload logo first (if exists)
if(logo){

const fileName = `${Date.now()}-${logo.name}`;

const {error:uploadError} = await supabase
.storage
.from("product-images") // or better: "business-logos"
.upload(fileName, logo);

if(uploadError){
alert(uploadError.message);
return;
}

const {data} = supabase
.storage
.from("product-images")
.getPublicUrl(fileName);

logoUrl = data.publicUrl;
}

// 2. save application
const {error}=await supabase
.from("partner_applications")
.insert({
...form,
logo_url: logoUrl
});

if(error){
alert(error.message);
return;
}

alert("Application submitted! We will contact you on WhatsApp.");

// reset
setForm({
business_name:"",
category:"",
location:"",
contact_person:"",
phone:"",
whatsapp:"",
email:"",
website:"",
description:""
});

setLogo(null);
}

return (

<div style={{maxWidth:"800px",margin:"40px auto",fontFamily:"Arial"}}>

{/* HERO */}
<div style={{marginBottom:"25px"}}>

<h1>Get More Customers With CompareTT</h1>

<p style={{fontSize:"16px",color:"#444"}}>
Join Trinidad’s price comparison network and let customers find your business when they are ready to buy — not just browsing.
</p>

<div style={{
background:"#16a34a",
color:"white",
padding:"12px",
borderRadius:"10px",
marginTop:"15px"
}}>
Limited Founding Partner spots available
</div>

</div>


{/* BENEFITS */}
<div style={{marginBottom:"25px"}}>

<h3>Why businesses join</h3>

<ul>
<li>📈 Get discovered when people compare prices</li>
<li>💰 Attract price-sensitive customers ready to buy</li>
<li>📍 Show up in local search results</li>
<li>🏆 Founding Partner badge (early access advantage)</li>
<li>📊 Future “Price Promise eligibility” program</li>
</ul>

</div>


{/* FORM */}
<div style={{
background:"white",
padding:"20px",
borderRadius:"15px"
}}>

<h3>Apply to join</h3>

<input name="business_name" placeholder="Business Name" value={form.business_name} onChange={update} style={{width:"100%",padding:"10px",marginBottom:"10px"}} />

<input name="category" placeholder="Category" value={form.category} onChange={update} style={{width:"100%",padding:"10px",marginBottom:"10px"}} />

<input name="location" placeholder="Location" value={form.location} onChange={update} style={{width:"100%",padding:"10px",marginBottom:"10px"}} />

<input name="contact_person" placeholder="Contact Person" value={form.contact_person} onChange={update} style={{width:"100%",padding:"10px",marginBottom:"10px"}} />

<input name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={update} style={{width:"100%",padding:"10px",marginBottom:"10px"}} />

<input name="email" placeholder="Email" value={form.email} onChange={update} style={{width:"100%",padding:"10px",marginBottom:"10px"}} />

<input name="website" placeholder="Website / Social Media" value={form.website} onChange={update} style={{width:"100%",padding:"10px",marginBottom:"10px"}} />

<textarea name="description" placeholder="Tell us about your business" value={form.description} onChange={update} style={{width:"100%",padding:"10px",marginBottom:"10px"}} />
<label>Business Logo</label>

<input
type="file"
accept="image/*"
onChange={(e)=>setLogo(e.target.files[0])}
/>
<button onClick={submit} style={{
background:"#16a34a",
color:"white",
padding:"14px",
border:"none",
borderRadius:"10px",
width:"100%"
}}>
Submit Application
</button>

</div>

{/* WHATSAPP CTA */}
<div style={{marginTop:"20px",textAlign:"center"}}>

<p>Need help? Message us directly</p>

<a href="https://wa.me/18684639744"
style={{color:"#16a34a",fontWeight:"bold"}}>
Chat on WhatsApp
</a>

</div>

</div>

);
}