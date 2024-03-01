import React from 'react';
import './Admin.css';

function ManageMovies() {
  return (

    <div>

    <nav className="navbar">
      <div className="navbar-left">
        <span>E-CINEMA</span>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search" />
      </div>
      <div className="navbar-right">
        <a href="/registereduser"> Home </a>
        <a href="/admin"> Admin </a>
      </div>
    </nav>
    
      <div className="main-content">
        <h2>Manage Movies</h2>
        {/* add API stuff here */}
      </div> </div>
  );
}

export default ManageMovies;
