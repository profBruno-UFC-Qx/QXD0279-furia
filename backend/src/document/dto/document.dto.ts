import type { CreateDocumentInput } from "../schema/document.schema.ts";

export type CreateDocumentDto = CreateDocumentInput & { file_url: string };