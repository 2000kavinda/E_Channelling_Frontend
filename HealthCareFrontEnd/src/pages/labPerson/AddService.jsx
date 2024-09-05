import { useState } from 'react';
// import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddService() {
    const navigate = useNavigate();
    
    // State for form inputs
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState('');
    const [serviceNumber, setServiceNumber] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [description, setDescription] = useState('');
    const [preparation, setPreparation] = useState('');
    const [error, setError] = useState(null);

    // const handleAddNewClick = () => {
    //     navigate('/LabAdmin');
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation (Optional)
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
            const response = await axios.post('http://localhost:8080/LabService/add', serviceData);
            console.log("Service added successfully:", response.data);
            toast.success("Service added successfully!");
            // navigate('/ServiceList'); // Navigate to another page after success
        } catch (error) {
            console.error("There was an error adding the service!", error);

            // Check if the error response indicates a duplicate service name
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error;

                // If the error message contains "already exists", show a specific toast message
                if (errorMessage.includes("already exists")) {
                    toast.error(`Service name ${serviceName} already exists.`);
                } else {
                    setError("Failed to add service. Please try again.");
                    toast.error("Failed to add service. Please try again.");
                }
            } else {
                setError("Failed to add service. Please try again.");
                toast.error("Failed to add service. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[860px] py-10 bg-white">
            <div className="flex flex-row justify-start w-full gap-8 px-16 pb-5">
                {/* <button className="w-[120px] py-2 bg-[#005F7E] text-white rounded-lg flex flex-row items-center gap-1 font-semibold text-lg justify-center" onClick={handleAddNewClick}>
                    <IoMdArrowRoundBack />
                    <div>Back</div>
                </button> */}
                <div className="text-3xl font-bold text-[#005F7E]">Fill the service details</div>
            </div>

            {/* Details Pages */}
            <form className="w-11/12 h-full bg-[#c9e2eb] rounded-lg px-10 py-10 flex flex-col" onSubmit={handleSubmit}>
                {/* Text Boxes */}
                <div className="flex flex-col items-center gap-5 pt-10">
                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Service name</div>
                            <input
                                type="text"
                                placeholder="service name..."
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Price</div>
                            <input
                                type="text"
                                placeholder="price..."
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Service number</div>
                            <input
                                type="text"
                                placeholder="service number..."
                                value={serviceNumber}
                                onChange={(e) => setServiceNumber(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Room number</div>
                            <input
                                type="text"
                                placeholder="room number..."
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                            />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Description</div>
                            <textarea
                                placeholder="Add description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[150px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                rows={10}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Preparation</div>
                            <textarea
                                placeholder="Add preparation guides..."
                                value={preparation}
                                onChange={(e) => setPreparation(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[150px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                rows={10}
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 pt-4">{error}</div>}

                    <div className="flex flex-row justify-center w-full gap-16 pt-10">
                        <div className="flex flex-row items-center justify-center gap-10">
                            <button type="button" onClick={() => navigate('/ServiceList')} className="w-[180px] h-[50px] bg-[#1b5f75] rounded-xl text-white text-normal font-semibold">
                                Cancel
                            </button>
                            <button type="submit" className="w-[180px] h-[50px] bg-[#1b5f75] rounded-xl text-white text-normal font-semibold">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* ToastContainer to show toast messages */}
            <ToastContainer />
        </div>
    );
}

export default AddService;
