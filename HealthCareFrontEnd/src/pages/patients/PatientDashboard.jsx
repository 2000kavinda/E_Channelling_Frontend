import axios from 'axios';
import NavBar from '../../components/header/NavBar';
import pdashboard from '../../assets/Images/pdashboard.png';
const REST_API_BASE_URL = "http://localhost:8080";

// Fetch timelines by patient ID
export const listTimelines = (patient_id) => {
    return axios.get(`${REST_API_BASE_URL}/api/timeline/search`, {
        params: { patientId: patient_id },
    });
};

import React, { useState, useEffect } from "react";
import PatientService from "../../service/PPatientService";


function MedicalDashboard() {
  const [profile, setProfile] = useState({});
  const [medicalHistory, setMedicalHistory] = useState({
    chronicDisease: "IHD, Obesity, Chronic thyroid",
    surgery: "Liposuction",
    diabetesEmergencies: "Diabetics ketoacidosis",
    familyDisease: "Obesity",
  });

  const [medications, setMedications] = useState([
    { name: "Astrapid15", adherence: "Adherent", type: "p", atc: "10.4" },
    { name: "Penadol", adherence: "Somewhat", type: "p", atc: "10.4" },
    { name: "xyz", adherence: "Not", type: "p", atc: "10.4" },
  ]);
  const [diet, setDiet] = useState({
    cupsPerDay: { coffee: 3, water: 8 },
    dietDetails: ["Intermittent fasting", "Table sugar, Daily Avg 3/6", "Lactose, Beans"],
  });
  
  const [timelines, setTimelines] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({});

  useEffect(() => {
    const patient_id = 15; // Replace with the actual patient ID
    const fetchPatientData = async () => {
      try {
        const patientData = await PatientService.getPatientById(patient_id);

        setProfile({
          name: patientData.name,
          gender: patientData.gender,
          address: patientData.address,
          dob: patientData.dob,
          age: patientData.age,
          occupation: patientData.occupation,
          bmi: patientData.bmi,
          weight: patientData.weight,
          height: patientData.height,
          bloodPressure: patientData.bloodPressure,
          profilePictureUrl: patientData.profilePictureUrl,
        });

        setMedicalHistory({
          chronicDisease: patientData.chronicDisease,
          surgery: patientData.surgery,
          diabetesEmergencies: patientData.diabetesEmergencies,
          familyDisease: patientData.familyDisease,
        });

        setEditProfile(patientData); // Initialize editProfile with fetched data

        // Fetch timelines using the correct patient ID
        const response = await listTimelines(patient_id);
        console.log("Fetched timelines: ", response.data);
        setTimelines(response.data);

      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();

  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    console.log("Toggled edit mode: ", isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    console.log("Edit profile updated: ", editProfile);
  };

  const handleSave = async () => {
    console.log("Attempting to save profile: ", editProfile);
    try {
      await PatientService.updatePatient(1, editProfile);
      setProfile(editProfile); // Update the profile with new data
      setIsEditing(false);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };

  return (
    <div className='flex flex-col w-screen h-full'>
        <NavBar/>
         {/* Add the image here */}
<div className="flex justify-center mt-6">
<img src={pdashboard} alt="Doctor Booking Details" className="w-full h-auto"/>
</div>
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Profile section */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-32 h-32">
          <img
          src ={profile.profilePictureUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editProfile.name}
                onChange={handleChange}
                className="text-2xl font-bold border p-1"
              />
              <input
                type="text"
                name="gender"
                value={editProfile.gender}
                onChange={handleChange}
                className="text-gray-600 border p-1"
              />
              <input
                type="text"
                name="address"
                value={editProfile.address}
                onChange={handleChange}
                className="text-gray-600 border p-1"
              />
              <input
                type="text"
                name="occupation"
                value={editProfile.occupation}
                onChange={handleChange}
                className="text-gray-600 border p-1"
              />
              <input
                type="date"
                name="dob"
                value={editProfile.dob}
                onChange={handleChange}
                className="text-gray-600 border p-1"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-gray-600">{profile.gender}</p>
              <p className="text-gray-600">{profile.address}</p>
              <p className="text-gray-600">
                {profile.dob} ({profile.age} yrs)
              </p>
              <p className="text-gray-600">{profile.occupation}</p>
            </>
          )}
        </div>
        {isEditing ? (
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        ) : (
          <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded">
            Edit
          </button>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 w-full max-w-4xl" style={{ backgroundColor: "rgba(0, 169, 145, 0.33)" }}>
        <h3 className="text-xl font-bold mb-4">Timeline</h3>
        <div>
          {timelines.length > 0 ? (
            timelines.map((timeline, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4"
              >
                <p className="font-semibold">{timeline.date}</p>
                <p className="text-gray-600">{timeline.type}</p>
                <p className="text-gray-600">{timeline.atc}</p>
              </div>
            ))
          ) : (
            <p>No timelines available for this patient.</p>
          )}
          <p className="text-blue-500 cursor-pointer text-right">See more...</p>
        </div>
      </div>

  {/* Medical History */}
  <div className="bg-white p-6 rounded-lg shadow mb-8 w-full max-w-4xl" style={{ backgroundColor: "rgba(0, 169, 145, 0.33)" }}>
      <h3 className="text-xl font-bold mb-4">Medical History</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold">Chronic Diseases</h4>
          <p>{medicalHistory.chronicDisease}</p>
        </div>
        <div>
          <h4 className="font-semibold">Surgeries</h4>
          <p>{medicalHistory.surgery}</p>
        </div>
        <div>
          <h4 className="font-semibold">Diabetes Emergencies</h4>
          <p>{medicalHistory.diabetesEmergencies}</p>
        </div>
        <div>
          <h4 className="font-semibold">Family Diseases</h4>
          <p>{medicalHistory.familyDisease}</p>
        </div>
      </div>
    </div>

     
   
      {/* Medications */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 w-full max-w-4xl" style={{ backgroundColor: "rgba(0, 169, 145, 0.33)" }}>
        <h3 className="text-xl font-bold mb-4">Medications</h3>
        <div className="grid grid-cols-3 gap-4">
          {medications.map((med, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">{med.name}</h4>
              <p>Adherence: {med.adherence}</p>
              <p>Type: {med.type}</p>
              <p>ATC: {med.atc}</p>
            </div>
          ))}
        </div>
      </div>
 
      {/* Diet */}
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-4xl" style={{ backgroundColor: "rgba(0, 169, 145, 0.33)" }}>
        <h3 className="text-xl font-bold mb-4">Diet</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold">Cups per Day</h4>
            <p>Water: {diet.cupsPerDay?.water}</p>
            <p>Coffee: {diet.cupsPerDay?.coffee}</p>
          </div>
          <div>
            <h4 className="font-semibold">Diet Details</h4>
            <ul>
              {diet.dietDetails?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default MedicalDashboard;
