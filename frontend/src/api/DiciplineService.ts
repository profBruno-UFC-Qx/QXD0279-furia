import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";
export interface DiciplineResponse {
  discipline_id: number;
  name: string;
  course: string;
  hours: number;
}

export interface DisciplineName {
  name: string;
}

export interface Discipline {
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

  create: async (payload: Discipline) => {
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
  },

  delete: async (id: number) => {
    const data = await request<boolean>(`/discipline/${id}`, {
      method: "DELETE",
      auth: true,
    });

    return data;
  },

  update: async (id: number, body: Discipline) => {
    console.log(body);
    const data = await request<Partial<Discipline>>(`/discipline/${id}`, {
      method: "PUT",
      auth: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return data;
  },
};
