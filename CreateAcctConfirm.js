import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAcctConfirm.css';

function CreateAcctConfirm() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [mailingAddress, setMailingAddress] = useState('');
//   const [cardName, setCardName] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardCVV, setCardCVV] = useState('');
//   const [cardExpiration, setCardExpiration] = useState('');
//   const navigate = useNavigate();

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
      </nav>

      {/* Create Account Form */}
      <div className="create-account-form">
        <label>Username:</label>

        <label>Password:</label>
        <label>First Name:</label>

        <label>Last Name:</label>

        <label>Phone Number:</label>

        <label>Email:</label>

        <label>Mailing Address:</label>

        {/* Credit Card Info */}
        <div className="credit-card-info">
          <h2>Credit Card Information (Optional)</h2>
          
        </div>

        {/* Register Button */}
        <div className="register-button">
          <button type="submit" onClick={handleCreateAccount}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAcctConfirm;
