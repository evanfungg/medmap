'use client'
import NavBar from "./components/NavBar.js"

export default function Home() {
  

  const data2 = {
  "conditions": [
    {
      "condition": "Hypertension",
      "medications": [
        {
          "name": "Lisinopril",
          "is_effective": [false, true, false]
        },
        {
          "name": "Amlodipine",
          "is_effective": [true, false, true]
        },
        {
          "name": "Hydrochlorothiazide",
          "is_effective": [true, false, true]
        }
      ]
    },
    
    {
      "condition": "Diabetes",
      "medications": [
        {
          "name": "Metformin",
          "is_effective": [true, true, false]
        },
        {
          "name": "Glipizide",
          "is_effective": [false, true, true]
        },
        {
          "name": "Insulin",
          "is_effective": [true, true, true]
        }
      ]
    }
   
  ]
};

  
  
  

 

  return (
    <main>
      homepage
      <NavBar></NavBar>

      
    </main>
  );
}