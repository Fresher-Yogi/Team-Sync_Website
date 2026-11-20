
import {
  FolderOpen,
  ShieldCheck,
  Users,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  FileSpreadsheet,
  File as FileIcon,
  MoreHorizontal,
  Download,
  Eye,
} from "lucide-react";

import {
  documentCategories,
  documents,
} from "./documentData";

const categoryIcons = {
  "shield-check": ShieldCheck,
  users: Users,
  "chart-no-axes-combined": ChartNoAxesCombined,
  "clipboard-list": ClipboardList,
};

const fileIcons = {
  "file-pdf": FileText,
  "file-text": FileText,
  "file-spreadsheet": FileSpreadsheet,
  figma: FileIcon,
};

const DocumentContent = () => {
  return (
    <div className="space-y-7">
      {/* Document Categories */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Categories
            </h2>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Documents organized by category
            </p>
          </div>

          <button className="text-sm text-[var(--primary)] transition hover:opacity-75">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {documentCategories.map((category) => {
            const Icon = categoryIcons[category.icon] || FolderOpen;

            return (
              <div
                key={category.id}
                className="group cursor-pointer rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition hover:border-[var(--primary)] hover:bg-[var(--bg-hover)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] p-3 text-[var(--primary)]">
                    <Icon size={21} />
                  </div>

                  <MoreHorizontal
                    size={19}
                    className="text-[var(--text-muted)]"
                  />
                </div>

                <h3 className="font-semibold text-[var(--text-primary)]">
                  {category.title}
                </h3>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--border-color)] pt-4">
                  <span className="text-xs text-[var(--text-muted)]">
                    {category.count} files
                  </span>

                  <FolderOpen
                    size={16}
                    className="text-[var(--text-muted)] transition group-hover:text-[var(--primary)]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Documents Table */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] p-5">
          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              Recent Documents
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              All uploaded workspace documents
            </p>
          </div>

          <span className="rounded-lg bg-[var(--bg-hover)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
            {documents.length} Documents
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
              <tr className="text-xs text-[var(--text-muted)]">
                <th className="px-5 py-4 font-medium">Document Name</th>
                <th className="px-5 py-4 font-medium">Owner</th>
                <th className="px-5 py-4 font-medium">Department</th>
                <th className="px-5 py-4 font-medium">Related Task</th>
                <th className="px-5 py-4 font-medium">Uploaded</th>
                <th className="px-5 py-4 font-medium">Size</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border-color)]">
              {documents.map((document) => {
                const Icon = fileIcons[document.icon] || FileIcon;

                return (
                  <tr
                    key={document.id}
                    className="transition hover:bg-[var(--bg-hover)]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] p-2.5 text-[var(--primary)]">
                          <Icon size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {document.name}
                          </p>

                          <p className="mt-1 text-xs text-[var(--text-muted)]">
                            {document.type}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {document.owner}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-[var(--bg-hover)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)]">
                        {document.department}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {document.task}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-xs text-[var(--text-secondary)]">
                        {document.uploadedAt}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-xs text-[var(--text-secondary)]">
                        {document.size}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          title="Preview"
                          className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] hover:text-[var(--primary)]"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          title="Download"
                          className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] hover:text-[var(--primary)]"
                        >
                          <Download size={16} />
                        </button>

                        <button
                          title="More options"
                          className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                        >
                          <MoreHorizontal size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-color)] px-5 py-4">
          <p className="text-xs text-[var(--text-muted)]">
            Showing {documents.length} of 128 documents
          </p>

          <div className="flex gap-2">
            <button
              disabled
              className="rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-xs text-[var(--text-muted)] disabled:opacity-40"
            >
              Previous
            </button>

            <button className="rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)]">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocumentContent;
