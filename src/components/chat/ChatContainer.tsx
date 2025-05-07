import Message from '@/types/MessageTypes';
import UserTypes from '@/types/UserTypes';
import React, { useRef } from 'react'
import MessageBubble from './Message';
import UseAutoScroll from '@/hooks/UseAutoScroll';

interface ChatContainerProps {
    messages: Message[] | null;
    loading: boolean;
    error: string | null;
    currentUser: UserTypes | null;
    selectedUser: UserTypes | null;
}

const ChatContainer = ({ messages, loading, error, currentUser, selectedUser }: ChatContainerProps) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    UseAutoScroll({ chatContainerRef, messages, selectedUser });

    return (
        <div className='h-[85dvh] overflow-y-auto' ref={chatContainerRef}>
            <div className="flex flex-col justify-end min-h-[100%] px-10 pt-10 pb-4" >
                <div className="flex-grow" />

                {messages && messages.length > 0 ? (
                    messages.map((msg) => {
                        const isCurrentUser = msg.sender_id === currentUser?.id;
                        const senderName = isCurrentUser ? currentUser?.username : selectedUser?.name;
                        const avatarUrl = isCurrentUser
                            ? currentUser?.avatar_url || 'https://i.pravatar.cc/150'
                            : selectedUser?.avatar_url || 'https://i.pravatar.cc/150';
                        const timestamp = new Date(msg.created_at).toLocaleString();

                        return (
                            <MessageBubble
                                key={msg.id}
                                message={msg.content}
                                sender={senderName || 'Unknown'}
                                avatarUrl={avatarUrl}
                                timestamp={timestamp}
                                isCurrentUser={isCurrentUser}
                            />
                        );
                    }
                    )
                ) : (
                    <div className='flex flex-col items-center justify-center h-[100%] gap-y-32'>
                        <p>
                            {loading ? 'Loading messages...' : 'No messages yet.'}
                        </p>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatContainer