import React, { useEffect, useState } from 'react'
import DoctorService from '../../../../services/DoctorService'

const AssignDoctor = ({ newDoctor }) => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchClinics = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const corsUrl = process.env.REACT_APP_CORS_URL;

      const response = await fetch(`${corsUrl}/${apiUrl}/clinic-areas/all`);
      if (response.ok) {
        const data = await response.json();
        setClinics(data);
      } else {
        setErrorMessage('Error retrieving clinics');
      }
    } catch (err) {
      setErrorMessage('Error retrieving clinics');
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedSlot, selectedClinic)
    try {
      const clinicResponse = await DoctorService.assignClinicToDoctor({doctorId: newDoctor.doctorId, clinicAreaId:  selectedClinic.clinicAreaId});
      const slotResponse = await DoctorService.assignSlotToDoctor({doctorId: newDoctor.doctorId, slotId: selectedSlot.slotId});

      if (clinicResponse.status === 200 && slotResponse.status === 200) {
        setSuccessMessage('Doctor assigned successfully');
      } else {
        setErrorMessage('Error in response');
      }
    } catch (error) {
      console.log(error)
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Assign Doctor to Clinic and Slot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Clinic:</label>
          <select
            value={selectedClinic ? selectedClinic.clinicAreaId : ''}
            onChange={(e) => {
              const selectedClinicId = e.target.value;
              const clinic = clinics.find(clinic => clinic.clinicAreaId === parseInt(selectedClinicId));
              setSelectedClinic(clinic);
            }}
          >
            <option value="">Select Clinic</option>
            {clinics.map(clinic => (
              <option key={clinic.clinicAreaId} value={clinic.clinicAreaId}>
                {clinic.clinicAreaName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Slot:</label>
          <select
            value={selectedSlot ? selectedSlot.slotId : ''}
            onChange={(e) => {
              const selectedSlotId = e.target.value;
              const clinic = clinics.find(clinic => clinic.clinicAreaId === selectedClinic.clinicAreaId);
              const slot = clinic.availableSlots.find(slot => slot.slotId === parseInt(selectedSlotId));
              setSelectedSlot(slot);
            }}
          >
            <option value="">Select Slot</option>
            {selectedClinic && selectedClinic.availableSlots.map(slot => (
              <option key={slot.slotId} value={slot.slotId}>
                {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Assign Doctor</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default AssignDoctor
