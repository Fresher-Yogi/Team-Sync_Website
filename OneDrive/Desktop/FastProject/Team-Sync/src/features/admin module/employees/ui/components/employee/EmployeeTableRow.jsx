
import { useState } from "react";
import EmployeeAvatar from "./EmployeeAvatar";
import { deleteEmployee, updateEmployee } from "../../../apis/employeeApis";
import useEmployeesHook from "../../../hooks/useEmployeesHook";

const EmployeeTableRow = ({ employee }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = employee.status === "active";
  const { navigate } = useEmployeesHook();

  return (
    <tr className="transition-colors hover:bg-[var(--bg-hover)]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0">
            <EmployeeAvatar
              name={employee.name}
              avatar={employee.avatar}
              status={employee.status}
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {employee.name}
            </p>
            <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
              {employee.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm capitalize text-[var(--text-secondary)]">
          {employee.department || "—"}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="rounded-md bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-2.5 py-1 text-xs font-medium capitalize text-[var(--primary)]">
          {employee.role}
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-2 text-xs font-medium capitalize ${
            isActive
              ? "text-[var(--success)]"
              : "text-[var(--text-muted)]"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isActive
                ? "bg-[var(--success)]"
                : "bg-[var(--text-muted)]"
            }`}
          />
          {employee.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="text-xs text-[var(--text-secondary)]">
          {employee.createdAt
            ? new Date(employee.createdAt).toLocaleDateString()
            : "—"}
        </span>
      </td>

      <td className="px-5 py-4 text-right">
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`rounded-lg px-3 py-2 text-lg transition-colors ${
              isMenuOpen
                ? "bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--primary)]"
            }`}
          >
            ⋮
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-1.5 text-left shadow-xl">
              <button
                type="button"
                onClick={() => {
                  navigate("/home/add-employees", { state: { employee } });
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--primary)]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={async () => {
                  try {
                    if (employee.status === "active") {
                      await updateEmployee(employee, { status: "inactive" });
                    } else {
                      await updateEmployee(employee, { status: "active" });
                    }
                  } catch (error) {
                    console.log(error);
                  }

                  setIsMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "text-[var(--warning)] hover:bg-[color-mix(in_srgb,var(--warning)_10%,transparent)]"
                    : "text-[var(--success)] hover:bg-[color-mix(in_srgb,var(--success)_10%,transparent)]"
                }`}
              >
                {isActive ? "Mark Inactive" : "Mark Active"}
              </button>

              <div className="my-1 border-t border-[var(--border-color)]" />

              <button
                type="button"
                onClick={async () => {
                  await deleteEmployee(employee);
                  alert("employee deleted");
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--danger)] transition-colors hover:bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EmployeeTableRow;
