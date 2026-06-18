import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);


  async function fetchCategories(){

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");


    if(error){
      console.log(error);
      return;
    }


    setCategories(data || []);

  }


  return (
    <div 
    style={{ 
      padding:"20px",
      maxWidth:"700px",
      margin:"0 auto"
    }}
    >

      <h1>
        Browse Categories
      </h1>


      <div
      style={{
        display:"grid",
        gap:"12px"
      }}
      >

      {categories.map((cat,index)=>(


        <Link

          key={cat.id}

          to={`/category/${cat.slug}`}

          style={{
            textDecoration:"none",
            color:"inherit"
          }}

        >


        <div

        style={{

          padding:"18px",

          borderRadius:"14px",

          background:
          [
            "#dbeafe",
            "#dcfce7",
            "#fef3c7",
            "#fce7f3",
            "#ede9fe"
          ][index % 5],

          boxShadow:
          "0 3px 10px rgba(0,0,0,0.08)"

        }}

        >

          <h3 style={{margin:0}}>
            {cat.name}
          </h3>


          <p
          style={{
            marginBottom:0,
            color:"#666",
            fontSize:"14px"
          }}
          >
            Compare prices →
          </p>


        </div>


        </Link>


      ))}

      </div>


    </div>
  );
}