'use client';

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import Sidebar from '@/components/Layout/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import Message from '@/components/chat/Message';
import ChatInput from '@/components/chat/ChatInput';

interface UserProfile {
    id: string;
    name: string;
    avatar_url?: string;
}

interface MessageType {
    id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    created_at: string;
}

const ChatPage = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [messages, setMessages] = useState<MessageType[] | null>(null);

    const params = useParams();
    const userId = params.userId as string;

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

            if (userRes.error) {
                console.error('Error fetching user:', userRes.error.message);
                notFound();
                return;
            }

            if (!userRes.data) {
                notFound();
                return;
            }

            setUser(userRes.data);

            if (messagesRes.error) {
                console.error('Error fetching messages:', messagesRes.error?.message);
                setMessages([]);
            } else {
                setMessages(messagesRes.data as MessageType[]);
            }
        };

        fetchUserDataAndMessages();
    }, [userId]);

    if (user === null || messages === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-[#f4f7ff] p-4 m-5 h-[calc(100dvh-2rem)] rounded-4xl overflow-hidden shadow-lg flex gap-10">
            <Sidebar />
            <div className="w-full flex flex-col justify-between">
                <ChatHeader />
                <div className="h-[100dvh] flex flex-col overflow-y-auto justify-end">
                    {messages.length > 0 ? (
                        messages.map((msg) => {
                            const isCurrentUser = msg.sender_id === user.id;
                            const senderName = isCurrentUser ? user.name : 'Other User';
                            const avatarUrl = user.avatar_url || 'https://i.pravatar.cc/150';
                            const timestamp = new Date(msg.created_at).toLocaleTimeString();

                            return (
                                <Message
                                    key={msg.id}
                                    message={msg.message}
                                    sender={senderName}
                                    avatarUrl={avatarUrl}
                                    timestamp={timestamp}
                                    isCurrentUser={isCurrentUser}
                                />
                            );
                        })
                    ) : (
                        <p>No messages available</p>
                    )}
                </div>
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatPage;
