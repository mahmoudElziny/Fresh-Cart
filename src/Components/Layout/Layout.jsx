import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Offline } from 'react-detect-offline'

export default function Layout() {
    
  return (
    <>
      <div className="network alert">
        <Offline>You're offline right now. Check your connection.</Offline>
      </div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
