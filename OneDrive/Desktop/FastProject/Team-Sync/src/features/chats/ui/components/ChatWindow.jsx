
import { useState } from "react";
import {
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send,
  Image,
  Info,
} from "lucide-react";

const ChatWindow = ({ chat, onShowDetails }) => {
  const [message, setMessage] = useState("");

  if (!chat) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[var(--bg-main)]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]">
            <Send size={26} />
          </div>
          <h3 className="font-semibold text-[var(--text-primary)]">
            Select a conversation
          </h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Choose a conversation to start messaging.
          </p>
        </div>
      </div>
    );
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // UI only: connect your send-message logic here.
    setMessage("");
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[var(--bg-main)]">
      {/* Chat header */}
      <header className="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-sm font-semibold text-[var(--primary)]">
            {chat.type === "group"
              ? "👥"
              : chat.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {chat.name}
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {chat.type === "group"
                ? `${chat.members} members`
                : chat.online
                  ? "Online"
                  : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button className="hidden rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] sm:block">
            <Phone size={18} />
          </button>

          <button className="hidden rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] sm:block">
            <Video size={19} />
          </button>

          <button
            onClick={onShowDetails}
            className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <Info size={19} />
          </button>

          <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]">
            <MoreHorizontal size={19} />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
        <div className="flex justify-center">
          <span className="rounded-full bg-[var(--bg-hover)] px-3 py-1 text-[10px] text-[var(--text-muted)]">
            Today
          </span>
        </div>

        {chat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[85%] gap-2 sm:max-w-[70%] ${
              msg.isOwn ? "flex-row-reverse" : "flex-row"
            }`}>
              {!msg.isOwn && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--secondary)_15%,transparent)] text-[10px] font-semibold text-[var(--secondary)]">
                  {msg.sender.split(" ").map((word) => word[0]).join("").slice(0, 2)}
                </div>
              )}

              <div>
                {!msg.isOwn && (
                  <p className="mb-1 text-[11px] font-medium text-[var(--text-secondary)]">
                    {msg.sender}
                  </p>
                )}

                <div className={`rounded-2xl px-4 py-3 ${
                  msg.isOwn
                    ? "rounded-tr-sm bg-[var(--primary)] text-[var(--bg-main)]"
                    : "rounded-tl-sm border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)]"
                }`}>
                  <p className="text-sm leading-relaxed">
                    {msg.message}
                  </p>
                </div>

                <p className={`mt-1 text-[10px] text-[var(--text-muted)] ${
                  msg.isOwn ? "text-right" : "text-left"
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message composer */}
      <form
        onSubmit={handleSend}
        className="border-t border-[var(--border-color)] p-4 sm:p-5"
      >
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message ${chat.name}...`}
            rows={2}
            className="w-full resize-none bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--primary)]">
                <Paperclip size={18} />
              </button>
              <button type="button" className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--primary)]">
                <Image size={18} />
              </button>
              <button type="button" className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--primary)]">
                <Smile size={18} />
              </button>
            </div>

            <button
              type="submit"
              disabled={!message.trim()}
              className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--bg-main)] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
              <Send size={15} />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ChatWindow;
