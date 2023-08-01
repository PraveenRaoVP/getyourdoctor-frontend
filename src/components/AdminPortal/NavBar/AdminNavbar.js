import React, { useState } from 'react'
import { NavDropdown, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import "./AdminNavbar.css"

const AdminNavbar = ({ admin }) => {
    const navigate = useNavigate();
    const [showPatientsDropdown, setShowPatientsDropdown] = useState(false);
    const [showClinicAreasDropdown, setShowClinicAreasDropdown] = useState(false);
    const [showAppointmentsDropdown, setShowAppointmentsDropdown] = useState(false);
    const [showAdminsDropdown, setShowAdminsDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
    const handleLogout = () => {
      // Implement your logout logic here
      // For example, clearing user data from local storage and redirecting to the login page
      //localStorage.removeItem('authToken');
      navigate('/admin/login');
    };
  
    return (
      <div className="container">
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/admin/home" className="navbar-brand">
            Admin Portal
          </Link>
          <ul className="navbar-nav ml-auto">
            {/* Patients Dropdown */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                onClick={() => setShowPatientsDropdown(!showPatientsDropdown)}
              >
                Patients
              </span>
              {showPatientsDropdown && (
                <div className="dropdown-menu">
                  <Link to="/admin/patients/view" className="dropdown-item">
                    View Patient Profiles
                  </Link>
                  <Link to="/admin/patients/update" className="dropdown-item">
                    Update Patient Details
                  </Link>
                  <Link to="/admin/patients/delete" className="dropdown-item">
                    Delete Patient
                  </Link>
                  <Link to="/admin/patients/feedbacks" className="dropdown-item">
                    View Patient Feedbacks
                  </Link>
                </div>
              )}
            </li>
  
            {/* Clinic Areas Dropdown */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                onClick={() => setShowClinicAreasDropdown(!showClinicAreasDropdown)}
              >
                Clinic Areas
              </span>
              {showClinicAreasDropdown && (
                <div className="dropdown-menu">
                  <Link to="/admin/clinic-areas/create" className="dropdown-item">
                    Create Clinic
                  </Link>
                  <Link to="/admin/clinic-areas/delete" className="dropdown-item">
                    Delete Clinic
                  </Link>
                  <Link to="/admin/clinic-areas/search" className="dropdown-item">
                    Search Clinic
                  </Link>
                  <Link to="/admin/clinic-areas/add-slots" className="dropdown-item">
                    Add Slots
                  </Link>
                  <Link to="/admin/clinic-areas/view-appointments" className="dropdown-item">
                    View Appointments
                  </Link>
                </div>
              )}
            </li>
  
            {/* Appointments Dropdown */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                onClick={() => setShowAppointmentsDropdown(!showAppointmentsDropdown)}
              >
                Appointments
              </span>
              {showAppointmentsDropdown && (
                <div className="dropdown-menu">
                  <Link to="/admin/appointments/add" className="dropdown-item">
                    Add Appointments
                  </Link>
                  <Link to="/admin/appointments/update" className="dropdown-item">
                    Update Appointments
                  </Link>
                  <Link to="/admin/appointments/remove" className="dropdown-item">
                    Remove Appointments
                  </Link>
                  <Link to="/admin/appointments/search" className="dropdown-item">
                    Search Appointments
                  </Link>
                  <Link to="/admin/appointments/add-medical-record" className="dropdown-item">
                    Add Medical Record
                  </Link>
                </div>
              )}
            </li>
  
            {/* Admins Dropdown */}
            { admin.adminRole==="SUPERADMIN" && (
              
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                onClick={() => setShowAdminsDropdown(!showAdminsDropdown)}
              >
                Admins
              </span>
              {showAdminsDropdown && (
                <div className="dropdown-menu">
                  <Link to="/admin/admins/add" className="dropdown-item">
                    Add Admin
                  </Link>
                  <Link to="/admin/admins/delete" className="dropdown-item">
                    Delete Admin
                  </Link>
                  <Link to="/admin/admins/search" className="dropdown-item">
                    Search Admin
                  </Link>
                </div>
              )}
            </li>
            )}
  
            {/* Profile Dropdown */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                Profile
              </span>
              {showProfileDropdown && (
                <div className="dropdown-menu">
                  <Link to="/admin/profile" className="dropdown-item">
                    Admin Profile
                  </Link>
                  <Link to="/admin/profile/reset-password" className="dropdown-item">
                    Reset Password
                  </Link>
                  <Link to="/admin/profile/delete-account" className="dropdown-item">
                    Delete Account
                  </Link>
                </div>
              )}
            </li>

            
  
            {/* Logout */}
            <li className="nav-item">
              <span className="nav-link logout" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </ul>
        </nav>
  
        {/* Main content */}
        <div className="content">
          {/* Add your main content here */}
        </div>
      </div>
    );
}

export default AdminNavbar
