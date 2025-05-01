import { useState, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import MessageType from '@/types/MessageTypes';
import UserType from '@/types/UserTypes';

const useChatData = (userId: string) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messagesRef = useRef<MessageType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchUserDataAndMessages = async () => {
            if (!userId) {
                notFound();
                return;
            }

            const [userRes, messagesRes] = await Promise.all([
                supabase.from('profiles').select('*').eq('id', userId).single(),
                supabase.from('messages').select('*').or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            ]);

            if (userRes.error || !userRes.data) {
                console.error('Error fetching user:', userRes.error?.message);
                notFound();
                return;
            }

            const msgs = messagesRes.error ? [] : (messagesRes.data as MessageType[]);

            setUser(userRes.data as UserType);
            setMessages(msgs);
            messagesRef.current = msgs;
        };

        fetchUserDataAndMessages();
    }, [userId]);

    const addMessage = (newMessage: MessageType) => {
        messagesRef.current = [...messagesRef.current, newMessage];
        setMessages(messagesRef.current);
    };

    const sendMessage = async (content: string) => {
        if (!user || !selectedUser || !content.trim()) return;

        const newMsg: MessageType = {
            id: crypto.randomUUID(), // Just for temporary local UI
            sender_id: user.id,
            receiver_id: selectedUser.id,
            content,
            conversation_id: selectedUser.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        // 🔥 Immediate UI update
        addMessage(newMsg);

        // 📡 Send to DB (actual ID will come from Supabase)
        const { error } = await supabase.from('messages').insert([
            { ...newMsg, id: undefined } // let Supabase assign `id`
        ]);

        if (error) {
            console.error('Error sending message:', error.message);
        }
    };

    return {
        user,
        messages,
        addMessage,
        selectedUser,
        setSelectedUser,
        sendMessage,
    };
};

export default useChatData;
