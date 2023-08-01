import { useState } from 'react';
import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import PatientLogin from './components/Auth/PatientLogin';
import PatientRegister from './components/Auth/PatientRegister';
import SearchClinic from './components/BookAppointment/SearchClinic';
import ClinicDetails from './components/BookAppointment/ClinicDetails';
import AppointmentForm from './components/BookAppointment/AppointmentForm';
import ViewAppointments from './components/ViewAppointments/ViewAppointments';
import Profile from './components/Profile/Profile';
import MedicalRecord from './components/Profile/MedicalRecord';
import Feedback from './components/Profile/Feedback';
import ChatBot from './components/ChatBot/ChatBot';
import ChatBots from './components/ChatBot/ChatBots';
import AdminLogin from './components/AdminPortal/Auth/AdminLogin';
import AdminHome from './components/AdminPortal/Home/AdminHome';
import ViewPatientProfile from './components/AdminPortal/Patients/ViewPatientProfile';
import UpdatePatientDetails from './components/AdminPortal/Patients/UpdatePatientDetails';
import DeletePatient from './components/AdminPortal/Patients/DeletePatient';
import ViewPatientFeedbacks from './components/AdminPortal/Patients/ViewPatientFeedbacks';
import CreateClinic from './components/AdminPortal/ClinicAreas/CreateClinic/CreateClinic';
import SearchClinicAdmin from './components/AdminPortal/ClinicAreas/SearchClinic/SearchClinicAdmin';
import DeleteClinic from './components/AdminPortal/ClinicAreas/DeleteClinic/DeleteClinic';
import AddSlots from './components/AdminPortal/ClinicAreas/AddSlots/AddSlots';
import ViewClinicAppointments from './components/AdminPortal/ClinicAreas/ViewClinicAppointments.js/ViewClinicAppointments';
import AddAdmin from './components/AdminPortal/Admins/AddAdmin/AddAdmin';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false); 
  const [selectedSlot, setSelectedSlot] = useState(null); 
  const [clinicDetails, setClinicDetails] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);

  const handleSuccessfulLogin = (userData) => {
    setLoggedIn(true);
    setUser(userData);
  };

  const handleSuccessfulAdminLogin = (adminData) => {
    setAdminLoggedIn(true);
    setAdmin(adminData);
    // console.log(adminLoggedIn)
  }

  const handleLogout= () => {
    setLoggedIn(false);
  }

  const handleSuccessfulRegister = () => {
    setSuccessfulRegister(true);
  };

  const handleAppointmentSubmit = (appointmentData) => {
    // Implement your logic to submit the appointment data to the backend here
    console.log('Appointment Data:', appointmentData);
  };

  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/home" element={loggedIn ? <Home user={user} /> : <Navigate to="/login" />} />

        {/* Login route */}
        <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <PatientLogin handleSuccessfulLogin={handleSuccessfulLogin} />} />

        {/* Default route */}
        <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />

        {/* Register route */}
        <Route path="/register" element={<PatientRegister successfulRegister={successfulRegister} handleSuccessfulRegister={handleSuccessfulRegister} />} />

        {/* Search clinics route */}
        <Route path="/search-clinics" element={<SearchClinic />} />

        {/* Clinic route */}
        <Route path="/clinic/:clinicId" element={<ClinicDetails onSelectSlot={(slot)=>setSelectedSlot(slot)} onSelectClinic={(clinic) => setClinicDetails(clinic)} />} />

        {/* Appointment form route */}
        <Route path="/appointment-form/" element={<AppointmentForm slot={selectedSlot} onSubmit={handleAppointmentSubmit} user={user} clinicDetails={clinicDetails} />} />

        {/* View upcoming appointments route */}
        <Route path="/view-upcoming-appointments" element={<ViewAppointments user={user} />} />

        {/* Profile route */}
        <Route path="/profile" element={<Profile user={user} handleLogout={handleLogout} />} />

        {/* Medical records route */}
        <Route path="/medical-records" element={<MedicalRecord user={user} />} />

        {/* Feedback Route */}
        <Route path="/feedback" element={<Feedback user={user} clinics={clinics} setClinics={setClinics} />} />

        {/* Chatbot route */}
        <Route path="/chatbot" element={<ChatBots user={user} clinics={clinics} />} /> 



        {/* Admin Login and Basic routes */}


        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin handleSuccessfulAdminLogin={handleSuccessfulAdminLogin} />} />

        {/* Admin default route */}
        <Route path="/admin/home" element={adminLoggedIn ? <AdminHome admin={admin} /> : <Navigate to="/admin/login" />} />
        {/* Admin default route */}
        <Route path="/" element={<Navigate to="/admin/home" />} />

        {/* Admin default route */}
        <Route path="/admin" element={adminLoggedIn ? <Navigate to="/admin/home" /> : <Navigate to="/admin/login" />} />


        {/* Admin Patient Routes */}


        {/* Admin View Patient Profile route */}
        <Route path="/admin/patients/view" element={<ViewPatientProfile />} />

        {/* Admin Update Patient Profile route */}
        <Route path="/admin/patients/update" element={<UpdatePatientDetails />} />

        {/* Admin delete users route */}
        <Route path="/admin/patients/delete" element={<DeletePatient />} />

        {/*Admin view patient feedbacks route */}
        <Route path="/admin/patients/feedbacks" element={<ViewPatientFeedbacks />} />


        {/*Admin Clinic Routes */}

        {/* Admin create new clinic area route */}
        <Route path="/admin/clinic-areas/create" element={<CreateClinic />} />

        {/* Admin search clinics route */}
        <Route path="/admin/clinic-areas/search" element={<SearchClinicAdmin />} />

        {/* Admin delete clinics route */}
        <Route path="/admin/clinic-areas/delete" element={<DeleteClinic />} />  

        {/* Admin add slots route */}
        <Route path="/admin/clinic-areas/add-slots" element={<AddSlots />} />

        {/* Admin view appointments from clinics route */}
        <Route path="/admin/clinic-areas/view-appointments" element={<ViewClinicAppointments />} />


        {/* Admin Appointments Routes */}



        {/* Admin Admins Routes */}
        {/* Admin create new admin route */}
        <Route path="/admin/admins/add" element={<AddAdmin />} />


      </Routes>
    </Router>
  );
}

export default App;