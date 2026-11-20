
const EmployeePagination = ({
  currentPage = 1,
  totalPages = 1,
  totalEmployees = 0,
  limit = 20,
  onPageChange,
}) => {
  const startItem =
    totalEmployees === 0 ? 0 : (currentPage - 1) * limit + 1;

  const endItem = Math.min(currentPage * limit, totalEmployees);

  const getPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  const buttonStyle =
    "flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm transition";

  const inactiveButton =
    "border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]";

  return (
    <div className="flex flex-col gap-4 border-t border-[var(--border-color)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[var(--text-muted)]">
        Showing{" "}
        <span className="font-medium text-[var(--text-primary)]">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-[var(--text-primary)]">
          {totalEmployees}
        </span>{" "}
        employees
      </p>

      <div className="flex items-center justify-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className={`${buttonStyle} ${inactiveButton} disabled:cursor-not-allowed disabled:opacity-30`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            className={`${buttonStyle} ${
              currentPage === page
                ? "border-[var(--primary)] bg-[var(--primary)] font-semibold text-[var(--bg-main)]"
                : inactiveButton
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange?.(currentPage + 1)}
          className={`${buttonStyle} ${inactiveButton} disabled:cursor-not-allowed disabled:opacity-30`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="m9 18 6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EmployeePagination;
