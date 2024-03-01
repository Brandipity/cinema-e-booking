import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderSummary.css';

//I wasn't able to get this working with cartItems from Cart.js, also the css is a w f u l rn

function OrderSummary({ onUpdateCartItem, onDeleteCartItem, onConfirmOrder }) {
  const [creditCard, setCreditCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const totalPrice = 0; // Placeholder for total price

  const handleUpdateCartItem = (index, updatedItem) => {
    onUpdateCartItem(index, updatedItem);
  };

  const handleDeleteCartItem = (index) => {
    onDeleteCartItem(index);
  };

  const handleConfirmOrder = () => {
    onConfirmOrder({ creditCard, expiryDate, cvv });
  };

  return (
    <div>
    <div className="navbar">
      <h2>Order Summary</h2>
      </div>

      <div className="cart-items">
        <h3>Cart Items</h3>
        <p>Your cart is empty.</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
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

          <button type="submit"><a href="/checkout">Continue to Checkout</a></button>
        </form>
      <Link to="/cart">Back to Cart</Link>
      </div>
    </div>
  );
}

export default OrderSummary;
