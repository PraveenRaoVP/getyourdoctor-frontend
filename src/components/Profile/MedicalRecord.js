import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MedicalRecord = ({ user }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    // You can fetch the medical records from the backend here using the patient's ID
    // For demonstration purposes, let's assume the backend returns an array of medical records
    const fetchMedicalRecords = async () => {
      try {
        // Replace the URL with your backend endpoint to fetch medical records
        const response = await fetch(`/api/medical-record/patient/${user.patientId}`);
        const data = await response.json();
        setMedicalRecords(data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, [user]);

  return (
    <div>
      <h1>Medical Records</h1>
      {medicalRecords.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <ul>
          {medicalRecords.map((record) => (
            <li key={record.id}>
              {/* Display the details of each medical record */}
              <p>Date: {record.date}</p>
              <p>Doctor: {record.doctorName}</p>
              <p>Diagnosis: {record.diagnosis}</p>
              <p>Prescription: {record.prescription}</p>
              {/* Add other medical record details as needed */}
            </li>
          ))}
        </ul>
      )}
      <Link to="/profile">Back to Profile</Link>
    </div>
  );
};

export default MedicalRecord;
