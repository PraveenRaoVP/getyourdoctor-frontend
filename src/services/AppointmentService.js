import React from 'react'

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const corsUrl = process.env.REACT_APP_CORS_URL;

const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${corsUrl}/${apiUrl}/appointments/book`, appointmentData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating appointment.');
  }
};

const updateAppointment = async (appointmentId, updatedData) => {
  try {
    const response = await axios.put(`${corsUrl}/${apiUrl}/appointments/${appointmentId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating appointment.');
  }
};

const cancelAppointment = async (appointmentId) => {
  try {
    await axios.delete(`${corsUrl}/${apiUrl}/appointments/cancel/${appointmentId}`);
  } catch (error) {
    throw new Error('Error canceling appointment.');
  }
};

const getAppointmentsByPatientId = async (patientId) => {
  try {
    const response = await axios.get(`${corsUrl}/${apiUrl}/appointments/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching appointments.');
  }
};

const getAppointmentsByClinicAreaId = async (clinicAreaId) => {
  try {
    const response = await axios.get(`${corsUrl}/${apiUrl}/appointments/clinic-area/${clinicAreaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching appointments.');
  }
};

const getUpcomingAppointmentsByPatientId = async (patientId) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${corsUrl}/${apiUrl}/appointments/patient/${patientId}/upcoming`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching upcoming appointments.');
  }
}

const AppointmentService = {
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAppointmentsByPatientId,
  getAppointmentsByClinicAreaId,
  getUpcomingAppointmentsByPatientId,
};

export default AppointmentService;
