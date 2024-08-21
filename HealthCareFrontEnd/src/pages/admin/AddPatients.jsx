import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Profile from '../../assets/Images/Ellipse34.png'

function AddPatients() {
    const navigate = useNavigate();

    const handleAddNewClick = () => {
        navigate('/AdminSideBar');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[900px] py-10 bg-white">
            <div className="flex flex-row justify-start w-full gap-8 px-16 pb-5">
                <button className="w-[120px] py-2 bg-[#005F7E] text-white rounded-lg flex flex-row items-center gap-1 font-semibold text-lg justify-center" onClick={handleAddNewClick}>
                    <IoMdArrowRoundBack />
                    <div>Back</div>
                </button>
                <div className="text-3xl font-bold text-[#005F7E]">Fill the details</div>
            </div>

            {/* Details Pages */}
            <div className="w-11/12 h-[800px] bg-[#c9e2eb] rounded-lg px-10 py-10 flex flex-col">

                {/* Profile Picture */}
                <div className="flex flex-row h-[120px] w-full items-center gap-5 justify-center">
                    <div className="w-[120px] h-[120px] bg-black rounded-full">
                        <img src={Profile} />
                    </div>

                    <button className="w-[120px] h-[40px] py-2 bg-[#005F7E] rounded-lg text-white text-sm font-semibold">Upload</button>
                </div>


                {/* Text Boxes */}
                <div className="flex flex-col items-center gap-5 pt-10">
                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">First name</div>
                            <input type="text"
                                placeholder="First name..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" />
                        </div>


                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Second name</div>
                            <input type="text"
                                placeholder="Second name..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Age</div>
                            <input type="text"
                                placeholder="Registration number..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" />
                        </div>


                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Height</div>
                            <input type="text"
                                placeholder="NIC number..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Weight</div>
                            <input type="text"
                                placeholder="Age..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" />
                        </div>


                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Doctor</div>
                            <input type="text"
                                placeholder="Graduate from..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" />
                        </div>
                    </div>

                    {/* Input Row */}
                    <div className="flex flex-row justify-center w-full gap-16">
                        <div className="flex flex-col gap-1">
                            <div className="text-normal text-[#1b5f75] font-semibold">Diseases details</div>
                            <input type="text"
                                placeholder="Age..."
                                className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[860px] h-[120px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]" />
                        </div>
                    </div>

                    <div className="flex flex-row justify-center w-full gap-16 pt-10">
                        <div className="flex flex-row items-center justify-center gap-10">
                            <button className="w-[180px] h-[50px] bg-[#1b5f75] rounded-xl text-white text-normal font-semibold">Cancel</button>
                            <button className="w-[180px] h-[50px] bg-[#1b5f75] rounded-xl text-white text-normal font-semibold">Submit</button>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    )
}

export default AddPatients