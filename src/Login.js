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
            // sends the login request to backend
            const response = await axios.post('http://localhost:3001/api/users/login', {
                username,
                password
            });
            // success!
            setLoading(false);
            // get JWT token from response
            localStorage.setItem('token', response.data.token);
            navigate("/registereduser");
        } catch (err) {
            // fuck
            setLoading(false);
            if (err.response && err.response.status === 401) {
                setError("Invalid username or password. Please try again.");
            } else if (err.response && err.response.status === 403) {
                setError("Account is not activated. Please check your email for the activation link.");
            } else {
                setError("An error occurred. Please try again later.");
            }
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
            <div className="remember-me">
              <input type="checkbox" id="remember-me-button"/>
              <label htmlFor="remember-me-button">Remember Me</label>
            </div>

            {/* Use button instead of Link for form submission */}
            <button type="submit"><Link to="/registereduser">Login</Link></button>
          </form>
            {error && <p className="error-message">{error}</p>}
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
