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
  findAll: async (form_id: string): Promise<ApiResponse<SubmissionData[]>> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const response = await Fetch.get(
      `/admin/submission?form_id=${form_id}`,
      _config
    );
    return response.data;
  },

  findOne: async (id: string): Promise<ApiResponse<SubmissionData>> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/admin/submission/${id}`, _config);
  },

  update: async (
    id: string,
    formData: Partial<SubmissionData>
  ): Promise<ApiResponseStatus> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.patch(`/admin/submission/${id}`, formData, _config);
  },

  delete: async (id: string): Promise<ApiResponseStatus> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.delete(`/admin/submission/${id}`, _config);
  },
};
