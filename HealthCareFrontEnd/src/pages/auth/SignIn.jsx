import SignInPic from '../../assets/Images/signIn.png';
import Logo from '../../assets/Images/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginService } from '../../service/LoginService'; 

function SignIn() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleAddNewClick = () => {
        setTimeout(() => {
            navigate('/SignUp');
        }, 300);
    };
    

    const handleForgotPassword = () => {
        setTimeout(() => {
            navigate('/Verification');
        }, 300);
    };

    async function login(event) {
        event.preventDefault();
        try {
            const response = await loginService(email, pw);
            localStorage.setItem("regNo", response.data.body.drRegNo);
            localStorage.setItem("drName", response.data.body.drName);
            localStorage.setItem("profileImage", response.data.body.profileImage);

            const role = response.data.headers.role[0];
            console.log(response.data.headers.role);

            if (role === "DOCTOR") {
                // navigate('/SideBar');
                navigate('/SideBar');
                // navigate('/NavBar');
            } else if (role === "LAB_PERSON") {
                navigate('/SideBarLabPerson');
            } else if (role === "PATIENT") {
                navigate('/PatientLabDashboard ');
                // /PatientDashboard
            } else if (role === "ADMIN") {
                navigate('/AdminSideBar');
            } 
            else {
                alert("Incorrect Credentials");
            }
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="flex flex-row w-4/6 h-5/6 bg-slate-200 rounded-2xl">
                <div className="flex flex-col w-1/2 h-full rounded-l-2xl bg-[#94dbf2] overflow-hidden px-6 pt-5">
                    <div className='flex flex-row w-full h-16'>
                        <img src={Logo} alt="Logo" />
                    </div>
                    <img src={SignInPic} alt="Sign In" />
                </div>

                <div className='flex flex-col items-center justify-center w-1/2 h-full gap-4 px-10 py-10'>
                    <div className='text-5xl font-bold text-[#1b5a6f]'>Sign in</div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1 pt-10'>
                            <div className='text-normal font-base text-[#707171] pl-2'>Email address</div>
                            <input
                                type="email"
                                placeholder="Email address..."
                                className="px-4 py-2 bg-[#f1f1f1] text-normal w-[400px] h-[50px] rounded-full focus:outline-none focus:ring-1 focus:ring-[#b8baba] border-[#b8baba] border-2 text-[#297d99]"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <div className='text-normal font-base text-[#707171] pl-2'>Password</div>
                            <input
                                type="password"
                                placeholder="Password..."
                                className="px-4 py-2 bg-[#f1f1f1] text-normal w-[400px] h-[50px] rounded-full focus:outline-none focus:ring-1 focus:ring-[#b8baba] border-[#b8baba] border-2 text-[#297d99]"
                                value={pw}
                                onChange={(event) => setPw(event.target.value)}
                            />
                        </div>
                        <button className='flex flex-row pl-2 text-sm text-[#1b5a6f] font-semibold' onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        className='flex flex-row w-[400px] h-[45px] bg-[#1b5a6f] rounded-full mt-2 justify-center items-center text-white text-lg font-semibold'
                        onClick={login}
                    >
                        Sign in
                    </button>

                    <div className='flex flex-row justify-center w-full pt-2 text-sm'>
                        <div>Dont have an account?</div>
                        <button className='pl-2 font-bold text-[#1b5a6f]' onClick={handleAddNewClick}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
