import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8082/api/v1/auth/register";

export const DoctorsAdd = (data) => {
    return axios.post(REST_API_BASE_URL, data);
};
