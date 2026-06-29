import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
      "West Bees",
      "Price Club",
      "Pierre Road",
      "Uncle Khalid",
      "Persad's D Food King",
      "ChaseMart",
      "Cedric Dookie Supermarket"
        ],

    pharmacy: [
      "SuperPharm",
      "Ellie's Medicine",
      "Anands Pharmacy"
    ],

    beauty: [
      "Pennywise",
      "Sasha Cosmetics"
    ],

    variety: [
      "BelAir Store",
    ],

    furniture: [
      "Furniture Plus",
      "Courts",
      "Standards"
    ],

    books: [
      "Charrans Bookstore",
      "Unique Books and Sports Centre",
      "RIK Bookstore"
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


const colors = {
    grocery:"#dcfce7",
    pharmacy:"#dbeafe",
    beauty:"#fce7f3",
    furniture:"#ffedd5",
    books:"#fef3c7",
    variety:"#e0f2fe"
};

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
  background: colors[type],
  padding:"20px",
  borderRadius:"18px",
  boxShadow:"0 8px 20px rgba(0,0,0,.12)",
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

  </>

);

}