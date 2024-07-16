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
            <div className="grid grid-cols-2 gap-6">
              <div className="grid grid-cols-2">
                <label htmlFor="fullname" className='font-bold border-b-4 border-orange-200 py-1'>Full Name: <span style={{ color: 'red' }}>*</span></label>
                <input type="text" name="user_fullname" id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder='Enter your Full Name...' className='form-input p-2 border border-black rounded-lg h-8' />
              </div>
              <div className="grid grid-cols-2">
                <label htmlFor="email" className='font-bold border-b-4 border-orange-200 py-1'>Email ID: <span style={{ color: 'red' }}>*</span></label>
                <input type="email" name="user_email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email ID...' className='form-input p-2 border border-black rounded-lg h-8' />
              </div>
              <div className="grid grid-cols-2">
                <label htmlFor='password' className='font-bold border-b-4 border-orange-200 py-1'>Password: <span style={{ color: 'red' }}>*</span></label>
                <input type="password" name="user_password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password...' className='form-input p-2 border border-black rounded-lg h-8' />
              </div>
              <div className="grid grid-cols-2">
                <label htmlFor='confirmPassword' className='font-bold border-b-4 border-orange-200 py-1'>Confirm Password: <span style={{ color: 'red' }}>*</span></label>
                <input type="password" name="user_confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter your Confirm Password...' className='form-input p-2 border border-black rounded-lg h-8' />
              </div>
            </div>
            <div className="grid grid-cols-3 mt-5 gap-3">
              <label htmlFor='backupQuestion' className='font-bold border-b-4 border-orange-200 py-1'>Backup Question & Answer: <span style={{ color: 'red' }}>*</span></label>
              <Dropdown onItemSelected={handleQuestionSelect}/>
              <input type="text" name="user_backupQuestionAns" id="backupQuestionAns" className='form-input p-2 border border-black rounded-lg h-8' value={backupQuestionAns} onChange={(e) => setBackupQuestionAns(e.target.value)} placeholder='Enter your answer...' />
            </div>
            <div className="grid grid-cols-1 justify-items-end mt-6">
              <p>Already have an Account? <a href="/login" className='text-blue-500 hover:text-blue-700'>Sign In!</a></p>
            </div>

            <div className="grid grid-cols-1 justify-items-center">
              <button className="bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
