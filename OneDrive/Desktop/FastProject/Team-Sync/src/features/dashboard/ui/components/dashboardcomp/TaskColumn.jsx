
import { MoreHorizontal } from "lucide-react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ column }) => {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.06] bg-[#15151a] p-3">

      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between gap-2 px-1">

        <div className="min-w-0">
          <div className="flex items-center gap-2">

            <span className={`h-2 w-2 rounded-full ${column.dot}`} />

            <h3 className="text-sm font-semibold text-zinc-200">
              {column.title}
            </h3>

            <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] text-zinc-400">
              {column.taskCount}
            </span>

          </div>

          <p className="mt-1 text-[10px] text-zinc-500">
            {column.description}
          </p>
        </div>

        <MoreHorizontal
          size={17}
          className="shrink-0 text-zinc-500"
        />

      </div>

      {/* Task Cards */}
      <div className="space-y-3">

        {column.tasks.length > 0 ? (
          column.tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-white/10 py-8 text-center text-xs text-zinc-500">
            No tasks available
          </p>
        )}

      </div>

    </div>
  );
};

export default TaskColumn;