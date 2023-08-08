import React, { useEffect, useState } from 'react'
import Navbar from '../NavBar/NavBar';
import styles from "./view.module.css"
import CancelIcon from '@mui/icons-material/Cancel';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Table } from 'react-bootstrap';

const ViewAppointments = ({ user }) => {
  
    const [appointments, setAppointments] = useState([]); 
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const getAppointments = async () => {
        try{
        const apiUrl = process.env.REACT_APP_API_URL;
        const corsUrl = process.env.REACT_APP_CORS_URL;
        const response = await fetch(`${corsUrl}/${apiUrl}/appointments/patient/${user.patientId}/upcoming`);
        const data = await response.json();
        setAppointments(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointments();
    }, [user.patientId]);

    const cancelAppointment = async (appointmentId) => {
        try{
            const apiUrl = process.env.REACT_APP_API_URL;
            const corsUrl = process.env.REACT_APP_CORS_URL;
            const response = await fetch(`${corsUrl}/${apiUrl}/appointments/cancel/${appointmentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(appointmentId);
            if(response.ok){
                getAppointments();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleAppointmentClick = (appointment) => {
        setSelectedAppointment(appointment);
    };
  
    return (
        <div>
          <Navbar />
          <h1>Upcoming Appointments</h1>
          <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableCellHeading}>Appointment Date</TableCell>
              <TableCell className={styles.tableCellHeading}>Appointment Time</TableCell>
              <TableCell className={styles.tableCellHeading}>Doctor Name</TableCell>
              <TableCell className={styles.tableCellHeading}>Clinic Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment.appointmentId}
                className={selectedAppointment?.appointmentId === appointment.appointmentId ? styles.selectedRow : ''}
                onClick={() => handleAppointmentClick(appointment)}
              >
                <TableCell>{appointment.appointmentDate}</TableCell>
                <TableCell>{appointment.startTime}</TableCell>
                <TableCell>{appointment.doctor.doctorName}</TableCell>
                <TableCell>{appointment.clinicArea.clinicAreaName}</TableCell>
                <TableCell>
                  <CancelIcon onClick={() => cancelAppointment(appointment.appointmentId)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
          {/* Display appointment details upon clicking an appointment */}
          {selectedAppointment && (
            <div className={styles.clinicDetailsShow}>
              <h2>Selected Appointment Details</h2>
              <p>Date: {selectedAppointment.appointmentDate}</p>
              <p>Time: {selectedAppointment.startTime}</p>
              <p>Doctor: {selectedAppointment.doctor.doctorName}</p>
              <p>Clinic: {selectedAppointment.clinicArea.clinicAreaName}</p>
              <p>Clinic Address: {selectedAppointment.clinicArea.address}</p>
              {/* Add more appointment details here */}
              <button className={styles.closeBtn} onClick={() => setSelectedAppointment(null)}>Close</button>
              <button className={styles.cancelBtn} onClick={() => cancelAppointment(selectedAppointment.appointmentId)}>Cancel Appointment</button>
            </div>
          )}
        </div>
      );
}

export default ViewAppointments
