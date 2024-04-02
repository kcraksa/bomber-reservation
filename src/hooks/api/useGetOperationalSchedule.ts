import { UseQueryOptions, useQuery } from "react-query";
import { APIResponse } from "../../interfaces/BaseApiResponse";
import { ResponseOperationalSchedule } from "../../interfaces/interfaces";
import ax from "../../service/axios";

export const getOperationalSchedule = async ({
  club_id,
  year_month,
}: {
  club_id: string,
  year_month: string,
}): Promise<APIResponse<ResponseOperationalSchedule>> => {
  const response = await ax.get(`/app/nightlife/get_operational_schedule/${club_id}?year_month=${year_month}`);
  return response.data;
}

export const useGetOperationalSchedule = ({
  options,
  club_id,
  year_month,
}: {
  options?: UseQueryOptions<APIResponse<ResponseOperationalSchedule>>;
  club_id: string;
  year_month: string;
}) => {
  return useQuery<APIResponse<ResponseOperationalSchedule>>(
    ['useGetOperationalSchedule'],
    () => getOperationalSchedule({club_id, year_month}),
    options,
  );
};
