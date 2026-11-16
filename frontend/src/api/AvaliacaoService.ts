import { request } from "./request";
import { type RequestResponse } from "@/@types/metaData";
import { type CreateAvaliacaoPayload } from "@/@types/avaliacao";
import { type AvaliacaoResponse } from "@/@types/avaliacao";
import { type AvaliacaoResponseWithData } from "@/@types/avaliacao";

export const AvaliacaoService = {
  create: async (
    payload: CreateAvaliacaoPayload,
  ): Promise<AvaliacaoResponse> => {
    return request<AvaliacaoResponse>("/avaliacao", {
      method: "POST",
      auth: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  getAll: async (
    limit: number = 10,
    page: number = 1,
  ): Promise<RequestResponse<AvaliacaoResponse[]>> => {
    return request<RequestResponse<AvaliacaoResponse[]>>("/avaliacao", {
      method: "GET",
      auth: true,
      params: { limit, page },
    });
  },

  delete: async (id: number): Promise<void> => {
    return request(`/avaliacao/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },

  getMine: async (limit: number, page: number) => {
    const data = await request<RequestResponse<AvaliacaoResponseWithData[]>>(
      `/avaliacao/me?limit=${limit}&page=${page}`,
      { auth: true },
    );
    return data;
  },
};
