import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const CORS_URL = process.env.REACT_APP_CORS_URL;

const addDoctor = async (data) => {
  try {
    const response = await axios.post(`${CORS_URL}/${API_URL}/doctors/add`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding doctor:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

const assignClinicToDoctor = async (doctorId, clinicAreaId) => {
  try {
    const response = await axios.post(`${CORS_URL}/${API_URL}/doctors/add-to-clinic-area/${clinicAreaId}/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error assigning clinic to doctor:", error);
    throw error;
  }
};

const assignSlotToDoctor = async (doctorId, slotId) => {
  try {
    const response = await axios.post(`${CORS_URL}/${API_URL}/doctors/add-to-slot/${slotId}/doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error assigning slot to doctor:", error);
    throw error;
  }
};

const searchDoctors = async (criteria) => {
  try {
    const response = await axios.post(`${CORS_URL}/${API_URL}/doctors/search`, criteria);
    return response.data;
  } catch (error) {
    console.error("Error searching for doctors:", error);
    throw error;
  }
};

const DoctorService = {
  addDoctor,
  assignClinicToDoctor,
  assignSlotToDoctor,
  searchDoctors,
};

export default DoctorService;