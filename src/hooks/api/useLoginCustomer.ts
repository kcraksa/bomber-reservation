import { APIResponse } from "../../interfaces/BaseApiResponse";
import { ResponseLogin } from "../../interfaces/interfaces";
import ax from "../../service/axios";

export const login = async ({
  data,
}: {
  data: {
    username?: string;
    password?: string;
    phone?: string;
  };
}): Promise<APIResponse<ResponseLogin> | undefined> => {
  const response = await ax.post(`app/global_api/customer_sign_in`, data);
  return response.data;
};