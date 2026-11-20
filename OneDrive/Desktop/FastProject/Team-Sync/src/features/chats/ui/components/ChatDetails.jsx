
import {
  X,
  Users,
  FileText,
  Image,
  Link2,
  MoreHorizontal,
} from "lucide-react";

import { sharedFiles, groupMembers } from "./chatData";

const ChatDetails = ({ chat, onClose }) => {
  if (!chat) return null;

  return (
    <aside className="hidden h-full w-[280px] shrink-0 flex-col overflow-y-auto border-l border-[var(--border-color)] bg-[var(--bg-card)] xl:flex">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] p-5">
        <h3 className="font-semibold text-[var(--text-primary)]">
          Chat Details
        </h3>

        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
        >
          <X size={18} />
        </button>
      </div>

      {/* Profile */}
      <div className="border-b border-[var(--border-color)] p-5 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-lg font-semibold text-[var(--primary)]">
          {chat.type === "group"
            ? <Users size={26} />
            : chat.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}
        </div>

        <h3 className="font-semibold text-[var(--text-primary)]">
          {chat.name}
        </h3>

        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {chat.type === "group"
            ? `${chat.members} members`
            : chat.online
              ? "Active now"
              : "Currently offline"}
        </p>
      </div>

      {/* Members */}
      {chat.type === "group" && (
        <div className="border-b border-[var(--border-color)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              Members
            </h4>
            <span className="text-xs text-[var(--text-muted)]">
              {groupMembers.length}
            </span>
          </div>

          <div className="space-y-4">
            {groupMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--secondary)_15%,transparent)] text-xs font-semibold text-[var(--secondary)]">
                  {member.name.split(" ").map((word) => word[0]).join("")}

                  {member.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-card)] bg-[var(--success)]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[var(--text-primary)]">
                    {member.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">
                    {member.role}
                  </p>
                </div>

                <MoreHorizontal size={16} className="text-[var(--text-muted)]" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shared files */}
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[var(--text-primary)]">
            Shared Files
          </h4>
          <button className="text-xs text-[var(--primary)] hover:opacity-75">
            See all
          </button>
        </div>

        <div className="space-y-3">
          {sharedFiles.map((file) => (
            <div key={file.id} className="flex items-center gap-3">
              <div className="rounded-lg bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] p-2.5 text-[var(--primary)]">
                <FileText size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[var(--text-primary)]">
                  {file.name}
                </p>
                <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                  {file.size}
                </p>
              </div>

              <MoreHorizontal size={16} className="text-[var(--text-muted)]" />
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-[var(--border-color)] pt-5">
          <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
            Shared Media
          </h4>

          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex aspect-square items-center justify-center rounded-xl bg-[var(--bg-hover)] text-[var(--text-muted)]"
              >
                <Image size={20} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3 border-t border-[var(--border-color)] pt-5">
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <Link2 size={16} />
            Shared Links
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatDetails;
