import { useEffect } from "react";

export default function AdBanner({ slot }) {

useEffect(()=>{

(window.adsbygoogle = window.adsbygoogle || []).push({});

},[]);


return (

<div
style={{
margin:"20px 0",
textAlign:"center"
}}
>

<ins
className="adsbygoogle"
style={{
display:"block"
}}
data-ad-client="ca-pub-3353924745954706"
data-ad-slot={slot}
data-ad-format="auto"
data-full-width-responsive="true"
/>

</div>

);

}