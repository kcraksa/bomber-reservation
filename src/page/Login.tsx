import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className='flex gap-5'>
            <div className='w-1/2'>
              <div className='bg-gray01 rounded-lg h-[299px] w-full mb-5'></div>
              <div className='bg-black01 rounded-lg p-2 flex items-center justify-between'>
                <div className='flex items-center'>
                  <div>                  
                    <img src='src/assets/images/calendar.svg' width={44} height={44} alt='Calendar Icon' />
                  </div>
                  <div className='text-sm ml-4'>
                    Tue, Mar 26, 2024
                  </div>
                </div>
                <div className='flex items-center mr-5'>
                  <div>                  
                    <img src='src/assets/images/table.svg' width={44} height={44} alt='Calendar Icon' />
                  </div>
                  <div className='text-sm ml-4'>
                    Horse
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <div className='w-full bg-black01 rounded-lg p-5 flex justify-between gap-4 mb-5'>
                <div className='flex justify-center gap-5 items-center'>
                  <div className='bg-gray01 w-[80px] h-[80px]'></div>
                  <div className='text-start flex flex-col'>
                    <h4 className='font-bold'>KOR TAIPEI</h4>
                    <div className='text-sm'>5F, No. 201號, Section 4, Zhongxiao E Rd, Da’an District, Taipei City, Taiwan 106</div>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                  <div className='cursor-pointer'>
                    <img src='src/assets/images/phone.svg' width={44} height={44} alt='Phone Icon' />
                  </div>
                  <div className='cursor-pointer'>
                    <img src='src/assets/images/location.svg' width={44} height={44} alt='Location Icon' />
                  </div>
                </div>
              </div>

              <div className='bg-black01 rounded-lg p-3'>
                <div className='flex items-center'>
                  <div>
                    <img src='src/assets/images/electric.svg' width={44} height={44} alt='Electric' />
                  </div>
                  <div className='text-base font-bold'>Customer Information</div>
                </div>
                <div className='flex w-full flex-col items-start p-3'>
                  <div className='text-sm mb-3'>Email</div>
                  <input type='email' placeholder='email' className='w-full rounded-lg bg-[#000]' />
                </div>
                <div className='flex w-full flex-col items-start p-3'>
                  <div className='text-sm mb-3'>Password</div>
                  <input type='password' placeholder='password' className='w-full rounded-lg bg-[#000]' />
                </div>
                <div className='flex w-full flex-col items-start p-3 mb-3'>
                  <div className='text-sm mb-3'>Customer Phone Number</div>
                  <input type='text' placeholder='customer phone number' className='w-full rounded-lg bg-[#000]' />
                </div>
                <div className='flex w-full flex-col items-start p-3 gap-3'>
                  <button className='bg-purple01 w-full py-3 rounded-lg text-base'>Create Reservation</button>
                </div>
                <div className='flex w-full flex-col items-end p-3 gap-3'>
                  <div className='text-sm'>Change your mind ? <button className='text-purple01' onClick={() => navigate('/reservation')}>back to login page</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;
