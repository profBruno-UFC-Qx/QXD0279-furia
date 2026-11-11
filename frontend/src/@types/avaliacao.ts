export interface CreateAvaliacaoPayload {
  nota_geral: number;
  nota_didatica: number;
  nota_metodologia: number;
  comment: string;
  student_id: number;
  teacher_id: number;
  discipline_id: number;
}

export interface AvaliacaoResponse {
  id: number;
  nota_geral: number;
  nota_didatica: number;
  nota_metodologia: number;
  comment: string;
  creat_at: string;
  student_id: number;
  teacher_id: number;
  discipline_id: number;
  teacher?: {
    user?: {
      name: string;
    };
  };
  discipline?: {
    name: string;
  };
  student?: {
    user?: {
      name: string;
    };
  };
}

export interface AvaliacaoResponseWithData {
  nota_geral: number;
  comment: string;
  creat_at: Date;
  teacher: {
    creat_at: string;
    user: {
      name: string;
    };
  };
  discipline: {
    name: string;
  };
}
