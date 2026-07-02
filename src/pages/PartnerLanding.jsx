import React from "react";
import logo from "../assets/comparett-logo.png";
export default function PartnerLanding() {
    function AnimatedCounter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const target = 125000; // fake or replace later with real Supabase data
    const step = target / 100;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + step;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return <span>${Math.floor(count).toLocaleString()}</span>;
}
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f8fafc",
        color: "#111827",
      }}
    >
<nav
  style={{
    position: "sticky",
    top: 0,
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    borderBottom: "1px solid #eee",
    zIndex: 1000
  }}
>
  <img
    src={logo}
    alt="CompareTT"
    style={{ width: "110px" }}
  />

  <a href="/partner">
    <button
      style={{
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >
      Become a Partner
    </button>
  </a>
</nav>
      {/* HERO */}
      <section
  style={{
    padding: "70px 20px",
    textAlign: "center",
    background: "white",
  }}
>

  <img
  src={logo}
  alt="CompareTT Logo"
  style={{
    width: "160px",
    height: "auto",
    marginBottom: "12px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    transform: "translateY(-3px)",
  }}
/>

  <h1
    style={{
      fontSize: "42px",
      marginBottom: "15px",
    }}
  >
    Save Money Before You Spend It
  </h1>

        <p
          style={{
            fontSize: "20px",
            maxWidth: "650px",
            margin: "0 auto 30px",
            color:"#555"
          }}
        >
          Compare prices from stores across Trinidad & Tobago and find
          better deals before you shop.
        </p>


        <div>

          <button
            style={{
              background:"#16a34a",
              color:"white",
              border:"none",
              padding:"15px 25px",
              borderRadius:"12px",
              margin:"8px",
              fontSize:"16px",
              cursor:"pointer"
            }}
          >
            Start Saving Money
          </button>


          <button
            style={{
              background:"#111827",
              color:"white",
              border:"none",
              padding:"15px 25px",
              borderRadius:"12px",
              margin:"8px",
              fontSize:"16px",
              cursor:"pointer"
            }}
          >
            Partner With Compare TT
          </button>
<h2
  style={{
    fontSize: "22px",
    marginTop: "30px",
    color: "#16a34a"
  }}
>
  Shoppers have saved over <AnimatedCounter /> in potential overpayments
</h2>
        </div>


        {/* SAVING EXAMPLE */}
        <div
          style={{
            marginTop:"40px",
            display:"flex",
            justifyContent:"center",
            gap:"20px",
            flexWrap:"wrap"
          }}
        >

          <div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 3px 10px rgba(0,0,0,.08)"
  }}
>
  <h3>Example Price Comparison</h3>

  <p>Same product across stores:</p>

  <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
    <PriceCard store="Store A" price="$35" />
    <PriceCard store="Store B" price="$29" />
    <PriceCard store="Store C" price="$31" />
  </div>

  <h3 style={{ color: "#16a34a" }}>
    You could save up to $6 per item
  </h3>
</div>

          <div
  style={{
    padding: "12px 16px",
    background: "#dcfce7",
    borderRadius: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "14px",
    whiteSpace: "nowrap"
  }}
>
  💰 You save $6
</div>

        </div>

      </section>



      {/* SAVINGS FEATURES */}
      <section
        style={{
          padding:"60px 20px",
          textAlign:"center"
        }}
      >

        <h2>Helping shoppers make smarter buying decisions</h2>


        <div style={grid}>

          <Feature
            title="💰 Compare prices"
            text="Find where products cost less."
          />

          <Feature
            title="🏪 Check multiple stores"
            text="Know your options before buying."
          />

          <Feature
            title="🔥 Find deals"
            text="Discover promotions and offers."
          />

          <Feature
            title="📉 Avoid overpaying"
            text="Make every dollar count."
          />

        </div>

      </section>




      {/* BUSINESS SECTION */}
      <section
        style={{
          background:"white",
          padding:"60px 20px",
          textAlign:"center"
        }}
      >

        <h2>
          Help Customers Find Better Prices From Your Business
        </h2>


        <p
          style={{
            maxWidth:"650px",
            margin:"20px auto",
            color:"#555"
          }}
        >
          Join Compare TT and become part of the platform helping
          Trinidad & Tobago shoppers save money.
        </p>


        <div style={grid}>

          <Feature
            title="✅ Business profile"
            text="Help customers discover your business."
          />

          <Feature
            title="✅ Showcase products"
            text="Display what you offer."
          />

          <Feature
            title="✅ Promote deals"
            text="Share offers with shoppers."
          />

          <Feature
            title="✅ Build trust"
            text="Verified business information."
          />

        </div>

      </section>




      {/* HOW IT WORKS */}
      <section
        style={{
          padding:"60px 20px",
          textAlign:"center"
        }}
      >

        <h2>How Compare TT Saves You Money</h2>


        <div style={grid}>

          <Feature
            title="1. Search"
            text="Find the product you need."
          />

          <Feature
            title="2. Compare"
            text="See different store prices."
          />

          <Feature
            title="3. Choose"
            text="Make smarter spending decisions."
          />

        </div>

      </section>





      {/* PARTNER CTA */}
      <section
  style={{
    background: "#16a34a",
    color: "white",
    padding: "70px 20px",
    textAlign: "center"
  }}
>
  <h2>Get Your Business Discovered by Smart Shoppers</h2>

  <p style={{ maxWidth: "650px", margin: "20px auto" }}>
    Join Compare TT and let customers find your prices before they even leave home.
  </p>

  <a href="/partner">
    <button
      style={{
        background: "white",
        color: "#16a34a",
        padding: "15px 30px",
        borderRadius: "12px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Apply as Partner
    </button>
  </a>
</section>



      {/* PRICE PROMISE */}
      <section
        style={{
          padding:"50px 20px",
          textAlign:"center",
          background:"white"
        }}
      >

        <h2>
          Compare TT Price Promise (Coming Soon)
        </h2>


        <p
          style={{
            maxWidth:"650px",
            margin:"20px auto",
            color:"#555"
          }}
        >
          Eligible businesses may qualify for future Price Promise
          features designed to highlight businesses that provide
          competitive prices and customer value.
        </p>

      </section>


    </div>
  );
}




function Feature({title,text}){

return (

<div
style={{
background:"white",
padding:"25px",
borderRadius:"15px",
boxShadow:"0 3px 10px rgba(0,0,0,.08)"
}}
>

<h3>{title}</h3>

<p style={{color:"#666"}}>
{text}
</p>

</div>

)

}



function PriceCard({store,price}){

return (

<div
style={{
background:"#fff",
padding:"25px",
borderRadius:"15px",
boxShadow:"0 3px 10px rgba(0,0,0,.08)"
}}
>

<h3>{store}</h3>

<h2>{price}</h2>

</div>

)

}



const grid = {

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

maxWidth:"1000px",

margin:"40px auto"

};