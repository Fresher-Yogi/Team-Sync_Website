import { UserRound } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <UserRound size={16} />
        <span>Workspace</span>
        <span>/</span>
        <span className="text-[var(--primary)]">My Profile</span>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
        My Profile
      </h1>

      <p className="text-sm text-[var(--text-secondary)]">
        Manage your personal information and profile picture.
      </p>
    </div>
  );
};

export default ProfileHeader;