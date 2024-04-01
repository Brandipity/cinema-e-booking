import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPassword.css';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { resetToken } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/users/reset-password/${resetToken}`, {
                newPassword: password,
            });
            if (response.status === 200) {
                setMessage('Your password has been successfully reset. You will be redirected to the login page.');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setMessage('Invalid or expired reset token. Please try again.');
            }
        } catch (error) {
            console.error('Error resetting password:', error.response?.data?.error || error.message);
            setMessage('An error occurred while resetting the password.');
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
            <form className="reset-password" onSubmit={handleSubmit}>
                <div className="input">
                    <label>Enter New Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {message && <p className="message">{message}</p>}

                <div className="register-button">
                    <button type="submit" className="register-button">
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;