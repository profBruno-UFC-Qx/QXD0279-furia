import type { RequestResponse } from '@/@types/metaData'
import { request } from './request'

export interface CreateDocumentPayload {
  titulo: string
  teacher_id: number
  discipline_id: number
  student_id?: number
  file: File
}

export interface DocumentResponse {
  id: number
  titulo: string
  file_url: string
  data_publicacao: string
  student_id: number | null
  teacher_id: number
  discipline_id: number
  discipline?: {
    id: number
    name: string 
  }
  teacher?: {
    id: number
    user?: {
      name: string
    }
  }
}

export const DocumentService = {
  upload: async (payload: CreateDocumentPayload): Promise<DocumentResponse> => {
    const formData = new FormData()

    formData.append('titulo', payload.titulo)
    formData.append('teacher_id', payload.teacher_id.toString())
    formData.append('discipline_id', payload.discipline_id.toString())

    if (payload.student_id !== undefined) {
      formData.append('student_id', payload.student_id.toString())
    }

    formData.append('file', payload.file)

    return request<DocumentResponse>('/document', {
      method: 'POST',
      auth: true,
      body: formData,
    })
  },

  getAll: async (): Promise<DocumentResponse[]> => {
    return request<DocumentResponse[]>('/document', {
      method: 'GET',
      auth: true, 
    })
  },
}
