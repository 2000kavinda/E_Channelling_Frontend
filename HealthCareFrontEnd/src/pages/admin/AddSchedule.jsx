import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';


function AddSchedule() {
    const navigate = useNavigate();

    const handleAddNewClick = () => {
        navigate('/AdminSideBar');
    };


    const [formData, setFormData] = useState({
        drRegNo: '',
        date: '',
        start: "",
        end: "",
        roomNo: "",
    });
    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const REST_API_BASE_URL = `http://localhost:8088/api/v1/schedule/save`;



    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedFormData = { ...formData }

        try {
            const response = await axios.post(REST_API_BASE_URL, updatedFormData);
            console.log("API response:", response);
            alert("Successfully Registered!");
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-[700px] py-10 bg-white">
            <div className="flex flex-row justify-start w-full gap-8 px-16 pb-5">
                <button className="w-[120px] py-2 bg-[#005F7E] text-white rounded-lg flex flex-row items-center gap-1 font-semibold text-lg justify-center" onClick={handleAddNewClick}>
                    <IoMdArrowRoundBack />
                    <div>Back</div>
                </button>
                <div className="text-3xl font-bold text-[#005F7E]">Create a schedule</div>
            </div>

            {/* Details Pages */}
            <div className="w-11/12 h-[800px] bg-[#c9e2eb] rounded-lg px-10 py-10 flex flex-col">

                <form onSubmit={handleSubmit}>

                {/* Text Boxes */}
                <div className="flex flex-col items-center gap-5 pt-10">
                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Room number</div>
                            <input type="text"
                                placeholder="First name..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                                    name="roomNo"
                                    value={formData.roomNo}
                                    onChange={handleChange}
                                />
                        </div>


                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Doctor Registration Number</div>
                            <input type="text"
                                placeholder="Doctor Registration number..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                                    name="drRegNo"
                                    value={formData.drRegNo}
                                    onChange={handleChange}
                                />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Start Time</div>
                            <input type="time"
                                placeholder="Start time..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                                    name="start"
                                    value={formData.start}
                                    onChange={handleChange}
                                />
                        </div>


                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">End Time</div>
                            <input type="time"
                                placeholder="End time..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                                    name="end"
                                    value={formData.end}
                                    onChange={handleChange}
                                />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row justify-center w-full gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Date</div>
                            <input type="date"
                                placeholder="Date..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[860px] h-[50px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" 
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                        </div>
                    </div>

                    <div className="flex flex-row justify-center w-full gap-16 pt-10">
                        <div className="flex flex-row items-center justify-center gap-10">
                            <button className="w-[180px] h-[50px] bg-[#1b5f75] rounded-xl text-white text-normal font-semibold">Cancel</button>
                            <button className="w-[180px] h-[50px] bg-[#1b5f75] rounded-xl text-white text-normal font-semibold">Submit</button>
                        </div>
                    </div>
                </div>

                </form>


            </div>


        </div>
    )
}

export default AddSchedule