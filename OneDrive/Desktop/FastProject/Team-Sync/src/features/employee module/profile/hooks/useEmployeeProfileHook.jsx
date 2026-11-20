
import { useEffect, useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  UserRound,
  Mail,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  Hash,
} from "lucide-react";

import {
  getLoggedInUserApi,
  getEmployeeProfileApi,
  uploadProfileAvatarApi,
} from "../apis/profileApis";

const useEmployeeProfileHook = () => {
  const queryClient = useQueryClient();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarValidationError, setAvatarValidationError] = useState("");

  // --------------------------------------------------
  // QUERY KEYS
  // --------------------------------------------------

  const userQueryKey = ["logged-in-user"];

  const getEmployeeQueryKey = (empId) => [
    "employee-profile",
    empId,
  ];

  // --------------------------------------------------
  // COMMON HELPERS
  // --------------------------------------------------

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again."
    );
  };

  const getValue = (value, fallback = "Not available") => {
    return value || fallback;
  };

  // --------------------------------------------------
  // LOGGED-IN USER QUERY
  // --------------------------------------------------

  const userQuery = useQuery({
    queryKey: userQueryKey,
    queryFn: getLoggedInUserApi,
  });

  const user = userQuery.data;

  const empId = user?._id || user?.id;

  // --------------------------------------------------
  // EMPLOYEE PROFILE QUERY
  // --------------------------------------------------

  const employeeQuery = useQuery({
    queryKey: getEmployeeQueryKey(empId),
    queryFn: () => getEmployeeProfileApi(empId),
    enabled: Boolean(empId),
  });

  const employee = employeeQuery.data;

  // --------------------------------------------------
  // PREPARE PROFILE DATA
  // --------------------------------------------------

  const profile = {
    id: employee?._id || user?._id || user?.id,

    name: employee?.name || user?.name || "User",

    email: employee?.email || user?.email || "",

    avatar: avatarPreview || employee?.avatar || user?.avatar || "",

    role: employee?.role || user?.role || "employee",

    department:
      employee?.department ||
      user?.department ||
      "Not assigned",

    status: employee?.status || user?.status || "active",

    statusClassName:
      (employee?.status || user?.status || "active") === "active"
        ? "bg-emerald-500/10 text-emerald-400"
        : "bg-red-500/10 text-red-400",
  };

  // --------------------------------------------------
  // PROFILE INFORMATION
  // --------------------------------------------------

  const profileDetails = [
    {
      label: "Full Name",
      value: getValue(profile.name),
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: getValue(profile.email),
      icon: Mail,
    },
    {
      label: "Employee ID",
      value: getValue(profile.id),
      icon: Hash,
    },
    {
      label: "Role",
      value: getValue(profile.role),
      icon: BriefcaseBusiness,
      capitalize: true,
    },
    {
      label: "Department",
      value: getValue(profile.department),
      icon: Building2,
      capitalize: true,
    },
    {
      label: "Account Status",
      value: getValue(profile.status),
      icon: ShieldCheck,
      capitalize: true,
    },
  ];

  // --------------------------------------------------
  // AVATAR UPLOAD MUTATION
  // --------------------------------------------------

  const avatarMutation = useMutation({
    mutationFn: uploadProfileAvatarApi,

    onSuccess: async (uploadedData) => {
      const uploadedAvatar = uploadedData?.avatar;

      // Update logged-in user cache
      queryClient.setQueryData(
        userQueryKey,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            avatar: uploadedAvatar || oldData.avatar,
          };
        }
      );

      // Update employee profile cache
      if (empId) {
        queryClient.setQueryData(
          getEmployeeQueryKey(empId),
          (oldData) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              avatar: uploadedAvatar || oldData.avatar,
            };
          }
        );
      }

      // Remove local preview after successful upload
      setAvatarPreview(null);
      setAvatarValidationError("");
    },
  });

  // --------------------------------------------------
  // AVATAR PREVIEW CLEANUP
  // --------------------------------------------------

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // --------------------------------------------------
  // AVATAR VALIDATION + UPLOAD
  // --------------------------------------------------

  const handleAvatarUpload = async (file) => {
    if (!file) return false;

    setAvatarValidationError("");

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setAvatarValidationError(
        "Please select a valid image."
      );

      return false;
    }

    // Validate file size (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setAvatarValidationError(
        "Image size should be less than 5MB."
      );

      return false;
    }

    // Create local preview
    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);

    try {
      await avatarMutation.mutateAsync(file);
      return true;
    } catch (error) {
      setAvatarPreview(null);
      return false;
    }
  };

  // --------------------------------------------------
  // LOADING + ERROR STATES
  // --------------------------------------------------

  const isLoading =
    userQuery.isPending ||
    (Boolean(empId) && employeeQuery.isPending);

  const isError =
    userQuery.isError ||
    employeeQuery.isError;

  const error =
    userQuery.error ||
    employeeQuery.error;

  // --------------------------------------------------
  // RETRY
  // --------------------------------------------------

  const retryProfile = async () => {
    const result = await userQuery.refetch();

    if (result.data?._id || result.data?.id) {
      await queryClient.invalidateQueries({
        queryKey: ["employee-profile"],
      });
    }
  };

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return {
    // Profile data
    user,
    employee,
    profile,
    profileDetails,

    // Loading and error
    isLoading,
    isError,
    error,
    getErrorMessage,
    retryProfile,

    // Avatar upload
    uploadAvatar: handleAvatarUpload,
    isUploading: avatarMutation.isPending,
    uploadError: avatarMutation.error,
    avatarValidationError,
  };
};

export default useEmployeeProfileHook;
