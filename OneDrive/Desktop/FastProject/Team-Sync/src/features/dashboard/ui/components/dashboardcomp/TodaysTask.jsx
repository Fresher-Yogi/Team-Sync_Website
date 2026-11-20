import { Check, Circle, MoreHorizontal } from "lucide-react";
import { todayTasks, statusStyles } from "./dashboardData";
import  SectionHeading  from './SectionHeading';

const TodaysTasks = () => {
  const statusLabels = {
    completed: "Completed",
    "in-progress": "In Progress",
    todo: "To Do",
  };

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#19191f] p-5">
      <SectionHeading
        title="Today's Tasks"
        subtitle="Keep track of what's happening today"
        action={
          <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white">
            <MoreHorizontal size={19} />
          </button>
        }
      />

      <div className="space-y-1">
        {todayTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 rounded-xl px-2 py-3 transition hover:bg-white/[0.03]"
          >
            <div className="mt-0.5">
              {task.status === "completed" ? (
                <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 text-black">
                  <Check size={12} strokeWidth={3} />
                </div>
              ) : task.status === "in-progress" ? (
                <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-blue-400">
                  <Circle size={7} className="fill-blue-400 text-blue-400" />
                </div>
              ) : (
                <Circle size={18} className="text-zinc-600" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-medium ${
                  task.status === "completed"
                    ? "text-zinc-500 line-through"
                    : "text-zinc-200"
                }`}
              >
                {task.title}
              </p>

              <p className="mt-1 text-[11px] text-zinc-500">
                {task.project}
              </p>
            </div>

            <span
              className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                statusStyles[task.status]
              }`}
            >
              {statusLabels[task.status]}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] py-3 text-xs font-medium text-zinc-400 transition hover:border-violet-500/40 hover:text-violet-300">
        Add new task
      </button>
    </div>
  );
};

export default TodaysTasks;