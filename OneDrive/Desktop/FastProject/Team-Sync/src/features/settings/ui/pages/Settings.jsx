import { Settings as SettingsIcon } from "lucide-react";

import SettingsSidebar from "../components/SettingsSidebar";
import ProfileSettings from "../components/ProfileSettings";
import AccountSettings from "../components/AccountSettings";
import NotificationSettings from "../components/NotificationSettings";
import useSettingsHook from "../../hooks/useSettingsHook";


const Settings = () => {
  const {
    activeTab,
    setActiveTab,
    profile,
    currentImage,
    selectedFile,
    isUploading,
    uploadError,
    uploadSuccess,
    handleImageChange,
    handleUploadProfile,
    notifications,
    handleNotificationToggle,
  } = useSettingsHook();

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSettings
            profile={profile}
            currentImage={currentImage}
            selectedFile={selectedFile}
            isUploading={isUploading}
            uploadError={uploadError}
            uploadSuccess={uploadSuccess}
            onImageChange={handleImageChange}
            onUpload={handleUploadProfile}
          />
        );

      case "account":
        return <AccountSettings />;

      case "notifications":
        return (
          <NotificationSettings
            notifications={notifications}
            onToggle={handleNotificationToggle}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-full w-full bg-[var(--bg-main)] p-4 text-[var(--text-primary)] sm:p-6 lg:p-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]">
            <SettingsIcon size={22} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Settings
          </h1>
        </div>

        <p className="text-sm text-[var(--text-muted)]">
          Manage your profile, account preferences and notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <SettingsSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="min-w-0">{renderActiveTab()}</div>
      </div>
    </div>
  );
};

export default Settings;