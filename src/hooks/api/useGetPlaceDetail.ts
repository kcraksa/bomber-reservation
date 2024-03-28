import {UseQueryOptions, useQuery} from 'react-query';
import { APIResponse } from '../../interfaces/BaseApiResponse';
import ax from '../../service/axios';
import { PlaceInterface } from '../../interfaces/interfaces';

export const getPlaceDetail = async ({
  club_id,
}: {
  club_id: string;
}): Promise<APIResponse<PlaceInterface[]>> => {
  const response = await ax.get(`admin/crud/get_detail_club_by_id/${club_id}`);
  return response.data;
};

export const useGetPlaceDetail = ({
  options,
  club_id,
}: {
  options?: UseQueryOptions<APIResponse<PlaceInterface[]>>;
  club_id: string;
}) => {
  return useQuery<APIResponse<PlaceInterface[]>>(
    ['useGetPlaceDetail'],
    () => getPlaceDetail({club_id}),
    options,
  );
};
