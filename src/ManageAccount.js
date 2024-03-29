import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageAccount.css';

function ManageAccount() {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    mailingAddress: '',
    cardName: '',
    cardNumber: '',
    cardCVV: '',
    cardExpiration: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/me');
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
      const response = await axios.put('http://localhost:3001/api/users/me', userData);
      console.log('Account updated:', response.data);
      navigate('/registereduser');
    } catch (error) {
      console.error('Error updating account:', error.response?.data?.error || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <span>E-CINEMA</span>
        </div>
        <div className="navbar-right">
          <Link to="/profile">Back to Profile</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <form className="manage-account-form" onSubmit={handleUpdateAccount}>
        <label>Username:</label>
        <input type="text" name="username" value={userData.username} onChange={handleChange} />

        <label>First Name:</label>
        <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />

        <label>Last Name:</label>
        <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />

        <label>Phone Number:</label>
        <input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />

        <label>Mailing Address:</label>
        <input type="text" name="mailingAddress" value={userData.mailingAddress} onChange={handleChange} />

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

        {showConfirmation && (
          <div className="confirmation-view">
            <button type="submit">Confirm and Update Account</button>
            <button onClick={() => setShowConfirmation(false)}>Back to Edit</button>
          </div>
        )}

        {!showConfirmation && (
          <div className="edit-view">
            <button type="submit">Update Account</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ManageAccount;
