import { AiOutlineFieldTime } from "react-icons/ai";
import { BiCabinet } from "react-icons/bi";
import NavBar from '../../components/header/NavBar';  
import { useNavigate } from 'react-router-dom'; 
import paclab from '../../assets/Images/paclab.png';

import LabImage from '../../assets/Images/LabImage.png';

function PatientLabDashboard() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col pt-10">
            {/* Navigation Bar */}
            <NavBar />

            {/* Image Section */}
            <div className="flex justify-center my-8">
                <img src={LabImage} alt="Lab" className="w-full h-auto rounded-lg shadow-lg" />
            </div>


            {/* Top bar */}
            <div className="flex flex-row justify-between w-full">

                {/* Card Section */}
                <div className="flex flex-row justify-center w-full gap-8 pt-10">
                    {/* Download Report Card */}
                    <div
                        className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5 cursor-pointer"
                        onClick={() => navigate('/PatientLabReport')} // Navigate to reportList page
                    >
                        <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
                            <BiCabinet className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
                            <div className="font-semibold text-[#414141]">Download Report</div>
                        </div>
                    </div>

                    {/* Book Lab Service Card */}
                    <div
                        className="flex flex-row bg-[#E6F2F6] w-1/3 h-[150px] rounded-lg items-center px-5 gap-5 cursor-pointer"
                        onClick={() => navigate('/PatientLabServiceList')} 
                    >
                        <div className="w-[70px] h-[70px] bg-[#00394C] rounded-lg justify-center items-center flex flex-col">
                            <AiOutlineFieldTime className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
                            <div className="font-semibold text-[#414141]">Book Lab Service</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Image and Text Section */}
<div className="flex justify-between items-center my-8">
   

    {/* Text */}
    <div className="ml-8">
        <h1 className="text-2xl font-bold">Welcome to Medicare</h1>
        <h2 className="text-xl font-semibold">24 HOUR SERVICE</h2>
        <p className="mt-2 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </div>
     {/* Image */}
     <div className="w-[2000px] h-[400px]">
        <img  alt="Lab" src={paclab} className="w-full h-full rounded-lg shadow-lg" />
    </div>
</div>

        </div>
    );
}

export default PatientLabDashboard;
