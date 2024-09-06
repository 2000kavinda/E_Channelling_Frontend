import { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditService() {
    const navigate = useNavigate();

    // Retrieve service data from local storage
    const service = JSON.parse(localStorage.getItem('selectedService'));

    // State for form inputs
    const [serviceName, setServiceName] = useState(service?.serviceName || '');
    const [price, setPrice] = useState(service?.price || '');
    const [serviceNumber] = useState(service?.serviceNumber || '');
    const [roomNumber, setRoomNumber] = useState(service?.roomNumber || '');
    const [description, setDescription] = useState(service?.description || '');
    const [preparation, setPreparation] = useState(service?.preparation || '');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!service) {
            navigate('/LabAdmin'); 
        }
    }, [service, navigate]);

    const handleAddNewClick = () => {
        navigate('/SideBarLabPerson');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!serviceName || !price || !serviceNumber || !roomNumber || !description || !preparation) {
            setError("All fields are required.");
            toast.error("All fields are required.");
            return;
        }

        const serviceData = {
            serviceName,
            price,
            roomNumber,
            description,
            preparation
        };

        try {
            // API call to update the service
            await axios.put(`http://localhost:8085/LabService/update/${serviceNumber}`, serviceData);

            // Success toast message
            toast.success("Service updated successfully!");
           
        } catch (error) {
            console.error("There was an error updating the service!", error);

            // Error toast message
            setError("Failed to update service. Please try again.");
            toast.error("Failed to update service. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[860px] py-10 bg-white">
            <div className="flex flex-row justify-start w-full gap-8 px-16 pb-5">
                <button className="w-[120px] py-2 bg-[#005F7E] text-white rounded-lg flex flex-row items-center gap-1 font-semibold text-lg justify-center" onClick={handleAddNewClick}>
                    <IoMdArrowRoundBack />
                    <div>Back</div>
                </button>
                <div className="text-3xl font-bold text-[#005F7E]">Edit Service Details</div>
            </div>

            <form className="w-11/12 h-full bg-[#c9e2eb] rounded-lg px-10 py-10 flex flex-col" onSubmit={handleSubmit}>
                {/* Input Fields */}
                <div className="flex flex-col items-center gap-5 pt-10">
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Service name</div>
                            <input
                                type="text"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Price</div>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Room number</div>
                            <input
                                type="text"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Service number</div>
                            <input
                                type="text"
                                value={serviceNumber}
                                readOnly
                                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Description</div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[830px] h-[80px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Preparation</div>
                            <textarea
                                value={preparation}
                                onChange={(e) => setPreparation(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[830px] h-[80px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>
                    </div>
                </div>

                {error && <div className="mt-4 text-red-600">{error}</div>}

                <div className="flex justify-center mt-10">
                    <button type="submit" className="px-10 py-3 bg-[#005F7E] text-white font-bold text-lg rounded-md">Update</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default EditService;
