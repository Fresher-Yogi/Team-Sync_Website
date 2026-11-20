import { RefreshCw, UserRound } from "lucide-react";

import useEmployeeProfileHook from "../../hooks/useEmployeeProfileHook";

import ProfileHeader from "../components/ProfileHeader";
import ProfileHero from "../components/ProfileHero";
import ProfileInformation from "../components/profileInformation";

const EmployeeProfile = () => {
  const {
    profile,
    profileDetails,
    isLoading,
    isError,
    error,
    uploadAvatar,
    isUploading,
    uploadError,
    avatarValidationError,
    getErrorMessage,
    retryProfile,
  } = useEmployeeProfileHook();

  if (isLoading) {
    return (
      <div className="min-h-full w-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6 lg:p-8">
        <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-[var(--bg-hover)]" />

        <div className="h-56 animate-pulse rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]" />

        <div className="mt-6 h-72 animate-pulse rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-[var(--bg-main)] p-6 text-center text-[var(--text-primary)]">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] text-[var(--danger)]">
          <UserRound size={25} />
        </div>

        <h2 className="text-lg font-semibold">
          Unable to load profile
        </h2>

        <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
          {getErrorMessage(error)}
        </p>

        <button
          type="button"
          onClick={retryProfile}
          className="mt-5 flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[#101010] transition hover:opacity-90"
        >
          <RefreshCw size={15} />
          Try Again
        </button>
      </div>
    );
  }

  if (!profile.id) return null;

  return (
    <div className="min-h-full w-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-6xl">
        <ProfileHeader />

        <ProfileHero
          profile={profile}
          onAvatarUpload={uploadAvatar}
          isUploading={isUploading}
          uploadError={uploadError}
          avatarValidationError={avatarValidationError}
          getErrorMessage={getErrorMessage}
        />

        <ProfileInformation details={profileDetails} />
      </div>
    </div>
  );
};

export default EmployeeProfile;