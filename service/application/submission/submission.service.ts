import { ApiResponse, ApiResponseStatus } from "@/service/common/types";
import { CookieHelper } from "../../../helper/cookie.helper";
import { Fetch } from "../../../lib/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export interface SubmissionData {
  id?: string;
  form_id: string;
  data: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export const SubmissionService = {
  create: async (formData: FormData): Promise<ApiResponseStatus> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.post(`/submission`, formData, _config);
  },
};
