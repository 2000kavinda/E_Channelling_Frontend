import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8086"; 

// Fetch all notifications
export const viewNotification = () => {
  return axios.get(`${REST_API_BASE_URL}/api/notification`);
};

// Create a new notification
export const createNotification = (notificationData) => {
  return axios.post(`${REST_API_BASE_URL}/api/notification`, notificationData);
};

// Edit (Mark as Read) an existing notification
export const editNotification = (id, notificationData) => {
  return axios.put(`${REST_API_BASE_URL}/api/notification/${id}`, notificationData);
};

// Delete a notification
export const deleteNotification = (id) => {
  return axios.delete(`${REST_API_BASE_URL}/api/notification/${id}`);
};
