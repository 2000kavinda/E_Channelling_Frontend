import HomeNavBar from "../../components/header/HomeNavBar"
import SliderImage from '../../assets/Images/image4.png'
import Footer from "../../components/footer/Footer"


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

          {/* Image and the About us data */}
          <div className="flex flex-row items-center w-full px-10">
            <div className="w-1/2 h-[600px]">
                  <img src={SliderImage} alt="" className='mt-10 w-[650px] h-[480px] rounded-lg'/>
            </div>

            <div className="flex-col w-1/2 pt-16">
                  <div className="mb-6 text-lg">Welcome to MediCare, your trusted partner in healthcare. At MediCare, we are committed to providing exceptional medical services with compassion, integrity, and innovation. Our state-of-the-art facilities and highly qualified medical professionals are dedicated to delivering world-class healthcare to every patient, ensuring their well-being and recovery.</div>
                  <div className="mb-6 text-lg">Founded with the vision of offering accessible, affordable, and high-quality healthcare, MediCare has grown into a leading medical institution. Our comprehensive range of services spans across multiple specialties, including emergency care, diagnostics, surgery, maternity, pediatrics, and preventive medicine. We prioritize patient safety and satisfaction, and our team works around the clock to ensure that you receive personalized care tailored to your unique needs.</div>
                  <div className="text-lg">At MediCare, we believe in continuous improvement and the integration of the latest medical technologies. We are constantly evolving to meet the needs of our patients, while adhering to the highest standards of medical ethics and care.

                      Your health is our priority. Together, we strive to build a healthier future for all.</div>
            </div>
          </div>

          <Footer/>
    </div>
  )
}

export default AboutUs