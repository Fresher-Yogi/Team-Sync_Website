
import useEmployeesHook from "../../hooks/useEmployeesHook";
import EmployeeFilters from "../components/employee/EmployeeFilters";
import EmployeeStats from "../components/employee/EmployeeStats";
import EmployeeTable from "../components/employee/EmployeeTable";

const Employee = () => {
  const {
    data,
    handlePageChange,
    filters,
    handleSearchFilters,
    navigate,
  } = useEmployeesHook();

  return (
    <main className="min-h-full w-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Team-Sync
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Manage your workspace members and their roles across the project.
          </p>
        </div>

        <button
          onClick={() => navigate("/home/add-employees")}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--bg-main)] transition-all duration-200 hover:opacity-85 active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add Employee
        </button>
      </div>

      <section className="py-5">
        <EmployeeFilters
          filters={filters}
          handleSearchFilters={handleSearchFilters}
        />
      </section>

      <section className="mb-8">
        <EmployeeStats
          stats={[
            { label: "Total Members", value: data?.pagination?.total || 0 },
            {
              label: "Active Now",
              value: data?.employees?.filter(
                (elem) => elem.status === "active"
              ).length || 0,
              indicator: true,
            },
            { label: "Pending Invites", value: 0 },
            { label: "Open Roles", value: 0 },
          ]}
        />
      </section>

      <section>
        <EmployeeTable
          employees={data?.employees || []}
          pagination={data?.pagination}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
};

export default Employee;