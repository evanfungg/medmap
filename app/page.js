'use client'
import ConditionMap from '../components/ConditionMap';

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
hello
{data2.conditions.map((conditionData, index) => (
        
        <div key={index}>
          <ConditionMap data={conditionData} id={index} />
        </div>
      ))}
      
    </main>
  );
}