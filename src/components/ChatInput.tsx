
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useRef, useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
    setMessage(textarea.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-background/80 backdrop-blur-sm">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="resize-none min-h-[44px] max-h-[150px] py-3 rounded-xl"
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || disabled}
        className="shrink-0 rounded-xl transition-transform active:scale-95"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
