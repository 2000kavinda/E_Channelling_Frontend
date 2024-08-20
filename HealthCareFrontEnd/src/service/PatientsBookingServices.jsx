import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/v1/schedules/filter";

export const listSchedules = () => axios.get(REST_API_BASE_URL);