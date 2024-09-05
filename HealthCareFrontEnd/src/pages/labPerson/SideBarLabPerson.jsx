import { TbLogout2 } from "react-icons/tb";
import { MdAddBusiness } from 'react-icons/md';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { useState } from 'react';
import LabDashboard from './LabDashboard';
import ServiceList from './ServiceList';
import AddService from './AddService';
import LabAppointment from './LabAppointment';
import { useNavigate } from 'react-router-dom';



function SideBarLabPerson() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to the sign-in page
    navigate('/SignIn');
  };


  const [activePage, setActivePage] = useState('LabDashboard');
  const lpprofileImage = localStorage.getItem("lpprofileImage");
  const lpname = localStorage.getItem("lpname");

  return (
    <div className="flex flex-row flex-1 w-screen h-screen">
      <div className="flex flex-col justify-start w-1/4 h-full bg-[#00394C] items-center pt-10">
        {/* Profile Picture */}
        <div className="flex w-[150px] h-[150px] bg-black rounded-full">
          <img src={lpprofileImage} alt="ProfileImage" className="w-full h-full rounded-full" />
        </div>

        {/* Doctor Name */}
        <div className='pt-[29px] text-2xl font-bold text-white'>{lpname}</div>

        {/** Doctor Specialist Area */}
        <div className='bg-[#D9F2EF] rounded-md px-4 py-2 mt-4 text-sm font-bold text-[#00394C]'>
          Lab assistance
        </div>

        {/* Navigation buttons */}
        <div className='flex flex-col w-full gap-4 pt-16 pl-4'>
        {/* Dashboard Button */}
          <button
            className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 ${activePage === 'LabDashboard' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
              } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
            onClick={() => setActivePage('LabDashboard')}
          >
            <div><MdOutlineSpaceDashboard className='w-8 h-8' /></div>
            <div className='pl-4 text-lg font-semibold'>Dashboard</div>
          </button>

          {/* Schedules buttons */}
          <button
            className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 font-semibold ${activePage === 'ServiceList' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
              } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
            onClick={() => setActivePage('ServiceList')}
          >
            <div className='w-8'><RiCalendarScheduleLine className='w-8 h-8' /></div>
            <div className='pl-4 text-lg'>Lab service</div>
          </button>

          {/* Patients List buttons */}
          <button
            className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 font-semibold ${activePage === 'AddService' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
              } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
            onClick={() => setActivePage('AddService')}
          >
            <div className='w-8'><MdAddBusiness className='w-8 h-8' /></div>
            <div className='pl-4 text-lg'>Add service</div>
          </button>
          <button
            className={`flex flex-row items-center h-[60px] w-full justify-center rounded-l-full pr-4 font-semibold ${activePage === 'LabAppointment' ? 'bg-[#E6F2F6] text-[#00394C]' : 'bg-[#00394C] text-[#EEEEEE]'
              } hover:bg-[#E6F2F6] hover:text-[#00394C]`}
            onClick={() => setActivePage('LabAppointment')}
          >
            <div className='w-8'><IoPeopleOutline className='w-8 h-8' /></div>
            <div className='pl-4 text-lg'>Appointment</div>
          </button>
        
          
        </div>

        {/* Log out Button */}
        <div className='flex flex-col items-center justify-end w-full h-full'>
          <button className='w-full flex flex-row h-[60px] border-top border-[#D9D9D9] border-t-2 justify-center items-center text-white font-semibold hover:bg-[#E6F2F6] hover:text-[#00394C]'
            onClick={handleLogout}>
            <div className='w-8'><TbLogout2 className='w-6 h-6' /></div>
            <div className='pl-2 text-lg'>Logout</div>

          </button>
        </div>
      </div>


    
      {/* Screen */}
      <div className='w-3/4 h-full'>
        {activePage === 'LabDashboard' && <div><LabDashboard/></div>}
        {activePage === 'ServiceList' && <div><ServiceList/></div>}
        {activePage === 'AddService' && <div><AddService/></div>}
        {activePage === 'LabAppointment' && <div><LabAppointment/></div>}
       
      </div>
    </div>
  )
}

export default SideBarLabPerson