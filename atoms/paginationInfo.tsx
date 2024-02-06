const { atom } = require("recoil");

const PaginationInfo = atom({
  key: "Pagination_Info",
  default: {
    currentPage:"0",
    totalPages:"0",
    pageSize:"10",
    totalCount:"0",
    hasPrevious:"false",
    hasNext:"false",
  },
});

export { PaginationInfo };