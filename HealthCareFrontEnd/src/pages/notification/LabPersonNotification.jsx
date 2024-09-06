import React, { useState, useEffect } from 'react';
import { viewNotification, editNotification as markNotificationAsReadService } from '../../service/NotificationServiceAll'; // Import services
import NavBar from '../../components/header/NavBar'; 

function LabPersonNotification() {
  const [notifications, setNotifications] = useState([]);
  const [displayedNotifications, setDisplayedNotifications] = useState(10); // Initial number of notifications to display
  const [selectedNotification, setSelectedNotification] = useState(null); // For holding the selected notification for modal view
  const [isModalOpen, setIsModalOpen] = useState(false); // To track modal visibility
  const patientCodePrefix = "LAB"; // The patient code prefix to filter notifications by

  useEffect(() => {
    // Fetch all notifications from the backend using notification service
    viewNotification()
      .then(response => {
        // Filter notifications by patientCode starting with 'LAB' or 'lab'
        const filteredNotifications = response.data.filter(notification => 
          notification.patientCode.toUpperCase().startsWith(patientCodePrefix)
        );
        setNotifications(filteredNotifications);
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }, [patientCodePrefix]); // Dependency on patientCodePrefix so it refetches if it changes

  // Function to mark a notification as read
  const markAsRead = async (id) => {
    try {
      // Find the notification to mark as read
      const notificationToUpdate = notifications.find(notification => notification.nid === id);
      if (notificationToUpdate && !notificationToUpdate.read) {
        const updatedNotification = { ...notificationToUpdate, read: true }; // Update the 'read' field to true
        
        // Send a PUT request to the backend to update the notification's read status
        const response = await markNotificationAsReadService(id, updatedNotification);
        
        if (response.status === 200) {
          // Update the frontend to reflect the read status
          setNotifications(notifications.map(notification =>
            notification.nid === id ? { ...notification, read: true } : notification
          ));
        } else {
          console.error('Failed to mark notification as read');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to delete a notification only on the frontend
  const deleteNotification = (id) => {
    // Remove the notification from the frontend by filtering it out from the state
    setNotifications(notifications.filter(notification => notification.nid !== id));
  };

  // Function to load more notifications
  const loadMore = () => {
    setDisplayedNotifications(displayedNotifications + 10);
  };

  // Function to handle opening the modal
  const openModal = async (notification) => {
    await markAsRead(notification.nid); // Mark as read when opening the modal
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  // Function to truncate the message to 7 words
  const truncateMessage = (msg) => {
    const words = msg.split(' ');
    return words.length > 7 ? words.slice(0, 7).join(' ') + '...' : msg;
  };

  
    return (
        <div className='flex flex-col w-screen h-full'>
      
      <NavBar/>
    <div style={{ padding: '40px 20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        NOTIFICATION
      </h2>
      <div style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <h3 style={{ margin: 0, marginRight: '10px', fontSize: '20px' }}>Lab Notification</h3>
        <span style={{ marginLeft: 'auto', fontSize: '16px' }}>🔔 {notifications.length}</span>
      </div>

      {notifications.slice(0, displayedNotifications).map(notification => (
        <div 
          key={notification.nid} 
          style={{
            border: '2px solid #005F7E',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: notification.read ? '#FFFFFF' : '#f0f0f0', // White background if read
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={() => openModal(notification)} // Open the modal when the card is clicked
        >
          <p style={{
            fontSize: '16px',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '80%',
          }}>
            {truncateMessage(notification.msg)} {/* Show only the first 7 words */}
          </p>
          <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <button onClick={(e) => { e.stopPropagation(); markAsRead(notification.nid); }} style={{
              backgroundColor: '#005F7E',
              color: 'white',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '4px',
              marginRight: '10px',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              Mark as Read
            </button>
            <button onClick={(e) => { e.stopPropagation(); deleteNotification(notification.nid); }} style={{
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
          <p style={{
            marginTop: '10px',
            fontSize: '12px',
            color: '#888',
          }}>
            {new Date(notification.timeStamp).toLocaleString()} {/* Date and time inside the card */}
          </p>
        </div>
      ))}

      {notifications.length > displayedNotifications && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={loadMore} style={{
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}>
            See More
          </button>
        </div>
      )}

      {/* Modal for viewing full notification */}
      {isModalOpen && selectedNotification && (
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
          <h3>Notification Message</h3>
          <p>{selectedNotification.msg}</p>
          <div style={{ textAlign: 'right' }}>
            <button onClick={closeModal} style={{
              backgroundColor: '#DC3545', 
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              Close
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
      }} onClick={closeModal}></div>}
    </div>
    </div>
  );
}

export default LabPersonNotification;
