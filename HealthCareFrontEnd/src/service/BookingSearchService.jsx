import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/v1/booking/search";

export const patientsSearchList = (pNamePart) => {
    return axios.get(REST_API_BASE_URL, {
        params: { pNamePart }
    });
};
