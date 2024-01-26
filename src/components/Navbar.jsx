import React, { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => [
        setIsMenuOpen(!isMenuOpen)
    ]
  return (
    <nav>
      <a href='/'>WorkSpace</a>
    </nav>
  )
}

export default Navbar
