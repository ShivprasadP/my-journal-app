import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Dropdown from '../components/Dropdown';
import NewPassword from '../components/NewPassword';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [backupQuestion, setBackupQuestion] = useState('');
  const [backupQuestionAns, setBackupQuestionAns] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleQuestionSelect = (question) => {
    setBackupQuestion(question);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !backupQuestion || !backupQuestionAns) {
      alert("All fields are required");
    } else {
      try {
        const response = await fetch(`${backendURL}/users/verify-recovery`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            backupQuestion: backupQuestion,
            backupQuestionAns: backupQuestionAns,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setVerifiedEmail(email);
          setIsModalOpen(true);
        } else {
          alert(data.message || "Verification failed. Please check your inputs.");
        }
      } catch (error) {
        console.error("Error during verification:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handlePasswordReset = async (password) => {
    try {
      const response = await fetch(`${backendURL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: verifiedEmail,
          newPassword: password, // Send plain text password
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password reset successful");
        setIsModalOpen(false);
        navigate('/login');
      } else {
        alert(data.message || "Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center my-10'>
        <div className='grid grid-cols-1 gap-4 w-[800px] border-2 border-blue-500 p-6 rounded-3xl'>
          <div className="grid grid-cols-1 justify-items-center">
            <h1 className='text-4xl font-bold text-blue-500'>Password Recovery</h1>
          </div>
          <form ref={form} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2">
              <label htmlFor="email" className='font-bold border-b-4 border-orange-200 py-1'>Email ID: <span style={{ color: 'red' }}>*</span></label>
              <input type="email" name="user_email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email ID...' className='form-input p-2 border border-black rounded-lg h-8' />
            </div>
            <div className="grid grid-cols-3 mt-5 gap-3">
              <label htmlFor='backupQuestion' className='font-bold border-b-4 border-orange-200 py-1'>Backup Question & Answer: <span style={{ color: 'red' }}>*</span></label>
              <Dropdown onItemSelected={handleQuestionSelect}/>
              <input type="text" name="user_backupQuestionAns" id="backupQuestionAns" className='form-input p-2 border border-black rounded-lg h-8' value={backupQuestionAns} onChange={(e) => setBackupQuestionAns(e.target.value)} placeholder='Enter your answer...' />
            </div>
            <div className="grid grid-cols-1 justify-items-center">
              <button className="bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
      <NewPassword 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordReset}
        email={verifiedEmail}
      />
    </>
  );
};

export default ForgotPassword;
