const ProfileInformation = ({ details = [] }) => {
  return (
    <div className="mt-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8">

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Personal Information
        </h3>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Your registered employee information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-hover)] p-4 transition hover:border-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
            >
              <div className="mb-3 flex items-center gap-2 text-[var(--text-muted)]">
                <Icon
                  size={16}
                  className="text-[var(--primary)]"
                />

                <span className="text-xs font-medium">
                  {item.label}
                </span>
              </div>

              <p
                className={`break-all text-sm font-medium text-[var(--text-primary)] ${
                  item.capitalize ? "capitalize" : ""
                }`}
              >
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-[color-mix(in_srgb,var(--primary)_15%,transparent)] bg-[color-mix(in_srgb,var(--primary)_5%,transparent)] p-4">
        <p className="text-sm text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--primary)]">Note:</span>{" "}
          Your profile information is currently managed by your workspace
          administrator. Contact your administrator if you need to
          change your registered details.
        </p>
      </div>

    </div>
  );
};

export default ProfileInformation;