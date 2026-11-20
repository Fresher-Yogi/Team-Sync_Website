import { useRef } from "react";

import {
  Camera,
  Mail,
  BriefcaseBusiness,
  Building2,
  LoaderCircle,
} from "lucide-react";

const ProfileHero = ({
  profile,
  onAvatarUpload,
  isUploading,
  uploadError,
  avatarValidationError,
  getErrorMessage,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    await onAvatarUpload(file);

    // Allow selecting the same file again
    event.target.value = "";
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">

        {/* Avatar */}
        <div className="relative mx-auto sm:mx-0">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[var(--border-color)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--bg-card))] text-3xl font-bold text-[var(--primary)]">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              profile.name.charAt(0).toUpperCase()
            )}
          </div>

          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[var(--bg-card)] bg-[var(--primary)] text-[#101010] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            title="Change profile picture"
          >
            {isUploading ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <Camera size={16} />
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* User Details */}
        <div className="min-w-0 flex-1 text-center sm:text-left">

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
              {profile.name}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${profile.statusClassName}`}
            >
              {profile.status}
            </span>
          </div>

          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)] sm:justify-start">
            <Mail size={15} />
            <span className="truncate">
              {profile.email}
            </span>
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">

            <span className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-hover)] px-3 py-2 text-xs capitalize text-[var(--text-secondary)]">
              <BriefcaseBusiness
                size={14}
                className="text-[var(--primary)]"
              />
              {profile.role}
            </span>

            <span className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-hover)] px-3 py-2 text-xs capitalize text-[var(--text-secondary)]">
              <Building2
                size={14}
                className="text-[var(--primary)]"
              />
              {profile.department}
            </span>

          </div>

          <p className="mt-4 text-xs text-[var(--text-muted)]">
            Click the camera icon to update your profile picture.
          </p>

          {avatarValidationError && (
            <p className="mt-3 text-xs text-[var(--danger)]">
              {avatarValidationError}
            </p>
          )}

          {uploadError && (
            <p className="mt-3 text-xs text-[var(--danger)]">
              {getErrorMessage(uploadError)}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfileHero;