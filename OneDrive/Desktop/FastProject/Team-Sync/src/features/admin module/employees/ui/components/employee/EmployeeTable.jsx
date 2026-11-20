
import EmployeePagination from "./EmployeePagination";
import EmployeeTableRow from "./EmployeeTableRow";

const EmployeeTable = ({ employees = [], pagination, onPageChange }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
      <div className="flex flex-col gap-3 border-b border-[var(--border-color)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            All Team Members
          </h2>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Manage and view your workspace members.
          </p>
        </div>

        <span className="w-fit rounded-lg bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-3 py-2 text-xs font-medium text-[var(--primary)]">
          {employees.length} Members
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-hover)]">
              <th className="px-5 py-4 text-xs font-semibold text-[var(--text-secondary)]">Member</th>
              <th className="px-5 py-4 text-xs font-semibold text-[var(--text-secondary)]">Department</th>
              <th className="px-5 py-4 text-xs font-semibold text-[var(--text-secondary)]">Role</th>
              <th className="px-5 py-4 text-xs font-semibold text-[var(--text-secondary)]">Status</th>
              <th className="px-5 py-4 text-xs font-semibold text-[var(--text-secondary)]">Joined Date</th>
              <th className="px-5 py-4 text-right text-xs font-semibold text-[var(--text-secondary)]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-color)]">
            {employees.map((employee) => (
              <EmployeeTableRow key={employee._id} employee={employee} />
            ))}
          </tbody>
        </table>
      </div>

      {employees.length === 0 && (
        <div className="px-5 py-14 text-center">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            No team members found
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Your team members will appear here.
          </p>
        </div>
      )}

      <EmployeePagination
        currentPage={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        totalEmployees={pagination?.total || 0}
        limit={pagination?.limit || 20}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default EmployeeTable;
