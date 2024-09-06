import axios from 'axios';

// Define the base URL for the API
const REST_API_BASE_URL = "http://localhost:8088/api/v1/patient";

// Function to get the list of all lab persons
export const AllPatientsList = () => {
    return axios.get(`${REST_API_BASE_URL}/all`);
};

export const PatientSearch = (name) => {
    return axios.get(`${REST_API_BASE_URL}/search`, {
        params: { name }
    });
};