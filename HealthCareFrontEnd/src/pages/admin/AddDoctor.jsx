import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function AddDoctor() {
    const navigate = useNavigate();

    const handleAddNewClick = () => {
        navigate('/AdminSideBar');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen py-10 bg-white">
            <div className="flex flex-row justify-start w-full px-20 pb-5">
                <button className="w-[120px] py-2 bg-[#005F7E] text-white rounded-lg flex flex-row items-center gap-1 font-semibold text-lg justify-center" onClick={handleAddNewClick}>
                    <IoMdArrowRoundBack />
                    <div>Back</div>
                </button>
            </div>

            {/* Details Pages */}
            <div className="w-5/6 h-5/6 bg-[#c9e2eb] rounded-lg"></div>
        </div>
    )
}

export default AddDoctor