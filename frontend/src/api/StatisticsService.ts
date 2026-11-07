import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";

export interface statisticsHomeResponse {
  qtd_avaliacoes: number;
  qtd_myUploades: number;
  qtd_allUploades: number;
}

export interface statisticsDashboardResponse {
  qtd_users: number;
  qtd_students: number;
  qtd_teachers: number;
  qtd_admins: number;
}

export const StatisticsService = {
  getStatisticsHome: async () => {
    const data = await request<statisticsHomeResponse>("/user/stats/home", {
      auth: true,
    });
    return data;
  },

  getStatisticsDashboardAdm: async () => {
    const data = await request<statisticsDashboardResponse>("/user/stats", {
      auth: true,
    });

    return data;
  },
};
