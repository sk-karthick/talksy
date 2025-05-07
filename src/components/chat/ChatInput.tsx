"use client";

import useMessageSend from "@/hooks/useMessageSend";
import UserTypes from "@/types/UserTypes";
import { Send } from "lucide-react";
import React, { useRef } from "react";

interface ChatInputProps {
    selectedUser: UserTypes | null;
    currentUser: UserTypes | null;
}

const ChatInput = ({ selectedUser, currentUser }: ChatInputProps) => {
    const sendMessage = useMessageSend(selectedUser, currentUser);
    const inputRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        const message = inputRef.current?.innerText.trim();
        if (!message) return;

        sendMessage(message);
        inputRef.current!.innerText = "";
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex items-center p-2 bg-white shadow-2xl rounded-full h-16 pr-5 m-7">
            <div
                ref={inputRef}
                contentEditable
                className="flex-1 p-2 min-h-[30px] w-[70%] mx-auto max-h-[150px] overflow-auto text-sm focus:border-none focus:outline-none placeholder:text-gray-500"
                onKeyDown={handleKeyDown}
                role="textbox"
                aria-multiline="true"
            />
            <Send
                onClick={handleSend}
                className="w-10 h-10 p-2 cursor-pointer text-emerald-500 hover:bg-gray-100 rounded"
            />
        </div>
    );
};

export default ChatInput;
