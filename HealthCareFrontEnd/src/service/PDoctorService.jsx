// src/service/PDoctorService.jsx
import axios from 'axios';

// Base URL of your backend API
const API_URL = 'http://localhost:8080/api/doctors'; // Adjust if necessary

export const PDoctorService = {
    searchDoctors: async (name, specialty, type) => {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                params: { name, specialty, type }
            });
            return response.data;
        } catch (error) {
            console.error("Error searching doctors:", error);
            throw error;
        }
    },
    getAllDoctors: async () => {
        try {
            const response = await axios.get(`${API_URL}/getAll`);
            return response.data;
        } catch (error) {
            console.error("Error fetching doctors:", error);
            throw error;
        }
    }
};
