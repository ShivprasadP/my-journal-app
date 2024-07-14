import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'

function NewJournal() {
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const backendURL = process.env.REACT_APP_BACKEND_URL

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title === '' || content === '') {
      alert('All fields are required!!')
      return false
    }
    try {
      saveJournal(event)
    }
    catch (error) {
      console.error("An error occurred: ", error)
    }
  }

  const saveJournal = async (e) => {
    e.preventDefault()
    const email = localStorage.getItem('userEmail')
    const journalData = {
      title: title,
      content: content,
      date: formattedDate,
      email: email
    }
    
    try {
      const response = await fetch(`${backendURL}/journals/journal/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(journalData)
      })
      if (response.ok) {
        alert('Journal Saved Successfully!!')
        setTitle('')
        setContent('')
      } else {
        const errorData = await response.json();
        console.error("An error occurred: ", errorData.message)
      }
    } catch (error) {
      console.error("An error occurred: ", error)
    }
  }

  return (
    <>
      <Navbar />

      <div className='flex flex-row my-10 gap-20 justify-center items-center'>
        <div className='grid grid-cols-1 gap-4 w-[400px] border-2 border-black bg-blue-500 p-3 rounded-3xl'>
          <div className="grid grid-cols-1 justify-items-center">
            <h1 className='text-2xl font-bold text-white'>New Journal</h1>
          </div>
        </div>
      </div>

      <div className="p-6 border-4 border-blue-500 rounded-3xl mx-16 mt-6 mb-8">
        <p className='text-xl text-right'><b>Date:</b> {formattedDate}</p>
        <div className='grid gap-5'>
          <label htmlFor="title" className="text-xl font-bold mr-4">Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter your Journal Title..." className="w-full form-input p-2 border border-black rounded-lg" />
        </div>
        <div className='grid gap-5 mt-4'>
          <label htmlFor="content" className="text-xl font-bold mr-4">Content:</label>
          <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter your Journal Content..." className="w-full h-[150px] form-textarea p-2 border border-black rounded-lg"></textarea>
        </div>
        <div className='grid gap-5 mt-4 justify-items-center'>
          <button className="bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default NewJournal
