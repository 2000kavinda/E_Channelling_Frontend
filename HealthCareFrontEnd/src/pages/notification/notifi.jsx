import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { createNotification } from '../../service/notificationService'; 
import NavBar from '../../components/header/NavBar';

function Notifi() {
  const [empNic, setEmpNic] = useState('');
  const [patientCode, setPatientCode] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to create a new notification
  const handleCreateNotification = async () => {
    if (empNic.trim() && patientCode.trim() && message.trim()) {
      const timeStamp = new Date().toISOString(); // Generate the current timestamp
      const notificationData = {
        nId: uuidv4(), // Generate a unique ID
        empNic,
        patientCode,
        timeStamp,
        message,  // Use `message` instead of `msg`
        isRead: false,
      };

      setLoading(true);
      try {
        await createNotification(notificationData); // Use the createNotification function
        setSuccessMessage('Notification created successfully!');
        setEmpNic('');
        setPatientCode('');
        setMessage('');
        setErrorMessage('');

        // Redirect after a short delay to the notification list page
        setTimeout(() => navigate('/notificationList'), 100); // Ensure the correct path
      } catch (error) {
        setErrorMessage('Failed to create notification. Please try again.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('All fields are required.');
    }
  };

  return (
    <div className='flex flex-col w-screen h-full'>
  
  <NavBar/>
    <div style={{ padding: '40px 20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        MANAGE NOTIFICATION
      </h2>

      <h3 style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        Create Notification
      </h3>

      <div style={{
        border: '2px solid #ADD8E6',
        borderRadius: '8px',
        padding: '30px',
        backgroundColor: '#f0f0f0',
        width: '60%',
        margin: '0 auto 20px',
      }}>
        <input
          type="text"
          value={empNic}
          onChange={(e) => setEmpNic(e.target.value)}
          placeholder="Enter Employee NIC"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <input
          type="text"
          value={patientCode}
          onChange={(e) => setPatientCode(e.target.value)}
          placeholder="Enter Patient Code"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Notification Message"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleCreateNotification} style={{
          backgroundColor: '#007BFF',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          marginRight: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
        <button onClick={() => {
          setEmpNic('');
          setPatientCode('');
          setMessage('');
          setErrorMessage('');
        }} style={{
          backgroundColor: '#DC3545',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
          Clear
        </button>
      </div>

      {successMessage && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          {errorMessage}
        </p>
      )}
    </div>
    </div>
  );
}

export default Notifi;
