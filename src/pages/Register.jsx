import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Register(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");

  const navigate = useNavigate();


  async function register(){

    if(password !== confirm){
      alert("Passwords do not match");
      return;
    }


    const { error } = await supabase.auth.signUp({
      email,
      password
    });


    if(error){
      alert(error.message);
      return;
    }


    alert("Account created! Please login.");

    navigate("/login");

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
        Create Account
      </h1>


      <p
      style={{
        color:"#666"
      }}
      >
        Join CompareTT and help shoppers find better prices.
      </p>



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



      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e)=>setConfirm(e.target.value)}
        style={{
          width:"100%",
          padding:"12px",
          marginBottom:"15px",
          borderRadius:"8px",
          border:"1px solid #ddd"
        }}
      />



      <button
        onClick={register}
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
        Create Account
      </button>



      <p
      style={{
        marginTop:"20px",
        textAlign:"center"
      }}
      >

      Already have an account?{" "}

      <span
      onClick={()=>navigate("/login")}
      style={{
        color:"#16a34a",
        fontWeight:"bold",
        cursor:"pointer"
      }}
      >
        Login
      </span>


      </p>


    </div>

  );

}