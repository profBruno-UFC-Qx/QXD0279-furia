import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";

export interface TeacherResponse {
  teacher_id: number;
  user_id: number;
  creat_at: string;
  user: {
    user_id: number;
    name: string;
    email: string;
  };
  disciplines: {
    discipline_id: number;
    name: string;
    course: string;
    hours: number;
  }[];
}

export const TeacherService = {
  getAll: async (): Promise<RequestResponse<TeacherResponse[]>> => {
    return request<RequestResponse<TeacherResponse[]>>("/teacher", { auth: true });
  },
};
