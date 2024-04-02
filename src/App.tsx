import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Dashboard from './page/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reservation from './page/Reservation';
import { Toaster } from 'react-hot-toast';
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
          <Route path='/login' element={<Reservation />} />
          <Route path='/guest' element={<Reservation />} />
          <Route path='/register' element={<Reservation />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
};
