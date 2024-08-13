import DoctorPicture from '../../assets/Images/Ellipse34.png';
import { TbLogout2 } from "react-icons/tb";


function SideBar() {
  return (
    <div className="flex flex-row flex-1 w-screen h-screen">
      <div className="flex flex-col justify-start w-1/4 h-full bg-[#00394C] items-center pt-20">
        {/* Profile Picture */}
        <div className="flex w-[162px] h-[162px] bg-black rounded-full">
          <img src={DoctorPicture} alt="ProfileImage" className="w-full h-full" />
        </div>

        {/* Doctor Name */}
        <div className='pt-[29px] text-2xl font-bold text-white'>Dr.Hiran Welagedara</div>

        {/** Doctor Specialist Area */}
        <div className='bg-[#D9F2EF] rounded-md px-4 py-2 mt-4 text-sm font-bold text-[#00394C]'>
          Eye Surgeon
        </div>

        {/* Log out Button */}
        <div className='flex flex-col items-center justify-end w-full h-full'>
          <button className='w-full flex flex-row h-[60px] border-top border-[#D9D9D9] border-t-2 justify-center items-center text-white font-semibold'>
            <div><TbLogout2 className='w-6 h-6'/></div>
            <div className='pl-2 text-lg'>Logout</div>

          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar