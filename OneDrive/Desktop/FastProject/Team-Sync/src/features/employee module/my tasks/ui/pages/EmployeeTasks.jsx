import EmployeeTaskHeader from "../components/EmployeeTaskHeader";
import EmployeeTaskStats from "../components/EmployeeTaskStats";
import EmployeeTaskBoard from "../components/EmployeeTaskBoard";
import EmployeeTaskDetails from "../components/EmployeeTaskDetails";

import useEmployeeTasksHook from "../../hooks/useEmployeeTasksHook";

const EmployeeTasks = () => {
  const {
    taskColumns,
    isKanbanLoading,
    isKanbanError,
    kanbanError,

    stats,
    isAnalyticsLoading,
    isAnalyticsError,
    analyticsError,

    selectedTaskId,
    setSelectedTaskId,
    selectedTask,
    isTaskDetailsLoading,
    isTaskDetailsError,
    taskDetailsError,

    updateTaskStatus,
    isUpdatingStatus,
    statusError,

    statusOptions,
    getErrorMessage,
  } = useEmployeeTasksHook();

  return (
    <div className="min-h-full w-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6 lg:p-8">

      <EmployeeTaskHeader />

      {/* Task Statistics */}
      <EmployeeTaskStats
        stats={stats}
        isLoading={isAnalyticsLoading}
        isError={isAnalyticsError}
        error={analyticsError}
        getErrorMessage={getErrorMessage}
      />

      {/* Task Board Heading */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          My Task Board
        </h2>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          View and update the status of your assigned tasks.
        </p>
      </div>

      {/* Kanban Board */}
      {isKanbanLoading ? (
        <p className="py-10 text-center text-sm text-[var(--text-secondary)]">
          Loading your tasks...
        </p>
      ) : isKanbanError ? (
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--danger)_15%,transparent)] bg-[color-mix(in_srgb,var(--danger)_5%,transparent)] p-5">
          <h2 className="text-sm font-semibold text-[var(--danger)]">
            Unable to load tasks
          </h2>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {getErrorMessage(kanbanError)}
          </p>
        </div>
      ) : (
        <EmployeeTaskBoard
          columns={taskColumns}
          onTaskClick={setSelectedTaskId}
        />
      )}

      {/* Task Details Modal */}
      {selectedTaskId && (
        <EmployeeTaskDetails
          task={selectedTask}
          isLoading={isTaskDetailsLoading}
          isError={isTaskDetailsError}
          error={taskDetailsError}
          getErrorMessage={getErrorMessage}
          onClose={() => setSelectedTaskId(null)}
          onStatusChange={(status) =>
            updateTaskStatus({
              taskId: selectedTaskId,
              status,
            })
          }
          isUpdating={isUpdatingStatus}
          statusError={statusError}
          statusOptions={statusOptions}
        />
      )}

    </div>
  );
};

export default EmployeeTasks;