import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";
export interface DiciplineResponse {
  dicipline_id: number;
  name: string;
  course: string;
  hours: number;
}

export interface DisciplineName {
  name: string;
}

export const DiciplineService = {
  getAll: async () => {
    const data = await request<RequestResponse<DiciplineResponse[]>>(
      "/dicipline",
      {
        auth: true,
      },
    );

    return data;
  },

  getAllNames: async () => {
    const data = await request<DisciplineName[]>("/discipline/name", {
      auth: true,
    });

    return data;
  },
};
