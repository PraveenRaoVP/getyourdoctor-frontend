import { Avatar, Grid, Typography, Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from "./profile.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockIcon from '@mui/icons-material/Lock';
import NavBar from '../NavBar/NavBar';

const Profile = ({ user, handleLogout }) => {

    const navigate = useNavigate();
  // Check if the user prop is null or empty
  if (!user) {
    return <div>Loading...</div>;
  }

  // Destructure the user object to access its properties
  const { patientName, patientEmail, patientAge, patientPhone, patientGender, patientAddress, profilePictureUrl } = user;


  const handleDeleteAccount = async () => {
    // Show a confirmation prompt before proceeding with the account deletion
    const isConfirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
  
    if (isConfirmed) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const corsUrl = process.env.REACT_APP_CORS_URL;
      // Implement your logic to handle the account deletion here
      // You can send a DELETE request to your backend API to delete the account
      console.log('Deleting account for user:', user);
      const response = await fetch(`${corsUrl}/${apiUrl}/patients/${user.patientId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
      navigate('/login');
      alert('Account deleted successfully!');
    }
  };

  return (
    <div>
    <NavBar />
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom>
          Welcome, {patientName}!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>
          Profile Information
        </Typography>
        <Grid item xs={12}>
        
        <Avatar src={profilePictureUrl} alt="Profile" className={classes.avatar} />
        {/* You can customize the styling of the image if needed */}
      </Grid>
        <Typography variant="body1" gutterBottom>
          Email: {patientEmail}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Age: {patientAge}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {patientPhone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Gender: {patientGender}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Address: {patientAddress.street}, {patientAddress.city}, {patientAddress.state}, {patientAddress.pincode}
        </Typography>
        {/* Display other user profile information as needed */}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>
          Actions
        </Typography>
        <div className={classes.actions}>
          <Button component={Link} to="/medical-records" variant="contained" color="primary">
            View Medical Records
          </Button>
          <Button component={Link} to="/receipts" variant="contained" color="primary">
            View Receipts
          </Button>
          <Button component={Link} to="/feedback" variant="contained" color="primary">
            Feedback
          </Button>
          <Button onClick={() => handleLogout()} variant="contained" color="secondary" startIcon={<ExitToAppIcon />}>
            Logout
          </Button>
          <Button onClick={() => handleDeleteAccount()} variant="contained" color="error" startIcon={<DeleteIcon />}>
            Delete Account
          </Button>
          <Button variant="contained" startIcon={<LockIcon />}>
            Reset Password
          </Button>
        </div>
      </Grid>
    </Grid>
    </div>
  );
};

export default Profile;