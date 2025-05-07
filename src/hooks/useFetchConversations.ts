import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import Message from '@/types/MessageTypes';
import UserTypes from '@/types/UserTypes';

const useFetchConversations = (selectedUser: UserTypes | null) => {
    const [conversation, setConversation] = useState<Message[] | null>(null);
    const [currentUser, setCurrentUser] = useState<UserTypes | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConversation = async () => {
            if (!selectedUser) {
                setConversation(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const {
                    data: { user },
                    error: profileError,
                } = await supabase.auth.getUser();

                if (profileError) throw profileError;

                const { data: userDetail, error: userError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user?.id)
                    .single();

                if (userError) throw userError;
                setCurrentUser(userDetail);

                const { data: messages, error: messagesError } = await supabase
                    .from('messages')
                    .select('*')
                    .or(
                        `and(sender_id.eq.${user?.id},receiver_id.eq.${selectedUser.id}),and(sender_id.eq.${selectedUser.id},receiver_id.eq.${user?.id})`
                    )
                    .order('created_at', { ascending: true });

                if (messagesError) throw messagesError;

                setConversation(messages);
            } catch (err: any) {
                console.error('Error fetching messages:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConversation();
    }, [selectedUser]);

    return { conversation, loading, error, currentUser };
};

export default useFetchConversations;
