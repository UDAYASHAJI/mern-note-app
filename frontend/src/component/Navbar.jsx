import React from 'react';
import '../assets/css/Navbar.css';

function Navbar({ username = "User" }) {
  return (
    <nav>
      <ul>
        <li>Note App</li>
        <li>
          <input type="search" placeholder="Search notes..." />
        </li>
        <li>{username}</li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
