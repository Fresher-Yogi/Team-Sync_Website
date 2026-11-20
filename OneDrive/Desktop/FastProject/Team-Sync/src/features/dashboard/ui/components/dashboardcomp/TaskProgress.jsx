
import SectionHeading from "./SectionHeading";

const TaskProgress = ({
  progressData,
  isPending,
  error,
  getErrorMessage,
}) => {
  const { total, completed, pending, percentage } = progressData;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#19191f] p-5">

      <SectionHeading
        title="Overall Task Progress"
        subtitle="Workspace performance overview"
      />

      {isPending ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          Loading task progress...
        </p>
      ) : error ? (
        <p className="py-10 text-center text-sm text-rose-400">
          {getErrorMessage(error)}
        </p>
      ) : (
        <>
          {/* Progress Chart */}
          <div className="relative mx-auto mt-5 flex max-w-[250px] justify-center">

            <svg viewBox="0 0 220 135" className="w-full">

              <path
                d="M 25 115 A 85 85 0 0 1 195 115"
                fill="none"
                stroke="#303039"
                strokeWidth="13"
                strokeLinecap="round"
              />

              <path
                d="M 25 115 A 85 85 0 0 1 195 115"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="13"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray={`${percentage} 100`}
              />

              <defs>
                <linearGradient id="progressGradient" x1="0" x2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>

            </svg>

            <div className="absolute bottom-0 flex flex-col items-center">

              <span className="text-4xl font-semibold text-white">
                {percentage}%
              </span>

              <span className="mt-1 text-xs text-zinc-500">
                Tasks completed
              </span>

            </div>
          </div>

          {/* Task Counts */}
          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-5">

            <div>
              <p className="text-xl font-semibold text-white">
                {total}
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                Total tasks
              </p>
            </div>

            <div>
              <p className="text-xl font-semibold text-emerald-400">
                {completed}
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                Completed
              </p>
            </div>

            <div>
              <p className="text-xl font-semibold text-amber-400">
                {pending}
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                Pending
              </p>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default TaskProgress;