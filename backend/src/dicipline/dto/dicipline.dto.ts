export interface diciplineDTO {
  dicipline_id: number;
  name: string;
  course: string;
  hours: number;
  teachers: Array<{
    teacher_id: number;
    user_id: number;
  }>;
}
