

function PatientDetailsPage() {
  return (
    <div className="flex flex-col w-screen h-screen">
        <div className="text-3xl font-bold text-blue-800">Patient Details</div>
          <div className="flex w-[100px] h-[100px] bg-black rounded-full">
              <img src="" alt="ProfileImage" className="w-full h-full" />
          </div>

        {/* Name */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
            <div>Name:</div>
            <div>Hiran kavindu</div>
          </div>

          {/* Patient ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Patient ID:</div>
              <div>1222</div>
          </div>

          {/* Booking date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Booking date:</div>
              <div>2024-09-12</div>
          </div>

          {/* Birthday date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Birthday date:</div>
              <div>2024-09-12</div>
          </div>

          {/* Gender date ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Gender:</div>
              <div>2024-09-12</div>
          </div>

          {/* Contact number ID */}
          <div className="flex flex-row gap-4 text-lg font-semibold">
              <div>Contact number:</div>
              <div>08713364748</div>
          </div>
    </div>
  )
}

export default PatientDetailsPage