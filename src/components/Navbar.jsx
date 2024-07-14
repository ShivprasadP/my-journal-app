import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const [userEmail, setUserEmail] = useState('')
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Retrieve the user's email from localStorage
        const email = localStorage.getItem('userEmail')
        setUserEmail(email)
    }, [])

    const handleLogout = (e) => {
        e.preventDefault()
        setShowLogoutConfirmation(true)
    }

    const confirmLogout = (e) => {
        localStorage.removeItem('userEmail')
        setShowLogoutConfirmation(false)
        navigate('/')
    }

    return (
        <div className="flex flex-row justify-between items-center p-9 bg-[#26b7ff] h-[8px] text-white">
            <div className='flex flex-row justify-center items-center gap-5'> 
                <img className='h-[60px] rounded-full' src="../assets/SoftwareHolic Logo.jpeg" alt="" />
                <h1 className='text-3xl font-bold'>SoftwareHolic Journal</h1>
            </div>
            <ul className="flex flex-row gap-10">
                {userEmail ? (
                    <>
                        <Link to="/dashboard"><li className="hover:text-[#26b7ff] font-bold hover:bg-white p-2 rounded-2xl">Dashboard</li></Link>
                        <Link to="/about"><li className="hover:text-[#26b7ff] font-bold hover:bg-white p-2 rounded-2xl">About Us</li></Link>
                        <Link to="/contact"><li className="hover:text-[#26b7ff] font-bold hover:bg-white p-2 rounded-2xl">Contact Us</li></Link>
                        <li onClick={handleLogout} className="hover:text-[#26b7ff] font-bold hover:bg-white p-2 rounded-2xl">Logout</li>
                    </>
                ) : (
                    <>
                        <Link to="/"><li className="hover:text-[#26b7ff] font-bold hover:bg-white p-2 rounded-2xl">Home</li></Link>
                        <Link to="/about"><li className="hover:text-[#26b7ff] font-bold hover:bg-white p-2 rounded-2xl">About Us</li></Link>
                        <Link to="/contact"><li className="hover:text-[#26b7ff] font-bold hover:bg-white p-2 rounded-2xl">Contact Us</li></Link>
                        <Link to="/login"><li className="hover:text-[#26b7ff] font-bold hover:bg-white p-2 rounded-2xl">Login</li></Link>
                    </>
                )}
            </ul>

            {showLogoutConfirmation && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-black p-2 rounded">Are you sure you want to logout your <b>{userEmail}</b> account?</p>
                        <div className="flex flex-row justify-center gap-8">
                        <button onClick={confirmLogout} className="p-4 bg-green-500 text-white rounded">Yes</button>
                        <button onClick={() => setShowLogoutConfirmation(false)} className="p-4 bg-red-500 text-white rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar