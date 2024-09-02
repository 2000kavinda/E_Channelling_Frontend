import SignInPic from '../../assets/Images/signIn.png';
import Logo from '../../assets/Images/Logo.png';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

    const handleAddNewClick = () => {
        setTimeout(() => {
            navigate('/SignIn');
        }, 300); // Adjust the delay time in milliseconds (300ms in this example)
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="flex flex-row w-4/6 h-5/6 bg-slate-200 rounded-2xl">
                
                <div className='flex flex-col items-center justify-center w-1/2 h-full gap-4 px-10 py-10'>
                    <div className='text-5xl font-bold text-[#1b5a6f]'>Sign up</div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1 pt-10'>
                            <div className='text-normal font-base text-[#707171] pl-2'>Email address</div>
                            <input type="text"
                                placeholder="Email address..."
                                className="px-4 py-2 bg-[#f1f1f1] text-normal w-[400px] h-[50px] rounded-full focus:outline-none focus:ring-1 focus:ring-[#b8baba] border-[#b8baba] border-2 text-[#707171]" />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <div className='text-normal font-base text-[#707171] pl-2'>Password</div>
                            <input type="text"
                                placeholder="Password..."
                                className="px-4 py-2 bg-[#f1f1f1] text-normal w-[400px] h-[50px] rounded-full focus:outline-none focus:ring-1 focus:ring-[#b8baba] border-[#b8baba] border-2 text-[#707171]" />
                        </div>
                        <button className='flex flex-row pl-2 text-sm text-[#1b5a6f] font-semibold'>
                            Forgot Password?
                        </button>
                    </div>

                    <button className='flex flex-row w-[400px] h-[45px] bg-[#1b5a6f] rounded-full mt-2 justify-center items-center text-white text-lg font-semibold'>Sign in</button>

                    <div className='flex flex-row justify-center w-full pt-2 text-sm'>
                        <div>Dont have an account?</div>
                        <button className='pl-2 font-bold text-[#1b5a6f]' onClick={handleAddNewClick}>Sign in</button>
                    </div>
                </div>


                <div className="flex flex-col w-1/2 h-full rounded-r-2xl bg-[#7ae6db] overflow-hidden px-6 pt-5">
                    <div className='flex flex-row w-full h-16'>
                        <img src={Logo} />
                    </div>
                    <img src={SignInPic} />
                </div>
            </div>
        </div>
    )
}

export default SignUp;