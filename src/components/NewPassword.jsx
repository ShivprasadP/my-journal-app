import React from 'react';
import { useState } from 'react';

const NewPassword = ({ isOpen, onClose, onSubmit, email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/(?=.*[A-Z])(?=.*[_!@#$%^&*])(?=.*[0-9]).{8,12}$/.test(password)) {
      alert('Password must contain at least one uppercase letter, one special symbol, one number, and be 8-12 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit(password);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Reset Password for {email}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input p-2 border border-black rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="form-input p-2 border border-black rounded-lg w-full"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
