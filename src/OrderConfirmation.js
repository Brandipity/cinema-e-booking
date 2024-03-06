// OrderConfirmation.js
//import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import React from 'react';
import './OrderConfirmation.css';

function OrderConfirmation() {
  

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span>E-CINEMA CONFIRMATION</span>
        </div>
        <div className="navbar-right">
          <a href="/guest">Home</a>
          <a href="#">Showings</a>
          <a href="/login">Login</a>
          <a href="/cart">Cart</a>
        </div>

      </nav>
      {/*cart-items*/}
      <div className="cart-items">
        <h3>You order has been placed.</h3>
        <p>Thank you for choosing to book with E-CINEMA. You will 
          recieve the ticket information to your registered email.
          Enjoy the movie!
        </p>
      </div>

      {/*order-details*/}
      <div className="order-details">
        <h3>Ticket Details:</h3>
        <p>Movie: No Way Up</p>
        <p> Theater Number: 2</p>
        <p> Seats: A9, A10</p>
      </div>

    
      
    </div>
  );
}

export default OrderConfirmation;