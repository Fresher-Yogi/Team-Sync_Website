import { LockKeyhole, ShieldCheck, KeyRound } from "lucide-react";

const inputStyle =
  "mt-2 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-hover)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]";

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Account Security
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Manage your password and account security preferences.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-4 rounded-xl border border-[color-mix(in_srgb,var(--success)_15%,transparent)] bg-[color-mix(in_srgb,var(--success)_5%,transparent)] p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-[var(--success)]">
            <ShieldCheck size={22} />
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Your account is secure
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Keep your password private and secure.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Current Password
            </label>
            <div className="relative">
              <LockKeyhole
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="password"
                placeholder="Enter current password"
                className={`${inputStyle} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              New Password
            </label>
            <div className="relative">
              <KeyRound
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="password"
                placeholder="Enter new password"
                className={`${inputStyle} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Confirm New Password
            </label>
            <div className="relative">
              <KeyRound
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className={`${inputStyle} pl-11`}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end border-t border-[var(--border-color)] pt-5">
          <button
            type="button"
            className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[#101010] transition hover:opacity-90"
          >
            Update Password
          </button>
        </div>
      </section>
    </div>
  );
};

export default AccountSettings;