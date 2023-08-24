import React, { useState } from 'react'
import AdminNavbar from '../NavBar/AdminNavbar'
import { Link, useNavigate } from 'react-router-dom';
import styles from "./AdminHome.module.css"
import { Typography } from '@mui/material';


const AdminHome = ({ admin }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const renderDropdownItems = (items) => {
    return (
      <div className={styles.floatingDropdown}>
        {items.map((item, index) => (
          <Link key={index} to={item.path} className={styles.dropDownItem}>
            {item.label}
          </Link>
        ))}
      </div>
    );
  };

  const dropdowns = [
    {
      name: 'patients',
      label: 'Patients',
      items: [
        { label: 'View Patient Profiles', path: '/admin/patients/view' },
        { label: 'Update Patient Details', path: '/admin/patients/update' },
        { label: 'Delete Patient', path: '/admin/patients/delete' },
        { label: 'View Patient Feedbacks', path: '/admin/patients/feedbacks' },
      ],
    },
    {
      name: 'clinicAreas',
      label: 'Clinic Areas',
      items: [
        { label: 'Create Clinic', path: '/admin/clinic-areas/create' },
        { label: 'Delete Clinic', path: '/admin/clinic-areas/delete' },
        { label: 'Search Clinic', path: '/admin/clinic-areas/search' },
        { label: 'Add Slots', path: '/admin/clinic-areas/add-slots' },
        { label: 'View Appointments', path: '/admin/clinic-areas/view-appointments' },
      ],
    },
    {
      name: 'doctors',
      label: 'Doctors',
      items: [
        { label: 'Add Doctor', path: '/admin/doctor/add' },
        { label: 'Search Doctor', path: '/admin/doctor/search' },
        { label: 'Delete Doctor', path: '/admin/doctor/delete' },
      ],
    },
  ];

  if(admin.adminRole==="SUPERADMIN")
  {
    dropdowns.push({
        name: 'admins',
        label: 'Admins',
        items: [
          { label: 'Add Admin', path: '/admin/admins/add' },
          { label: 'Delete Admin', path: '/admin/admins/delete' },
          { label: 'Search Admin', path: '/admin/admins/search' },
        ],
      }
    )
  }

  return (
    <div className={styles.adminHomeContainer}>
      <AdminNavbar admin={admin} />
      <Typography variant="h2" align="center" gutterBottom>
        Welcome {admin.adminUsername}
      </Typography>

      <div className={styles.dropdownRow}>
        {dropdowns.map((dropdown) => (
          <div
            key={dropdown.name}
            className={`${styles.dropDownContainer} ${activeDropdown === dropdown.name ? styles.active : ''}`}
            onClick={() => handleDropdownToggle(dropdown.name)}
          >
            {dropdown.label}
            {activeDropdown === dropdown.name && renderDropdownItems(dropdown.items)}
          </div>
        ))}
      </div>
    </div>
  );
};


export default AdminHome
