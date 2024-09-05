
import NavBar from '../../components/header/NavBar';  // Adjust the path if necessary
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LabImage1 from '../../assets/Images/LabImage1.png';

function PatientLabServiceList() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [searchInput, setSearchInput] = useState(''); // Track search input
    const divRef = useRef(null);
    const bottomRef = useRef(null);
    //   const navigate = useNavigate();
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



    return (
        <div className="flex flex-col px-10 pt-10">
            <NavBar />
            {/* Image Section */}
            <div className="flex justify-center my-8">
                <img src={LabImage1} alt="Lab" className="w-full h-auto rounded-lg shadow-lg" />
            </div>


            {/* Search bar */}
            <div className="flex flex-row justify-center items-center gap-6 pt-10">
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
                                                <div className="pr-1">Room No:</div>
                                                <div>{service.roomNumber}</div>
                                            </div>
                                            <div className="flex flex-row">
                                                <div className="pr-1">Service no: </div>
                                                <div>{service.serviceNumber}</div>
                                            </div>

                                        </div>
                                        <div className="flex flex-row text-sm text-[#666767]">
                                            <div className="pr-1">Discription: </div>
                                            <div>{service.description}</div>
                                        </div>
                                        <div className="flex flex-row text-sm text-[#666767]">
                                            <div className="pr-1">Preparation: </div>
                                            <div>{service.preparation}</div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
                                    onClick={() => navigate('/PatientLabBook', { state: { serviceName: service.serviceName } })}
                                >
                                    Book Now
                                </button>

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

export default PatientLabServiceList;
