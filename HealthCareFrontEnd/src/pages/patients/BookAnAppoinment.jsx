// src/pages/patients/BookAnAppointment.jsx
import React, { useEffect, useState } from 'react';
import { PDoctorService } from '../../service/PDoctorService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/header/NavBar';



function BookAnAppointment() {
    const [doctors, setDoctors] = useState([]);
    const [type, setType] = useState("");        
    const [specialty, setSpecialty] = useState(""); 
    const [name, setName] = useState("");

   

    useEffect(() => {
        // Fetch all doctors initially
        PDoctorService.getAllDoctors()
            .then(response => setDoctors(response))
            .catch(error => toast.error("Failed to load doctors"));
    }, []);

    const searchDoctors = () => {
        PDoctorService.searchDoctors(name, specialty, type)
            .then(response => setDoctors(response))
            .catch(error => toast.error("Failed to search doctors"));
    };

    

    return (
  <div className='flex flex-col w-screen h-full'>

<NavBar/>
        <div className="flex flex-col px-10 pt-10">
            
            <ToastContainer />
            {/* Updated Header Section */}
            <div className="text-center mb-10">
              
                <h2 className="text-xl font-semibold text-[#005F7E]">
                    Doctors
                </h2>
                <h1 className="text-3xl font-bold text-gray-800 mt-2">
                    Best Doctor's From The Best Hospitals
                </h1>
                <p className="text-gray-600 mt-2">
                    Have A Look At Our Best Doctors From The Registered Hospitals
                </p>
            </div>
            <div className="flex flex-row justify-between w-full mb-10">
                <div className="flex flex-col">
                    <div className="text-3xl font-bold text-[#00394C]">
                        Book Your Next Doctor Appointment
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center gap-6 mb-10">
                <input
                    type="text"
                    placeholder="Search Doctor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[300px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                />
                <input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[150px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                />
                <input
                    type="text"
                    placeholder="Specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[150px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                />
                <button
                    type="button"
                    onClick={searchDoctors}
                    className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-10">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.drRegNo}
                        className="bg-[#79B4AD]  rounded-lg p-5 flex flex-col items-center shadow-md"
                    >
                        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4">
                            <img
                                src={doctor.profileImage}
                                alt="Doctor"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div className="text-lg font-semibold text-gray-700">{doctor.drName}</div>
                        <div className="text-sm text-gray-500">{doctor.specialize}</div>
                        <div className="text-sm text-gray-500">Reg. No: {doctor.drRegNo}</div>
                        <div className="flex flex-row gap-4 pt-4">
                            <button className="px-4 py-2 bg-[#005F7E] text-white text-sm rounded-md">
                                View Profile
                            </button>
                            <button className="px-4 py-2 bg-[#28a745] text-white text-sm rounded-md">
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center pt-10">
                <button className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] text-sm">
                    View All
                </button>
            </div>
        </div>
        
        </div>
    );
}

export default BookAnAppointment;

