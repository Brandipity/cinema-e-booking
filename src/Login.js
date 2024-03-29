import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login() {
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

        // If login is successful, redirect to authenticated view
        setLoading(false);
        navigate("/registereduser");
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
         {/* Access Admin from login */}
        <div className="navbar-left">
          <span><button><Link to="/adminlogin">Admin Login</Link></button></span>
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

            {/* Remember Me Button */}
            <div class="remember-me">
              <input type="checkbox" id="remember-me-button"/>
              <label for="remember-me-button">Remember Me</label>
            </div>

            {/* Use button instead of Link for form submission */}
            <button type="submit"><Link to="/registereduser">Login</Link></button>
          </form>
          <button type="submit"><Link to="/forgotpassword">Forgot Password</Link></button>
        </div>

        {/* Options Section */}
        <div className="options-section">
          <h2>Options</h2>
          <ul>
            <li><button><Link to="/createaccount">Create Account</Link></button></li>
            <li><button><Link to="/guest">Continue As Guest</Link></button></li>
            <li><button>Contact</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
