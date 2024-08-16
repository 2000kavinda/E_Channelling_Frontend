import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/v1/schedules/filter";

// Modify listSchedules to accept drRegNo as a parameter
export const listSchedules = (drRegNo) => {
    return axios.get(REST_API_BASE_URL, {
        params: { drRegNo }
    });
};
