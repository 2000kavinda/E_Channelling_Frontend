import axios from 'axios';

const API_URL = 'http://localhost:8090/api/doctor-details/17';

export const getDoctorDetails = () => {
    return axios.get(API_URL)
        .then(response => response.data.body)
        .catch(error => {
            console.error("There was an error fetching the doctor details!", error);
            throw error;
        });
};