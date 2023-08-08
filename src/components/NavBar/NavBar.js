import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import styles from "./navbar.module.css";
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.summa}>
      <div className={styles.leftAppbar}>
        <Typography variant="h6" component={Link} to="/home" style={{ textDecoration: 'none', color: 'white' }}>
          Home
        </Typography>
        <Typography variant="h6" component={Link} to="/search-clinics" style={{ textDecoration: 'none', color: 'white', marginLeft: '16px' }}>
          Book Appointment
        </Typography>
        <Typography variant="h6" component={Link} to="/view-upcoming-appointments" style={{ textDecoration: 'none', color: 'white', marginLeft: '16px' }}>
          View Upcoming Appointments
        </Typography>
        <Typography variant="h6" component={Link} to="/chatbot" style={{ textDecoration: 'none', color: 'white', marginLeft: '16px' }}>
          Consult Dr. ChatBot
        </Typography>
        </div>
        <div className={styles.rightAppBar}>
        <Typography variant="h6" component={Link} to="/profile" style={{ textDecoration: 'none', color: 'white', marginLeft: '16px' }}>
          Profile
        </Typography>
        <Button color="inherit" onClick={handleLogout} style={{ marginLeft: '16px' }}>
          Logout
        </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
