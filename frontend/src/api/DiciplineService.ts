import { request } from "./request";

export interface DiciplineResponse {
  dicipline_id: number;
  name: string;
  course: string;
  hours: number;
}

export const DiciplineService = {
  getAll: async () => {
    const data = await request<DiciplineResponse[]>("/dicipline");

    return data;
  },
};
