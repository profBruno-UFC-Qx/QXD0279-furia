import z from "zod";

export const avaliacaoSchema = z.object({
  nota_geral: z
    .number()
    .min(1, "Nota geral deve ser no mínimo 1")
    .max(5, "Nota geral deve ser no máximo 5"),
  nota_didatica: z
    .number()
    .min(1, "Nota didática deve ser no mínimo 1")
    .max(5, "Nota didática deve ser no máximo 5"),
  nota_metodologia: z
    .number()
    .min(1, "Nota de metodologia deve ser no mínimo 1")
    .max(5, "Nota de metodologia deve ser no máximo 5"),
  comment: z.string().min(1, "Comentário é obrigatório"),
  student_id: z.number().int().positive("ID do estudante inválido"),
  teacher_id: z.number().int().positive("ID do professor inválido"),
  discipline_id: z.number().int().positive("ID da disciplina inválido"),
});

export const updateAvaliacaoSchema = avaliacaoSchema.partial();
export type AvaliacaoSchemaType = z.infer<typeof avaliacaoSchema>;