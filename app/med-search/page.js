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
import './style.css';

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

    // const handleWebSearchInputKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         handleWebSearchSubmit();
    //     }
    // };

    // const handleClientSearchInputKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         handleClientSearchSubmit();
    //     }
    // };

    return (
        <main className="main">
            <h1 className="title">Medication Search</h1> 
            <form className="form-container" onSubmit={handleWebSearchSubmit}>
                <input
                    type="text"
                    placeholder="Enter Generic (Scientific) Name of Medication"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // onKeyDown={handleWebSearchInputKeyDown}
                    value={searchQuery}
                />
                <button className="submit" type="submit">Search</button>
            </form>
            <div className="search-result">{searchResult}</div> 
            {/* {searchResult} */}

            <form className="form-container" onSubmit={handleClientSearchSubmit}>
                <input
                    type="text"
                    placeholder="Enter Brand Name of Medication"
                    onChange={(e) => setClientSearchQuery(e.target.value)}
                    // onKeyDown={handleClientSearchInputKeyDown}
                    value={clientSearchQuery}
                />
                <button className="submit" type="submit">Search</button>
            </form>
            <div className="search-result">{clientSearchResult}</div>
            <div className="image-container">
                <img src="https://www.duffystric.com/var/images/product/500.500/D/4614-01.jpg" alt="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pill_1.jpg/1200px-Pill_1.jpg" className="image" id="advil"/>
                <img src="https://symbols.getvecta.com/stencil_195/15_right-arrow.a0745525dc.svg" alt="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pill_1.jpg/1200px-Pill_1.jpg" className="image" id="arrow"/>
                
                <img src="https://www.researchgate.net/profile/Murad-Abualhasan/publication/270283844/figure/fig1/AS:613968762642434@1523392968418/Chemical-structure-of-Ibuprofen.png" alt="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pill_1.jpg/1200px-Pill_1.jpg" className="image" id="ibu"/>
            </div>
            {/* <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pill_1.jpg/1200px-Pill_1.jpg" alt="" />
            <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pill_1.jpg/1200px-Pill_1.jpg" alt="" /> */}
            {/* {clientSearchResult} */}
        </main>
    );
}
