import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmationSent() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="App">
            <nav className="navbar">
                <div className="navbar-left">
                    <span>E-CINEMA</span>
                </div>
            </nav>
            <div className="confirmation-sent">
                <h2>Confirmation Email Sent</h2>
                <p>
                    A confirmation link has been sent to your email address. Please click on the link to activate your account.
                </p>
                <p>You will be redirected to the login page in 5 seconds...</p>
            </div>
        </div>
    );
}

export default ConfirmationSent;