import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8088/api/v1/doctor/count";

// Modify listSchedules to accept drRegNo as a parameter
export const doctorCount = () => {
    return axios.get(REST_API_BASE_URL);
};
