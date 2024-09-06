import NavBar from '../../components/header/NavBar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LabImage2 from '../../assets/Images/LabImage2.png';
import { useLocation } from 'react-router-dom';

function PatientLabBook() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object
    const passedServiceName = location.state?.serviceName || ''; // Get the passed serviceName, default to an empty string

    // State for form inputs
    const [name, setName] = useState('');
    const [pacientId] = useState(localStorage.getItem("pid") || ''); 
    const [age, setAge] = useState('');
    
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [allergies, setAllergies] = useState('');
    const [service, setService] = useState(passedServiceName); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if (passedServiceName) {
            setService(passedServiceName); // Set the service name from the passed state
        }
    }, [passedServiceName]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !age || !email || !contact || !time || !date || !pacientId || !service) {
            setError("All fields are required.");
            toast.error("All fields are required.");
            return;
        }
        
        const formattedDate = formatDate(date);
        console.log("Formatted Date:", formattedDate);  // Format the date
        const serviceData = {
            name,
            pacientId,
            age,
            email,
            contact,
            time,
            date: formattedDate,
            allergies,
            service
        };
        console.log("Sending Request:", {
            name,
            pacientId,
            age,
            email,
            contact,
            time,
            date: formattedDate,
            allergies,
            service
        });

        try {
            const response = await axios.post('http://localhost:8080/Laboratory/add', serviceData);
            console.log("Appointment added successfully:", response.data);
            toast.success("Appointment added successfully!");
           
        } catch (error) {
            console.error("Error response:", error.response?.data);
            console.error("There was an error adding the service!", error);

            // Handle duplicate service name or other errors
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error;
                setError(errorMessage);
                toast.error(errorMessage);
            } else {
                setError("Failed to add Appointment. Please try again.");
                toast.error("Failed to add Appointment. Please try again.");
            }
        }
    };
    // Function to format the date as YYYY-MM-DD
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() is 0-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

    return (
        <div className="flex flex-col  pt-10">
            {/* Navigation Bar */}
            <NavBar />

            {/* Image Section */}
            <div className="flex justify-center my-8">
                <img src={LabImage2} alt="Lab" className="w-full h-auto rounded-lg shadow-lg" />
            </div>

            {/* Details Pages */}
            <form className="w-11/13 h-full bg-[#c9e2eb] rounded-lg px-10 py-10 flex flex-col" onSubmit={handleSubmit}>
                {/* Text Boxes */}
                <div className="flex flex-col items-center gap-5 pt-10">
                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex  flex-col gap-1">
                            <div  style={{ fontSize: '30px' }} className="text-normal text-[#1b5f75] font-bold">Service:</div>
                            
                        </div>
                        <div className="flex  flex-col gap-1">
                          
                            <input
                                type="text"
                                value={service}
                                disabled // Make the field non-editable
                                style={{ fontSize: '30px' }}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md font-bold"
                            />
                        </div>
                        </div>
                        <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Name</div>
                            <input
                                type="text"
                                placeholder="Name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">ID number</div>
                            <input
                                type="text"
                                placeholder="ID..."
                                value={pacientId} // Use the state here
                                disabled // Make it non-editable
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                            />
                        </div>
                    
                    </div>
                      {/* Input Row */}
                      <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Age</div>
                            <input
                                type="number"
                                placeholder="Age..."
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Email</div>
                            <input
                                type="email"
                                placeholder="Email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                            />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Contact</div>
                            <input
                                type="text"
                                placeholder="Contact..."
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Select Time</div>
                            <select
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                            >
                                <option value="">Select a time...</option>
                                <option value="08:00">08:00 AM</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="13:00">13:00 PM</option>
                                <option value="14:00">14:00 PM</option>
                                <option value="15:00">15:00 PM</option>
                                {/* Add more time slots as needed */}
                            </select>
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Select Date</div>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Allergies</div>
                            <input
                                type="text"
                                placeholder="Allergies..."
                                value={allergies}
                                onChange={(e) => setAllergies(e.target.value)}
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
                            />
                        </div>
                    </div>


                    {/* Other form inputs remain unchanged */}

                    {error && <div className="text-red-500 pt-4">{error}</div>}

                    <div className="flex flex-row justify-center w-full gap-16 pt-10">
                        <div className="flex flex-row items-center justify-center gap-10">
                            <button
                                type="button"
                                onClick={() => navigate('/PatientLabServiceList')}
                                className="w-[180px] h-[50px] bg-[#1b5f75] rounded-xl text-white text-normal font-semibold"
                            >
                                Back to List
                            </button>
                            <button
                                type="submit"
                                className="w-[180px] h-[50px] bg-[#1b5f75] rounded-xl text-white text-normal font-semibold"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* ToastContainer to show toast messages */}
            <ToastContainer />
        </div>
    );
}

export default PatientLabBook;
