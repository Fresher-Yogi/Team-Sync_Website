const NotificationSettings = ({
  notifications,
  onToggle,
}) => {
  return (
    <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Notification Preferences
        </h2>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Choose which notifications you want to receive.
        </p>
      </div>

      <div className="divide-y divide-[var(--border-color)]">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]">
                  <Icon size={19} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>

              <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={() => onToggle(item.id)}
                  className="peer sr-only"
                />

                <div className="h-6 w-11 rounded-full bg-[var(--bg-hover)] transition peer-checked:bg-[var(--primary)] after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
              </label>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end border-t border-[var(--border-color)] pt-5">
        <button
          type="button"
          className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[#101010] transition hover:opacity-90"
        >
          Save Preferences
        </button>
      </div>
    </section>
  );
};

export default NotificationSettings;