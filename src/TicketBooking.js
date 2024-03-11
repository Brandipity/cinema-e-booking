// TicketBooking.js

// this file uses some JSX formatting, just trying it out

import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import './TicketBooking.css';



function TicketBooking() {

    const location = useLocation();
    // prevents bad shit from happening if you use the navbar on this page
    const movie = location.state ? location.state.movie : null;

    // see above
    if (!movie) {
        return <Navigate to="/" replace />;
    }



    return (
        <div className="ticket-booking">
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
                    <a href="/login">Login</a>
                    <a href="/cart">Cart</a>
                </div>
            </nav>

            <div className="content-area">
                <div className="movie-details">
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    <div>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>

            <div className="dropdowns">
                <div className="showtime-area">
                    {/* dropdown */}
                    <label htmlFor="showtimes" className="showtime-label">Choose a showtime:</label>
                    <select id="showtimes" name="showtimes">
                        <option value="1">14:00</option>
                        <option value="2">16:00</option>
                        <option value="3">18:00</option>
                        <option value="4">20:00</option>
                        <option value="5">22:00</option>
                    </select>
                    {/* we do a little testing */}
                    <button onClick={() => console.log("Add Showtime Clicked")}>Add Showtime</button>

                    {/* dropdown */}
                    <label>Ticket Age:</label>
                    <select id="Age" name="Age">
                        <option value="1">Child</option>
                        <option value="2">Adult</option>
                        <option value="3">Senior</option>
                    </select>
                    {/* we do a little testing */}
                    <button onClick={() => console.log("Ticket Age slected")}>Select Age</button>
                </div>

                    <p>*Row A is closest to the screen.</p>
                    <p>*Seats numbers increment from right to left.</p>

                <div className="seat">
                    
                    {/* dropdown */}
                    <label>Seat Letter:</label>
                    <select id="Seat" name="Seat">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                    </select>
                    <label>Seat Number:</label>
                    <select id="Seat" name="Seat">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    <button onClick={() => console.log("Seat selected")}>Select Seat</button>
                </div>
            </div>


            <footer className="footer">
                <div className="footer-category">
                    <h3>Account</h3>
                    <ul>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/createaccount">Create Account</a></li>
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

export default TicketBooking;




