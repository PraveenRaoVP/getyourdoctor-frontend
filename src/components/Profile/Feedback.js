import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import { Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import styles from "./feedback.module.css";
import { FormControl } from 'react-bootstrap';

const Feedback = ({ user, clinics, setClinics }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [feedback, setFeedback] = useState({
    patientId: user.patientId, // Replace with the actual patient ID
    clinicAreaId: 1, // Replace with the actual clinic ID
    rating: 5,
    comment: "Excellent service! The staff was very friendly and helpful."
  });

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    try {
      // Implement your logic to submit the feedback to the backend here
      // You can use the 'feedback' state to get the feedback data
      console.log('Submitting feedback:', feedback);
      // Clear the feedback data after submission (optional)
      setFeedback({
        patientId: user.patientId,
        clinicAreaId: feedback.clinicId,
        rating: feedback.rating,
        comment: ''
      });
      const apiUrl = process.env.REACT_APP_API_URL;
      const corsUrl = process.env.REACT_APP_CORS_URL;
        // Replace the URL with your backend endpoint to submit feedback
        const response = await fetch(`${corsUrl}/${apiUrl}/feedbacks/create-feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedback),
        });

        if(response.ok) {
            alert('Feedback submitted successfully!');
        } else {
            setErrorMessage("There was an error in submitting the message");
        }

    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    fetchClinics();
    }, []);
  
  const fetchClinics = async () => {
    try{
        const apiUrl = process.env.REACT_APP_API_URL;
        const corsUrl = process.env.REACT_APP_CORS_URL;

        const response = await fetch(`${corsUrl}/${apiUrl}/clinic-areas/all`);
        if(response.ok){
            const data = await response.json();
            setClinics(data);
        }
    } catch(err){
        setErrorMessage("Error retrieving clinics");
    }
  }



  return (
    <div>
      <Navbar />
      <h1>Feedback</h1>
      <form onSubmit={handleFeedbackSubmit}>
        <div>
            <label htmlFor="clinic">Clinic:</label>
            <select
                id="clinic"
                value={feedback.clinicId}
                onChange={(event) => setFeedback({ ...feedback, clinicId: event.target.value })}
                required
            >
                <option value="">Select a clinic</option>
                {clinics.map((clinic) => (
                    <option key={clinic.clinicId} value={clinic.clinicId}>
                        {clinic.clinicAreaName}
                    </option>
                ))}
            </select>
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={feedback.rating}
            onChange={(event) => setFeedback({ ...feedback, rating: event.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            rows="4"
            cols="50"
            value={feedback.comment}
            onChange={(event) => setFeedback({ ...feedback, comment: event.target.value })}
            placeholder="Enter your feedback..."
            required
          />
        </div>
        <div>
          <button type="submit">Submit Feedback</button>
        </div>
      </form>
      <Link to="/profile">Back to Profile</Link>
    </div>
  );
};

export default Feedback;
