
import { Search, Upload } from "lucide-react";

const DocumentToolbar = () => {
  const inputClasses =
    "w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] py-2.5 px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]";

  return (
    <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          All Documents
        </h2>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Browse and manage your workspace documents
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative min-w-0 sm:w-64">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />

          <input
            type="text"
            placeholder="Search documents..."
            className={`${inputClasses} pl-10`}
          />
        </div>

        {/* Department Filter */}
        <select className={`${inputClasses} cursor-pointer sm:w-auto`}>
          <option>All Departments</option>
          <option>HR</option>
          <option>Development</option>
          <option>Design</option>
          <option>Finance</option>
        </select>

        {/* File Type Filter */}
        <select className={`${inputClasses} cursor-pointer sm:w-auto`}>
          <option>All Types</option>
          <option>PDF</option>
          <option>DOCX</option>
          <option>XLSX</option>
        </select>

        {/* Upload Button */}
        <button className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--bg-main)] transition hover:opacity-85">
          <Upload size={16} />
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default DocumentToolbar;
