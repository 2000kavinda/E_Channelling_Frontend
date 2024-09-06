import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import { useEffect, useState } from 'react';
import { fetchAllAppointments } from '../../service/PBookingService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/header/NavBar';
import bookhistorypic from '../../assets/Images/bookhistorypic.png';

function PatientBookHistory() {
  const [appointments, setAppointments] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const [allCount, setAllCount] = useState(0);

  useEffect(() => {
    const toastId = 'unique-toast-id';
    fetchAllAppointments()
      .then((response) => {
        const appointmentsData = response.data;
        setAppointments(appointmentsData);

        // Update counts
        const active = appointmentsData.filter(a => a.status === 'Active').length;
        const completed = appointmentsData.filter(a => a.status === 'Completed').length;
        const expired = appointmentsData.filter(a => a.status === 'Expired').length;

        setActiveCount(active);
        setCompletedCount(completed);
        setExpiredCount(expired);
        setAllCount(appointmentsData.length);

        if (!toast.isActive(toastId)) {
          toast.success('Appointments loaded successfully!', { toastId });
        }
      })
      .catch((error) => {
        console.error(error);
        if (!toast.isActive(toastId)) {
          toast.error('Failed to load appointments!', { toastId });
        }
      });
  }, []);

  return (
    <div className='flex flex-col w-screen h-full'>
        <NavBar/>
 {/* Add the image here */}
 <div className="flex justify-center mt-6">
<img src={bookhistorypic} alt="Doctor Booking Details" className="w-full h-auto"/>
</div>
    <div className="flex flex-col p-10">
      <ToastContainer />
      <div className="flex justify-between items-center w-full">
        {/* Greeting message */}
        <div className="text-3xl font-bold text-[#00394C]">Patient Booking History</div>

        {/* Buttons */}
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex items-center justify-center">
              <IoNotificationsOutline className="w-5 h-5 text-[#00394C]" />
            </div>
            <span className="text-base font-semibold text-[#00394C]">Alerts</span>
          </button>
          <button className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex items-center justify-center">
              <FaQuestion className="w-5 h-5 text-[#00394C]" />
            </div>
            <span className="text-base font-semibold text-[#00394C]">Help</span>
          </button>
          <button className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex items-center justify-center">
              <IoSettingsOutline className="w-5 h-5 text-[#00394C]" />
            </div>
            <span className="text-base font-semibold text-[#00394C]">Settings</span>
          </button>
        </div>
      </div>

      {/* Summary Counts */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="bg-green-300 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-900">{activeCount}</div>
          <div className="text-lg text-green-700">Active</div>
        </div>
        <div className="bg-blue-300 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-900">{completedCount}</div>
          <div className="text-lg text-blue-700">Completed</div>
        </div>
        <div className="bg-red-300 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-900">{expiredCount}</div>
          <div className="text-lg text-red-700">Expired</div>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-900">{allCount}</div>
          <div className="text-lg text-gray-700">All</div>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-6 mt-10">
        <input
          type="text"
          placeholder="Search Booking History ..."
          className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
        />
        <button
          type="submit"
          className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
        >
          Search
        </button>
      </div>

      {/* Appointment List */}
      <div className="flex flex-col mt-10">
        <div className="bg-[#E6F2F6] rounded-xl p-4 overflow-y-auto" style={{ height: '480px' }}>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-lg flex justify-between items-center p-4 mb-3"
              >
                <div className="flex flex-col">
                  <div className="text-lg font-semibold text-[#666767]">
                    Doctor: {appointment.firstName || 'Unknown Doctor'}
                  </div>
                  <div className="flex gap-4 text-sm text-[#666767]">
                    <span>Booking Date: {appointment.bookingDate || 'Unknown Date'}</span>
                    <span>Allergy: {appointment.allergy || 'Unknown Allergy'}</span>
                  </div>
                  <div className="text-sm text-[#666767]">Doctor ID: {appointment.doctorId || 'Unknown Doctor ID'}</div>
                </div>
                <GrNext />
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-[#005F7E] font-semibold">
              No appointments available
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default PatientBookHistory;
