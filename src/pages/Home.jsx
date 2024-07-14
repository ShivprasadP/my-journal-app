import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Footer from '../components/Footer'

function Home() {

  return (
    <>
      <Navbar />

      <div className='flex justify-center items-center my-10'>
        <Slider />
      </div>
      
      <Footer />
    </>
  )
}

export default Home