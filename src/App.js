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

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false); 
  const [selectedSlot, setSelectedSlot] = useState(null); 
  const [clinicDetails, setClinicDetails] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [clinics, setClinics] = useState([]);

  const handleSuccessfulLogin = (userData) => {
    setLoggedIn(true);
    setUser(userData);
  };

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
        <Route path="/chatbot" element={<ChatBot user={user} clinics={clinics} />} /> 

      </Routes>
    </Router>
  );
}

export default App;