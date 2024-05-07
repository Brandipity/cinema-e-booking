import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagePromotions.css';

function ManageShowings() {
  const [showings, setShowings] = useState([]);
  const [newShowing, setNewShowing] = useState({
    movie_id: '',
    screening_start: '',
    theater_number: '',
    seats_available: '',
  });

  useEffect(() => {
    fetchShowings();
  }, []);

  const fetchShowings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/screenings');
      setShowings(response.data);
    } catch (error) {
      console.error('Error fetching showings:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewShowing({ ...newShowing, [e.target.name]: e.target.value });
  };

  const handleAddShowing = async (e) => {
    e.preventDefault();

    const formattedData = {
      movieId: newShowing.movie_id,
      screeningStart: newShowing.screening_start,
      theaterNumber: newShowing.theater_number,
      seatsAvailable: newShowing.seats_available
    };
    // debug
    //console.log("Sending data:", formattedData);

    try {
      const response = await axios.post('http://localhost:3001/api/screenings', formattedData);
      setShowings([...showings, response.data]);
      setNewShowing({
        movie_id: '',
        theater_number: '',
        screening_start: '',
        seats_available: '',
      });
    } catch (error) {
      console.error('Error adding showing:', error.response ? error.response.data : error);
    }
  };

  const handleDeleteShowing = async (screening_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/screenings/${screening_id}`);
      setShowings(showings.filter((showing) => showing.screening_id !== screening_id));
    } catch (error) {
      console.error('Error deleting showing:', error);
    }
  };

  return (
      <div className="manage-movies">
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
        <h2>Manage Showings</h2>
        <form onSubmit={handleAddShowing}>
          <input
              type="number"
              name="movie_id"
              placeholder="Movie ID"
              value={newShowing.movie_id}
              onChange={handleInputChange}
              required
          />
          <input
              type="datetime-local"
              name="screening_start"
              placeholder="Screening Start"
              value={newShowing.screening_start}
              onChange={handleInputChange}
              required
          />
          <input
              type="number"
              name="theater_number"
              placeholder="Theater Number"
              value={newShowing.theater_number}
              onChange={handleInputChange}
              required
          />
          <input
              type="number"
              name="seats_available"
              placeholder="Seats Available"
              value={newShowing.seats_available}
              onChange={handleInputChange}
              required
          />
          <button type="submit">Add Showing</button>
        </form>

        <h3>Showings</h3>
        <ul>
          {showings.map((showing) => (
              <li key={showing.screening_id}>
                <div>
                  <span>Movie ID: {showing.movie_id}</span>
                  <p>Screening Start: {showing.screening_start}</p>
                  <p>Theater Number: {showing.theater_number}</p>
                  <p>Seats Available: {showing.seats_available}</p>
                </div>
                <button onClick={() => handleDeleteShowing(showing.screening_id)}>Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default ManageShowings;

