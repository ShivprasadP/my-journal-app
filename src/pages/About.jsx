import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function About() {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/contact')
    }

  return (
    <>
        <Navbar />

        <div className='flex flex-row mb-6'>
          <div className='flex flex-col w-3/6 place-items-center justify-center items-center'>
            <img src='/src/assets/about.jpg' alt='Profile Image' className='rounded-lg h-[55%] w-[80%]' />
          </div>
          <div className='flex flex-col w-3/6 place-items-center  '>
            <h1 className='text-5xl font-medium m-5'>So, who am I?</h1>
            <p className='text-lg text-justify indent-8 p-5'>Welcome to SoftwareHolic Journal! I'm Shivprasad Patil, a passionate writer with a love for sharing stories, ideas, and insights on different topics of web development and android development. With a background in Computer Science, I aim to bring fresh perspectives and thoughtful content to my readers. Whether I'm exploring the latest trends, offering practical tips, or delving into personal experiences, my goal is to create a space where curiosity and inspiration thrive. Join me on this journey as we navigate the fascinating world of web development and android development together. Thank you for being a part of this community!</p>
            <button 
                className='btn bg-[#26b7ff] text-white w-32 min-h-12 border-2 rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
                onClick={handleClick}
            >
                Contact Me
            </button>
          </div>
        </div>

        <Footer />
    </>
  )
}

export default About