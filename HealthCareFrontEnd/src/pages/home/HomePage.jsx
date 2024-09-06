import SliderImage from '../../assets/Images/image6.png'
import Marquee from "react-fast-marquee";
import Image1 from '../../assets/Images/1.png'
import Image2 from '../../assets/Images/2.png'
import Image3 from '../../assets/Images/3.png'
import Image4 from '../../assets/Images/4.png'
import Image5 from '../../assets/Images/5.png'
import Image6 from '../../assets/Images/6.png'
import Image7 from '../../assets/Images/7.png'
import Image8 from '../../assets/Images/8.png'
import Image9 from '../../assets/Images/9.png'
import Image10 from '../../assets/Images/10.png'
import Banner from '../../assets/Images/banner.jpg'
// import FloatingButton from '../../components/FloatingButton/FloatingButton.jsx'
import { FaBriefcaseMedical } from "react-icons/fa6";
import { SiUikit } from "react-icons/si";
import { TbGenderAndrogyne } from "react-icons/tb";
import { GiHeartOrgan } from "react-icons/gi";
import { GiDna2 } from "react-icons/gi";
import { GiBrain } from "react-icons/gi";
import Footer from '../../components/footer/Footer.jsx';
import Chat from '../../components/chat/chat.jsx';
import HomeNavBar from '../../components/header/HomeNavBar.jsx';

function HomePage() {

  

  return (
    <div className="flex flex-col w-screen">
    <HomeNavBar/>

        {/* Banner */}
          <div className="flex flex-row w-full h-[600px] bg-gradient-to-r from-[#79B4AD] to-[#E6F6F4] pt-10 px-20 overflow-hidden">
            <img src={SliderImage} alt="" className='mt-10 w-[650px] h-[580px]'/>
            <div className='flex flex-col justify-center w-full h-full gap-2'>
                  <div className='text-6xl font-black text-[#005F7E]'>Do not Let Your Health</div>
                  <div className='text-5xl font-black text-[#0c2d37]'>Take a Back Seat</div>
                  <div className='mt-4 text-[#07191f]'>Maintaining good health is essential for a balanced life, as it allows both the mind and body to function at their best, enabling us to pursue our goals with energy and resilience.</div>
                  <div className='flex flex-row justify-start w-full mt-4'><button className='px-10 py-3 bg-[#005F7E] text-lg font-bold text-white rounded-lg hover:bg-[#0c2d37]'>More Details</button></div>
            </div>
              
          </div>

          {/* Image Slider */}
          <div className='flex flex-col items-center w-full pt-16'>
            <div className='text-5xl font-bold text-[#005F7E]'>Our Partners</div>
              <div className='text-base font-semibold mt-4 text-[#767777] w-2/3 text-center'>Maintaining good health is essential for a balanced life</div>
              {/* Icon slider start */}
              <div className="justify-center hidden ml-10 mr-10 bg-white sm:grid lg:flex md:w-[1440px] mt-20">
                  <Marquee direction="left" speed={20} gradient gradientColor="white" className='z-20 mb-8'>

                      <img src={Image1} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image2} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image3} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image4} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image5} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image6} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image7} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image8} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image9} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image10} alt="" className="w-32 h-32 mx-8" />

                      <img src={Image1} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image2} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image3} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image4} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image5} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image6} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image7} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image8} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image9} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image10} alt="" className="w-32 h-32 mx-8" />

                      <img src={Image1} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image2} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image3} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image4} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image5} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image6} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image7} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image8} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image9} alt="" className="w-32 h-32 mx-8" />
                      <img src={Image10} alt="" className="w-32 h-32 mx-8" />

                  </Marquee>
              </div>
          </div>


          {/* About us */}
          <div className='flex flex-row w-full px-20 pt-20 mt-16 h-[600px] items-center bg-[#dcecf2]'>
            <div className='flex flex-col w-1/2'>
                  <div className='text-3xl text-[#005F7E]'>About us</div>
                  <div className='text-6xl font-bold text-[#0a222a]'>ProHealth is a team of experienced medical professionals</div>
                  <div className='text-lg mt-4 text-[#0a222a]'>Maintaining good health is essential for a balanced life, as it allows both the mind and body to function at their best, enabling us to pursue our goals with energy and resilience.</div>
            </div>

            <div className='flex flex-col w-1/2 px-6'>
                <img src={Banner} alt='' className='rounded-lg'/>
            </div>
          </div>


            
  


          {/* Floating Button */}
          <Chat/>

          {/* Our Department */}
          <div className='flex flex-col items-center w-full mt-16'>
              <div className='text-[#005F7E] text-lg font-semibold text-center'>Our Department</div>
              <div className='text-[#0a232b] text-5xl font-bold text-center'>For Your Health</div>

              <div className='flex flex-row gap-4 mt-16 mb-5'>
                  <div className='flex flex-row w-[450px] h-[200px] rounded-xl border-4 border-[#005F7E] hover:bg-[#005F7E] hover:text-white items-center justify-center text-[#005F7E] gap-8'>
                      <FaBriefcaseMedical className='w-16 h-16'/>
                      <div className='flex flex-col text-2xl font-bold'>
                          <div>Emergency</div>
                          <div>Department</div></div>
                  </div>
                  <div className='flex flex-row w-[450px] h-[200px] rounded-xl border-4 border-[#005F7E] hover:bg-[#005F7E] hover:text-white items-center justify-center text-[#005F7E] gap-8'>
                      <SiUikit className='w-16 h-16' />
                      <div className='flex flex-col text-2xl font-bold'>
                          <div>Pediatric</div>
                          <div>Department</div></div>
                  </div>
                  <div className='flex flex-row w-[450px] h-[200px] rounded-xl border-4 border-[#005F7E] hover:bg-[#005F7E] hover:text-white items-center justify-center text-[#005F7E] gap-8'>
                      <TbGenderAndrogyne className='w-16 h-16' />
                      <div className='flex flex-col text-2xl font-bold'>
                          <div>Gynecology</div>
                          <div>Department</div></div>
                  </div>
              </div>

              <div className='flex flex-row gap-4 mb-16'>
                  <div className='flex flex-row w-[450px] h-[200px] rounded-xl border-4 border-[#005F7E] hover:bg-[#005F7E] hover:text-white items-center justify-center text-[#005F7E] gap-8'>
                      <GiHeartOrgan className='w-16 h-16' />
                      <div className='flex flex-col text-2xl font-bold'>
                          <div>Cardiology</div>
                          <div>Department</div></div>
                  </div>
                  <div className='flex flex-row w-[450px] h-[200px] rounded-xl border-4 border-[#005F7E] hover:bg-[#005F7E] hover:text-white items-center justify-center text-[#005F7E] gap-8'>
                      <GiDna2 className='w-16 h-16' />
                      <div className='flex flex-col text-2xl font-bold'>
                          <div>Neurology</div>
                          <div>Department</div></div>
                  </div>
                  <div className='flex flex-row w-[450px] h-[200px] rounded-xl border-4 border-[#005F7E] hover:bg-[#005F7E] hover:text-white items-center justify-center text-[#005F7E] gap-8'>
                      <GiBrain className='w-16 h-16' />
                      <div className='flex flex-col text-2xl font-bold'>
                          <div>Psychiatry</div>
                          <div>Department</div></div>
                  </div>
              </div>
              
          </div>

          <Footer/>
    </div>
  )
}

export default HomePage