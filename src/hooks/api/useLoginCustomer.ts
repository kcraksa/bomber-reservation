import { APIResponse } from "../../interfaces/BaseApiResponse";
import { ResponseGetPlaceDetailInterface } from "../../interfaces/interfaces";
import ax from "../../service/axios";

export const useLoginCustomer = async ({
  data,
}: {
  data: {
    username?: string;
    password?: string;
    phone?: string;
  };
}): Promise<APIResponse<ResponseGetPlaceDetailInterface> | undefined> => {
  const response = await ax.post(`app/global_api/customer_sign_in`, data);
  return response.data;
};