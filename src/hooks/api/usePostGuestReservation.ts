import { APIResponse } from "../../interfaces/BaseApiResponse";
import { ResponseGetPlaceDetailInterface } from "../../interfaces/interfaces";
import ax from "../../service/axios";

export const usePostGuestReservation = async ({
  data,
}: {
  data: {
    club_id?: string;
    name?: string;
    phone?: string;
    email?: string;
  };
}): Promise<APIResponse<ResponseGetPlaceDetailInterface> | undefined> => {
  const response = await ax.post(`/pos/crud/customer_club_quest_sign_up`, data);
  return response.data;
};