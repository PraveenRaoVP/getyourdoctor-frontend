import React, { useState } from 'react';
import AdminService from '../../../../services/AdminService';
import './styles.css';

const AddAdmin = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminFullName, setAdminFullName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminRole, setAdminRole] = useState('');

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const newAdmin = {
      adminUsername,
      adminPassword,
      adminFullName,
      adminEmail,
      adminPhone,
      adminRole,
    };
    console.log(newAdmin);
    try {
      // Make the API call to add the new admin
      await AdminService.addAdmin(newAdmin);
      alert('Admin added successfully!');
      // Clear the form fields after successful addition
      setAdminUsername('');
      setAdminPassword('');
      setAdminFullName('');
      setAdminEmail('');
      setAdminPhone('');
      setAdminRole('');
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Failed to add admin. Please try again.');
    }
  };

  return (
    <div className="add-admin">
      <h2>Add New Admin</h2>
      <form onSubmit={handleAddAdmin}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" value={adminFullName} onChange={(e) => setAdminFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select value={adminRole} onChange={(e) => setAdminRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="SUPERADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
            <option value="DOCTOR">Doctor</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdmin;