import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  currentLoggedInAction,
  loginEmployeeAction,
  registerEmployeeAction,
} from "../state/authAction";

export const useAuthHook = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let loginSubmit = (data) => {
    dispatch(loginEmployeeAction(data));
  };

  let regSubmit = async (data) => {
    try {
      const employee = await dispatch(registerEmployeeAction(data)).unwrap();
      console.log("Registration successful:", employee);
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    regSubmit,
    loginSubmit,
    navigate,
  };
};
