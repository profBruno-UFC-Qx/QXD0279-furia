import { z } from "zod";

const positiveIntegerString = (fieldName: string) =>
    z.string({ error: `${fieldName} é obrigatório` })
        .regex(/^[1-9]\d*$/, { error: `${fieldName} deve ser um número inteiro positivo` })
        .transform(Number);

export const createDocumentSchema = z.object({
    titulo: z.string({ error: "O título é obrigatório" })
        .trim()
        .min(3, { error: "O título deve ter pelo menos 3 caracteres" }),
    teacher_id: positiveIntegerString("O professor"),
    discipline_id: positiveIntegerString("A disciplina"),
    student_id: z.preprocess(
        (value) => value === "" ? undefined : value,
        positiveIntegerString("O estudante").optional(),
    ),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;