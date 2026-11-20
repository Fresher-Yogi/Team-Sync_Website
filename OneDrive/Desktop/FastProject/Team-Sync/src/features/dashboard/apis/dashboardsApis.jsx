import { axiosInstance } from "../../../config/axiosInstance";

export const dashboardStatsApi = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/stats");
    return res.data;
  } catch (error) {
    console.error("Dashboard stats API error:", error);
    throw error;
  }
};

export const taskStatsApi = async () => {
  try {
    const res = await axiosInstance.get("/tasks/analytics");
    return res.data;
  } catch (error) {
    console.error("Task stats API error:", error);
    throw error;
  }
};

export const tasksApi = async () => {
  try {
    const res = await axiosInstance.get("/tasks");
    return res.data;
  } catch (error) {
    console.error("Tasks API error:", error);
    throw error;
  }
};

export const departmentAnalyticsApi = async () => {
  try {
    const res = await axiosInstance.get("/departments/analytics");
    return res.data;
  } catch (error) {
    console.error("Department analytics API error:", error);
    throw error;
  }
};
