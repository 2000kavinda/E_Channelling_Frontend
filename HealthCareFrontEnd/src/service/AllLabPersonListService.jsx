import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/v1/labperson/all";

export const AllLabPersonList = () => {
    return axios.get(REST_API_BASE_URL);
};
