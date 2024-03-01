// GuestPage.js

import React from 'react';
import './GuestPage.css';

function GuestPage() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span>E-CINEMA</span>
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Search" />
        </div>
        <div className="navbar-right">
          <a href="#">Home</a>
          <a href="#">Showings</a>
          <a href="/login">Login</a>
          <a href="/cart">Cart</a>
        </div>
      </nav>

      {/* Main content */}
      <div className="main-content">
        <div className="main-section">
          <h2>Currently Running</h2>
          {/* Add content for Currently Running section */}
        </div>
        
        <div className="main-section">
          <h2>Coming Soon</h2>
          {/* Add content for Coming Soon section */}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-category">
          <h3>Account</h3>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/createaccount">Create Account</a></li>
            <li><a href="/registereduser">Manage Account</a></li>
          </ul>
        </div>

        <div className="footer-category">
          <h3>View Bookings</h3>
          <ul>
            <li>View Theaters</li>
            <li>Promotions & Deals</li>
          </ul>
        </div>

        <div className="footer-category">
          <h3>Contact</h3>
          <ul>
            <li>Email</li>
            <li>Creators</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default GuestPage;
