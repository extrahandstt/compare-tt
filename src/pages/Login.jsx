import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  async function login() {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });


    if (error) {
      alert(error.message);
      return;
    }


    alert("Logged in!");

    navigate("/submit-price");

  }



  return (

    <div
      style={{
        padding:"20px",
        maxWidth:"400px",
        margin:"0 auto",
        fontFamily:"Arial"
      }}
    >

      <h1>
        Login
      </h1>


      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{
          width:"100%",
          padding:"12px",
          marginBottom:"10px",
          borderRadius:"8px",
          border:"1px solid #ddd"
        }}
      />


      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{
          width:"100%",
          padding:"12px",
          marginBottom:"10px",
          borderRadius:"8px",
          border:"1px solid #ddd"
        }}
      />


      <button
        onClick={login}
        style={{
          width:"100%",
          padding:"12px",
          background:"#16a34a",
          color:"white",
          border:"none",
          borderRadius:"8px",
          cursor:"pointer",
          fontWeight:"bold"
        }}
      >
        Login
      </button>



      <p
        style={{
          marginTop:"20px",
          textAlign:"center"
        }}
      >

        Don't have an account?{" "}

        <span
          onClick={() => navigate("/register")}
          style={{
            color:"#16a34a",
            fontWeight:"bold",
            cursor:"pointer"
          }}
        >
          Register
        </span>

      </p>


    </div>

  );

}