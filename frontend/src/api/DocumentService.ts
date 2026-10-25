import { request } from './request'

export interface DocumentPayload {
    titulo: string
    teacher_id: number
    discipline_id: number
    student_id?: number
    file: File
}

type DocumentResponse = {
    id: number
    titulo: string
    file_url: string
    data_publicacao: string
    student_id: number | null
    teacher_id: number
    discipline_id: number
}

export const DocumentService = {
    upload: async (payload: DocumentPayload) => {
        const formData = new FormData()

        formData.append('titulo', payload.titulo)
        formData.append('teacher_id', payload.teacher_id.toString())
        formData.append('discipline_id', payload.discipline_id.toString())

        if (payload.student_id) {
            formData.append('student_id', payload.student_id.toString())
        }

        formData.append('file', payload.file)

        const data = await request<DocumentResponse>('/document', {
            method: 'POST',
            auth: true,
            body: formData,
        })

        return data
    },
}
