import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/search-clinics">Book Appointment</Link>
        </li>
        <li>
          <Link to="/view-upcoming-appointments">View Upcoming Appointments</Link>
        </li>
        <li>
          <Link to="/search-clinic-areas">Search Clinic Areas</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
