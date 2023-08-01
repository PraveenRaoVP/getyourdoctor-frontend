import React, { useEffect, useState } from 'react';
import './ViewPatientFeedbacksStyles.css'; // Import the CSS file
import FeedbackService from '../../../services/FeedbackService';

const ViewPatientFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchAllFeedbacks = async () => {
    try {
      const response = await FeedbackService.getAllFeedbacks();
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  useEffect(() => {
   setFeedbacks(feedbacks);
  }, [feedbacks]); // Log feedbacks whenever it changes

  const handleFeedbackClick = (feedbackId) => {
    const selected = feedbacks.find((feedback) => feedback.id === feedbackId);
    setSelectedFeedback(selected);
  };

  const handleClearFeedback = () => {
    setSelectedFeedback(null);
  };

  return (
    <div className="view-patient-feedbacks">
      <h2>Feedbacks List</h2>
      <div className="feedback-list">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedback-item" onClick={() => handleFeedbackClick(feedback.id)}>
            <span className="patient-name">{feedback.patientName}</span>
            <span className="clinic-name">{feedback.clinicName}</span>
          </div>
        ))}
      </div>
      {selectedFeedback && (
        <div className="feedback-details">
          <h3>Feedback Details</h3>
          <div className="patient-name">{selectedFeedback.patientName}</div>
          <div className="clinic-name">{selectedFeedback.clinicName}</div>
          <div className="feedback-text">{selectedFeedback.feedbackText}</div>
          <button className="clear-button" onClick={handleClearFeedback}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPatientFeedbacks;





