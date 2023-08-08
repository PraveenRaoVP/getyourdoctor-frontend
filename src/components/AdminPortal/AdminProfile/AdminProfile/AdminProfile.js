import { Paper, Typography } from '@mui/material';
import React from 'react'
import { Button } from 'react-bootstrap';

const AdminProfile = ({ admin }) => {
    const { adminId, adminUsername, adminFullName, adminEmail, adminRole } = admin;

  return (
   <Paper>
      <Typography variant="h6">Admin ID: {adminId}</Typography>
        <Typography variant="h6">Username: {adminUsername}</Typography>
        <Typography variant="h6">Full Name: {adminFullName}</Typography>
        <Typography variant="h6">Email: {adminEmail}</Typography>
        <Typography variant="h6">Role: {adminRole}</Typography>
        <Button variant="primary" href="/admin/home">Back</Button>
    </Paper>
  )
}

export default AdminProfile
