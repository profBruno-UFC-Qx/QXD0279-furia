import z from "zod";

export const avaliacaoSchema = z.object({
  name: z.string().min(1, "Nome da avaliação é obrigatório"),
  course: z.string().min(1, "Curso é obrigatório"),
  hours: z.number().int().min(0, "Horas não podem ser negativas"),
  nota_geral: z
    .number()
    .min(0, "Nota geral deve ser maior ou igual a 0")
    .max(10, "Nota geral deve ser menor ou igual a 10"),
  nota_didatica: z
    .number()
    .min(0, "Nota didática deve ser maior ou igual a 0")
    .max(10, "Nota didática deve ser menor ou igual a 10"),
  nota_metodologia: z
    .number()
    .min(0, "Nota de metodologia deve ser maior ou igual a 0")
    .max(10, "Nota de metodologia deve ser menor ou igual a 10"),
  comment: z.string().min(1, "Comentário é obrigatório"),
  estudante_id: z.number().int().positive("ID do estudante inválido"),
  professor_id: z.number().int().positive("ID do professor inválido"),
  disciplina_id: z.number().int().positive("ID da disciplina inválido"),
});

export const updateAvaliacaoSchema = avaliacaoSchema.partial();

export type AvaliacaoSchemaType = z.infer<typeof avaliacaoSchema>;
