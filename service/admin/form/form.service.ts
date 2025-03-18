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
  findAll: async (): Promise<ApiResponse<FormData[]>> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const response = await Fetch.get(`/admin/form`, _config);
    return response.data;
  },

  findOne: async (id: string): Promise<ApiResponse<FormData>> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/admin/form/${id}`, _config);
  },

  create: async (formData: FormData): Promise<ApiResponseStatus> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.post(`/admin/form`, formData, _config);
  },

  update: async (
    id: string,
    formData: Partial<FormData>
  ): Promise<ApiResponseStatus> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.patch(`/admin/form/${id}`, formData, _config);
  },

  delete: async (id: string): Promise<ApiResponseStatus> => {
    const userToken = CookieHelper.get({ key: "token" });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.delete(`/admin/form/${id}`, _config);
  },
};
