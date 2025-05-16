import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Check, CheckCheck } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  sender: string;
  avatarUrl: string;
  timestamp: string;
  isCurrentUser?: boolean;
  status?: "sent" | "delivered" | "read";
}

export default function MessageBubble({
  message,
  sender,
  avatarUrl,
  timestamp,
  isCurrentUser = false,
  status = "sent",
}: ChatBubbleProps) {
  const isSent = status === "sent";
  const isDelivered = status === "delivered";
  const isRead = status === "read";
  return (
    <div className={`flex items-end ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isCurrentUser && (
        <Avatar className="w-8 h-8 mr-2">
          <AvatarImage src={avatarUrl} alt={sender} />
        </Avatar>
      )}

      <div className={`max-w-xs md:max-w-md break-words px-4 py-3 rounded-2xl shadow
        ${isCurrentUser
          ? "bg-blue-600 text-white rounded-br-none"
          : "bg-gray-100 text-gray-900 rounded-bl-none"}
      `}>
        <p className="text-md pr-12">{message}</p>
        <span className={`text-[11px]  mt-1 text-right  flex items-center gap-4 ${isCurrentUser ? 'text-gray-100 justify-end' : 'text-gray-600'}`}>
          {timestamp}
          {/* {
            isCurrentUser &&
            <>
              {isSent && <Check className="w-4 h-4" />}
              {isDelivered || isRead && <CheckCheck className={`${isRead ? 'text-green-500' : ''}`} />}
            </>
          } */}

        </span>
      </div>

      {isCurrentUser && (
        <Avatar className="w-8 h-8 ml-2">
          <AvatarImage src={avatarUrl} alt={sender} />
        </Avatar>
      )}
    </div>
  );
}
