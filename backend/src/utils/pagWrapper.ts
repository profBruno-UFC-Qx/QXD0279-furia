interface pagedData<t> {
  limit: number;
  offset: number;
  page: number;
  totalPages: number;
  itens: t;
}

export function pagWrapper<t>(
  data: t,
  limit: number,
  offset: number,
  total: number,
): pagedData<t> {
  return {
    limit,
    offset,
    page: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(total / limit),
    itens: data,
  };
}
