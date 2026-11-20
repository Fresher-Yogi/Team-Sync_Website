import { createSlice } from "@reduxjs/toolkit";
import {
  currentLoggedInAction,
  loginEmployeeAction,
  registerEmployeeAction,
} from "./authAction";

let authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    employee: null,
  },
  reducers: {
    addEmployee: (state, actions) => {
      ((state.isLoading = false), (state.employee = actions.payload));
    },
    removeEmployee: (state, actions) => {
      ((state.isLoading = false), (state.employee = null));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmployeeAction.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(loginEmployeeAction.fulfilled, (state, actions) => {
        ((state.isLoading = false), (state.employee = actions.payload));
      })
      .addCase(loginEmployeeAction.rejected, (state, actions) => {
        state.isLoading = false;
      })
      .addCase(currentLoggedInAction.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(currentLoggedInAction.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.employee = actions.payload;
      })
      .addCase(currentLoggedInAction.rejected, (state, actions) => {
        state.isLoading = false;
      })
      .addCase(registerEmployeeAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerEmployeeAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee = action.payload;
      })
      .addCase(registerEmployeeAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export let { addEmployee, removeEmployee } = authSlice.actions;

export default authSlice.reducer;
