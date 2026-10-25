import { z } from "zod";
import { createDocumentSchema } from "../schema/document.schema.ts";

export type CreateDocumentDto = z.infer<typeof createDocumentSchema> & { file_url: string };