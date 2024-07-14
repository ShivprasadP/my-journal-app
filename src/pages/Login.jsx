import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { MD5 } from 'crypto-js'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendURL = process.env.REACT_APP_BACKEND_URL

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (email === '' || password === '') {
      alert('Please enter Email ID and Password!!')
      return
    }

    const hashedPassword = MD5(password).toString()

    try {
      const response = await fetch(`${backendURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: hashedPassword,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        alert(data.message || 'No user found!!')
        return
      }

      const data = await response.json()
      alert(`Welcome, ${data.fullname}`)
      localStorage.setItem('userEmail', email)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center my-10'>
        <div className='grid grid-cols-1 gap-4 w-[800px] border-2 border-blue-500 p-6 rounded-3xl'>
          <div className="grid grid-cols-1 justify-items-center">
            <h1 className='text-4xl font-bold text-blue-500'>User Login</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '1rem' }} className="items-center">
              <label htmlFor="email" className='font-bold border-b-4 border-orange-200 py-1'>
                Email ID:
              </label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email ID...' className='form-input p-2 border border-black rounded-lg h-8' />

              <label htmlFor='password' className='font-bold border-b-4 border-orange-200 py-1'>Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password...' className='form-input p-2 border border-black rounded-lg h-8' />
            </div>
            <div className="grid grid-cols-1 justify-items-end">
              <a href="/forgot-password" className='text-blue-500 hover:text-blue-700'>Forgot Password?</a>
              <p>Don't have an Account? <a href="/register" className='text-blue-500 hover:text-blue-700'>Sign Up!</a></p>
            </div>

            <div className="grid grid-cols-1 justify-items-center">
              <button className="bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
