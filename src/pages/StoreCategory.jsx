import { Link, useParams } from "react-router-dom";

export default function StoreCategory() {

  const { type } = useParams();

  const stores = {

    grocery: [
      "Massy Stores",
      "Better Deals",
      "Xtra Foods",
      "PriceMart",
      "Janam Supermarket",
      "JTA Supermarket",
      "Guangzhou Supermarket",
      "Low Cost Supermarket",
      "Happiness Supermarket",
      "West Bees"
    ],

    pharmacy: [
      "SuperPharm",
      "Ellie's Medicine",
      "Anands Pharmacy"
    ],

    beauty: [
      "Pennywise",
      "BelAir Store"
    ],

    variety: [
      "BelAir Store",
    ],

    furniture: [
      "Furniture Plus",
      "Courts"
    ],

    books: [
      "Charrans Bookstore",
      "Unique Books and Sports Centre"
    ]

  };


  const icons = {
    grocery:"🛒",
    pharmacy:"💊",
    beauty:"💄",
    furniture:"🛋️",
    books:"📚",
    variety:"🏪"
  };


  return (

    <div style={{padding:"20px"}}>

      <h1>
        {icons[type]} {type}
      </h1>


      <div
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
        gap:"15px"
      }}
      >

      {(stores[type] || []).map((store)=>(

        <Link
        key={store}
        to={`/store/${store}`}
        style={{
          textDecoration:"none",
          color:"#333"
        }}
        >

          <div
          style={{
            background:"#fff",
            padding:"20px",
            borderRadius:"18px",
            boxShadow:"0 4px 12px rgba(0,0,0,.08)",
            textAlign:"center"
          }}
          >

            <div style={{fontSize:"40px"}}>
              🏪
            </div>

            <h3>
              {store}
            </h3>

            <p>
              View Prices →
            </p>

          </div>

        </Link>

      ))}

      </div>


    </div>

  );
}