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

export const DisciplineService = {
  getAll: async (): Promise<RequestResponse<DisciplineResponse[]>> => {
    return request<RequestResponse<DisciplineResponse[]>>("/dicipline", {
      auth: true,
    });
  },

  getAllNames: async (): Promise<DisciplineName[]> => {
    return request<DisciplineName[]>("/discipline/name", {
      auth: true,
    });
  },
};
