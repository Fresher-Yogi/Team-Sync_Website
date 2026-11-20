
const EmployeeStats = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-5 py-4"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {stat.label}
          </p>

          <div className="mt-2 flex items-center gap-2">
            {stat.indicator && (
              <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
            )}

            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeStats;
