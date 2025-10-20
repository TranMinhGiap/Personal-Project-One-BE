module.exports.objectPagination = (query, totalRecord) => {
  const defaultLimit = 15;

  let rawLimit = parseInt(query.limit);
  let limit;

  if (rawLimit === 0) {
    limit = totalRecord; // lấy toàn bộ bản ghi
  } else {
    limit = rawLimit || defaultLimit;
    limit = Math.max(1, Math.min(limit, 100)); // giới hạn từ 1–100
  }

  const totalPage = Math.ceil(totalRecord / limit) || 1;

  let currPage = parseInt(query.page) || 1;
  currPage = Math.max(1, Math.min(currPage, totalPage));

  const skip = (currPage - 1) * limit;

  return {
    currPage,
    limit,
    skip,
    totalPage,
    page_next: currPage < totalPage ? currPage + 1 : null,
    page_prev: currPage > 1 ? currPage - 1 : null
  };
};
