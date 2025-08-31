import React from 'react';
import "../App.css";

// Import the background image as a variable
import heroBg from "../assets/Untitled design (1).jpg";

function Searchbar() {
  return (
    <form
      className="search-bar"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <input type="text" placeholder="Search temples by name, location, or deity" />
      <select>
        <option>All Locations</option>
        {/* Add more location options here if needed */}
      </select>
      <select>
        <option>All Types</option>
        {/* Add more type options here if needed */}
      </select>
      <button type="submit" className="search-btn">Search</button>
    </form>
  );
}

export default Searchbar;