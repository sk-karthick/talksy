'use client';

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import Sidebar from '@/components/Layout/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageBubble from '@/components/chat/Message';
import ChatInput from '@/components/chat/ChatInput';
import MessageType from '@/types/MessageTypes';
import UserType from '@/types/UserTypes';


const ChatPage = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [userMessage, setUserMessage] = useState<string>('');
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

            if (userRes.error || !userRes.data) {
                console.error('Error fetching user:', userRes.error?.message);
                notFound();
                return;
            }

            setUser(userRes.data as UserType);

            if (messagesRes.error) {
                console.error('Error fetching messages:', messagesRes.error?.message);
                setMessages([]);
            } else {
                setMessages(messagesRes.data as MessageType[]);
            }
        };

        fetchUserDataAndMessages();
    }, [userId]);

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

                    if (newMessage.sender_id === userId || newMessage.receiver_id === userId) {
                        setMessages((prev) => [...prev, newMessage]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    useEffect(() => {
        const sendMessage = async () => {
            if (!userMessage || !user || !selectedUser) return;

            const { error } = await supabase.from('messages').insert([
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
            }

            setUserMessage('');
        };

        sendMessage();
    }, [userMessage]);

    if (!user || !messages) return <div>Loading...</div>;

    return (
        <div className="bg-[#f4f7ff] p-4 m-5 h-[calc(100dvh-2rem)] rounded-4xl overflow-hidden shadow-lg flex gap-10">
            <Sidebar messages={messages} setSelectedUser={setSelectedUser} currentUserId={user.id} />

            <div className="w-full flex flex-col justify-between">
                {selectedUser ? (
                    <>
                        <ChatHeader user={user} selectedUser={selectedUser} />
                        <div className='m-h-[100dvh] overflow-y-auto pr-3'>
                            <div className=" flex flex-col justify-end">
                                {messages.length > 0 ? (
                                    messages.map((msg) => {
                                        const isCurrentUser = msg.sender_id === user.id;
                                        const senderName = isCurrentUser ? user.name : selectedUser.name;
                                        const avatarUrl = isCurrentUser
                                            ? user.avatar_url || 'https://i.pravatar.cc/150'
                                            : selectedUser.avatar_url || 'https://i.pravatar.cc/150';
                                        const timestamp = new Date(msg.created_at).toLocaleString();

                                        return (
                                            <MessageBubble
                                                key={msg.id}
                                                message={msg.content}
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
                        </div>
                    </>
                ) : (
                    <p>Select a conversation to start chatting.</p>
                )}
                <ChatInput setUserMessage={setUserMessage} />
            </div>
        </div>
    );
};

export default ChatPage;
