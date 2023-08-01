import React from 'react'
import AdminNavbar from '../NavBar/AdminNavbar'

const AdminHome = ({ admin }) => {
  return (
    <div>
        <AdminNavbar admin={admin} />
      Welcome {admin.adminUsername}
    </div>
  )
}

export default AdminHome
