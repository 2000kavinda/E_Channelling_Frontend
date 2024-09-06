import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiCabinet } from "react-icons/bi";
import { useRef,useEffect,useState } from 'react';
import { AllScheduleList } from "../../service/AdminScheduleService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllDoctorsList } from '../../service/AdminDoctorService';
import { MdNavigateNext } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const divRef = useRef(null);
    const bottomRef = useRef(null);
    const [schedule, setSchedule] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    const getCurrentGreeting = () => {
        const currentHour = new Date().getHours();
        

        if (currentHour < 12) {
            return 'Good morning!';
        } else if (currentHour < 18) {
            return 'Good afternoon!';
        } else {
            return 'Good evening!';
        }
    };

    const handleCheckNotification = () => {
        navigate('/Notifi');
    };

    const [doctorCount, setDoctorCount] = useState(0);

    // Fetch doctor count from API
    const fetchDoctorCount = async () => {
        try {
            const response = await axios.get('http://localhost:8088/api/v1/doctor/count');
            setDoctorCount(response.data.body);
            console.log(response.data.body); // Assuming response.data contains the count
        } catch (error) {
            console.error("Error fetching doctor count:", error);
        }
    };

    // Use useEffect to call the fetch function when the component mounts
    useEffect(() => {
        fetchDoctorCount();
    }, []);



    const [appointmentCount, setAppointmentCount] = useState(0);

    // Fetch doctor count from API
    const fetchAppointmentCount = async () => {
        try {
            const response = await axios.get('http://localhost:8088/api/v1/appointment/count');
            setAppointmentCount(response.data.body);
            console.log(response.data.body); // Assuming response.data contains the count
        } catch (error) {
            console.error("Error fetching doctor count:", error);
        }
    };

    // Use useEffect to call the fetch function when the component mounts
    useEffect(() => {
        fetchAppointmentCount();
    }, []);


    const [labTestCount, setLabTestCount] = useState(0);

    // Fetch doctor count from API
    const fetchLabTestCount = async () => {
        try {
            const response = await axios.get('http://localhost:8088/api/v1/labtest/count');
            setLabTestCount(response.data.body);
            console.log(response.data.body); // Assuming response.data contains the count
        } catch (error) {
            console.error("Error fetching doctor count:", error);
        }
    };

    // Use useEffect to call the fetch function when the component mounts
    useEffect(() => {
        fetchLabTestCount();
    }, []);


    useEffect(() => {
        const toastId = 'unique-toast-id';
        AllDoctorsList()
            .then((response) => {
                // console.log(response.data);
                setDoctors(response.data);
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

    useEffect(() => {
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
    }, []);

    return (
        <div className="flex flex-col px-10 pt-10">
            <ToastContainer />
            {/* Top bar */}
            <div className="flex flex-row justify-between w-full">
                {/* Greeting message */}
                <div className="flex flex-col">
                    <div className="text-4xl font-bold text-[#00394C]">{getCurrentGreeting()}</div>
                    {/* Dr name */}
                    <div className="text-base text-[#414141] font-semibold">Admin</div>
                </div>

                {/* Buttons */}
                <div className="flex flex-row gap-10">
                    {/* Single Button */}
                    <button className="flex flex-row items-center gap-2" onClick={handleCheckNotification}>
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



            {/* Card Section */}
            <div className="flex flex-row w-full gap-8 pt-10">

                {/* Card */}
                <div className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5">
                    <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
                        <BsPeople className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
                        <div className="font-semibold text-[#414141]">Total Doctor Count</div>
                        <div className="text-4xl font-bold text-[#414141}">{doctorCount}</div>
                    </div>
                </div>

                {/* Card */}
                <div className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-4 gap-5">
                    <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
                        <BiCabinet className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
                        <div className="font-semibold text-[#414141]">Total Appointments</div>
                        <div className="text-4xl font-bold text-[#414141}">{appointmentCount}</div>
                    </div>
                </div>

                {/* Card */}
                <div className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5">
                    <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
                        <AiOutlineFieldTime className="text-white w-9 h-9" />
                    </div>

                    <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
                        <div className="font-semibold text-[#414141]">Total Time Count</div>
                        <div className="text-4xl font-bold text-[#414141}">{labTestCount}</div>
                    </div>
                </div>
            </div>



            {/* Content rows */}
            <div className="flex flex-row w-full h-full gap-6 pt-10">

                {/* Today appointment */}
                <div className="flex flex-col w-1/2 gap-4">
                    <div className="text-base font-semibold text-[#414141]">Today Schedules</div>

                    <div className="flex flex-col  h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
                        <div
                            ref={divRef}
                            style={{ overflowY: 'scroll', height: '320px' }}
                        >

                            {
                                schedule && schedule.length > 0 ? (
                                    schedule.map((scheduleItem) => (
                                        <div
                                            key={scheduleItem.sId}
                                            className="h-[100px] w-full bg-white flex flex-row items-center pr-4 rounded-xl justify-between mb-2"
                                        >
                                            <div className="flex w-[120px] h-full flex-col bg-[#00394C] justify-center items-center rounded-l-xl">
                                                <div className="text-base text-white">Room</div>
                                                <div className="text-2xl font-bold text-white">{scheduleItem.roomNo}</div>
                                            </div>
                                            {/* Patients Details */}
                                            <div className="flex flex-col w-2/3 pl-2">
                                                <div className="text-lg font-semibold text-[#414141]">{scheduleItem.drName}</div>
                                                <div className="flex flex-row">
                                                    <div className="text-sm text-[#414141]">Date: -</div>
                                                    <div className="text-sm text-[#414141]"> {scheduleItem.date}</div>
                                                </div>
                                                <div className="flex flex-row gap-4">
                                                    <div className="flex flex-row text-sm text-[#414141]">
                                                        <div>{scheduleItem.start} - {scheduleItem.end}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col justify-center w-full h-full text-lg text-center text-[#005F7E] font-semibold">No schedules available</div>
                                )
                            }

                            {/* Schedule Cards */}
                            


                            

                            <div ref={bottomRef}></div>
                        </div>
                    </div>
                </div>




            
                {/* Available Doctors */}
                <div className="flex flex-col w-1/2 gap-4">
                    <div className="text-base font-semibold text-[#414141]">Available Doctors</div>

                    <div className="flex flex-col  h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
                        <div
                            ref={divRef}
                            style={{ overflowY: 'scroll', height: '320px' }}
                        >

                            
                            
                            {
                                doctors && doctors.length > 0 ? (
                                    doctors.map((DoctorsList) => (
                                        <div
                                            key={DoctorsList.drRegNo}
                                            className="h-[100px] w-full bg-white flex flex-row items-center px-4 rounded-xl mb-2 justify-between"
                                        >
                                        <div className="flex flex-row w-full">
                                            <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                                                <img src={DoctorsList.profileImage} alt="ProfileImage" className="w-full h-full rounded-full" />
                                            </div>
                                            {/* Patients Details */}
                                            <div className="flex flex-col w-2/3 pl-6">
                                                <div className="text-lg font-semibold text-[#414141]">{DoctorsList.drName}</div>
                                                <div className="flex flex-row">
                                                    <div className="text-sm text-[#414141]">Reg No - </div>
                                                    <div className="text-sm text-[#414141]">{DoctorsList.drRegNo}</div>
                                                </div>
                                                <div className="flex flex-row gap-4">
                                                    <div className="flex flex-row text-sm text-[#414141]">
                                                        <div>SpecialistArea -  </div>
                                                        <div> {DoctorsList.type}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <MdNavigateNext />
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


        </div>
    )
}

export default AdminDashboard