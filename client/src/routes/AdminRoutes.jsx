import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import { Outlet } from 'react-router-dom'

const AdminRoutes = () => {
  return (
    <div>
      <AdminDashboard/>
      <Outlet/>
    </div>
  )
}

export default AdminRoutes