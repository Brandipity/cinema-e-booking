import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com'; // Import emailjs-com library
import './ManagePromotions.css';


function ManagePromotions() {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    promoCode: '',
    description: '',
    discountPercentage: 0,
    validFrom: '',
    validUntil: '',
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/promotions');
      setPromotions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'discountPercentage' ? parseFloat(value) : value;
    setNewPromotion({ ...newPromotion, [name]: formattedValue });
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();
    const { promoCode, description, discountPercentage, validFrom, validUntil } = newPromotion;

    if (!promoCode || !discountPercentage || !validFrom || !validUntil) {
      console.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/promotions', newPromotion);
      setPromotions([...promotions, response.data]);
      setNewPromotion({
        promoCode: '',
        description: '',
        discountPercentage: 0,
        validFrom: '',
        validUntil: '',
      });
      // Send promotion email after adding a new promotion
      await sendPromotionEmail(promoCode);
    } catch (err) {
      console.error('Error adding promotion:', err.response.data);
    }
  };
  // Function to send promotion email
  const sendPromotionEmail = async (promoCode) => {
    const promotionContent = `We have added a new promotion! Use promo code ${promoCode} for discounts.`;
    const templateParams = { promotion_content: promotionContent };

    try {
      await emailjs.send('your_service_id', 'your_template_id', templateParams, 'your_user_id');
      console.log('Promotion email sent successfully');
    } catch (error) {
      console.error('Error sending promotion email:', error);
    }
  };



  const handleDeletePromotion = async (promo_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/promotions/${promo_id}`);
      setPromotions(promotions.filter((promotion) => promotion.promo_id !== promo_id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="manage-promotions">
        <nav className="navbar">
          <div className="navbar-left">
            <span>E-CINEMA</span>
          </div>
          <div className="navbar-center">
          </div>
          <div className="navbar-right">
            <a href="/registereduser"> Home </a>
            <a href="/admin"> Admin </a>
          </div>
        </nav>

        <div className="main-content">
          <h2>Manage Promotions</h2>
          <form onSubmit={handleAddPromotion}>
            <input
                type="text"
                name="promoCode"
                placeholder="Promotion Code"
                value={newPromotion.promoCode}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={newPromotion.description}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="discountPercentage"
                placeholder="Discount Percentage"
                value={newPromotion.discountPercentage}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                max="100"
            />
            <input
                type="date"
                name="validFrom"
                placeholder="Valid From"
                value={newPromotion.validFrom}
                onChange={handleInputChange}
            />
            <input
                type="date"
                name="validUntil"
                placeholder="Valid Until"
                value={newPromotion.validUntil}
                onChange={handleInputChange}
            />
            <button type="submit">Add Promotion</button>
          </form>

          <h3>Promotions</h3>
          <ul>
            {promotions.map((promotion) => (
                <li key={promotion.promo_id}>
                  <div>
                    <span>{promotion.promo_code}</span>
                    <p>{promotion.description}</p>
                    <p>Discount: {promotion.discount_percentage * 100}%</p>
                    <p>Valid: {promotion.valid_from} - {promotion.valid_until}</p>
                  </div>
                  <button onClick={() => handleDeletePromotion(promotion.promo_id)}>Delete</button>
                </li>
            ))}
          </ul>
          </div>
        </div>
  );
}

export default ManagePromotions;
