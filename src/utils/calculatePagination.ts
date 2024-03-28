type PaginationParams = {
  page: number; // Current page being displayed
  pageSize: number; // Amount of record on each page
};

const calculatePagination = (params: PaginationParams) => {
  const { page, pageSize } = params;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return { skip, take };
};

export default calculatePagination;
