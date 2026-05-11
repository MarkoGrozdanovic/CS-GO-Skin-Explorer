export const getVisiblePages = (
  totalPages: number,
  currentPage: number,
  delta: number = 3, // how many pages around current
): (number | string)[] => {
  const pages: (number | string)[] = [];

  const start = Math.max(2, currentPage - delta);
  const end = Math.min(totalPages - 1, currentPage + delta);

  // always first page
  pages.push(1);

  // left dots
  if (start > 2) {
    pages.push("...");
  }

  // middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // right dots
  if (end < totalPages - 1) {
    pages.push("...");
  }

  // always last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};
