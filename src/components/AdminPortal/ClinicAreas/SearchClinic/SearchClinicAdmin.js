import React, { useState } from 'react';
import './styles.css'; // Import the CSS file
import ClinicService from '../../../../services/ClinicService';

const SearchClinicAdmin = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const handleSearchClinic = async () => {
    try {
      const response = await ClinicService.searchClinic(searchKeyword);
      console.log(response)
      setSearchResults(response);
      console.log('Search Results:', response);
    } catch (error) {
      console.error('Error searching clinic:', error);
    }
  };

  const handleClinicClick = async (clinicId) => {
    try {
      const response = await ClinicService.getClinicById(clinicId);
      setSelectedClinic(response);
      console.log('Selected Clinic:', response.data);
    } catch (error) {
      console.error('Error fetching clinic details:', error);
    }
  };

  return (
    <div className="search-clinic">
      <h2>Search Clinic</h2>
      <div className="search-form">
        <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Enter clinic name or type..." />
        <button onClick={handleSearchClinic}>Search</button>
      </div>
      {searchResults.length > 0 ? (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((clinic) => (
              <li key={clinic.clinicAreaId} onClick={() => handleClinicClick(clinic.clinicAreaId)} className="clinic-item">
                <span className="clinic-name">{clinic.clinicAreaName} - </span>
                <span className="clinic-type">{clinic.clinicAreaType}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found.</p>
      )}
      {selectedClinic && (
        <div className="clinic-details">
          <h3>Clinic Details</h3>
          <div className="clinic-name">{selectedClinic.clinicAreaName}</div>
          <div className="clinic-type">{selectedClinic.clinicAreaType}</div>
          <div className="clinic-working-hours">Working Hours: {selectedClinic.workingHours}</div>
          <div className="clinic-contact">Contact Number: {selectedClinic.contactNumber}</div>
          <div className="clinic-email">Email: {selectedClinic.email}</div>
          {/* Render other clinic details as needed */}
          <button className="clear-button" onClick={() => setSelectedClinic(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SearchClinicAdmin;
