
import { axiosInstance } from "../../../../config/axiosInstance";

// Get logged-in user
export const getLoggedInUserApi = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data.user;
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    throw error;
  }
};

// Get employee details by ID
export const getEmployeeProfileApi = async (empId) => {
  try {
    const res = await axiosInstance.get(`/employee/${empId}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    throw error;
  }
};

// Upload profile avatar
export const uploadProfileAvatarApi = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axiosInstance.post(
      "/employee/upload-profile",
      formData
    );

    return res.data.data;
  } catch (error) {
    console.error("Error uploading profile avatar:", error);
    throw error;
  }
};
