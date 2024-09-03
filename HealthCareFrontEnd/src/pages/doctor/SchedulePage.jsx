import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import DoctorPicture from '../../assets/Images/Ellipse34.png';
import { GrNext } from "react-icons/gr";
import { useEffect, useRef } from 'react';
import { useState } from "react";
import { listSchedules } from "../../service/DoctorScheduleServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SchedulePage() {
  const divRef = useRef(null);
  const bottomRef = useRef(null);

  const [schedule,setSchedule]= useState([]);

  useEffect(() => {
    const drRegNo = localStorage.getItem("regNo");
    console.log(drRegNo);
    const toastId = 'unique-toast-id';
    listSchedules(drRegNo)
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



  return (
    <div className="flex flex-col px-10 pt-10">
      <ToastContainer/>
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
      {/* <div className="flex flex-row items-center gap-6 pt-10">
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
      </div> */}
     

      {/* Schedule List */}
      <div className="flex flex-col pt-10 ">

        <div className="flex flex-col  w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
          <div
            ref={divRef}
            style={{ overflowY: 'scroll', height: '560px' }}
          >


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

                    <GrNext />
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

export default SchedulePage