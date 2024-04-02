import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Dashboard from './page/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reservation from './page/Reservation';
import Login from './page/Login';
import GuestReservation from './page/GuestReservation';
import Register from './page/Register';
export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 50
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/login' element={<Login />} />
          <Route path='/guest' element={<GuestReservation />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
