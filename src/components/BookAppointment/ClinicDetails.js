import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import styles from "./ClinicDetails.module.css"

const ClinicDetails = ({ onSelectSlot, onSelectClinic }) => {
  const { clinicId } = useParams();
  const [clinicDetails, setClinicDetails] = useState(null);

  const navigate = useNavigate();

  const fetchClinicDetails = async () => {
    try {
      // Replace apiUrl and corsUrl with your actual API URLs
      const apiUrl = process.env.REACT_APP_API_URL;
      const corsUrl = process.env.REACT_APP_CORS_URL;

      const response = await fetch(`${corsUrl}/${apiUrl}/clinic-areas/${clinicId}`);
      if (response.ok) {
        const data = await response.json();
        setClinicDetails(data);
      } else {
        console.error('Failed to fetch clinic details:', response.statusText);
      }
    } catch (error) {
      console.error('Error during clinic details fetch:', error);
    }
  };

  // Fetch clinic details when the component mounts
  React.useEffect(() => {
    fetchClinicDetails();
  }, [clinicId]);


  const onBookAppointment = (slot, clinicDetails) => {
    onSelectClinic(clinicDetails)
    onSelectSlot(slot);
    navigate(`/appointment-form`);
    };


    return (
      <div>
        <Navbar />
        {clinicDetails ? (
          <div>
            <Typography variant="h5">{clinicDetails.clinicAreaName}</Typography>
            <Typography>Type: {clinicDetails.clinicAreaType}</Typography>
            <Typography>Working Days: {clinicDetails.workingDays.join(', ')}</Typography>
            <Typography>Working Hours: {clinicDetails.workingHours}</Typography>
            <Typography>Contact Number: {clinicDetails.contactNumber}</Typography>
            <Typography>Email: {clinicDetails.email}</Typography>
            <Typography>Address: {clinicDetails.address}</Typography>
            
            <Typography variant="h6" style={{ textAlign: 'center', paddingTop: '10px'}}>Available Slots</Typography>
            <div className={styles.slotDetails}>
              {clinicDetails.availableSlots.length > 0 ? (
                <List>
                  {clinicDetails.availableSlots.map((slot) => (
                    <ListItem key={slot.slotId}>
                      <ListItemText primary={`Start Time: ${slot.startTime}`} />
                      <ListItemText primary={`End Time: ${slot.endTime}`} />
                      <ListItemText primary={`Doctors: ${slot.doctors.map(doctor => doctor.doctorName).join(', ')}`} />
                      {slot.available ? (
                        <Button variant="contained" color="primary" onClick={() => onBookAppointment(slot, clinicDetails)}>
                          Book Appointment
                        </Button>
                      ) : (
                        <Button variant="contained" disabled>
                          Unavailable
                        </Button>
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No available slots found.</Typography>
              )}
            </div>
          </div>
        ) : (
          <Typography>Loading clinic details...</Typography>
        )}
      </div>
    );
};

export default ClinicDetails;