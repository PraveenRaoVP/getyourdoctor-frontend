import { AppBar, Paper, TextField, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "./login.module.css";

const PatientLogin = ({ handleSuccessfulLogin }) => {
    const apiUrl = process.env.REACT_APP_API_URL;   
    const corsUrl = process.env.REACT_APP_CORS_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');


    const handleLogin = async () => {
    try {
      const response = await fetch(`${corsUrl}/${apiUrl}/patients/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        //const token = await response.text();
        // Save the token in local storage or cookies
        //localStorage.setItem('authToken', token);

        // Redirect to the home page or any other page after successful login
        // You can use react-router-dom for navigation
        const user = await response.json();
        //console.log(user)
        handleSuccessfulLogin(user);
      } else {
        setError("Invalid credentials");  
        // alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError("An error occured during login.");
    }
  };

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
      <Paper elevation={4} className={styles.loginContainer}>
        <Card 
        className={styles.loginCard}
        style={{ width: '30rem', padding: '20px', margin: 'auto', marginTop: '50px' }}
        >
        <Typography variant="h5">Login</Typography>
        <TextField
          className={styles.input}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          className={styles.input}
          fullWidth
        />
        <Button variant="contained" color="primary" className={styles.submitBtn} onClick={handleLogin}>
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        <Typography>
          Don't have an account? <Link to="/register">Register now</Link>
        </Typography>
        </Card>
      </Paper>
    </div>
  );
};

export default PatientLogin
