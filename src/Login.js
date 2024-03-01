import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

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
          // replace with actual login logic
          if (username === "username" && password === "password") {
              // redirects to the authenticated view after successful login
              setLoading(false);
              navigate("/registereduser");
          } else {
              // displays error message for incorrect credentials
              setLoading(false);
              setError("Invalid username or password. Please try again.");
          }
      } catch (err) {
          // Handle errors if any
          setLoading(false);
          setError("An error occurred. Please try again later.");
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
          <span><button><Link to="/admin">Admin</Link></button></span>
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
            <button type="submit"><Link to="/registereduser">Login</Link></button>
          </form>
          <p><button>Forgot Password</button></p>
        </div>

        {/* Options Section */}
        <div className="options-section">
          <h2>Options</h2>
          <ul>
            <li><button><Link to="/createaccount">Create Account</Link></button></li>
            <li><button><Link to="/guest">Continue as Guest</Link></button></li>
            <li><button>Contact</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
