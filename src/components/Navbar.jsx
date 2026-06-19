import { Link } from "react-router-dom";

export default function Navbar() {

  return (

    <nav
      style={{
        background:"white",
        padding:"15px 20px",
        borderBottom:"1px solid #eee",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        position:"sticky",
        top:0,
        zIndex:100
      }}
    >

      

      <div
        style={{
          display:"flex",
          gap:"15px"
        }}
      >

        <Link
          to="/"
          style={linkStyle}
        >
          Home
        </Link>


        <Link
          to="/categories"
          style={linkStyle}
        >
          Categories
        </Link>
<Link
to="/login"
style={linkStyle}
>
Login
</Link>

        <Link
          to="/submit-price"
          style={linkStyle}
        >
          Submit Price
        </Link>

<Link
  to="/about"
  style={linkStyle}
>
  About
</Link>

<Link
  to="/privacy-policy"
  style={linkStyle}
>
  Privacy Policy
</Link>

<Link
  to="/terms"
  style={linkStyle}
>
  Terms
</Link>

<Link
  to="/contact"
  style={linkStyle}
>
  Contact
</Link>
      </div>


    </nav>

  );
}


const linkStyle = {
  textDecoration:"none",
  color:"#555",
  fontSize:"14px"
};