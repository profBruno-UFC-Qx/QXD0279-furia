export interface CreateDocumentPayload {
  titulo: string;
  teacher_id: number;
  discipline_id: number;
  student_id?: number;
  file: File;
}

export interface DocumentResponse {
  id: number;
  titulo: string;
  file_url: string;
  data_publicacao: string;
  student_id: number | null;
  teacher_id: number;
  discipline_id: number;
  discipline?: {
    id: number;
    name: string;
  };
  teacher?: {
    id: number;
    user?: {
      name: string;
    };
  };
}

export interface GetDocumentsParams {
  page?: number;
  limit?: number;
  search?: string;
  discipline?: string;
  teacher?: string;
}
