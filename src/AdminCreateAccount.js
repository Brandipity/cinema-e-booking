import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAccount.css';
import axios from 'axios';

function AdminCreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State for admin status
  const navigate = useNavigate();

  // Function to handle admin account creation
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const adminData = {
        username,
        password,
        isAdmin // Include isAdmin field in the request
      };

      const response = await axios.post('http://localhost:3001/api/admins', adminData);
      console.log('Admin account created:', response.data);
      navigate('/admin');
    } catch (error) {
      console.error('Error creating admin account:', error.response?.data?.error || error.message);
      setError('Error creating admin account. Please try again.');
    }
  };

  // Function to promote existing user to admin
  const promoteUserToAdmin = async (userId) => {
    try {
      // Send a request to your backend to promote the user to admin
      await axios.post('http://localhost:3001/api/admins/promoteUser', { userId });
      // Optionally, you can handle success messages or navigate to a different page
      console.log('User promoted to admin successfully');
    } catch (error) {
      console.error('Error promoting user to admin:', error);
      // Handle error messages if needed
    }
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

      {/* Main content */}
      <div className="main-content">
        {/* Create Account Section */}
        <div className="create-account-section">
          <h2>Create Admin Account</h2>
          <form onSubmit={handleCreateAccount}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p>Password must contain at least one uppercase letter and one number.</p>
            <button type="submit">Create Account</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Promotion Section */}
        {isAdmin && (
          <div className="promote-user-section">
            <h2>Promote User to Admin</h2>
            <button onClick={() => promoteUserToAdmin(userId)}>Promote User</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCreateAccount;
