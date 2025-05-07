'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import Sidebar from '@/components/Layout/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import MessageType from '@/types/MessageTypes';
import UserTypes from '@/types/UserTypes';
import MouseLoader from '@/components/ui/mouseLoader';
import useFetchConversations from '@/hooks/useFetchConversations';
import ChatContainer from '@/components/chat/ChatContainer';


const ChatPage = () => {
    const [user, setUser] = useState<UserTypes | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
    const [userMessage, setUserMessage] = useState<string>('');
    const params = useParams();
    const userId = params.userId as string;

    const { conversation, loading, error, currentUser } = useFetchConversations(selectedUser);

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
                    sender_id: currentUser?.id,
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

    return (
        <div className="bg-[#f4f7ff] h-[calc(100dvh-0rem)] overflow-hidden shadow-lg flex">
            <Sidebar setSelectedUser={setSelectedUser} />
            
            <div className="w-full flex flex-col justify-between ">
                {selectedUser ? (
                    <>
                        <ChatHeader selectedUser={selectedUser} />
                        {conversation &&
                            <ChatContainer 
                                conversation={conversation} 
                                currentUser={currentUser} 
                                selectedUser={selectedUser}
                                loading={loading}
                                error={error} />
                        }
                        <ChatInput setUserMessage={setUserMessage} />
                    </>
                ) : (
                    <div className='flex flex-col items-center justify-center h-[100%] gap-y-32'>
                        <p>
                            Select a conversation to start chatting.
                        </p>
                        <MouseLoader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
