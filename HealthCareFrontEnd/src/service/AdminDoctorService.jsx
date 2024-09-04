import axios from 'axios';

// Define the base URL for the API
const REST_API_BASE_URL = "http://localhost:8080/api/v1/doctor";

// Function to get the list of all lab persons
export const AllDoctorsList = () => {
    return axios.get(`${REST_API_BASE_URL}/all`);
};

export const DoctorsSearch = (name) => {
    return axios.get(`${REST_API_BASE_URL}/search`, {
        params: { name }
    });
};
