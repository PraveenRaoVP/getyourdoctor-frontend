import React from 'react'
import Navbar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material';


const Home = ({ user }) => {

  const navigate = useNavigate();
    
  const handleLogout = () => {
    navigate("/login");
    console.log("Logout");
  }
  
  return (
    <div>
      <Navbar handleLogout={handleLogout}/>
      <Typography variant="h3" style={{ textAlign: 'center', paddingTop: '10px' }}>Welcome! {user.patientName}</Typography>
      <video autoPlay loop muted style={{ }}>
        <source src="../../assets/title.mp4"  type="video/mp4" />
      </video>
      
    </div>
  )
}

export default Home
