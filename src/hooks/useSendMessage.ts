import { useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import UserType from '@/types/UserTypes';

const useSendMessage = (
    userMessage: string,
    user: UserType | null,
    selectedUser: UserType | null,
    onSuccess: () => void
) => {
    useEffect(() => {
        const sendMessage = async () => {
            if (!userMessage || !user || !selectedUser) return;

            try {
                const { data, error } = await supabase.from('messages').insert([
                    {
                        sender_id: user.id,
                        receiver_id: selectedUser.id,
                        content: userMessage,
                        conversation_id: selectedUser.id,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    },
                ]);

                if (error) {
                    console.error('Error sending message:', error.message);
                    return;
                }

                console.log('Message sent successfully:', data);

                // Trigger success callback to update UI if needed
                onSuccess();
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };

        sendMessage();
    }, [userMessage, user, selectedUser, onSuccess]);
};

export default useSendMessage;
