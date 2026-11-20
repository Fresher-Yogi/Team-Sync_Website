
import SectionHeading from "./SectionHeading";
import TaskColumn from "./TaskColumn";

const TaskBoard = ({
  columns = [],
  isPending,
  error,
  getErrorMessage,
}) => {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#19191f] p-5">

      <SectionHeading
        title="Tasks"
        subtitle="Track and manage tasks across your workspace"
      />

      {isPending ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          Loading tasks...
        </p>
      ) : error ? (
        <p className="py-10 text-center text-sm text-rose-400">
          {getErrorMessage(error)}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default TaskBoard;
