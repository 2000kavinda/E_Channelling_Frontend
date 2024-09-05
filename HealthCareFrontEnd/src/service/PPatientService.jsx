import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/patients';
const TIMELINE_API_BASE_URL = 'http://localhost:8080/api/timeline';

const PatientService = {
  // Fetch all patients (if needed)
  getAllPatients: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching all patients:', error);
      throw error;
    }
  },

  // Fetch a specific patient by ID
  getPatientById: async (patient_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${patient_id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching patient with ID ${patient_id}:`, error);
      throw error;
    }
  },

  // Add a new patient (if needed)
  addPatient: async (patientData) => {
    try {
      const response = await axios.post(API_BASE_URL, patientData);
      return response.data;
    } catch (error) {
      console.error('Error adding new patient:', error);
      throw error;
    }
  },

  // Update an existing patient (if needed)
  updatePatient: async (patient_id, patientData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${patient_id}`, patientData);
      return response.data;
    } catch (error) {
      console.error(`Error updating patient with ID ${patient_id}:`, error);
      throw error;
    }
  },
}

export default PatientService;
