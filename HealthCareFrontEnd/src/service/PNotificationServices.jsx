import axios from 'axios';

//const API_BASE_URL = "http://localhost:8080/api/notifications";



const REST_API_BASE_URL = "http://localhost:8080";

// Modify listSchedules to accept drRegNo as a parameter
export const listNotifications = (doctorId) => {
    return axios.get(`${REST_API_BASE_URL}/api/notifications/view/${doctorId}`);
};


// Delete a notification by ID
export const deleteNotification = (notificationId) => {
    return axios.delete(`${REST_API_BASE_URL}/api/notifications/delete/${notificationId}`);
};


// Fetch notifications by doctor ID
/*export const getNotificationsByDoctorId = async (doctorId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/view/${doctorId}`);
        console.log("Fetched Notifications:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

// Delete a notification by ID
export const deleteNotification = async (notificationId) => {
    try {
        await axios.delete(`${API_BASE_URL}/delete/${notificationId}`);
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};

// Mark a notification as favorite by ID
export const markNotificationAsFavorite = async (notificationId) => {
    try {
        await axios.put(`${API_BASE_URL}/markAsFavorite/${notificationId}`);
    } catch (error) {
        console.error('Error marking notification as favorite:', error);
        throw error;
    }
};

// Mark a notification as read by ID (added for completeness)
export const markNotificationAsRead = async (notificationId) => {
    try {
        await axios.put(`${API_BASE_URL}/markAsRead/${notificationId}`);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};*/
