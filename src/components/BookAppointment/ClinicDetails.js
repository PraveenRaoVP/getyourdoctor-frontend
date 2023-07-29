import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
      {clinicDetails ? (
        <div>
          <h2>{clinicDetails.clinicAreaName}</h2>
          <p>Type: {clinicDetails.clinicAreaType}</p>
          <p>Working Days: {clinicDetails.workingDays.join(', ')}</p>
          <p>Working Hours: {clinicDetails.workingHours}</p>
          <p>Contact Number: {clinicDetails.contactNumber}</p>
          <p>Email: {clinicDetails.email}</p>
          <h3>Available Slots</h3>
          {clinicDetails.availableSlots.length > 0 ? (
            <ul>
              {clinicDetails.availableSlots.map((slot) => (
                <li key={slot.slotId}>
                  <p>Start Time: {slot.startTime}</p>
                  <p>End Time: {slot.endTime}</p>
                  {/* Add booking functionality here */}
                  {
                    slot.available ? (
                        <button onClick={() => onBookAppointment(slot, clinicDetails)}>Book Appointment</button>
                    ) : (
                        <button disabled>Unavailable</button>
                    )
                  }
                </li>
              ))}
            </ul>
          ) : (
            <p>No available slots found.</p>
          )}
        </div>
      ) : (
        <p>Loading clinic details...</p>
      )}
    </div>
  );
};

export default ClinicDetails;