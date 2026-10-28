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

export const DiciplineService = {
  getAll: async (): Promise<RequestResponse<DiciplineResponse[]>> => {
    return request<RequestResponse<DiciplineResponse[]>>("/dicipline", {
      auth: true,
    });
  },

  getAllNames: async (): Promise<DisciplineName[]> => {
    return request<DisciplineName[]>("/discipline/name", {
      auth: true,
    });
  },
};
