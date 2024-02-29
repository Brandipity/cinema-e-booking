import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import GuestPage from './GuestPage';
import CreateAccount from './CreateAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
