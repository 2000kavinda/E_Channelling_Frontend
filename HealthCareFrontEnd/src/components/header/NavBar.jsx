import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Images/Logo.png';
import { MdOutlineShoppingCart } from "react-icons/md";

function NavBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeLink, setActiveLink] = useState('Home'); 

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); 
  };

  return (
    <div className='sticky justify-between w-screen'>
      {/* navigation bar */}
      <div className='flex flex-row items-center justify-between w-screen h-20 px-10 shadow-lg'>
        <div className='flex flex-row justify-center h-full px-5 py-2 bg-white'>
          <img src={logo} alt='logo icon' className='rounded-lg' />
        </div>
        <div className='flex flex-row items-center justify-start h-full gap-4 text-lg font-semibold bg-white'>
          <Link
            to="#"
            className={`px-2 py-2 no-underline ${activeLink === 'Home' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('Home')}
          >
            Home
          </Link>
          <Link
            to="#"
            className={`px-2 py-2 no-underline ${activeLink === 'Doctors' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('Doctors')}
          >
            Doctors
          </Link>
          <Link
            to="#"
            className={`px-2 py-2 no-underline ${activeLink === 'Laboratory' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('Laboratory')}
          >
            Laboratory
          </Link>
          <Link
            to="#"
            className={`px-2 py-2 no-underline ${activeLink === 'About' ? 'text-[#005F7E]' : 'text-gray-800'
              } hover:text-[#005F7E]`}
            onClick={() => handleLinkClick('About')}
          >
            About
          </Link>
        </div>

        <div className='flex flex-row gap-6'>
          <button className='flex flex-row items-center h-12 gap-1 px-6 py-2 font-bold text-[#005F7E] border-2 border-[#005F7E] rounded-lg'>
            <MdOutlineShoppingCart className='w-5 h-5' /> Cart
          </button>

          <div className='relative'>
            <button className='px-8 rounded-lg py-2 bg-[#005F7E] font-bold h-12 text-white' onClick={() => toggleDropdown('Select')}>
              Select
            </button>
            {openDropdown === 'Select' && (
              <div className='absolute right-0 w-48 mt-2 bg-white border border-gray-300 shadow-lg'>
                <Link to="#" className='block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100'>Profile</Link>
                <Link to="#" className='block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100'>Notifications</Link>
                <Link to="#" className='block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100'>Booking History</Link>
                <Link to="#" className='block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100'>Sign out</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
