import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    console.log("loggin out")
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  };


  return (
    <div>
        <Navbar loggedIn={true} onLogout={handleLogout}/>
        <Outlet />
        
      
    </div>
  )
}

export default Layout
