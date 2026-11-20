
import { Search, Plus, Users, MessageCircle } from "lucide-react";
import { conversations } from "./chatData";

const ChatSidebar = ({ selectedChat, onSelectChat }) => {
  return (
    <aside className="flex h-full w-full flex-col border-r border-[var(--border-color)] bg-[var(--bg-card)] lg:w-[300px] lg:shrink-0">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Messages
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Stay connected with your team
            </p>
          </div>

          <button className="rounded-xl bg-[var(--primary)] p-2.5 text-[var(--bg-main)] transition hover:opacity-80">
            <Plus size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            All Messages
          </p>

          <span className="text-xs text-[var(--text-muted)]">
            {conversations.length}
          </span>
        </div>

        <div className="space-y-1">
          {conversations.map((chat) => {
            const active = selectedChat?.id === chat.id;

            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                  active
                    ? "bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]"
                    : "hover:bg-[var(--bg-hover)]"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_15%,var(--bg-card))] text-sm font-semibold text-[var(--primary)]">
                  {chat.type === "group" ? (
                    <Users size={19} />
                  ) : (
                    chat.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                  )}

                  {chat.online && chat.type === "personal" && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--bg-card)] bg-[var(--success)]" />
                  )}
                </div>

                {/* Chat info */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm font-medium ${
                        active
                          ? "text-[var(--primary)]"
                          : "text-[var(--text-primary)]"
                      }`}
                    >
                      {chat.name}
                    </p>

                    <span className="shrink-0 text-[10px] text-[var(--text-muted)]">
                      {chat.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-[var(--text-muted)]">
                      {chat.lastMessage}
                    </p>

                    {chat.unread > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] px-1.5 text-[10px] font-semibold text-[var(--bg-main)]">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom info */}
      <div className="border-t border-[var(--border-color)] p-4">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <MessageCircle size={15} />
          Team-Sync Workspace
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
