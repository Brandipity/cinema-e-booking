// ManageAccount.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManageAccount.css';

function ManageAccount() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [email, setEmail] = useState('');
  // const [mailingAddress, setMailingAddress] = useState('');
  // const [cardName, setCardName] = useState('');
  // const [cardNumber, setCardNumber] = useState('');
  // const [cardCVV, setCardCVV] = useState('');
  // const [cardExpiration, setCardExpiration] = useState('');

  // Code in order to save any changes the user makes to their information
  const saveChanges = (e) => {
    e.preventDefault();
    // Change the user's information here
    console.log('Changes made goes here');
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span>E-CINEMA</span>
        </div>
        <div className="navbar-right">
          <a href="/registereduser">Home</a>
        </div>
      </nav>

      {/* User Information*/}
      <div className="user-info">
        <div> 
          <label>Username:</label>
        </div>

        <div> 
          <label>Password:</label>
        </div>

        <div>
          <label>First Name:</label>
        </div>

        <div>
          <label>Last Name:</label>
        </div>

        <div> 
          <label>Phone Number:</label>
        </div>

        <div> 
         <label>Email:</label>
        </div>
        
        <div> 
          <label>Mailing Address:</label>
        </div>

        {/* Credit Card Info */}
        <div className="credit-card-info">
          <label>Credit Card 1: </label>
            <p>No information Available</p>
          <label>Credit Card 2: </label>
            <p>No information Available</p>
          <label>Credit Card 2: </label>
            <p>No information Available</p>
        </div>

      {/* Register Button */}
      <div className="register-button">
        <form onSubmit={saveChanges}>
          <button type="submit"><Link to="/registereduser">Save Changes</Link></button>
        </form>
      </div>
      </div>

      
    </div>
  );
}

export default ManageAccount;