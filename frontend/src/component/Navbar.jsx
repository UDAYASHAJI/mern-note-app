import React from 'react'
import '../assets/css/Navbar.css'

function Navbar() {
  return (
    <div>
        <nav>
            <ul>
                <li>Note App</li>
                <li><input type="search" placeholder='search'/></li>
                <li>username</li>
                <li><button>Logout</button></li>
            </ul>
        </nav>
      
    </div>
  )
}

export default Navbar
