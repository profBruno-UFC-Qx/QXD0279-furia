import { request } from "./request";
import { type statisticsDashboardResponse } from "@/@types/estatistic";
import { type statisticsHomeResponse } from "@/@types/estatistic";

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
