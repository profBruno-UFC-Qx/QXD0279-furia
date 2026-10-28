import { type RequestResponse } from "@/@types/metaData";
import { request } from "./request";

export interface User {
  email: string;
  name: string;
  role: "student" | "teacher" | "admin";
}

export const userService = {
  getAll: async (limit: number, page: number) => {
    const data = await request<RequestResponse<User[]>>(
      `/user?limit=${limit}&page=${page}`,
      {
        auth: true,
      },
    );
    return data;
  },

  deleteUserByEmail: async (email: string) => {
    const data = await request<RequestResponse<User[]>>(
      `/user/email/${email}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        auth: true,
      },
    );
    return data;
  },
};
