import { useState } from "react";
import logo from "../assets/comparett-logo.png";

export default function FloatingContact() {

  const [open,setOpen] = useState(false);

  return (

    <>
      {open && (

        <div
          style={{
            position:"fixed",
            bottom:"90px",
            right:"20px",
            background:"#fff",
            borderRadius:"16px",
            padding:"15px",
            boxShadow:"0 8px 24px rgba(0,0,0,.2)",
            zIndex:999
          }}
        >

          <a
            href="https://wa.me/18684639744"
            target="_blank"
            rel="noreferrer"
            style={{display:"block",marginBottom:"12px"}}
          >
            📱 WhatsApp
          </a>

          <a
            href="mailto:comparettprices@yahoo.com"
            style={{display:"block",marginBottom:"12px"}}
          >
            📧 Email
          </a>

          <a href="/feedback">
            💡 Suggest a Feature
          </a>

        </div>

      )}

      <button

        onClick={()=>setOpen(!open)}

        style={{

          position:"fixed",
          bottom:"20px",
          right:"20px",

          width:"65px",
          height:"65px",

          borderRadius:"50%",

          border:"3px solid #16a34a",

          background:"white",

          color:"white",

          fontSize:"28px",

          cursor:"pointer",

          boxShadow:"0 8px 20px rgba(0,0,0,.25)",

          zIndex:1000

        }}

      >

<img
src={logo}
alt="CompareTT"
style={{
width:"50px",
height:"50px",
objectFit:"contain"
}}
/>

</button>

    </>

  );

}