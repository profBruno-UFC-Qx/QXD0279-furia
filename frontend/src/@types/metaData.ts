export interface metaData {
  limit: number;
  offset: number;
  page: number;
  totalPages: number;
}

export interface RequestResponse<t> {
  data: t;
  meta: metaData;
}
