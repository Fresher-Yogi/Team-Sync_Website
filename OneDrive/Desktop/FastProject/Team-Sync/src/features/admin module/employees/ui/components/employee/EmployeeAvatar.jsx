
const EmployeeAvatar = ({ name, avatar, status }) => {
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative h-full w-full">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="h-full w-full rounded-full border border-[var(--border-color)] object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full border border-[var(--border-color)] bg-[color-mix(in_srgb,var(--primary)_12%,var(--bg-card))] text-xs font-bold text-[var(--primary)]">
          {initials || "U"}
        </div>
      )}

      <span
        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-card)] ${
          status === "active"
            ? "bg-[var(--success)]"
            : "bg-[var(--text-muted)]"
        }`}
      />
    </div>
  );
};

export default EmployeeAvatar;
