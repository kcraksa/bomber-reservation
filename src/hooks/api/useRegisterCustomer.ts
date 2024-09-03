import { APIResponse } from "../../interfaces/BaseApiResponse";
import { ResponseGetPlaceDetailInterface } from "../../interfaces/interfaces";
import ax from "../../service/axios";

export const useRegisterCustomer = async ({
  data,
}: {
  data: {
    firebase_id?: string;
    username?: string;
    phone?: string;
    password?: string;
    email?: string;
    photo_url?: string;
    gender?: string;
  };
}): Promise<APIResponse<ResponseGetPlaceDetailInterface> | undefined> => {
  const response = await ax.post(`app/global_api/customer_sign_up`, data);
  return response.data;
};