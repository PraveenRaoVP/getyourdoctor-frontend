import React, { useState } from 'react';
import './styles.css'; // Import the CSS file
import ClinicService from '../../../../services/ClinicService';

const DeleteClinic = () => {
  const [clinicId, setClinicId] = useState('');
  const [clinicDetails, setClinicDetails] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSearchClinic = async () => {
    try {
      const response = await ClinicService.getClinicById(clinicId);
      setClinicDetails(response);
    } catch (error) {
      console.error('Error fetching clinic details:', error);
      setClinicDetails(null);
    }
  };

  const handleDeleteClinic = async () => {
    try {
      await ClinicService.deleteClinicById(clinicId);
      setClinicDetails(null);
      setConfirmDelete(false);
      alert('Clinic deleted successfully.');
    } catch (error) {
      console.error('Error deleting clinic:', error);
    }
  };

  return (
    <div className="delete-clinic">
      <h2>Delete Clinic</h2>
      <div className="search-form">
        <input type="text" value={clinicId} onChange={(e) => setClinicId(e.target.value)} placeholder="Enter clinic ID" />
        <button onClick={handleSearchClinic}>Search</button>
      </div>
      {clinicDetails && (
        <div className="clinic-details">
          <h3>Clinic Details</h3>
          <div className="clinic-name">{clinicDetails.clinicAreaName}</div>
          <div className="clinic-type">{clinicDetails.clinicAreaType}</div>
          <div className="clinic-working-hours">Working Hours: {clinicDetails.workingHours}</div>
          <div className="clinic-contact">Contact Number: {clinicDetails.contactNumber}</div>
          <div className="clinic-email">Email: {clinicDetails.email}</div>
          {/* Render other clinic details as needed */}
          {!confirmDelete ? (
            <div className="confirmation">
              <p>Are you sure you want to delete this clinic?</p>
              <button className="confirm-button" onClick={() => setConfirmDelete(true)}>Yes</button>
              <button className="cancel-button" onClick={() => setClinicDetails(null)}>No</button>
            </div>
          ) : (
            <div className="confirmation">
              <p>Confirm Delete?</p>
              <button className="confirm-button" onClick={handleDeleteClinic}>Confirm</button>
              <button className="cancel-button" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteClinic;