import React, { useState } from 'react'
import DoctorService from '../../../../services/DoctorService';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import { Button, Container, TextField, Typography } from '@mui/material';
import { ThreeDRotationRounded } from '@mui/icons-material';

const CreateDoctor = ({ newDoctor, setNewDoctor }) => {
    const [doctor, setDoctor] = useState({
      doctorName: '',
      qualifications: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const timeout = (delay) => {
      return new Promise((res) => setTimeout(res, delay));
    }

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setDoctor((prevDoctor) => ({
        ...prevDoctor,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await DoctorService.addDoctor(doctor);
        console.log(response)
        if (response) {
          setMessage('Doctor added successfully');
          setNewDoctor(response)
          await timeout(2000)
          navigate('/admin/doctor/assign');
        } else {
          setMessage('There was an error adding the doctor');
        }
      } catch (error) {
        console.error('Error adding doctor:', error);
        setMessage('There was an error adding the doctor');
      }
    };
  
    return (
      <Container>
        <Typography variant="h2">Create New Doctor</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Doctor Name"
            type="text"
            name="doctorName"
            value={doctor.doctorName}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Qualifications"
            type="text"
            name="qualifications"
            value={doctor.qualifications}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained">
            Create Doctor
          </Button>
        </form>
        {message && <p>{message}</p>}
      </Container>
    );
  };
  

export default CreateDoctor
