import React, { useEffect, useState } from 'react';
import ClinicService from '../../../../services/ClinicService';
import { Button, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import styles from './styles.module.css'; // Import the CSS file
// import AdminNavbar from '../../AdminNavbar/AdminNavbar';

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

  useEffect(() => {
    handleSearchClinic();
  }, [searchKeyword])

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
    <div>
      
    <div className={styles.searchClinic}>
      <Typography variant="h2">Search Clinic</Typography>
      <div className={styles.searchForm}>
        <TextField
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Enter clinic name or type..."
        />
        <Button onClick={handleSearchClinic} variant="contained">
          Search
        </Button>
      </div>
      {searchResults.length > 0 ? (
        <div className={styles.searchResults}>
          <Typography variant="h3">Search Results</Typography>
          <Paper elevation={3} className={styles.resultList}>
            <List>
              {searchResults.map((clinic) => (
                <ListItem
                  key={clinic.clinicAreaId}
                  onClick={() => handleClinicClick(clinic.clinicAreaId)}
                  className={styles.clinicItem}
                  button
                >
                  <ListItemText
                    primary={`${clinic.clinicAreaName} - ${clinic.clinicAreaType}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      ) : (
        <Typography variant="body1">No results found.</Typography>
      )}
      {selectedClinic && (
        <div className={styles.clinicDetails}>
          <Typography variant="h3">Clinic Details</Typography>
          <Typography variant="body1" className={styles.clinicName}>
            {selectedClinic.clinicAreaName}
          </Typography>
          <Typography variant="body1" className={styles.clinicType}>
            {selectedClinic.clinicAreaType}
          </Typography>
          <Typography variant="body1" className={styles.clinicWorkingHours}>
            Working Hours: {selectedClinic.workingHours}
          </Typography>
          <Typography variant="body1" className={styles.clinicContact}>
            Contact Number: {selectedClinic.contactNumber}
          </Typography>
          <Typography variant="body1" className={styles.clinicEmail}>
            Email: {selectedClinic.email}
          </Typography>
          {/* Render other clinic details as needed */}
          <Button
            className={styles.clearButton}
            onClick={() => setSelectedClinic(null)}
            variant="outlined"
          >
            Close
          </Button>
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchClinicAdmin;
