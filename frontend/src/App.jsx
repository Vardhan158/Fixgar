import React from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Services from './Pages/Services'
import Booking from './Pages/Booking'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/bookings" element={<Booking/>} />
        <Route path="/about" element={<div className='h-screen flex items-center justify-center text-3xl font-bold'>About Page</div>} />  
      </Routes>
    </div>
  )
}

export default App