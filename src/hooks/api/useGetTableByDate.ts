import { UseQueryOptions, useQuery } from "react-query";
import { APIResponse } from "../../interfaces/BaseApiResponse";
import { ResponseTableByDate } from "../../interfaces/interfaces";
import ax from "../../service/axios";

export const getTableByDate = async ({
  club_id,
  year_month_day,
}: {
  club_id: string,
  year_month_day: string,
}): Promise<APIResponse<ResponseTableByDate>> => {
  const response = await ax.get(`/app/nightlife/get_all_table_base_on_date/${club_id}?year_month_day=${year_month_day}`);
  return response.data;
}

export const useGetTableByDate = ({
  options,
  club_id,
  year_month_day,
}: {
  options?: UseQueryOptions<APIResponse<ResponseTableByDate>>;
  club_id: string;
  year_month_day: string;
}) => {
  return useQuery<APIResponse<ResponseTableByDate>>(
    ['useGetTableByDate'],
    () => getTableByDate({club_id, year_month_day}),
    options,
  );
};
