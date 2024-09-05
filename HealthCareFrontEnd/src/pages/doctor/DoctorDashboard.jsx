import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiCabinet } from "react-icons/bi";
import { useRef, useState, useEffect } from 'react';
import DoctorPicture from '../../assets/Images/Ellipse34.png';
import { Button } from "@headlessui/react";
import { listPatients } from "../../service/PatientsBookingServices";
import axios from 'axios';

function DoctorDashboard() {

  const divRef = useRef(null);
  const bottomRef = useRef(null);
  const [patients, setPatients] = useState([]);

  // const drRegNo = localStorage.getItem("regNo");
  // const date = new Date().toISOString().split('T')[0];

  const [totalAppointmentCount, setTotalAppointmentCount] = useState('');
  const [totalRoomCount, setTotalRoomCount] = useState('')
  const [totalTimeCount, setTotalTimeCount] = useState('')

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

  const drName = localStorage.getItem("drName");

  useEffect(() => {
    const drRegNo = localStorage.getItem("regNo");
    const date = new Date().toISOString().split('T')[0];
    console.log(drRegNo);
    console.log("Date:", date);

    const fetchTotalAppointments = async () => {
      const drId = drRegNo
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/booking/count?drId=${drId}`);
        setTotalAppointmentCount(response.data.body);
      } catch (error) {
        console.error(error);
  
      }
    }

    const fetchTotalRooms = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/schedule/totalroomcount?drRegNo=${drRegNo}&date=${date}`);
          setTotalRoomCount(response.data.body);
        } catch (error) {
          console.error(error);

      }
    }

    const fetchTotalTime = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/schedule/totaltime?drRegNo=${drRegNo}&date=${date}`);
        setTotalTimeCount(response.data.body);
      } catch (error) {
        console.error(error);

      }
    }

    fetchTotalAppointments();
    fetchTotalRooms();
    fetchTotalTime();

    listPatients(drRegNo, date)
      .then((response) => {
        console.log(response.data);
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      
  }, []);

  return (
    <div className="flex flex-col px-10 pt-10">
      {/* Top bar */}
      <div className="flex flex-row justify-between w-full">
        {/* Greeting message */}
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-[#00394C]">{getCurrentGreeting()}</div>
          {/* Dr name */}
          <div className="text-base text-[#414141] font-semibold">{drName}</div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-10">
        {/* Single Button */}
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoNotificationsOutline className="w-5 h-5 text-[#00394C]"/></div>
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
            <BsPeople className="w-8 h-8 text-white"/>
          </div>

          <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
            <div className="font-semibold text-[#414141]">Total Appointment</div>
            <div className="text-4xl font-bold text-[#414141}">{totalAppointmentCount}</div>
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5">
          <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
            <BiCabinet className="w-8 h-8 text-white" />
          </div>

          <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
            <div className="font-semibold text-[#414141]">Total Rooms Count</div>
            <div className="text-4xl font-bold text-[#414141}">{totalRoomCount}</div>
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5">
          <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
            <AiOutlineFieldTime className="text-white w-9 h-9" />
          </div>

          <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
            <div className="font-semibold text-[#414141]">Total Time Count</div>
            <div className="text-4xl font-bold text-[#414141}">{totalTimeCount}</div>
          </div>
        </div>
      </div>



      {/* Content rows */}
      <div className="flex flex-row w-full h-full gap-6 pt-10">

        {/* Today appointment */}
      <div className="flex flex-col w-1/2 gap-4">
          <div className="text-base font-semibold text-[#414141]">Today Appointment Amounts</div>

        <div className="flex flex-col  h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
          <div
            ref={divRef}
            style={{ overflowY: 'scroll', height: '320px' }}
          >

              {
                patients && patients.length > 0 ? (
                  patients.map((patientsItem) => (
                    <div
                      key={patientsItem.bId}
                      className="h-[100px] w-full bg-white flex flex-row items-center px-4 rounded-xl justify-between mb-2"
                    >
                      {/* Doctor Picture */}
                      <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                        <img src={DoctorPicture} alt="ProfileImage" className="w-full h-full" />
                      </div>
                      {/* Patients Details */}
                      <div className="flex flex-col w-2/3 pl-2">
                        <div className="text-lg font-semibold text-[#414141]">{patientsItem.pName}</div>
                        <div className="text-sm text-[#414141]">No.02</div>
                        <div className="flex flex-row gap-4">
                          <div className="flex flex-row text-sm text-[#414141]">
                            <div>Age</div>
                            <div>22</div>
                          </div>
                          <div className="flex flex-row text-sm">
                            <div>Gender:</div>
                            <div>Male</div>
                          </div>
                        </div>
                      </div>

                      <div>12.00pm</div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col justify-center w-full h-full text-lg text-center text-[#005F7E] font-semibold">No schedules available</div>
                )
              }

              {/* Patients Cards */}
              

            <div ref={bottomRef}></div>
          </div>
        </div>
        </div>




        {/* Next Patient Details */}
        <div className="flex flex-col w-1/2 h-full gap-4">
          <div className="text-base font-semibold text-[#414141]">Next Patient Details</div>
          <div className="w-full h-[350px] bg-[#E6F2F6] rounded-xl px-4 py-4">
            <div className="flex flex-row items-center gap-4">
              <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                <img src={DoctorPicture} alt="ProfileImage" className="w-full h-full" />
              </div>

              {/*Patient Name */}
              <div className="flex flex-col">
                <div className="text-lg font-semibold">Mr.Hiran Welagedara</div>
                {/* Room No */}
                <div className="flex flex-row">
                  <div>Room No:</div>
                  <div>02</div>
                </div>
              </div>

              <div className="pl-10">
                <Button className="px-4 py-2 bg-[#00394C] rounded-lg text-white font-semibold text-sm">Next Patients</Button>
              </div>
            </div>

            <div className="flex flex-row w-full gap-10 px-2 pt-4">
            {/* Date of Birth */}
              <div className="flex flex-col">
                <div className="text-base font-semibold">Date of Birth</div>
                <div className="text-sm">2024/07/14</div>
              </div>
              <div className="flex flex-col">
                <div className="text-base font-semibold">Weight</div>
                <div className="text-sm">54</div>
              </div>
              <div className="flex flex-col">
                <div className="text-base font-semibold">Height</div>
                <div className="text-sm">176cm</div>
              </div>

            </div>

            <div className="flex flex-row w-full gap-10 px-2 pt-4">
              {/* Date of Birth */}
              <div className="flex flex-col">
                <div className="text-base font-semibold">Gender</div>
                <div className="text-sm">Male</div>
              </div>
              <div className="flex flex-col">
                <div className="text-base font-semibold">Appointment Registered</div>
                <div className="text-sm">2024/07/22</div>
              </div>

            </div>

            <div className="flex flex-row w-full gap-10 px-2 pt-4">
              {/* Date of Birth */}
              <div className="flex flex-col">
                <div className="text-base font-semibold">Allergies</div>
                <div className="text-sm">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat laboris nisi ut.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat laboris nisi ut.</div>
              </div>

            </div>
          </div>
        
        </div>
      </div>


    </div>
  )
}

export default DoctorDashboard