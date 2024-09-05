import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import { useRef, useState, useEffect } from 'react';
import { listPatients } from "../../service/PatientsBookingServices";
import { patientsSearchList } from "../../service/BookingSearchService"; // Import the search service
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function PatientsListPage() {

  const divRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  const handleViewPatient = (patientsItem) => {
    console.log(patientsItem)
    navigate('/PatientDetailsPage',{state:{patientsItem}});
  };

  useEffect(() => {
    const drRegNo = localStorage.getItem("regNo");
    const date = new Date().toISOString().split('T')[0];
    console.log(drRegNo);
    console.log("Date:", date);
    const toastId = 'unique-toast-id';

    listPatients(drRegNo, date)
      .then((response) => {
        console.log(response.data);
        setPatients(response.data);
        if (!toast.isActive(toastId)) {
          // toast.success('Registration successful!', { toastId });
        }
      })
      .catch((error) => {
        console.error(error);
        if (!toast.isActive(toastId)) {
          toast.error('No Patients available!', { toastId });
        }
      });
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If search query is empty, reload the patient list
      const drRegNo = localStorage.getItem("regNo");
      const date = new Date().toISOString().split('T')[0];
      listPatients(drRegNo, date)
        .then((response) => {
          setPatients(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Otherwise, search for patients by name
      patientsSearchList(searchQuery)
        .then((response) => {
          setPatients(response.data.body);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          toast.error('No matching patients found!');
        });
    }
  };

  return (
    <div className="flex flex-col px-10 pt-10">
      <ToastContainer />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-[#00394C]">Today Patient List</div>
        </div>

        <div className="flex flex-row gap-10">
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center">
              <IoNotificationsOutline className="w-5 h-5 text-[#00394C]" />
            </div>
            <div className="text-base font-semibold text-[#00394C]">Alerts</div>
          </button>

          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center">
              <FaQuestion className="w-5 h-5 text-[#00394C]" />
            </div>
            <div className="text-base font-semibold text-[#00394C]">help</div>
          </button>

          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center">
              <IoSettingsOutline className="w-5 h-5 text-[#00394C]" />
            </div>
            <div className="text-base font-semibold text-[#00394C]">settings</div>
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center gap-6 pt-10">
        <input
          type="text"
          placeholder="Search Patients..."
          className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
          value={searchQuery} // Bind input to searchQuery state
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on change
        />
        <button
          type="submit"
          className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
          onClick={handleSearch} // Trigger search on button click
        >
          Search
        </button>
      </div>

      <div className="flex flex-col pt-10 ">
        <div className="flex flex-col  w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
          <div ref={divRef} style={{ overflowY: 'scroll', height: '480px' }}>
            {
              patients && patients.length > 0 ? (
                patients.map((patientsItem) => (
                  <button
                    key={patientsItem.bId}
                    className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3" 
                    onClick={() => handleViewPatient(patientsItem)}
                  >
                    <div className="flex flex-row gap-5">
                      <div className="flex w-[70px] h-[70px] bg-black rounded-full">
                        <img src={patientsItem.profileImage} alt="ProfileImage" className="w-full h-full" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold text-[#666767]">{patientsItem.pName}</div>
                        <div className="flex flex-row gap-4 text-sm text-[#666767]">
                          <div className="flex flex-row">
                            <div className="pr-1">Age: </div>
                            <div>{patientsItem.bDay}</div>
                          </div>
                          <div className="flex flex-row">
                            <div className="pr-1">Gender: </div>
                            <div>{patientsItem.gender}</div>
                          </div>
                        </div>
                        <div className="flex flex-row text-sm text-[#666767]">
                          <div className="pr-1">Room No: </div>
                          <div>22</div>
                        </div>
                      </div>
                    </div>
                    <GrNext />
                  </button>
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

export default PatientsListPage;
