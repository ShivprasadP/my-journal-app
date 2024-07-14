import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Dropdown from '../components/Dropdown';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const form = useRef();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [backupQuestionAns, setBackupQuestionAns] = useState('');
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullname || !email || !password || !confirmPassword || !selectedQuestion || selectedQuestion === 'Select Question' || !backupQuestionAns) {
      alert('All * marked fields are required!!');
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(fullname)) {
      alert('Full Name must contain only alphabets.');
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (!/(?=.*[A-Z])(?=.*[_!@#$%^&*])(?=.*[0-9]).{8,12}$/.test(password)) {
      alert('Password must contain at least one uppercase letter, one special symbol, one number, and be 8-12 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match!!');
      return false;
    }

    try {
      const userData = {
        fullname: fullname,
        email: email,
        password: password, // Send plaintext password
        backupQuestion: selectedQuestion,
        backupQuestionAns: backupQuestionAns
      }

      const response = await fetch(`${backendURL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert('User registered successfully!!');
        form.current.reset();
        navigate('/login');
      } else {
        const data = await response.json();
        alert(data.message || 'User registration failed!! Check if your email is already registered or try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center my-10'>
        <div className='grid grid-cols-1 gap-4 w-[800px] border-2 border-blue-500 p-6 rounded-3xl'>
          <div className="grid grid-cols-1 justify-items-center">
            <h1 className='text-4xl font-bold text-blue-500'>User Registration</h1>
          </div>
          
          <form ref={form} onSubmit={handleSubmit}>
            {/* Form fields */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
