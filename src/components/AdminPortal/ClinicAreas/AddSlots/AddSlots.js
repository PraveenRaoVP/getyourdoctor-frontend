import React, { useState } from 'react';
import styles from './styles.module.css'; // Import the CSS file
import ClinicService from '../../../../services/ClinicService';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

const AddSlots = () => {
  const [clinicId, setClinicId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddSlot = async () => {
    try {
      if (!clinicId || !startTime || !endTime || days.length === 0) {
        setErrorMessage('Please fill in all the required fields.');
        return;
      }
      //console.log(clinicId)

      const slotData = {
        startTime: startTime,
        endTime: endTime,
        //workingDays: days,
        available: true
      };

      console.log(slotData)
      // const response = await ClinicService.addSlotToClinic(clinicId, slotData);
      setSuccessMessage('Slot added successfully.');
      setErrorMessage('');
      setClinicId('');
      setStartTime('');
      setEndTime('');
      setDays([]);
    } catch (error) {
      console.error('Error adding slot:', error);
      setSuccessMessage('');
      setErrorMessage('Error adding slot. Please try again.');
    }
  };

  return (
    <div className={styles.addSlots}>
      <Typography variant="h2">Add Slots to Clinic</Typography>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      <div className={styles.slotForm}>
        <input type="text" value={clinicId} onChange={(e) => setClinicId(e.target.value)} placeholder="Enter clinic ID" className={styles.inputField} />
        <TextField
          label="Start Time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className={styles.inputField}
        />
        <TextField
          label="End Time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className={styles.inputField}
        />
        <div className={styles.dayCheckboxes}>
          <FormControlLabel
            control={<Checkbox checked={days.includes('Monday')} onChange={() => setDays(prevDays => prevDays.includes('Monday') ? prevDays.filter(day => day !== 'Monday') : [...prevDays, 'Monday'])} />}
            label="Monday"
          />
          <FormControlLabel
            control={<Checkbox checked={days.includes('Tuesday')} onChange={() => setDays(prevDays => prevDays.includes('Tuesday') ? prevDays.filter(day => day !== 'Tuesday') : [...prevDays, 'Tuesday'])} />}
            label="Tuesday"
          />
          
          {/* Add checkboxes for other days */}
        </div>
        <Button onClick={handleAddSlot} variant="contained" className={styles.addButton}>
          Add Slot
        </Button>
      </div>
    </div>
  );
};

export default AddSlots;