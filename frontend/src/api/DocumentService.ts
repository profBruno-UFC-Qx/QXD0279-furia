import type { RequestResponse } from "@/@types/metaData";
import { request } from "./request";
import { type CreateDocumentPayload } from "@/@types/documents";
import { type DocumentResponse } from "@/@types/documents";
import { type GetDocumentsParams } from "@/@types/documents";

export const DocumentService = {
  upload: async (payload: CreateDocumentPayload): Promise<DocumentResponse> => {
    const formData = new FormData();

    formData.append("titulo", payload.titulo);
    formData.append("teacher_id", payload.teacher_id.toString());
    formData.append("discipline_id", payload.discipline_id.toString());

    if (payload.student_id !== undefined) {
      formData.append("student_id", payload.student_id.toString());
    }

    formData.append("file", payload.file);

    return request<DocumentResponse>("/document", {
      method: "POST",
      auth: true,
      body: formData,
    });
  },

  getAll: async (
    params?: GetDocumentsParams,
  ): Promise<RequestResponse<DocumentResponse[]>> => {
    return request<RequestResponse<DocumentResponse[]>>("/document", {
      method: "GET",
      auth: true,
      params: params,
    });
  },

  getMine: async (
    limit: number = 10,
    page: number = 1,
  ): Promise<RequestResponse<DocumentResponse[]>> => {
    return request<RequestResponse<DocumentResponse[]>>("/document/mine", {
      method: "GET",
      auth: true,
      params: { limit, page },
    });
  },

  delete: async (id: number): Promise<void> => {
    return request(`/document/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
