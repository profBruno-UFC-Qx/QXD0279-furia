import { Teacher } from "../../database/entities/Teacher.ts";

export interface diciplineDTO {
  dicipline_id: number;
  name: string;
  course: string;
  hours: number;
  teachers: Teacher[];
}
