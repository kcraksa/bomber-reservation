import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Dashboard from './page/Dashboard';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Reservation from './page/Reservation';
import { Toaster } from 'react-hot-toast';
import '../i18n';
import { useTranslation } from 'react-i18next';

const LanguageProvider = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const [, locale] = pathname.split('/');

    if (!locale) {
      window.location.href = `/${i18n.options.lng}/`;
    } else if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [location, i18n]);

  return null; // No need to render anything, just handle language changes
};

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
        <LanguageProvider />
        <Routes>
          <Route path='/:locale' element={<Dashboard />} />
          <Route path='/:locale/reservation' element={<Reservation />} />
          <Route path='/:locale/login' element={<Reservation />} />
          <Route path='/:locale/guest' element={<Reservation />} />
          <Route path='/:locale/register' element={<Reservation />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
};
