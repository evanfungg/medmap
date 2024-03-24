'use client'
import React, { useState } from 'react';


export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');
    

     
      
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5328/flask/web-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchQuery: searchQuery }),
        });

        const data = await response.json();
        setSearchResult(data.text);



        
    };

    return (
        <main className="main">
            <form className="form-container" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter search query"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    <button className="submit" type="submit">Search the Web</button>
                </form>
                {searchResult}
        </main>
    );
}
