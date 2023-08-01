import React, { useState, useEffect } from 'react';
import './styles.css'; // Import the CSS file
import ClinicService from '../../../../services/ClinicService';

const ViewClinicAppointments = () => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinicId, setSelectedClinicId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [selectedClinicName, setSelectedClinicName] = useState('');
  const [selectedClinicType, setSelectedClinicType] = useState('');

  useEffect(() => {
    fetchAllClinics();
  }, []);

  const fetchAllClinics = async () => {
    try {
      const response = await ClinicService.getAllClinics();
      setClinics(response);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  const handleClinicSelect = async (clinicId) => {
    setSelectedClinicId(clinicId);

    try {
      const response = await ClinicService.getAppointmentsForClinic(clinicId);
      setAppointments(response);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="view-appointments">
      <h2>View Appointments</h2>
      <div className="clinic-select">
        <select value={selectedClinicId} onChange={(e) => handleClinicSelect(e.target.value)}>
          <option value="">Select Clinic</option>
          {clinics.map((clinic) => (
            <option key={clinic.clinicAreaId} value={clinic.clinicAreaId}>
              {clinic.clinicAreaName} - {clinic.clinicAreaType}
            </option>
          ))}
        </select>
      </div>
      {selectedClinicId && (
        <div className="appointments-list">
          <h3>Appointments for {selectedClinicName} - {selectedClinicType}</h3>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.appointmentId} className="appointment-item">
                    <span className="patient-id">{appointment.patient.patientId}. </span>
                  <span className="patient-name">{appointment.patient.patientName}</span>
                  <span className="patient-email">{appointment.patient.patientEmail}</span>
                  <span className="appointment-details">{appointment.appointmentDate} - {appointment.startTime} to {appointment.endTime} -</span>
                  <span className="doctor-name">Dr. {appointment.doctor.doctorName}</span>
                  <span className="appointment-id"> - {appointment.appointmentId}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewClinicAppointments;
