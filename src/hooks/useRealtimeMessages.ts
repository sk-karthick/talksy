import { useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import MessageType from '@/types/MessageTypes';

const useRealtimeMessages = (userId: string, addMessage: (msg: MessageType) => void) => {
    useEffect(() => {
        if (!userId) return;

        const channel = supabase
            .channel('realtime-messages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    const newMessage = payload.new as MessageType;

                    console.log("Received real-time message payload:", payload);

                    if (newMessage.sender_id === userId || newMessage.receiver_id === userId) {
                        console.log('📩 Received real-time message:', newMessage);
                        addMessage(newMessage); // Add message to state
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId, addMessage]);
};

export default useRealtimeMessages;
