const EmployeeTaskStats = ({
  stats = [],
  isLoading,
  isError,
  error,
  getErrorMessage,
}) => {
  if (isLoading) {
    return (
      <div className="mb-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5">
        <p className="text-sm text-[var(--text-secondary)]">
          Loading task statistics...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-8 rounded-2xl border border-[color-mix(in_srgb,var(--danger)_15%,transparent)] bg-[color-mix(in_srgb,var(--danger)_5%,transparent)] p-5">
        <p className="text-sm text-[var(--danger)]">
          {getErrorMessage(error)}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">
                {stat.label}
              </p>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                <Icon size={19} />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeTaskStats;