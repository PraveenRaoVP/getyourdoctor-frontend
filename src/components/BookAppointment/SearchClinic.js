import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import { Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import styles from "./searchclinic.module.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

  useEffect(() => {
    handleSearch();
  }, [searchTerm])

  return (
    <div>
      <Navbar />
      <Typography variant="h5" style={{ textAlign: 'center', marginTop: '10px'}}>Search Clinic</Typography>
      <div className={styles.searchContainer}>
      <TextField
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter clinic name or location"
        variant="outlined"
        fullWidth
        style={{ marginBottom: '16px', marginRight: '16px' }}
      />
      <Button variant="contained" className={styles.searchButton} color="primary" onClick={handleSearch}>
        Search
      </Button>
      </div>
      {clinics.length > 0 ? (
        <List className={styles.clinicsContainer}>
          {clinics.map((clinic) => (
            <ListItem key={clinic.clinicAreaId} button className={styles.lists} component={Link} to={`/clinic/${clinic.clinicAreaId}`}>
              <div className={styles.clinicElement}>
                <span><ListItemText primary={`${clinic.clinicAreaName}`} /></span>
                <span><ListItemText primary={`${clinic.address}`} /></span>
              </div>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No clinics found.</Typography>
      )}
    </div>
  );
};

export default SearchClinic;