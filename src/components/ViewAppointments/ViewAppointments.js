import React, { useEffect, useState } from 'react'

const ViewAppointments = ({ user }) => {
  
    const [appointments, setAppointments] = useState([]); 
    const [errorMessage, setErrorMessage] = useState("");

    const getAppointments = async () => {
        try{
        const apiUrl = process.env.REACT_APP_API_URL;
        const corsUrl = process.env.REACT_APP_CORS_URL;
        const response = await fetch(`${corsUrl}/${apiUrl}/appointments/patient/${user.patientId}/upcoming`);
        const data = await response.json();
        setAppointments(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointments();
    }, [user.patientId]);


  
    return (
    <div>
      <h1>Upcoming Appointents</h1>
        <table>
            <thead>
                <tr>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Doctor Name</th>
                    <th>Clinic Name</th>                    
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.appointmentId}>
                        <td>{appointment.appointmentDate}</td>
                        <td>{appointment.startTime}</td>
                        <td>{appointment.doctor.doctorName}</td>
                        <td>{appointment.clinicArea.clinicAreaName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ViewAppointments
