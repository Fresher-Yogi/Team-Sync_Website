import { ChevronLeft, ChevronRight } from "lucide-react";

const TaskPagination = ({
  currentPage,
  totalPages,
  totalTasks,
  limit,
  onPageChange,
  startItem,
  endItem,
  pageNumbers,
}) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-[var(--border-color)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

      {/* Showing Records */}
      <p className="text-sm text-[var(--text-muted)]">
        Showing{" "}
        <span className="font-medium text-[var(--text-primary)]">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-[var(--text-primary)]">
          {totalTasks}
        </span>{" "}
        tasks
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={17} />
        </button>

        {pageNumbers.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
              currentPage === page
                ? "bg-[var(--primary)] text-[var(--bg-main)]"
                : "border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default TaskPagination;