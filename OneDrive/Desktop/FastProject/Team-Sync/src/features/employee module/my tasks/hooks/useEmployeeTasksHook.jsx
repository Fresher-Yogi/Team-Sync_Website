
import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  ClipboardList,
  ListTodo,
  Clock3,
  CircleCheck,
} from "lucide-react";

import {
  getEmployeeKanbanApi,
  getEmployeeTaskAnalyticsApi,
  getEmployeeTaskByIdApi,
  updateEmployeeTaskStatusApi,
} from "../apis/employeeTaskApis";

const useEmployeeTasksHook = () => {
  const queryClient = useQueryClient();

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // --------------------------------------------------
  // QUERY KEYS
  // --------------------------------------------------

  const queryKeys = {
    kanban: ["employee-task-kanban"],
    analytics: ["employee-task-analytics"],
    details: (taskId) => ["employee-task", taskId],
  };

  // --------------------------------------------------
  // COMMON HELPERS
  // --------------------------------------------------

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again."
    );
  };

  const formatDate = (date, options = {}) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not specified";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      ...options,
    });
  };

  const getCount = (items) => {
    return items?.[0]?.count ?? 0;
  };

  const getStatusCount = (items, status) => {
    return (
      items?.find((item) => item._id === status)?.count ?? 0
    );
  };

  const getInitials = (name) => {
    if (!name) return "NA";

    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // --------------------------------------------------
  // KANBAN QUERY
  // --------------------------------------------------

  const kanbanQuery = useQuery({
    queryKey: queryKeys.kanban,
    queryFn: getEmployeeKanbanApi,
  });

  // --------------------------------------------------
  // ANALYTICS QUERY
  // --------------------------------------------------

  const analyticsQuery = useQuery({
    queryKey: queryKeys.analytics,
    queryFn: getEmployeeTaskAnalyticsApi,
  });

  // --------------------------------------------------
  // SELECTED TASK DETAILS QUERY
  // --------------------------------------------------

  const taskDetailsQuery = useQuery({
    queryKey: queryKeys.details(selectedTaskId),
    queryFn: () => getEmployeeTaskByIdApi(selectedTaskId),
    enabled: Boolean(selectedTaskId),
  });

  // --------------------------------------------------
  // NORMALIZE KANBAN DATA
  // --------------------------------------------------

  const kanbanData = kanbanQuery.data ?? {};

  const rawKanban = {
    todo: Array.isArray(kanbanData.todo)
      ? kanbanData.todo
      : [],

    inProgress: Array.isArray(kanbanData.inProgress)
      ? kanbanData.inProgress
      : [],

    completed: Array.isArray(kanbanData.completed)
      ? kanbanData.completed
      : [],
  };

  // --------------------------------------------------
  // TASK CARD CONFIGURATION
  // --------------------------------------------------

  const priorityStyles = {
    high: "bg-red-500/10 text-red-400",
    medium: "bg-amber-500/10 text-amber-400",
    low: "bg-emerald-500/10 text-emerald-400",
  };

  const prepareTask = (task) => {
    const priority = task.priority?.toLowerCase();

    return {
      ...task,

      priorityLabel: priority
        ? `${priority} priority`
        : "Assigned task",

      priorityClassName:
        priorityStyles[priority] ||
        "bg-gray-500/10 text-gray-400",

      formattedDueDate: task.dueDate
        ? formatDate(task.dueDate, { year: "numeric" })
        : null,

      assigneeName:
        task.assignedTo?.name || "Assigned to you",

      assigneeInitials: getInitials(
        task.assignedTo?.name
      ),
    };
  };

  // --------------------------------------------------
  // KANBAN COLUMNS
  // --------------------------------------------------

  const columnConfig = [
    {
      id: "todo",
      title: "To Do",
      color: "bg-blue-400",
    },
    {
      id: "inProgress",
      title: "In Progress",
      color: "bg-amber-400",
    },
    {
      id: "completed",
      title: "Completed",
      color: "bg-emerald-400",
    },
  ];

  const taskColumns = columnConfig.map((column) => ({
    ...column,
    tasks: rawKanban[column.id].map(prepareTask),
  }));

  // Keep the original grouped shape available if needed.
  const kanban = {
    todo: taskColumns[0].tasks,
    inProgress: taskColumns[1].tasks,
    completed: taskColumns[2].tasks,
  };

  // --------------------------------------------------
  // ANALYTICS DATA
  // --------------------------------------------------

  const analytics = analyticsQuery.data ?? {};

  const totalTasks = getCount(analytics.totalTasks);

  const completedTasks = getCount(
    analytics.completedTasks
  );

  const todoTasks = getStatusCount(
    analytics.tasksByStatus,
    "todo"
  );

  const inProgressTasks = getStatusCount(
    analytics.tasksByStatus,
    "in-progress"
  );

  // --------------------------------------------------
  // EMPLOYEE TASK STATS
  // --------------------------------------------------

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "To Do",
      value: todoTasks,
      icon: ListTodo,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      icon: Clock3,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CircleCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  // --------------------------------------------------
  // SELECTED TASK DETAILS
  // --------------------------------------------------

  const taskResponse = taskDetailsQuery.data;

  const rawSelectedTask =
    taskResponse?.task ?? taskResponse ?? null;

  const selectedTask = rawSelectedTask
    ? {
        ...rawSelectedTask,
        formattedDueDate: formatDate(
          rawSelectedTask.dueDate,
          { month: "long", year: "numeric" }
        ),
      }
    : null;

  // --------------------------------------------------
  // STATUS OPTIONS
  // --------------------------------------------------

  const statusOptions = [
    {
      label: "To Do",
      value: "todo",
    },
    {
      label: "In Progress",
      value: "in-progress",
    },
    {
      label: "Completed",
      value: "completed",
    },
  ];

  // --------------------------------------------------
  // INVALIDATE RELATED QUERIES
  // --------------------------------------------------

  const refreshTaskData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.kanban,
      }),

      queryClient.invalidateQueries({
        queryKey: queryKeys.analytics,
      }),

      queryClient.invalidateQueries({
        queryKey: ["employee-task"],
      }),
    ]);
  };

  // --------------------------------------------------
  // UPDATE TASK STATUS MUTATION
  // --------------------------------------------------

  const statusMutation = useMutation({
    mutationFn: updateEmployeeTaskStatusApi,

    onSuccess: async () => {
      await refreshTaskData();
    },
  });

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return {
    // Kanban data
    kanban,
    taskColumns,
    isKanbanLoading: kanbanQuery.isPending,
    isKanbanError: kanbanQuery.isError,
    kanbanError: kanbanQuery.error,

    // Analytics
    analytics,
    stats,
    isAnalyticsLoading: analyticsQuery.isPending,
    isAnalyticsError: analyticsQuery.isError,
    analyticsError: analyticsQuery.error,

    // Selected task
    selectedTaskId,
    setSelectedTaskId,
    selectedTask,
    isTaskDetailsLoading: taskDetailsQuery.isPending,
    isTaskDetailsError: taskDetailsQuery.isError,
    taskDetailsError: taskDetailsQuery.error,

    // Status update
    updateTaskStatus: statusMutation.mutate,
    isUpdatingStatus: statusMutation.isPending,
    statusError: statusMutation.error,

    // Status options
    statusOptions,

    // Helpers
    getErrorMessage,
  };
};

export default useEmployeeTasksHook;
