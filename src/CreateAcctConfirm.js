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
          <a href="/login">Login</a>
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
          <h3>Credit Card Information</h3>
          <div> 
            <p>No information Available</p>
          </div>
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
