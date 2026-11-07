import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";

export interface DisciplineResponse {
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

export const DisciplineService = {
  getAll: async (
    limit: number,
    page: number,
  ): Promise<RequestResponse<DisciplineResponse[]>> => {
    const data = await request<RequestResponse<DisciplineResponse[]>>(
      `/discipline?limit=${limit}&page=${page}`,
      {
        auth: true,
      },
    );

    return data;
  },

  create: async (payload: Discipline) => {
    const data = await request<DisciplineResponse>("/discipline", {
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

  delete: async (id: number) => {
    const data = await request<boolean>(`/discipline/${id}`, {
      method: "DELETE",
      auth: true,
    });

    return data;
  },

  update: async (id: number, body: Discipline) => {
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