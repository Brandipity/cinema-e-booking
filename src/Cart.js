
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ onUpdateCartItem, onDeleteCartItem, onConfirmOrder }) {
  const [creditCard, setCreditCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const totalPrice = 0; // Placeholder for total price
  const [cartItems, setCartItems] = useState([]);

  const handleUpdateCartItem = (index, updatedItem) => {
    onUpdateCartItem(index, updatedItem);
  };
  const handleDeleteCartItem = (index) => {
    onDeleteCartItem(index);
  };
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/bookings/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 1,
        creditCard,
        expiryDate,
        cvv
      }),
    })
        .then(response => response.json())
        .then(() => {
          console.log('Order confirmed');
          setCartItems([]); // Clear the cart
        })
        .catch(error => console.error("Failed to confirm order:", error));
  };

  useEffect(() => {
    const userId = 1;
    fetch(`http://localhost:3001/api/bookings/unconfirmed/${userId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data);
          setCartItems(data);
        })
        .catch(error => console.error("Failed to fetch cart items:", error));
  }, []);


  return (
    <div>
    <div className="navbar">
    <div className="navbar-left">
          <span>E-CINEMA CART</span>
        </div>
      </div>
      <div className="cart-items">
        <h3>Cart Items</h3>
        {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
                <div key={index}>
                  <p>{item.movieTitle} - ${item.price}</p>
                  <button onClick={() => handleUpdateCartItem(index, item)}>Update</button>
                  <button onClick={() => handleDeleteCartItem(index)}>Remove</button>
                </div>
            ))
        ) : (
            <p>Your cart is empty.</p>
        )}
        <p><strong>Total Price:</strong> ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
      </div>
      <div className="payment-form">
        <h3>Payment Information</h3>
        <form onSubmit={handleConfirmOrder}>
          <label htmlFor="creditCard">Credit Card Number:</label>
          <input type="text" id="creditCard" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} required />
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
          <button type="submit"><a href="/ordersummary">Continue to Confirmation</a></button>
        </form>
      <Link to="/guest">Back</Link>
      </div>
    </div>
  );
}
export default Cart;
