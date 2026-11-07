import { request } from './request'
import { type RequestResponse } from "@/@types/metaData";

export interface CreateAvaliacaoPayload {
  nota_geral: number
  nota_didatica: number
  nota_metodologia: number
  comment: string
  student_id: number
  teacher_id: number
  discipline_id: number
}

export interface AvaliacaoResponse {
  id: number  
  nota_geral: number
  nota_didatica: number
  nota_metodologia: number
  comment: string
  creat_at: string
  student_id: number
  teacher_id: number
  discipline_id: number
  teacher?: {
    user?: {
      name: string
    }
  }
  discipline?: {
    name: string
  }
  student?: {
    user?: {
      name: string
    }
  }
}

export interface AvaliacaoResponseWithData {
  nota_geral: number;
  comment: string;
  creat_at: Date;
  teacher: {
    creat_at: string;
    user: {
      name: string;
    };
  };
  discipline: {
    name: string;
  };
}
export const AvaliacaoService = {
  create: async (payload: CreateAvaliacaoPayload): Promise<AvaliacaoResponse> => {
    return request<AvaliacaoResponse>('/avaliacao', {
      method: 'POST',
      auth: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  },

  getAll: async (limit: number = 10, page: number = 1): Promise<RequestResponse<AvaliacaoResponse[]>> => {
    return request<RequestResponse<AvaliacaoResponse[]>>('/avaliacao', {
      method: 'GET',
      auth: true,
      params: { limit, page },
    });
  },

  delete: async (id: number): Promise<void> => {
    return request(`/avaliacao/${id}`, {
      method: 'DELETE',
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
}