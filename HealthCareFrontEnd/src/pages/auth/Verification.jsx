import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { VerificationService } from '../../service/VerificationService';


function Verification() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {

        e.preventDefault();
        try {
            const response = await VerificationService(email);
            console.log(response.data);
        } catch (err) {
            alert(err.message);
        }

        setTimeout(() => {
            navigate('/ForgotPassword', {state: {email}});
        }, 300);

        


    };



    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="flex flex-row w-4/6 h-5/6 bg-slate-200 rounded-2xl">

                <div className='flex flex-col items-center justify-center w-full h-full gap-4 px-10 py-10'>
                    <div className='text-5xl font-bold text-[#1b5a6f]'>Verification</div>
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
                    </div>

                    <button
                        className='flex flex-row w-[400px] h-[45px] bg-[#1b5a6f] rounded-full mt-2 justify-center items-center text-white text-lg font-semibold'
                        onClick={handleForgotPassword}
                    >
                        Send Verification
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Verification;
