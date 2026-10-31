import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";

export interface TeacherResponse {
  teacher_id: number;
  user_id: number;
  creat_at: string;
  user: {
    email: string;
    name: string;
  };
  disciplines: {
    discipline_id: number;
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
  ): Promise<RequestResponse<TeacherResponse[]>> => {
    return request<RequestResponse<TeacherResponse[]>>(
      `/teacher?limit=${limit}&page=${page}&search=${filters?.search ?? ""}&discipline=${filters?.discipline ?? ""}`,
      { auth: true },
    );
  },

  getDashboard: async (): Promise<RequestResponse<any>> => {
    return request<RequestResponse<any>>("/teacher/dashboard", {
      method: "GET",
      auth: true, 
    });
  },

  getById: async (id: number): Promise<RequestResponse<any>> => {
    return request<RequestResponse<any>>(`/teacher/${id}/profile`, {
      method: "GET",
      auth: true,
    });
  },
};