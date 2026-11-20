import { useEffect, useState } from "react";
import {
  Mail,
  ClipboardList,
  MessageSquare,
  Bell,
} from "lucide-react";

import { uploadProfileApi } from "../apis/settingsApi";

const initialNotifications = [
  {
    id: 1,
    title: "Email Notifications",
    description: "Receive important updates through your email.",
    icon: Mail,
    enabled: true,
  },
  {
    id: 2,
    title: "Task Updates",
    description: "Get notified when tasks are assigned or updated.",
    icon: ClipboardList,
    enabled: true,
  },
  {
    id: 3,
    title: "Messages & Mentions",
    description: "Receive alerts when someone mentions you.",
    icon: MessageSquare,
    enabled: true,
  },
  {
    id: 4,
    title: "General Notifications",
    description: "Receive announcements and workspace updates.",
    icon: Bell,
    enabled: false,
  },
];

const useSettingsHook = () => {
  // Active settings tab
  const [activeTab, setActiveTab] = useState("profile");

  // Profile information
  const [profile, setProfile] = useState(() => ({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    department: localStorage.getItem("department") || "",
    role: localStorage.getItem("jobRole") || "",
    avatar: localStorage.getItem("avatar") || "",
  }));

  // Avatar states
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Notification preferences
  const [notifications, setNotifications] = useState(initialNotifications);

  // Clean up the previous preview URL when it changes or component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Select and validate profile image
  const handleImageChange = (file) => {
    if (!file) return;

    setUploadError("");
    setUploadSuccess("");

    // Validate image type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file.");
      return;
    }

    // Validate image size (2 MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image size should not exceed 2 MB.");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload profile image
  const handleUploadProfile = async () => {
    if (!selectedFile) {
      setUploadError("Please select an image first.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError("");
      setUploadSuccess("");

      const result = await uploadProfileApi(selectedFile);

      if (!result?.avatar) {
        throw new Error("Avatar URL not found in API response.");
      }

      // Update profile state
      setProfile((prev) => ({
        ...prev,
        avatar: result.avatar,
      }));

      // Update localStorage
      localStorage.setItem("avatar", result.avatar);

      // Clear selected image
      setPreview("");
      setSelectedFile(null);

      setUploadSuccess("Profile picture uploaded successfully!");

    } catch (error) {
      console.error("Profile upload failed:", error);

      setUploadError(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload profile picture."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Toggle notification preference
  const handleNotificationToggle = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, enabled: !item.enabled }
          : item
      )
    );
  };

  return {
    // Tabs
    activeTab,
    setActiveTab,

    // Profile
    profile,

    // Avatar
    preview,
    currentImage: preview || profile.avatar,
    selectedFile,
    isUploading,
    uploadError,
    uploadSuccess,
    handleImageChange,
    handleUploadProfile,

    // Notifications
    notifications,
    handleNotificationToggle,
  };
};

export default useSettingsHook;