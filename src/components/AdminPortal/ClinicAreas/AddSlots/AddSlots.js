import React, { useState } from 'react';
import './styles.css'; // Import the CSS file
import ClinicService from '../../../../services/ClinicService';

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
      console.log(clinicId)

      const slotData = {
        startTime: startTime,
        endTime: endTime,
        //workingDays: days,
        available: true
      };

      await ClinicService.addSlotToClinic(clinicId, slotData);
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
    <div className="add-slots">
      <h2>Add Slots to Clinic</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="slot-form">
        <input type="text" value={clinicId} onChange={(e) => setClinicId(e.target.value)} placeholder="Enter clinic ID" />
        <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder="Enter start time" />
        <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="Enter end time" />
        <div className="day-checkboxes">
          <label>
            <input type="checkbox" checked={days.includes('Monday')} onChange={() => setDays((prevDays) => prevDays.includes('Monday') ? prevDays.filter(day => day !== 'Monday') : [...prevDays, 'Monday'])} />
            Monday
          </label>
          <label>
            <input type="checkbox" checked={days.includes('Tuesday')} onChange={() => setDays((prevDays) => prevDays.includes('Tuesday') ? prevDays.filter(day => day !== 'Tuesday') : [...prevDays, 'Tuesday'])} />
            Tuesday
          </label>
          {/* Add checkboxes for other days */}
        </div>
        <button onClick={handleAddSlot}>Add Slot</button>
      </div>
    </div>
  );
};

export default AddSlots;