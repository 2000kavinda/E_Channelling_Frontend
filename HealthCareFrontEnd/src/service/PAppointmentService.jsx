// src/service/PAppointmentService.jsx

import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8090";

// Book a new appointment
export const bookAppointment = (appointmentData) => {
    return axios.post(`${REST_API_BASE_URL}/api/appointments/book`, appointmentData);
};


// Get Doctor ID by Doctor ID
export const getDoctorIdById = (doctorId) => {
    return axios.get(`${REST_API_BASE_URL}/api/schedules/info/${doctorId}`);
};