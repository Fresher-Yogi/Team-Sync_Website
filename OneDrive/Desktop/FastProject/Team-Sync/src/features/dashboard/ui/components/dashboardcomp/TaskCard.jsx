
import { CalendarDays } from "lucide-react";

const TaskCard = ({ task }) => {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#202027] p-4 transition hover:border-violet-500/30 hover:bg-[#24242d]">

      {/* Priority */}
      <div className="mb-3 flex items-start justify-between gap-2">

        <span
          className={`rounded-md border px-2 py-1 text-[10px] font-medium ${task.priorityClassName}`}
        >
          {task.priorityLabel}
        </span>

      </div>

      {/* Task Title */}
      <h3 className="text-sm font-medium leading-5 text-zinc-100">
        {task.title}
      </h3>

      {/* Assignee + Due Date */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3">

        <div className="flex min-w-0 items-center gap-2">

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-[10px] font-semibold text-violet-300">
            {task.assigneeInitials}
          </div>

          <span className="truncate text-[11px] text-zinc-400">
            {task.assigneeName}
          </span>

        </div>

        <span className="flex shrink-0 items-center gap-1 text-[10px] text-zinc-500">
          <CalendarDays size={12} />
          {task.dueDateLabel}
        </span>

      </div>

    </div>
  );
};

export default TaskCard;
