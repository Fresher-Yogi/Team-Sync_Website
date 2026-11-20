import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { getAllDepartmentsApi } from "../apis/departmentApis";
import { useNavigate } from "react-router";
import { getAllEmployees, createDepartment } from "../../employees/apis/employeeApis";

const useDepartmentHook = () => {
  let departmentQuery = useQuery({
    queryKey: ["allDepartments"],
    queryFn: getAllDepartmentsApi,
  });

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      manager: "",
      employees: [],
      description: "",
    },
  });

  let employeeQuery = useQuery({
    queryKey: ["employees", 1],
    queryFn: () => getAllEmployees({ currentPage: 1, limit: 276 }),
  });

  const onSubmit = async (data) => {
    console.log("Department Data:", data);

    try {
      const response = await createDepartment(data);

      console.log("Department Created:", response);

      reset();
    } catch (error) {
      console.log(
        "Department Creation Failed:",
        error.response?.data || error.message,
      );
    }
  };

  const handleCancel = () => {
    reset();
  };

  return {
    departmentData: departmentQuery.data,
    departmentIsPending: departmentQuery.isPending,
    navigate,
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit,
    handleCancel,
    employees: employeeQuery.data,
    employeeIsPending: employeeQuery.isPending,
  };
};

export default useDepartmentHook;
