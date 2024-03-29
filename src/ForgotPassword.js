import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
//import axios to make HTTP requests 
import axios from 'axios';

import sendConfirmationEmail from './emailSender';


function ForgotPassowrd() {
  //Add more const values as need because this only accounts 
  const [password, setPassword] = useState('');


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

      <form className="forgot-password">
        <div className="input">
          <label>Enter Email:</label>
          <input type="email" id="email" name="email" required></input>
          <label>Enter Current Password:</label>
          <input type="password" id="password" name="password" required></input>
          <label>Enter New Password:</label>
          {/* This is where the actual setting of the new password takes place. I don't know how they want the reset to be
          but we can set it up so that when we click "Send reset request", it'll send an email and also add the changes
          to the database. */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>*Password must contain at least one uppercase letter and one number.</p>
        </div>
        
      </form>

        {/* Reset Button */}
        <div className="register-button">
          <button type="submit" className="register-button">Send Reset Request</button>
        </div>

      </div>
  );
}

export default ForgotPassowrd;
