import { APIResponse } from "../../interfaces/BaseApiResponse";
import ax from "../../service/axios";

export const usePostOrder = async ({
  data,
}: {
  data: {
    customer_id: string
    club_id: string
    booking_date: string
    total_price: number
    disc: number
    total_guest: number
    table_id: string
    user_deposit: number
    payment_method: string
    member_invited: string[]
    is_full_payment: number
    coupon_used: number
    source: string
    card_number: string
    card_cvc: string
    card_expiry: string
    promotion_ids: string[]
  };
}): Promise<APIResponse<string> | undefined> => {
  const response = await ax.post(`/app/nightlife/post_table_booking_order`, data);
  return response.data;
};