import { useLocation } from 'react-router-dom';

function PatientDetailsPage() {

  const location = useLocation();

  const {patientsItem} = location.state || {};

  
  return (
    <div className="flex flex-col w-screen h-screen">

        <div className='flex'></div>
        <div className="text-3xl font-bold text-blue-800">Patient Details</div>
          <div className="flex w-[100px] h-[100px] bg-black rounded-full">
              <img src={patientsItem.profileImage} alt="ProfileImage" className="w-full h-full" />
          </div>

        {/* Name */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
            <div>Name:</div>
            <div>{patientsItem.pName}</div>
          </div>

          {/* Patient ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Patient ID:</div>
              <div>{patientsItem.pId}</div>
          </div>

          {/* Booking date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Booking date:</div>
              <div>2024-09-12</div>
          </div>

          {/* Birthday date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Birthday date:</div>
              <div>{patientsItem.bDay}</div>
          </div>

          {/* Gender date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Gender:</div>
              <div>{patientsItem.gender}</div>
          </div>

          {/* Contact number ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Contact number:</div>
              <div>{patientsItem.contact}</div>
          </div>
    </div>
  )
}

export default PatientDetailsPage