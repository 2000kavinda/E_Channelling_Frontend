import axios from 'axios';

// Define the base URL for the API
const REST_API_BASE_URL = "http://localhost:8088/api/v1/labperson";

// Function to get the list of all lab persons
export const AllLabPersonList = () => {
    return axios.get(`${REST_API_BASE_URL}/all`);
};

export const LabPersonSearch = (name) => {
    return axios.get(`${REST_API_BASE_URL}/search`, {
        params: { name }
    });
};