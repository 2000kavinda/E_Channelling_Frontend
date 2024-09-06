import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { viewNotification, deleteNotification, editNotification } from '../../service/NotificationServiceAll'; 

import NavBar from '../../components/header/NavBar'; 

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [currentNotification, setCurrentNotification] = useState(null); // State for the notification being edited
  const [updatedMessage, setUpdatedMessage] = useState(''); // State for the updated message
  const navigate = useNavigate();

  // Fetch all notifications when component mounts
  useEffect(() => {
    viewNotification()
      .then(response => {
        console.log("Fetched Notifications:", response.data); // Log the data for debugging
        const data = response.data;

        // Ensure the data is an array
        const notificationsArray = Array.isArray(data) ? data : [data];
        setNotifications(notificationsArray);
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  // Function to delete a notification
  const handleDeleteNotification = async (nid) => {
    try {
      const response = await deleteNotification(nid);

      if (response.status === 200 || response.status === 204) {
        // Remove the deleted notification from the list in the frontend
        setNotifications(notifications.filter(notification => notification.nid !== nid));
      } else {
        console.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Function to open the edit modal
  const handleEditNotification = (notification) => {
    setCurrentNotification(notification);
    setUpdatedMessage(notification.msg); // Set current message to be edited
    setIsModalOpen(true);
  };

  // Function to handle message update
  const handleUpdateNotification = async () => {
    if (currentNotification) {
      try {
        // Call the backend to update the notification
        const response = await editNotification(currentNotification.nid, { ...currentNotification, msg: updatedMessage });

        if (response.status === 200) {
          // Update the notifications state with the new message
          setNotifications(notifications.map(notification => 
            notification.nid === currentNotification.nid ? { ...notification, msg: updatedMessage } : notification
          ));
          setIsModalOpen(false); // Close the modal
        } else {
          console.error('Failed to update notification');
        }
      } catch (error) {
        console.error('Error updating notification:', error);
      }
    }
  };

  // Function to close the modal
  const handleCancel = () => {
    setIsModalOpen(false); // Just close the modal without any changes
  };

  // Helper function to get the first 7 words of a message
  const getFirstWords = (msg, wordLimit = 7) => {
    const words = msg.split(' ').slice(0, wordLimit).join(' ');
    return msg.split(' ').length > wordLimit ? words + '...' : words;
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
        Notification List
      </h3>

      <div>
        {notifications.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No notifications available</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.nid} style={{
              border: '2px solid #005F7E',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              position: 'relative',
              backgroundColor: '#f0f0f0'
            }}>
              <p style={{
                fontSize: '16px',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '80%'
              }}>
                {notification.msg ? (
                  getFirstWords(notification.msg)
                ) : (
                  'No message available'
                )}
              </p>
              <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <button onClick={() => handleEditNotification(notification)} style={{
                  backgroundColor: '#005F7E',
                  color: 'white',
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '4px',
                  marginRight: '10px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteNotification(notification.nid)} style={{
                  backgroundColor: '#DC3545',
                  color: 'white',
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for editing the notification */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '3px solid #005F7E', 
          borderRadius: '8px',
          padding: '20px',
          zIndex: 1000,
          width: '40%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>Edit Notification Message</h3>
          <textarea
            rows={4}
            value={updatedMessage}
            onChange={(e) => setUpdatedMessage(e.target.value)} // Update the message as user types
            style={{ width: '100%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', padding: '10px' }}
          />
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleUpdateNotification} style={{
              backgroundColor: '#005F7E', 
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              marginRight: '10px',
              cursor: 'pointer',
            }}>
              Update
            </button>
            <button onClick={handleCancel} style={{
              backgroundColor: '#DC3545', 
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Overlay to make the background darker when modal is open */}
      {isModalOpen && <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999
      }} onClick={handleCancel}></div>}
    </div>
    </div>
  );
}

export default NotificationList;
