import axios from "axios";

const corsUrl = process.env.REACT_APP_CORS_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const createClinicArea = async (data) => {
    try {
        const response = await axios.post(`${corsUrl}/${apiUrl}/clinic-areas/create`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error creating clinic area.');
    }
}

const searchClinic = async (searchKeyword) => {
    try {
        const response = await axios.get(`${corsUrl}/${apiUrl}/clinic-areas/clinics?search=${searchKeyword}`);
        return response.data;
    } catch (error) {
        throw new Error('Error searching clinic.');
    }
}

const getClinicById = async (clinicId) => {
    try{
        const response  = await axios.get(`${corsUrl}/${apiUrl}/clinic-areas/${clinicId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching clinic details.');
    }
}

const ClinicService = {
    createClinicArea,
    searchClinic,
    getClinicById
}

export default ClinicService;