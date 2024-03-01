import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  // Your login form logic, e.g., handling user input, authentication, etc.
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login logic goes here');
  };

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
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

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
