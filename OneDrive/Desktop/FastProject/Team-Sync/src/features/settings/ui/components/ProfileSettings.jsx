import { useRef } from "react";

import {
  Camera,
  UserRound,
  Mail,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

const inputStyle =
  "mt-2 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-hover)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]";

const ProfileSettings = ({
  profile,
  currentImage,
  selectedFile,
  isUploading,
  uploadError,
  uploadSuccess,
  onImageChange,
  onUpload,
}) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    onImageChange(file);

    // Allows selecting the same file again
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Profile Information
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Update your personal information and profile details.
          </p>
        </div>

        {/* Avatar */}
        <div className="mb-8 flex flex-wrap items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-2xl font-bold text-[var(--primary)]">
            {currentImage ? (
              <img
                src={currentImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              profile.name?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Profile Photo
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              JPG, PNG or GIF. Maximum size 2MB.
            </p>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={handleImageClick}
              className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-hover)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--text-primary)]"
            >
              <Camera size={14} />
              Change Photo
            </button>

            {selectedFile && (
              <button
                type="button"
                onClick={onUpload}
                disabled={isUploading}
                className="ml-2 mt-3 rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-semibold text-[#101010] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload Photo"}
              </button>
            )}

            {uploadError && (
              <p className="mt-2 text-xs text-[var(--danger)]">
                {uploadError}
              </p>
            )}

            {uploadSuccess && (
              <p className="mt-2 text-xs text-[var(--success)]">
                {uploadSuccess}
              </p>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Full Name
            </label>

            <div className="relative">
              <UserRound
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="text"
                placeholder="Enter your full name"
                defaultValue={profile.name}
                className={`${inputStyle} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="email"
                placeholder="Enter your email"
                defaultValue={profile.email}
                className={`${inputStyle} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Department
            </label>

            <div className="relative">
              <Building2
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="text"
                placeholder="Department"
                defaultValue={profile.department}
                className={`${inputStyle} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Job Role
            </label>

            <div className="relative">
              <BriefcaseBusiness
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="text"
                placeholder="Your role"
                defaultValue={profile.role}
                className={`${inputStyle} pl-11`}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end border-t border-[var(--border-color)] pt-5">
          <button
            type="button"
            className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[#101010] transition hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </section>

      {/* Additional Information */}
      <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 sm:p-6">
        <h3 className="text-base font-semibold text-[var(--text-primary)]">
          Account Information
        </h3>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Your workspace details.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-hover)] p-4">
            <p className="text-xs text-[var(--text-muted)]">Account Status</p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--success)]" />

              <span className="text-sm font-medium text-[var(--success)]">
                Active
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-hover)] p-4">
            <p className="text-xs text-[var(--text-muted)]">Workspace</p>

            <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
              Team-Sync
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSettings;