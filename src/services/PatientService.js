import axios from "axios";
const corsUrl = process.env.REACT_APP_CORS_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const PatientService = {
  // Get patients by name
  getPatientsByName: async (data) => {
    try {
      
      const response = await axios.post(`${corsUrl}/${apiUrl}/patients/search`, data);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching patients by name.');
    }
  },

  // Get patient by ID
  getPatientById: async (patientId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${corsUrl}/${apiUrl}/patients/${patientId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching patient details.');
    }
  },

  // Update patient details
  updatePatient: async (patientId, data) => {
    try {
      const response = await axios.put(`${corsUrl}/${apiUrl}/patients/update/${patientId}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Error updating patient details.');
    }
  },
  deletePatient: async (patientId) => {
    try {
      const response = await axios.delete(`${corsUrl}/${apiUrl}/patients/${patientId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting patient.');
    }
  }
};

export default PatientService;