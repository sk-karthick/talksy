// hooks/useRealtimeMessages.ts
import supabase from "@/lib/supabaseClient";
import Message from "@/types/MessageTypes";
import UserTypes from "@/types/UserTypes";
import { useEffect } from "react";

const useRealtimeMessages = (
    currentUser: UserTypes | null,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
    useEffect(() => {
        if (!currentUser?.id) return;

        const channel = supabase
            .channel("realtime-messages")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                },
                (payload) => {
                    const newMessage = payload.new as Message;
                    if (
                        newMessage.sender_id === currentUser.id ||
                        newMessage.receiver_id === currentUser.id
                    ) {
                        setMessages((prev) => [...prev, newMessage]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [currentUser?.id, setMessages]);
};

export default useRealtimeMessages;
