import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'

function Contact() {

  const form = useRef()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!fullName || !email || !phoneNumber || !message) {
      alert('Please fill in all fields.')
      return false
    }
    if (!/^[A-Za-z\s]+$/.test(fullName)) {
      alert('Full Name must contain only alphabets.')
      return false
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert('Please enter a valid email address.')
      return false
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert('Phone Number must be 10 digits.')
      return false
    }
    return true
  }

  const sendEmail = (e) => {
    e.preventDefault()

    if (!handleSubmit()) {
      return
    }

    emailjs
      .sendForm('service_dssfqli', 'template_9es2f45', form.current, 's7PfGYSS5a0MylA4r')
      .then(
        () => {
          alert('Message sent successfully!')
        },
        (error) => {
          alert('Something went wrong! Try after sometime.')
        },
      )
  }

  return (
    <>
        <Navbar />

        <div className='flex justify-center items-center my-10'>
          <div className='grid grid-cols-1 gap-4 w-[800px] border-2 border-blue-500 p-6 rounded-3xl'>
            <div className="grid grid-cols-1 justify-items-center">
              <h1 className='text-4xl font-bold text-blue-500'>Contact Us</h1>
            </div>
            
            <form ref={form} onSubmit={sendEmail}>
              <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '1rem' }} className="items-center">
                <label htmlFor="fname" className='border-b-4 border-orange-200 py-1'>
                    Full Name:
                </label>
                <input type="text" name="user_name" id="fname" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Enter your full name...' className='form-input p-2 border border-black rounded-lg h-8' />
              
                <label htmlFor="email" className='border-b-4 border-orange-200 py-1'>
                    Email ID:
                </label>
                <input type="email" name="user_email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email ID...' className='form-input p-2 border border-black rounded-lg h-8' />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '1rem' }} className="items-center">
                <label htmlFor="phno" className='border-b-4 border-orange-200 py-1'>
                    Phone Number:
                </label>
                <input type="tel" name="user_phone" id="phno" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Enter your Phone Number...' className='form-input p-2 border border-black rounded-lg h-8' />
              
                <label htmlFor="msg" className='border-b-4 border-orange-200 py-1'>
                    Message:
                </label>
                <textarea name="message" id="msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter your Message...' className='textarea p-2 border border-black rounded-lg h-24' />
              </div>

              <div className="grid grid-cols-1 justify-items-center">
                <button className="bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        <Footer />
    </>
  )
}

export default Contact