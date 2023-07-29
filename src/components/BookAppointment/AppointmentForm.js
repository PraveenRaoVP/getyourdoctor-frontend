import React, { useState } from 'react';

const AppointmentForm = ({ slot, onSubmit, user, clinicDetails }) => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
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

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="patientName">Patient's Name:</label>
          <input
            type="text"
            id="patientName"
            value={user.patientName}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="patientAge">Patient's Age:</label>
          <input
            type="number"
            id="patientAge"
            value={user.patientAge}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="patientGender">Patient's Gender:</label>
          <input
            type="text"
            id="patientGender"
            value={user.patientGender}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="patientEmail">Patient's Email:</label>
          <input
            type="email"
            id="patientEmail"
            value={user.patientEmail}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="patientPhone">Patient's Phone:</label>
          <input
            type="text"
            id="patientPhone"
            value={user.patientPhone}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="clinicAreaName">Clinic Area Name:</label>
          <input
            type="text"
            id="clinicAreaName"
            value={clinicDetails.clinicAreaName}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="clinicAreaLocation">Clinic Area Location:</label>
          <input
            type="text"
            id="clinicAreaLocation"
            value={clinicDetails.location}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="startTime">Slot:</label>
          <input
            type="text"
            id="startTime"
            value={slot.startTime}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="symptoms">Symptoms:</label>
          <input
            type="text"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="doctor">Select Doctor:</label>
          <select
            id="doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
          >
            {/* Map through the list of doctors and create option elements */}
            {/* Replace with the actual list of doctors from your API */}
            <option value="select">Select Doctor</option>
            {
              slot.doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>{doctor.doctorName}</option>
              ))}
            {/* Add more options based on your list of doctors */}
          </select>
        </div>
        <div>
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Appointment</button>
        {
          success ? <p>Appointment Booked Successfully! Go To Upcoming Appointments Tab to View the Appointment Details!</p> : null
        }
        {
          error ? <p>Appointment Booking Failed! Please Try Again!</p> : null
        }
      </form>
    </div>
  );
};

export default AppointmentForm;
