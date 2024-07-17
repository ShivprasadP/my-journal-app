import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Card() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [journalEntry, setJournalEntry] = useState({ title: '', date: '', content: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')
  const backendURL = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    fetch(`${backendURL}/journals/journal/${id}`)
      .then(response => response.json())
      .then(data => {
        setJournalEntry({
          title: data.title,
          date: data.date,
          content: data.content
        })
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [id])

  const handleEdit = () => {
    setEditedTitle(journalEntry.title)
    setEditedContent(journalEntry.content)
    setIsEditing(true)
  }

  const handleSave = async () => {
    const updatedJournal = {
      title: editedTitle,
      content: editedContent,
      date: journalEntry.date
    }

    try {
      const response = await fetch(`${backendURL}/journals/journal/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJournal)
      })
      if (response.ok) {
        setJournalEntry(updatedJournal)
        setIsEditing(false)
      } else {
        console.error('Failed to update journal entry')
      }
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this journal entry?')
    if (confirmed) {
      try {
        const response = await fetch(`${backendURL}/journals/journal/remove/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          alert('Journal entry deleted successfully')
          navigate('/dashboard')
        } else {
          console.error('Failed to delete journal entry')
        }
      } catch (error) {
        console.error('Error deleting data:', error)
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-row my-10 gap-20 justify-center items-center'>
        <div className='bg-white p-10 rounded-lg shadow-lg w-2/3'>
          <div className='flex justify-end gap-2'>
            {isEditing ? (
              <>
                <button onClick={handleSave} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Save
                </button>
                <button onClick={handleCancel} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={handleEdit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Edit
                </button>
                <button onClick={handleDelete} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                  Delete
                </button>
              </>
            )}
          </div>
          {isEditing ? (
            <>
              <h1 className='text-2xl pb-2 font-bold'>Title:</h1>
              <input
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className='w-full text-2xl border-b-2 pb-2 mb-4'
              />
              <h1 className="text-2xl font-bold pb-2">Content:</h1>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className='w-full h-48 border-b-2 pb-2 mb-4'
              />
            </>
          ) : (
            <>
              <h1 className='text-2xl pb-2'><b>Title:</b> {journalEntry.title}</h1>
              <p className='text-gray-500 pb-4'>
                {new Date(journalEntry.date).toLocaleDateString('en-GB')}
              </p>
              <h1 className="text-2xl font-bold pb-2">Content:</h1>
              <p className='text-gray-800 indent-8 text-justify'>{journalEntry.content}</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
