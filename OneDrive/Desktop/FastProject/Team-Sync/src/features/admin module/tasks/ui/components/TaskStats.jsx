import {
  Layers,
  CircleDashed,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const TaskStats = ({ analytics, getStatusCount }) => {
  const taskStats = [
    {
      id: 1,
      title: "Total Tasks",
      value: analytics?.totalTasks?.[0]?.count || 0,
      description: "Total tasks created",
      icon: Layers,
      bg: "bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]",
      color: "text-[var(--primary)]",
    },
    {
      id: 2,
      title: "To Do",
      value: getStatusCount("todo"),
      description: "Tasks waiting to start",
      icon: CircleDashed,
      bg: "bg-[color-mix(in_srgb,var(--warning)_12%,transparent)]",
      color: "text-[var(--warning)]",
    },
    {
      id: 3,
      title: "In Progress",
      value: getStatusCount("in-progress"),
      description: "Currently active tasks",
      icon: Clock3,
      bg: "bg-[color-mix(in_srgb,var(--secondary)_12%,transparent)]",
      color: "text-[var(--secondary)]",
    },
    {
      id: 4,
      title: "Completed",
      value: analytics?.completedTasks?.[0]?.count || 0,
      description: "Successfully completed tasks",
      icon: CheckCircle2,
      bg: "bg-[color-mix(in_srgb,var(--success)_12%,transparent)]",
      color: "text-[var(--success)]",
    },
  ];

  return (
    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {taskStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--text-secondary)]">
                {stat.title}
              </p>

              <div className={`rounded-xl p-2.5 ${stat.bg} ${stat.color}`}>
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

export default TaskStats;