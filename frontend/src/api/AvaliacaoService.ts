import type { RequestResponse } from '@/@types/metaData'
import { request } from './request'

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

export const AvaliacaoService = {
  create: async (payload: CreateAvaliacaoPayload): Promise<AvaliacaoResponse> => {
    return request<AvaliacaoResponse>('/avaliacao', {
      method: 'POST',
      auth: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  },

  getAll: async (limit: number = 10, page: number = 1): Promise<RequestResponse<AvaliacaoResponse[]>> => {
    return request<RequestResponse<AvaliacaoResponse[]>>('/avaliacao', {
      method: 'GET',
      auth: true,
      params: { limit, page }
    });
  },

  delete: async (id: number): Promise<void> => {
    return request(`/avaliacao/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  }
}