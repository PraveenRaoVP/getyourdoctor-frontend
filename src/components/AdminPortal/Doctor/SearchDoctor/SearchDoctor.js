import React, { useState } from 'react'
import DoctorService from '../../../../services/DoctorService';

const SearchDoctor = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    doctorName: '',
    qualifications: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track selected doctor
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await DoctorService.searchDoctors(searchCriteria);
      if (response) {
        setDoctors(response);
      } else {
        setDoctors([]);
        setErrorMessage('No doctors found matching the criteria.');
      }
    } catch (error) {
      console.error('Error searching for doctors:', error);
      setDoctors([]);
      setErrorMessage('There was an error searching for doctors.');
    }
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected doctor when clicked
    console.log(selectedDoctor) // shows null
  };

  return (
    <div>
      <h2>Search for Doctors</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Doctor Name:</label>
          <input
            type="text"
            name="doctorName"
            value={searchCriteria.doctorName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Qualifications:</label>
          <input
            type="text"
            name="qualifications"
            value={searchCriteria.qualifications}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <h3>Search Results:</h3>
        <ul>
          {doctors.map((doctor) => (
            <li
              key={doctor.doctorId}
              onClick={() => handleDoctorClick(doctor)}
              style={{ cursor: 'pointer' }}
            >
              {doctor.doctorName} - {doctor.qualifications}
            </li>
          ))}
        </ul>
      </div>

      {/* Render selected doctor details */}
      {selectedDoctor && (
        <div>
          <h3>Selected Doctor Details:</h3>
          <p>Doctor Name: {selectedDoctor.doctorName}</p>
          <p>Qualifications: {selectedDoctor.qualifications}</p>
          {selectedDoctor.clinicArea && (
            <div>
              <p>Clinic Name: {selectedDoctor.clinicArea.clinicAreaName}</p>
              <p>Clinic Address: {selectedDoctor.clinicArea.address}</p>
            </div>
          )}
          {/* Add more details like Clinic Name and Clinic Address here */}
        </div>
      )}
    </div>
  );
};

export default SearchDoctor
