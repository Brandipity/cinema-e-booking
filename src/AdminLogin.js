import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
      setError(""); 
      try {
        // Send login request to backend
        const response = await axios.post('/api/login', {
            username,
            password
        });

        // If login is successful, redirect to admin view
        setLoading(false);
        navigate("/admin");
    } catch (err) {
        // Handle login error
        setLoading(false);
        setError("Invalid username or password. Please try again.");
        console.error("Login error:", err);
    }
}

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span>E-CINEMA</span>
        </div>
      </nav>

      {/* Main content */}
      <div className="main-content">
        {/* Login Section */}
        <div className="login-section">
          <h2>E-Cinema Login</h2>
          <form onSubmit={handleSubmit}> 
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />

            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            {/* Use button instead of Link for form submission */}
            <button type="submit"><Link to="/admin">Login</Link></button>
          </form>
          <p><button>Forgot Password</button></p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
