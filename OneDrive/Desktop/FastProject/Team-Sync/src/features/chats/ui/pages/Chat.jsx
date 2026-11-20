
import { useState } from "react";

import { conversations } from "../components/chatData";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import ChatDetails from "../components/ChatDetails";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="h-[calc(100vh-2rem)] w-full overflow-hidden bg-[var(--bg-main)] p-2 text-[var(--text-primary)] sm:p-4">
      <div className="flex h-full overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        {/* Conversations */}
        <ChatSidebar
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />

        {/* Main chat */}
        <ChatWindow
          chat={selectedChat}
          onShowDetails={() => setShowDetails((prev) => !prev)}
        />

        {/* Chat information */}
        {showDetails && (
          <ChatDetails
            chat={selectedChat}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
