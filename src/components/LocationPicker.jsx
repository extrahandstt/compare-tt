import { useState } from "react";

export default function LocationPicker({ location, setLocation }) {

  const locations = [
  "all",

  "Port of Spain",
  "Maraval",
  "St James",
  "Woodbrook",
  "Diego Martin",
  "San Juan",
  "Barataria",
  "Valsayn",
  "Curepe",
  "Tunapuna",
  "Trincity",
  "Arima",
  "Chaguanas",
  "Couva",
  "San Fernando",
  "Princes Town",
  "Penal",
  "Siparia",
  "Point Fortin",
  "Rio Claro",
"Sangre Grande",
  "Mayaro",
  "Scarborough",
  
  "Other"
];


  return (

    <select
      value={location}
      onChange={(e)=>setLocation(e.target.value)}
      style={{
        padding:"10px",
        borderRadius:"10px",
                border:"1px solid rgba(255,255,255,0.3)",
        width:"100%",
        marginBottom:"15px"
      }}
    >

      {locations.map((loc)=>(
        <option key={loc} value={loc}>
          {loc === "all"
          ? "📍 All Trinidad & Tobago"
          : `📍 ${loc}`}
        </option>
      ))}


    </select>

  );
}