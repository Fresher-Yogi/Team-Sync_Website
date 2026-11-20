
import {
  Files,
  Share2,
  Building2,
  ClipboardList,
} from "lucide-react";

import { documentStats } from "./documentData";

const iconMap = {
  files: Files,
  "share-2": Share2,
  "building-2": Building2,
  "clipboard-list": ClipboardList,
};

const DocumentStats = () => {
  return (
    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {documentStats.map((stat) => {
        const Icon = iconMap[stat.icon];

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--text-secondary)]">
                {stat.title}
              </p>

              <div className="rounded-xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] p-2.5 text-[var(--primary)]">
                <Icon size={19} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentStats;
