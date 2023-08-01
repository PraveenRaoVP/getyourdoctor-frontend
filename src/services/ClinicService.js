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

const deleteClinicById = async (clinicId) => {
    try {
        const response = await axios.delete(`${corsUrl}/${apiUrl}/clinic-areas/${clinicId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting clinic.');
    }
}

const addSlotToClinic = async (clinicId, data) => {
    try {
        const response = await axios.post(`${corsUrl}/${apiUrl}/slots/create/${clinicId}`, data)
        return response.data
    } catch (error) {
        throw new Error('Error adding slot to clinic.');
    }
}

const getAllClinics = async () => {
    try {
        const response = await axios.get(`${corsUrl}/${apiUrl}/clinic-areas/all`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching clinics.');
    }
}

const getAppointmentsForClinic = async (clinicId) => {
    try {
        const response = await axios.get(`${corsUrl}/${apiUrl}/appointments/clinic-area/${clinicId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching appointments.');
    }
}


const ClinicService = {
    createClinicArea,
    searchClinic,
    getClinicById,
    deleteClinicById,
    addSlotToClinic,
    getAllClinics,
    getAppointmentsForClinic
}

export default ClinicService;