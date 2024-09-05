// src/services/notificationService.js
import axios from 'axios';


//unwadted file ************
const API_BASE_URL = '/api/notifications';

export const getNotificationsByPatientId = async (patientId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/view/${patientId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const deleteNotification = async (notificationId) => {
    try {
        await axios.delete(`${API_BASE_URL}/delete/${notificationId}`);
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};

export const markNotificationAsFavorite = async (notificationId) => {
    try {
        await axios.put(`${API_BASE_URL}/markAsFavorite/${notificationId}`);
    } catch (error) {
        console.error('Error marking notification as favorite:', error);
        throw error;
    }
};

// Add more service functions as needed
