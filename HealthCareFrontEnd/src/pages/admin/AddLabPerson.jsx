import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ImageUpload from "../../components/admin/ImageUpload";
import { useState } from "react";
import axios from 'axios';

function AddLabPerson() {
    const navigate = useNavigate();

    const handleAddNewClick = () => {
        navigate('/AdminSideBar');
    };


    const [url, setUrl] = useState('');

    const [formData, setFormData] = useState({
        regNo: '',
        email: '',
        password: "",
        role: "LAB_PERSON",
        lpname: "",
        labno: "",
        lpprofileImage: "",
        lpqualification: ""
    });
    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const REST_API_BASE_URL = `http://localhost:8081/api/v1/auth/register`;



    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData);

        // set url
        const photoUrl = localStorage.getItem('url')

        const updatedFormData = { ...formData, lpprofileImage: photoUrl }
        console.log(updatedFormData);

        try {
            const response = await axios.post(REST_API_BASE_URL, updatedFormData);
            console.log("API response:", response);
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen py-10 bg-white">
            <div className="flex flex-row justify-start w-full gap-8 px-16 pb-5">
                <button className="w-[120px] py-2 bg-[#005F7E] text-white rounded-lg flex flex-row items-center gap-1 font-semibold text-lg justify-center" onClick={handleAddNewClick}>
                    <IoMdArrowRoundBack />
                    <div>Back</div>
                </button>
                <div className="text-3xl font-bold text-[#005F7E]">Fill the details</div>
            </div>

            {/* Details Pages */}
            <div className="w-11/12 h-[900px] bg-[#c9e2eb] rounded-lg px-10 py-10 flex flex-col">

                {/* Profile Picture */}
                <ImageUpload setUrl={setUrl} url={url} />

                <form onSubmit={handleSubmit}>
                {/* Text Boxes */}
                <div className="flex flex-col items-center h-full gap-5 pt-10">

                        
                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Lab Person name</div>
                            <input type="text"
                                placeholder="Lab Person name..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="lpname"
                                    value={formData.lpname}
                                    onChange={handleChange} />
                        </div>


                        <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Register Number</div>
                                <input type="text"
                                    placeholder="Register number..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="regNo"
                                    value={formData.regNo}
                                    onChange={handleChange} />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Qualifications</div>
                                <input type="text"
                                    placeholder="Qualification..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="lpqualification"
                                    value={formData.lpqualification}
                                    onChange={handleChange}
                                />
                            </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Lab Number</div>
                            <input type="text"
                                placeholder="Lab number..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="labno"
                                    value={formData.labno}
                                    onChange={handleChange} />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        


                        <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Email</div>
                                <input type="text"
                                    placeholder="Email..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                        </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Password</div>
                                <input type="text"
                                    placeholder="Password..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="password"
                                    value={formData.password}
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

export default AddLabPerson