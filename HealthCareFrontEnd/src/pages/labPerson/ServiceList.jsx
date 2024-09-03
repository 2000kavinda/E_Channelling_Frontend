import { useEffect, useState, useRef } from 'react';
import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
// import { GrNext } from "react-icons/gr";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // Track search input
  const divRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  // const history = useHistory();

  // Fetch all services from the API
  useEffect(() => {
    axios.get('http://localhost:8080/LabService/viewAll')
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, []);

  // Fetch filtered services based on search input
  const handleSearch = () => {
    if (searchInput) {
      axios.get(`http://localhost:8080/LabService/view/${searchInput}`)
        .then((response) => {
          console.log(response.data);
          setServices([response.data]); // Set filtered service
        })
        .catch((error) => {
          console.error("There was an error fetching the filtered services!", error);
        });
    } else {
      // Fetch all services again if the search input is cleared
      axios.get('http://localhost:8080/LabService/viewAll')
        .then((response) => {
          setServices(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the services!", error);
        });
    }
  };

  // Handle delete functionality with confirmation
  const handleDelete = (serviceNumber) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/LabService/delete/${serviceNumber}`)
        .then(() => {
          // Remove the deleted service from the list
          setServices(services.filter(service => service.serviceNumber !== serviceNumber));
        })
        .catch((error) => {
          console.error("There was an error deleting the service!", error);
        });
    }
  };
  const handleEdit = (service) => {
    // Store service data in local storage
    localStorage.setItem('selectedService', JSON.stringify(service));

    // Navigate to the edit page
    navigate('/EditService');
  };
  return (
    <div className="flex flex-col px-10 pt-10">
      <div className="flex flex-row justify-between w-full">
        {/* Greeting message */}
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-[#00394C]">Manage service</div>
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
            <div className="text-base font-semibold text-[#00394C]">Help</div>
          </button>

          {/* Single Button */}
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoSettingsOutline className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Settings</div>
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex flex-row items-center gap-6 pt-10">
        <input
          type="text"
          placeholder="Search service..."
          className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
          value={searchInput} // Bind search input to state
          onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
        />
        <button
          type="submit"
          className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
          onClick={handleSearch} // Trigger search on button click
        >
          Search
        </button>
      </div>

      {/* Service List */}
      <div className="flex flex-col pt-10">
        <div className="flex flex-col w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
          <div ref={divRef} style={{ overflowY: 'scroll', height: '480px' }}>
            {/* Render the service cards dynamically */}
            {services.length > 0 ? services.map((service, index) => (
              <div key={index} className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3">
                <div className="flex flex-row gap-5">
                  
                  {/* Service Details */}
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold text-[#666767]">{service.serviceName}</div>
                    <div className="flex flex-row gap-4 text-sm text-[#666767]">
                      <div className="flex flex-row">
                        <div className="pr-1">Price: </div>
                        <div>{service.price}</div>
                      </div>

                      <div className="flex flex-row">
                        <div className="pr-1">Service: </div>
                        <div>{service.serviceName}</div>
                      </div>
                      <div className="flex flex-row">
                        <div className="pr-1">Service no: </div>
                        <div>{service.serviceNumber}</div>
                      </div>
                    </div>

                    <div className="flex flex-row text-sm text-[#666767]">
                      <div className="pr-1">Room No: </div>
                      <div>{service.roomNumber}</div>
                    </div>
                  </div>
                </div>
                {/* Move buttons to the end of the row */}
                <div className="ml-auto flex gap-2">
                  <button
                    className="text-white bg-red-500 px-4 py-2 rounded-md"
                    onClick={() => handleDelete(service.serviceNumber)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-white bg-blue-500 px-4 py-2 rounded-md"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>

                </div>
                {/* <GrNext /> */}
              </div>
            )) : (
              <div>No services available.</div>
            )}
            <div ref={bottomRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceList;
