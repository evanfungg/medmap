'use client'
import { useState, useEffect } from 'react';

export default function AddForm({ onSubmit }) {
    const [conditions, setConditions] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState('');
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        // Fetch list of conditions from the database
        const fetchConditions = async () => {
            try {
                console.log("test1")
                const res = await fetch('http://localhost:3000/api/conditions');

                if (res.ok) {
                    const conditionsData = await res.json();
                    console.log(conditionsData);
                    setConditions(conditionsData);
                    //console.log(conditions.at(0).name);
                } else {
                    console.error('Failed to fetch conditions:', res.statusText);
                }
            } catch (error) {
                console.error('Error fetching conditions:', error);
            }
        };

        fetchConditions();
    }, []);

    const handleConditionChange = async (e) => {
        setSelectedCondition(e.target.value);
    
        // Fetch list of medications associated with the selected condition
        try {
            const res = await fetch(`http://localhost:3000/api/conditions`);
            if (res.ok) {
                const conditionsData = await res.json();
                const selectedConditionData = conditionsData.find(condition => condition._id === e.target.value);
                if (selectedConditionData) {
                    setMedications(selectedConditionData.medications);
                } else {
                    console.error('Selected condition not found');
                }
            } else {
                console.error('Failed to fetch conditions:', res.statusText);
            }
        } catch (error) {
            console.error('Error fetching conditions:', error);
        }
    };

    const handleMedicationChange = (index, isEffective) => {
        // Find the medication at the specified index
        const updatedMedication = medications[index];

        // Add the isEffective boolean to the medication's is_effective list
        updatedMedication.is_effective.push(isEffective);

        // Update the medications array with the updated medication
        const updatedMedications = [...medications.slice(0, index), updatedMedication, ...medications.slice(index + 1)];
        setMedications(updatedMedications);
        console.log(updatedMedications);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Send condition ID and updated medication data to the backend
          console.log(selectedCondition);
          const response = await fetch(`http://localhost:3000/api/conditions/${selectedCondition}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedCondition, medications }),
          });
      
          if (response.ok) {
            // Medication data for the associated condition was successfully updated
            console.log('Medication data submitted successfully');
            
            // Reset medication state or perform any other necessary actions
            setMedications([]);
          } else {
            // Server returned an error response
            console.error('Failed to update medication data:', response.statusText);
          }
        } catch (error) {
          // An error occurred while sending the request
          console.error('Error updating medication data:', error);
        }
      };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Choose a condition:
                <select value={selectedCondition} onChange={handleConditionChange}>
                    <option value="">Select</option>
                    {conditions.map((condition) => (
                        <option key={condition._id} value={condition._id}>{condition.name}</option>
                    ))}
                </select>
            </label>
            <br />
            {medications.map((medication, index) => (
                <div key={index}>
                    <label>
                        {medication.name} - Is Effective?:
                        <select
                            value={medication.isEffective || ''}
                            onChange={(e) => handleMedicationChange(index, e.target.value === 'true')}
                        >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

