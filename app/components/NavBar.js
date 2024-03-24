
import React from 'react'
import NavButton from '/components/NavButton.js'




const NavBar = () => {
  return (
    <div>NavBar
    {/* <img className = "logo" src = "/medmap.png" alt = "Yuh"></img>*/}
    <NavButton link = './' name = "Home"></NavButton>
    <NavButton link = './med-map' name = "Med Map"></NavButton>
    <NavButton link = './med-search' name = "Med Search"></NavButton>
    </div>
  )
}

export default NavBar