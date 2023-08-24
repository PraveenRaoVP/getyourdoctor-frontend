import React, { useState } from 'react';
import PatientService from '../../../services/PatientService.js';
import styles from './UpdatePatient.module.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import AdminNavbar from '../NavBar/AdminNavbar.js';


const UpdatePatientDetails = () => {
  const [patientId, setPatientId] = useState(null);
  const [patient, setPatient] = useState({
    patientName: '',
    patientAge: 0,
    patientPhone: '',
    patientGender: '',
    patientAddress: {
      doorNo: '',
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    },
  });
  //const [patient, setPatient] = useState({});
  const [message, setMessage] = useState('')


  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const fetchPatientDetails = async () => {
    try {
      const response = await PatientService.getPatientById(patientId);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    fetchPatientDetails();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    // Submit the updated patient data to the backend
    console.log(patient);
    try {
      const response = await PatientService.updatePatient(patientId, patient);
      console.log('Patient details updated:', response.data);
      setMessage('Patient details updated successfully. ');
      // Add any success message or redirect to a different page on successful update
    } catch (error) {
      console.error('Error updating patient details:', error);
    }
  };
  return (
    <div className={styles.updateContainer}>
      <AdminNavbar />
      {patientId === null ? (
        <div>
          <h2>Enter Patient ID to Update Details</h2>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="patientId">Patient ID: </label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={patientId || ''}
                onChange={handlePatientIdChange}
                required
              />
            </div>
            <div className={`${styles.formGroup} ${styles.Btn}`}>
              <button type="submit">Fetch Patient Details</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2>Update Patient Details</h2>
          <form onSubmit={handleUpdateSubmit}>
            {/* Render the form with the patient details */}
            <div className={styles.formGroup}>
              <label htmlFor="patientName">Name</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={patient.patientName}
                onChange={(e) => setPatient({ ...patient, patientName: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="patientAge">Age</label>
              <input
                type="number"
                id="patientAge"
                name="patientAge"
                value={patient.patientAge}
                onChange={(e) => setPatient({ ...patient, patientAge: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="patientPhone">Phone</label>
              <input
                type="tel"
                id="patientPhone"
                name="patientPhone"
                value={patient.patientPhone}
                onChange={(e) => setPatient({ ...patient, patientPhone: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="patientGender">Gender</label>
              <select
                id="patientGender"
                name="patientGender"
                value={patient.patientGender}
                onChange={(e) => setPatient({ ...patient, patientGender: e.target.value })}
                required
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="doorNo">Door No</label>
              <input
                type="text"
                id="doorNo"
                name="doorNo"
                value={patient.patientAddress.doorNo}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    patientAddress: { ...patient.patientAddress, doorNo: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="doorNo">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={patient.patientAddress.street}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    patientAddress: { ...patient.patientAddress, street: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="doorNo">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={patient.patientAddress.city}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    patientAddress: { ...patient.patientAddress, city: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="doorNo">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={patient.patientAddress.state}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    patientAddress: { ...patient.patientAddress, state: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="doorNo">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={patient.patientAddress.country}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    patientAddress: { ...patient.patientAddress, country: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="doorNo">Pin Code</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={patient.patientAddress.pincode}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    patientAddress: { ...patient.patientAddress, pincode: e.target.value },
                  })
                }
                required
              />
            </div>
            {/* Add more form fields for other patient address details */}
            <div className={`${styles.formGroup} ${styles.Btn}`}>
              <button type="submit">Update Details</button>
            </div>
          </form>
          {
            message && <div className={styles.message}>{message}. Back to <Link to="/admin/home">Home</Link></div>
          }
        </div>
      )}
    </div>
  );
};

export default UpdatePatientDetails;
