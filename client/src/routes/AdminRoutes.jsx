import React, { useState, useEffect } from 'react'
import AdminSideBar from '../components/AdminSideBar'
import { Outlet, Navigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'

const AdminRoutes = () => {
  const token = localStorage.getItem('jwtToken')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!token) {
    return <Navigate to="/admin/login" />
  }

  useEffect(() => {
    try {
      if (token) {
        const decoded = jwtDecode(token)
        setData(decoded)
        setLoading(true);
      }
    } catch (err) {
      localStorage.removeItem("jwtToken")
      window.location.href = "/admin/login"
    } finally {
      setLoading(false)
    }
  }, [token])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* Desktop View */}
      {data && (
        <div className="hidden md:block w-64">
          <AdminSideBar data={data} />
        </div>
      )}

      {/* Mobile View */}
      {sidebarOpen && data && (
        <div className="fixed inset-0 z-50 md:hidden bg-gray-900 text-white w-64 shadow-lg">
          <AdminSideBar data={data} onClose={() => setSidebarOpen(false)} />
        </div>
      )}
      <div className="md:hidden p-2">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Outlet Started */}
      <div className="w-full bg-amber-800">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminRoutes
