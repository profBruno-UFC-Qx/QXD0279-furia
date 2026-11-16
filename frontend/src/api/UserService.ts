import { type RequestResponse } from "@/@types/metaData";
import { request } from "./request";
import { type Roles } from "@/@types/role";

export interface User {
  user_id: number;
  email: string;
  name: string;
  role: Roles;
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

  delete: async (id: number) => {
    const data = await request<RequestResponse<User[]>>(`/user/${id}`, {
      method: "DELETE",

      auth: true,
    });
    return data;
  },
};
