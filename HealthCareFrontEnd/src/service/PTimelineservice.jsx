import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8090";

// Fetch timelines by patient ID
export const listTimelines = (patient_id) => {
    return axios.get(`${REST_API_BASE_URL}/api/timelines/${patient_id}`);
};
