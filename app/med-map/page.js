'use client'
import React, { useState, useEffect } from 'react';
import ConditionMap from '../components/ConditionMap';
import AddForm from '../components/AddForm';
import NavBar from '../components/NavBar.js';
import './styles.css';

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
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const conditionsData = await getConditions();
      setData(conditionsData);
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  // pop up stuff
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <main className='main'>
      <NavBar />
      {data.length > 0 && (
        <div className="graphContainer">
          <button onClick={handlePrevious}>&lt;</button>
          <div className="graphCard">
            <ConditionMap data={data[currentIndex]} id={currentIndex} />
          </div>
          <button onClick={handleNext}>&gt;</button>
        </div>
      )}
      <div>
        <div className="popup">
          <button onClick={openPopup}>Add Condition</button>
          {showPopup && (
            <div className="popup-content">
              <span className="close" onClick={closePopup}>&times;</span>
              <h2>Select a condition</h2>
              <AddForm />
            </div>)}
          </div>
      </div>
    </main>
  );
}
