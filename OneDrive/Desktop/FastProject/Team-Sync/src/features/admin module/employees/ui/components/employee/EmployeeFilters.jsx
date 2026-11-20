
const EmployeeFilters = ({ filters, handleSearchFilters }) => {
  const selectClass =
    "h-11 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] sm:w-auto";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative w-full sm:max-w-sm">
        <svg
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" strokeWidth="2" />
          <path d="m16 16 4 4" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <input
          value={filters.search}
          onChange={(e) => handleSearchFilters("search", e.target.value)}
          type="text"
          placeholder="Search by name..."
          className="h-11 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_15%,transparent)]"
        />
      </div>

      <select
        className={selectClass}
        value={filters.department}
        onChange={(e) => handleSearchFilters("department", e.target.value)}
      >
        <option value="">Select Department</option>
        <option value="developer">Developer</option>
        <option value="common">Common</option>
        <option value="administrative">Administrative</option>
        <option value="security">Security</option>
        <option value="manangement">Management</option>
        <option value="hr">HR</option>
        <option value="sales">Sales</option>
        <option value="marketting">Marketing</option>
      </select>

      <select
        className={selectClass}
        value={filters.role}
        onChange={(e) => handleSearchFilters("role", e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
      </select>

      <select
        className={selectClass}
        value={filters.status}
        onChange={(e) => handleSearchFilters("status", e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default EmployeeFilters;
