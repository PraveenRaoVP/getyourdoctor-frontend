import React, { useState } from 'react'
import { NavDropdown, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
// import "./AdminNavbar.css"
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material'



const AdminNavbar = ({ admin }) => {
    const navigate = useNavigate();
    const [showPatientsDropdown, setShowPatientsDropdown] = useState(false);
    const [showClinicAreasDropdown, setShowClinicAreasDropdown] = useState(false);
    const [showAppointmentsDropdown, setShowAppointmentsDropdown] = useState(false);
    const [showAdminsDropdown, setShowAdminsDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleLogout = () => {
      // Implement your logout logic here
      // For example, clearing user data from local storage and redirecting to the login page
      //localStorage.removeItem('authToken');
      navigate('/admin/login');
    };
    const classes = []
    //const classes = useStyles();

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Admin Portal
          </Typography>
          <Button color="inherit" onClick={handleMenuOpen}>
            Menu
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
          >
            <MenuItem component={Link} to="/admin/patients/view">
              View Patient Profiles
            </MenuItem>
            <MenuItem component={Link} to="/admin/patients/update">
              Update Patient Details
            </MenuItem>
            <MenuItem component={Link} to="/admin/patients/delete">
              Delete Patient
            </MenuItem>
            <MenuItem component={Link} to="/admin/patients/feedbacks">
              View Patient Feedbacks
            </MenuItem>
            <MenuItem component={Link} to="/admin/clinic-areas/create">
              Create Clinic
            </MenuItem>
            <MenuItem component={Link} to="/admin/clinic-areas/delete">
              Delete Clinic
            </MenuItem>
            <MenuItem component={Link} to="/admin/clinic-areas/search">
              Search Clinic
            </MenuItem>
            <MenuItem component={Link} to="/admin/clinic-areas/add-slots">
              Add Slots
            </MenuItem>
            <MenuItem component={Link} to="/admin/clinic-areas/view-appointments">
              View Appointments
            </MenuItem>
            <MenuItem component={Link} to="/admin/appointments/add">
              Add Appointments
            </MenuItem>
            <MenuItem component={Link} to="/admin/appointments/update">
              Update Appointments
            </MenuItem>
            <MenuItem component={Link} to="/admin/appointments/remove">
              Remove Appointments
            </MenuItem>
            <MenuItem component={Link} to="/admin/appointments/search">
              Search Appointments
            </MenuItem>
            <MenuItem component={Link} to="/admin/appointments/add-medical-record">
              Add Medical Record
            </MenuItem>
            {admin.adminRole === 'SUPERADMIN' && (
              <>
                <MenuItem component={Link} to="/admin/admins/add">
                  Add Admin
                </MenuItem>
                <MenuItem component={Link} to="/admin/admins/delete">
                  Delete Admin
                </MenuItem>
                <MenuItem component={Link} to="/admin/admins/search">
                  Search Admin
                </MenuItem>
              </>
            )}
            <MenuItem component={Link} to="/admin/profile">
              Admin Profile
            </MenuItem>
            <MenuItem component={Link} to="/admin/profile/reset-password">
              Reset Password
            </MenuItem>
            <MenuItem component={Link} to="/admin/profile/delete-account">
              Delete Account
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
}

export default AdminNavbar
