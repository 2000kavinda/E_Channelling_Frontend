import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Images/Logo.png';
import { useNavigate } from 'react-router-dom';

function HomeNavBar() {
    const [activeLink, setActiveLink] = useState('Home');
    const navigate = useNavigate();

    

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleAddNewClick = () => {
        navigate('/SignIn');
    };

    const handleSignUp = () => {
        navigate('/SignUp');
    };


    return (
        <div className='sticky top-0 z-50 w-screen'>
            {/* navigation bar */}
            <div className='flex flex-row items-center justify-between w-screen h-20 px-10 bg-white shadow-lg z-[9999]'>
                <div className='flex flex-row justify-center h-full px-5 py-2 bg-white'>
                    <img src={logo} alt='logo icon' className='rounded-lg' />
                </div>
                <div className='flex flex-row items-center justify-start h-full gap-4 text-lg font-semibold bg-white'>
                    <Link
                        to="/HomePage"
                        className={`px-2 py-2 no-underline ${activeLink === 'Home' ? 'text-[#005F7E]' : 'text-gray-800'
                            } hover:text-[#005F7E]`}
                        onClick={() => handleLinkClick('Home')}
                    >
                        Home
                    </Link>
                    
                    
                    <Link
                        to="/AboutUs"
                        className={`px-2 py-2 no-underline ${activeLink === 'About' ? 'text-[#005F7E]' : 'text-gray-800'
                            } hover:text-[#005F7E]`}
                        onClick={() => handleLinkClick('About')}
                    >
                        About
                    </Link>

                    <Link
                        to="/ContactUs"
                        className={`px-2 py-2 no-underline ${activeLink === 'Contact us' ? 'text-[#005F7E]' : 'text-gray-800'
                            } hover:text-[#005F7E]`}
                        onClick={() => handleLinkClick('Contact us')}
                    >
                        Contact us
                    </Link>
                </div>

                <div className='flex flex-row gap-6'>
                    <button className='flex flex-row items-center h-12 gap-1 px-6 py-2 font-bold text-[#005F7E] border-2 border-[#005F7E] rounded-lg' onClick={handleSignUp}>
                         Sign up
                    </button>

                    <div className='relative'>
                        <button className='px-8 rounded-lg py-2 bg-[#005F7E] font-bold h-12 text-white' onClick={handleAddNewClick}>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeNavBar;