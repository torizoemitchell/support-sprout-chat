
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { Message } from "@/types";
import { cn } from "@/lib/utils";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "support",
  content: "Welcome! How can I help you today?",
  timestamp: new Date(),
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "support",
        content: "Thank you for your message. Our team will get back to you soon.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[100vh] bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLastMessage={index === messages.length - 1}
          />
        ))}
        {isTyping && (
          <div className="flex gap-1 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};
