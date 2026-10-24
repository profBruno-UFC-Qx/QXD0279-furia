interface pagedData {
  limit: number;
  offset: number;
  page: number;
  totalPages: number;
}

export function pagWrapper(
  limit: number,
  offset: number,
  total: number,
): pagedData {
  return {
    limit,
    offset,
    page: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(total / limit),
  };
}
