import HomeNavBar from "../../components/header/HomeNavBar"
import SliderImage from '../../assets/Images/image1.png'


function AboutUs() {
  return (
      <div className="flex flex-col w-screen">
        <HomeNavBar/>
          {/* Banner */}
          <div className="flex flex-row w-full h-[300px] bg-gradient-to-r from-[#79B4AD] to-[#E6F6F4] overflow-hidden">
              <div className='flex flex-col items-center justify-center w-full h-full gap-2'>
                  <div className='text-3xl font-black text-[#005F7E]'>About us</div>
                  <div className='text-6xl font-black text-[#0c2d37]'>MEDI CARE</div>
              </div>
          </div>
    </div>
  )
}

export default AboutUs