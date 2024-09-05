import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import ImageUpload from '../../components/admin/ImageUpload';
import { useState } from "react";
import axios from 'axios';

function SignUp() {
    const navigate = useNavigate();

    const handleAddNewClick = () => {
        setTimeout(() => {
            navigate('/SignIn');
        }, 300); // Adjust the delay time in milliseconds (300ms in this example)
    };

    const [url, setUrl] = useState('');

    const [formData, setFormData] = useState({
        regNo: '',
        email: '',
        password: "",
        role: "PATIENT",
        pname: "",
        bday: "",
        gender: "",
        contact: "",
    });
    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const REST_API_BASE_URL = `http://localhost:8081/api/v1/auth/register`;



    const handleSubmit = async (event) => {
        event.preventDefault();

        // set url
        const photoUrl = localStorage.getItem('url')

        const updatedFormData = { ...formData, pprofileImage: photoUrl }

        try {
            const response = await axios.post(REST_API_BASE_URL, updatedFormData);
            console.log("API response:", response);
            alert("Successfully Registered!");
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen px-16 py-10">
            <div className="flex flex-row items-center justify-start w-full gap-8 pb-5 ">
                <button className="w-[120px] py-2 bg-[#005F7E] text-white rounded-lg flex flex-row items-center gap-1 font-semibold text-lg justify-center" onClick={handleAddNewClick}>
                    <IoMdArrowRoundBack />
                    <div>Back</div>
                </button>
                <div className='flex flex-row text-4xl font-bold text-[#005F7E]'>Sign up</div>
            </div>

            <div className='flex flex-col w-full h-full bg-[#c3e9f6] rounded-xl py-10 px-10'>
                <ImageUpload setUrl={setUrl} url={url} />

                <form onSubmit={handleSubmit}>


                    {/* Text Boxes */}
                    <div className="flex flex-col items-center gap-5 pt-10">
                        {/* Input Row */}
                        <div className="flex flex-row gap-16">
                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Patient name</div>
                                <input type="text"
                                    placeholder="Patient name..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="pname"
                                    value={formData.pname}
                                    onChange={handleChange} />
                            </div>


                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Register number</div>
                                <input type="text"
                                    placeholder="Register number..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="regNo"
                                    value={formData.regNo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Input Row */}
                        <div className="flex flex-row gap-16">
                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Email address</div>
                                <input type="text"
                                    placeholder="Email address..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange} />
                            </div>


                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Birthday</div>
                                <input type="text"
                                    placeholder="NIC number..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="bday"
                                    value={formData.bday}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Input Row */}
                        <div className="flex flex-row gap-16">
                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Gender</div>
                                <input type="text"
                                    placeholder="Gender..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Contact number</div>
                                <input type="text"
                                    placeholder="Contact number..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Input Row */}
                        <div className="flex flex-row justify-center w-full gap-16">
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
                            <div className="flex flex-col gap-1">
                                <div className="text-normal text-[#1b5f75] font-semibold">Confirm Password</div>
                                <input type="text"
                                    placeholder="Confirm Password..."
                                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                                    name="Confirmpassword"
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

export default SignUp;
