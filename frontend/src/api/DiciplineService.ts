import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";
export interface DiciplineResponse {
  dicipline_id: number;
  name: string;
  course: string;
  hours: number;
}

export const DiciplineService = {
  getAll: async () => {
    const data =
      await request<RequestResponse<DiciplineResponse>>("/dicipline");

    return data;
  },
};
