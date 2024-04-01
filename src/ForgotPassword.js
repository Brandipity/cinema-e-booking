import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import axios from 'axios';
import emailjs from "emailjs-com";

async function sendPasswordResetEmail(email, username, resetToken) {
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  const templateParams = {
    to_email: email,
    username: username,
    reset_url: resetUrl,
  };

  try {
    await emailjs.send('service_pfnvmol', 'template_g8maqnv', templateParams, '0yAX7vO20pm2Hs_Ye');
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send the forgot password request to the server
      const response = await axios.post('http://localhost:3001/api/users/forgot-password', {
        email,
        username,
      });

      if (response.data.success) {
        // send the password reset email
        await sendPasswordResetEmail(email, username, response.data.resetToken);
        setMessage('If the provided email and username are valid, a password reset link will be sent to your email.');
      } else {
        setMessage('Invalid email or username. Please try again.');
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage('An error occurred while requesting the password reset.');
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
        <form className="forgot-password" onSubmit={handleSubmit}>
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
            <label>Enter Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </div>

          {message && <p className="message">{message}</p>}

          <div className="register-button">
            <button type="submit" className="register-button">
              Request Password Reset
            </button>
          </div>
        </form>
      </div>
  );
}

export default ForgotPassword;