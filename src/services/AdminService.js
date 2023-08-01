import axios from "axios";

const corsUrl = process.env.REACT_APP_CORS_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const addAdmin = async (adminData) => {
    try{
        const response = await axios.post(`${corsUrl}${apiUrl}/admin/create`, adminData);
        return response.data;
    } catch(error){
        throw new Error("Error in Creating new admin")
    }
}


const AdminService = {

}

export default AdminService;