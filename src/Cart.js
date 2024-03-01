import React from 'react';
import './Cart.css';

function Cart({ cartItems }) {
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
          <a href="/registereduser">Home</a>
          <a href="#">Showings</a>
        </div>
      </nav>
      {/* Main content */}
      <div className="main-content">
        <h2>Shopping Cart</h2>
        {cartItems && cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems && cartItems.map((item, index) => (
              <li key={index}>
                <strong>Movie:</strong> {item.movie}<br />
                <strong>Show Time:</strong> {item.showTime}<br />
                <strong>Seats:</strong> {item.seats.join(', ')}<br />
                <strong>Ticket Number:</strong> {item.ticketNumber}<br />
                <strong>Ticket Age:</strong> {item.ticketAge}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Cart;
