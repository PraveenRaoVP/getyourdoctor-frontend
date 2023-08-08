import React, { useState } from 'react';
import Navbar from '../NavBar/NavBar';
import styles from './appform.module.css';
import { Button, TextField, Typography } from '@mui/material';

const AppointmentForm = ({ slot, onSubmit, user, clinicDetails }) => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(getTodayDate());
  const [error, setError] = useState(false);
  const [success, setSuccess]=useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const corsUrl = process.env.REACT_APP_CORS_URL;


  const handleFormSubmit = async(e) => {
    e.preventDefault();
    // Add any additional form validation or data processing here before calling the onSubmit callback
    // onSubmit({
    //   symptoms: symptoms,
    //   doctor: selectedDoctor,
    //   time: slot.startTime,
    //   slotId: slot.slotId,
    //   appointmentDate: appointmentDate,
    //   // Add any other necessary data for appointment booking
    // });

    const submittedData = {
      patientId: user.patientId,
      clinicAreaId: clinicDetails.clinicAreaId,
      slotId: slot.slotId,
      doctorId: selectedDoctor,
      appointmentDate: appointmentDate,
      symptoms: symptoms,
      startTime: slot.startTime,
      endTime: slot.endTime
    }

    const response = await fetch(`${corsUrl}/${apiUrl}/appointments/book`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(submittedData),
    })
    if(response.ok){
      setSuccess(true);
      setError(false);

    } else{
      setError(true);
      setSuccess(false);
    }
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.appointmentForm}>
      <Typography variant="h5" style={{ paddingTop: '10px', paddingBottom: '10px'}}>Book Appointment</Typography>
      <form onSubmit={handleFormSubmit}>
        <div>
          <TextField
            label="Patient's Name"
            value={user.patientName}
            className={styles.input}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Patient's Age"
            type="number"
            value={user.patientAge}
            className={styles.input}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Patient's Gender"
            value={user.patientGender}
            className={styles.input}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Patient's Email"
            type="email"
            value={user.patientEmail}
            className={styles.input}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Patient's Phone"
            value={user.patientPhone}
            className={styles.input}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Clinic Area Name"
            value={clinicDetails.clinicAreaName}
            className={styles.input}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Clinic Area Address"
            value={clinicDetails.address}
            className={styles.input}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Slot"
            value={slot.startTime}
            className={styles.input}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Symptoms"
            value={symptoms}
            className={styles.input}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <div>
          {/* <label htmlFor="doctor">Select Doctor:</label> */}
          <select
            id="doctor"
            value={selectedDoctor}
            className={styles.input}
            style={{ width: '100%', height: '55px', padding: '10px', color: 'gray', fontSize: '16px' }}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
          >
            {/* Map through the list of doctors and create option elements */}
            {/* Replace with the actual list of doctors from your API */}
            <option value="">Select Doctor</option>
            {
              slot.doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>{doctor.doctorName}</option>
              ))}
            {/* Add more options based on your list of doctors */}
          </select>
        </div>
        <div>
          <TextField
            label="Appointment Date"
            type="date"
            value={appointmentDate}
            className={styles.input}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className={styles.submitBtn} variant="contained" color="primary">
          Book Appointment
        </Button>
        {success ? (
          <Typography>Appointment Booked Successfully! Go To Upcoming Appointments Tab to View the Appointment Details!</Typography>
        ) : null}
        {error ? (
          <Typography>Appointment Booking Failed! Please Try Again!</Typography>
        ) : null}
      </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
