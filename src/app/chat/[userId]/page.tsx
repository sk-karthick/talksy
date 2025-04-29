'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import supabase from '@/lib/supabaseClient';

const ChatPage = () => {
    const [user, setUser] = useState<any>(null);
    const [messages, setMessages] = useState<any[] | null>(null);

    const params = useParams();
    const userId = params.userId as string;
    const router = useRouter();

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
            console.log('userRes:', userId);
            

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
                setMessages(messagesRes.data);
            }
        };

        fetchUserDataAndMessages();
    }, [userId]);

    if (!user || messages === null) {
        return <div>Loading...</div>;
    }
    console.log('User:', user);
    console.log('Messages:', messages);

    return (
        <div className="chat-container">
            <h1>Chat with {user.username}</h1>
            <p>Messages </p>
            {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender_id === userId ? 'sent' : 'received'}`}>
                    <p>{message.content}</p>
                    <span>{new Date(message.created_at).toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

export default ChatPage;
