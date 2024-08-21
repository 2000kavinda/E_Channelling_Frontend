import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useRef } from 'react';
import DoctorPicture from '../../assets/Images/Ellipse34.png';
import { useNavigate } from 'react-router-dom';

function LabPersonList() {
    const divRef = useRef(null);
    const bottomRef = useRef(null);

    const navigate = useNavigate();

    const handleAddNewClick = () => {
        navigate('/AddLabPerson');
    };

    return (
        <div className="flex flex-col px-10 pt-10">
            <div className="flex flex-row justify-between w-full">
                {/* Greeting message */}
                <div className="flex flex-col">
                    <div className="text-3xl font-bold text-[#00394C]">Lab Persons Details</div>
                </div>

                {/* Buttons */}
                <div className="flex flex-row gap-10">
                    {/* Single Button */}
                    <button className="flex flex-row items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoNotificationsOutline className="w-5 h-5 text-[#00394C]" /></div>
                        <div className="text-base font-semibold text-[#00394C]">Alerts</div>
                    </button>

                    {/* Single Button */}
                    <button className="flex flex-row items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><FaQuestion className="w-5 h-5 text-[#00394C]" /></div>
                        <div className="text-base font-semibold text-[#00394C]">help</div>
                    </button>

                    {/* Single Button */}
                    <button className="flex flex-row items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoSettingsOutline className="w-5 h-5 text-[#00394C]" /></div>
                        <div className="text-base font-semibold text-[#00394C]">settings</div>
                    </button>
                </div>

            </div>

            <div className="flex flex-row items-center justify-between w-full h-[45px]">
                {/* Search bar */}
                <div className="flex flex-row items-center gap-6 pt-10">
                    <input
                        type="text"
                        placeholder="Search Patients..."
                        className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                    />
                    <button
                        type="submit"
                        className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
                    >
                        Search
                    </button>
                </div>

                <button className="w-[150px] h-full bg-[#007F6D] mt-10 rounded-lg text-white font-semibold" onClick={handleAddNewClick}>Add New +</button>
            </div>


            {/* Schedule List */}
            <div className="flex flex-col pt-20 ">

                <div className="flex flex-col  w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
                    <div
                        ref={divRef}
                        style={{ overflowY: 'scroll', height: '480px' }}
                    >

                        {/* Card */}
                        <div className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3">
                            <div className="flex flex-row items-center h-full gap-8">
                                {/* Profile Picture */}
                                <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                                    <img src={DoctorPicture} alt="ProfileImage" className="w-full h-full" />
                                </div>
                                {/* Patient Details */}
                                <div className="flex flex-col">
                                    <div className="text-lg font-semibold text-[#666767]">Mr.Hiran Welagedara</div>
                                    <div className="flex flex-row gap-4 text-sm text-[#666767]">
                                        <div className="flex flex-row">
                                            <div className="pr-1">Dr.Hiran Welcome </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row text-sm text-[#666767]">
                                        <div className="pr-1">Eye Surgeon</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-5">
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#005F7E]">Edit</button>
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#FF6464]">Delete</button>
                            </div>
                        </div>



                        {/* Card */}
                        <div className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3">
                            <div className="flex flex-row items-center h-full gap-8">
                                {/* Profile Picture */}
                                <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                                    <img src={DoctorPicture} alt="ProfileImage" className="w-full h-full" />
                                </div>
                                {/* Patient Details */}
                                <div className="flex flex-col">
                                    <div className="text-lg font-semibold text-[#666767]">Mr.Hiran Welagedara</div>
                                    <div className="flex flex-row gap-4 text-sm text-[#666767]">
                                        <div className="flex flex-row">
                                            <div className="pr-1">Dr.Hiran Welcome </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row text-sm text-[#666767]">
                                        <div className="pr-1">Eye Surgeon</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-5">
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#005F7E]">Edit</button>
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#FF6464]">Delete</button>
                            </div>
                        </div>


                        {/* Card */}
                        <div className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3">
                            <div className="flex flex-row items-center h-full gap-8">
                                {/* Profile Picture */}
                                <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                                    <img src={DoctorPicture} alt="ProfileImage" className="w-full h-full" />
                                </div>
                                {/* Patient Details */}
                                <div className="flex flex-col">
                                    <div className="text-lg font-semibold text-[#666767]">Mr.Hiran Welagedara</div>
                                    <div className="flex flex-row gap-4 text-sm text-[#666767]">
                                        <div className="flex flex-row">
                                            <div className="pr-1">Dr.Hiran Welcome </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row text-sm text-[#666767]">
                                        <div className="pr-1">Eye Surgeon</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-5">
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#005F7E]">Edit</button>
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#FF6464]">Delete</button>
                            </div>
                        </div>



                        {/* Card */}
                        <div className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3">
                            <div className="flex flex-row items-center h-full gap-8">
                                {/* Profile Picture */}
                                <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                                    <img src={DoctorPicture} alt="ProfileImage" className="w-full h-full" />
                                </div>
                                {/* Patient Details */}
                                <div className="flex flex-col">
                                    <div className="text-lg font-semibold text-[#666767]">Mr.Hiran Welagedara</div>
                                    <div className="flex flex-row gap-4 text-sm text-[#666767]">
                                        <div className="flex flex-row">
                                            <div className="pr-1">Dr.Hiran Welcome </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row text-sm text-[#666767]">
                                        <div className="pr-1">Eye Surgeon</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-5">
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#005F7E]">Edit</button>
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#FF6464]">Delete</button>
                            </div>
                        </div>



                        {/* Card */}
                        <div className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3">
                            <div className="flex flex-row items-center h-full gap-8">
                                {/* Profile Picture */}
                                <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                                    <img src={DoctorPicture} alt="ProfileImage" className="w-full h-full" />
                                </div>
                                {/* Patient Details */}
                                <div className="flex flex-col">
                                    <div className="text-lg font-semibold text-[#666767]">Mr.Hiran Welagedara</div>
                                    <div className="flex flex-row gap-4 text-sm text-[#666767]">
                                        <div className="flex flex-row">
                                            <div className="pr-1">Dr.Hiran Welcome </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row text-sm text-[#666767]">
                                        <div className="pr-1">Eye Surgeon</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-5">
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#005F7E]">Edit</button>
                                <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#FF6464]">Delete</button>
                            </div>
                        </div>

                        <div ref={bottomRef}></div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default LabPersonList