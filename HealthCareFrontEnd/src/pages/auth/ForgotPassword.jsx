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
      const response = axios.put(`http://localhost:8081/api/v1/auth/updatepw`, null , {
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
    </div>
  )
}

export default ForgotPassword