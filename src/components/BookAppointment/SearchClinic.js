import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchClinic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clinics, setClinics] = useState([]);

  const handleSearch = async () => {
    try {
      // Fetch clinics based on the search term from the backend API
      // Replace apiUrl and corsUrl with your actual API URLs
      const apiUrl = process.env.REACT_APP_API_URL;
      const corsUrl = process.env.REACT_APP_CORS_URL;

      const response = await fetch(`${corsUrl}/${apiUrl}/clinic-areas/clinics?search=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setClinics(data);
      } else {
        console.error('Failed to fetch clinics:', response.statusText);
        setClinics([]);
      }
    } catch (error) {
      console.error('Error during clinic search:', error);
      setClinics([]);
    }
  };

  return (
    <div>
      <h2>Search Clinic</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter clinic name or location"
      />
      <button onClick={handleSearch}>Search</button>

      {clinics.length > 0 ? (
        <ul>
          {clinics.map((clinic) => (
            <li key={clinic.clinicAreaId}>
              <Link to={`/clinic/${clinic.clinicAreaId}`}>
                {clinic.clinicAreaName} - {clinic.location}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No clinics found.</p>
      )}
    </div>
  );
};

export default SearchClinic;