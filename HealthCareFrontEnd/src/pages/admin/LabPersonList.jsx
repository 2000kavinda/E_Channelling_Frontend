import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useRef } from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AllLabPersonList, LabPersonSearch } from '../../service/AllLabPersonListService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function LabPersonList() {
    const divRef = useRef(null);
    const bottomRef = useRef(null);
    const [labPerson, setLabPerson] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 

    const navigate = useNavigate();

    const handleAddNewClick = () => {
        navigate('/AddLabPerson');
    };

    const handleDelete = (lPRegNo) => {
        axios.delete(`http://localhost:8080/api/v1/labperson/delete?lPRegNo=${lPRegNo}`)
            .then(() => {
                toast.success('Doctor deleted successfully!');
                setLabPerson(labPerson.filter((labPerson) => labPerson.lPRegNo !== lPRegNo));
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to delete doctor.');
            });
    };

    const handleEdit = (LabPersonList) => {
        console.log(LabPersonList);
    
        const lPRegNo = LabPersonList.lPRegNo;
        console.log(lPRegNo);
    
        navigate('/EditLabPerson', { state: { lPRegNo } });
    };

    useEffect(() => {
        const toastId = 'unique-toast-id';
        AllLabPersonList()
            .then((response) => {
                console.log(response.data);
                setLabPerson(response.data);
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


    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            // If search query is empty, reload the patient list
            const toastId = 'unique-toast-id';
            AllLabPersonList()
                .then((response) => {
                    // console.log(response.data);
                    setLabPerson(response.data);
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
            LabPersonSearch(searchQuery)
                .then((response) => {
                    setLabPerson(response.data.body);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('No matching Lab Persons found!');
                });
        }
    };

    return (
        <div className="flex flex-col px-10 pt-10">
            <ToastContainer />
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
            <div className="flex flex-col pt-20 ">

                <div className="flex flex-col  w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
                    <div
                        ref={divRef}
                        style={{ overflowY: 'scroll', height: '480px' }}
                    >

                        {
                            labPerson && labPerson.length > 0 ? (
                                labPerson.map((LabPersonList) => (
                                    <div
                                        key={LabPersonList.lPRegNo}
                                        className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3"
                                    >
                                        <div className="flex flex-row items-center h-full gap-8">
                                            {/* Profile Picture */}
                                            <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                                                <img src={LabPersonList.lpprofileImage} alt="ProfileImage" className="w-full h-full rounded-full" />
                                            </div>
                                            {/* Patient Details */}
                                            <div className="flex flex-col">
                                                <div className="text-lg font-semibold text-[#666767]">{LabPersonList.lPName}</div>
                                                <div className="flex flex-row gap-4 text-sm text-[#666767]">
                                                    <div className="flex flex-row gap-1">
                                                        <div className="pr-1">Lab No: </div>
                                                        <div className="pr-1">{LabPersonList.labNo}</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row text-sm text-[#666767] gap-1">
                                                    <div className="pr-1">Qualifications:</div>
                                                    <div className="pr-1">{LabPersonList.lPQualification}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-5">
                                            <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#005F7E]" onClick={() => handleEdit(LabPersonList)}>Edit</button>
                                            <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#FF6464]" onClick={() => handleDelete(LabPersonList.lPRegNo)}>Delete</button>
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

export default LabPersonList