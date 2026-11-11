export interface DisciplineResponse {
  discipline_id: number;
  name: string;
  course: string;
  hours: number;
}

export interface DisciplineName {
  discipline_id: number;
  name: string;
}

export interface Discipline {
  name: string;
  course: string;
  hours: number;
}
