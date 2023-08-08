import React, { useState } from 'react';
import AdminService from '../../../../services/AdminService';

const DeleteAdmin = () => {
  const [adminId, setAdminId] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState('');

  const handleDeleteAdmin = async (e) => {
    e.preventDefault();

    try {
      await AdminService.deleteAdmin(adminId);
      setIsDeleted(true);
      setError('');
    } catch (error) {
      console.error('Error deleting admin:', error); // Log the error for debugging
      setError('Error deleting admin. Please try again.');
    }
  };

  return (
    <div className="delete-admin">
      <h2>Delete Admin</h2>
      <form onSubmit={handleDeleteAdmin}>
        <div className="form-group">
          <label>Admin ID:</label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="delete-button">
          Delete Admin
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      
      {isDeleted && (
        <p className="success-message">Admin deleted successfully!</p>
      )}
    </div>
  );
};

export default DeleteAdmin;