import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import AuthService from '../../services/AuthService';
// import styles from './adminLogin.module.css';
import { Button, Grid, TextField, Typography, makeStyles } from '@mui/material';
import { Container } from 'react-bootstrap';
import useStyles from './styles';

const AdminLogin = ({ handleSuccessfulAdminLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();

  const corsUrl = process.env.REACT_APP_CORS_URL;
    const apiUrl = process.env.REACT_APP_API_URL;
 
 
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`${corsUrl}/${apiUrl}/admin/login`, {
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
        const user = await response.json();
        handleSuccessfulAdminLogin(user);
        navigate('/admin/home'); // Redirect to the admin home page after successful login
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }

    };


    return (
      <Container maxWidth="sm" className={classes.container}>
        <form className={classes.form} onSubmit={handleLogin}>
          <Typography variant="h2" gutterBottom>
            Admin Login
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="username"
                label="Username"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Login
              </Button>
            </Grid>
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Container>
    );
  };

export default AdminLogin;