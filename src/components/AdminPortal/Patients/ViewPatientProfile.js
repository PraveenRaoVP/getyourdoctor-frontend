import React, { useState, useEffect } from 'react';
import PatientService from '../../../services/PatientService.js';   
import AppointmentService from '../../../services/AppointmentService.js';   
import { List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import styles from "./ViewPatientProfile.module.css"
import AdminNavbar from '../NavBar/AdminNavbar.js';
const ViewPatientProfile = () => {
  const [searchName, setSearchName] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    // Fetch patients with the same name from the backend
    const fetchPatientsByName = async () => {
      try {
        const response = await PatientService.getPatientsByName({ keyword: searchName });
        //console.log(response)
        setPatients(response);
      } catch (error) {
        console.error('Error fetching patients by name:', error);
      }
    };
  
    fetchPatientsByName();
  }, [searchName]);

  const handlePatientClick = async (patientId) => {
    // Fetch the details and upcoming appointments of the selected patient
    try {
      const response = await PatientService.getPatientById(patientId);
      console.log(response.data);
      setSelectedPatient(response.data);
      const appointmentsResponse = await AppointmentService.getAppointmentsByPatientId(patientId);
      //console.log(appointmentsResponse);
      setUpcomingAppointments(appointmentsResponse);
      //console.log(upcomingAppointments) 
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleSearch = () => {
    setSearchName(searchName);
    //console.log(selectedPatient)
  }

  return (
    <div>
      <AdminNavbar />
      <Typography variant="h2">View Patient Profile</Typography>
      <div className={styles.searchContainer}>
        <TextField
          id="searchName"
          label="Search Patient by Name"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </div>
      <div className={styles.patientsList}>
        {Array.isArray(patients) && patients.length > 0 ? (
          <Paper elevation={3}>
            <List>
              {patients.map((patient) => (
                <ListItem key={patient.patientId} button onClick={() => handlePatientClick(patient.patientId)}>
                  <ListItemText primary={patient.patientName} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography>No patients found with the provided name.</Typography>
        )}
      </div>
      {selectedPatient && (
        <div className={styles.patientDetails}>
          <Typography variant="h3">Patient Details:</Typography>
          <Typography><strong>Name:</strong> {selectedPatient.patientName}</Typography>
          <Typography><strong>Email:</strong> {selectedPatient.patientEmail}</Typography>
          <Typography><strong>Phone:</strong> {selectedPatient.patientPhone}</Typography>
          {/* <Typography><strong>Address:</strong> {selectedPatient.patientAddress}</Typography> */}
          {/* Display any other patient details you have */}
        </div>
      )}
      {upcomingAppointments.length > 0 && (
        <div className={styles.appointmentsList}>
          <Typography variant="h3">Upcoming Appointments:</Typography>
          <List>
            {upcomingAppointments.map((appointment) => (
              <ListItem key={appointment.id}>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <strong>Date:</strong> {appointment.appointmentDate} - {appointment.startTime} - {appointment.endTime}
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <strong>Clinic Area:</strong> {appointment.clinicArea.clinicAreaName} - <strong>Doctor:</strong> {appointment.doctor.doctorName}
                    </React.Fragment>
                  }
                />
                {/* Display any other appointment details you have */}
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default ViewPatientProfile;