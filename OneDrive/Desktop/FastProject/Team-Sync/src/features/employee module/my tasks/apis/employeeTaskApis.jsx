
import { axiosInstance } from "../../../../config/axiosInstance";

export const getEmployeeKanbanApi = async () => {
  try {
    const res = await axiosInstance.get("/tasks/kanban");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching employee tasks:", error);
    throw error;
  }
};

export const getEmployeeTaskAnalyticsApi = async () => {
  try {
    const res = await axiosInstance.get("/tasks/analytics");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching task analytics:", error);
    throw error;
  }
};

export const getEmployeeTaskByIdApi = async (taskId) => {
  try {
    const res = await axiosInstance.get(`/tasks/${taskId}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    throw error;
  }
};

export const updateEmployeeTaskStatusApi = async ({
  taskId,
  status,
}) => {
  try {
    const res = await axiosInstance.patch(
      `/tasks/status/${taskId}`,
      { status }
    );

    return res.data.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};
