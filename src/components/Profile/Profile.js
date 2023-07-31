import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      <h1>Welcome, {patientName}!</h1>
      <div>
        <h2>Profile Information</h2>
        <p>Email: {patientEmail}</p>
        <p>Age: {patientAge}</p>
        <p>Phone: {patientPhone}</p>
        <p>Gender: {patientGender}</p>
        <p>Address: {patientAddress.street}, {patientAddress.city}, {patientAddress.state}, {patientAddress.pincode}</p>
        {/* Display other user profile information as needed */}
      </div>
      <div>
        <h2>Profile Picture</h2>
        <img src={profilePictureUrl} alt="Profile" />
        {/* You can customize the styling of the image if needed */}
      </div>
      <div>
        <h2>Actions</h2>
        <Link to="/medical-records">View Medical Records</Link>
        <br />
        <Link to="/receipts">View Receipts</Link>
        <br />
        <Link to="/feedback">Feedback</Link>
        <br />
        <button onClick={() => handleLogout()}>Logout</button>
        <br />
        <button onClick={() => handleDeleteAccount()}>Delete Account</button>
        <br />
        <button>Reset Password</button>
      </div>
    </div>
  );
};

export default Profile;