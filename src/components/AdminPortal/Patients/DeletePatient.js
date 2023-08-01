import React, { useState } from 'react';
import PatientService from '../../../services/PatientService.js';
import './DeletePatientStyles.css'; // Import the CSS file

const DeletePatient = () => {
  const [patientId, setPatientId] = useState(null);
  const [patient, setPatient] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const fetchPatientDetails = async () => {
    try {
      const response = await PatientService.getPatientById(patientId);
      setPatient(response);
      setConfirmation(false); // Reset the confirmation state when fetching new patient details
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setPatient(null); // Reset patient data on error
      setConfirmation(false); // Reset the confirmation state on error
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    fetchPatientDetails();
  };

  const handleConfirmDelete = () => {
    setConfirmation(true);
  };

  const handleCancelDelete = () => {
    setConfirmation(false);
  };

  const handleDeletePatient = async () => {
    try {
      await PatientService.deletePatient(patientId);
      setPatient(null); // Reset patient data after successful deletion
      setConfirmation(false); // Reset the confirmation state after successful deletion
      console.log('Patient deleted successfully.');
      // Add any success message or redirect to a different page on successful deletion
    } catch (error) {
      console.error('Error deleting patient:', error);
      // Add the logic to show an error message
    }
  };

  return (
    <div className="delete-patient">
      {patient === null ? (
        <div>
          <h2>Enter Patient ID to Delete</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="patientId">Patient ID</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={patientId || ''}
                onChange={handlePatientIdChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Fetch Patient Details</button>
            </div>
          </form>
        </div>
      ) : !confirmation ? (
        <div>
          <h2>Confirm Patient Deletion</h2>
          <div className="patient-details">
            <p>Patient ID: {patient.patientId}</p>
            <p>Name: {patient.patientName}</p>
            <p>Age: {patient.patientAge}</p>
            <p>Phone: {patient.patientPhone}</p>
            {/* Add more patient details as needed */}
          </div>
          <div className="confirm-buttons">
            <button onClick={handleConfirmDelete}>Confirm Delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Deleting Patient...</h2>
          <p>Are you sure you want to delete the patient?</p>
          <div className="confirm-buttons">
            <button onClick={handleDeletePatient}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletePatient;