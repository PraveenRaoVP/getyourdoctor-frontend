import React from 'react';
import axios from 'axios';

const corsUrl = process.env.REACT_APP_CORS_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const getAllFeedbacks = async () => {
    try {
        const response = await axios.get(`${corsUrl}/${apiUrl}/feedbacks`);
        return response;
    } catch (error) {
        throw new Error("Unable to fetch feedbacks.");
    }
}

const FeedbackService = {
    getAllFeedbacks
}

export default FeedbackService;