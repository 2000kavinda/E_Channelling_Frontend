import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiCabinet } from "react-icons/bi";


import axios from 'axios';
import { useEffect, useState, useRef } from 'react';


function LabDashboard() {
  const [services, setServices] = useState([]);
  const [labservices, labsetServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const divRef = useRef(null);
  const bottomRef = useRef(null);

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

  // Fetch all services initially
  useEffect(() => {
    axios.get('http://localhost:8085/Laboratory/appointments')
      .then((response) => {
        const data = response.data;
        setServices(data);

        
         // Calculate today's appointments
         const today = new Date().toISOString().split('T')[0];
         const todayAppointmentsCount = data.filter(appointment => appointment.date === today).length;
         setTodayAppointments(todayAppointmentsCount);
 
         // You can adjust this logic based on the structure of your data.
         setTotalAppointments(data.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, []);

    // Fetch all services from the API
    useEffect(() => {
        axios.get('http://localhost:8085/LabService/viewAll')
          .then((response) => {
            const data = response.data;
        labsetServices(data);

         // Calculate total services and appointments
        setTotalServices(data.length);
          })
          .catch((error) => {
            console.error("There was an error fetching the services!", error);
          });
      }, []);
    

  return (
    <div className="flex flex-col px-10 pt-10">
      {/* Top bar */}
      <div className="flex flex-row justify-between w-full">
        {/* Greeting message */}
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-[#00394C]">{getCurrentGreeting()}</div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-10">
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoNotificationsOutline className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Alerts</div>
          </button>

          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><FaQuestion className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Help</div>
          </button>

          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoSettingsOutline className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Settings</div>
          </button>
        </div>
      </div>

      {/* Card Section */}
      <div className="flex flex-row w-full gap-8 pt-10">
        {/* Card */}
        <div className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5">
          <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
            <BiCabinet className="w-8 h-8 text-white" />
          </div>

          <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
            <div className="font-semibold text-[#414141]">Total Services</div>
            <div className="text-4xl font-bold text-[#414141]">{totalServices}</div>
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5">
          <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
            <BsPeople className="w-8 h-8 text-white" />
          </div>

          <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
            <div className="font-semibold text-[#414141]">Total Appointments</div>
            <div className="text-4xl font-bold text-[#414141]">{totalAppointments}</div>
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5">
          <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
            <AiOutlineFieldTime className="text-white w-9 h-9" />
          </div>

          <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
            <div className="font-semibold text-[#414141]">Today Appointments</div>
            <div className="text-4xl font-bold text-[#414141]">{todayAppointments}</div>
          </div>
        </div>
      </div>

      {/* Content rows */}
      <div className="flex flex-row w-full h-full gap-6 pt-10">
        {/* Today appointment */}
        <div className="flex flex-col w-1/2 gap-4">
          <div className="text-base font-semibold text-[#414141]">Appointment List</div>

          <div className="flex flex-col h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
            <div
              ref={divRef}
              style={{ overflowY: 'scroll', height: '320px' }}
            >
              {/* Patients Cards */}
              {services.map((service, index) => (
                <div key={index} className="h-[100px] w-full bg-white flex flex-row items-center px-4 rounded-xl justify-between mb-2">
                  {/* Patients Details */}
                  <div className="flex flex-col w-2/3 pl-2">
                    <div className="text-lg font-semibold text-[#414141]">{service.name}</div>
                    <div className="text-sm text-[#414141]">{service.email}</div>
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-row text-sm text-[#414141]">
                        <div>{service.contact}</div>
                        
                      </div>
                      <div className="flex flex-row text-sm">
                        <div>{service.date}</div>
                       
                      </div>
                    </div>
                  </div>
                  <div className="pr-1">Appointment No: </div>
                  <div>{service.appointmentNumber}</div>
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>
          </div>
        </div>

        {/* Next Patient Details */}
        <div className="flex flex-col w-1/2 h-full gap-4">
          <div className="text-base font-semibold text-[#414141]">Available Service List</div>
          <div className="w-full h-[350px] bg-[#E6F2F6] rounded-xl px-4 py-4">
           
          <div className="flex flex-col h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
            <div
              ref={divRef}
              style={{ overflowY: 'scroll', height: '320px' }}
            >
              {/* Patients Cards */}
              {labservices.map((labservice, index) => (
                <div key={index} className="h-[100px] w-full bg-white flex flex-row items-center px-4 rounded-xl justify-between mb-2">
                  {/* Patients Details */}
                  <div className="flex flex-col w-2/3 pl-2">
                    <div className="text-lg font-semibold text-[#414141]">{labservice.serviceName}</div>
                    <div className="pr-1">Room no: </div>
                    <div className="text-sm text-[#414141]">{labservice.roomNumber}</div>
                    <div className="flex flex-row gap-4">
                      
                     
                    </div>
                  </div>
                  <div className="pr-1">price: </div>
                  <div>{labservice.price}</div>
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>
          </div>

            
          </div>
        </div>
      </div>

    </div>
  );
}

export default LabDashboard;
