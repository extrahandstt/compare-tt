export default function PartnerBadge({ status }) {

  if (!status || status === "none") return null;


  const data = {

    founding: {
      title:"FOUNDING PARTNER",
      subtitle:"Early Compare TT Supporter",
      icon:"🏆",
      color:"#d4af37"
    },

    verified:{
      title:"VERIFIED PARTNER",
      subtitle:"Trusted Compare TT Store",
      icon:"✓",
      color:"#16a34a"
    },

    featured:{
      title:"FEATURED PARTNER",
      subtitle:"Top Compare TT Store",
      icon:"🔥",
      color:"#dc2626"
    }

  };


  const badge = data[status];


  if(!badge) return null;


return (

<div
style={{
display:"inline-flex",
alignItems:"center",
gap:"10px",
background:"#fff",
border:`2px solid ${badge.color}`,
padding:"8px 14px",
borderRadius:"14px",
boxShadow:"0 4px 12px rgba(0,0,0,.12)",
marginTop:"10px"
}}
>


<div
style={{
width:"35px",
height:"35px",
borderRadius:"50%",
background:badge.color,
color:"#fff",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold",
fontSize:"18px"
}}
>
{badge.icon}
</div>


<div>

<div
style={{
fontWeight:"800",
fontSize:"12px",
color:"#333"
}}
>
{badge.title}
</div>


<div
style={{
fontSize:"11px",
color:"#666"
}}
>
{badge.subtitle}
</div>


</div>


</div>

)

}