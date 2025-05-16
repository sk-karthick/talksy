import Message from '@/types/MessageTypes';
import UserTypes from '@/types/UserTypes';
import React, { useEffect, useRef, useState } from 'react'
import MessageBubble from './Message';
import UseAutoScroll from '@/hooks/UseAutoScroll';
import { Badge } from '../ui/badge';

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
    const [separatedByDate, setSeparatedByDate] = useState<Record<string, Message[]>>({});

    useEffect(() => {
        const separateMsg = messages?.reduce<Record<string, Message[]>>((acc, msg) => {
            const date = new Date(msg.created_at).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(msg);
            return acc;
        }, {});

        setSeparatedByDate(separateMsg || {});
    }, [messages]);

    return (
        <div className='h-[85dvh] overflow-y-auto' ref={chatContainerRef}>
            <div className="flex flex-col justify-end min-h-[100%] px-10 pt-10 pb-4" >
                <div className="flex-grow" />
                {messages && messages.length > 0 ? (
                    <>
                        {Object.entries(separatedByDate).map(([date, messages]) => (
                            <div key={date} className="mb-4">
                                <div className='flex items-center justify-center'>
                                    <Badge className="rounded-full mb-2">{date}</Badge>
                                </div>
                                {messages.map((msg) => {
                                    const isCurrentUser = msg.sender_id === currentUser?.id;
                                    const senderName = isCurrentUser ? currentUser?.username : selectedUser?.name;
                                    const avatarUrl = isCurrentUser
                                        ? currentUser?.avatar_url || 'https://i.pravatar.cc/150'
                                        : selectedUser?.avatar_url || 'https://i.pravatar.cc/150';
                                    const timestamp = new Date(msg.created_at).toLocaleString([], {hour: '2-digit',minute: '2-digit'});;

                                    return (
                                        <MessageBubble
                                            key={msg.id}
                                            message={msg.content}
                                            sender={senderName || 'Unknown'}
                                            avatarUrl={avatarUrl}
                                            timestamp={timestamp}
                                            isCurrentUser={isCurrentUser}
                                            status={["sent", "delivered", "read"].includes(msg.status) ? msg.status as "sent" | "delivered" | "read" : undefined}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </>

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