import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import ForgotPasswordEmailSender from './ForgotPasswordEmailSender'; //added forgotpasswordemailsender

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
    e.preventDefault();

    try {
      // Send reset email (email confirmation??)
      await ForgotPasswordEmailSender(email, 'YOUR_RESET_LINK');

      // Show the popup
      setShowPopup(true);

      // Redirect to login page after 1 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <span>E-CINEMA</span>
        </div>
        <div className="navbar-right">
          <a href="/guest">Continue as Guest</a>
          <a href="/login">Login</a>
        </div>
      </nav>

      <form className="forgot-password" onSubmit={handleResetRequest}>
        <div className="input">
          <label>Enter Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Enter Old Password:</label>
          <input
            type="password"
            id="oldpassword"
            name="oldpassword"
          />
          <label>Enter New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p>*Password must contain at least one uppercase letter and one number.</p>
        </div>
        
        <div className="register-button">
          <button type="submit" className="register-button">Send Reset Request</button>
        </div>
      </form>

      {/* Popup to just show it works :) */}
      {showPopup && (
        <div className="popup">
          <p>Password reset email sent!</p>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
