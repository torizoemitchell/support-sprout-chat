
import { cn } from "@/lib/utils";
import { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export const ChatMessage = ({ message, isLastMessage }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full animate-message-slide-in opacity-0",
        isUser ? "justify-end" : "justify-start",
        isLastMessage && "mb-4"
      )}
      style={{
        animationDelay: "100ms",
      }}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
          isUser
            ? "bg-chat-user text-foreground"
            : "bg-chat-support text-primary-foreground"
        )}
      >
        {message.content}
      </div>
    </div>
  );
};
