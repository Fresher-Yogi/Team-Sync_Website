
import DashboardStats from "../components/dashboardcomp/DashboardStats";
import TaskBoard from "../components/dashboardcomp/TaskBoard";
import TaskProgress from "../components/dashboardcomp/TaskProgress";
import DepartmentWorkload from "../components/dashboardcomp/DepartmentWorkload";

import useDashboardHook from "../../hooks/useDashboardHook";

const Dashboard = () => {
  const {
    overviewStats,
    dashboardPending,
    dashboardError,

    taskProgressData,
    taskStatsPending,
    taskStatsError,

    taskColumns,
    tasksListPending,
    tasksListError,

    departments,
    departmentPending,
    departmentError,

    getErrorMessage,
  } = useDashboardHook();

  return (
    <div className="min-h-full w-full bg-[#111114] p-4 text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Dashboard
        </h1>

        <p className="mt-1.5 text-sm text-zinc-500">
          Welcome back! Here's what's happening in your workspace.
        </p>
      </div>

      {/* Overview */}
      {dashboardPending ? (
        <p className="mb-8 text-sm text-zinc-500">
          Loading dashboard stats...
        </p>
      ) : dashboardError ? (
        <p className="mb-8 text-sm text-rose-400">
          {getErrorMessage(dashboardError)}
        </p>
      ) : (
        <DashboardStats stats={overviewStats} />
      )}

      {/* Tasks + Overall Progress */}
      <div className="my-6 grid grid-cols-1 gap-5 2xl:grid-cols-[1.8fr_1fr]">

        <TaskBoard
          columns={taskColumns}
          isPending={tasksListPending}
          error={tasksListError}
          getErrorMessage={getErrorMessage}
        />

        <TaskProgress
          progressData={taskProgressData}
          isPending={taskStatsPending}
          error={taskStatsError}
          getErrorMessage={getErrorMessage}
        />

      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 gap-5">
        <DepartmentWorkload
          departments={departments}
          isPending={departmentPending}
          error={departmentError}
          getErrorMessage={getErrorMessage}
        />
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-zinc-600 sm:flex-row">
        <p>Team-Sync · Workspace Overview</p>
        <p>Manage your team. Track your progress.</p>
      </div>

    </div>
  );
};

export default Dashboard;
