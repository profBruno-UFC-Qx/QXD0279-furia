import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";

export interface TeacherResponse {
  creat_at: string;
  user: {
    email: string;
    name: string;
  };
  disciplines: {
    name: string;
  }[];
  avaliacoes: {
    nota_geral_media: number;
    nota_didatica_media: number;
    nota_metodologia_media: number;
  };
}

export const TeacherService = {
  getAll: async (
    limit: number,
    page: number,
    filters?: {
      search: string;
      discipline: string;
    },
  ) => {
    const data = await request<RequestResponse<TeacherResponse[]>>(
      `/teacher?limit=${limit}&page=${page}&search=${filters?.search}&discipline=${filters?.discipline}`,
      { auth: true },
    );
    return data;
  },
};
