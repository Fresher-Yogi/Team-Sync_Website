
import useDepartmentHook from "../../hooks/useDepartmentHook";

const AllDepartment = () => {
  const { departmentData, departmentIsPending } = useDepartmentHook();

  return (
    <div className="min-h-full w-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            All Departments
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Manage and explore all departments in your workspace.
          </p>
        </div>

        {/* Total Departments */}
        <div className="flex items-center gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-5 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"
              />
            </svg>
          </div>

          <div>
            <p className="text-xs text-[var(--text-muted)]">
              Total Departments
            </p>
            <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
              {departmentData?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Section Heading */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Department Directory
          </h2>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            All your departments in one place.
          </p>
        </div>
      </div>

      {/* Department Cards */}
      {departmentIsPending ? (
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] py-20 text-center text-sm text-[var(--text-muted)]">
          Loading departments...
        </div>
      ) : departmentData?.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">

          {departmentData.map((department) => (
            <div
              key={department._id}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-xl"
            >

              {/* Top Accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-[var(--primary)] opacity-70 transition-opacity group-hover:opacity-100" />

              <div className="p-5 sm:p-6">

                {/* Department Heading */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--bg-card))] text-lg font-bold text-[var(--primary)]">
                      {department.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {department.name}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        Department
                      </p>
                    </div>
                  </div>

                  {/* Member Count */}
                  <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-hover)] px-3 py-2 text-right">
                    <p className="text-lg font-bold leading-none text-[var(--primary)]">
                      {department.employees?.length || 0}
                    </p>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      Members
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6 min-h-[58px]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    About Department
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {department.description ||
                      "No description available for this department."}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-[var(--border-color)]" />

                {/* Manager */}
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Department Manager
                  </p>

                  <div className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-hover)] p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--bg-card))] text-sm font-semibold text-[var(--primary)]">
                      {department.manager?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                        {department.manager?.name || "Not assigned"}
                      </p>
                      <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                        {department.manager?.email || "—"}
                      </p>
                    </div>

                    <div className="ml-auto shrink-0 rounded-lg bg-[color-mix(in_srgb,var(--success)_10%,transparent)] px-2 py-1 text-[10px] font-medium text-[var(--success)]">
                      Manager
                    </div>
                  </div>
                </div>

                {/* Employees */}
                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Team Members
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {department.employees?.length || 0} assigned
                    </p>
                  </div>

                  {department.employees?.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {department.employees.slice(0, 4).map((employee) => (
                        <div
                          key={employee._id}
                          title={employee.name}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--bg-card)] bg-[color-mix(in_srgb,var(--primary)_12%,var(--bg-card))] text-xs font-semibold text-[var(--primary)] ring-1 ring-[var(--border-color)]"
                        >
                          {employee.name?.charAt(0)?.toUpperCase()}
                        </div>
                      ))}

                      {department.employees.length > 4 && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-hover)] text-[11px] font-semibold text-[var(--text-secondary)]">
                          +{department.employees.length - 4}
                        </div>
                      )}

                      <p className="ml-1 text-xs text-[var(--text-secondary)]">
                        {department.employees
                          .slice(0, 2)
                          .map((employee) => employee.name)
                          .join(", ")}
                        {department.employees.length > 2 && "..."}
                      </p>
                    </div>
                  ) : (
                    <p className="rounded-xl border border-dashed border-[var(--border-color)] py-3 text-center text-xs text-[var(--text-muted)]">
                      No employees assigned yet
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-[var(--border-color)] pt-4">
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      Created On
                    </p>
                    <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]">
                      {department.createdAt
                        ? new Date(department.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] transition-colors group-hover:opacity-75">
                    Department Details
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-card)] px-5 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"
              />
            </svg>
          </div>

          <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
            No departments yet
          </h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Create your first department to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllDepartment;