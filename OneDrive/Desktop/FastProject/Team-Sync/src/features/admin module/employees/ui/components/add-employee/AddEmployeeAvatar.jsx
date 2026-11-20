
const AddEmployeeAvatar = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:col-span-3">
      <div className="group relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] transition hover:border-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_5%,var(--bg-surface))]">
        <span className="text-3xl text-[var(--text-muted)] transition group-hover:text-[var(--primary)]">
          +
        </span>

        <span className="mt-2 text-xs font-medium text-[var(--text-secondary)] transition group-hover:text-[var(--primary)]">
          Upload Photo
        </span>
      </div>

      <p className="text-center text-xs text-[var(--text-muted)]">
        JPG or PNG.
        <br />
        Maximum size 800KB.
      </p>
    </div>
  );
};

export default AddEmployeeAvatar;
