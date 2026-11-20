import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  addNewEmployee,
  getAllEmployees,
  updateEmployee,
} from "../apis/employeeApis";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useEmployeesHook = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    role: "",
    status: "",
  });

  let navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["employees", currentPage, filters],
    queryFn: () =>
      getAllEmployees({
        currentPage,
        limit: 20,
        role: filters.role,
        status: filters.status,
        department: filters.department,
        search: filters.search,
      }),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  let handleSearchFilters = (name, value) => {
    setCurrentPage(1);
    setFilters({ ...filters, [name]: value });
  };

  let handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  let location = useLocation();

  let employeeToEdit = location.state?.employee || null;
  console.log(employeeToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      department: "",
      role: "",
      joiningDate: "",
      status: "active",
    },
  });

  // Handlimg Form Submission
  const onSubmit = async (data) => {
    const employeeData = {
      name: data.name,
      email: data.email,
      department: data.department,
      role: data.role,
      status: data.status,
      bio: data.bio,
      joiningDate: data.joiningDate,
      password: "12345678",
    };

    if (employeeToEdit) {
      // Api call for edit new Employee

      try {
        let updatedEmp = await updateEmployee(employeeToEdit, employeeData);
        console.log(updatedEmp);
        alert("employee updated sucessfully");
        navigate("/home/employees");
      } catch (error) {
        console.log(error);
        alert("employee updation failed");
      }
    } else {
      // Api call for creating new Employee

      try {
        let newEmp = await addNewEmployee(employeeData);
        console.log(newEmp);
        alert("employee created sucessfully");
        reset();
      } catch (error) {
        console.log(error);
        alert("employee creation failed");
      }
    }
  };

  // Handling edit employee

  useEffect(() => {
    if (employeeToEdit) {
      reset(employeeToEdit);
    }
  }, [employeeToEdit, reset]);

  // Handling Cancel
  const handleCancel = () => {
    reset();
  };

  return {
    employeeToEdit,
    onsubmit,
    handleCancel,
    data,
    isPending,
    handlePageChange,
    filters,
    handleSearchFilters,
    navigate,
    location,
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit
  };
};

export default useEmployeesHook;
