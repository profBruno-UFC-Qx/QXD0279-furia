import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";

export interface AvaliacaoResponse {
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

export const AvaliacaoService = {
  getMine: async (limit: number, page: number) => {
    const data = await request<RequestResponse<AvaliacaoResponse[]>>(
      `/avaliacao/me?limit=${limit}&page=${page}`,
      {
        auth: true,
      },
    );

    return data;
  },

  // countMineEvaluations: async () => {
  //   const data = await request<number>("/avaliacao/me/count", {
  //     auth: true,
  //   });

  //   return data;
  // },
};
