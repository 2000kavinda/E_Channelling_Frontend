import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {

  const location = useLocation();

  const [newPassword, setNewPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('')

  const {email} = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
        if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'verificationCode') {
            setVerificationCode(value);
        }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const response = axios.put(`http://localhost:8082/api/v1/auth/updatepw`, null , {
        params: {
        email: email,
        code: verificationCode,
        newPassword: newPassword,
    },} );
      console.log("API response:", response.data);
      alert("Password has been updated successfully!");
  } catch (error) {
      console.error("There was an error making the request:", error);
      alert("There was an error making the request:", error);
  }
  }

  return (
    <div className="flex flex-col">
        <div>Forgot Password</div>
        
        {/* <div>Email: {email}</div> */}
        <div>Enter your New Password</div>
          <input type="text"
              placeholder="New Password..."
              className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
          />

          <div>Enter your Code</div>
          <input type="text"
              placeholder="Verification Code..."
              className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
              name="verificationCode"
              value={verificationCode}
              onChange={handleChange}
          />

          <button className="px-2 py-2 bg-green-500" onClick={handleSubmit}>Submit</button>


      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-row w-4/6 h-5/6 bg-slate-200 rounded-2xl">

          <div className='flex flex-col items-center justify-center w-full h-full gap-4 px-10 py-10'>
            <div className='text-5xl font-bold text-[#1b5a6f]'>Forgot Password</div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1 pt-10'>
                <div className='text-normal font-base text-[#707171] pl-2'>Your verification Code</div>
                <input
                  type="text"
                  placeholder="Enter the verification code..."
                  className="px-4 py-2 bg-[#f1f1f1] text-normal w-[400px] h-[50px] rounded-full focus:outline-none focus:ring-1 focus:ring-[#b8baba] border-[#b8baba] border-2 text-[#297d99]"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={handleChange}
                />
              </div>

              <div className='flex flex-col gap-1 pt-10'>
                <div className='text-normal font-base text-[#707171] pl-2'>New Password</div>
                <input
                  type="text"
                  placeholder="Enter new password code..."
                  className="px-4 py-2 bg-[#f1f1f1] text-normal w-[400px] h-[50px] rounded-full focus:outline-none focus:ring-1 focus:ring-[#b8baba] border-[#b8baba] border-2 text-[#297d99]"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className='flex flex-row w-[400px] h-[45px] bg-[#1b5a6f] rounded-full mt-2 justify-center items-center text-white text-lg font-semibold'
              onClick={handleSubmit}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword