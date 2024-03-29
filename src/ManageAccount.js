import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageAccount.css';

function ManageAccount({ userId }) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        mailingAddress: '',
        cardName: '',
        cardNumber: '',
        cardCVV: '',
        cardExpiration: '',
        receivePromotions: false
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    //trying to dynamically access a userID is jsut doesn't connect with the database at all
   //this will display the username of the user in row 1 of the database, you can also change that username
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/1`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error.response?.data?.error || error.message);
        }
    };

    const handleUpdateAccount = async (e) => {
        e.preventDefault();
        if (!showConfirmation) {
            setShowConfirmation(true);
            return;
        }
        try {
            await axios.put(`http://localhost:3001/api/users/1`, userData);
            console.log('Account updated');
            navigate('/registereduser');
        } catch (error) {
            console.error('Error updating account:', error.response?.data?.error || error.message);
        }
    };

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      setUserData(prevData => ({
          ...prevData,
          [name]: newValue
      }));
  };
    

    return (
        <div className="App">
            <nav className="navbar">
                <div className="navbar-left">
                    <span>E-CINEMA</span>
                </div>
                <div className="navbar-right">
                    <Link to="/registereduser">Back to Home</Link>
                    <Link to="/login">Logout</Link>
                </div>
            </nav>

            <form className="create-account-form" onSubmit={handleUpdateAccount}>
                <label>Username:</label>
                <input type="text" name="username" value={userData.username} onChange={handleChange} />

                <label>Password:</label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} />
                <p>Password must contain at least one uppercase letter and one number.</p>

                <label>First Name:</label>
                <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />

                <label>Last Name:</label>
                <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />

                <label>Phone Number:</label>
                <input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />

                
                <label className="email">Email:</label>
                <p>{userData.email}</p>

                <div className="credit-card-info">
                    <h2>Credit Card Information (Optional)</h2>

                    <label>Name on Card:</label>
                    <input type="text" name="cardName" value={userData.cardName} onChange={handleChange} />

                    <label>Card Number:</label>
                    <input type="password" name="cardNumber" value={userData.cardNumber} onChange={handleChange} />

                    <label>CVV:</label>
                    <input type="password" name="cardCVV" value={userData.cardCVV} onChange={handleChange} />

                    <label>Expiration Date:</label>
                    <input type="text" name="cardExpiration" value={userData.cardExpiration} onChange={handleChange} />
                </div>

                <div className="promotion-checkbox">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="receivePromotions"
                      checked={userData.receivePromotions}
                      onChange={handleChange}
                  />
                  Subscribe to Promotion Emails </label>
                </div>


                {showConfirmation ? (
                    <div className="confirmation-view">
                        <button type="submit">Confirm and Update Account</button>
                        <button onClick={() => setShowConfirmation(false)}>Back to Edit</button>
                    </div>
                ) : (
                    <div className="edit-view">
                        <button type="submit">Update Account</button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default ManageAccount;
