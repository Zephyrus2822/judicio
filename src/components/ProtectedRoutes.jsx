import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const Auth=window.localStorage.getItem('isLoggedInjudicio')
  return (
    Auth? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes