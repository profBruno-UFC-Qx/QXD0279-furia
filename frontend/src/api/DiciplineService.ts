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

export interface DiciplinePayload {
  name: string;
  course: string;
  hours: number;
}

export const DiciplineService = {
  getAll: async (limit: number, page: number) => {
    const data = await request<RequestResponse<DiciplineResponse[]>>(
      `/dicipline?limit=${limit}&page=${page}`,
      {
        auth: true,
      },
    );

    return data;
  },

  create: async (payload: DiciplinePayload) => {
    const data = await request<DiciplineResponse>("/dicipline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      auth: true,
    });

    return data;
  },

  getAllNames: async () => {
    const data = await request<DisciplineName[]>("/discipline/name", {
      auth: true,
    });

    return data;
  },
};
