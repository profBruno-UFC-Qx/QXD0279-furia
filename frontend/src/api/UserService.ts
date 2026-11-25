import { type RequestResponse } from "@/@types/metaData";
import { request } from "./request";
import { type Roles } from "@/@types/role";

export interface User {
  user_id: number;
  email: string;
  name: string;
  role: Roles;
}

export interface Student {
  student_id: number;
  course: string;
}

export interface UserProfile extends User {
  student: Student;
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

  getMe: async () => {
    const data = await request<UserProfile>(`/user/me`, {
      auth: true,
    });

    return data;
  },

  updateMe: async (payload: { name: string; course?: string }) => {
    const data = await request(`/user/me`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      auth: true,
      body: JSON.stringify(payload),
    });

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
