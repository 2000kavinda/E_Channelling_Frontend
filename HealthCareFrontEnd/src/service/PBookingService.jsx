import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8090";

// Fetch all appointments
export const fetchAllAppointments = () => {
    return axios.get(`${REST_API_BASE_URL}/api/appointments/all`);
};

// Delete a specific appointment by ID
export const deleteAppointment = (appointmentId) => {
    return axios.delete(`${REST_API_BASE_URL}/api/appointments/${appointmentId}`);
};
