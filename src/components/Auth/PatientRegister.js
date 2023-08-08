import { AppBar, Paper, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "./register.module.css";

const PatientRegister = ({successfulRegister ,handleSuccessfulRegister }) => {
  
    const apiUrl = process.env.REACT_APP_API_URL;
  const corsUrl = process.env.REACT_APP_CORS_URL;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [doorNo, setDoorNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [gender, setGender] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleRegister = async () => {
    try {
            const patientData = {
                patientName: name,
                patientAge: age,
                patientEmail: email,
                patientPassword: password,
                patientPhone: phone,
                patientGender: gender,
                patientAddress: {
                    doorNo: doorNo,
                    street: street,
                    city: city,
                    state: state,
                    country: country,
                    pincode: pincode,
                },
                // You can add other patient properties here if needed
                profilePictureUrl: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            };
    
            const response = await fetch(`${corsUrl}/${apiUrl}/patients/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });

      if (response.ok) {
        setSuccess("Registration successful. Please login to continue.")
        handleSuccessfulRegister();
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration.');
    }
  };

  useEffect(() => {
    // Check if registration was successful
    if (successfulRegister) {
      // Redirect to the login page after a delay (e.g., 2 seconds)
      const redirectTimeout = setTimeout(() => {
        handleSuccessfulRegister();
      }, 2000);

      // Clean up the timeout when the component is unmounted
      return () => clearTimeout(redirectTimeout);
    }
  }, [successfulRegister, handleSuccessfulRegister]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
            GetYourDoctor
          </Typography>
          <Typography variant="subtitle1" component={Link} to="/about" style={{ marginLeft: '16px', textDecoration: 'none', color: 'white' }}>
            About
          </Typography>
          <Typography variant="subtitle1" component={Link} to="/contact" style={{ marginLeft: '16px', textDecoration: 'none', color: 'white' }}>
            Contact
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper elevation={3} className={styles.registerForm}>
        <Card className={styles.registerCard} variant="outlined">
        <Typography variant="h5">Register</Typography>
        <TextField
            className={styles.input}
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="Phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="Door No"
            type="text"
            value={doorNo}
            onChange={(e) => setDoorNo(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="Street"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="Country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            label="Pincode"
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            fullWidth
          />
        <select value={gender} className={styles.selectOption} onChange={(e) => setGender(e.target.value)}>
          <option value="" label='Select Gender'>Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <button onClick={handleRegister}>Register</button>
        {success ? <div><p>{success}</p><Link to="/login">Login</Link> </div>: <p>{error}</p>}
        {error && <p>{error}</p>} 
        </Card>
      </Paper>
    </div>
  );
}

export default PatientRegister;
