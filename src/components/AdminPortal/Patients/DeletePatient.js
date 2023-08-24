import React, { useState } from 'react';
import PatientService from '../../../services/PatientService.js';
import styles from './DeletePatient.module.css'; // Import the CSS file
import { Button, CardContent, TextField, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeletePatient = () => {
  const [patientId, setPatientId] = useState(null);
  const [patient, setPatient] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();

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
    navigate("/admin/home");
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
    <div className={styles.deletePatient}>
      {patient === null ? (
        <div>
          <Typography variant="h2">Enter Patient ID to Delete</Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              type="text"
              id="patientId"
              name="patientId"
              value={patientId || ''}
              onChange={handlePatientIdChange}
              required
              label="Patient ID"
              variant="outlined"
            />
            <div className={styles.formGroup}>
              <Button type="submit" variant="contained" color="primary">
                Fetch Patient Details
              </Button>
            </div>
          </form>
        </div>
      ) : !confirmation ? (
        <div>
          <Typography variant="h2">Confirm Patient Deletion</Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">Patient ID: {patient.patientId}</Typography>
              <Typography variant="body1">Name: {patient.patientName}</Typography>
              <Typography variant="body1">Age: {patient.patientAge}</Typography>
              <Typography variant="body1">Phone: {patient.patientPhone}</Typography>
              {/* Add more patient details as needed */}
            </CardContent>
          </Card>
          <div className={styles.confirmButtons}>
            <Button onClick={handleConfirmDelete} variant="contained" color="primary">
              Confirm Delete
            </Button>
            <Button onClick={handleCancelDelete} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Typography variant="h2">Deleting Patient...</Typography>
          <Typography variant="body1">
            Are you sure you want to delete the patient?
          </Typography>
          <div className={styles.confirmButtons}>
            <Button onClick={handleDeletePatient} variant="contained" color="primary">
              Yes
            </Button>
            <Button onClick={handleCancelDelete} variant="contained" color="secondary">
              No
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletePatient;