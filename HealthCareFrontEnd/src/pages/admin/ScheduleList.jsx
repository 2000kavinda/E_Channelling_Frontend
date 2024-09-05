import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useRef } from 'react';
import { useState } from "react";
import { AllScheduleList, ScheduleSearch } from "../../service/AdminScheduleService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ScheduleList() {
    const divRef = useRef(null);
    const bottomRef = useRef(null);

    const navigate = useNavigate();

    const handleAddNewClick = () => {
        navigate('/AddSchedule');
    };

    const [schedule, setSchedule] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        const toastId = 'unique-toast-id';
        AllScheduleList()
            .then((response) => {
                console.log(response.data);
                setSchedule(response.data);
                if (!toast.isActive(toastId)) {
                    // toast.success('Registration successful!', { toastId });
                }
            })
            .catch((error) => {
                console.error(error);
                if (!toast.isActive(toastId)) {
                    toast.error('No Schedules available!', { toastId });
                }
            });
    }, []);

    const handleEdit = (scheduleItem) => {
        console.log(scheduleItem);

        const id = scheduleItem.sid;
        console.log(id);

        navigate('/EditAdminSchedule', { state: { id } });
    };


    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            // If search query is empty, reload the patient list
            const toastId = 'unique-toast-id';
            AllScheduleList()
                .then((response) => {
                    // console.log(response.data);
                    setSchedule(response.data);
                    if (!toast.isActive(toastId)) {
                        // toast.success('Registration successful!', { toastId });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    if (!toast.isActive(toastId)) {
                        toast.error('No Schedules available!', { toastId });
                    }
                });
        } else {
            // Otherwise, search for patients by name
            ScheduleSearch(searchQuery)
                .then((response) => {
                    setSchedule(response.data.body);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('No matching Lab Persons found!');
                });
        }
    };

    const handleDelete = (sId) => {
        axios.delete(`http://localhost:8080/api/v1/schedule/delete?id=${sId}`)
            .then(() => {
                toast.success('Schedule deleted successfully!');
                setSchedule(schedule.filter((schedule) => schedule.sId !== sId));
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to delete Patient.');
            });
    };


    return (
        <div className="flex flex-col px-10 pt-10">
            <ToastContainer />
            <div className="flex flex-row justify-between w-full">
                {/* Greeting message */}
                <div className="flex flex-col">
                    <div className="text-3xl font-bold text-[#00394C]">Today Schedule List</div>
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

            {/* Search bar */}
            <div className="flex flex-row items-center justify-between w-full h-[45px]">
                {/* Search bar */}
                <div className="flex flex-row items-center gap-6 pt-10">
                    <input
                        type="text"
                        placeholder="Search Patients..."
                        className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                <button className="w-[150px] h-full bg-[#007F6D] mt-10 rounded-lg text-white font-semibold" onClick={handleAddNewClick}>Add New +</button>
            </div>


            {/* Schedule List */}
            <div className="flex flex-col pt-10 ">

                <div className="flex flex-col  w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
                    <div
                        ref={divRef}
                        style={{ overflowY: 'scroll', height: '480px' }}
                    >


                        {/* Card */}
                        {
                            schedule && schedule.length > 0 ? (
                                schedule.map((scheduleItem) => (
                                    <div
                                        key={scheduleItem.sId}
                                        className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between pr-4 items-center mb-3"
                                    >
                                        <div className="flex flex-row items-center h-full gap-5">
                                            {/* Profile Picture */}
                                            <div className="flex w-[150px] h-full bg-[#005F7E] rounded-l-xl flex-col justify-center items-center">
                                                <div className="text-base text-white">Room</div>
                                                <div className="text-2xl font-bold text-white">{scheduleItem.roomNo}</div>
                                            </div>
                                            {/* Patient Details */}
                                            <div className="flex flex-col">
                                                <div className="text-lg font-semibold text-[#666767] flex flex-row gap-2">
                                                    <div>Room No:</div>
                                                    {scheduleItem.roomNo}
                                                </div>
                                                <div className="flex flex-row gap-4 text-sm text-[#666767]">
                                                    <div className="flex flex-row">
                                                        <div className="pr-1">From: </div>
                                                        <div>{scheduleItem.start}</div>
                                                    </div>

                                                    <div className="flex flex-row">
                                                        <div className="pr-1">To: </div>
                                                        <div>{scheduleItem.end}</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row text-sm text-[#666767]">
                                                    <div className="pr-1">Date: </div>
                                                    <div>{scheduleItem.date}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-5">
                                            <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#005F7E]" onClick={() => handleEdit(scheduleItem)}>Edit</button>
                                            <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#FF6464]" onClick={() => handleDelete(scheduleItem.sId)}>Delete</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col justify-center w-full h-full text-lg text-center text-[#005F7E] font-semibold">No schedules available</div>
                            )
                        }




                        <div ref={bottomRef}></div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ScheduleList