import React from 'react'
import Link from "next/link"


const NavButton = ({link, name}) => {
  return (
    <Link href = {link}><button>{name}</button></Link>
  )
}

export default NavButton