import { request } from "./request";

import { type metaData } from "@/@types/metaData";

export interface TeacherResponse {
  teacher_id: number;
  user_id: number;
  creat_at: Date;
  user: {
    user_id: number;
    name: string;
    email: string;
    password: string;
  };
  disciplines: {
    dicipline_id: number;
    name: string;
    course: string;
    hours: number;
  }[];
}

export const TeacherService = {
  getAll: async () => {
    const data = await request<metaData<any>>("/teacher");
    return data;
  },
};
