import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useGetPlaceOperational } from '../hooks/api/useGetPlaceOperational';
import { useGetPlaceDetail } from '../hooks/api/useGetPlaceDetail';
import { TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
// import { useGetOperationalSchedule } from '../hooks/api/useGetOperationalSchedule';
import { getTableByDate } from '../hooks/api/useGetTableByDate';
import { format } from 'date-fns';
import { APIResponse } from '../interfaces/BaseApiResponse';
import { ResponseTableByDate } from '../interfaces/interfaces';
import toast from 'react-hot-toast';
import { useGetOperationalSchedule } from '../hooks/api/useGetOperationalSchedule';
import CalendarIcon from '../icons/calendar';

function Dashboard() {
  const sampleClubId = 'afa92fcc-aaad-416e-b441-c4f858bbe696';
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`)
  const [tableByDate, setTableByDate] = useState<APIResponse<ResponseTableByDate>>()
  const [showCalendar, setShowCalendar] = useState(false);

  const { data: clubOperational } = useGetPlaceOperational({
    club_id: sampleClubId,
    options: {
      enabled: !!sampleClubId
    }
  });

  const {data: dataOperational} = useGetOperationalSchedule({
    club_id: sampleClubId,
    year_month: format(new Date(), 'Y-M')
  })

  const { data: clubDetail } = useGetPlaceDetail({
    club_id: sampleClubId,
    options: {
      enabled: !!sampleClubId
    }
  });

  useEffect(() => {
    const getDataTableByDate = async () => {
      const dataByDate = await getTableByDate({club_id: sampleClubId, year_month_day: selectedDate});
      setTableByDate(dataByDate)
    }

    getDataTableByDate();
  }, [selectedDate]);

  const [selectedTable, setSelectedTable] = useState<string>('');

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className='flex gap-4 mb-4'>
            {Array.isArray(clubDetail?.data[0]?.bannerImage) && clubDetail?.data[0]?.bannerImage.length > 0 ? (
              <>
                <div className="bg-gray01 min-h-[508px] w-[75%] rounded-lg"></div>
                <div className='flex flex-col gap-4'>
                  <div className='bg-gray01 min-h-[243px] w-[377px] rounded-lg'></div>
                  <div className='bg-gray01 min-h-[243px] w-[377px] rounded-lg'></div>
                </div>
              </>
            ) : (
              <div className="bg-gray01 min-h-[508px] w-full rounded-lg">
                <img src={clubDetail?.data[0]?.bannerImage} alt='Banner' />
              </div>
            )}            
          </div>

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

          <div className='w-full bg-black01 flex flex-col rounded-lg p-5 text-start mb-5'>
            <div className='flex items-center order-1'>
              <div>
                <img src='src/assets/images/electric.svg' width={44} height={44} alt='Electric' />
              </div>
              <div className='text-base font-bold'>About {clubDetail?.data[0]?.name}</div>
            </div>
            <div className='text-base p-4 text-gray02 lg:order-2 order-3' dangerouslySetInnerHTML={{ __html: clubOperational?.data?.about ?? '-' }} />
            <div className='flex p-4 gap-6 lg:order-last order-2'>
              {clubOperational?.data?.features?.map((feature) => (
                <div className='border border-white rounded-lg cursor-pointer p-3 lg:text-base text-sm' key={feature.title}>{feature.title}</div>
              ))}
            </div>
          </div>

          <div className='w-full bg-black01 rounded-lg p-5 text-start mb-5'>
            <div className='flex items-center'>
              <div>
                <img src='src/assets/images/electric.svg' width={44} height={44} alt='Electric' />
              </div>
              <div className='text-base font-bold'>Notes</div>
            </div>
            <div className='flex p-4 gap-6 text-base'>
              <ul>
                <li className='my-3'>🔺Friday and Saturday reservations are for BAR seating only until 11:30 pm.</li>
                <li className='my-3'>🔺For private events or special requests, please contact us at 0966-331-033 (WhatsApp) or message us on social media.</li>
                <li className='my-3'>🔺No entry for individuals under 18 years old.</li>
                <li className='my-3'>🔺Reservations will be held for a maximum of 10 mins past their scheduled time. Arrivals later than that may result in forfeiture of your reservation. Thanks for your understanding.</li>
                <li className='my-3'>🔺Admission is free (excluding special events & NYE).</li>
                <li className='my-3'>🔺Check our social media for updates on operating hours during special holidays and vacations.</li>
                <li className='my-3'>📌DRESS TO IMPRESS - No casual attire/workout wear/slippers/sandals/open-toed flats.</li>
                <li className='my-3'>📌KOR reserves the right to refuse entry to anyone at our sole discretion. Admission policies are subject to change without notice.
KOR is a private company/venue that openly accepts guests from all ethnic groups and cultures. We do not discriminate based on age, gender, sexual orientation, faith, race, political affiliation, disability, or pregnancy. All guests are treated equally and respectfully.</li>
              </ul>
            </div>
          </div>

          <div className='w-full bg-black01 rounded-lg p-5 text-start mb-5'>
            <div className='flex items-center'>
              <div>
                <img src='src/assets/images/electric.svg' width={44} height={44} alt='Electric' />
              </div>
              <div className='text-base font-bold'>Reservation</div>
            </div>
            <div className='text-base p-4 text-gray02 lg:w-[20%] text-sm'>
              <div className='mb-2'>Date</div>
              <div className=''>
                <TextInput 
                  id="date" 
                  type="text" 
                  readOnly 
                  rightIcon={CalendarIcon} 
                  placeholder="select date" 
                  style={{ background: '#221F26', border: 'none', color: '#fff' }} 
                  onFocus={() => setShowCalendar(!showCalendar)}
                  value={format(selectedDate, "E, MMM d, yyyy")}
                />
                {showCalendar && (
                  <Calendar 
                    tileDisabled={(e) => {
                      const date = format(e.date, 'Y-MM-dd');
                      dataOperational?.data?.forEach((ops) => {
                        if (date === ops.date && (ops.club_table_full_book === true || ops.club_operational_day === false)) {
                          return true
                        }
                        return false;
                      })
                      return false;
                    }}
                    onChange={(e) => {
                      setSelectedDate(format(e?.toString() ?? '', 'Y-M-d'));
                      setShowCalendar(false);
                    }}
                  />
                )}
              </div>
            </div>
            <div className='p-4'>
              <div className='mb-2 text-base'>Select Table</div>
              <div className='flex gap-6 flex-wrap'>
                {tableByDate?.data?.table_list?.map((table) => (
                  <div className={`lg:w-[32%] p-4 border ${selectedTable === table.tableId ? 'border-purple01' : 'border-gray01'} rounded-lg flex lg:flex-row flex-col gap-6 cursor-pointer ${selectedTable === table.tableId ? 'border-1' : ''}`} 
                    key={table.tableId} onClick={() => setSelectedTable(table.tableId)}>
                    <div className='bg-gray01 h-[115px] lg:w-[115px]'></div>
                    <div>
                      <div className='font-bold text-base mb-4'>{table.text}</div>
                      <div className='text-sm'>Small table with a lot facilities</div>
                      <ul className='text-sm list-disc ml-5'>
                        {tableByDate?.data?.facilities_list?.map((facilities) => (
                          <li key={facilities.facilitiesId}>{facilities.title}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full fixed bottom-0'>
          <button className='bg-purple01 text-base font-bold py-4 w-full' onClick={() => {
            if (!selectedTable) {
              toast.error("Choose table first");
              return false;
            }
            navigate(`/reservation?id=${clubDetail?.data[0]?.id}&table=${selectedTable}&date=${selectedDate}`)
          }}>Create Reservation</button>
        </div>
      </header>
    </div>
  );
}

export default Dashboard;

