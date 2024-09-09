import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    const Auth=window.localStorage.getItem("isLoggedInjudicio")
  return (
    Auth ? <Navigate to='/'/> : <Outlet/>
  )
}

export default PublicRoutes