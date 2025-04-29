import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatBubbleProps {
  message: string;
  sender: string;
  avatarUrl: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

export default function Message({
  message,
  sender,
  avatarUrl,
  timestamp,
  isCurrentUser = false,
}: ChatBubbleProps) {
  return (
    <div className={`flex items-end ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isCurrentUser && (
        <Avatar className="w-8 h-8 mr-2">
          <AvatarImage src={avatarUrl} alt={sender} />
          <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-xs md:max-w-md break-words px-4 py-3 rounded-2xl shadow
        ${isCurrentUser
          ? "bg-blue-600 text-white rounded-br-none"
          : "bg-gray-100 text-gray-900 rounded-bl-none"}
      `}>
        <p className="text-md">{message}</p>
        <span className="text-[10px] text-gray-400 mt-1 block text-right">{timestamp}</span>
      </div>

      {isCurrentUser && (
        <Avatar className="w-8 h-8 ml-2">
          <AvatarImage src={avatarUrl} alt={sender} />
          <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
