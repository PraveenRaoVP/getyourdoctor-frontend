import React, { useState } from 'react'
import { NavDropdown, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styles from "./AdminNavbar.module.css"
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

const AdminNavbar = ({ admin }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPatientsDropdown, setShowPatientsDropdown] = useState(false);
  const [showClinicAreasDropdown, setShowClinicAreasDropdown] = useState(false);
  const [showAppointmentsDropdown, setShowAppointmentsDropdown] = useState(false);
  const [showAdminsDropdown, setShowAdminsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing user data from local storage and redirecting to the login page
    //localStorage.removeItem('authToken');
    navigate('/admin/login');
  };
  

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/admin/home" className={styles.navbarBrand}>
            <Link to="/admin/home">Admin Portal</Link>
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/admin/profile">
          Admin Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/admin/profile/reset-password">
          Reset Password
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/admin/profile/delete-account">
          Delete Account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default AdminNavbar
