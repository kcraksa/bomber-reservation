import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetPlaceDetail } from '../hooks/api/useGetPlaceDetail';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {format} from "date-fns";
import { useRegisterCustomer } from '../hooks/api/useRegisterCustomer';
import { login } from '../hooks/api/useLoginCustomer';
import { useGetTableByDate } from '../hooks/api/useGetTableByDate';
import { usePostOrder } from '../hooks/api/usePostOrder';
import toast from 'react-hot-toast';
import { ResponseTableByDateTableList } from '../interfaces/interfaces';
import { usePostGuestReservation } from '../hooks/api/usePostGuestReservation';

function Reservation() {
  const navigate = useNavigate();
  const params = useLocation();
  const queryParam = new URLSearchParams(params.search);

  const [table, setTable] = useState<ResponseTableByDateTableList[]>([]);

  const { data: clubDetail } = useGetPlaceDetail({
    club_id: queryParam.get("id") ?? '-',
    options: {
      enabled: !!queryParam.get("id")
    }
  });

  const { data: dataTable } = useGetTableByDate({
    club_id: queryParam.get("id") ?? '-',
    year_month_day: queryParam.get("date") ?? '-',
    options: {
      enabled: !!queryParam.get("id")
    }
  })

  useEffect(() => {
    const tableData = dataTable?.data?.table_list?.filter((table) => table.tableId === queryParam.get("table")) ?? [];
    setTable(tableData);
  }, [dataTable]);

  // register
  const validationSchema = Yup.object().shape({
    // email: Yup.string().email('Invalid email').when).required('Email is required'),
    // password: Yup.string().is([
    //   params.pathname !== '/guest'
    // ]).required('Password is required'),
    // customer_phone_number: Yup.string().required('Customer Phone Number is required'),
  });

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className='flex lg:flex-row flex-col gap-5'>
            <div className='lg:w-1/2'>
              <div className='bg-gray01 rounded-lg h-[299px] w-full mb-5'>
                <img src={clubDetail?.data[0]?.bannerImage} alt='Banner' />
              </div>
              <div className='bg-black01 rounded-lg p-2 flex items-center justify-between'>
                <div className='flex items-center'>
                  <div>                  
                    <img src='src/assets/images/calendar.svg' width={44} height={44} alt='Calendar Icon' />
                  </div>
                  <div className='text-sm ml-4'>
                    {format(queryParam.get("date") ?? new Date(), "E, MMM d, yyyy")}
                  </div>
                </div>
                <div className='flex items-center mr-5'>
                  <div>                  
                    <img src='src/assets/images/table.svg' width={44} height={44} alt='Calendar Icon' />
                  </div>
                  <div className='text-sm ml-4'>
                    {table[0]?.text}
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:w-1/2'>
              <div className='w-full bg-black01 rounded-lg p-5 flex lg:flex-row flex-col justify-between gap-4 mb-5'>
                <div className='flex lg:justify-center gap-5 items-center'>
                  {clubDetail?.data[0]?.logo && (
                    <div className='bg-gray01 w-[80px] h-[80px]'></div>
                  )}
                  <div className='text-start flex flex-col'>
                    <h4 className='font-bold'>{clubDetail?.data[0]?.name}</h4>
                    <div className='text-sm'>{clubDetail?.data[0]?.address}</div>
                  </div>
                </div>
                <div className='flex lg:justify-center items-center gap-5'>
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
                  {params.pathname === '/register' ? (
                    <div className='text-base font-bold'>Register new account</div>
                  ) : (
                    <div className='text-base font-bold'>Customer Information</div>
                  )}
                </div>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    name: '',
                    customer_phone_number: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    if (params.pathname === '/register') {
                      await useRegisterCustomer({
                        data: {
                          firebase_id: '',
                          username: values.email,
                          phone: values.customer_phone_number,
                          password: values.password,
                          email: values.email,
                          photo_url: '',
                          gender: ''
                        }
                      })
                    }
                    if (params.pathname === '/login') {
                      await login({
                        data: {
                          password: values.password,
                          phone: values.customer_phone_number,
                        }
                      }).then(async (resp) => {

                        const tableData = dataTable?.data?.table_list?.filter((table) => table.tableId === queryParam.get("table")) ?? [];
                      
                        await usePostOrder({
                          data: {
                            customer_id: resp?.data.id ?? "",
                            club_id: queryParam.get("id") ?? '-',
                            booking_date: queryParam.get("date") ?? "",
                            total_price: tableData[0]?.price,
                            disc: 0,
                            total_guest: 1,
                            table_id: tableData[0]?.tableId,
                            user_deposit: tableData[0]?.minDeposit,
                            payment_method: "credit card",
                            member_invited: [
                              "michael"
                            ],
                            is_full_payment: 1,
                            coupon_used: 0,
                            source: "table booking apps",
                            card_number: "12345678",
                            card_cvc: "123",
                            card_expiry: "01/29",
                            promotion_ids: [
                              "string"
                            ]
                          }
                        }).then(() => {
                          navigate('/');
                          toast.success("Order success!");
                        })
                      });
                    }
                    if (params.pathname === '/guest') {
                      await usePostGuestReservation({
                        data: {
                          club_id: queryParam.get("id") ?? "",
                          name: values.name,
                          phone: values.customer_phone_number,
                          email: values.email
                        }
                      }).then((resp) => {
                        navigate('/');
                        toast.success(resp?.message ?? "Success");                        
                      })
                    }
                  }}
                >
                  {({isSubmitting}) => (
                    <Form className='w-full flex flex-col items-start'>
                      {params.pathname !== '/login' && (
                        <div className='flex w-full flex-col items-start p-3'>
                          <div className='text-sm mb-3'>Email</div>
                          <Field type='email' name='email' placeholder='email' className='w-full rounded-lg bg-[#000]' />
                          <ErrorMessage name='email' component='div' className='text-red-500 text-sm' />
                        </div>
                      )}
                      {(params.pathname === '/guest') ? (
                        <div className={`flex w-full flex-col items-start p-3 mb-3`}>
                          <div className='text-sm mb-3'>Name</div>
                          <Field type='text' name='name' placeholder='name' className='w-full rounded-lg bg-[#000]' />
                          <ErrorMessage name='name' component='div' className='text-red-500 text-sm' />
                        </div>
                      ) : (
                        <div className='flex w-full flex-col items-start p-3'>
                          <div className='text-sm mb-3'>Password</div>
                          <Field type='password' name='password' placeholder='password' className='w-full rounded-lg bg-[#000]' />
                          <ErrorMessage name='password' component='div' className='text-red-500 text-sm' />
                        </div>
                      )}
                      {(params.pathname !== '/reservation') && (
                        <div className={`flex w-full flex-col items-start p-3 mb-3 ${params.pathname === '/login' && 'order-first'}`}>
                          <div className='text-sm mb-3'>Customer Phone Number</div>
                          <Field type='text' name='customer_phone_number' placeholder='customer phone number' className='w-full rounded-lg bg-[#000]' />
                          <ErrorMessage name='customer_phone_number' component='div' className='text-red-500 text-sm' />
                        </div>
                      )}
                      <div className='flex w-full flex-col items-start p-3 gap-3'>
                        {params.pathname === '/reservation' ? (
                          <>
                            <button className='bg-purple01 w-full py-3 rounded-lg text-base' type='button' onClick={(e) => {
                              navigate(`/login${params.search}`);
                              e.preventDefault();
                            }}>Login</button>
                            <button className='bg-orange01 w-full py-3 rounded-lg text-base' type='button'>Login using apps</button>
                            <button className='border border-purple01 w-full py-3 rounded-lg text-base' type='button' onClick={(e) => {
                              navigate(`/guest${params.search}`);
                              e.preventDefault();
                            }}>Reservation as guest</button>
                          </>
                        ) : (
                          <button className='bg-purple01 w-full py-3 rounded-lg text-base gap-3' type='submit'>
                            {isSubmitting ? "Processing..." : (
                              <span>
                                {params.pathname === '/login' && 'Login'}
                                {params.pathname === '/register' && 'Register'}
                                {params.pathname === '/guest' && 'Create Reservation'}
                              </span>
                            )}
                            
                          </button>
                        )}

                        
                      </div>
                    </Form>
                  )}
                </Formik>
                <div className='flex w-full flex-col items-end p-3 gap-3'>                  
                  {params.pathname === '/reservation' ? (
                    <div className='text-sm'>Want to be a member ? <button className='text-purple01' onClick={() => navigate(`/register${params.search}`)}>Register here</button></div>
                  ) : (
                    <div className='text-sm'>Change your mind ? <button className='text-purple01' onClick={() => navigate(`/reservation${params.search}`)}>back to login page</button></div>
                  )}                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Reservation;
