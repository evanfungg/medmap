'use client'
// import React, { useState } from 'react';


// export default function Home() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResult, setSearchResult] = useState('');
    

     
      
    

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const response = await fetch('http://127.0.0.1:5328/flask/web-search', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ searchQuery: searchQuery }),
//         });

//         const data = await response.json();
//         setSearchResult(data.text);



        
//     };

//     return (
//         <main className="main">
//             <form className="form-container" onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         placeholder="Enter search query"
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         value={searchQuery}
//                     />
//                     <button className="submit" type="submit">Search the Web</button>
//                 </form>
//                 {searchResult}
//         </main>
//     );
// }
import React, { useState } from 'react';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [clientSearchQuery, setClientSearchQuery] = useState('');
    const [clientSearchResult, setClientSearchResult] = useState('');

    const handleWebSearchSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5328/flask/web-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchQuery: searchQuery }),
        });

        const data = await response.json();
        // const otherNames = data.text ? Object.values(data.text).join(", ") : '';
        // setSearchResult(otherNames ? `Other names are: ${otherNames}` : 'No other names found.');
        setSearchResult(data.text);
    };

    const handleClientSearchSubmit = async (event) => {
        event.preventDefault();

        
        const clientSearchResponse = await fetch('http://127.0.0.1:5328/flask/client-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientSearchQuery: clientSearchQuery }),
        });

        const clientSearchData = await clientSearchResponse.json();
        setClientSearchResult(clientSearchData.text);
    };

    return (
        <main className="main">
            <form className="form-container" onSubmit={handleWebSearchSubmit}>
                <input
                    type="text"
                    placeholder="Enter Generic (Scientific) Name of Medication"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
                <button className="submit" type="submit">Search</button>
            </form>
            {searchResult}

            <form className="form-container" onSubmit={handleClientSearchSubmit}>
                <input
                    type="text"
                    placeholder="Enter Brand Name of Medication"
                    onChange={(e) => setClientSearchQuery(e.target.value)}
                    value={clientSearchQuery}
                />
                <button className="submit" type="submit">Search</button>
            </form>
            {clientSearchResult}
        </main>
    );
}
