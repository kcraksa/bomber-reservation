import React from 'react';
import { useGetPlaceOperational } from '../hooks/api/useGetPlaceOperational';
import { useGetPlaceDetail } from '../hooks/api/useGetPlaceDetail';

function Dashboard() {
  const sampleClubId = 'afa92fcc-aaad-416e-b441-c4f858bbe696';
  const { data: clubOperational } = useGetPlaceOperational({
    club_id: sampleClubId,
    options: {
      enabled: !!sampleClubId
    }
  });
  const { data: clubDetail } = useGetPlaceDetail({
    club_id: sampleClubId,
    options: {
      enabled: !!sampleClubId
    }
  });
  return (
    <div className="app">
      <header className="app-header">
        <p className="header">Bomber web reservation</p>
        <p>{clubDetail?.data[0].name}</p>
      </header>
    </div>
  );
}

export default Dashboard;
