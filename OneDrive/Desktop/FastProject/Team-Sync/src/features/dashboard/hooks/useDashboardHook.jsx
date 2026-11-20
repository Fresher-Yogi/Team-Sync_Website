
import { useQuery } from "@tanstack/react-query";

import {
  dashboardStatsApi,
  taskStatsApi,
  tasksApi,
  departmentAnalyticsApi,
} from "../apis/dashboardsApis";

import {
  Users,
  ListTodo,
  CheckCircle2,
  Clock,
} from "lucide-react";

const useDashboardHook = () => {
  // ---------------- API QUERIES ----------------

  const dashboardStatsQuery = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardStatsApi,
  });

  const taskStatsQuery = useQuery({
    queryKey: ["taskStats"],
    queryFn: taskStatsApi,
  });

  const tasksQuery = useQuery({
    queryKey: ["dashboardTasks"],
    queryFn: tasksApi,
  });

  const departmentQuery = useQuery({
    queryKey: ["departmentAnalytics"],
    queryFn: departmentAnalyticsApi,
  });

  // ---------------- API DATA EXTRACTION ----------------

  const dashboardData = dashboardStatsQuery.data?.data ?? {};

  const taskStatsData = taskStatsQuery.data?.data ?? {};

  const tasksListData = tasksQuery.data?.data?.tasks ?? [];

  const departmentData = departmentQuery.data?.data ?? [];

  // ---------------- COMMON HELPERS ----------------

  const getCount = (items) => {
    return items?.[0]?.count || 0;
  };

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again."
    );
  };

  // ---------------- DASHBOARD OVERVIEW STATS ----------------

  const overviewStats = [
    {
      title: "Total Employees",
      value: dashboardData.totalEmployees ?? 0,
      icon: Users,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      note: "Total registered employees",
    },
    {
      title: "Total Tasks",
      value: dashboardData.totalTasks ?? 0,
      icon: ListTodo,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      note: "Total tasks in workspace",
    },
    {
      title: "Completed Tasks",
      value: dashboardData.completedTask ?? 0,
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      note: "Tasks successfully completed",
    },
    {
      title: "Pending Tasks",
      value: dashboardData.pendingTask ?? 0,
      icon: Clock,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      note: "Tasks waiting to be completed",
    },
  ];

  // ---------------- TASK PROGRESS ----------------

  const totalTasks = getCount(taskStatsData.totalTasks);

  const completedTasks = getCount(taskStatsData.completedTasks);

  const pendingTasks = getCount(taskStatsData.pendingTasks);

  const taskProgress =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const taskProgressData = {
    total: totalTasks,
    completed: completedTasks,
    pending: pendingTasks,
    percentage: taskProgress,
  };

  // ---------------- TASK BOARD ----------------

  const priorityStyles = {
    high: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const getInitials = (name) => {
    if (!name) return "NA";

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "No due date";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "No due date";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columnConfig = [
    {
      id: "todo",
      title: "To Do",
      description: "Tasks waiting to be started",
      dot: "bg-amber-400",
    },
    {
      id: "in-progress",
      title: "In Progress",
      description: "Currently being worked on",
      dot: "bg-blue-400",
    },
    {
      id: "completed",
      title: "Completed",
      description: "Successfully finished tasks",
      dot: "bg-emerald-400",
    },
  ];

  const taskColumns = columnConfig.map((column) => {
    const columnTasks = tasksListData
      .filter((task) => task.status === column.id)
      .map((task) => {
        const assigneeName = task.assignedTo?.name || "Unassigned";

        const priority = task.priority?.toLowerCase();

        return {
          ...task,
          assigneeName,
          assigneeInitials: getInitials(
            task.assignedTo?.name
          ),
          dueDateLabel: formatDate(task.dueDate),
          priorityLabel: priority
            ? `${priority.charAt(0).toUpperCase()}${priority.slice(1)} Priority`
            : "No Priority",
          priorityClassName:
            priorityStyles[priority] ||
            "border-white/10 bg-white/5 text-zinc-400",
        };
      });

    return {
      ...column,
      tasks: columnTasks,
      taskCount: columnTasks.length,
    };
  });

  // ---------------- DEPARTMENT ANALYTICS ----------------

  const totalDepartmentEmployees = departmentData.reduce(
    (total, department) =>
      total + (department.totalEmployees || 0),
    0
  );

  const departments = departmentData.map((department) => {
    const percentage =
      totalDepartmentEmployees > 0
        ? Math.round(
            (department.totalEmployees / totalDepartmentEmployees) * 100
          )
        : 0;

    return {
      id: department._id,
      name: department.name || "Unnamed Department",
      description: department.description || "",
      members: department.totalEmployees || 0,
      managerName: department.manager?.name || "No manager assigned",
      percentage,
    };
  });

  // ---------------- RETURN ----------------

  return {
    // Dashboard overview
    dashboardData,
    overviewStats,
    dashboardPending: dashboardStatsQuery.isPending,
    dashboardError: dashboardStatsQuery.error,

    // Task progress
    taskProgressData,
    taskStatsPending: taskStatsQuery.isPending,
    taskStatsError: taskStatsQuery.error,

    // Task board
    tasksListData,
    taskColumns,
    tasksListPending: tasksQuery.isPending,
    tasksListError: tasksQuery.error,

    // Department analytics
    departments,
    departmentPending: departmentQuery.isPending,
    departmentError: departmentQuery.error,

    // Common helper
    getErrorMessage,
  };
};

export default useDashboardHook;
