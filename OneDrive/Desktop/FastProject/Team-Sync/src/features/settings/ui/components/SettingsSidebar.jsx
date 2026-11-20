import {
  UserRound,
  ShieldCheck,
  Bell,
  ChevronRight,
} from "lucide-react";

const settingsLinks = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
    icon: UserRound,
  },
  {
    id: "account",
    label: "Account",
    description: "Password and security",
    icon: ShieldCheck,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Manage notifications",
    icon: Bell,
  },
];

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="h-fit rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3">
      <h3 className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        Preferences
      </h3>

      <div className="space-y-1">
        {settingsLinks.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                isActive
                  ? "border border-[color-mix(in_srgb,var(--primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]"
                  : "border border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Icon size={19} />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  {item.description}
                </p>
              </div>

              {isActive && <ChevronRight size={16} />}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default SettingsSidebar;