
import NavBar from '../../components/header/NavBar';
import LabImage from '../../assets/Images/LabImage3.png';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';


function PatientLabReport() {
    const [searchInput, setSearchInput] = useState('');
    const [services, setServices] = useState([]);
    const divRef = useRef(null);
    const bottomRef = useRef(null);
    const [pacientId, setPacientId] = useState(''); 

    // Fetch pacientId from localStorage on component mount
    useEffect(() => {
        const pid = localStorage.getItem("pid") || '';
        setPacientId(pid);
        console.log("Fetched pacientId from localStorage:", pid);
    }, []);

    // Fetch all services from the API
    useEffect(() => {
        axios.get(`http://localhost:8085/labreports/getPatientReports?pId=${pacientId}`)
            .then((response) => {
                console.log(response.data);
                setServices(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the services!", error);
            });
    }, [pacientId]);
// Fetch filtered services based on search input
const handleSearch = () => {
    if (searchInput) {
        axios.get(`http://localhost:8085/labreports/getSelectedReport?repoetid=${searchInput}`)
            .then((response) => {
                console.log(response.data);
                setServices([response.data]); // Set filtered service
            })
            .catch((error) => {
                console.error("There was an error fetching the filtered services!", error);
            });
    } else {
        // Fetch all services again if the search input is cleared
        axios.get(`http://localhost:8085/labreports/getPatientReports?pId=${pacientId}`)
            .then((response) => {
                setServices(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the services!", error);
            });
    }
};




    return (
        <div className="flex flex-col pt-10">
            <NavBar />
            {/* Image Section */}
            <div className="flex justify-center my-8">
                <img src={LabImage} alt="Lab" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            {/* Search bar */}
            <div className="flex flex-row items-center justify-center gap-6 pt-10">
                <input
                    type="text"
                    placeholder="Search report..."
                    className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                    value={searchInput} // Bind search input to state
                    onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
                />
                <button
                    type="submit"
                    className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
                    onClick={handleSearch} // Trigger search on button click
                >
                    Search report
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
                                                <div className="pr-1">Report name: </div>
                                                <div>{service.uploadpdfname}</div>
                                            </div>

                                            <div className="flex flex-row">
                                                <div className="pr-1">Report no: </div>
                                                <div>{service.repoetid}</div>
                                            </div>

                                        </div>
                                        <div className="flex flex-row">
                                            <div className="pr-1">Issue Date:</div>
                                            <div>{service.uploaddate}</div>
                                        </div>

                                    </div>
                                </div>
                                <button
                                    className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
                                    onClick={() => window.open(service.pdflink, '_blank')}
                                >
                                    View Report
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

export default PatientLabReport;
