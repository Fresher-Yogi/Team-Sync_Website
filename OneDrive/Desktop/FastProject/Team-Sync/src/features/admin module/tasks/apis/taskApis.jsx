import { axiosInstance } from "../../../../config/axiosInstance";


export const getAllTasks = async ({
  page = 1,
  limit = 20,
  search = "",
  status = "",
  priority = "",
}) => {
  const params = { page, limit };

  if (search.trim()) params.search = search.trim();
  if (status !== "all" && status) params.status = status;
  if (priority !== "all" && priority) params.priority = priority;

  const res = await axiosInstance.get("/tasks", { params });
  return res.data.data;
};

// export let getAllTasks = async ({limit=20}) => {
//   try {
//     let res = await axiosInstance.get(`/tasks?page=1&limit=${limit}`);
//     console.log(res.data.data);
//     return res.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };






// get all employee api
export let getAllEmployee = async ({ limit2 = 20 }) => {
  try {
    let res = await axiosInstance.get(`/employee?page=1&limit=${limit2}`);
    // console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};


// create task api 
export let createTaskApi = async (credential) => {
  try {
    let res = await axiosInstance.post(`/tasks/create`, credential);
    // console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};


export let taskStatsApi = async () => {
  try {
    let res = await axiosInstance.get(`/tasks/analytics`);
    // console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
