
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTaskApi,
  getAllEmployee,
  getAllTasks,
  taskStatsApi,
} from "../apis/taskApis";

// Priority Styles
const priorityStyles = {
  high: "bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] text-[var(--danger)] border-[color-mix(in_srgb,var(--danger)_25%,transparent)]",

  medium:
    "bg-[color-mix(in_srgb,var(--warning)_12%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_25%,transparent)]",

  low: "bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_25%,transparent)]",
};

// Status Styles
const statusStyles = {
  todo: "bg-[color-mix(in_srgb,var(--secondary)_12%,transparent)] text-[var(--secondary)] border-[color-mix(in_srgb,var(--secondary)_25%,transparent)]",

  "in-progress":
    "bg-[color-mix(in_srgb,var(--warning)_12%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_25%,transparent)]",

  completed:
    "bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_25%,transparent)]",
};

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
};

const useTaskhook = () => {
  const queryClient = useQueryClient();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
    },
  });

  // Search and filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Get all tasks
  const tasksQuery = useQuery({
    queryKey: [
      "alltasks",
      currentPage,
      limit,
      debouncedSearch,
      status,
      priority,
    ],
    queryFn: () =>
      getAllTasks({
        page: currentPage,
        limit,
        search: debouncedSearch,
        status,
        priority,
      }),
    placeholderData: (previousData) => previousData,
  });

  // Get all employees
  const allEmployeeQuery = useQuery({
    queryKey: ["employees", 276],
    queryFn: () => getAllEmployee({ limit2: 276 }),
  });

  // Get task analytics
  const tasksStatsQuery = useQuery({
    queryKey: ["taskStats"],
    queryFn: taskStatsApi,
  });

  // Create task
  const taskFormSubmit = async (formData) => {
    try {
      await createTaskApi(formData);

      reset();

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["alltasks"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["taskStats"],
        }),
      ]);

      return true;
    } catch (error) {
      console.error("Failed to create task:", error);
      alert(error.response?.data?.message || "Failed to create task");

      return false;
    }
  };

  // Status filter handler
  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  // Priority filter handler
  const handlePriorityChange = (value) => {
    setPriority(value);
    setCurrentPage(1);
  };

  // TaskTable helper logic
  const getPriorityStyle = (priority) => {
    return (
      priorityStyles[priority] ||
      "border-[var(--border-color)] bg-[var(--bg-hover)] text-[var(--text-muted)]"
    );
  };

  const getStatusStyle = (status) => {
    return (
      statusStyles[status] ||
      "border-[var(--border-color)] bg-[var(--bg-hover)] text-[var(--text-muted)]"
    );
  };

  const getStatusLabel = (status) => {
    return statusLabels[status] || status;
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  // TaskStats helper
  const getStatusCount = (taskStatus) => {
    return (
      tasksStatsQuery.data?.tasksByStatus?.find(
        (item) => item._id === taskStatus
      )?.count || 0
    );
  };

  // Pagination data from API
  const pagination = tasksQuery.data?.pagination;

  const paginationCurrentPage = pagination?.page || currentPage;
  const totalPages = pagination?.totalPages || 0;
  const totalTasks = pagination?.total || 0;
  const paginationLimit = pagination?.limit || limit;

  // Pagination calculations
  const startItem =
    totalTasks === 0
      ? 0
      : (paginationCurrentPage - 1) * paginationLimit + 1;

  const endItem = Math.min(
    paginationCurrentPage * paginationLimit,
    totalTasks
  );

  // Show maximum 5 page numbers
  const getPageNumbers = () => {
    const pages = [];

    let start = Math.max(1, paginationCurrentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return {
    // Form
    register,
    reset,
    handleSubmit,
    errors,
    isSubmitting,
    taskFormSubmit,

    // Tasks
    allTasks: tasksQuery.data?.tasks || [],
    pagination: tasksQuery.data?.pagination,
    allTasksIsPending: tasksQuery.isPending,
    allTasksIsFetching: tasksQuery.isFetching,
    tasksError: tasksQuery.error,

    // Employees
    employees: allEmployeeQuery.data,
    employeesIsPending: allEmployeeQuery.isPending,

    // Analytics
    tasksStatsData: tasksStatsQuery.data,
    tasksStatsIsPending: tasksStatsQuery.isPending,
    getStatusCount,

    // Search and filters
    search,
    setSearch,
    status,
    handleStatusChange,
    priority,
    handlePriorityChange,

    // Pagination
    currentPage,
    setCurrentPage,
    startItem,
    endItem,
    pageNumbers,
    totalPages,
    totalTasks,
    paginationLimit,
    paginationCurrentPage,

    // TaskTable helpers
    getPriorityStyle,
    getStatusStyle,
    getStatusLabel,
    formatDate,
    getInitials,
  };
};

export default useTaskhook;
