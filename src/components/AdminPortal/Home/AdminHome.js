import React from 'react'
import AdminNavbar from '../NavBar/AdminNavbar'

const AdminHome = ({ admin }) => {
  return (
    <div>
        <AdminNavbar />
      Welcome {admin.adminUsername}
    </div>
  )
}

export default AdminHome
