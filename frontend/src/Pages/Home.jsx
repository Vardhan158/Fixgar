import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Works from '../Components/Works'
import PopularServices from '../Components/Popular'
import WhyChooseUs from '../Components/Whychoose'
import Testimonials from '../Components/Testimonials'
import CTA from '../Components/CTA'
import Stats from '../Components/StatCard'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Works/>
        <PopularServices/>
        <WhyChooseUs/>
        <Testimonials/>
        <CTA/>
        <Stats/>
        <Footer/>
    </div>
  )
}

export default Home