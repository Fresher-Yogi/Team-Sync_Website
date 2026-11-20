import { axiosInstance } from "../../../config/axiosInstance";

export const uploadProfileApi = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axiosInstance.post(
      "/employee/upload-profile",
      formData
    );

    return res.data.data;
  } catch (error) {
    console.error("Profile upload API error:", error);
    throw error;
  }
};