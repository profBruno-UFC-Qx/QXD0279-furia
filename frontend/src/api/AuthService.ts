import { request } from "./request";

type AuthResponse = {
  userResponse: {
    id: number
    name: string;
    role: "student" | "teacher" | "admin";
  };
  token: string;
};

interface payload {
  email: string;
  password: string;
}

export const AuthService = {
  login: async (payload: payload) => {
    const data = await request<AuthResponse>("/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return data;
  },

  register: async (payload: payload) => {
    const data = await request<AuthResponse>("/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return data;
  },
};
