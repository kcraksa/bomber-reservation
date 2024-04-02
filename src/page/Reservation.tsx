import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetPlaceDetail } from '../hooks/api/useGetPlaceDetail';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Reservation() {
  const navigate = useNavigate();
  const params = useLocation();
  
  const split = params.search.split("=");

  const { data: clubDetail } = useGetPlaceDetail({
    club_id: split[1],
    options: {
      enabled: !!split[1]
    }
  });

  // register
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

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
                  {clubDetail?.data[0]?.logo && (
                    <div className='bg-gray01 w-[80px] h-[80px]'></div>
                  )}
                  <div className='text-start flex flex-col'>
                    <h4 className='font-bold'>{clubDetail?.data[0]?.name}</h4>
                    <div className='text-sm'>{clubDetail?.data[0]?.address}</div>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                  <Link to={`tel:${clubDetail?.data[0]?.phone}`} target='_blank'>
                    <img src='src/assets/images/phone.svg' width={44} height={44} alt='Phone Icon' />
                  </Link>
                  <Link to={`https://maps.google.com/?q=${clubDetail?.data[0]?.latitude},${clubDetail?.data[0]?.longtitude}`} target='_blank'>
                    <img src='src/assets/images/location.svg' width={44} height={44} alt='Location Icon' />
                  </Link>
                </div>
              </div>

              <div className='bg-black01 rounded-lg p-3'>
                <div className='flex items-center'>
                  <div>
                    <img src='src/assets/images/electric.svg' width={44} height={44} alt='Electric' />
                  </div>
                  <div className='text-base font-bold'>Customer Information</div>
                </div>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    // Handle form submission here
                    console.log(values);
                    setSubmitting(false);
                  }}
                >
                  {() => (
                    <Form className='w-full flex flex-col items-start'>
                      <div className='flex w-full flex-col items-start p-3'>
                        <div className='text-sm mb-3'>Email</div>
                        <Field type='email' name='email' placeholder='email' className='w-full rounded-lg bg-[#000]' />
                        <ErrorMessage name='email' component='div' className='text-red-500' />
                      </div>
                      <div className='flex w-full flex-col items-start p-3 mb-3'>
                        <div className='text-sm mb-3'>Password</div>
                        <Field type='password' name='password' placeholder='password' className='w-full rounded-lg bg-[#000]' />
                        <ErrorMessage name='password' component='div' className='text-red-500' />
                      </div>
                      <div className='flex w-full flex-col items-start p-3 gap-3'>
                        <button className='bg-purple01 w-full py-3 rounded-lg text-base' onClick={() => navigate("/login")}>Login</button>
                        <button className='bg-orange01 w-full py-3 rounded-lg text-base'>Login using apps</button>
                        <button className='border border-purple01 w-full py-3 rounded-lg text-base' onClick={() => navigate("/guest")}>Reservation as guest</button>
                      </div>
                      <div className='flex w-full flex-col items-end p-3 gap-3'>
                        <div className='text-sm'>Want to be a member ? <button className='text-purple01' onClick={() => navigate(`/register?id=${split[1]}`)}>Register here</button></div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Reservation;
