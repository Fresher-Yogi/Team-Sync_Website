import { axiosInstance } from "../../../../config/axiosInstance";

export let getAllEmployees = async ({
  currentPage = 1,
  limit = 20,
  role = "",
  search = "",
  department = "",
  status = "",
}) => {
  try {
    let res = await axiosInstance.get(
      `/employee?page=${currentPage}&limit=${limit}&search=${search}&role=${role}&department=${department}&status=${status}`,
    );

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export let addNewEmployee = async (data) => {
  try {
    let res = await axiosInstance.post("/employee/create", data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};



export let updateEmployee = async (employee, data)=>{
  try {
      let res = await axiosInstance.patch(`/employee/update/${employee._id}`, data)
      console.log(res.data);
      return res.data;
  } catch (error) {
    console.log('error in markInactiveEmployee API', error);
  }
}


export let deleteEmployee = async(employee)=>{
  try {
    let res = await axiosInstance.delete(`/employee/delete/${employee._id}`);
    console.log(res)
    return res.data
  } catch (error) {
    console.log(error);
    throw error
  }
 }


 export let createDepartment = async (credentials) => {
  try {
    let res = await axiosInstance.post(
      "/departments/create",
      credentials
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Create Department Error:", error.response?.data || error.message );
    alert("The Api is not working for this feature, Please try again after fix this api issue..")
    // throw error;
  }
};