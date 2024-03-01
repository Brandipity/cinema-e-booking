import React from 'react';
import './Admin.css';

function ManagePromotions() {
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
        <h2>Manage Promotions</h2>
        {/* add API stuff */}
      </div> </div>
  );
}

export default ManagePromotions;
