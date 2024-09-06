import Logo from '../../assets/Images/FooterLogo.png'

function Footer() {
  return (
    <div className="flex flex-col w-screen h-[480px] bg-[#002C3B] px-10 py-10">
      <div className="flex flex-row justify-start w-full">
        <img src={Logo} alt="" className='w-[200px] h-[100px]'/>
      </div>

      <div className='flex flex-row justify-between w-full gap-10 mt-4'>
      <div className='flex flex-row gap-10'>
        <div className='flex flex-col w-[200px] gap-6'>
          <div className='text-lg  text-[#CFCFCF]'>Home Page</div>
          <div className='text-lg  text-[#CFCFCF]'>Doctor Booking</div>
          <div className='text-lg  text-[#CFCFCF]'>Laboratory Service</div>
          <div className='text-lg  text-[#CFCFCF]'>About us</div>
        </div>

        <div className='flex flex-col w-[200px] gap-6'>
          <div className='text-lg  text-[#CFCFCF]'>FQA's</div>
          <div className='text-lg  text-[#CFCFCF]'>Privacy Policy</div>
            <div className='text-lg  text-[#CFCFCF]'>Shipping and Returns</div>
            <div className='text-lg  text-[#CFCFCF]'>Terms & Conditions</div>
        </div>

        <div className='flex flex-col w-[200px] gap-6'>
          <div className='text-lg  text-[#CFCFCF]'>Home Page</div>
          <div className='text-lg  text-[#CFCFCF]'>Doctor Booking</div>
          <div className='text-lg  text-[#CFCFCF]'>Laboratory Service</div>
          <div className='text-lg  text-[#CFCFCF]'>About us</div>
        </div>
        </div>


        {/* Mail Subscribe button */}
        <div className='flex flex-col items-end'>
          <div className='text-3xl text-[#CFCFCF] font-bold'>News Letter Subscribe</div>
          <div className='text-[#CFCFCF] font-base mt-4'>Privacy Get instant updates about our new products and special promos!</div>
          <div className='flex flex-row mt-4'>
            <input
              type="email"
              placeholder="Your Email Address"
              className="px-4 py-2 bg-[#f1f1f1] text-normal w-[400px] h-[50px] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#b8baba] border-[#b8baba] border-2 text-[#297d99]"
            />
            <button className='px-2 w-[150px] font-semibold bg-[#007F6D] text-white'>Subscribe</button>
          </div>
        </div>

        
      </div>
      {/* Divider */}
      <div className='flex flex-row w-full h-[1px] bg-[#f1f1f1] mt-16'></div>
      <div className='mt-2 text-center text-[#f1f1f1]'>© 2024 Medicare. All rights reserved</div>
    </div>
  )
}

export default Footer