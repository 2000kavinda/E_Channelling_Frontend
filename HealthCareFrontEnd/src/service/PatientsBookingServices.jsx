import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/v1/booking/filterByDate";

// Modify listSchedules to accept drRegNo as a parameter
export const listPatients = (drRegNo,date) => {
    return axios.get(REST_API_BASE_URL, {
        params: { drRegNo,date }
    });
};