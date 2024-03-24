'use client'
import './styles.css'
import NavBar from "./components/NavBar.js"

export default function Home() {
  
 

  return (
    <main className= 'main'>
      
      
      <NavBar></NavBar>
      <div className = 'content'>Welcome to MEDMAP</div>

      
    </main>
  );
}