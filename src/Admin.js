import React from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div>

    <nav className="navbar">
        <div className="navbar-left">
          <span>E-CINEMA</span>
        </div>
        <div className="navbar-center">
        </div>
         <div className="navbar-right">
          <a href="/registereduser"> Home </a>
          <a href="/login"> Logout </a>
        </div>
      </nav>

      <div className="main-content">
        <div className="admin-option">
        <button><Link to="/managemovies">Manage Movies</Link></button>
          <p>Add, edit, or delete movies</p>
          {/* add movie api stuff below each */}
        </div>
        <div className="admin-option">
            <button><Link to="/manageusers">Manage Users</Link></button> {/*Create a 'Manage Users' page later. This is a placeholder.*/}
            <p>Edit or delete user accounts.</p>
            {/* add movie api stuff below each */}
        </div>
        <div className="admin-option">
          <button><Link to="/managepromotions">Manage Promotions</Link></button>
          <p>Create, edit, or delete promotions</p>
        </div>
          <div className="admin-option">
              <button><Link to="/manageshowings">Manage Showings</Link></button>
              <p>Create, edit, or delete showtimes.</p>
          </div>
      </div>
    </div>
  );
}

export default Admin;
