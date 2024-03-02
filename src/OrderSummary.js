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
    <div className="navbar-left">
          <span>E-CINEMA SUMMARY</span>
        </div>
      </div>
      <div className="cart-items">
        <h3>Cart Items</h3>
        <p>Your cart is empty.</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>
      <div className="payment-form">
        <h3>Payment Information</h3>
        <form >
          <button type="submit"><a href="/orderconfirmation">Confirm</a></button>
        </form>
      <Link to="/cart">Back to Cart</Link>
      </div>
    </div>
  );
}

export default OrderSummary;
