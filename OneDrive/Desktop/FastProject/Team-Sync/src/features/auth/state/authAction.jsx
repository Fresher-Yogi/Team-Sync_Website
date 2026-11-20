import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong"
  );
};

export let loginEmployeeAction = createAsyncThunk(
  "auth/login",
  async (credentials, ThunkApi) => {
    try {
      let res = await axiosInstance.post("/auth/login", credentials);

      let admin = res.data.data;

      localStorage.setItem("name", admin.name);
      localStorage.setItem("email", admin.email);
      localStorage.setItem("department", admin.department);
      localStorage.setItem("role", admin.role);
      localStorage.setItem("avatar", admin.avatar || "");

      return admin;
    } catch (error) {
      return ThunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export let registerEmployeeAction = createAsyncThunk(
  "auth/register",
  async (credentials, ThunkApi) => {
    try {
      await axiosInstance.post("/auth/register", credentials);

      const loginRes = await axiosInstance.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      const employee = loginRes.data.data;

      localStorage.setItem("name", employee.name);
      localStorage.setItem("email", employee.email);
      localStorage.setItem("department", employee.department);
      localStorage.setItem("role", employee.role);
      localStorage.setItem("avatar", employee.avatar || "");

      return employee;
    } catch (error) {
      console.error("Registration/Login Error:", error.response?.data || error);

      return ThunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export let currentLoggedInAction = createAsyncThunk(
  "auth/currentloggedUser",
  async (_, ThunkApi) => {
    try {
      let res = await axiosInstance.get("/auth/me");
      return res.data.user;
    } catch (error) {
      return ThunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);













// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../../config/axiosInstance";

// export let loginEmployeeAction = createAsyncThunk(
//   "auth/login",
//   async (credentials, ThunkApi) => {
//     try {
//       let res = await axiosInstance.post("/auth/login", credentials);
//       let admin = res.data.data;
//       localStorage.setItem("name", admin.name);
//       localStorage.setItem("email", admin.email);
//       localStorage.setItem("department", admin.department);
//       localStorage.setItem("role", admin.role);
//       localStorage.setItem("avatar", admin.avatar || "");
//       return res.data.data;
//     } catch (error) {
//       return ThunkApi.rejectWithValue(error);
//     }
//   },
// );


// export let registerEmployeeAction = createAsyncThunk(
//   "auth/register",
//   async (credentials, ThunkApi) => {
//     try {
//       // Step 1: Register employee
//       await axiosInstance.post("/auth/register", credentials);

//       // Step 2: Automatically login after registration
//       const loginRes = await axiosInstance.post("/auth/login", {
//         email: credentials.email,
//         password: credentials.password,
//       });

//       const employee = loginRes.data.data;

//       // Step 3: Save employee information
//       localStorage.setItem("name", employee.name);
//       localStorage.setItem("email", employee.email);
//       localStorage.setItem("department", employee.department);
//       localStorage.setItem("role", employee.role);
//       localStorage.setItem("avatar", employee.avatar || "");

//       // Return logged-in employee
//       return employee;

//     } catch (error) {
//       console.error("Registration/Login Error:", error);
//       return ThunkApi.rejectWithValue(error);
//     }
//   }
// );

// export let currentLoggedInAction = createAsyncThunk(
//   "auth/currentloggedUser",
//   async (_, ThunkApi) => {
//     try {
//       let res = await axiosInstance.get("/auth/me");
//       return res.data.user;
//     } catch (error) {
//       return ThunkApi.rejectWithValue(error);
//     }
//   },
// );
