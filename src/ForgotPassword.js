
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import axios from 'axios';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      // checking for username and old password
      //TODO: I need to implement the endpoint for this
      const response = await axios.post('/api/users/checkPassword', {
        username,
        oldPassword,
      });

      if (response.data.success) {
        // update that shit
        await axios.put(`/api/users/${response.data.userId}`, {
          password: newPassword,
        });

        setShowPopup(true);

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setError('Invalid username or old password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An error occurred while changing the password');
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
        <form className="forgot-password" onSubmit={handlePasswordChange}>
          <div className="input">
            <label>Enter Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label>Enter Old Password:</label>
            <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
            />
            <label>Enter New Password:</label>
            <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <p>*Password must contain at least one uppercase letter and one number.</p>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="register-button">
            <button type="submit" className="register-button">
              Change Password
            </button>
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