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
}