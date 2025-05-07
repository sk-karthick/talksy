import Message from '@/types/MessageTypes';
import UserTypes from '@/types/UserTypes';
import React from 'react'
import MessageBubble from './Message';

interface ChatContainerProps {
    conversation: Message[] | null;
    loading: boolean;
    error: string | null;
    currentUser: UserTypes | null;
    selectedUser: UserTypes | null;
}

const ChatContainer = ({ conversation, loading, error, currentUser, selectedUser }: ChatContainerProps) => {
    return (
        <div className='h-[85dvh] overflow-auto'>
            <div className="flex flex-col overflow-y-auto justify-end px-10">
                {conversation && conversation.length > 0 ? (
                    conversation.map((msg) => {
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