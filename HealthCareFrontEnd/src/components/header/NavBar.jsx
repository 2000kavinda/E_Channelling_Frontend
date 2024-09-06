import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Images/Logo.png';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [activeLink, setActiveLink] = useState('Home'); 
  const navigate = useNavigate();


  const handleLinkClick = (link) => {
    setActiveLink(link); 
  };

  const handleSignInNavigation = () => {
    navigate('/SignIn');
  };

  return (

    <div className='sticky top-0 w-screen '>
      {/* navigation bar */}
      <div className='flex flex-row items-center justify-between w-screen h-20 px-10 bg-white shadow-lg '>

        <div className='flex flex-row justify-center h-full px-5 py-2 bg-white'>
          <img src={logo} alt='logo icon' className='rounded-lg' />
        </div>
        <div className='flex flex-row items-center justify-start h-full gap-4 text-lg font-semibold bg-white'>
          <Link
            to="/HomePageInner"
            className={`px-2 py-2 no-underline ${activeLink === 'Home' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('Home')}
          >
            Home
          </Link>
          <Link

            to="/BookAnAppointment"

            className={`px-2 py-2 no-underline ${activeLink === 'Doctors' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('Doctors')}
          >
            Doctors
          </Link>
         
          <Link
            to="/PatientBookHistory"
            className={`px-2 py-2 no-underline ${activeLink === 'About' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('About')}
          >
           BookHistory
          </Link>
          <Link
            to="/MedicalDashboard"
            className={`px-2 py-2 no-underline ${activeLink === 'About' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('About')}
          >
          P-Dashboard
          </Link> <Link
            to="/PatientNotifications"
            className={`px-2 py-2 no-underline ${activeLink === 'About' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('About')}
          >
          p-Notification
          </Link>
          
          <Link
            to="/PatientLabDashboard"
            className={`px-2 py-2 no-underline ${activeLink === 'Laboratory' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('Laboratory')}
          >
            Laboratory
          </Link>
        </div>
        

        <div className='flex flex-row gap-6'>

          <div className='relative'>
            <button className='px-8 rounded-lg py-2 bg-[#005F7E] font-bold h-12 text-white' onClick={handleSignInNavigation}>
              Sign Out
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}


export default NavBar;

