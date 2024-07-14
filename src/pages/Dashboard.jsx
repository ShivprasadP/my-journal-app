import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [journalEntries, setJournalEntries] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')
  const backendURL = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    if (!userEmail) {
      navigate('/login')
    } else {
      setEmail(userEmail)
    }

    const fetchJournalEntries = async () => {
      const email = localStorage.getItem('userEmail')
      if (!email) {
        return
      }
    
      try {
        const response = await fetch(`${backendURL}/journals/journal?email=${encodeURIComponent(email)}`)
    
        const data = await response.json()
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setJournalEntries(sortedData)
      } catch (err) {
        console.error(err.message)
      }
    }
    
    fetchJournalEntries()
  }, [navigate])

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newOrder)
    setJournalEntries(journalEntries.slice().sort((a, b) => {
      const dateA = new Date(a.date), dateB = new Date(b.date)
      return (newOrder === 'asc' ? dateA - dateB : dateB - dateA)
    }))
  }

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const handleJournalClick = (id) => {
    navigate(`/card/${id}`)
  }

  return (
    <>

      <Navbar />

      <div className='flex flex-row my-10 gap-20 justify-center items-center'>
        <div className='grid grid-cols-1 gap-4 w-[320px] border-2 border-blue-500 p-3 rounded-3xl mx-3'>
          <div className="grid grid-cols-2 justify-items-center">
            <h1 className='text-2xl font-bold text-black'>Date: </h1>
            <p className="text-xl font-bold text-black">{today}</p>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 w-[800px] border-2 border-black bg-blue-500 p-6 rounded-3xl'>
          <div className="grid grid-cols-1 justify-items-center">
            <h1 className='text-4xl font-bold text-white'>My Journals</h1>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 w-[300px] border-2 border-blue-500 p-3 rounded-3xl mx-3'>
          <div className="grid grid-cols-1 justify-items-center">
            <button className='text-2xl font-bold text-blue-500' onClick={() => navigate('/new-journal')}>Add Journal</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center p-6 border-4 border-blue-500 rounded-3xl mx-16 mb-8">
        <div className="flex justify-end w-full">
          
          <button onClick={toggleSortOrder} className="text-2xl font-bold text-blue-500 p-3 border-2 border-blue-500 rounded-full">
            Sort {sortOrder === 'asc' ? '↓' : '↑'}
          </button>
        </div>
        <hr className='border-2 border-blue-500' style={{ width: '100%' }} />

        {journalEntries.length > 0 ? (
          journalEntries.map((entry, index) => (
            <div key={index} className="w-full border-2 border-orange-200 p-4 rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:border-indigo-500 duration-300" onClick={() => handleJournalClick(entry._id)}>
              <div className="flex flex-row justify-between">
                <p className="text-xl"><b>Title:</b> {entry.title}</p>
                <p className='text-xl'>Date: {new Date(entry.date).toLocaleDateString('en-GB')}</p>
              </div>
              <p className='text-xl'>
                <b>Content:</b> {entry.content.length > 60 ? <span>{entry.content.substring(0, 60)}... <span style={{color: 'blue'}}>Read More</span></span> : entry.content}
              </p>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-xl">No record found</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Dashboard