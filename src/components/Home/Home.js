import React from 'react'
import Navbar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom'


const Home = ({ user }) => {

  const navigate = useNavigate();
    
  const handleLogout = () => {
    navigate("/login");
    console.log("Logout");
  }
  
  return (
    <div>
      <Navbar handleLogout={handleLogout}/>
      Welcome! {user.patientName}
    </div>
  )
}

export default Home
