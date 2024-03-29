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
            // we do a little requesting
            const response = await axios.post('http://localhost:3001/api/admins/adminLogin', {
                username,
                password
            });

            // success!
            setLoading(false);
            navigate("/admin");
        } catch (err) {
            // fuck
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
                    <h2>Admin Login</h2>
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

                        <button type="submit">Login</button>
                    </form>
                    {error && <p>{error}</p>}
                    <p><button>Forgot Password</button></p>
                </div>
                <div className="options-section">
                    <h2>Options</h2>
                    <ul>
                        <li><button><Link to="/admincreateaccount">Create Account</Link></button></li>
                        <li><button>Contact</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
