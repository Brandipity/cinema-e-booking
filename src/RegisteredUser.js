// RegisteredUser.js

import React, {useEffect, useState} from 'react';
import './RegisteredUser.css';
import API from "./API";
import Movie from "./Movie";


function RegisteredUser() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);

  useEffect(() => {

    API.fetchMovies()
        .then(data => setCurrentMovies(data.results || []))
        .catch(err => console.error("Failed to fetch current movies:", err));

    API.fetchComingSoonMovies()
        .then(data => setComingSoonMovies(data.results || []))
        .catch(err => console.error("Failed to fetch upcoming movies:", err));
  }, []);

  return (
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-left">
            <span>E-CINEMA</span>
          </div>
          <div className="navbar-center">
            <input type="text" placeholder="Search" />
          </div>
          <div className="navbar-right">
            <a href="#">Home</a>
            <a href="#">Showings</a>
            <a href="/cart">Cart</a>
          </div>
        </nav>

        <div className="main-content">

          <div className="main-section">
            <h2>Currently Running</h2>
            <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {currentMovies.map(movie => <Movie key={movie.id} movie={movie} />)}
            </div>
          </div>

          <div className="main-section">
            <h2>Coming Soon</h2>
            <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {comingSoonMovies.map(movie => <Movie key={movie.id} movie={movie} />)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-category">
            <h3>Account</h3>
            <ul>
              <li><a href="/login">Log Out</a></li>
              <li><a href="/manageaccount">Manage Account</a></li>
            </ul>
          </div>

          <div className="footer-category">
            <h3>View Bookings</h3>
            <ul>
              <li>View Theaters</li>
              <li>Promotions & Deals</li>
            </ul>
          </div>

          <div className="footer-category">
            <h3>Contact</h3>
            <ul>
              <li>Email</li>
              <li>Creators</li>
            </ul>
          </div>
        </footer>
      </div>
  );
}

export default RegisteredUser;
