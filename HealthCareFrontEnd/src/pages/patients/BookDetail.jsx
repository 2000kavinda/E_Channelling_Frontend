// src/components/AppointmentForm.js

import React, { useState } from "react";
import { bookAppointment } from '../../service/PAppointmentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/header/NavBar';
import Appoinmentpic from '../../assets/Images/Appoinmentpic.png';
function AppointmentForm() {
    // State variables for form fields
    const [doctorID, setDoctorID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [age, setAge] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");

    // State to manage form validation errors
    const [errors, setErrors] = useState({});

    // State to manage loading state
    const [isLoading, setIsLoading] = useState(false);

    // Form validation logic
    const validate = () => {
        const newErrors = {};
        
        if (!doctorID) newErrors.doctorID = "Doctor ID is required.";
        if (!firstName) newErrors.firstName = "First name is required.";
        if (!secondName) newErrors.secondName = "Second name is required.";
        if (!email) newErrors.email = "Email address is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email address is invalid.";
        if (!contactNumber) newErrors.contactNumber = "Contact number is required.";
        else if (!/^\d+$/.test(contactNumber)) newErrors.contactNumber = "Contact number must be digits only.";
        if (!age) newErrors.age = "Age is required.";
        else if (!/^\d+$/.test(age)) newErrors.age = "Age must be a number.";
        if (!bookingDate) newErrors.bookingDate = "Booking date is required.";

        return newErrors;
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Clear errors and handle form submission
            setErrors({});
            setIsLoading(true);

            const appointmentData = {
                doctorId: parseInt(doctorID, 10),
                firstName,
                secondName,
                email,
                contactNumber,
                age: parseInt(age, 10),
                bookingDate,
                additionalInfo,
            };

            try {
                const response = await bookAppointment(appointmentData);
                console.log(response.data);

                // Show success toast
                toast.success('Appointment booked successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });

                // Reset form fields
                setDoctorID("");
                setFirstName("");
                setSecondName("");
                setEmail("");
                setContactNumber("");
                setAge("");
                setBookingDate("");
                setAdditionalInfo("");
            } catch (error) {
                console.error(error);
                // Show error toast
                toast.error('Failed to book appointment. Please try again.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className='flex flex-col w-screen h-full'>
        <NavBar/>
        {/* Add the image here */}
<div className="flex justify-center mt-6">
<img src={Appoinmentpic} alt="Doctor Booking Details" className="w-full h-auto"/>
</div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
             {/* Updated Header Section */}
             <div className="text-center mb-10">
              
            
              <h1 className="text-3xl font-bold text-gray-800 mt-2">
                 Book an Appoinment
              </h1>
             
          </div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white p-8 rounded-md shadow-md"
            >
                <h2 className="text-2xl font-bold text-center text-[#005F7E] mb-6">Appoinment Form</h2>
                
                {/* Doctor ID */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="doctorID">Doctor ID</label>
                    <input
                        id="doctorID"
                        type="text"
                        value={doctorID}
                        onChange={(e) => setDoctorID(e.target.value)}
                        className={`mt-1 p-2 w-full border ${errors.doctorID ? 'border-red-500' : 'border-[#005F7E]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#005F7E]`}
                    />
                    {errors.doctorID && <p className="text-red-500 text-xs mt-1">{errors.doctorID}</p>}
                </div>

                {/* First Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`mt-1 p-2 w-full border ${errors.firstName ? 'border-red-500' : 'border-[#005F7E]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#005F7E]`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                {/* Second Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="secondName">Second Name</label>
                    <input
                        id="secondName"
                        type="text"
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                        className={`mt-1 p-2 w-full border ${errors.secondName ? 'border-red-500' : 'border-[#005F7E]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#005F7E]`}
                    />
                    {errors.secondName && <p className="text-red-500 text-xs mt-1">{errors.secondName}</p>}
                </div>

                {/* Email Address */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`mt-1 p-2 w-full border ${errors.email ? 'border-red-500' : 'border-[#005F7E]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#005F7E]`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Contact Number */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">Contact Number</label>
                    <input
                        id="contactNumber"
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className={`mt-1 p-2 w-full border ${errors.contactNumber ? 'border-red-500' : 'border-[#005F7E]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#005F7E]`}
                    />
                    {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
                </div>

                {/* Age */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="age">Age</label>
                    <input
                        id="age"
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className={`mt-1 p-2 w-full border ${errors.age ? 'border-red-500' : 'border-[#005F7E]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#005F7E]`}
                    />
                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                {/* Booking Date */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="bookingDate">Booking Date</label>
                    <input
                        id="bookingDate"
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className={`mt-1 p-2 w-full border ${errors.bookingDate ? 'border-red-500' : 'border-[#005F7E]'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#005F7E]`}
                    />
                    {errors.bookingDate && <p className="text-red-500 text-xs mt-1">{errors.bookingDate}</p>}
                </div>

                {/* Additional Info */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="additionalInfo">Additional Information</label>
                    <textarea
                        id="additionalInfo"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="mt-1 p-2 w-full border border-[#005F7E] rounded-md focus:outline-none focus:ring-1 focus:ring-[#005F7E]"
                        rows="4"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        className="px-6 py-2 text-[#005F7E] border border-[#005F7E] rounded-md hover:bg-[#005F7E] hover:text-white transition"
                        onClick={() => window.history.back()}
                        disabled={isLoading}
                    >
                        Go Back
                    </button>
                    <button
                        type="submit"
                        className={`px-6 py-2 bg-[#005F7E] text-white rounded-md hover:bg-[#004058] transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Booking...' : 'Book Appointment'}
                    </button>
                </div>
            </form>
        </div>
        </div>
    );

}

export default AppointmentForm;
