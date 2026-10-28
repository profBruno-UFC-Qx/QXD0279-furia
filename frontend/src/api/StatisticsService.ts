import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";
export interface statisticsHomeResponse {
  evaluations: number;
  downloaded: number;
  uploaded: number;
}

export interface statisticsDashboardResponse {
  qtd_users: number;
  qtd_students: number;
  qtd_teachers: number;
  qtd_admins: number;
}

export const StatisticsService = {
  getStatisticsHome: async () => {
    const data = await request<RequestResponse<statisticsHomeResponse>>("/URL");

    return data;
  },

  getStatisticsDashboardAdm: async () => {
    const data = await request<statisticsDashboardResponse>("/user/stats", {
      auth: true,
    });

    return data;
  },
};
