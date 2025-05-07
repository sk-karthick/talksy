import supabase from '@/lib/supabaseClient';
import UserTypes from '@/types/UserTypes';
import { useCallback } from 'react';

const useMessageSend = (selectedUser: UserTypes | null, currentUser: UserTypes | null) => {
    const sendMessage = useCallback(
        async (userMessage: string) => {
            if (!userMessage || !selectedUser || !currentUser) return;

            const { error } = await supabase.from('messages').insert([
                {
                    sender_id: currentUser.id,
                    receiver_id: selectedUser.id,
                    content: userMessage,
                    conversation_id: selectedUser.id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ]);

            if (error) {
                console.error('Error sending message:', error.message);
            }
        },
        [selectedUser, currentUser]
    );

    return sendMessage;
};

export default useMessageSend;
