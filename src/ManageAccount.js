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
      </nav>

      {/* Register Button */}
      <div className="register-button">
        <form onSubmit={saveChanges}>
          <button type="submit"><Link to="/registereduser">Save Changes</Link></button>
        </form>
      </div>

      
    </div>
  );
}

export default ManageAccount;