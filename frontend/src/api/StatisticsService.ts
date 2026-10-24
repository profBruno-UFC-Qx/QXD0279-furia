import { request } from "./request";

import { type RequestResponse } from "@/@types/metaData";
export interface statisticsResponse {
  evaluations: number;
  downloaded: number;
  uploaded: number;
}

export const StatisticsService = {
  getStatisticsHome: async () => {
    const data = await request<RequestResponse<statisticsResponse>>("/URL");

    return data;
  },
};
