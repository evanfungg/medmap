'use client'
import { useState, useEffect } from 'react';
import ConditionMap from '../components/ConditionMap';
import NavBar from '../components/NavBar.js'

const getConditions = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/conditions", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    
    return res.json();

  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default function Home() {
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const conditionsData = await getConditions();
      setData1(conditionsData);
    };

    fetchData();
  }, []);

  return (
    <main>
      <NavBar></NavBar>

      {data1.map((conditionData, index) => (
        <div key={index}>
          <ConditionMap data={conditionData} id={index} />
        </div>
      ))}

    </main>
  );
}
