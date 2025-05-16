'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import MessageType from '@/types/MessageTypes';
import UserTypes from '@/types/UserTypes';
import MouseLoader from '@/components/ui/mouseLoader';
import useFetchConversations from '@/hooks/useFetchConversations';
import ChatContainer from '@/components/chat/ChatContainer';
import useRealtimeMessages from '@/hooks/useRealtimeChat';
import useCheckOnlineStatus from '@/hooks/useCheckOnlineStatus';


const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    useCheckOnlineStatus();
    const { conversation, loading, error, currentUser } = useFetchConversations(selectedUser);

    useEffect(() => {
        if (conversation) setMessages(conversation);
    }, [conversation])

    useRealtimeMessages(currentUser, setMessages);

    return (
        <div className="bg-[#f4f7ff] h-[calc(100dvh-0rem)] overflow-hidden shadow-lg flex">
            <Sidebar setSelectedUser={setSelectedUser} />

            <div className="w-full flex flex-col justify-between ">
                {selectedUser ? (
                    <>
                        <ChatHeader selectedUser={selectedUser} />
                        {conversation &&
                            <ChatContainer
                                messages={messages}
                                currentUser={currentUser}
                                selectedUser={selectedUser}
                                loading={loading}
                                error={error} />
                        }
                        <ChatInput
                            currentUser={currentUser}
                            selectedUser={selectedUser}
                            setMessages={setMessages}
                        />
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
