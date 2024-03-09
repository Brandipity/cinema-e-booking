import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Add your create account logic here
    console.log('Create account logic goes here');

    // Redirect the user after successful account creation
    navigate('/registereduser');
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span>E-CINEMA</span>
        </div>
        <div className="navbar-right">
          <a href="/guest">Continue as Guest</a>
          <a href="/login">Login</a>
        </div>
      </nav>

      {/* Create Account Form */}
      <div className="create-account-form">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Password must contain at least one uppercase letter and one number.</p>

        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mailing Address:</label>
        <input
          type="text"
          value={mailingAddress}
          onChange={(e) => setMailingAddress(e.target.value)}
        />

        {/* Credit Card Info */}
        <div className="credit-card-info">
          <h2>Credit Card Information (Optional)</h2>
          
          <div className="credit-card-inputs">
            <div className="credit-card-input">
              <label>Name on Card:</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>

            <div className="credit-card-input">
              <label>Card Number:</label>
              <input
                type="password"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div className="credit-card-input">
              <label>CVV:</label>
              <input
                type="password"
                value={cardCVV}
                onChange={(e) => setCardCVV(e.target.value)}
              />
            </div>

            <div className="credit-card-input">
              <label>Expiration Date:</label>
              <input
                type="text"
                value={cardExpiration}
                onChange={(e) => setCardExpiration(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="register-button">
          <button><Link to="/createacctconfirm">Create Account</Link></button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
