import React, { useState, useEffect } from 'react';
import PatientService from '../../../services/PatientService.js';   
import AppointmentService from '../../../services/AppointmentService.js';   

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
      <h2>View Patient Profile</h2>
      <div>
        <label htmlFor="searchName">Search Patient by Name:</label>
        <input
          type="text"
          id="searchName"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </div>
      <div>
      {Array.isArray(patients) && patients.length > 0 ? (
        <ul>
      {patients.map((patient) => (
        <li key={patient.patientId} onClick={() => handlePatientClick(patient.patientId)}>
          {patient.patientName}
        </li>
      ))}
    </ul>
  ) : (
    <p>No patients found with the provided name.</p>
  )}
      </div>
      {selectedPatient && (
        <div>
          <h3>Patient Details:</h3>
          <p><strong>Name:</strong> {selectedPatient.patientName}</p>
          <p><strong>Email:</strong> {selectedPatient.patientEmail}</p>
          <p><strong>Phone:</strong> {selectedPatient.patientPhone}</p>
          <p><strong>Address:</strong> {selectedPatient.patientAddress}</p>
          {/* Display any other patient details you have */}
        </div>
      )}
      {upcomingAppointments.length > 0 && (
        <div>
          <h3>Upcoming Appointments:</h3>
          <ul>
            {upcomingAppointments.map((appointment) => (
              <li key={appointment.id}>
                <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p><strong>Time:</strong> {appointment.startTime} - {appointment.endTime}</p>
                <p><strong>Clinic Area:</strong> {appointment.clinicArea.clinicAreaName}</p>
                <p><strong>Doctor: </strong>{appointment.doctor.doctorName}</p>
                {/* Display any other appointment details you have */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewPatientProfile;