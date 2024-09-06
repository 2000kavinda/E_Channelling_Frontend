import { useState } from 'react';
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import AdminDashboard from "./AdminDashboard";
import Logo from '../../assets/Images/Logo.png';
import PatientsList from "./PatientsList";
import DoctorList from "./DoctorList";
import LabPersonList from "./LabPersonList";
import ScheduleList from "./ScheduleList";
import { useNavigate } from 'react-router-dom';

// Loading Spinner Component
function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
}

function AdminSideBar() {
    const [activePage, setActivePage] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setLoading(true); // Start loading
        setTimeout(() => {
            setActivePage(page);
            setLoading(false); // Stop loading after "page load"
        }, 500); // Simulate a delay of 500ms
    };

    const handleLogout = () => {
        setLoading(true); // Start loading
        setTimeout(() => {
            // Clear local storage
            localStorage.clear();

            // Navigate to the sign-in page
            navigate('/SignIn');
            setLoading(false); // Stop loading after navigation
        }, 500); // Simulate a delay for the logout process
    };

    return (
        <div className="flex flex-row flex-1 w-screen h-screen">
            <div className="flex flex-col justify-start w-1/4 h-full bg-[#00394C] items-center ">
                {/* Profile Picture */}
                <div className="flex w-full h-[340px] bg-[#D9F2EF] flex-col justify-center items-center">
                    <img src={Logo} width={180} height={150} alt="Logo" />
                </div>

                {/* Navigation buttons */}
                <div className='flex flex-col w-full gap-4 pt-16 pl-4'>
                    {/* Dashboard Button */}
                    <button
                        className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 ${activePage === 'dashboard' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
                            } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
                        onClick={() => handlePageChange('dashboard')}
                    >
                        <div><MdOutlineSpaceDashboard className='w-8 h-8' /></div>
                        <div className='pl-4 text-lg font-semibold'>Dashboard</div>
                    </button>

                    {/* Schedules Button */}
                    <button
                        className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 font-semibold ${activePage === 'schedule' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
                            } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
                        onClick={() => handlePageChange('schedule')}
                    >
                        <div className='w-8'><RiCalendarScheduleLine className='w-8 h-8' /></div>
                        <div className='pl-4 text-lg'>Schedules</div>
                    </button>

                    {/* Patients List Button */}
                    <button
                        className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 font-semibold ${activePage === 'patients' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
                            } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
                        onClick={() => handlePageChange('patients')}
                    >
                        <div className='w-8'><IoPeopleOutline className='w-8 h-8' /></div>
                        <div className='pl-4 text-lg'>Patients List</div>
                    </button>

                    {/* Doctors List Button */}
                    <button
                        className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 font-semibold ${activePage === 'doctors' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
                            } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
                        onClick={() => handlePageChange('doctors')}
                    >
                        <div className='w-8'><IoPeopleOutline className='w-8 h-8' /></div>
                        <div className='pl-4 text-lg'>Doctors List</div>
                    </button>

                    {/* Labs Person List Button */}
                    <button
                        className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 font-semibold ${activePage === 'labs' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
                            } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
                        onClick={() => handlePageChange('labs')}
                    >
                        <div className='w-8'><IoPeopleOutline className='w-8 h-8' /></div>
                        <div className='pl-4 text-lg'>Labs person List</div>
                    </button>

                </div>

                {/* Log out Button */}
                <div className='flex flex-col items-center justify-end w-full h-full'>
                    <button className='w-full flex flex-row h-[60px] border-top border-[#D9D9D9] border-t-2 justify-center items-center text-white font-semibold hover:bg-[#E6F2F6] hover:text-[#00394C]'
                        onClick={handleLogout}
                    >
                        <div className='w-8'><TbLogout2 className='w-6 h-6' /></div>
                        <div className='pl-2 text-lg'>Logout</div>
                    </button>
                </div>
            </div>

            {/* Screen */}
            <div className='w-3/4 h-full'>
                {loading ? <LoadingSpinner /> : (
                    <>
                        {activePage === 'dashboard' && <AdminDashboard />}
                        {activePage === 'schedule' && <ScheduleList />}
                        {activePage === 'patients' && <PatientsList />}
                        {activePage === 'doctors' && <DoctorList />}
                        {activePage === 'labs' && <LabPersonList />}
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminSideBar;
