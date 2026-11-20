
import { Building2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const DepartmentWorkload = ({
  departments = [],
  isPending,
  error,
  getErrorMessage,
}) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#19191f] p-5">

      <SectionHeading
        title="Department Overview"
        subtitle="Employee distribution across departments"
      />

      {isPending ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          Loading departments...
        </p>
      ) : error ? (
        <p className="py-10 text-center text-sm text-rose-400">
          {getErrorMessage(error)}
        </p>
      ) : departments.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          No departments available
        </p>
      ) : (
        <div className="space-y-6">

          {departments.map((department) => (
            <div key={department.id}>

              <div className="mb-2 flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p className="truncate text-sm font-medium text-zinc-200">
                    {department.name}
                  </p>

                  <p className="mt-1 text-[11px] text-zinc-500">
                    {department.members} employees
                    {" · "}
                    {department.managerName}
                  </p>

                </div>

                <span className="text-sm font-semibold text-zinc-300">
                  {department.percentage}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#303039]">

                <div
                  className="h-full rounded-full bg-violet-500 transition-all"
                  style={{
                    width: `${department.percentage}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>
      )}

      <div className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] py-3 text-xs font-medium text-zinc-400">
        <Building2 size={15} />
        Department information
      </div>

    </div>
  );
};

export default DepartmentWorkload;