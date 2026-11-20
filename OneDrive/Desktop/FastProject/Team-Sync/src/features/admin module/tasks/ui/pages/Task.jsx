import { useState } from "react";
import { Plus, ClipboardList } from "lucide-react";

import TaskStats from "../components/TaskStats";
import TaskToolbar from "../components/TaskToolbar";
import TaskTable from "../components/TaskTable";
import TaskPagination from "../components/TaskPagination";
import TaskForm from "../components/TaskForm";

import useTaskhook from "../../hooks/useTaskhook";

const Task = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    errors,
    isSubmitting,

    allTasks,
    allTasksIsPending,
    allTasksIsFetching,
    pagination,

    employees,
    employeesIsPending,

    tasksStatsData,
    tasksStatsIsPending,
    getStatusCount,

    search,
    setSearch,
    status,
    handleStatusChange,
    priority,
    handlePriorityChange,

    currentPage,
    setCurrentPage,
    startItem,
    endItem,
    pageNumbers,
    totalPages,
    totalTasks,
    paginationLimit,

    getPriorityStyle,
    getStatusStyle,
    getStatusLabel,
    formatDate,
    getInitials,

    taskFormSubmit,
  } = useTaskhook();

  return (
    <div className="min-h-full w-full bg-[var(--bg-main)] p-4 text-[var(--text-primary)] sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <ClipboardList
              size={21}
              className="text-[var(--primary)]"
            />

            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Tasks
            </h1>
          </div>

          <p className="text-sm text-[var(--text-muted)]">
            Create, assign and manage tasks across your workspace.
          </p>
        </div>

        <button
          onClick={() => setShowTaskForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--bg-main)] transition hover:opacity-85"
        >
          <Plus size={17} />
          Create Task
        </button>
      </div>

      {/* Statistics */}
      {!tasksStatsIsPending && tasksStatsData ? (
        <TaskStats
          analytics={tasksStatsData}
          getStatusCount={getStatusCount}
        />
      ) : (
        <p className="mb-7 text-sm text-[var(--text-muted)]">
          Loading task statistics...
        </p>
      )}

      {/* Search and Filters */}
      <TaskToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={handleStatusChange}
        priority={priority}
        onPriorityChange={handlePriorityChange}
      />

      {/* Tasks Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        {allTasksIsPending ? (
          <div className="rounded-2xl p-10 text-center text-sm text-[var(--text-muted)]">
            Loading tasks...
          </div>
        ) : allTasks.length > 0 ? (
          <>
            <TaskTable
              tasks={allTasks}
              employees={employees}
              getPriorityStyle={getPriorityStyle}
              getStatusStyle={getStatusStyle}
              getStatusLabel={getStatusLabel}
              formatDate={formatDate}
              getInitials={getInitials}
            />

            {pagination && (
              <TaskPagination
                currentPage={pagination.page}
                totalPages={totalPages}
                totalTasks={totalTasks}
                limit={paginationLimit}
                startItem={startItem}
                endItem={endItem}
                pageNumbers={pageNumbers}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              No tasks found
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* Background Fetching Indicator */}
        {!allTasksIsPending && allTasksIsFetching && (
          <p className="border-t border-[var(--border-color)] px-5 py-2 text-xs text-[var(--primary)]">
            Updating tasks...
          </p>
        )}
      </div>

      {/* Create Task Modal */}
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          register={register}
          reset={reset}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          employees={employees}
          taskFormSubmit={taskFormSubmit}
        />
      )}
    </div>
  );
};

export default Task;