
export type MessageRole = "user" | "support";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}
