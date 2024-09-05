import { useLocation } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function PatientDetailsPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const {patientsItem} = location.state || {};
  const handleAddNewClick = () => {
    navigate('/SideBar');
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen px-10 py-10">

      <div className="flex flex-row justify-start w-full gap-8 px-16 pb-5">
        <button className="w-[120px] py-2 bg-[#005F7E] text-white rounded-lg flex flex-row items-center gap-1 font-semibold text-lg justify-center" onClick={handleAddNewClick}>
          <IoMdArrowRoundBack />
          <div>Back</div>
        </button>
        <div className="text-3xl font-bold text-[#005F7E]">Create a schedule</div>
      </div>

      <div className='flex flex-col w-[600px] h-full bg-[#c0e2ee] rounded-xl px-10 py-10 items-center'>
        <div className="text-4xl font-bold text-[#005F7E] text-center">Patient Details</div>
          <div className="flex w-[150px] h-[150px] bg-black rounded-full mt-10">
              <img src={patientsItem.profileImage} alt="ProfileImage" className="w-full h-full" />
          </div>

        <div className='flex flex-col gap-4 mt-5'>
        {/* Name */}
          <div className="flex flex-row justify-center gap-4 text-lg font-semibold">
            <div className='text-3xl font-semibold px-8 py-2 bg-[#005F7E] rounded-xl text-white'>{patientsItem.pName}</div>
          </div>

          {/* Patient ID */}
          <div className="flex flex-row gap-4 mt-5 text-lg font-semibold">
            <div className='text-lg font-bold text-[#005F7E]'>Patient ID:</div>
              <div>{patientsItem.pId}</div>
          </div>

          {/* Booking date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
            <div className='text-lg font-bold text-[#005F7E]'>Booking date:</div>
              <div>2024-09-12</div>
          </div>

          {/* Birthday date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
            <div className='text-lg font-bold text-[#005F7E]'>Birthday date:</div>
              <div>{patientsItem.bDay}</div>
          </div>

          {/* Gender date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
            <div className='text-lg font-bold text-[#005F7E]'>Gender:</div>
              <div>{patientsItem.gender}</div>
          </div>

          {/* Contact number ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
            <div className='text-lg font-bold text-[#005F7E]'>Contact number:</div>
              <div>{patientsItem.contact}</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default PatientDetailsPage