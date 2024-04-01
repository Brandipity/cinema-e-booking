import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConfirmationPage() {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await axios.put(`http://localhost:3001/api/users/activate/${token}`);
                setMessage(response.data.message);
                // go to the login page
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setMessage('Error activating account. Please try again.');
            }
        };

        activateAccount();
    }, [token, navigate]);

    return (
        <div>
            <h2>Account Confirmation</h2>
            <p>{message}</p>
        </div>
    );
}

export default ConfirmationPage;