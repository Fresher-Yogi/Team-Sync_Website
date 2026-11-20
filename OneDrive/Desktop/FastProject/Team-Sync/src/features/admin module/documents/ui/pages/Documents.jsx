
import { FileText } from "lucide-react";
import DocumentStats from "../components/DocumentStats";
import DocumentToolbar from "../components/DocumentToolbar";
import DocumentContent from "../components/DocumentContent";

const Documents = () => {
  return (
    <div className="min-h-full w-full bg-[var(--bg-main)] p-4 text-[var(--text-primary)] sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <FileText size={21} className="text-[var(--primary)]" />

            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Documents
            </h1>
          </div>

          <p className="text-sm text-[var(--text-muted)]">
            Store, organize and manage your workspace documents.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <DocumentStats />

      {/* Search and Toolbar */}
      <DocumentToolbar />

      {/* Categories and Documents */}
      <DocumentContent />
    </div>
  );
};

export default Documents;
