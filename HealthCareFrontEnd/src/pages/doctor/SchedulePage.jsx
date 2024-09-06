import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import DoctorPicture from '../../assets/Images/Ellipse34.png';
import { useEffect, useRef, useState } from 'react';
import { listSchedules } from "../../service/DoctorScheduleServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'; // Import the LoadingSpinner component

function SchedulePage() {
  const divRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddNewClick = () => {
    setLoading(true); // Set loading state to true
    // Navigate to the AddDoctorSchedule page
    setTimeout(() => {
      navigate('/AddDoctorSchedule');
      setLoading(false); // Set loading state to false after navigation
    }, 1000); // Simulate a delay for demonstration
  };

  const handleEdit = (scheduleItem) => {
    setLoading(true); // Set loading state to true

    const id = scheduleItem.sid;

    // Simulate a delay before navigation
    setTimeout(() => {
      setLoading(false); // Set loading state to false
      navigate('/EditSchedule', { state: { id } });
    }, 1000); // Adjust the delay as needed
  };

  useEffect(() => {
    const drRegNo = localStorage.getItem("regNo");
    const toastId = 'unique-toast-id';
    listSchedules(drRegNo)
      .then((response) => {
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

  const handleDelete = (sId) => {
    axios.delete(`http://localhost:8080/api/v1/schedule/delete?id=${sId}`)
      .then(() => {
        toast.success('Patient deleted successfully!');
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
          <div className="text-3xl font-bold text-[#00394C]">Today Schedule Details</div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-10">
          {/* Single Button */}
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center">
              <IoNotificationsOutline className="w-5 h-5 text-[#00394C]" />
            </div>
            <div className="text-base font-semibold text-[#00394C]">Alerts</div>
          </button>

          {/* Single Button */}
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center">
              <FaQuestion className="w-5 h-5 text-[#00394C]" />
            </div>
            <div className="text-base font-semibold text-[#00394C]">Help</div>
          </button>

          {/* Single Button */}
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center">
              <IoSettingsOutline className="w-5 h-5 text-[#00394C]" />
            </div>
            <div className="text-base font-semibold text-[#00394C]">Settings</div>
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center justify-end w-full h-[45px]">
        <button className="w-[150px] h-full bg-[#007F6D] mt-10 rounded-lg text-white font-semibold" onClick={handleAddNewClick}>Add New +</button>
      </div>

      {/* Schedule List */}
      <div className="flex flex-col pt-10">
        <div className="flex flex-col w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
          <div ref={divRef} style={{ overflowY: 'scroll', height: '560px' }}>
            {/* Loading Spinner */}
            {loading && <LoadingSpinner />}

            {/* Card */}
            {
              schedule && schedule.length > 0 ? (
                schedule.map((scheduleItem) => (
                  <div
                    key={scheduleItem.sId}
                    className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3"
                  >
                    <div className="flex flex-row gap-5">
                      {/* Profile Picture */}
                      <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                        <img
                          src={DoctorPicture}
                          alt="ProfileImage"
                          className="w-full h-full"
                        />
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
                      <button className="px-10 rounded-lg text-white text-sm font-medium py-2 bg-[#FF6464]"
                        onClick={() => handleDelete(scheduleItem.sid)}>Delete</button>
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
  );
}

export default SchedulePage;
