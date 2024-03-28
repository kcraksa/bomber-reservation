import {UseQueryOptions, useQuery} from 'react-query';
import { APIResponse } from '../../interfaces/BaseApiResponse';
import ax from '../../service/axios';
import { ResponseGetPlaceDetailInterface } from '../../interfaces/interfaces';

export const getPlaceOperationall = async ({
  club_id,
}: {
  club_id: string;
}): Promise<APIResponse<ResponseGetPlaceDetailInterface>> => {
  const response = await ax.get(`app/nightlife/get_place_detail/${club_id}`);
  return response.data;
};

export const useGetPlaceOperational = ({
  options,
  club_id,
}: {
  options?: UseQueryOptions<APIResponse<ResponseGetPlaceDetailInterface>>;
  club_id: string;
}) => {
  return useQuery<APIResponse<ResponseGetPlaceDetailInterface>>(
    ['useGetPlaceOperational'],
    () => getPlaceOperationall({club_id}),
    options,
  );
};
