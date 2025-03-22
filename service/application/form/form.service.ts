import { ApiResponse, ApiResponseStatus } from "@/service/common/types";
import { CookieHelper } from "../../../helper/cookie.helper";
import { Fetch } from "../../../lib/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export interface FormData {
  id?: string;
  name: string;
  description?: string;
  elements: any[];
  status?: number;
  created_at?: string;
  updated_at?: string;
}

export const FormService = {
  findOne: async (id: string): Promise<ApiResponse<FormData>> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const response = await Fetch.get(`/form/${id}`, _config);
    return response.data;
  },
};
