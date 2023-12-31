import React, { useState } from 'react';
import styles from './styles.module.css'; // Import the CSS file
import ClinicService from '../../../../services/ClinicService';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../NavBar/AdminNavbar';


const CreateClinic = () => {
  const [clinicAreaName, setClinicName] = useState('');
  const [clinicAreaType, setClinicType] = useState('');
  const [workingDays, setWorkingDays] = useState([]);
  const [workingHours, setWorkingHours] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [keywords, setKeywords] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateClinic = async (e) => {
    e.preventDefault();
    try {
      const newClinic = {
        clinicAreaName,
        clinicAreaType,
        workingDays,
        workingHours,
        contactNumber,
        email,
        address,
        keywords,
        available: true
      };

      const response = await ClinicService.createClinicArea(newClinic);
      console.log('Created clinic:', response.data);
      setMessage("Clinic created successfully")
      // Add any additional logic or notifications upon successful creation
    } catch (error) {
      console.error('Error creating clinic:', error);
      // Handle error and show any error messages
      setMessage("Error creating clinic")
    }
  };

  const handleWorkingDayChange = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  return (
    <div>
      <AdminNavbar /> 
      <div className={styles.createClinic}>
      <h2>Create New Clinic</h2>
      <form onSubmit={handleCreateClinic} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Clinic Name</label>
          <input
            type="text"
            value={clinicAreaName}
            onChange={(e) => setClinicName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Clinic Type</label>
          <input
            type="text"
            value={clinicAreaType}
            onChange={(e) => setClinicType(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Working Days</label>
          <div className={styles.checkboxGroup}>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" value="Monday" checked={workingDays.includes('Monday')} onChange={() => handleWorkingDayChange('Monday')} />
              Monday
            </label>
            <label>
              <input type="checkbox" value="Tuesday" checked={workingDays.includes('Tuesday')} onChange={() => handleWorkingDayChange('Tuesday')} />
              Tuesday
            </label>
            <label>
              <input type="checkbox" value="Wednesday" checked={workingDays.includes('Wednesday')} onChange={() => handleWorkingDayChange('Wednesday')} />
              Wednesday
            </label>
            <label>
              <input type="checkbox" value="Thursday" checked={workingDays.includes('Thursday')} onChange={() => handleWorkingDayChange('Thursday')} />
              Thursday
            </label>
            <label>
              <input type="checkbox" value="Friday" checked={workingDays.includes('Friday')} onChange={() => handleWorkingDayChange('Friday')} />
              Friday
            </label>
            <label>
              <input type="checkbox" value="Saturday" checked={workingDays.includes('Saturday')} onChange={() => handleWorkingDayChange('Saturday')} />
              Saturday
            </label>
            <label>
              <input type="checkbox" value="Sunday" checked={workingDays.includes('Sunday')} onChange={() => handleWorkingDayChange('Sunday')} />
              Sunday
            </label>
        </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Working Hours</label>
          <input
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Keywords</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Clinic
        </button>
      </form>
      {message && (
        <p className={styles.message}>
          {message}, continue to <Link to="/admin/home">Home page</Link>
        </p>
      )}
      </div>
    </div>
  );
};

export default CreateClinic;
